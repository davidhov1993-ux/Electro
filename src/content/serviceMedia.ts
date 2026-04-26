import type { LocalizedText, ServiceSlug } from "@/src/types";

export interface ServiceMediaEntry {
  image: string;
  alt: LocalizedText;
  badge: LocalizedText;
  signal: LocalizedText;
}

export const sceneAssetLibrary = {
  switchboard: "/images/44F657F0-372D-4D91-812A-D0246AA58189.png",
  lighting: "/images/AC4406F7-57AF-4484-839C-9D6038DC88A5.png",
  cctv: "/images/PHOTO-2026-03-10-19-50-30 (фон удален).png",
  lowCurrent: "/images/2BF26559-92EC-4512-99E0-253A12AECBFB.png",
  smartHome: "/images/62AEB4A1-7C67-44DD-8E98-40F3DDDBEA5E.png",
  floorHeating: "/images/E17EB074-9D96-4162-9DCE-1C7C156FC9CB.png",
  installation: "/images/A43F9DC4-235F-409E-8655-6BE284D93532.png",
  emergency: "/images/C0FC7B02-D0B7-4D95-97C7-C1478B70B96D.png",
  intercom: "/images/9ABB4E5A-29E5-411C-B6A3-3298BB97AF8F.png",
  access: "/images/9314C568-87AD-46C7-8AEA-874EAAD580C9.png",
  washer: "/images/C73AA8A2-FD2A-4192-A73E-B4F509651F7F.png",
  laptop: "/images/C95FAD25-2DC1-4928-BEFA-25156A620331.png",
} as const;

export const serviceMedia: Record<ServiceSlug, ServiceMediaEntry> = {
  elektromontazh: {
    image: sceneAssetLibrary.installation,
    alt: {
      ru: "Инструменты, монтажная коробка и кабель для электромонтажа",
      hy: "Էլեկտրամոնտաժի գործիքներ, միացման տուփ և մալուխ",
    },
    badge: { ru: "Монтажная линия", hy: "Մոնտաժային գիծ" },
    signal: { ru: "Кабель / коробка / инструмент", hy: "Մալուխ / տուփ / գործիք" },
  },
  "elektroshchity-i-avtomatika": {
    image: sceneAssetLibrary.switchboard,
    alt: {
      ru: "Электрощит с автоматикой и распределением линий",
      hy: "Էլեկտրական վահան ավտոմատիկայով և գծերի բաշխմամբ",
    },
    badge: { ru: "Инженерный центр", hy: "Ինժեներական կենտրոն" },
    signal: { ru: "Щит / защита / автоматика", hy: "Վահան / պաշտպանություն / ավտոմատիկա" },
  },
  osveshchenie: {
    image: sceneAssetLibrary.lighting,
    alt: {
      ru: "Лампа как визуальный маркер освещения",
      hy: "Լամպ՝ որպես լուսավորության վիզուալ նշան",
    },
    badge: { ru: "Световой сценарий", hy: "Լուսային սցենար" },
    signal: { ru: "Свет / группы / атмосфера", hy: "Լույս / խմբեր / մթնոլորտ" },
  },
  "slabotochnye-sistemy": {
    image: sceneAssetLibrary.lowCurrent,
    alt: {
      ru: "Сетевой кабель и патч-панель для слаботочных систем",
      hy: "Ցանցային մալուխ և patch-panel թույլ հոսանքային համակարգերի համար",
    },
    badge: { ru: "Сигнальная сеть", hy: "Ազդանշանային ցանց" },
    signal: { ru: "Сеть / интернет / трассы", hy: "Ցանց / ինտերնետ / գծեր" },
  },
  videonablyudenie: {
    image: sceneAssetLibrary.cctv,
    alt: {
      ru: "Камера видеонаблюдения",
      hy: "Տեսահսկման տեսախցիկ",
    },
    badge: { ru: "Контур наблюдения", hy: "Հսկողության կոնտուր" },
    signal: { ru: "Камеры / запись / обзор", hy: "Տեսախցիկներ / ձայնագրություն / դիտում" },
  },
  "elektrozamki-i-kontrol-dostupa": {
    image: sceneAssetLibrary.access,
    alt: {
      ru: "Панель доступа с клавиатурой и картой",
      hy: "Մուտքի վահանակ ստեղնաշարով և քարտով",
    },
    badge: { ru: "Узел доступа", hy: "Մուտքի հանգույց" },
    signal: { ru: "Карта / код / замок", hy: "Քարտ / կոդ / կողպեք" },
  },
  "umnyi-dom-i-umnaya-tekhnika": {
    image: sceneAssetLibrary.smartHome,
    alt: {
      ru: "Панель умного дома с управлением сценариями",
      hy: "Խելացի տան վահանակ՝ սցենարների կառավարմամբ",
    },
    badge: { ru: "Smart-ядро", hy: "Smart միջուկ" },
    signal: { ru: "Сценарии / климат / устройства", hy: "Սցենարներ / կլիմա / սարքեր" },
  },
  "teplyi-pol": {
    image: sceneAssetLibrary.floorHeating,
    alt: {
      ru: "Тёплый пол и терморегулятор",
      hy: "Տաք հատակ և ջերմաստիճան կարգավորիչ",
    },
    badge: { ru: "Тепловой контур", hy: "Ջերմային կոնտուր" },
    signal: { ru: "Нагрев / зоны / термостат", hy: "Տաքացում / գոտիներ / թերմոստատ" },
  },
  "avariinyi-elektrik": {
    image: sceneAssetLibrary.emergency,
    alt: {
      ru: "Аварийные кнопки и сигнализация для срочного выезда",
      hy: "Արտակարգ կոճակներ և ազդանշանային համակարգ շտապ մեկնելու համար",
    },
    badge: { ru: "Красный канал", hy: "Կարմիր ալիք" },
    signal: { ru: "SOS / выезд / локализация", hy: "SOS / մեկնում / տեղորոշում" },
  },
};

export function getServiceMedia(slug?: string): ServiceMediaEntry {
  if (!slug) {
    return {
      image: sceneAssetLibrary.switchboard,
      alt: {
        ru: "Электрощит компании «Электрик»",
        hy: "«Էլեկտրիկ» ընկերության էլեկտրական վահան",
      },
      badge: { ru: "Инженерный узел", hy: "Ինժեներական հանգույց" },
      signal: { ru: "Щит / линии / защита", hy: "Վահան / գծեր / պաշտպանություն" },
    };
  }

  return serviceMedia[slug as ServiceSlug] ?? getServiceMedia();
}
