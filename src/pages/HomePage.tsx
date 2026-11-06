import { useEffect, useState } from "react";
import { IconArrowDown, IconCheck, IconChevronRight, IconHeart, IconPlayerPlay, IconRepeat } from "@tabler/icons-react";
import { useApp } from "../context/AppContext";
import { AppLink } from "../lib/href";
import {
  CONNECT_AGENTS,
  HERO_AGENTS,
  HERO_LOGOS,
  MORE_AGENTS,
  ROTATING_AGENTS,
  STUDIO,
  cdnImage,
  pub,
  testimonialAvatar,
} from "../lib/media";
import { getSkillsBySlugs, shelves } from "../lib/skills";
import { SkillShelf } from "../components/SkillShelf";
import { PricingPlans } from "../components/PricingPlans";
import { FAQ } from "../components/FAQ";
import testimonials from "../data/testimonials.json";
import faqData from "../data/faq.json";

const AVATAR_FALLBACK = ["#D97757", "#6A9BCC", "#D1B198", "#629987"];

function initials(name: string) {
  return name
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => Array.from(p)[0]?.toUpperCase() ?? "")
    .join("");
}

function RotatingAgentLogo() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: number | undefined;
    const run = () => {
      window.clearInterval(id);
      if (mq.matches) {
        setI(0);
        return;
      }
      id = window.setInterval(() => setI((v) => (v + 1) % ROTATING_AGENTS.length), 1600);
    };
    run();
    mq.addEventListener("change", run);
    return () => {
      window.clearInterval(id);
      mq.removeEventListener("change", run);
    };
  }, []);
  const agent = ROTATING_AGENTS[i];
  return (
    <span
      className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white dark:bg-white/90"
      title={agent.name}
      data-testid="rotating-agent-logo"
    >
      <img src={pub(agent.icon)} alt="" aria-hidden className="agent-logo-swap size-6" key={agent.name} />
    </span>
  );
}

export function HomePage() {
  const { tt, link } = useApp();
  const featured = getSkillsBySlugs(shelves.featured);
  const free = getSkillsBySlugs(shelves.free);
  const logoRows = [HERO_LOGOS.slice(0, 15), HERO_LOGOS.slice(15)];

  return (
    <div className="min-h-screen bg-[#f4f1e9] text-[#121313] transition-colors dark:bg-[#11110f] dark:text-[#f4f1e9]" data-testid="storefront-home">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[18%] size-[min(70vw,820px)] -translate-x-1/2 rounded-full bg-[#d97757]/10 blur-[110px]" />
        <div className="relative mx-auto flex max-w-[1500px] flex-col justify-center px-4 pb-10 pt-12 sm:px-6 sm:py-16 lg:min-h-[calc(100dvh-4rem)] lg:px-8 lg:py-16">
          <div className="relative z-10 text-center">
            <h1 className="storefront-hero-wordmark mx-auto max-w-[12ch] text-balance text-[clamp(2.4rem,10.5vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.06em] sm:max-w-none sm:text-[clamp(3rem,7.5vw,4.25rem)] lg:text-[clamp(2rem,5vw,5.25rem)] lg:leading-[0.92]">
              {tt("skills_hero_wordmark")}
            </h1>
          </div>
          <div className="hero-logo-stage pointer-events-none relative left-1/2 mt-10 w-screen -translate-x-1/2 space-y-3 sm:mt-12 sm:space-y-4" aria-hidden>
            {logoRows.map((row, ri) => (
              <div className="hero-logo-marquee" data-testid="hero-logo-marquee" key={ri}>
                <div className={`hero-logo-track ${ri === 1 ? "hero-logo-track-reverse" : ""}`}>
                  {[0, 1].map((copy) => (
                    <div className="hero-logo-group" aria-hidden={copy === 1 ? true : undefined} key={copy}>
                      {row.map((src) => (
                        <div className="hero-skill-logo" data-testid={copy === 0 ? "hero-skill-logo" : undefined} key={`${copy}-${src}`}>
                          <img src={`${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`} alt="" width={420} height={420} className="size-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="relative z-10 mx-auto mt-8 grid w-full max-w-sm gap-2.5 sm:mt-11 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-3">
            <a
              href="#skills"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#121313] px-5 text-sm font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-[#121313] dark:hover:bg-white/85"
              data-testid="hero-browse-skills"
            >
              {tt("skills_hero_primary")}
              <IconArrowDown className="size-4" aria-hidden />
            </a>
            <a
              href="#install"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/15 bg-white/55 px-5 text-sm font-semibold hover:bg-white dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
              data-testid="hero-connect-agent"
            >
              <IconPlayerPlay className="size-4 animate-pulse" aria-hidden />
              {tt("skills_hero_secondary")}
            </a>
          </div>
          <div className="relative z-10 mt-8 flex flex-col items-center gap-3.5 sm:mt-11" data-testid="hero-agent-logos">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/40 dark:text-white/45">
              {tt("skills_hero_works_with")}
            </span>
            <ul className="flex items-center">
              {HERO_AGENTS.map((a) => (
                <li key={a.name} data-testid="hero-agent-logo" className="-ml-2.5 transition-transform duration-200 first:ml-0 hover:z-10 hover:-translate-y-0.5">
                  <span className="grid size-9 place-items-center rounded-full border border-black/15 bg-white/55 shadow-sm dark:border-white/25 dark:bg-[#f4f1e9] dark:shadow-[0_4px_16px_rgba(0,0,0,.32)]">
                    <img src={pub(a.icon)} alt={a.name} title={a.name} width={20} height={20} className="size-5" />
                  </span>
                </li>
              ))}
              <li data-testid="hero-agent-logo-more" className="-ml-2.5">
                <span
                  title={MORE_AGENTS.join(", ")}
                  className="grid size-9 place-items-center rounded-full border border-black/15 bg-white/55 text-[11px] font-semibold tabular-nums text-black/45 shadow-sm dark:border-white/25 dark:bg-[#f4f1e9]"
                >
                  +{MORE_AGENTS.length}
                </span>
                <span className="sr-only">{tt("skills_hero_works_with_more")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="skills" className="bg-[#f4f1e9] transition-colors dark:bg-[#11110f]">
        <div className="w-full px-4 pb-0 pt-6 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pt-20">
          <div data-testid="home-skill-shelves">
            <SkillShelf
              id="featured"
              title={tt("skills_home_heading_featured")}
              description={tt("skills_home_heading_featured_description")}
              skills={featured}
              prioritizeMedia
              viewAllSearch="?featured=1"
            />
            <SkillShelf
              id="free"
              title={tt("skills_home_heading_free")}
              description={tt("skills_home_heading_free_description")}
              skills={free}
              viewAllSearch="?free=1"
            />
            <section data-testid="home-skill-shelf-trending" className="pb-12 sm:pb-14">
              <h2 className="mb-6 text-xl font-semibold tracking-[-0.025em]">
                <span aria-hidden>🔥 </span>
                {tt("skills_home_heading_trending")}
              </h2>
              <div className="space-y-8 sm:space-y-10">
                <SkillShelf id="trending-html" title={tt("skills_shelf_trending_web")} skills={getSkillsBySlugs(shelves["trending-html"])} headingLevel={3} viewAllSearch="?sort=trending&output=web" />
                <SkillShelf id="trending-presentation" title={tt("skills_shelf_trending_slides")} skills={getSkillsBySlugs(shelves["trending-presentation"])} headingLevel={3} viewAllSearch="?sort=trending&output=slides" />
                <SkillShelf id="trending-video" title={tt("skills_shelf_trending_video")} skills={getSkillsBySlugs(shelves["trending-video"])} headingLevel={3} viewAllSearch="?sort=trending&output=video" />
                <SkillShelf id="trending-image" title={tt("skills_shelf_trending_image")} skills={getSkillsBySlugs(shelves["trending-image"])} headingLevel={3} viewAllSearch="?sort=trending&output=image" />
              </div>
            </section>
            <section data-testid="home-skill-shelf-top-rated">
              <h2 className="mb-6 text-xl font-semibold tracking-[-0.025em]">
                <span aria-hidden>🏆 </span>
                {tt("skills_home_heading_top_rated")}
              </h2>
              <div className="space-y-8 sm:space-y-10">
                <SkillShelf id="top-rated-html" title={tt("skills_shelf_top_rated_web")} skills={getSkillsBySlugs(shelves["top-rated-html"])} headingLevel={3} viewAllSearch="?sort=top-rated&output=web" />
                <SkillShelf id="top-rated-presentation" title={tt("skills_shelf_top_rated_slides")} skills={getSkillsBySlugs(shelves["top-rated-presentation"])} headingLevel={3} viewAllSearch="?sort=top-rated&output=slides" />
                <SkillShelf id="top-rated-video" title={tt("skills_shelf_top_rated_video")} skills={getSkillsBySlugs(shelves["top-rated-video"])} headingLevel={3} viewAllSearch="?sort=top-rated&output=video" />
                <SkillShelf id="top-rated-image" title={tt("skills_shelf_top_rated_image")} skills={getSkillsBySlugs(shelves["top-rated-image"])} headingLevel={3} viewAllSearch="?sort=top-rated&output=image" />
              </div>
            </section>
          </div>
          <div className="mt-8 hidden justify-center sm:flex">
            <AppLink
              to={link("/skills")}
              className="group hidden h-11 shrink-0 items-center gap-2 rounded-full bg-[#121313] px-5 text-sm font-semibold text-white shadow-[0_5px_18px_rgba(18,19,19,.14)] transition-[background-color,transform,box-shadow] hover:bg-[#2a2b2b] hover:shadow-[0_7px_22px_rgba(18,19,19,.2)] active:scale-[0.98] dark:bg-[#f4ff71] dark:text-[#121313] sm:inline-flex"
              data-testid="skills-view-all-desktop"
            >
              {tt("skills_view_all")}
              <IconChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </AppLink>
          </div>
          <AppLink
            to={link("/skills")}
            className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#121313] px-5 text-sm font-semibold text-white sm:hidden dark:bg-[#f4ff71] dark:text-[#121313]"
            data-testid="skills-view-all-mobile"
          >
            {tt("skills_view_all")}
            <IconChevronRight className="size-4" aria-hidden />
          </AppLink>
        </div>
      </section>

      <section id="made-by-skillry" className="bg-[#f4f1e9] px-4 pb-12 pt-10 dark:bg-[#11110f] sm:px-6 sm:pb-16 sm:pt-20 lg:px-8" data-testid="home-made-by-skillry">
        <div className="mx-auto max-w-[1250px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-center lg:gap-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-black/45 dark:text-white/48">{tt("skills_home_studio_eyebrow")}</span>
              <h2 id="made-by-skillry-title" className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                {tt("skills_home_studio_title")}
              </h2>
              <p className="mt-5 max-w-xl text-pretty leading-7 text-black/57 dark:text-white/62">{tt("skills_home_studio_description")}</p>
              <ul className="mt-6 grid gap-2.5">
                {[tt("skills_home_studio_point_templates"), tt("skills_home_studio_point_standard"), tt("skills_home_studio_point_maintained")].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-semibold">
                    <IconCheck className="size-4 shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={cdnImage(STUDIO.hero, 1440)}
              alt=""
              width={1448}
              height={1086}
              className="aspect-[4/3] w-full rounded-[20px] bg-[#d97757] object-cover"
              data-testid="made-by-skillry-illustration"
            />
          </div>
          <div className="mr-2.5 mt-10 border border-black/14 bg-[#fbf9f3] p-5 shadow-[8px_10px_0_rgba(17,18,18,.12)] dark:border-white/12 dark:bg-[#1a1a17] sm:mr-0 sm:mt-14 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/45 dark:text-white/48">{tt("skills_home_studio_process_label")}</p>
            <ol className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/10 dark:lg:divide-white/10">
              {[
                { key: STUDIO.design, title: tt("skills_home_studio_step_design_title"), desc: tt("skills_home_studio_step_design_description") },
                { key: STUDIO.write, title: tt("skills_home_studio_step_write_title"), desc: tt("skills_home_studio_step_write_description") },
                { key: STUDIO.run, title: tt("skills_home_studio_step_run_title"), desc: tt("skills_home_studio_step_run_description") },
                { key: STUDIO.update, title: tt("skills_home_studio_step_update_title"), desc: tt("skills_home_studio_step_update_description") },
              ].map((step, i) => (
                <li key={step.key} className="grid grid-cols-[112px_minmax(0,1fr)] items-start gap-4 sm:block lg:px-4" data-testid="made-by-skillry-step">
                  <img src={cdnImage(step.key, 640)} alt="" className="aspect-[4/3] w-full rounded-[10px] bg-black/5 object-cover sm:rounded-[14px]" />
                  <div>
                    <span className="block font-mono text-xs text-black/38 sm:mt-5 dark:text-white/40">0{i + 1}</span>
                    <p className="mt-1 text-base font-semibold tracking-[-0.02em] sm:mt-2 sm:text-lg">{step.title}</p>
                    <p className="mt-1 text-pretty text-sm leading-[1.5] text-black/58 dark:text-white/60">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="install" className="bg-[#f4f1e9] px-4 pb-12 pt-10 dark:bg-[#11110f] sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
        <div className="mx-auto grid max-w-[1250px] grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-black/45 dark:text-white/48">{tt("skills_install_eyebrow")}</span>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{tt("skills_connect_heading")}</h2>
            <p className="mt-5 max-w-lg text-pretty leading-7 text-black/57 dark:text-white/62">{tt("skills_agent_description")}</p>
            <AppLink to={link("/learn/agents/claude-code")} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-black/25 underline-offset-4">
              {tt("skills_install_guide_link")}
              <IconChevronRight className="size-4" />
            </AppLink>
            <ul className="mt-7 grid max-w-lg grid-cols-2 gap-x-4 gap-y-3">
              {CONNECT_AGENTS.map((a) => (
                <li key={a.name} className="flex min-w-0 items-center gap-2.5 text-sm font-semibold">
                  <span className="grid size-10 shrink-0 place-items-center border border-black/10 bg-white/55 dark:border-white/20 dark:bg-[#f4f1e9]">
                    <img src={pub(a.icon)} alt="" className="size-6" />
                  </span>
                  <span className="truncate">{a.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <div className="mr-2.5 flex min-h-[300px] flex-col justify-between border border-[#aebce0] bg-[#e7ecfb] p-5 shadow-[8px_10px_0_rgba(17,18,18,.12)] dark:border-white/12 dark:bg-[#101521] sm:p-7" data-testid="agent-install-card">
              <div>
                <div className="mb-5 flex items-center gap-2 border-b border-black/10 pb-5 dark:border-white/10">
                  <RotatingAgentLogo />
                  <span className="font-semibold">{tt("skills_install_agent")}</span>
                </div>
                <p className="font-mono text-[13px] leading-6 text-black/70 sm:text-sm dark:text-white/72">
                  <span className="text-[#8f5200] dark:text-[#f0b35b]">Read </span>
                  <span className="text-[#257342] dark:text-[#70d39a]">https://skillry.dev/install/agent.md</span>
                  <span> and follow the instructions to connect the official CLI, then help me discover the right Skill.</span>
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[tt("skills_install_discover"), tt("skills_install_authorize"), tt("skills_install_step")].map((label, i) => (
                  <div key={label} className="flex items-center gap-2 border-t border-black/12 pt-3 text-xs font-semibold dark:border-white/12">
                    <IconCheck className="size-4" />
                    <span className="text-black/38 dark:text-white/40">0{i + 1}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <AppLink
              to={link("/mcp")}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-[#121313]"
            >
              {tt("skills_connect_cta")}
            </AppLink>
          </div>
        </div>
      </section>

      <section id="testimonials" className="overflow-hidden bg-[#f4f1e9] py-16 dark:bg-[#11110f] sm:py-24" data-testid="home-testimonials">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{tt("skills_home_testimonials_title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-7 text-black/57 dark:text-white/62">{tt("skills_home_testimonials_description")}</p>
        </div>
        <div className="mt-12 grid gap-4">
          {[0, 1].map((row) => {
            const items = (testimonials as typeof testimonials).filter((_, i) => i % 2 === row);
            return (
              <div className="testimonial-row" key={row}>
                <ul className={row === 0 ? "testimonial-track testimonial-track-reverse" : "testimonial-track"} style={{ ["--testimonial-duration" as string]: "120s" }}>
                  {[...items, ...items].map((item, n) => (
                    <li className="mr-4 w-[min(340px,82vw)] shrink-0" key={`${item.handle}-${n}`} aria-hidden={n >= items.length ? true : undefined}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-[228px] flex-col rounded-[20px] border border-black/[0.08] bg-[#fffdf8] p-5 shadow-[0_10px_30px_rgba(17,18,18,.05)] transition-[box-shadow,border-color] hover:border-black/15 hover:shadow-[0_16px_40px_rgba(17,18,18,.09)] dark:border-white/10 dark:bg-[#1b1b18]"
                        data-testid={n < items.length ? "home-testimonial" : undefined}
                      >
                        <span className="flex items-start gap-3">
                          {item.avatarKey ? (
                            <img src={testimonialAvatar(item.avatarKey)} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full object-cover" />
                          ) : (
                            <span className="grid size-10 place-items-center rounded-full text-sm font-semibold text-white" style={{ backgroundColor: AVATAR_FALLBACK[n % 4] }}>
                              {initials(item.name)}
                            </span>
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-semibold leading-5">{item.name}</span>
                            <span className="block truncate text-[13px] leading-5 text-black/50 dark:text-white/52">
                              @{item.handle} · {item.postedAt}
                            </span>
                          </span>
                        </span>
                        <span lang={item.language} className="mt-3.5 line-clamp-4 whitespace-pre-line text-pretty text-[15px] leading-6">
                          {item.text}
                        </span>
                        {item.likes > 0 || item.reposts > 0 ? (
                          <span className="mt-auto flex items-center gap-4 pt-3 text-[12px] tabular-nums text-black/45 dark:text-white/45">
                            {item.likes > 0 ? (
                              <span className="inline-flex items-center gap-1">
                                <IconHeart className="size-3.5" />
                                {item.likes}
                              </span>
                            ) : null}
                            {item.reposts > 0 ? (
                              <span className="inline-flex items-center gap-1">
                                <IconRepeat className="size-3.5" />
                                {item.reposts}
                              </span>
                            ) : null}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 bg-[#f4f1e9] px-4 pb-12 pt-8 dark:bg-[#11110f] sm:px-6 sm:pb-16 sm:pt-10 lg:px-8" data-testid="home-pricing-section">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{tt("skills_pricing_page_title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-7 text-black/55 dark:text-white/58">{tt("skills_pricing_page_description")}</p>
          </div>
          <div className="mt-10 sm:mt-12">
            <PricingPlans equalColumns />
          </div>
        </div>
      </section>

      <FAQ title="Getting started" items={faqData as { q: string; a: string }[]} />

      <section className="px-4 pb-20 text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{tt("skills_cta_title") === "skills_cta_title" ? "Ready to extend your agent?" : tt("skills_cta_title")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-black/55 dark:text-white/58">Connect once, then install any Skill from our studio straight from your agent.</p>
        <AppLink to={link("/mcp")} className="mt-8 inline-flex h-12 items-center rounded-full bg-[#121313] px-6 text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
          {tt("skills_connect_cta")}
        </AppLink>
      </section>
    </div>
  );
}
