import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { parsePath, withLocale, type Locale } from "../lib/locale";
import { t } from "../lib/i18n";

type Theme = "light" | "dark" | "system";

type AppCtx = {
  locale: Locale;
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  link: (path: string) => string;
  tt: (key: string, vars?: Record<string, string | number>) => string;
  rest: string;
  segs: string[];
};

const Ctx = createContext<AppCtx | null>(null);

function applyTheme(theme: Theme) {
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const resolved = theme === "system" ? system : theme;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  return resolved;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parsed = useMemo(() => parsePath(pathname), [pathname]);
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("theme") as Theme) || "system";
    } catch {
      return "system";
    }
  });
  const [resolvedTheme, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    setResolved(applyTheme(theme));
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") setResolved(applyTheme(theme));
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem("theme", next);
    setThemeState(next);
  }, []);

  const link = useCallback((path: string) => withLocale(parsed.locale, path), [parsed.locale]);
  const tt = useCallback(
    (key: string, vars?: Record<string, string | number>) => t(parsed.locale, key, vars),
    [parsed.locale],
  );

  const value = useMemo(
    () => ({
      locale: parsed.locale,
      theme,
      resolvedTheme,
      setTheme,
      link,
      tt,
      rest: parsed.rest,
      segs: parsed.segs,
    }),
    [parsed.locale, parsed.rest, parsed.segs, theme, resolvedTheme, setTheme, link, tt],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp outside provider");
  return ctx;
}
