const MAX_FILES = 5;
const MAX_TOTAL_ATTACHMENT_BYTES = 3 * 1024 * 1024;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_FIELD_LENGTH = 160;
const EMAIL_API_URL = "https://api.cloudflare.com/client/v4/accounts";

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "text/plain",
]);

const allowedExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png", ".webp", ".heic", ".txt"];

const copy = {
  ru: {
    invalidMethod: "Метод не поддерживается.",
    invalidOrigin: "Недопустимый источник запроса.",
    invalidForm: "Не удалось обработать форму.",
    invalidRequired: "Заполните имя, телефон, сообщение и подтвердите согласие с Политикой конфиденциальности.",
    invalidEmail: "Проверьте email или оставьте это поле пустым.",
    invalidFiles: "Файлы не прошли проверку. Оставьте документы и фото, а видео лучше отправьте в WhatsApp.",
    tooManyFiles: "Слишком много файлов. Оставьте не больше 5 вложений.",
    filesTooLarge: "Файлы слишком тяжёлые. Общий размер вложений должен быть до 3 МБ.",
    serverError: "Заявка не отправилась. Попробуйте ещё раз или свяжитесь с нами по телефону или WhatsApp.",
    success: "Заявка отправлена. Если вопрос срочный, лучше сразу позвонить.",
    subject: "Новая заявка с сайта",
    heading: "Новая заявка с сайта",
  },
  hy: {
    invalidMethod: "Մեթոդը չի աջակցվում։",
    invalidOrigin: "Հարցման աղբյուրը թույլատրելի չէ։",
    invalidForm: "Չհաջողվեց մշակել հայտը։",
    invalidRequired: "Լրացրեք անունը, հեռախոսահամարը, հաղորդագրությունը և հաստատեք համաձայնությունը Գաղտնիության քաղաքականության հետ:",
    invalidEmail: "Ստուգեք էլ. փոստի հասցեն կամ թողեք այս դաշտը դատարկ:",
    invalidFiles: "Ֆայլերը չեն անցել ստուգումը։ Փաստաթղթերն ու լուսանկարները թողեք, իսկ տեսանյութը լավ է ուղարկել WhatsApp-ով:",
    tooManyFiles: "Չափազանց շատ ֆայլեր են կցված։ Թողեք առավելագույնը 5 կցորդ։",
    filesTooLarge: "Ֆայլերը չափազանց մեծ են։ Կցորդների ընդհանուր ծավալը պետք է լինի մինչև 3 ՄԲ։",
    serverError: "Հայտը չի ուղարկվել։ Կրկնեք փորձը կամ կապ հաստատեք հեռախոսով կամ WhatsApp-ով:",
    success: "Հայտն ուղարկված է: Եթե հարցը շտապ է, ավելի լավ է անմիջապես զանգահարել:",
    subject: "Կայքից նոր հայտ",
    heading: "Կայքից նոր հայտ",
  },
};

export async function onRequestPost(context) {
  const { request, env } = context;
  let locale = getLocaleFromRequest(request);
  let strings = copy[locale];

  if (!isAllowedOrigin(request)) {
    return json({ ok: false, message: strings.invalidOrigin }, 403);
  }

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, message: strings.invalidForm }, 400);
  }

  if (normalizeString(formData.get("website"))) {
    return json({ ok: true, message: strings.success }, 200);
  }

  const values = {
    locale: normalizeString(formData.get("locale")) === "hy" ? "hy" : "ru",
    source: normalizeString(formData.get("source")) || "site-form",
    name: normalizeString(formData.get("name")),
    phone: normalizeString(formData.get("phone")),
    email: normalizeString(formData.get("email")),
    message: normalizeString(formData.get("message")),
    privacyAccepted: normalizeString(formData.get("privacyAccepted")) === "1",
    socialDiscountRequested: normalizeString(formData.get("socialDiscountRequested")) === "1",
  };

  locale = values.locale;
  strings = copy[locale];

  if (!isValidSubmission(values)) {
    return json({ ok: false, message: strings.invalidRequired }, 400);
  }

  if (values.email && !hasValidEmail(values.email)) {
    return json({ ok: false, message: strings.invalidEmail }, 400);
  }

  const files = formData.getAll("files").filter((entry) => entry instanceof File && entry.size > 0);

  if (files.length > MAX_FILES) {
    return json({ ok: false, message: strings.tooManyFiles }, 400);
  }

  const attachmentsResult = await buildAttachments(files);
  if (!attachmentsResult.ok) {
    return json({ ok: false, message: attachmentsResult.reason === "size" ? strings.filesTooLarge : strings.invalidFiles }, 400);
  }

  const notificationTo = normalizeString(env.CONTACT_NOTIFICATION_TO);
  const fromAddress = normalizeString(env.CONTACT_FROM_EMAIL);
  const accountId = normalizeString(env.CLOUDFLARE_ACCOUNT_ID);
  const apiToken = normalizeString(env.CLOUDFLARE_EMAIL_API_TOKEN);

  if (!notificationTo || !fromAddress || !accountId || !apiToken) {
    return json({ ok: false, message: strings.serverError }, 500);
  }

  const requestUrl = new URL(request.url);
  const submittedAt = new Date().toISOString();
  const subject = `${strings.subject}: ${values.name}`;
  const summary = locale === "ru"
    ? [
        ["Источник", values.source],
        ["Язык", locale],
        ["Имя", values.name],
        ["Телефон", values.phone],
        ["Email", values.email || "—"],
        ["Скидка 10%", values.socialDiscountRequested ? "Да" : "Нет"],
        ["Дата", submittedAt],
        ["URL", requestUrl.origin],
        ["IP", normalizeString(request.headers.get("cf-connecting-ip")) || "—"],
        ["User-Agent", normalizeString(request.headers.get("user-agent")) || "—"],
      ]
    : [
        ["Աղբյուր", values.source],
        ["Լեզու", locale],
        ["Անուն", values.name],
        ["Հեռախոս", values.phone],
        ["Email", values.email || "—"],
        ["10% զեղչ", values.socialDiscountRequested ? "Այո" : "Ոչ"],
        ["Ամսաթիվ", submittedAt],
        ["URL", requestUrl.origin],
        ["IP", normalizeString(request.headers.get("cf-connecting-ip")) || "—"],
        ["User-Agent", normalizeString(request.headers.get("user-agent")) || "—"],
      ];

  const htmlRows = summary
    .map(([label, value]) => `<tr><td style="padding:6px 10px;font-weight:600;border:1px solid #d9d9d9;">${escapeHtml(label)}</td><td style="padding:6px 10px;border:1px solid #d9d9d9;">${escapeHtml(value)}</td></tr>`)
    .join("");

  const textRows = summary.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;">
      <h1 style="margin:0 0 16px;font-size:20px;">${escapeHtml(strings.heading)}</h1>
      <table style="border-collapse:collapse;width:100%;margin:0 0 20px;">${htmlRows}</table>
      <h2 style="margin:0 0 10px;font-size:16px;">${locale === "ru" ? "Сообщение" : "Հաղորդագրություն"}</h2>
      <div style="padding:12px 14px;border:1px solid #d9d9d9;background:#fafafa;white-space:pre-wrap;">${escapeHtml(values.message)}</div>
    </div>
  `;

  const text = `${strings.heading}\n\n${textRows}\n\n${locale === "ru" ? "Сообщение" : "Հաղորդագրություն"}:\n${values.message}`;

  const payload = {
    to: notificationTo,
    from: {
      address: fromAddress,
      name: locale === "ru" ? "Электрик" : "Էլեկտրիկ",
    },
    reply_to: values.email || undefined,
    subject,
    html,
    text,
    attachments: attachmentsResult.attachments,
  };

  const response = await fetch(`${EMAIL_API_URL}/${accountId}/email/sending/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return json({ ok: false, message: strings.serverError }, 502);
  }

  const result = await response.json().catch(() => null);

  if (!result?.success) {
    return json({ ok: false, message: strings.serverError }, 502);
  }

  return json({ ok: true, message: strings.success }, 200);
}

export async function onRequestOptions(context) {
  if (!isAllowedOrigin(context.request)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request),
  });
}

function getLocaleFromRequest(request) {
  const url = new URL(request.url);
  const locale = normalizeString(url.searchParams.get("locale"));
  return locale === "hy" ? "hy" : "ru";
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function hasValidEmail(value) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

function isValidSubmission(values) {
  const phoneDigits = values.phone.replace(/\D/g, "");

  return (
    values.name.length >= 2 &&
    values.name.length <= MAX_FIELD_LENGTH &&
    phoneDigits.length >= 7 &&
    values.message.length >= 8 &&
    values.message.length <= MAX_MESSAGE_LENGTH &&
    values.privacyAccepted
  );
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function buildAttachments(files) {
  if (files.length === 0) {
    return { ok: true, attachments: [] };
  }

  let totalBytes = 0;
  const attachments = [];

  for (const file of files) {
    totalBytes += file.size;

    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return { ok: false, reason: "size" };
    }

    if (!isAllowedFile(file)) {
      return { ok: false, reason: "type" };
    }

    const buffer = await file.arrayBuffer();
    attachments.push({
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      content: arrayBufferToBase64(buffer),
      disposition: "attachment",
    });
  }

  return { ok: true, attachments };
}

function isAllowedFile(file) {
  const fileName = file.name.toLowerCase();
  const hasAllowedExtension = allowedExtensions.some((extension) => fileName.endsWith(extension));

  if (!hasAllowedExtension) {
    return false;
  }

  if (!file.type) {
    return true;
  }

  return allowedMimeTypes.has(file.type);
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function corsHeaders(request) {
  const origin = request.headers.get("origin");
  const requestOrigin = origin && isAllowedOrigin(request) ? origin : new URL(request.url).origin;

  return {
    "Access-Control-Allow-Origin": requestOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    Vary: "Origin",
    "Cache-Control": "no-store",
  };
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}
