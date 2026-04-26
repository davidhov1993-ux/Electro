import { NavLink } from "react-router-dom";

import { LeadForm } from "@/src/components/LeadForm";
import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Seo } from "@/src/components/Seo";
import { brandName, t } from "@/src/content/site";
import { pagePath, servicePath, servicesAnchor } from "@/src/lib/locale";
import { createBreadcrumbSchema, createFaqSchema, createServiceSchema } from "@/src/lib/seo";
import type { Locale, ServiceEntry } from "@/src/types";

const phone = "+374 99 586 469";
const phoneHref = "tel:+37499586469";
const whatsappHref = "https://wa.me/37499586469";

interface LightingServicePageProps {
  locale: Locale;
  service: ServiceEntry;
}

type InstallVisual = "fixture" | "track" | "led" | "outdoor" | "switch";
type LayerVisual = "ambient" | "task" | "accent" | "outside";

interface LightingLayer {
  label: string;
  title: string;
  text: string;
  terms: string[];
  visual: LayerVisual;
}

interface InstallType {
  title: string;
  text: string;
  tags: string[];
  visual: InstallVisual;
}

interface LightingFaq {
  question: string;
  answer: string;
}

const lightingRuPage = {
  seoTitle: "Монтаж освещения в Ереване",
  seoDescription:
    "Монтаж освещения в Ереване: светильники, люстры, бра, споты, трековые системы, LED-подсветка, наружный свет, диммеры, проходные выключатели и подготовка точек до отделки.",
  eyebrow: "Электромонтаж света",
  heroTitle: "Монтаж освещения в Ереване",
  heroText:
    "Собираем свет как систему: выводы, линии, группы включения, светильники, LED-подсветку, треки, диммеры и наружный свет. Чтобы освещение было удобно включать, легко обслуживать и не переделывать после ремонта.",
  heroMeta: ["Светильники", "LED-подсветка", "Треки", "Наружный свет"],
  contactLabel: "Связь по задаче",
  contactText: "Можно сразу отправить фото, план или короткое описание объекта.",
  layersLabel: "Слои света",
  layersTitle: "Свет делим на группы по задачам",
  layersIntro:
    "Не сваливаем всё на один выключатель. Общий свет, рабочий, акцентный и наружный — в разные группы.",
  layers: [
    {
      label: "01",
      title: "Основной свет",
      text: "Люстры, потолочные светильники, споты и группы, которые дают равномерный свет в помещении.",
      terms: ["люстры", "потолочные светильники", "споты"],
      visual: "ambient",
    },
    {
      label: "02",
      title: "Рабочий свет",
      text: "Подсветка кухни, зеркала, стола, витрины, рабочей поверхности или зоны обслуживания.",
      terms: ["кухня", "зеркало", "рабочая зона"],
      visual: "task",
    },
    {
      label: "03",
      title: "Акцент и LED",
      text: "LED-ленты, профили, ниши, мебель, полки, декоративные линии и блоки питания.",
      terms: ["LED-лента", "профили", "блоки питания"],
      visual: "accent",
    },
    {
      label: "04",
      title: "Наружный свет",
      text: "Фасад, двор, вход, терраса, балкон, ворота и проходные зоны с устойчивым подключением.",
      terms: ["фасад", "двор", "входная зона"],
      visual: "outside",
    },
  ] satisfies LightingLayer[],
  installLabel: "Что монтируем",
  installTitle: "От точки света до готовой схемы включения",
  install: [
    {
      title: "Люстры, бра и светильники",
      text: "Установка потолочных, настенных, подвесных и встроенных светильников.",
      tags: ["люстры", "бра", "споты"],
      visual: "fixture",
    },
    {
      title: "Трековые системы",
      text: "Монтаж шинопровода, подключение треков и настройка направления света.",
      tags: ["трек", "шинопровод", "споты"],
      visual: "track",
    },
    {
      title: "LED-подсветка",
      text: "Ленты, профили, блоки питания, подсветка мебели, кухни, зеркал и ниш.",
      tags: ["LED", "профиль", "блок питания"],
      visual: "led",
    },
    {
      title: "Наружное освещение",
      text: "Фонари у входа, фасадный свет, двор, балкон, терраса, ворота и калитка.",
      tags: ["фасад", "двор", "терраса"],
      visual: "outdoor",
    },
    {
      title: "Выключатели и диммеры",
      text: "Обычные, проходные, перекрестные выключатели и регулировка яркости.",
      tags: ["диммер", "проходной", "группы"],
      visual: "switch",
    },
  ] satisfies InstallType[],
  planningLabel: "До отделки",
  planningTitle: "Сначала схема, потом стены и потолок",
  planningIntro:
    "Самые дорогие ошибки в освещении появляются не при установке люстры, а на этапе трасс и выводов.",
  planningItems: [
    "отмечаем точки под люстры, бра, споты, треки и LED-профили",
    "разводим линии под отдельные группы света",
    "закладываем питание для блоков LED-подсветки и наружных фонарей",
    "планируем места выключателей, диммеров и проходных точек",
    "проверяем трассы до отделки, чтобы потом не вскрывать стены и потолок",
  ],
  controlLabel: "Управление",
  controlTitle: "Удобное включение и подписанные клавиши",
  controlIntro:
    "Чтобы каждая клавиша включала именно тот свет, который ожидаешь.",
  controlItems: [
    {
      title: "Группы света",
      text: "Разделяем общий, рабочий, декоративный и наружный свет, чтобы не включать все сразу.",
    },
    {
      title: "Проходные точки",
      text: "Делаем управление из двух и более мест для коридора, спальни, лестницы и входной зоны.",
    },
    {
      title: "Диммеры",
      text: "Подключаем регулировку яркости там, где это поддерживают светильники и схема.",
    },
    {
      title: "Логика клавиш",
      text: "Подписываем и проверяем группы, чтобы каждая клавиша включала ожидаемый свет.",
    },
  ],
  zonesLabel: "Объекты",
  zonesTitle: "Где обычно делаем",
  zones: [
    {
      title: "Квартира и дом",
      text: "Комнаты, кухня, коридор, санузел, спальня, лестница, балкон и терраса.",
    },
    {
      title: "Коммерция",
      text: "Офисы, студии, салоны, магазины, рабочие места, витрины и зоны обслуживания.",
    },
    {
      title: "Улица и фасад",
      text: "Вход, двор, ворота, калитка, фасад, проходы и наружные светильники.",
    },
  ],
  diagnosticsLabel: "Диагностика",
  diagnosticsTitle: "Если свет уже не работает как надо",
  diagnosticsIntro:
    "Не аварийный выезд, а штатная диагностика по освещению.",
  diagnostics: [
    "свет не включается или мигает",
    "при включении выбивает автомат",
    "работает только часть линии",
    "LED-лента или трек работают нестабильно",
    "наружный свет отключается или не включается",
  ],
  faqLabel: "Вопросы",
  faqTitle: "Коротко по монтажу освещения",
  faq: [
    {
      question: "Можно сделать освещение после ремонта?",
      answer:
        "Можно, но часть решений зависит от того, где уже есть питание и какие трассы доступны. Если отделка еще не закончена, лучше заранее заложить выводы, группы света и места выключателей.",
    },
    {
      question: "Вы подключаете LED-подсветку с профилями и блоками питания?",
      answer:
        "Да. Подключаем LED-ленты, профили, блоки питания и подсветку кухни, мебели, зеркал, ниш, витрин и рабочих зон.",
    },
    {
      question: "Можно управлять светом из двух или трех мест?",
      answer:
        "Да. Для этого собираем проходные или перекрестные схемы, чтобы светом можно было пользоваться из нужных точек: у входа, у кровати, на лестнице или в коридоре.",
    },
  ] satisfies LightingFaq[],
  briefLabel: "Бриф",
  briefTitle: "Опишите объект, и будет понятно, что нужно заложить по свету",
  briefText:
    "Для освещения полезны план помещения, фото потолка, список светильников, места мебели и зоны, где нужен отдельный свет.",
};

type LegacyLightingSectionVariant = "scope" | "places" | "control" | "planning" | "diagnostics" | "result";

interface LegacyLightingSectionCopy {
  label: string;
  title: string;
  items: string[];
  variant: LegacyLightingSectionVariant;
  muted?: boolean;
}

interface LegacyLightingPageLocaleCopy {
  eyebrow: string;
  heroTitle: string;
  seoTitle: string;
  summary: string;
  request: string;
  whatsapp: string;
  objectRail: string[];
  beamSignals: string[];
  sections: LegacyLightingSectionCopy[];
  footerLabel: string;
  footerTitle: string;
  footerMeta: string;
}

const legacyLightingPageCopy: Record<"hy", LegacyLightingPageLocaleCopy> = {
  hy: {
    eyebrow: "Ներքին և արտաքին լուսավորության էլեկտրամոնտաժ",
    heroTitle: "Լուսավորության մոնտաժ Երևանում",
    seoTitle: "Լուսավորության մոնտաժ Երևանում",
    summary:
      "Մոնտաժում ենք ներքին և արտաքին լուսավորություն՝ լուսատուներ, ջահեր, պատի լուսատուներ, սպոտեր, թրեքային համակարգեր, LED-լուսագծեր, դիմմերներ, անցումային անջատիչներ և արտաքին լապտերներ։ Դուրս ենք բերում կետեր, անցկացնում գծեր, միացնում լուսային խմբերը և ստուգում, որ ամեն ինչ աշխատի կայուն և միանա առանց խառնաշփոթի։",
    request: "Թողնել հայտ",
    whatsapp: "WhatsApp",
    beamSignals: ["Լուսատուներ և ջահեր", "LED-լուսագծեր", "Թրեքային համակարգեր", "Արտաքին լույս"],
    objectRail: [
      "Լույսի ելքեր",
      "Լուսային խմբեր",
      "Անցումային անջատիչներ",
      "Դիմմերներ",
      "Ֆասադ և բակ",
      "Լույսի ախտորոշում",
    ],
    sections: [
      {
        label: "Հիմնական աշխատանքներ",
        title: "Ինչ է մտնում լուսավորության մոնտաժի մեջ",
        variant: "scope",
        muted: true,
        items: [
          "ջահերի, պատի լուսատուների, սպոտերի, կախովի և առաստաղային լուսատուների տեղադրում",
          "թրեքային համակարգերի, հոսատարների, LED-ժապավենների, պրոֆիլների և սնուցման բլոկների մոնտաժ",
          "նոր կետերի դուրսբերում լուսավորության համար մինչև հարդարումը կամ վերանորոգումից հետո",
          "լուսատուների տեղափոխում և լրացուցիչ լուսային կետերի ավելացում",
          "խոհանոցի, կահույքի, հայելիների, խորշերի, ցուցափեղկերի, ցուցանակների և աշխատանքային գոտիների լուսավորման միացում",
          "արտաքին լույսի մոնտաժ մուտքի մոտ, ֆասադում, բակում, պատշգամբում, տեռասայում և դարպասների հատվածում",
          "լուսավորության բաժանում առանձին միացման խմբերի",
          "սովորական, անցումային և խաչաձեւ անջատիչների տեղադրում",
          "դիմմերների և պայծառության կարգավորման միացում",
          "հին լուսատուների, անջատիչների, արտաքին լապտերների և բլոկների փոխարինում",
          "թարթման, չաշխատող գծերի, խառնված ստեղների և ավտոմատի աշխատելու ախտորոշում",
        ],
      },
      {
        label: "Ներսում և դրսում",
        title: "Որտեղ ենք անում լուսավորություն",
        variant: "places",
        items: [
          "սենյակներ, խոհանոցներ, միջանցքներ, նախասրահներ, սանհանգույցներ և տեխնիկական տարածքներ",
          "աստիճաններ, երկար անցումներ, մուտքային գոտիներ և վայրեր, որտեղ լույսը պետք է միանա մի քանի կետից",
          "աշխատանքային մակերեսներ, հայելիներ, պահարաններ, խորշեր, դարակներ, կահույք և խոհանոցային գոտիներ",
          "գրասենյակներ, կաբինետներ, ստուդիաներ, սրահներ, խանութներ, ցուցափեղկեր և աշխատանքային տեղեր",
          "ֆասադներ, բակեր, պատշգամբներ, տեռասաներ, դարպասներ, դռնակներ և արտաքին անցումային գոտիներ",
          "ցուցանակներ, ցուցափեղկեր, մուտքային խմբեր և սպասարկման գոտիներ",
        ],
      },
      {
        label: "Լույսի կառավարում",
        title: "Խմբեր, անջատիչներ և պայծառության կարգավորում",
        variant: "control",
        muted: true,
        items: [
          "լուսավորությունը բաժանում ենք առանձին խմբերի, որպեսզի ամեն ինչ միանգամից չմիանա",
          "միացնում ենք անցումային անջատիչներ, որպեսզի լույսը կառավարվի երկու կետից",
          "դնում ենք խաչաձեւ անջատիչներ, եթե լույսը պետք է միանա երեք և ավելի տեղից",
          "միացնում ենք դիմմերներ պայծառության կարգավորման համար",
          "անջատիչները տեղափոխում ենք հարմար տեղեր",
          "վերանորոգումից հետո ուղղում ենք խառնված ստեղները",
          "հավաքում ենք հասկանալի միացման սխեմա խոհանոցի, ննջասենյակի, միջանցքի, աստիճանների, մուտքի գոտու և արտաքին լույսի համար",
        ],
      },
      {
        label: "Մինչև հարդարումը",
        title: "Ինչ է կարևոր նախատեսել նախապես",
        variant: "planning",
        items: [
          "որտեղ կլինեն լուսատուները, թրեքերը, LED-պրոֆիլները և դեկորատիվ լուսավորությունը",
          "որտեղ են պետք ելքեր ջահի, պատի լուսատուի, սպոտի, հայելու, կահույքի, խոհանոցի, ցուցափեղկի կամ արտաքին լապտերի համար",
          "որ գոտիները պետք է միանան առանձին",
          "որտեղ է պետք անցումային անջատիչ",
          "որտեղ է պետք դիմմեր",
          "որտեղ կլինեն մահճակալը, սեղանը, խոհանոցը, հայելին, պահարանները և աշխատանքային մակերեսները",
          "որտեղ նախապես թողնել սնուցում ֆասադի, մուտքի գոտու, պատշգամբի, տեռասայի, բակի կամ դարպասների համար",
          "որտեղ տեղադրել սնուցման բլոկները LED-լուսավորության համար",
          "ինչպես անցկացնել գծերը, որպեսզի հետո պատերը չքանդվեն և առաստաղը չվերափոխվի",
        ],
      },
      {
        label: "Վերանորոգում և ախտորոշում",
        title: "Եթե լուսավորությունը սխալ է աշխատում",
        variant: "diagnostics",
        muted: true,
        items: [
          "լույսը չի միանում",
          "լույսը թարթում է կամ պարբերաբար մարում",
          "լույսը միացնելիս ավտոմատն ընկնում է",
          "աշխատում է միայն գծի մի մասը",
          "անջատիչը միացնում է ոչ այն լուսային խումբը",
          "վերանորոգումից հետո ստեղները խառնված են",
          "LED-ժապավենը անկայուն է վառվում կամ չի միանում",
          "թրեքային համակարգը, ջահը, պատի լուսատուն կամ լուսատուն սխալ են աշխատում",
          "արտաքին լույսը ինքնուրույն անջատվում է կամ չի միանում",
          "պետք է գտնել միացման սխալը և ուղղել սխեման",
        ],
      },
      {
        label: "Արդյունք",
        title: "Ինչպես պետք է աշխատի լուսավորությունը մոնտաժից հետո",
        variant: "result",
        items: [
          "յուրաքանչյուր լուսային կետ միացված է ճիշտ",
          "լուսային խմբերը միանում են հասկանալի կերպով",
          "անցումային անջատիչները աշխատում են ճիշտ կետերից",
          "դիմմերները կարգավորում են պայծառությունը առանց նկատելի թարթման",
          "LED-լուսավորությունը միացված է համապատասխան սնուցման բլոկով",
          "արտաքին լուսատուները աշխատում են կայուն",
          "չկան խառնված ստեղներ, պատահական միացումներ և չաշխատող գծեր",
        ],
      },
    ],
    footerLabel: "Աշխատանքի մեկնարկ",
    footerTitle: "Լուսավորությունը ճիշտ է մտածել մինչև հարդարումը, ոչ թե հետո վերափոխել պատերը, առաստաղը և անջատիչները։",
    footerMeta: "Լուսավորության էլեկտրիկ Երևանում",
  },
};

export function LightingServicePage({ locale, service }: LightingServicePageProps) {
  if (locale !== "ru") {
    return <LegacyLightingServicePage locale={locale} service={service} />;
  }

  return <LightingRuServicePage locale={locale} service={service} />;
}

function LightingRuServicePage({ locale, service }: LightingServicePageProps) {
  const brandLabel = t(locale, brandName);
  const servicePagePath = servicePath(locale, service.slug);

  return (
    <>
      <Seo
        locale={locale}
        title={`${lightingRuPage.seoTitle} | ${brandLabel}`}
        description={lightingRuPage.seoDescription}
        path={servicePagePath}
        structuredData={[
          createBreadcrumbSchema([
            { name: "Главная", path: `/${locale}` },
            { name: "Услуги", path: servicesAnchor(locale) },
            { name: t(locale, service.title), path: servicePagePath },
          ]),
          createServiceSchema(locale, service, servicePagePath),
          createLightingRuFaqSchema(),
        ]}
      />

      <div className="lighting-design-page">
        <section className="lighting-design-page__hero">
          <div className="container lighting-design-page__hero-inner">
            <PageBreadcrumbs
              ariaLabel="Хлебные крошки"
              items={[
                { label: "Главная", to: `/${locale}` },
                { label: "Услуги", to: servicesAnchor(locale) },
                { label: t(locale, service.title) },
              ]}
            />

            <div className="lighting-design-page__hero-grid">
              <div className="lighting-design-page__hero-copy">
                <p className="lighting-design-page__label">{lightingRuPage.eyebrow}</p>
                <h1>{lightingRuPage.heroTitle}</h1>
                <p>{lightingRuPage.heroText}</p>

                <div className="lighting-design-page__contact-rail" aria-label={lightingRuPage.contactLabel}>
                  <span>{lightingRuPage.contactText}</span>
                  <a href={phoneHref}>{phone}</a>
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </div>
              </div>

              <HeroLightPlan />
            </div>

            <div className="lighting-design-page__hero-meta" aria-label="Типы работ">
              {lightingRuPage.heroMeta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="lighting-design-page__layers">
          <div className="container lighting-design-page__section-grid">
            <SectionIntro
              label={lightingRuPage.layersLabel}
              title={lightingRuPage.layersTitle}
              text={lightingRuPage.layersIntro}
            />

            <div className="lighting-design-page__layer-stack">
              {lightingRuPage.layers.map((layer) => (
                <article key={layer.title} className={`lighting-design-page__layer lighting-design-page__layer--${layer.visual}`}>
                  <div className="lighting-design-page__layer-visual" aria-hidden="true">
                    <LayerScene visual={layer.visual} />
                  </div>
                  <div>
                    <span>{layer.label}</span>
                    <h3>{layer.title}</h3>
                    <p>{layer.text}</p>
                    <div className="lighting-design-page__term-row">
                      {layer.terms.map((term) => (
                        <em key={term}>{term}</em>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lighting-design-page__install">
          <div className="container">
            <div className="lighting-design-page__wide-head">
              <p className="lighting-design-page__label">{lightingRuPage.installLabel}</p>
              <h2>{lightingRuPage.installTitle}</h2>
            </div>

            <div className="lighting-design-page__install-rail">
              {lightingRuPage.install.map((item) => (
                <article key={item.title} className="lighting-design-page__install-item">
                  <InstallGlyph visual={item.visual} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="lighting-design-page__term-row">
                    {item.tags.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lighting-design-page__planning">
          <div className="container lighting-design-page__planning-grid">
            <SectionIntro
              label={lightingRuPage.planningLabel}
              title={lightingRuPage.planningTitle}
              text={lightingRuPage.planningIntro}
            />

            <div className="lighting-design-page__blueprint">
              <PlanningDiagram />
              <ol>
                {lightingRuPage.planningItems.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="lighting-design-page__controls">
          <div className="container lighting-design-page__controls-grid">
            <div className="lighting-design-page__control-stage" aria-hidden="true">
              <span className="lighting-design-page__switch lighting-design-page__switch--one" />
              <span className="lighting-design-page__switch lighting-design-page__switch--two" />
              <span className="lighting-design-page__switch lighting-design-page__switch--three" />
              <span className="lighting-design-page__control-light" />
              <span className="lighting-design-page__control-line lighting-design-page__control-line--a" />
              <span className="lighting-design-page__control-line lighting-design-page__control-line--b" />
              <span className="lighting-design-page__control-line lighting-design-page__control-line--c" />
            </div>

            <div className="lighting-design-page__controls-copy">
              <SectionIntro
                label={lightingRuPage.controlLabel}
                title={lightingRuPage.controlTitle}
                text={lightingRuPage.controlIntro}
              />

              <div className="lighting-design-page__control-list">
                {lightingRuPage.controlItems.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lighting-design-page__zones">
          <div className="container lighting-design-page__zones-inner">
            <SectionIntro label={lightingRuPage.zonesLabel} title={lightingRuPage.zonesTitle} />

            <div className="lighting-design-page__zone-scenes">
              {lightingRuPage.zones.map((zone, index) => (
                <article key={zone.title} className="lighting-design-page__zone">
                  <span aria-hidden="true" />
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <h3>{zone.title}</h3>
                  <p>{zone.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lighting-design-page__diagnostics">
          <div className="container lighting-design-page__diagnostics-grid">
            <SectionIntro
              label={lightingRuPage.diagnosticsLabel}
              title={lightingRuPage.diagnosticsTitle}
              text={lightingRuPage.diagnosticsIntro}
            />

            <div className="lighting-design-page__diagnostic-strip">
              {lightingRuPage.diagnostics.map((item) => (
                <article key={item}>
                  <span />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lighting-design-page__faq">
          <div className="container lighting-design-page__faq-grid">
            <SectionIntro label={lightingRuPage.faqLabel} title={lightingRuPage.faqTitle} />

            <div className="lighting-design-page__faq-list">
              {lightingRuPage.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lighting-design-page__brief">
          <div className="container lighting-design-page__brief-grid">
            <div>
              <p className="lighting-design-page__label">{lightingRuPage.briefLabel}</p>
              <h2>{lightingRuPage.briefTitle}</h2>
              <p>{lightingRuPage.briefText}</p>
            </div>

            <LeadForm locale={locale} defaultServiceSlug={service.slug} variant="dark" attachmentsEnabled />
          </div>
        </section>
      </div>
    </>
  );
}

function SectionIntro({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <div className="lighting-design-page__section-intro">
      <p className="lighting-design-page__label">{label}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function HeroLightPlan() {
  return (
    <div className="lighting-design-page__hero-plan" aria-hidden="true">
      <span className="lighting-design-page__room lighting-design-page__room--main" />
      <span className="lighting-design-page__room lighting-design-page__room--side" />
      <span className="lighting-design-page__room lighting-design-page__room--entry" />
      <span className="lighting-design-page__light-dot lighting-design-page__light-dot--one" />
      <span className="lighting-design-page__light-dot lighting-design-page__light-dot--two" />
      <span className="lighting-design-page__light-dot lighting-design-page__light-dot--three" />
      <span className="lighting-design-page__light-dot lighting-design-page__light-dot--four" />
    </div>
  );
}

function LayerScene({ visual }: { visual: LayerVisual }) {
  return (
    <span className={`lighting-design-page__layer-scene lighting-design-page__layer-scene--${visual}`}>
      <i />
      <i />
      <i />
    </span>
  );
}

function InstallGlyph({ visual }: { visual: InstallVisual }) {
  return (
    <svg className={`lighting-design-page__glyph lighting-design-page__glyph--${visual}`} viewBox="0 0 96 96" aria-hidden="true">
      {visual === "fixture" ? (
        <>
          <path d="M48 12v18" />
          <path d="M30 30h36l-8 22H38L30 30Z" />
          <path d="M38 62h20" />
          <circle cx="48" cy="70" r="8" />
        </>
      ) : null}
      {visual === "track" ? (
        <>
          <path d="M16 24h64" />
          <path d="M28 24v22" />
          <path d="M54 24v28" />
          <path d="M28 46l16 8" />
          <path d="M54 52l20 10" />
          <circle cx="44" cy="54" r="6" />
          <circle cx="74" cy="62" r="6" />
        </>
      ) : null}
      {visual === "led" ? (
        <>
          <path d="M18 34h60" />
          <path d="M18 50h60" />
          <path d="M18 66h60" />
          <circle cx="28" cy="34" r="3" />
          <circle cx="48" cy="50" r="3" />
          <circle cx="68" cy="66" r="3" />
        </>
      ) : null}
      {visual === "outdoor" ? (
        <>
          <path d="M48 16v64" />
          <path d="M34 30h28l-6 18H40L34 30Z" />
          <path d="M28 80h40" />
          <path d="M24 52c12 10 36 10 48 0" />
        </>
      ) : null}
      {visual === "switch" ? (
        <>
          <rect x="30" y="18" width="36" height="60" rx="2" />
          <path d="M38 30h20" />
          <path d="M38 48h20" />
          <path d="M38 66h12" />
          <circle cx="60" cy="64" r="3" />
        </>
      ) : null}
    </svg>
  );
}

function PlanningDiagram() {
  return (
    <div className="lighting-design-page__plan-diagram" aria-hidden="true">
      <span className="lighting-design-page__plan-room lighting-design-page__plan-room--a" />
      <span className="lighting-design-page__plan-room lighting-design-page__plan-room--b" />
      <span className="lighting-design-page__plan-room lighting-design-page__plan-room--c" />
      <span className="lighting-design-page__plan-cable lighting-design-page__plan-cable--a" />
      <span className="lighting-design-page__plan-cable lighting-design-page__plan-cable--b" />
      <span className="lighting-design-page__plan-node lighting-design-page__plan-node--a" />
      <span className="lighting-design-page__plan-node lighting-design-page__plan-node--b" />
      <span className="lighting-design-page__plan-node lighting-design-page__plan-node--c" />
    </div>
  );
}

function createLightingRuFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lightingRuPage.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function LegacyLightingServicePage({ locale, service }: { locale: "hy"; service: ServiceEntry }) {
  const brandLabel = t(locale, brandName);
  const copy = legacyLightingPageCopy[locale];
  const servicePagePath = servicePath(locale, service.slug);
  const requestPath = `${pagePath(locale, "contacts")}?service=${service.slug}`;
  const faqSchema = createFaqSchema(locale, service.faq);

  return (
    <>
      <Seo
        locale={locale}
        title={`${copy.seoTitle} | ${brandLabel}`}
        description={copy.summary}
        path={servicePagePath}
        structuredData={[
          createBreadcrumbSchema([
            { name: "Գլխավոր", path: `/${locale}` },
            { name: "Ծառայություններ", path: servicesAnchor(locale) },
            { name: t(locale, service.title), path: servicePagePath },
          ]),
          createServiceSchema(locale, service, servicePagePath),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <div className="lighting-service-page">
        <section className="lighting-service-page__hero">
          <div className="container lighting-service-page__hero-inner">
            <PageBreadcrumbs
              ariaLabel="Նավարկման շղթա"
              items={[
                { label: "Գլխավոր", to: `/${locale}` },
                { label: "Ծառայություններ", to: servicesAnchor(locale) },
                { label: t(locale, service.title) },
              ]}
            />

            <div className="lighting-service-page__hero-grid">
              <div className="lighting-service-page__hero-copy">
                <p className="lighting-service-page__eyebrow">{copy.eyebrow}</p>
                <h1>{copy.heroTitle}</h1>
                <p className="lighting-service-page__summary">{copy.summary}</p>

                <div className="lighting-service-page__actions">
                  <NavLink to={requestPath} className="button lighting-service-page__button lighting-service-page__button--primary">
                    {copy.request}
                  </NavLink>
                  <a href={whatsappHref} className="button lighting-service-page__button lighting-service-page__button--ghost">
                    {copy.whatsapp}
                  </a>
                </div>
              </div>

              <div className="lighting-service-page__beam-board" aria-hidden="true">
                <div className="lighting-service-page__plan-board">
                  <span className="lighting-service-page__plan-room lighting-service-page__plan-room--main" />
                  <span className="lighting-service-page__plan-room lighting-service-page__plan-room--side" />
                  <span className="lighting-service-page__plan-room lighting-service-page__plan-room--entry" />
                  <span className="lighting-service-page__plan-light lighting-service-page__plan-light--one" />
                  <span className="lighting-service-page__plan-light lighting-service-page__plan-light--two" />
                  <span className="lighting-service-page__plan-light lighting-service-page__plan-light--three" />
                </div>

                <div className="lighting-service-page__beam-list">
                  {copy.beamSignals.map((item) => (
                    <div key={item} className="lighting-service-page__beam-row">
                      <span className="lighting-service-page__beam-dot" />
                      <span className="lighting-service-page__beam-label">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lighting-service-page__object-rail">
              {copy.objectRail.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {copy.sections.map((section) => (
          <LegacyLightingSection key={`${section.variant}-${section.title}`} section={section} />
        ))}

        <section className="lighting-service-page__final">
          <div className="container lighting-service-page__final-inner">
            <div className="lighting-service-page__final-copy">
              <p className="lighting-service-page__section-label">{copy.footerLabel}</p>
              <h2>{copy.footerTitle}</h2>
              <p className="lighting-service-page__final-meta">{copy.footerMeta}</p>
            </div>

            <div className="lighting-service-page__actions lighting-service-page__actions--final">
              <NavLink to={requestPath} className="button lighting-service-page__button lighting-service-page__button--primary">
                {copy.request}
              </NavLink>
              <a href={whatsappHref} className="button lighting-service-page__button lighting-service-page__button--ghost">
                {copy.whatsapp}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function LegacyLightingSection({ section }: { section: LegacyLightingSectionCopy }) {
  const className = [
    "lighting-service-page__section",
    section.muted ? "lighting-service-page__section--muted" : "",
    `lighting-service-page__section--${section.variant}`,
  ]
    .filter(Boolean)
    .join(" ");

  if (section.variant === "scope") {
    return (
      <section className={className}>
        <div className="container lighting-service-page__section-inner lighting-service-page__section-inner--scope">
          <div className="lighting-service-page__section-head lighting-service-page__section-head--wide">
            <p className="lighting-service-page__section-label">{section.label}</p>
            <h2>{section.title}</h2>
          </div>

          <div className="lighting-service-page__scope-board">
            {section.items.map((item, index) => (
              <article
                key={item}
                className={`lighting-service-page__scope-item ${index < 2 ? "lighting-service-page__scope-item--major" : ""}`.trim()}
              >
                <span className="lighting-service-page__scope-index">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.variant === "places") {
    return (
      <section className={className}>
        <div className="container lighting-service-page__section-inner lighting-service-page__section-inner--places">
          <div className="lighting-service-page__places-copy">
            <div className="lighting-service-page__section-head">
              <p className="lighting-service-page__section-label">{section.label}</p>
              <h2>{section.title}</h2>
            </div>

            <div className="lighting-service-page__mini-plan" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="lighting-service-page__zone-map">
            <span className="lighting-service-page__zone-axis lighting-service-page__zone-axis--vertical" aria-hidden="true" />
            <span className="lighting-service-page__zone-axis lighting-service-page__zone-axis--horizontal" aria-hidden="true" />
            <span className="lighting-service-page__zone-core" aria-hidden="true" />
            {section.items.map((item, index) => (
              <article key={item} className="lighting-service-page__zone-item">
                <span className="lighting-service-page__zone-pin">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.variant === "control") {
    return (
      <section className={className}>
        <div className="container lighting-service-page__section-inner lighting-service-page__section-inner--control">
          <div className="lighting-service-page__control-head">
            <p className="lighting-service-page__section-label">{section.label}</p>
            <h2>{section.title}</h2>
          </div>

          <div className="lighting-service-page__control-diagram">
            <div className="lighting-service-page__control-source" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            {section.items.map((item, index) => (
              <article key={item} className="lighting-service-page__control-node">
                <span className="lighting-service-page__control-pin">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.variant === "planning") {
    return (
      <section className={className}>
        <div className="container lighting-service-page__section-inner lighting-service-page__section-inner--planning">
          <div className="lighting-service-page__blueprint-head">
            <p className="lighting-service-page__section-label">{section.label}</p>
            <h2>{section.title}</h2>
          </div>

          <div className="lighting-service-page__blueprint-board">
            <div className="lighting-service-page__blueprint-plan" aria-hidden="true">
              <span className="lighting-service-page__blueprint-room lighting-service-page__blueprint-room--wide" />
              <span className="lighting-service-page__blueprint-room lighting-service-page__blueprint-room--narrow" />
              <span className="lighting-service-page__blueprint-room lighting-service-page__blueprint-room--lower" />
              <span className="lighting-service-page__blueprint-point lighting-service-page__blueprint-point--one" />
              <span className="lighting-service-page__blueprint-point lighting-service-page__blueprint-point--two" />
              <span className="lighting-service-page__blueprint-point lighting-service-page__blueprint-point--three" />
            </div>

            <ol className="lighting-service-page__blueprint-list">
              {section.items.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    );
  }

  if (section.variant === "diagnostics") {
    return (
      <section className={className}>
        <div className="container lighting-service-page__section-inner lighting-service-page__section-inner--diagnostics">
          <div className="lighting-service-page__diagnostic-head">
            <p className="lighting-service-page__section-label">{section.label}</p>
            <h2>{section.title}</h2>
          </div>

          <div className="lighting-service-page__diagnostic-console">
            <div className="lighting-service-page__diagnostic-meter" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="lighting-service-page__diagnostic-list">
              {section.items.map((item, index) => (
                <article key={item} className="lighting-service-page__diagnostic-row">
                  <span className="lighting-service-page__diagnostic-pulse" />
                  <p>{item}</p>
                  <span className="lighting-service-page__diagnostic-code">{String(index + 1).padStart(2, "0")}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <div className="container lighting-service-page__section-inner lighting-service-page__section-inner--result">
        <div className="lighting-service-page__section-head lighting-service-page__section-head--result">
          <p className="lighting-service-page__section-label">{section.label}</p>
          <h2>{section.title}</h2>
        </div>

        <div className="lighting-service-page__acceptance-board">
          <div className="lighting-service-page__acceptance-gauge" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="lighting-service-page__acceptance-list">
            {section.items.map((item, index) => (
              <article key={item} className="lighting-service-page__acceptance-item">
                <span className="lighting-service-page__acceptance-mark">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
