import type { ChangeEvent, DragEvent, FormEvent } from "react";
import { useId, useRef, useState } from "react";

import type { Locale } from "@/src/types";

type FormStatus = "idle" | "error" | "success";

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface TrustFact {
  title: string;
  body: string;
}

interface TrustBulletSection {
  eyebrow: string;
  title: string;
  items: string[];
}

interface PriceLine {
  label: string;
  value: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface TrustCopy {
  sectionLabel: string;
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  facts: TrustFact[];
  sections: TrustBulletSection[];
  pricesEyebrow: string;
  pricesTitle: string;
  prices: PriceLine[];
  faqEyebrow: string;
  faqTitle: string;
  faq: FaqItem[];
  contactEyebrow: string;
  contactTitle: string;
  contactBody: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formFilesLabel: string;
  formFilesButton: string;
  formFilesHint: string;
  formFilesDrag: string;
  formSubmit: string;
  statusRequired: string;
  statusInvalidEmail: string;
  statusSuccess: string;
}

const phone = "+374 99 586 469";
const phoneHref = "tel:+37499586469";
const whatsappHref = "https://wa.me/37499586469";
const email = "example@mail.com";
const showEmail = email !== "example@mail.com";

const trustContent: Record<Locale, TrustCopy> = {
  ru: {
    sectionLabel: "Доверие и связь",
    introEyebrow: "Как работаем",
    introTitle: "Без сюрпризов по ходу.",
    introBody: "Сначала разбираемся, что случилось и что нужно сделать. Потом говорим цену и объём работ.",
    facts: [
      {
        title: "35 лет опыта",
        body: "Ереван, Москва, Прага.",
      },
      {
        title: "Цена до начала работ",
        body: "Без сюрпризов по ходу.",
      },
      {
        title: "Говорим прямо",
        body: "Если на объекте проблема, сразу об этом скажем.",
      },
      {
        title: "Проверяем после работ",
        body: "Не уезжаем, пока не убедимся, что всё работает.",
      },
    ],
    sections: [
      {
        eyebrow: "До начала работ",
        title: "Что говорим заранее",
        items: [
          "если цену можно назвать сразу, называем сразу",
          "если без осмотра нельзя, так и говорим",
          "если задача не наша, не тянем время",
        ],
      },
      {
        eyebrow: "На объекте",
        title: "Как работаем",
        items: [
          "не делаем времянки вместо нормального решения",
          "не тянем кабель чем попало",
          "не замалчиваем чужие ошибки",
          "после работы всё проверяем",
        ],
      },
    ],
    pricesEyebrow: "Цены",
    pricesTitle: "Примерные цены",
    prices: [
      { label: "Выезд электрика", value: "от ... драм" },
      { label: "Аварийный выезд", value: "от ... драм" },
      { label: "Диагностика", value: "от ... драм" },
      { label: "Точка", value: "от ... драм" },
      { label: "Прокладка кабеля", value: "от ... драм" },
      { label: "Сборка щита", value: "от ... драм" },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Частые вопросы",
    faq: [
      {
        question: "Работаете 24/7?",
        answer: "На аварийные вызовы — да.",
      },
      {
        question: "За сколько приезжаете по Еревану?",
        answer: "Обычно 30–60 минут. Если есть задержка, говорим сразу.",
      },
      {
        question: "Можно сначала просто проконсультироваться?",
        answer: "Да. Можно просто позвонить и объяснить, что случилось.",
      },
      {
        question: "Когда вы называете цену?",
        answer: "Если задача понятна, называем сразу. Если нужен осмотр, сначала смотрим.",
      },
      {
        question: "Берёте мелкие работы?",
        answer: "Да. И мелкие выезды, и монтаж, и переделку после других.",
      },
      {
        question: "Исправляете чужую плохую работу?",
        answer: "Да. Сначала смотрим, что сделано, потом говорим, что можно исправить.",
      },
    ],
    contactEyebrow: "Связь",
    contactTitle: "Срочно? Звоните сразу.",
    contactBody: "Если есть фото щита, автомата или проблемного места, отправьте в WhatsApp.",
    formNameLabel: "Имя",
    formNamePlaceholder: "Ваше имя",
    formPhoneLabel: "Телефон",
    formPhonePlaceholder: "+374",
    formEmailLabel: "Email (необязательно)",
    formEmailPlaceholder: "name@example.com",
    formMessageLabel: "Сообщение",
    formMessagePlaceholder: "Что случилось, что нужно сделать, есть ли срочность.",
    formFilesLabel: "Файлы",
    formFilesButton: "Прикрепить",
    formFilesHint: "Фото, видео, PDF, Word, Excel.",
    formFilesDrag: "Необязательно.",
    formSubmit: "Отправить заявку",
    statusRequired: "Оставьте имя, телефон и коротко опишите задачу.",
    statusInvalidEmail: "Проверьте email или оставьте это поле пустым.",
    statusSuccess: "Форма заполнена. Если срочно, лучше сразу позвонить.",
  },
  hy: {
    sectionLabel: "Վստահություն և կապ",
    introEyebrow: "Ինչպես ենք աշխատում",
    introTitle: "Առանց անախորժ անակնկալների և թաքնված ծախսերի:",
    introBody: "Նախ պարզում ենք՝ ինչ է պատահել և ինչ պետք է արվի: Դրանից հետո միայն ասում ենք հստակ արժեքը և աշխատանքի ծավալը:",
    facts: [
      {
        title: "35 տարվա փորձ",
        body: "Երևան, Մոսկվա, Պրահա:",
      },
      {
        title: "Գինը՝ նախքան աշխատանքը սկսելը",
        body: "Առանց ընթացքում ավելացող ծախսերի:",
      },
      {
        title: "Ասում ենք այնպես, ինչպես կա",
        body: "Եթե օբյեկտում լուրջ խնդիր կա, անմիջապես հայտնում ենք այդ մասին:",
      },
      {
        title: "Պարտադիր ստուգում աշխատանքից հետո",
        body: "Չենք հեռանում, մինչև չենք համոզվում, որ ամեն ինչ անդրադարձ և անվտանգ աշխատում է:",
      },
    ],
    sections: [
      {
        eyebrow: "Նախքան աշխատանքը սկսելը",
        title: "Ինչ ենք հայտնում նախապես",
        items: [
          "Եթե գինը հնարավոր է ասել միանգամից, ասում ենք:",
          "Եթե առանց տեղում զննելու հնարավոր չէ, հենց այդպես էլ ասում ենք:",
          "Եթե առաջադրանքը մեր պրոֆիլինը չէ, ձեր ժամանակը դատարկ չենք վատնում:",
        ],
      },
      {
        eyebrow: "Օբյեկտում",
        title: "Ինչպես ենք աշխատում",
        items: [
          "Չենք անում «ժամանակավոր» լուծումներ որակյալ աշխատանքի փոխարեն:",
          "Չենք անցկացնում պատահական ու անորակ մալուխներ:",
          "Չենք լռում ուրիշների արած սխալների մասին, որոնք կարող են վտանգավոր լինել:",
          "Աշխատանքն ավարտելուց հետո ամեն ինչ մանրակրկիտ ստուգում ենք:",
        ],
      },
    ],
    pricesEyebrow: "Գներ",
    pricesTitle: "Մոտավոր արժեքներ",
    prices: [
      { label: "Էլեկտրիկի այցելություն", value: "սկսած ... դրամից" },
      { label: "Վթարային այց", value: "սկսած ... դրամից" },
      { label: "Ախտորոշում (դիագնոստիկա)", value: "սկսած ... դրամից" },
      { label: "Կետ (տոչկա)", value: "սկսած ... դրամից" },
      { label: "Մալուխի անցկացում", value: "սկսած ... դրամից" },
      { label: "Վահանակի հավաքում", value: "սկսած ... դրամից" },
    ],
    faqEyebrow: "FAQ (ՀԱՃԱԽ ՏՐՎՈՂ ՀԱՐՑԵՐ)",
    faqTitle: "Հաճախ տրվող հարցեր",
    faq: [
      {
        question: "Աշխատո՞ւմ եք 24/7 ռեժիմով:",
        answer: "Վթարային կանչերի համար՝ այո՛, հասանելի ենք շուրջօրյա:",
      },
      {
        question: "Որքա՞ն ժամանակում եք հասնում Երևանի տարածքում:",
        answer: "Սովորաբար 30–60 րոպեում: Եթե ճանապարհին ուշացում է լինում, անմիջապես զգուշացնում ենք:",
      },
      {
        question: "Կարո՞ղ եմ սկզբում պարզապես խորհրդատվություն ստանալ:",
        answer: "Այո՛: Կարող եք պարզապես զանգահարել և բացատրել, թե ինչ է պատահել:",
      },
      {
        question: "Ե՞րբ եք ասում աշխատանքի գինը:",
        answer: "Եթե խնդիրը հստակ է, գինն ասում ենք միանգամից: Եթե զննում է պետք, նախ տեղում նայում ենք:",
      },
      {
        question: "Վերցնո՞ւմ եք փոքր ծավալի աշխատանքներ:",
        answer: "Այո՛: Թե՛ մանր կանչերը, թե՛ մեծ մոնտաժը և թե՛ ուրիշների թերի թողած աշխատանքների վերանորոգումը:",
      },
      {
        question: "Ուրիշների վատ արած աշխատանքը ուղղո՞ւմ եք:",
        answer: "Այո՛: Նախ նայում ենք, թե ինչ է արված, հետո ասում ենք, թե ինչ տարբերակներով կարելի է ուղղել:",
      },
    ],
    contactEyebrow: "Կապ",
    contactTitle: "Շտա՞պ է: Զանգահարեք անմիջապես:",
    contactBody: "Եթե ունեք վահանակի, ավտոմատի կամ խնդրահարույց հատվածի լուսանկար, ուղարկեք WhatsApp-ին:",
    formNameLabel: "Անուն",
    formNamePlaceholder: "Ձեր անունը",
    formPhoneLabel: "Հեռախոսահամար",
    formPhonePlaceholder: "+374",
    formEmailLabel: "Էլ. փոստ (պարտադիր չէ)",
    formEmailPlaceholder: "name@example.com",
    formMessageLabel: "Հաղորդագրություն",
    formMessagePlaceholder: "Ի՞նչ է պատահել, ի՞նչ է անհրաժեշտ անել, կա՞ արդյոք շտապողականություն:",
    formFilesLabel: "Ֆայլեր",
    formFilesButton: "Կցել ֆայլ",
    formFilesHint: "Լուսանկար, տեսանյութ, PDF, Word, Excel:",
    formFilesDrag: "Պարտադիր չէ:",
    formSubmit: "Ուղարկել հայտը",
    statusRequired: "Լրացրեք Ձեր անունը, հեռախոսահամարը և հակիրճ նկարագրեք խնդիրը:",
    statusInvalidEmail: "Ստուգեք էլ. փոստի հասցեն կամ թողեք այս դաշտը դատարկ:",
    statusSuccess: "Հայտը հաջողությամբ լրացված է: Եթե հարցը շտապ է, ավելի լավ է միանգամից զանգահարել:",
  },
};

function sanitizePhone(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 24);
}

function applyFileLimit(files: File[] | FileList | null) {
  return Array.from(files ?? []).slice(0, 8).map((file) => file.name);
}

function hasValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

export function HomeTrustSection({ locale }: { locale: Locale }) {
  const copy = trustContent[locale];
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();
  const fileId = useId();
  const dragDepth = useRef(0);
  const [values, setValues] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [files, setFiles] = useState<string[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
    }

    if (statusMessage) {
      setStatusMessage("");
    }
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: name === "phone" ? sanitizePhone(value) : value,
    }));
    resetStatus();
  };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(applyFileLimit(event.target.files));
    resetStatus();
  };

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current += 1;
    setDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current = Math.max(0, dragDepth.current - 1);

    if (dragDepth.current === 0) {
      setDragActive(false);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!dragActive) {
      setDragActive(true);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current = 0;
    setDragActive(false);
    setFiles(applyFileLimit(event.dataTransfer.files));
    resetStatus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneDigits = values.phone.replace(/\D/g, "");
    const hasRequiredFields =
      values.name.trim().length >= 2 &&
      phoneDigits.length >= 7 &&
      values.message.trim().length >= 8;
    const hasEmail = values.email.trim().length > 0;

    if (!hasRequiredFields) {
      setStatus("error");
      setStatusMessage(copy.statusRequired);
      return;
    }

    if (hasEmail && !hasValidEmail(values.email)) {
      setStatus("error");
      setStatusMessage(copy.statusInvalidEmail);
      return;
    }

    setStatus("success");
    setStatusMessage(copy.statusSuccess);
  };

  return (
    <section id="doverie" className="home-trust-page" aria-label={copy.sectionLabel}>
      <div className="home-trust-page__inner">
        <div className="home-trust-page__intro">
          <p className="home-trust-page__eyebrow">{copy.introEyebrow}</p>
          <h2 className="home-trust-page__title">{copy.introTitle}</h2>
          <div className="home-trust-page__copy">
            <p>{copy.introBody}</p>
          </div>
        </div>

        <div className="home-trust-page__facts">
          {copy.facts.map((fact) => (
            <article key={fact.title} className="home-trust-page__fact">
              <p className="home-trust-page__fact-title">{fact.title}</p>
              <p className="home-trust-page__fact-body">{fact.body}</p>
            </article>
          ))}
        </div>

        <div className="home-trust-page__sections">
          {copy.sections.map((section) => (
            <section key={section.title} className="home-trust-page__section">
              <div className="home-trust-page__section-head">
                <p className="home-trust-page__section-eyebrow">{section.eyebrow}</p>
                <h3 className="home-trust-page__section-title">{section.title}</h3>
              </div>

              <ul className="home-trust-page__list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="home-trust-page__prices" aria-labelledby="home-trust-prices-title">
          <div className="home-trust-page__section-head">
            <p className="home-trust-page__section-eyebrow">{copy.pricesEyebrow}</p>
            <h3 id="home-trust-prices-title" className="home-trust-page__section-title">
              {copy.pricesTitle}
            </h3>
          </div>

          <div className="home-trust-page__price-grid">
            {copy.prices.map((line) => (
              <article key={line.label} className="home-trust-page__price">
                <span className="home-trust-page__price-label">{line.label}</span>
                <strong className="home-trust-page__price-value">{line.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="home-trust-page__faq" aria-labelledby="home-trust-faq-title">
          <div className="home-trust-page__section-head">
            <p className="home-trust-page__section-eyebrow">{copy.faqEyebrow}</p>
            <h3 id="home-trust-faq-title" className="home-trust-page__section-title">
              {copy.faqTitle}
            </h3>
          </div>

          <div className="home-trust-page__faq-list">
            {copy.faq.map((item) => (
              <details key={item.question} className="home-trust-page__faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="svyaz" className="home-trust-page__contact" aria-labelledby="home-trust-contact-title">
          <div className="home-trust-page__contact-intro">
            <div className="home-trust-page__section-head">
              <p className="home-trust-page__section-eyebrow">{copy.contactEyebrow}</p>
              <h3 id="home-trust-contact-title" className="home-trust-page__section-title">
                {copy.contactTitle}
              </h3>
            </div>

            <p className="home-trust-page__contact-text">{copy.contactBody}</p>

            <div className="home-trust-page__contact-links">
              <a href={phoneHref}>{phone}</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
              {showEmail ? <a href={`mailto:${email}`}>{email}</a> : null}
            </div>
          </div>

          <form className="home-trust-form" onSubmit={handleSubmit} noValidate>
            <div className="home-trust-form__contact-row">
              <label className="home-trust-form__field" htmlFor={nameId}>
                <span className="home-trust-form__field-label">{copy.formNameLabel}</span>
                <input
                  id={nameId}
                  className="home-trust-form__input"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleFieldChange}
                  placeholder={copy.formNamePlaceholder}
                  autoComplete="name"
                />
              </label>

              <label className="home-trust-form__field" htmlFor={phoneId}>
                <span className="home-trust-form__field-label">{copy.formPhoneLabel}</span>
                <input
                  id={phoneId}
                  className="home-trust-form__input"
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleFieldChange}
                  placeholder={copy.formPhonePlaceholder}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>

              <label className="home-trust-form__field" htmlFor={emailId}>
                <span className="home-trust-form__field-label">{copy.formEmailLabel}</span>
                <input
                  id={emailId}
                  className="home-trust-form__input"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleFieldChange}
                  placeholder={copy.formEmailPlaceholder}
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="home-trust-form__field" htmlFor={messageId}>
              <span className="home-trust-form__field-label">{copy.formMessageLabel}</span>
              <textarea
                id={messageId}
                className="home-trust-form__textarea"
                rows={7}
                name="message"
                value={values.message}
                onChange={handleFieldChange}
                placeholder={copy.formMessagePlaceholder}
              />
            </label>

            <div className="home-trust-form__bottom">
              <label
                className={`home-trust-form__field home-trust-form__field--files ${dragActive ? "is-drag-active" : ""}`.trim()}
                htmlFor={fileId}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <span className="home-trust-form__field-label">{copy.formFilesLabel}</span>
                <input
                  id={fileId}
                  className="home-trust-form__file-input"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  onChange={handleFilesChange}
                />

                <span className="home-trust-form__file-shell">
                  <span className="home-trust-form__file-button">{copy.formFilesButton}</span>
                  <span className="home-trust-form__file-copy">
                    <span className="home-trust-form__file-hint">{copy.formFilesHint}</span>
                    <span className="home-trust-form__file-drag">{copy.formFilesDrag}</span>
                  </span>
                </span>

                {files.length > 0 ? (
                  <span className="home-trust-form__file-list" aria-live="polite">
                    {files.join(" · ")}
                  </span>
                ) : null}
              </label>

              <div className="home-trust-form__actions">
                <button type="submit" className="home-trust-form__submit">
                  {copy.formSubmit}
                </button>

                {status === "error" ? (
                  <p className="home-trust-form__note" role="status" aria-live="polite">
                    {statusMessage}
                  </p>
                ) : null}

                {status === "success" ? (
                  <p className="home-trust-form__note" role="status" aria-live="polite">
                    {statusMessage}
                  </p>
                ) : null}
              </div>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
