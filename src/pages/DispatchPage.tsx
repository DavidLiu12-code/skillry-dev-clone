import { useRouterState } from "@tanstack/react-router";
import { parsePath } from "../lib/locale";
import { OUTPUT_FILTER } from "../lib/skills";
import { HomePage } from "./HomePage";
import { SkillsPage } from "./SkillsPage";
import { SkillDetailPage } from "./SkillDetailPage";
import { PricingPage } from "./PricingPage";
import { BlogPage, BlogPostPage } from "./BlogPages";
import { LearnPage, LearnArticlePage } from "./LearnPages";
import { McpPage } from "./McpPage";
import { AffiliatePage } from "./AffiliatePage";
import { AiVideoDetailPage, AiVideosCollectionPage, AiVideosHubPage } from "./AiVideosPages";
import { AccountWallPage, AuthPage } from "./AuthPages";
import { LegalPage, NotFoundPage, ToolPage } from "./MiscPages";

const FILTER_ROOTS = new Set(["agent", "task", "use-case", "role", "output"]);

function humanize(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function DispatchPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { rest, segs } = parsePath(pathname);

  if (rest === "/") return <HomePage />;
  if (rest === "/skills") return <SkillsPage />;
  if (segs[0] === "skills" && segs[1] && FILTER_ROOTS.has(segs[1])) {
    const kind = segs[1];
    const value = segs[2];
    if (!value) {
      return <SkillsPage facetLabel={kind === "agent" ? "All agents" : humanize(kind)} />;
    }
    if (kind === "output") {
      const output = OUTPUT_FILTER[value] ?? humanize(value);
      return <SkillsPage initialOutput={[output]} facetLabel={output} />;
    }
    return (
      <SkillsPage
        initialQuery={humanize(value)}
        facetLabel={humanize(value)}
      />
    );
  }
  if (segs[0] === "skills" && segs[1] && segs.length === 2) {
    return <SkillDetailPage slug={segs[1]} />;
  }
  if (rest === "/pricing") return <PricingPage />;
  if (rest === "/blog") return <BlogPage />;
  if (segs[0] === "blog" && segs[1] === "introducing-skillry") return <BlogPostPage />;
  if (rest === "/mcp") return <McpPage />;
  if (rest === "/learn") return <LearnPage />;
  if (segs[0] === "learn") return <LearnArticlePage slug={segs.join("/")} />;
  if (rest === "/affiliate") return <AffiliatePage />;
  if (rest === "/ai-videos") return <AiVideosHubPage />;
  if (segs[0] === "ai-videos" && segs[1] && segs.length === 2) {
    return <AiVideosCollectionPage collection={segs[1]} />;
  }
  if (segs[0] === "ai-videos" && segs[1] && segs[2]) {
    return <AiVideoDetailPage collection={segs[1]} slug={segs[2]} />;
  }
  if (rest === "/dot-avatar-maker") return <ToolPage kind="dot-avatar-maker" />;
  if (rest === "/iphone-duo-mockup") return <ToolPage kind="iphone-duo-mockup" />;
  if (rest === "/privacy") return <LegalPage kind="privacy" />;
  if (rest === "/terms") return <LegalPage kind="terms" />;
  if (rest === "/cookie") return <LegalPage kind="cookie" />;
  if (rest === "/third-party-notices") return <LegalPage kind="third-party-notices" />;
  if (rest === "/auth" || rest === "/auth/login") return <AuthPage mode="login" />;
  if (rest === "/auth/register" || rest === "/auth/signup") return <AuthPage mode="register" />;
  if (rest === "/auth/forgot-password") return <AuthPage mode="forgot" />;
  if (rest === "/dashboard") return <AccountWallPage title="Dashboard" />;
  if (rest === "/settings") return <AccountWallPage title="Settings" />;
  if (segs[0] === "admin") return <AccountWallPage title="Admin" />;
  if (rest === "/device") return <AccountWallPage title="Device authorization" />;
  return <NotFoundPage />;
}
