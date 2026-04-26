import { LeadForm } from "@/src/components/LeadForm";
import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Seo } from "@/src/components/Seo";
import { brandName, t } from "@/src/content/site";
import { servicePath, servicesAnchor } from "@/src/lib/locale";
import { createBreadcrumbSchema, createFaqSchema, createServiceSchema } from "@/src/lib/seo";
import type { Locale, ServiceEntry } from "@/src/types";

const phoneHref = "tel:+37499586469";
const whatsappHref = "https://wa.me/37499586469";

interface VideoSurveillanceServicePageProps {
  locale: Extract<Locale, "ru">;
  service: ServiceEntry;
}

const videoPage = {
  seoTitle: "Видеонаблюдение в Ереване",
  seoDescription:
    "Установка видеонаблюдения в Ереване: IP/PoE-камеры, наружные и внутренние камеры, регистратор, архив, удалённый доступ, проверка зон обзора и качества записи.",
  eyebrow: "Security / CCTV",
  heroTitle: "Видеонаблюдение в Ереване",
  heroText:
    "Проектируем и монтируем камеры так, чтобы система давала полезную запись: кто вошёл, что произошло, где движение, есть ли слепые зоны и можно ли быстро найти нужный фрагмент.",
  heroTags: ["Вход", "Двор", "Касса", "Склад", "Парковка", "Офис"],
  contactLabel: "Быстрая связь",
  contactText: "Можно отправить план объекта, фото входов или список зон, которые нужно контролировать.",
  zonesLabel: "Зоны",
  zonesTitle: "Сначала решаем, что нужно видеть",
  zonesText:
    "Система начинается не с количества камер, а с целей наблюдения: распознать лицо, увидеть движение, закрыть проход, контролировать кассу или сохранить запись по периметру.",
  zones: [
    {
      label: "Entry",
      title: "Входы и проходы",
      text: "Камера ставится так, чтобы был виден человек, направление движения и момент входа.",
    },
    {
      label: "Asset",
      title: "Касса, склад, оборудование",
      text: "Отдельные зоны, где важны детали: руки, товар, дверь, стеллаж, рабочее место.",
    },
    {
      label: "Perimeter",
      title: "Двор, парковка, фасад",
      text: "Наружные камеры с учётом высоты, света, ночного режима и устойчивой прокладки.",
    },
  ],
  systemLabel: "Система",
  systemTitle: "Система камер",
  systemItems: [
    {
      title: "Камеры",
      text: "Внутренние, наружные, купольные, цилиндрические, IP/PoE под задачу и место установки.",
    },
    {
      title: "Линии",
      text: "Кабель, питание, PoE, трассы и аккуратный ввод в место установки регистратора.",
    },
    {
      title: "Запись",
      text: "Регистратор, диск, режим записи, детекция движения, дата, время и понятный архив.",
    },
    {
      title: "Доступ",
      text: "Просмотр с телефона или компьютера, проверка live-view и поиска записи.",
    },
  ],
  objectsLabel: "Объекты",
  objectsTitle: "Схема камер под объект",
  objects: [
    ["Квартира", "вход, лестничная площадка, двор или парковка"],
    ["Дом", "ворота, фасад, двор, терраса, калитка, периметр"],
    ["Магазин", "касса, вход, витрина, склад, торговый зал"],
    ["Офис", "вход, коридоры, рабочие зоны, серверная"],
    ["Склад", "ворота, проходы, стеллажи, зоны погрузки"],
  ],
  archiveLabel: "Архив",
  archiveTitle: "Архив важен как live-view",
  archiveText:
    "Частая ошибка: в live-view картинка нормальная, а в архиве нет нужной детализации или запись уже перезаписана. Поэтому заранее считаются камеры, разрешение, режим записи и срок хранения.",
  archiveItems: [
    "качество live-view и записанного видео",
    "срок хранения архива под задачу",
    "поиск фрагмента по времени и камере",
    "детекция движения без лишнего шума",
    "экспорт записи при инциденте",
  ],
  checkLabel: "Проверка",
  checkTitle: "Монтаж проверяется тестом",
  checkItems: [
    "каждая камера видит нужную зону",
    "нет критичных слепых мест",
    "ночной режим даёт usable-картинку",
    "запись сохраняется и открывается",
    "удалённый доступ работает с телефона",
    "архив можно быстро найти и показать",
  ],
  briefLabel: "Бриф",
  briefTitle: "Опишите объект и зоны контроля",
  briefText:
    "Фото входов, план объекта, список зон и срок хранения архива помогают сразу подобрать камеры, трассы и регистратор.",
};

export function VideoSurveillanceServicePage({ locale, service }: VideoSurveillanceServicePageProps) {
  const brandLabel = t(locale, brandName);
  const servicePagePath = servicePath(locale, service.slug);
  const faqSchema = createFaqSchema(locale, service.faq);

  return (
    <>
      <Seo
        locale={locale}
        title={`${videoPage.seoTitle} | ${brandLabel}`}
        description={videoPage.seoDescription}
        path={servicePagePath}
        structuredData={[
          createBreadcrumbSchema([
            { name: "Главная", path: `/${locale}` },
            { name: "Услуги", path: servicesAnchor(locale) },
            { name: t(locale, service.title), path: servicePagePath },
          ]),
          createServiceSchema(locale, service, servicePagePath),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <div className="video-service-page">
        <section className="video-service-page__hero">
          <div className="container video-service-page__hero-inner">
            <PageBreadcrumbs
              ariaLabel="Хлебные крошки"
              items={[
                { label: "Главная", to: `/${locale}` },
                { label: "Услуги", to: servicesAnchor(locale) },
                { label: t(locale, service.title) },
              ]}
            />

            <div className="video-service-page__hero-grid">
              <div className="video-service-page__hero-copy">
                <p className="video-service-page__label">{videoPage.eyebrow}</p>
                <h1>{videoPage.heroTitle}</h1>
                <p>{videoPage.heroText}</p>

                <div className="video-service-page__contact-rail">
                  <span>
                    <strong>{videoPage.contactLabel}</strong>
                    {videoPage.contactText}
                  </span>
                  <a href={phoneHref}>+374 99 586 469</a>
                  <a href={whatsappHref}>WhatsApp</a>
                </div>
              </div>

              <SurveillanceWall tags={videoPage.heroTags} />
            </div>
          </div>
        </section>

        <div className="video-service-page__control-room">
          <section className="video-service-page__ops-scene" aria-labelledby="video-service-ops-title">
            <div className="container video-service-page__ops-grid">
              <div className="video-service-page__zones-console video-service-page__console">
                <div className="video-service-page__section-head">
                  <p className="video-service-page__label">{videoPage.zonesLabel}</p>
                  <h2 id="video-service-ops-title">{videoPage.zonesTitle}</h2>
                  <p>{videoPage.zonesText}</p>
                </div>

                <div className="video-service-page__zone-map" aria-hidden="true">
                  <span className="video-service-page__plan-room video-service-page__plan-room--entry" />
                  <span className="video-service-page__plan-room video-service-page__plan-room--store" />
                  <span className="video-service-page__plan-room video-service-page__plan-room--yard" />
                  <span className="video-service-page__camera video-service-page__camera--a" />
                  <span className="video-service-page__camera video-service-page__camera--b" />
                  <span className="video-service-page__camera video-service-page__camera--c" />
                  <span className="video-service-page__cone video-service-page__cone--a" />
                  <span className="video-service-page__cone video-service-page__cone--b" />
                  <span className="video-service-page__cone video-service-page__cone--c" />
                </div>

                <div className="video-service-page__zone-list">
                  {videoPage.zones.map((item) => (
                    <article key={item.title}>
                      <span>{item.label}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="video-service-page__signal-console video-service-page__console">
                <div className="video-service-page__wide-head">
                  <p className="video-service-page__label">{videoPage.systemLabel}</p>
                  <h2>{videoPage.systemTitle}</h2>
                </div>

                <div className="video-service-page__signal-chain">
                  {videoPage.systemItems.map((item, index) => (
                    <article key={item.title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="video-service-page__objects-console video-service-page__console">
                <div className="video-service-page__section-head">
                  <p className="video-service-page__label">{videoPage.objectsLabel}</p>
                  <h2>{videoPage.objectsTitle}</h2>
                </div>

                <div className="video-service-page__object-rows">
                  {videoPage.objects.map(([title, text]) => (
                    <article key={title}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="video-service-page__archive-console video-service-page__console">
                <div className="video-service-page__archive-copy">
                  <p className="video-service-page__label">{videoPage.archiveLabel}</p>
                  <h2>{videoPage.archiveTitle}</h2>
                  <p>{videoPage.archiveText}</p>
                </div>

                <div className="video-service-page__archive-panel">
                  <div className="video-service-page__timeline" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <ul>
                    {videoPage.archiveItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="video-service-page__check-console video-service-page__console">
                <div className="video-service-page__section-head">
                  <p className="video-service-page__label">{videoPage.checkLabel}</p>
                  <h2>{videoPage.checkTitle}</h2>
                </div>

                <ul className="video-service-page__check-list">
                  {videoPage.checkItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="video-service-page__faq-console">
            <div className="container video-service-page__faq-layout">
              <div className="video-service-page__section-head">
                <p className="video-service-page__label">FAQ</p>
                <h2>Вопросы по камерам</h2>
              </div>

              <div className="video-service-page__faq-list">
                {service.faq.map((item) => (
                  <details key={item.question.ru}>
                    <summary>{item.question.ru}</summary>
                    <p>{item.answer.ru}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="video-service-page__brief">
            <div className="container video-service-page__brief-grid">
              <div>
                <p className="video-service-page__label">{videoPage.briefLabel}</p>
                <h2>{videoPage.briefTitle}</h2>
                <p>{videoPage.briefText}</p>
              </div>
              <LeadForm
                key={`${locale}-${service.slug}`}
                locale={locale}
                defaultServiceSlug={service.slug}
                variant="dark"
                attachmentsEnabled
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function SurveillanceWall({ tags }: { tags: string[] }) {
  return (
    <div className="video-service-page__monitor-wall" aria-hidden="true">
      <div className="video-service-page__monitor video-service-page__monitor--main">
        <span className="video-service-page__rec">REC</span>
        <span className="video-service-page__scanline" />
        <span className="video-service-page__target video-service-page__target--a" />
        <span className="video-service-page__target video-service-page__target--b" />
        <span className="video-service-page__timestamp">22:48:16</span>
      </div>
      {tags.map((tag, index) => (
        <div key={tag} className="video-service-page__monitor-tile">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{tag}</strong>
        </div>
      ))}
    </div>
  );
}
