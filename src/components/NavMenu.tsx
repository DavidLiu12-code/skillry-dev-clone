import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "../lib/cn";
import { AppLink } from "../lib/href";

export function NavMenu({
  label,
  testId,
  children,
}: {
  label: string;
  testId: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        data-testid={testId}
        onClick={() => setOpen((v) => !v)}
        className="group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center gap-0 rounded-full bg-transparent px-[3px] py-0 text-sm font-medium text-black/56 outline-none transition-colors hover:text-black dark:text-white/58 dark:hover:text-white"
      >
        {label}
        <IconChevronDown
          className={cn("relative top-px ml-1 size-3 transition duration-300", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-2xl border border-black/10 bg-[#fffdf8] p-2 shadow-[0_16px_40px_rgba(17,18,18,.12)] dark:border-white/12 dark:bg-[#1b1b18]">
          <div className="flex flex-col" onClick={() => setOpen(false)}>
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function NavItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <AppLink
      to={href}
      className="rounded-xl px-3 py-2 text-sm font-medium text-black/70 transition-colors hover:bg-black/[0.05] hover:text-[#121313] dark:text-white/70 dark:hover:bg-white/8 dark:hover:text-white"
    >
      {children}
    </AppLink>
  );
}
