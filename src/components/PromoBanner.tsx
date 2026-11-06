import { useEffect, useState } from "react";
import { IconArrowRight, IconClock, IconX } from "@tabler/icons-react";
import { AppLink } from "../lib/href";
import { useApp } from "../context/AppContext";
import { BF_END } from "../lib/media";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function remaining() {
  const ms = Math.max(0, BF_END.getTime() - Date.now());
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;
  return { days, hours, mins, secs, text: `${pad(days)}:${pad(hours)}:${pad(mins)}:${pad(secs)}` };
}

export function PromoBanner() {
  const { link, tt } = useApp();
  const [hidden, setHidden] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.hasAttribute("data-hide-promo-banner");
  });
  const [time, setTime] = useState(remaining);

  useEffect(() => {
    const id = window.setInterval(() => setTime(remaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const dismiss = () => {
    try {
      const d = new Date();
      const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      sessionStorage.setItem("skillry:banner:pro-plan:session", "1");
      localStorage.setItem("skillry:banner:pro-plan:day", day);
    } catch {
      /* ignore */
    }
    document.documentElement.setAttribute("data-hide-promo-banner", "");
    setHidden(true);
  };

  if (hidden) return null;

  return (
    <div
      data-promo-banner=""
      className="sticky top-0 z-50 border-b border-white/10 bg-[#121313] text-white"
      data-testid="pro-plan-banner"
    >
      <div className="relative mx-auto flex min-h-11 max-w-[1500px] items-center gap-x-3 gap-y-1.5 py-2 pl-4 pr-11 text-[12.5px] leading-snug sm:flex-wrap sm:justify-center sm:gap-x-4 sm:pl-6 sm:pr-12 sm:text-[13.5px]">
        <span
          className="hidden shrink-0 rounded-md bg-[#f4ff71] px-2 py-0.5 text-[12px] font-bold tracking-wide text-[#121313] sm:inline sm:text-[13px]"
          data-testid="pro-plan-banner-badge"
        >
          {tt("bf_badge")}
        </span>
        <span
          className="flex min-w-0 flex-1 items-center gap-2 font-medium text-white/90 sm:flex-none"
          data-testid="pro-plan-banner-text"
        >
          {tt("bf_banner_short")}
        </span>
        <span
          role="timer"
          aria-label={tt("pro_plan_banner_ends_in", { time: time.text })}
          className="hidden shrink-0 items-center gap-1.5 text-[13px] font-medium tabular-nums text-white/55 md:inline-flex"
          data-testid="pro-plan-banner-countdown"
        >
          <IconClock className="size-3.5" aria-hidden />
          <span aria-hidden className="inline-flex">
            <span className="text-white/85">{pad(time.days)}</span>
          </span>
          <span aria-hidden className="inline-flex">
            <span className="pr-1.5 text-white/30">:</span>
            <span className="text-white/85">{pad(time.hours)}</span>
          </span>
          <span aria-hidden className="inline-flex">
            <span className="pr-1.5 text-white/30">:</span>
            <span className="text-white/85">{pad(time.mins)}</span>
          </span>
          <span aria-hidden className="inline-flex">
            <span className="pr-1.5 text-white/30">:</span>
            <span className="text-white/85">{pad(time.secs)}</span>
          </span>
        </span>
        <AppLink
          to={link("/pricing")}
          data-testid="pro-plan-banner-cta"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-sm font-semibold text-[#f4ff71] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4ff71]/60"
        >
          {tt("bf_cta")}
          <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </AppLink>
      </div>
      <button
        type="button"
        aria-label={tt("pro_plan_banner_dismiss")}
        className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        data-testid="pro-plan-banner-dismiss"
        onClick={dismiss}
      >
        <IconX className="size-4" aria-hidden />
      </button>
    </div>
  );
}
