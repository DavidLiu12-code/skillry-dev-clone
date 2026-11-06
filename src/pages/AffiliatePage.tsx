import { toast } from "sonner";

export function AffiliatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Your taste. Your audience. Your next income.</h1>
      <p className="mx-auto mt-5 max-w-xl text-xl text-black/60 dark:text-white/62">Earn 40% with Skillry.</p>
      <section className="mt-14 text-left">
        <h2 className="text-2xl font-semibold">Three steps. One link. A new income stream.</h2>
        <ol className="mt-6 grid gap-4">
          {["Apply for the affiliate program", "Share your link with an audience that cares about agent workflows", "Earn 40% when they subscribe"].map((s, i) => (
            <li key={s} className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-5 dark:border-white/12 dark:bg-[#1b1b18]">
              <span className="font-mono text-xs text-black/40">0{i + 1}</span>
              <p className="mt-1 font-semibold">{s}</p>
            </li>
          ))}
        </ol>
      </section>
      <button
        type="button"
        className="mt-10 inline-flex h-12 items-center rounded-full bg-[#121313] px-6 text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]"
        onClick={() => toast("Affiliate signup requires skillry.dev accounts. This clone has no backend.")}
      >
        Apply now
      </button>
    </div>
  );
}
