import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "../lib/cn";

export function FAQ({
  title,
  items,
}: {
  title: string;
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6" aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-balance text-center text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
        {title}
      </h2>
      <div className="mt-8 divide-y divide-black/10 rounded-[24px] border border-black/10 bg-[#fffdf8] dark:divide-white/10 dark:border-white/12 dark:bg-[#1b1b18]">
        {items.map((item, i) => (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <IconChevronDown className={cn("size-5 shrink-0 transition-transform", open === i && "rotate-180")} />
            </button>
            {open === i ? (
              <p className="px-5 pb-5 text-sm leading-7 text-black/60 dark:text-white/62">{item.a}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
