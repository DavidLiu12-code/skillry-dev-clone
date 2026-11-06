import { IconCheck } from "@tabler/icons-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { cn } from "../lib/cn";

const PLANS = [
  {
    key: "monthly",
    titleKey: "skills_pricing_monthly",
    noteKey: "skills_pricing_monthly_note",
    price: "$9.99",
    was: "$19.9",
    unitKey: "skills_pricing_price_monthly",
    off: "50% OFF",
    extra: "Cancel anytime",
    ctaKey: "skills_pricing_cta_subscribe_pro",
    popular: false,
  },
  {
    key: "yearly",
    titleKey: "skills_pricing_yearly",
    noteKey: "skills_pricing_yearly_note",
    price: "$79",
    was: "$158",
    unitKey: "skills_pricing_price_yearly",
    off: "50% OFF",
    extra: "Most popular · Save 34% a year",
    ctaKey: "skills_pricing_cta_subscribe_pro",
    popular: true,
  },
  {
    key: "lifetime",
    titleKey: "skills_pricing_lifetime",
    noteKey: "skills_pricing_lifetime_note",
    price: "$169",
    was: "$249",
    unitKey: "skills_pricing_price_once",
    off: "32% OFF",
    extra: "Best value",
    ctaKey: "skills_pricing_cta_get_lifetime",
    popular: false,
  },
] as const;

const FEATURES = [
  "skills_pricing_feature_all",
  "skills_pricing_feature_install",
  "skills_pricing_feature_auth",
  "skills_pricing_feature_daily_quota",
  "skills_pricing_feature_updates",
  "skills_pricing_feature_new_releases",
];

export function PricingPlans({ equalColumns = false }: { equalColumns?: boolean }) {
  const { tt } = useApp();
  return (
    <div className={cn("grid gap-4", equalColumns ? "md:grid-cols-3" : "lg:grid-cols-3")}>
      {PLANS.map((plan) => (
        <article
          key={plan.key}
          data-testid="pricing-plan"
          className={cn(
            "relative flex flex-col overflow-hidden rounded-[24px] border border-black/10 bg-[#fffdf8] shadow-[0_10px_30px_rgba(17,18,18,.05)] dark:border-white/12 dark:bg-[#1b1b18]",
            plan.popular && "border-[#121313] dark:border-[#f4ff71]",
          )}
        >
          {plan.popular ? (
            <div className="bg-[#121313] py-2 text-center text-[13px] font-semibold text-[#f4ff71]">{tt("skills_pricing_most_popular")}</div>
          ) : plan.key === "lifetime" ? (
            <div className="bg-[#ebe7de] py-2 text-center text-[13px] font-semibold text-[#121313] dark:bg-[#2a2c22] dark:text-[#f4ff71]">{tt("skills_pricing_best_value")}</div>
          ) : (
            <div className="h-0" />
          )}
          <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between gap-2 text-[13px] text-black/50 dark:text-white/50">
            <span>{plan.key === "yearly" ? "Save 34% a year" : tt(plan.noteKey)}</span>
            <span className="rounded-md bg-[#f4ff71] px-1.5 py-0.5 text-[11px] font-bold text-[#121313]">{plan.off}</span>
          </div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">{tt(plan.titleKey)}</h3>
          <p className="mt-3 flex flex-wrap items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-[-0.04em]">{plan.price}</span>
            <span className="text-base text-black/35 line-through dark:text-white/35">{plan.was}</span>
            <span className="text-base font-medium text-black/50 dark:text-white/50">{tt(plan.unitKey)}</span>
          </p>
          <button
            type="button"
            onClick={() =>
              toast("Checkout is not connected in this clone. skillry.dev uses Stripe / better-auth for paid plans.")
            }
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white hover:bg-black/80 dark:bg-[#f4ff71] dark:text-[#121313] dark:hover:bg-[#f7ff92]"
          >
            {tt(plan.ctaKey)}
          </button>
          <ul className="mt-6 flex flex-col gap-2.5 text-sm">
            {FEATURES.map((key) => (
              <li key={key} className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0" />
                {tt(key)}
              </li>
            ))}
            {plan.key === "lifetime" ? (
              <>
                <li className="flex items-center gap-2">
                  <IconCheck className="size-4 shrink-0" />
                  {tt("skills_pricing_feature_no_renewal")}
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="size-4 shrink-0" />
                  {tt("skills_pricing_contribute_earn")}
                  <span className="text-xs text-black/40">{tt("skills_pricing_coming_soon")}</span>
                </li>
              </>
            ) : (
              <li className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0" />
                {tt("skills_pricing_feature_cancel")}
              </li>
            )}
          </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
