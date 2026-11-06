import { useCallback, useEffect, useRef, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconChevronRight } from "@tabler/icons-react";
import type { Skill } from "../lib/skills";
import { SkillCard } from "./SkillCard";
import { useApp } from "../context/AppContext";
import { AppLink } from "../lib/href";

export function SkillShelf({
  id,
  title,
  description,
  skills,
  viewAllSearch,
  headingLevel = 2,
  emoji,
  prioritizeMedia,
}: {
  id: string;
  title: string;
  description?: string;
  skills: Skill[];
  viewAllSearch?: string;
  headingLevel?: 2 | 3;
  emoji?: string;
  prioritizeMedia?: boolean;
}) {
  const { link, tt } = useApp();
  const ref = useRef<HTMLElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const Heading = headingLevel === 3 ? "h3" : "h2";

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(max > 4 && el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(el);
    return () => obs.disconnect();
  }, [skills, measure]);

  const scrollByCard = (dir: number) => {
    const el = ref.current;
    const card = el?.querySelector("[data-home-shelf-card]");
    if (!el || !card) return;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 20;
    el.scrollBy({
      left: dir * ((card as HTMLElement).getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  if (!skills.length) return null;

  return (
    <section aria-labelledby={`${id}-title`} data-testid={`home-skill-shelf-${id}`} className={headingLevel === 3 ? "" : "pb-12 sm:pb-14"}>
      <div className="mb-5 flex flex-wrap items-center justify-start gap-x-[18px] gap-y-3">
        <Heading
          id={`${id}-title`}
          className={
            headingLevel === 3
              ? "order-1 flex items-center gap-2 text-base font-semibold tracking-[-0.025em] text-black/65 dark:text-white/70"
              : "order-1 flex items-center gap-2 text-xl font-semibold tracking-[-0.025em]"
          }
        >
          {emoji ? <span aria-hidden>{emoji} </span> : null}
          {title}
        </Heading>
        {viewAllSearch ? (
          <AppLink
            to={link(`/skills${viewAllSearch}`)}
            rel="nofollow"
            className="group order-2 ml-auto inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-black/52 transition-colors hover:text-[#121313] dark:text-white/55 dark:hover:text-white lg:order-3"
            data-testid="home-shelf-view-all"
          >
            {tt("skills_view_all") === "skills_view_all" ? "View all" : tt("skills_view_all")}
            <IconChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </AppLink>
        ) : null}
      </div>
      {description ? <p className="mb-5 -mt-2 text-sm text-black/50 dark:text-white/52">{description}</p> : null}
      <div className="relative">
        {canPrev ? (
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            className="absolute left-[-18px] top-[calc(50%_-_2rem)] z-[35] hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-black/12 bg-[#fffdf9] text-[#121313] shadow-[0_5px_18px_rgba(18,19,19,.16)] transition-transform hover:scale-105 sm:grid dark:border-white/14 dark:bg-[#242420] dark:text-white"
            data-testid="home-shelf-previous"
          >
            <IconArrowLeft className="size-5" />
          </button>
        ) : null}
        <section
          ref={ref}
          onScroll={measure}
          className="flex snap-x snap-proximity gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-testid="home-skill-rail"
        >
          {skills.slice(0, 8).map((s, i) => (
            <div
              key={s.slug}
              className="min-w-0 snap-start [flex:0_0_82vw] sm:[flex-basis:calc((100%_-_2.5rem)/2.5)] lg:[flex-basis:calc((100%_-_3.75rem)/3.5)] xl:[flex-basis:calc((100%_-_5rem)/4.5)]"
              data-home-shelf-card
            >
              <SkillCard skill={s} priority={!!prioritizeMedia && i === 0} />
            </div>
          ))}
        </section>
        {canNext ? (
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="absolute right-[-18px] top-[calc(50%_-_2rem)] z-[35] hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-black/12 bg-[#fffdf9] text-[#121313] shadow-[0_5px_18px_rgba(18,19,19,.16)] transition-transform hover:scale-105 sm:grid dark:border-white/14 dark:bg-[#242420] dark:text-white"
            data-testid="home-shelf-next"
          >
            <IconArrowRight className="size-5" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
