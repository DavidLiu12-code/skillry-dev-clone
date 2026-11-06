import footerLinks from "../data/footer-links.json";
import { useApp } from "../context/AppContext";
import { AppLink } from "../lib/href";

type FooterLink = { href: string; text: string };

const GROUPS: { title: string; match: (href: string) => boolean }[] = [
  { title: "Product", match: (h) => ["/skills", "/mcp", "/learn", "/pricing", "/blog"].includes(h) || h === "/" },
  { title: "Use cases", match: (h) => h.includes("/use-case/") },
  { title: "By output", match: (h) => h.includes("/output/") },
  { title: "Tasks", match: (h) => h.includes("/task/") },
  { title: "Learn", match: (h) => h.startsWith("/learn/") },
  { title: "Agents", match: (h) => h.includes("/agent") },
  { title: "Company", match: (h) => ["/affiliate", "/dot-avatar-maker", "/iphone-duo-mockup"].includes(h) || h.startsWith("/privacy") || h.startsWith("/terms") || h.startsWith("/cookie") || h.startsWith("/third") || h.startsWith("mailto") },
];

export function Footer() {
  const { link, tt } = useApp();
  const links = footerLinks as FooterLink[];
  const used = new Set<string>();

  return (
    <footer className="border-t border-black/10 bg-[#ebe7de] px-4 py-12 text-sm dark:border-white/10 dark:bg-[#0d0d0c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-10 flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="size-7 rounded-[9px] dark:hidden" />
          <img src={`${import.meta.env.BASE_URL}logo-dark.png`} alt="" className="hidden size-7 rounded-[9px] dark:block" />
          <span className="font-semibold">Skillry</span>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {GROUPS.map((group) => {
            const items = links.filter((l) => group.match(l.href) && !used.has(l.href + l.text));
            items.forEach((l) => used.add(l.href + l.text));
            if (!items.length) return null;
            return (
              <div key={group.title}>
                <p className="mb-3 font-semibold">{group.title}</p>
                <ul className="grid gap-2 text-black/60 dark:text-white/60">
                  {items.map((l) => (
                    <li key={l.href + l.text}>
                      {l.href.startsWith("mailto:") ? (
                        <a href={l.href} className="hover:text-[#121313] dark:hover:text-white">
                          {l.text.replace("&amp;", "&")}
                        </a>
                      ) : (
                        <AppLink
                          to={l.href.startsWith("/") ? link(l.href) : l.href}
                          className="hover:text-[#121313] dark:hover:text-white"
                        >
                          {l.text.replace("&amp;", "&")}
                        </AppLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-12 text-black/45 dark:text-white/45">
          © {new Date().getFullYear()} Skillry. {tt("footer_rights_reserved")}
        </p>
      </div>
    </footer>
  );
}
