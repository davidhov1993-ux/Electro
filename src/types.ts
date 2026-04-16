export type Locale = "ru" | "hy";

export type ServiceGroup = "power" | "automation" | "security" | "comfort" | "emergency";

export type AccentTone = "blue" | "amber" | "steel";

export type ServiceSlug =
  | "elektromontazh"
  | "elektroshchity-i-avtomatika"
  | "osveshchenie"
  | "slabotochnye-sistemy"
  | "videonablyudenie"
  | "elektrozamki-i-kontrol-dostupa"
  | "umnyi-dom-i-umnaya-tekhnika"
  | "teplyi-pol"
  | "avariinyi-elektrik"
  | "slozhnye-proekty-pod-klyuch";

export type StaticPageKey = "about" | "why" | "certificates" | "contacts" | "request";
export type InfoPageKey = Exclude<StaticPageKey, "contacts" | "request">;

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface LocalizedFaqItem {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface ServiceEntry {
  slug: ServiceSlug;
  group: ServiceGroup;
  accent: AccentTone;
  shortLabel: LocalizedText;
  title: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  bullets: LocalizedList;
  problems: LocalizedList;
  included: LocalizedList;
  objects: LocalizedList;
  faq: LocalizedFaqItem[];
}

export interface GenericPanel {
  title: LocalizedText;
  description: LocalizedText;
}

export interface StaticPageContent {
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  panels: GenericPanel[];
}
