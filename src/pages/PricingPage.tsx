import { useEffect, useState } from "react";
import { PricingPlans } from "../components/PricingPlans";
import { FAQ } from "../components/FAQ";
import { useApp } from "../context/AppContext";
import { BF_END } from "../lib/media";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function BlackFridayStrip() {
  const { tt } = useApp();
  const [parts, setParts] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, BF_END.getTime() - Date.now());
      const sec = Math.floor(ms / 1000);
      setParts({
        d: pad(Math.floor(sec / 86400)),
        h: pad(Math.floor((sec % 86400) / 3600)),
        m: pad(Math.floor((sec % 3600) / 60)),
        s: pad(sec % 60),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="mt-10 overflow-hidden rounded-[28px] bg-[#121313] px-6 py-7 text-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex rounded-md bg-[#f4ff71] px-2 py-0.5 text-[12px] font-bold tracking-wide text-[#121313]">{tt("bf_badge")}</span>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{tt("bf_banner_short")}</p>
          <p className="mt-2 text-sm text-white/50">{tt("bf_deadline")}</p>
        </div>
        <div className="flex gap-3 rounded-[20px] bg-white/8 px-5 py-4 text-center">
          {[
            [parts.d, tt("bf_unit_days")],
            [parts.h, tt("bf_unit_hours")],
            [parts.m, tt("bf_unit_minutes")],
            [parts.s, tt("bf_unit_seconds")],
          ].map(([value, label]) => (
            <div key={label} className="min-w-14">
              <div className="text-3xl font-semibold tabular-nums">{value}</div>
              <div className="text-[11px] uppercase tracking-wide text-white/45">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PricingPage() {
  const { tt } = useApp();
  const items = [
    ["skills_pricing_faq_plans_question", "skills_pricing_faq_plans_answer"],
    ["skills_pricing_faq_free_question", "skills_pricing_faq_free_answer"],
    ["skills_pricing_faq_payment_question", "skills_pricing_faq_payment_answer"],
    ["skills_pricing_faq_cancel_question", "skills_pricing_faq_cancel_answer"],
    ["skills_pricing_faq_renewal_question", "skills_pricing_faq_renewal_answer"],
    ["skills_pricing_faq_updates_question", "skills_pricing_faq_updates_answer"],
    ["skills_pricing_faq_costs_question", "skills_pricing_faq_costs_answer"],
    ["skills_pricing_faq_mcp_question", "skills_pricing_faq_mcp_answer"],
    ["skills_pricing_faq_auth_question", "skills_pricing_faq_auth_answer"],
  ].map(([q, a]) => ({ q: tt(q), a: tt(a) }));

  return (
    <div className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{tt("skills_pricing_hero_title")}</h1>
          <p className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-black/50 dark:text-white/55">
            <span>{tt("skills_detail_purchase_social_proof")}</span>
            <span>{tt("skills_detail_purchase_curated")}</span>
          </p>
          <p className="mt-3 text-sm text-black/55 dark:text-white/58">{tt("skills_pricing_supporters")}</p>
        </div>
        <BlackFridayStrip />
        <div className="mt-10">
          <PricingPlans />
        </div>
      </div>
      <FAQ title={tt("skills_pricing_faq_title")} items={items} />
    </div>
  );
}
