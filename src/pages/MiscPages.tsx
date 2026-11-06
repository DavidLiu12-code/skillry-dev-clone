import { AppLink } from "../lib/href";
import { useApp } from "../context/AppContext";

export function ToolPage({ kind }: { kind: "dot-avatar-maker" | "iphone-duo-mockup" }) {
  const { link } = useApp();
  const title = kind === "dot-avatar-maker" ? "Dot Avatar Maker" : "iPhone Duo Mockup";
  const skillSlug = kind === "dot-avatar-maker" ? "bs-dot-avatar-maker" : undefined;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-[-0.05em]">{title}</h1>
      <p className="mt-4 leading-7 text-black/65 dark:text-white/68">
        This public tool page on skillry.dev ships as a Skill-backed experience. The clone keeps the route and sends you to the matching catalog entry where one exists.
      </p>
      {skillSlug ? (
        <AppLink to={link(`/skills/${skillSlug}`)} className="mt-8 inline-flex h-11 items-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
          Open the Skill
        </AppLink>
      ) : (
        <AppLink to={link("/skills")} className="mt-8 inline-flex h-11 items-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
          Browse Skills
        </AppLink>
      )}
    </div>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" | "cookie" | "third-party-notices" }) {
  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookie: "Cookie Policy",
    "third-party-notices": "Third-Party Notices",
  };
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-[-0.05em]">{titles[kind]}</h1>
      <p className="mt-6 leading-7 text-black/65 dark:text-white/68">
        The canonical {titles[kind].toLowerCase()} is published at skillry.dev/{kind === "third-party-notices" ? "third-party-notices" : kind}. This clone keeps the public route so footer links resolve. It is not a legal substitute for the original policy text.
      </p>
    </article>
  );
}

export function NotFoundPage() {
  const { link } = useApp();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-black/45">404</p>
      <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-base leading-7 text-black/55">The link may be broken, or the page has moved. Try the Skill library, or head back home.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <AppLink to={link("/skills")} className="inline-flex h-11 items-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white dark:bg-white dark:text-[#121313]">
          Browse Skills
        </AppLink>
        <AppLink to={link("/")} className="inline-flex h-11 items-center rounded-full border border-black/15 px-5 text-sm font-semibold">
          Back to Home
        </AppLink>
      </div>
    </div>
  );
}
