import type { Locale, LocalizedText } from "@/src/types";

const localized = (ru: string, hy?: string): LocalizedText => ({ ru, hy: hy ?? ru });

export const homeSeoContent = {
  metaTitle: localized(
    "Электрик в Ереване — электромонтаж, щиты, видеонаблюдение",
    "Էլեկտրիկ Երևանում՝ էլեկտրամոնտաժ, վահաններ, տեսահսկում",
  ),
  metaDescription: localized(
    "Электромонтаж, электрощиты, освещение, видеонаблюдение, домофоны, тёплый пол. Аварийный выезд по Еревану.",
    "Էլեկտրամոնտաժ, վահաններ, լուսավորություն, տեսահսկում, դոմոֆոններ, տաք հատակ։ Արտակարգ մեկնում Երևանում։",
  ),
  servicesIntro: localized(
    "Что мы делаем — от прокладки кабеля до видеонаблюдения и автоматики.",
    "Ինչ ենք անում՝ մալուխի անցկացումից մինչև տեսահսկում և ավտոմատիկա։",
  ),
  contactTitle: localized("Связаться с нами", "Կապվել մեզ հետ"),
  contactDescription: localized(
    "Пн–Сб 10:00–22:00. Аварийные вызовы — приоритетные. Работаем по Еревану.",
    "Երկ–Շաբ 10:00–22:00։ Արտակարգ կանչերը՝ առաջնահերթ։ Աշխատում ենք Երևանում։",
  ),
};

export function hs(locale: Locale, value: LocalizedText) {
  return value[locale];
}
