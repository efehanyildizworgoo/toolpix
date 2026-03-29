export const locales = ["tr", "de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return "ltr";
}

export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    tr: "Türkçe",
    de: "Deutsch",
    en: "English",
  };
  return names[locale];
}
