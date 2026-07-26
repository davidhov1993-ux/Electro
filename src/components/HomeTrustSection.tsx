import type { ChangeEvent, DragEvent, FormEvent } from "react";
import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { businessEmail, hasBusinessEmail } from "@/src/content/contact";
import {
  businessPhoneDisplay,
  businessPhoneMachine,
  businessTelegramUrl,
  businessViberUrl,
  businessWhatsappUrl,
} from "@/src/content/site";
import { submitContactRequest } from "@/src/lib/contactForm";
import { pagePath } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

type FormStatus = "idle" | "error" | "success" | "submitting";

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
  serviceAreaEyebrow: string;
  serviceAreaTitle: string;
  serviceAreaBody: string;
  serviceDistricts: string[];
  pricesEyebrow: string;
  pricesTitle: string;
  priceServiceHeader: string;
  priceCostHeader: string;
  prices: PriceLine[];
  discountEyebrow: string;
  discountTitle: string;
  discountBody: string;
  discountNote: string;
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
  formSocialDiscountLabel: string;
  formSocialDiscountHint: string;
  formSubmit: string;
  formSubmitPending: string;
  formPrivacyPrefix: string;
  formPrivacyLink: string;
  formPrivacySuffix: string;
  statusRequired: string;
  statusInvalidEmail: string;
  statusSuccess: string;
  statusSendError: string;
}

const phone = businessPhoneDisplay;
const phoneHref = `tel:${businessPhoneMachine}`;
const whatsappHref = businessWhatsappUrl;
const telegramHref = businessTelegramUrl;
const viberHref = businessViberUrl;
const email = businessEmail;
const showEmail = hasBusinessEmail;

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
    serviceAreaEyebrow: "Зона обслуживания",
    serviceAreaTitle: "Работаем по всем административным районам Еревана",
    serviceAreaBody:
      "Выезжаем на срочные и плановые заявки в жилые дома, квартиры, офисы, магазины и кафе по всему Еревану.",
    serviceDistricts: [
      "Кентрон",
      "Арабкир",
      "Нор-Норк",
      "Малатия-Себастия",
      "Ачапняк",
      "Шенгавит",
      "Канакер-Зейтун",
      "Эребуни",
      "Норк-Мараш",
      "Аван",
      "Давташен",
      "Нубарашен",
    ],
    pricesEyebrow: "Цены",
    pricesTitle: "Ориентировочная стоимость услуг",
    priceServiceHeader: "Услуга",
    priceCostHeader: "Цена",
    prices: [
      { label: "Выезд и диагностика", value: "10 000 AMD" },
      { label: "Срочный выезд 24/7", value: "20 000 AMD" },
      { label: "Электромонтажные работы", value: "от 5 000 AMD" },
      { label: "Монтаж новой электропроводки", value: "от 5 000 AMD за точку" },
      { label: "Работы с электрощитами", value: "от 5 000 AMD" },
      { label: "Полная замена электропроводки", value: "по смете" },
    ],
    discountEyebrow: "СОЦИАЛЬНАЯ СКИДКА 10%",
    discountTitle: "Пенсионерам и людям с инвалидностью — скидка 10% на работу",
    discountBody: "Скажите об этом при звонке или отметьте в заявке. Скидку считаем от стоимости работы, без материалов.",
    discountNote: "ФИНАЛЬНУЮ ЦЕНУ НАЗЫВАЕМ ДО НАЧАЛА РАБОТ.",
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
    contactTitle: "Есть материалы по объекту? Прикрепите к заявке.",
    contactBody: "Если есть чертежи, схемы, документы или фотографии по объекту, прикрепите их к заявке — так будет проще быстро оценить задачу.",
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
    formFilesHint: "Фото, PDF, Word, Excel.",
    formFilesDrag: "Видео лучше отправить в WhatsApp.",
    formSocialDiscountLabel: "Хочу уточнить скидку 10%",
    formSocialDiscountHint: "Для пенсионеров и людей с инвалидностью. Без документов на сайте — детали можно обсудить по телефону.",
    formSubmit: "Отправить заявку",
    formSubmitPending: "Отправляем...",
    formPrivacyPrefix: "Нажимая кнопку, вы соглашаетесь с",
    formPrivacyLink: "Политикой конфиденциальности",
    formPrivacySuffix: ".",
    statusRequired: "Оставьте имя, телефон, коротко опишите задачу и подтвердите согласие с Политикой конфиденциальности.",
    statusInvalidEmail: "Проверьте email или оставьте это поле пустым.",
    statusSuccess: "Заявка отправлена. Если вопрос срочный, лучше сразу позвонить.",
    statusSendError: "Заявка не отправилась. Попробуйте ещё раз или свяжитесь с нами по телефону или WhatsApp.",
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
    serviceAreaEyebrow: "Սպասարկման տարածքները",
    serviceAreaTitle: "Աշխատում ենք Երևանի բոլոր վարչական շրջաններում",
    serviceAreaBody:
      "Շտապ և պլանային հայտերով այցելում ենք բնակարաններ, առանձնատներ, գրասենյակներ, խանութներ և սրճարաններ ամբողջ Երևանում:",
    serviceDistricts: [
      "Կենտրոն",
      "Արաբկիր",
      "Նոր Նորք",
      "Մալաթիա-Սեբաստիա",
      "Աջափնյակ",
      "Շենգավիթ",
      "Քանաքեռ-Զեյթուն",
      "Էրեբունի",
      "Նորք-Մարաշ",
      "Ավան",
      "Դավթաշեն",
      "Նուբարաշեն",
    ],
    pricesEyebrow: "Գներ",
    pricesTitle: "Ծառայությունների մոտավոր արժեքը",
    priceServiceHeader: "Ծառայություն",
    priceCostHeader: "Արժեք",
    prices: [
      { label: "Այց և ախտորոշում", value: "10 000 AMD" },
      { label: "Շտապ այց 24/7", value: "20 000 AMD" },
      { label: "Էլեկտրամոնտաժային աշխատանքներ", value: "սկսած 5 000 AMD-ից" },
      { label: "Նոր էլեկտրագծերի մոնտաժ", value: "սկսած 5 000 AMD-ից մեկ կետի համար" },
      { label: "Աշխատանքներ էլեկտրական վահանակների հետ", value: "սկսած 5 000 AMD-ից" },
      { label: "Էլեկտրագծերի ամբողջական փոխարինում", value: "նախահաշվով" },
    ],
    discountEyebrow: "ՍՈՑԻԱԼԱԿԱՆ ԶԵՂՉ՝ 10%",
    discountTitle: "Թոշակառուների և հաշմանդամություն ունեցող անձանց համար — 10% զեղչ կատարված աշխատանքների համար:",
    discountBody: "Հայտնեք այդ մասին զանգի ընթացքում կամ նշեք հայտի մեջ: Զեղչը հաշվարկվում է միայն աշխատանքի արժեքից՝ առանց նյութերի:",
    discountNote: "ՎԵՐՋՆԱԿԱՆ ԳԻՆԸ ՆՇՎՈՒՄ Է ՄԻՆՉԵՎ ԱՇԽԱՏԱՆՔՆԵՐԸ ՍԿՍԵԼԸ:",
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
    contactTitle: "Օբյեկտի նյութեր ունե՞ք։ Կցեք հայտին։",
    contactBody: "Եթե ունեք գծագրեր, սխեմաներ, փաստաթղթեր կամ օբյեկտի լուսանկարներ, կցեք դրանք հայտին․ այդպես ավելի արագ կհասկանանք խնդիրը:",
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
    formFilesHint: "Լուսանկար, PDF, Word, Excel:",
    formFilesDrag: "Տեսանյութը լավ է ուղարկել WhatsApp-ով:",
    formSocialDiscountLabel: "Ցանկանում եմ ճշտել 10% զեղչը",
    formSocialDiscountHint: "Թոշակառուների և հաշմանդամություն ունեցող անձանց համար: Կայքում փաստաթղթեր ներկայացնելու կարիք չկա — մանրամասները կարող եք քննարկել հեռախոսով:",
    formSubmit: "Ուղարկել հայտը",
    formSubmitPending: "Ուղարկվում է...",
    formPrivacyPrefix: "Սեղմելով կոճակը՝ Դուք համաձայնում եք",
    formPrivacyLink: "Գաղտնիության քաղաքականությանը",
    formPrivacySuffix: ":",
    statusRequired: "Լրացրեք Ձեր անունը, հեռախոսահամարը, հակիրճ նկարագրեք խնդիրը և հաստատեք համաձայնությունը Գաղտնիության քաղաքականության հետ:",
    statusInvalidEmail: "Ստուգեք էլ. փոստի հասցեն կամ թողեք այս դաշտը դատարկ:",
    statusSuccess: "Հայտն ուղարկված է: Եթե հարցը շտապ է, ավելի լավ է անմիջապես զանգահարել:",
    statusSendError: "Հայտը չի ուղարկվել։ Կրկնեք փորձը կամ կապ հաստատեք հեռախոսով կամ WhatsApp-ով:",
  },
};

function sanitizePhone(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 24);
}

function applyFileLimit(files: File[] | FileList | null) {
  return Array.from(files ?? []).slice(0, 8);
}

function hasValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

function HomeTrustProcessCopy({ copy, locale }: { copy: TrustCopy; locale: Locale }) {
  return (
    <section className={`home-trust-process home-trust-process--${locale}`} aria-labelledby="home-trust-process-title">
      <div className="home-trust-process__intro">
        <div className="home-trust-process__label-row">
          <span className="home-trust-process__label-mark" aria-hidden="true" />
          <p className="home-trust-process__eyebrow">{copy.introEyebrow}</p>
        </div>
        <div className="home-trust-process__intro-copy">
          <h2 id="home-trust-process-title" className="home-trust-process__title">
            {copy.introTitle}
          </h2>
          <p className="home-trust-process__lead">{copy.introBody}</p>
        </div>
      </div>

      <div className="home-trust-process__facts" aria-label={copy.introEyebrow}>
        {copy.facts.map((fact, index) => (
          <article key={fact.title} className="home-trust-process__fact">
            <span className="home-trust-process__fact-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="home-trust-process__fact-copy">
              <p className="home-trust-process__fact-title">{fact.title}</p>
              <p className="home-trust-process__fact-body">{fact.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="home-trust-process__details">
        {copy.sections.map((section) => (
          <section key={section.title} className="home-trust-process__detail">
            <p className="home-trust-process__detail-eyebrow">{section.eyebrow}</p>
            <h3 className="home-trust-process__detail-title">{section.title}</h3>
            <ul className="home-trust-process__list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

export function HomeTrustSection({ locale }: { locale: Locale }) {
  const copy = trustContent[locale];
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();
  const fileId = useId();
  const privacyId = useId();
  const dragDepth = useRef(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [values, setValues] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [socialDiscountRequested, setSocialDiscountRequested] = useState(false);

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

  const handleFileRemove = (indexToRemove: number) => {
    setFiles((current) => current.filter((_, index) => index !== indexToRemove));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneDigits = values.phone.replace(/\D/g, "");
    const hasRequiredFields =
      values.name.trim().length >= 2 &&
      phoneDigits.length >= 7 &&
      values.message.trim().length >= 8 &&
      privacyAccepted;
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

    setStatus("submitting");
    setStatusMessage("");

    try {
      const result = await submitContactRequest({
        locale,
        source: "home-trust-form",
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
        privacyAccepted,
        socialDiscountRequested,
        files,
      });

      if (!result.ok) {
        setStatus("error");
        setStatusMessage(result.message ?? copy.statusSendError);
        return;
      }

      setValues({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
      setFiles([]);
      setPrivacyAccepted(false);
      setSocialDiscountRequested(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setStatus("success");
      setStatusMessage(result.message ?? copy.statusSuccess);
    } catch {
      setStatus("error");
      setStatusMessage(copy.statusSendError);
    }
  };

  return (
    <section id="doverie" className="home-trust-page" aria-label={copy.sectionLabel}>
      <div className="home-trust-page__inner">
        <HomeTrustProcessCopy copy={copy} locale={locale} />

        <section className="home-trust-page__service-area" aria-labelledby="home-trust-service-area-title">
          <div className="home-trust-page__section-head">
            <p className="home-trust-page__section-eyebrow">{copy.serviceAreaEyebrow}</p>
            <h2 id="home-trust-service-area-title" className="home-trust-page__section-title">
              {copy.serviceAreaTitle}
            </h2>
          </div>

          <p className="home-trust-page__service-area-body">{copy.serviceAreaBody}</p>

          <ul className="home-trust-page__district-list" aria-label={copy.serviceAreaTitle}>
            {copy.serviceDistricts.map((district) => (
              <li key={district}>{district}</li>
            ))}
          </ul>
        </section>

        <section className="home-trust-page__prices" aria-labelledby="home-trust-prices-title">
          <div className="home-trust-page__section-head">
            <p className="home-trust-page__section-eyebrow">{copy.pricesEyebrow}</p>
            <h3 id="home-trust-prices-title" className="home-trust-page__section-title">
              {copy.pricesTitle}
            </h3>
          </div>

          <div className="home-trust-page__price-table-wrap">
            <table className="home-trust-page__price-table">
              <thead>
                <tr>
                  <th scope="col">{copy.priceServiceHeader}</th>
                  <th scope="col">{copy.priceCostHeader}</th>
                </tr>
              </thead>
              <tbody>
                {copy.prices.map((line) => (
                  <tr key={line.label}>
                    <td>{line.label}</td>
                    <td>{line.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <article className="home-trust-page__discount">
            <div className="home-trust-page__discount-copy">
              <p className="home-trust-page__discount-eyebrow">{copy.discountEyebrow}</p>
              <h4 className="home-trust-page__discount-title">{copy.discountTitle}</h4>
              <p className="home-trust-page__discount-body">{copy.discountBody}</p>
            </div>
            <p className="home-trust-page__discount-note">{copy.discountNote}</p>
          </article>
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
              <a href={telegramHref} target="_blank" rel="noreferrer">Telegram</a>
              <a href={viberHref}>Viber</a>
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

            <label className="home-trust-form__social-option">
              <input
                type="checkbox"
                checked={socialDiscountRequested}
                onChange={(event) => {
                  setSocialDiscountRequested(event.target.checked);
                  resetStatus();
                }}
              />
              <span className="home-trust-form__social-option-copy">
                <strong>{copy.formSocialDiscountLabel}</strong>
                <small>{copy.formSocialDiscountHint}</small>
              </span>
            </label>

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
                  ref={fileInputRef}
                  className="home-trust-form__file-input"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.heic,.webp,.txt"
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
                    {files.map((file, index) => (
                      <span key={`${file.name}-${file.lastModified}-${index}`} className="home-trust-form__file-item">
                        <span className="home-trust-form__file-name">{file.name}</span>
                        <button
                          type="button"
                          className="home-trust-form__file-remove"
                          aria-label={`Удалить файл ${file.name}`}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleFileRemove(index);
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </span>
                ) : null}
              </label>

              <div className="home-trust-form__actions">
                <button type="submit" className="home-trust-form__submit" disabled={status === "submitting"}>
                  {status === "submitting" ? copy.formSubmitPending : copy.formSubmit}
                </button>
                <label className="home-trust-form__consent" htmlFor={privacyId}>
                  <input
                    id={privacyId}
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(event) => {
                      setPrivacyAccepted(event.target.checked);
                      resetStatus();
                    }}
                    required
                  />
                  <span>
                    {copy.formPrivacyPrefix} <Link to={pagePath(locale, "privacy")}>{copy.formPrivacyLink}</Link>
                    {copy.formPrivacySuffix}
                  </span>
                </label>

                {status === "error" ? (
                  <p className="home-trust-form__note" role="status" aria-live="polite">
                    {statusMessage}
                  </p>
                ) : null}

                {status === "success" || status === "submitting" ? (
                  <p className="home-trust-form__note" role="status" aria-live="polite">
                    {status === "submitting" ? copy.formSubmitPending : statusMessage}
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
