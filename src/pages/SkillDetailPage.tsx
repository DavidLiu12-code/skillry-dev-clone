import { IconBookmark, IconCheck, IconDownload } from "@tabler/icons-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { AppLink } from "../lib/href";
import { skillPreview } from "../lib/media";
import { similarSkills, skillBySlug, skillExtras, type Skill } from "../lib/skills";
import { SkillCard } from "../components/SkillCard";
import { FAQ } from "../components/FAQ";

export function SkillDetailPage({ slug }: { slug: string }) {
  const { tt, link } = useApp();
  const skill = skillBySlug.get(slug);
  if (!skill) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/45">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Skill not found</h1>
        <AppLink to={link("/skills")} className="mt-6 inline-flex h-11 items-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
          Browse Skills
        </AppLink>
      </div>
    );
  }
  const extra = skillExtras[skill.slug];
  const version = extra?.version ?? "1.0.0";
  const blurb =
    extra?.blurb ??
    `Use this Skill to create ${skill.output === "Slides" ? "presentations" : skill.output.toLowerCase()}.`;
  const description =
    extra?.description ??
    `${skill.name} is an original Skillry Skill for ${skill.output.toLowerCase()} workflows. Install it in Claude Code, Codex or Cursor and run it end to end.`;
  const about =
    extra?.about ??
    `${skill.name} packages instructions, templates and scripts so your agent can reproduce a designed result. Each Skill page on skillry.dev shows a real result it made.`;
  const youGet = extra?.youGet ?? [
    "Original instructions packaged as one SKILL.md",
    "Templates and scripts matched to the example result",
    "Updates from the same studio that designed it",
  ];
  const similar = similarSkills(skill);
  const prompt = `Read https://skillry.dev/skills/${skill.slug} and install this Skill, then help me run it.`;

  return (
    <article className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm text-black/50 dark:text-white/50">
        <AppLink to={link("/skills")} className="hover:underline">
          Skills
        </AppLink>
        <span> / {skill.output}</span>
      </p>
      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {skill.name} <span className="text-base font-medium text-black/40">v {version}</span>
          </h1>
          <p className="mt-4 text-lg text-black/65 dark:text-white/68">{blurb}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-black/55 dark:text-white/55">
            <span className="inline-flex items-center gap-1">
              <IconDownload className="size-4" />
              {skill.installs} downloads
            </span>
            <span className="inline-flex items-center gap-1">
              <IconBookmark className="size-4" />
              {skill.bookmarks}
            </span>
            {skill.isFree ? (
              <span className="rounded-full bg-[#f4ff71] px-2 py-0.5 text-[11px] font-semibold uppercase text-[#121313]">Free</span>
            ) : (
              <span className="rounded-full border border-black/15 px-2 py-0.5 text-[11px] font-semibold uppercase">Pro</span>
            )}
          </div>
          <div className="relative mt-8 overflow-hidden rounded-[24px] border border-black/10 dark:border-white/12" style={{ background: skill.bg }}>
            <img src={skillPreview(skill.preview)} alt={`${skill.name} result preview`} className="aspect-video w-full object-cover" />
          </div>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">About this Skill</h2>
            <p className="mt-4 max-w-2xl leading-7 text-black/65 dark:text-white/68">{about}</p>
            <p className="mt-4 max-w-2xl leading-7 text-black/65 dark:text-white/68">{description}</p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">What you get</h2>
            <ul className="mt-5 grid gap-3">
              {youGet.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6">
                  <IconCheck className="mt-0.5 size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">How to use it</h2>
            <ol className="mt-5 grid gap-3 text-sm leading-6">
              <li>01 — Copy the install prompt, or download the ZIP on skillry.dev after signing in.</li>
              <li>02 — Ask your agent to follow the Skill instructions.</li>
              <li>03 — Review the real result on this page, then adapt colors, copy and assets.</li>
            </ol>
          </section>
        </div>
        <aside className="lg:sticky lg:top-[calc(6rem+var(--promo-banner-height,0px))] lg:self-start">
          <div className="rounded-[24px] border border-black/10 bg-[#fffdf8] p-5 dark:border-white/12 dark:bg-[#1b1b18]">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-black/45">Install</p>
            <p className="mt-3 font-mono text-[13px] leading-6 text-black/70 dark:text-white/70">{prompt}</p>
            <button
              type="button"
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#121313] text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]"
              onClick={async () => {
                await navigator.clipboard.writeText(prompt);
                toast("Copied install prompt");
              }}
            >
              Copy install prompt
            </button>
            <button
              type="button"
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full border border-black/15 text-sm font-semibold"
              onClick={() => toast("ZIP download requires a skillry.dev account. This clone has no auth backend.")}
            >
              {skill.isFree ? "Download ZIP" : "Unlock with Pro"}
            </button>
          </div>
        </aside>
      </div>
      {similar.length ? (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-[-0.03em]">Similar Skills</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((s) => (
              <SkillCard key={s.slug} skill={s} />
            ))}
          </div>
        </section>
      ) : null}
      <FAQ
        title="FAQ"
        items={[
          { q: "Will this work with my agent?", a: "The catalog works with agents that can read and install Agent Skills, including Claude Code, Codex and Cursor." },
          { q: "Do I need an API key?", a: "Connecting Skillry MCP or CLI needs no Skillry API key. Some image or video Skills require your own provider key." },
          { q: "Is this Skill free?", a: skill.isFree ? "Yes. You can install this free Skill after signing in on skillry.dev." : "This is a Premium Skill. One Skillry Pro plan unlocks it with the rest of the library." },
        ]}
      />
    </article>
  );
}

export type { Skill };
