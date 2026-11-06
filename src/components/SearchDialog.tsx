import { Dialog } from "@base-ui/react/dialog";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApp } from "../context/AppContext";
import { searchSkills } from "../lib/skills";
import { skillPreview } from "../lib/media";

export function SearchDialog({ variant = "header" }: { variant?: "header" | "directory" }) {
  const { tt, link } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const results = useMemo(() => searchSkills(q).slice(0, 12), [q]);

  const go = (path: string) => {
    setOpen(false);
    void navigate({ to: path as never });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Search Skills"
        data-testid={variant === "header" ? "storefront-home-search" : "skills-directory-search-header"}
        className="group/button inline-flex h-10 w-full items-center justify-between gap-4 rounded-full border border-border bg-card/75 px-4 text-sm font-normal text-muted-foreground transition-all outline-none hover:bg-muted hover:text-foreground dark:border-white/12 dark:bg-white/8 dark:hover:bg-white/12"
      >
        <span className="truncate">{tt("skills_home_search_placeholder")}</span>
        <IconSearch className="size-[18px] shrink-0" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[80] bg-[#121313]/35 backdrop-blur-[2px]" />
        <Dialog.Popup className="fixed left-1/2 top-[12vh] z-[90] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[24px] border border-black/10 bg-[#fffdf8] shadow-[0_30px_80px_rgba(17,18,18,.22)] dark:border-white/12 dark:bg-[#1b1b18]">
          <form
            className="flex items-center gap-3 border-b border-black/8 px-4 py-3 dark:border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              go(`${link("/skills")}?q=${encodeURIComponent(q.trim())}`);
            }}
          >
            <IconSearch className="size-5 text-black/40 dark:text-white/45" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tt("skills_home_search_placeholder")}
              className="h-10 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-black/40 dark:placeholder:text-white/40"
            />
          </form>
          <ul className="max-h-[50vh] overflow-y-auto p-2">
            {results.map((s) => (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => go(link(`/skills/${s.slug}`))}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-black/[0.05] dark:hover:bg-white/8"
                >
                  <img
                    src={skillPreview(s.preview)}
                    alt=""
                    className="size-12 rounded-lg object-cover"
                    style={{ background: s.bg }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{s.name}</span>
                    <span className="text-xs text-black/45 dark:text-white/50">
                      {s.output}
                      {s.isFree ? " · Free" : ""}
                    </span>
                  </span>
                </button>
              </li>
            ))}
            {q.trim() && results.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm text-black/50 dark:text-white/50">
                No Skills match “{q.trim()}”
              </li>
            ) : null}
          </ul>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
