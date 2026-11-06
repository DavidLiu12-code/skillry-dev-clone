import { IconBookmark, IconDownload, IconHeart } from "@tabler/icons-react";
import type { Skill } from "../lib/skills";
import { AGENT_ICONS, pub, skillPreview } from "../lib/media";
import { useApp } from "../context/AppContext";
import { AppLink } from "../lib/href";

export function SkillCard({ skill, priority = false }: { skill: Skill; priority?: boolean }) {
  const { link } = useApp();
  const tools = skill.tools.slice(0, 3);
  const extra = Math.max(0, skill.tools.length - tools.length);

  return (
    <div className="group h-full" data-testid="directory-skill-card" data-skill-id={skill.id}>
      <article
        data-testid="skill-card"
        className="relative flex h-full flex-col transition-transform duration-300 group-hover:-translate-y-1 group-focus-within:-translate-y-1"
      >
        <AppLink
          to={link(`/skills/${skill.slug}`)}
          className="flex flex-1 flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 dark:focus-visible:ring-white"
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/12">
            <div
              className="skill-preview-carousel relative isolate aspect-video overflow-hidden bg-[#f7f7f5]"
              style={{ backgroundColor: skill.bg }}
            >
              <img
                src={skillPreview(skill.preview)}
                alt={`${skill.name} result preview`}
                className="absolute inset-0 size-full object-cover"
                style={{ objectPosition: "50% 50%" }}
                width={1280}
                height={720}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-16 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.6)_32%,rgba(0,0,0,0)_100%)]" />
              <span
                data-testid="skill-card-stats"
                className="absolute bottom-2.5 right-3 z-20 inline-flex items-center gap-2.5 text-[10px] font-semibold tabular-nums text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]"
              >
                <span className="inline-flex items-center gap-1" data-testid="skill-card-installs">
                  <IconDownload className="size-3" aria-hidden />
                  {skill.installs}
                  <span className="sr-only">{skill.installs} installs</span>
                </span>
                <span className="inline-flex items-center gap-1" data-testid="skill-card-bookmarks">
                  <IconBookmark className="size-3" aria-hidden />
                  {skill.bookmarks}
                </span>
              </span>
              <span className="absolute left-2.5 top-2.5 z-20 flex items-center gap-1">
                {skill.isNew ? (
                  <span
                    data-testid="skill-card-new"
                    className="inline-flex h-6 items-center gap-1 rounded-full bg-white/50 px-2 pl-1.5 text-[10px] font-semibold uppercase leading-none tracking-[0.015em] text-[#121313] shadow-[0_3px_10px_rgba(17,18,18,.10)] backdrop-blur-md dark:bg-black/45 dark:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-2.5 shrink-0">
                      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
                    </svg>
                    New
                  </span>
                ) : null}
                {skill.isFree ? (
                  <span
                    data-testid="skill-card-free"
                    className="inline-flex h-6 items-center rounded-full bg-[#f4ff71] px-2 text-[10px] font-semibold uppercase tracking-[0.015em] text-[#121313] shadow-[0_3px_10px_rgba(17,18,18,.10)]"
                  >
                    Free
                  </span>
                ) : null}
              </span>
              <span className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1" data-testid="skill-collect-actions">
                <span className="grid size-7 place-items-center rounded-full bg-white/55 text-[#121313] shadow-sm backdrop-blur-md dark:bg-black/45 dark:text-white">
                  <IconHeart className="size-3.5" />
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-white/55 text-[#121313] shadow-sm backdrop-blur-md dark:bg-black/45 dark:text-white">
                  <IconBookmark className="size-3.5" />
                </span>
              </span>
              <span data-testid="skill-card-output" title={skill.output} className="hidden">
                {skill.output}
              </span>
            </div>
          </div>
          <div data-testid="skill-card-caption" className="mt-1.5 flex h-6 items-center gap-2">
            <p
              className="min-w-0 truncate text-[13px] font-medium leading-tight tracking-[-0.01em] text-black/65 dark:text-white/68"
              title={skill.name}
            >
              {skill.name}
            </p>
            <span className="ml-auto flex shrink-0 items-center">
              <span className="flex shrink-0 items-center gap-1" data-testid="skill-card-tool-logos">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    title={tool}
                    data-testid="skill-card-tool-logo"
                    className="-ml-1 grid size-4 shrink-0 place-items-center rounded-full border border-black/15 bg-[#f4f1e9] first:ml-0 dark:border-white/15 dark:bg-[#242420]"
                  >
                    {AGENT_ICONS[tool] ? (
                      <img src={pub(AGENT_ICONS[tool])} alt={tool} width={10} height={10} className="size-2.5" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-black/30" />
                    )}
                  </span>
                ))}
                {extra > 0 ? (
                  <span className="-ml-1 grid size-4 place-items-center rounded-full border border-black/15 bg-[#f4f1e9] text-[8px] font-semibold dark:bg-[#242420]">
                    +{extra}
                  </span>
                ) : null}
              </span>
            </span>
          </div>
        </AppLink>
      </article>
    </div>
  );
}
