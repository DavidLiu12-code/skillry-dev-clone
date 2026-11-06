import { useState } from "react";
import {
  IconLanguage,
  IconMenu2,
  IconMessagePlus,
  IconMoon,
  IconSun,
  IconX,
} from "@tabler/icons-react";
import { Menu } from "@base-ui/react/menu";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { AppLink } from "../lib/href";
import { LOCALES, LOCALE_LABELS, withLocale, type Locale } from "../lib/locale";
import { NavItem, NavMenu } from "./NavMenu";
import { SearchDialog } from "./SearchDialog";

export function Header() {
  const { locale, link, tt, rest, theme, setTheme } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const switchLocale = (next: Locale) => withLocale(next, rest || "/");

  return (
    <header
      className="sticky top-(--promo-banner-height) z-40 bg-[#f4f1e9]/92 backdrop-blur-xl transition-[background-color,box-shadow] dark:bg-[#11110f]/92"
      data-testid="storefront-header"
    >
      <nav className="mx-auto flex min-h-14 w-full max-w-none flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 pb-2.5 pt-2 sm:px-6 md:min-h-16 md:gap-y-3 md:py-3 lg:px-8 xl:h-16 xl:flex-nowrap xl:py-0">
        <div className="flex min-w-0 shrink-0 items-center gap-5 lg:gap-6">
          <AppLink
            to={link("/")}
            data-testid="storefront-home-link"
            className="group -ml-2 flex min-h-11 items-center gap-2 rounded-xl px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/35"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Skillry logo"
              className="size-7 rounded-[9px] transition-transform duration-200 group-hover:scale-[1.04] dark:hidden md:size-8 md:rounded-[10px]"
              width={32}
              height={32}
            />
            <img
              src={`${import.meta.env.BASE_URL}logo-dark.png`}
              alt="Skillry logo"
              className="hidden size-7 rounded-[9px] ring-1 ring-white/30 shadow-[0_0_0_4px_rgba(244,241,233,0.07)] transition-transform duration-200 group-hover:scale-[1.04] dark:block md:size-8 md:rounded-[10px]"
              width={32}
              height={32}
            />
            <span className="font-semibold tracking-[-0.025em]">Skillry</span>
          </AppLink>
          <div className="hidden shrink-0 items-center gap-4 text-sm font-medium text-black/56 dark:text-white/58 md:flex lg:gap-7">
            <AppLink to={link("/skills")} className="transition-colors hover:text-black dark:hover:text-white">
              Skills
            </AppLink>
            <NavMenu label="Categories" testId="desktop-categories-trigger">
              <NavItem href={link("/skills/output/image")}>Images</NavItem>
              <NavItem href={link("/skills/output/video")}>Video</NavItem>
              <NavItem href={link("/skills/output/slides")}>Presentations</NavItem>
              <NavItem href={link("/skills/output/web")}>Web</NavItem>
            </NavMenu>
            <NavMenu label="AI videos" testId="desktop-ai-videos-trigger">
              <NavItem href={link("/ai-videos/opus-5-5")}>Opus 5.5</NavItem>
              <NavItem href={link("/ai-videos/gemini-4-argon")}>Gemini 4 Argon</NavItem>
              <NavItem href={link("/ai-videos/kimi-k3-1")}>Kimi K3.1</NavItem>
              <NavItem href={link("/ai-videos/fable-5-5")}>Fable 5.5</NavItem>
            </NavMenu>
            <NavMenu label="Resources" testId="desktop-resources-trigger">
              <NavItem href={link("/learn")}>Learn</NavItem>
              <NavItem href={link("/mcp")}>MCP</NavItem>
              <NavItem href={link("/blog")}>Blog</NavItem>
              <NavItem href={link("/affiliate")}>Affiliate</NavItem>
            </NavMenu>
            <AppLink to={link("/pricing")} className="transition-colors hover:text-black dark:hover:text-white">
              Pricing
            </AppLink>
          </div>
        </div>

        <div className="order-last w-full xl:order-none xl:ml-auto xl:w-[220px] xl:flex-none">
          <SearchDialog />
        </div>

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Request a Skill"
            data-testid="request-skill-nav"
            onClick={() => toast("Request a Skill: this clone has no backend. On skillry.dev this opens a request form.")}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f4ff71] text-[#121313] transition-colors hover:bg-[#effc4f] md:size-8"
          >
            <IconMessagePlus className="size-4" aria-hidden />
          </button>

          <Menu.Root>
            <Menu.Trigger
              aria-label="language"
              className="hidden size-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/50 p-0 hover:bg-accent md:flex dark:border-white/12 dark:bg-white/8 dark:hover:bg-white/12"
            >
              <IconLanguage className="size-4" />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={8} className="z-[70]">
                <Menu.Popup className="min-w-44 rounded-2xl border border-black/10 bg-[#fffdf8] p-1.5 shadow-xl dark:border-white/12 dark:bg-[#1b1b18]">
                  <Menu.Item
                    className="block cursor-pointer rounded-xl px-3 py-2 text-sm hover:bg-black/[0.05] dark:hover:bg-white/8"
                    onClick={() => {
                      window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, "")}${switchLocale("en")}`);
                    }}
                  >
                    English
                  </Menu.Item>
                  {LOCALES.map((code) => (
                    <Menu.Item
                      key={code}
                      className="block cursor-pointer rounded-xl px-3 py-2 text-sm hover:bg-black/[0.05] dark:hover:bg-white/8"
                      onClick={() => {
                        window.location.assign(
                          `${import.meta.env.BASE_URL.replace(/\/$/, "")}${switchLocale(code)}`,
                        );
                      }}
                    >
                      {LOCALE_LABELS[code]}
                    </Menu.Item>
                  ))}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <Menu.Root>
            <Menu.Trigger
              aria-label="Toggle theme"
              className="hidden size-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/50 p-0 hover:bg-accent md:flex dark:border-white/12 dark:bg-white/8 dark:hover:bg-white/12"
            >
              <span className="relative inline-flex size-4 items-center justify-center">
                <IconSun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <IconMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </span>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={8} className="z-[70]">
                <Menu.Popup className="min-w-36 rounded-2xl border border-black/10 bg-[#fffdf8] p-1.5 shadow-xl dark:border-white/12 dark:bg-[#1b1b18]">
                  {(["system", "light", "dark"] as const).map((opt) => (
                    <Menu.Item
                      key={opt}
                      className="block cursor-pointer rounded-xl px-3 py-2 text-sm capitalize hover:bg-black/[0.05] dark:hover:bg-white/8"
                      onClick={() => setTheme(opt)}
                    >
                      {opt}
                      {theme === opt ? " ·" : ""}
                    </Menu.Item>
                  ))}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <AppLink
            to={link("/auth/login")}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#121313] px-3.5 text-[13px] font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-[#121313] dark:hover:bg-white/85 md:px-4 md:text-sm"
          >
            {tt("auth_login_sign_in")}
          </AppLink>

          <button
            type="button"
            aria-label="Open menu"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white/50 text-[#121313] outline-none transition-colors hover:bg-white md:hidden dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
            data-testid="mobile-categories-trigger"
            onClick={() => setMobileOpen(true)}
          >
            <IconMenu2 className="size-5" />
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[80] bg-[#f7f4ec] px-5 py-4 md:hidden dark:bg-[#11110f]">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-semibold">Skillry</span>
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <IconX className="size-6" />
            </button>
          </div>
          <div className="flex flex-col gap-3 text-lg font-medium" onClick={() => setMobileOpen(false)}>
            <AppLink to={link("/skills")}>Skills</AppLink>
            <AppLink to={link("/skills/output/image")}>Images</AppLink>
            <AppLink to={link("/skills/output/video")}>Video</AppLink>
            <AppLink to={link("/ai-videos/opus-5-5")}>AI videos</AppLink>
            <AppLink to={link("/learn")}>Learn</AppLink>
            <AppLink to={link("/pricing")}>Pricing</AppLink>
            <AppLink to={link("/mcp")}>MCP</AppLink>
            <AppLink to={link("/blog")}>Blog</AppLink>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => setTheme("system")}>
                System
              </button>
              <button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => setTheme("light")}>
                Light
              </button>
              <button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => setTheme("dark")}>
                Dark
              </button>
            </div>
            <p className="text-sm text-black/50 dark:text-white/50">Language: {LOCALE_LABELS[locale]}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
