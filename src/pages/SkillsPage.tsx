import { useMemo, useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useRouterState } from "@tanstack/react-router";
import { useApp } from "../context/AppContext";
import { SkillCard } from "../components/SkillCard";
import { cn } from "../lib/cn";
import { OUTPUT_FILTER, searchSkills, skills, type Skill } from "../lib/skills";

const SORTS = ["recommended", "newest", "trending", "top-rated"] as const;
const OUTPUTS = ["Web", "Slides", "Video", "Image"] as const;

function sortSkills(list: Skill[], sort: string) {
  const copy = [...list];
  if (sort === "top-rated") return copy.sort((a, b) => b.bookmarks - a.bookmarks || b.installs - a.installs);
  if (sort === "newest") return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.installs - a.installs);
  return copy.sort((a, b) => b.installs - a.installs || b.bookmarks - a.bookmarks);
}

export function SkillsPage({
  initialOutput,
  initialQuery,
  initialFree,
  initialFeatured,
  initialSort,
  facetLabel,
}: {
  initialOutput?: string[];
  initialQuery?: string;
  initialFree?: boolean;
  initialFeatured?: boolean;
  initialSort?: string;
  facetLabel?: string;
}) {
  const { tt } = useApp();
  const searchText = useRouterState({
    select: (s): string => {
      const loc = s.location as { searchStr?: string; search?: unknown };
      if (typeof loc.searchStr === "string") return loc.searchStr.replace(/^\?/, "");
      if (typeof loc.search === "string") return loc.search.replace(/^\?/, "");
      return "";
    },
  });
  const params = new URLSearchParams(searchText);
  const qFromUrl = params.get("q") ?? initialQuery ?? "";
  const sortFromUrl = params.get("sort") ?? initialSort ?? "recommended";
  const outputFromUrl = params.get("output");
  const urlOutputs = outputFromUrl
    ? [OUTPUT_FILTER[outputFromUrl] ?? outputFromUrl].filter(Boolean)
    : initialOutput ?? [];

  const [query, setQuery] = useState(qFromUrl);
  const [sort, setSort] = useState(sortFromUrl);
  const [outputs, setOutputs] = useState<string[]>(urlOutputs);
  const [freeOnly, setFreeOnly] = useState(!!initialFree || params.get("free") === "1");
  const [featuredOnly, setFeaturedOnly] = useState(!!initialFeatured || params.get("featured") === "1");
  const [visible, setVisible] = useState(24);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = searchSkills(query || qFromUrl, {
      output: outputs.length ? outputs : undefined,
      free: freeOnly,
      featured: featuredOnly,
    });
    return sortSkills(list, sort);
  }, [query, qFromUrl, outputs, freeOnly, featuredOnly, sort]);

  const shown = filtered.slice(0, visible);
  const counts = {
    Web: skills.filter((s) => s.output === "Web").length,
    Slides: skills.filter((s) => s.output === "Slides").length,
    Video: skills.filter((s) => s.output === "Video").length,
    Image: skills.filter((s) => s.output === "Image").length,
    free: skills.filter((s) => s.isFree).length,
    featured: skills.filter((s) => s.source !== "sitemap").length,
  };

  const toggleOutput = (name: string) => {
    setOutputs((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
    setVisible(24);
  };

  const clearAll = () => {
    setQuery("");
    setOutputs([]);
    setFreeOnly(false);
    setFeaturedOnly(false);
    setSort("recommended");
    setVisible(24);
  };

  const filterCount = Number(freeOnly) + Number(featuredOnly) + outputs.length;
  const searchValue = query || qFromUrl;

  return (
    <div>
      <div className="lg:flex">
        <aside
          data-testid="skills-directory-filters"
          className={cn(
            "lg:sticky lg:top-[calc(7rem+var(--promo-banner-height,0px))] lg:z-30 lg:h-[calc(100dvh-7rem-var(--promo-banner-height,0px))] lg:w-[236px] lg:shrink-0 lg:self-start lg:overflow-y-auto lg:border-r lg:border-black/8 lg:bg-[#f4f1e9] lg:px-4 lg:pb-8 lg:pt-4 dark:lg:border-white/10 dark:lg:bg-[#11110f] xl:top-[calc(4rem+var(--promo-banner-height,0px))] xl:h-[calc(100dvh-4rem-var(--promo-banner-height,0px))]",
            filtersOpen
              ? "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] flex-col overflow-y-auto rounded-t-[24px] border-t border-black/10 bg-[#f7f4ec] px-4 shadow-[0_-20px_60px_rgba(18,19,19,0.18)] dark:border-white/12 dark:bg-[#1b1b18] lg:static lg:flex lg:max-h-none lg:rounded-none lg:border-t-0 lg:shadow-none"
              : "hidden lg:block",
          )}
        >
          <div className="mb-2.5 flex items-center gap-2">
            <span className="flex-1 text-[12px] font-semibold tracking-[-0.01em]">{tt("skills_directory_filters_label") === "skills_directory_filters_label" ? "Filters" : tt("skills_directory_filters_label")}</span>
            {filterCount > 0 ? (
              <button type="button" onClick={clearAll} className="text-[11.5px] font-medium text-black/45 hover:text-[#121313] dark:text-white/48">
                Clear all
              </button>
            ) : null}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="px-2 pb-1.5 text-[11px] font-semibold text-black/40 dark:text-white/42">Recommendations</p>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-[5px] text-[12.5px] hover:bg-black/[0.055] dark:hover:bg-white/[0.07]">
                <input type="checkbox" checked={freeOnly} onChange={() => setFreeOnly((v) => !v)} />
                Free <span className="ml-auto text-[11px] tabular-nums text-black/32">{counts.free}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-[5px] text-[12.5px] hover:bg-black/[0.055] dark:hover:bg-white/[0.07]">
                <input type="checkbox" checked={featuredOnly} onChange={() => setFeaturedOnly((v) => !v)} />
                Featured <span className="ml-auto text-[11px] tabular-nums text-black/32">{counts.featured}</span>
              </label>
            </div>
            <div className="border-t border-black/8 pt-4 dark:border-white/10">
              <p className="px-2 pb-1.5 text-[11px] font-semibold text-black/40 dark:text-white/42">By output</p>
              {OUTPUTS.map((name) => (
                <label key={name} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-[5px] text-[12.5px] hover:bg-black/[0.055] dark:hover:bg-white/[0.07]">
                  <input type="checkbox" checked={outputs.includes(name)} onChange={() => toggleOutput(name)} />
                  {name}
                  <span className="ml-auto text-[11px] tabular-nums text-black/32">{counts[name]}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 mt-5 flex gap-2 border-t border-black/8 bg-[#f7f4ec] py-3 lg:hidden dark:bg-[#1b1b18]">
            <button type="button" onClick={() => setFiltersOpen(false)} className="h-11 flex-1 rounded-full bg-[#121313] text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
              Show {filtered.length} results
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1" data-testid="skills-directory-results-column">
          <main className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
            <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3" data-testid="skills-directory-heading">
              <div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <h1 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
                    {facetLabel || (tt("skills_directory_title") === "skills_directory_title" ? "Agent Skills" : tt("skills_directory_title"))}
                  </h1>
                  <span className="inline-flex h-6 items-center rounded-full bg-black/[0.06] px-2.5 text-[12px] font-semibold tabular-nums text-black/55 dark:bg-white/10 dark:text-white/60" data-testid="skills-directory-result-count">
                    {tt("skills_directory_result_count", { count: filtered.length })}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-black/50 dark:text-white/52">
                  {tt("skills_directory_subheading") === "skills_directory_subheading"
                    ? "Browse original Skills designed by the Skillry studio."
                    : tt("skills_directory_subheading")}
                </p>
              </div>
              <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto">
                <div role="tablist" className="flex min-w-0 flex-1 gap-0.5 overflow-x-auto rounded-full border border-black/10 bg-white/60 p-1 sm:flex-none dark:border-white/12 dark:bg-white/8" data-testid="skills-directory-sort">
                  {SORTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="tab"
                      aria-selected={sort === s}
                      onClick={() => setSort(s)}
                      className={cn(
                        "h-8 shrink-0 whitespace-nowrap rounded-full px-3.5 text-[13px] font-semibold transition-colors",
                        sort === s
                          ? "bg-[#121313] text-white shadow-[0_4px_12px_rgba(18,19,19,.18)] dark:bg-[#f4ff71] dark:text-[#121313]"
                          : "text-black/55 hover:bg-black/[0.05] dark:text-white/58",
                      )}
                    >
                      {s === "top-rated" ? "Top rated" : s[0].toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-black/14 bg-white/60 px-3.5 text-[13px] font-semibold lg:hidden dark:border-white/14 dark:bg-white/8"
                  data-testid="skills-directory-filter-trigger"
                >
                  <IconAdjustmentsHorizontal className="size-4" />
                  Filters
                  {filterCount > 0 ? (
                    <span className="grid size-[18px] place-items-center rounded-full bg-[#121313] text-[11px] text-white dark:bg-[#f4ff71] dark:text-[#121313]">
                      {filterCount}
                    </span>
                  ) : null}
                </button>
              </div>
            </header>

            {searchValue ? (
              <p className="mb-3 text-[13px] text-black/50">Showing matches for “{searchValue}”</p>
            ) : null}

            {shown.length ? (
              <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-testid="skill-grid">
                {shown.map((s, i) => (
                  <SkillCard key={s.slug} skill={s} priority={i < 3} />
                ))}
              </div>
            ) : (
              <section className="mx-auto max-w-sm py-14 text-center">
                <h2 className="text-[17px] font-semibold">No Skills match those filters</h2>
                <button type="button" onClick={clearAll} className="mt-3 text-[12.5px] underline">
                  Clear all
                </button>
              </section>
            )}

            {shown.length < filtered.length ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((n) => n + 24)}
                  className="rounded-full border border-black/14 bg-white/60 px-5 py-2.5 text-sm font-semibold hover:border-black/35 dark:border-white/14 dark:bg-white/8"
                >
                  Load more
                </button>
              </div>
            ) : filtered.length ? (
              <p className="mt-10 text-center text-sm text-black/42 dark:text-white/44">You've reached the end of the catalog.</p>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
