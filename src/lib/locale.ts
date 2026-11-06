export const LOCALES = ["zh", "zh-tw", "ja", "ko", "es", "pt-br", "de", "fr"] as const;
export type Locale = "en" | (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  "zh-tw": "繁體中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  "pt-br": "Português (Brasil)",
  de: "Deutsch",
  fr: "Français",
};

const LOCALE_SET = new Set<string>(LOCALES);

export function parsePath(pathname: string) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const segs = clean.split("/").filter(Boolean);
  if (segs[0] && LOCALE_SET.has(segs[0])) {
    return {
      locale: segs[0] as Locale,
      rest: segs.length > 1 ? `/${segs.slice(1).join("/")}` : "/",
      segs: segs.slice(1),
    };
  }
  return { locale: "en" as Locale, rest: clean === "" ? "/" : clean, segs };
}

export function withLocale(locale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
