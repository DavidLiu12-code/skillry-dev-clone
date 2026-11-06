import en from "../data/en.json";
import zh from "../data/zh.json";
import type { Locale } from "./locale";

type Dict = Record<string, unknown>;

const dicts: Record<string, Dict> = {
  en: en as Dict,
  zh: zh as Dict,
};

export function t(locale: Locale, key: string, vars?: Record<string, string | number>) {
  const table = dicts[locale] ?? dicts.en;
  const raw = table[key] ?? dicts.en[key];
  let value = typeof raw === "string" ? raw : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replaceAll(`{${k}}`, String(v));
    }
  }
  return value;
}

export function tList(locale: Locale, key: string): string[] {
  const table = dicts[locale] ?? dicts.en;
  const raw = table[key] ?? dicts.en[key];
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      return [raw];
    }
  }
  return [];
}
