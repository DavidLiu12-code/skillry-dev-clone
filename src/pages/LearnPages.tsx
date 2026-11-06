import { AppLink } from "../lib/href";
import { useApp } from "../context/AppContext";

const HUB = [
  {
    title: "New here? Read these three first",
    items: [
      { href: "/learn/what-are-agent-skills", title: "What is a Skill?", body: "A folder of instructions that teaches your agent one kind of work." },
      { href: "/learn/getting-started", title: "Getting started", body: "Install one free Skill, run it, and check that it did the job." },
      { href: "/learn/install", title: "Install a Skill", body: "Where to put the folder so Claude Code, Codex or Cursor can find it." },
    ],
  },
  {
    title: "Which agent do you use?",
    items: [
      { href: "/learn/agents/claude-code", title: "Claude Code", body: "Install and trigger Skills in Claude Code." },
      { href: "/learn/agents/codex", title: "Codex", body: "Use Skills with Codex." },
      { href: "/learn/agents/cursor", title: "Cursor", body: "Use Skills inside Cursor." },
      { href: "/learn/agents", title: "Compare all three", body: "See how the same Skill shows up in each agent." },
    ],
  },
  {
    title: "Guides and comparisons",
    items: [
      { href: "/learn/can-claude-generate-images", title: "Can Claude generate images?" },
      { href: "/learn/frontend-design-skills", title: "Frontend design Skills" },
      { href: "/learn/claude-powerpoint", title: "Claude PowerPoint" },
      { href: "/learn/gamma-alternative", title: "Gamma alternative" },
      { href: "/learn/remotion-vs-hyperframes", title: "Remotion vs HyperFrames" },
      { href: "/learn/claude-motion", title: "Claude Motion" },
      { href: "/learn/claude-motion-alternatives", title: "Claude Motion alternatives" },
    ],
  },
  {
    title: "Connect Skillry MCP to your agent",
    items: [
      { href: "/learn/mcp", title: "Start with the overview" },
      { href: "/learn/mcp/claude-code", title: "Claude Code" },
      { href: "/learn/mcp/codex", title: "Codex" },
      { href: "/learn/mcp/cursor", title: "Cursor" },
      { href: "/learn/mcp/vscode", title: "VS Code" },
      { href: "/learn/mcp/gemini-cli", title: "Gemini CLI / Antigravity" },
      { href: "/learn/mcp/claude-desktop", title: "Claude Desktop" },
    ],
  },
  {
    title: "Get more out of your Skills",
    items: [
      { href: "/learn/use", title: "How to use Skills" },
      { href: "/learn/use/triggering", title: "How Skills trigger" },
      { href: "/learn/use/manage-update", title: "Manage and update Skills" },
      { href: "/learn/use/safety", title: "Skill safety" },
    ],
  },
  {
    title: "How Skills compare to MCP, prompts and CLAUDE.md",
    items: [
      { href: "/learn/ecosystem", title: "Customization map" },
      { href: "/learn/ecosystem/skills-vs-mcp", title: "MCP vs Skills" },
      { href: "/learn/ecosystem/skills-vs-prompts", title: "Skills vs prompts" },
      { href: "/learn/ecosystem/skills-vs-instructions", title: "Skills vs instructions" },
    ],
  },
  {
    title: "Keep these handy",
    items: [
      { href: "/learn/troubleshooting", title: "Troubleshooting" },
      { href: "/learn/reference", title: "Command cheat sheet" },
      { href: "/learn/reference/skill-locations", title: "Where Skills live" },
      { href: "/learn/reference/skillry-mcp", title: "Skillry MCP tool reference" },
    ],
  },
];

const COPY: Record<string, { title: string; lead: string; sections?: { h: string; p: string }[] }> = {
  "getting-started": {
    title: "Get your first Agent Skill working",
    lead: "Install one free Skill, run it twice, and confirm the result before you browse the rest of the catalog.",
    sections: [
      { h: "What you need before you start", p: "An agent that can read Agent Skills (Claude Code, Codex or Cursor), and a Skillry account if you want to install from the site." },
      { h: "Which Skill should you try first?", p: "Start with a free Skill from the catalog so you can run it end to end without a paid plan." },
      { h: "Install the Skill", p: "Use the install prompt on the Skill page, or download the ZIP and place it where your agent looks for Skills." },
      { h: "How to use a Skill: run it twice", p: "Run the example once as written, then change the copy, colors or assets and run it again." },
    ],
  },
  "what-are-agent-skills": {
    title: "What is an Agent Skill?",
    lead: "A Skill is a reusable set of instructions and resources that helps an AI agent complete a specific kind of work.",
  },
  install: {
    title: "Install a Skill",
    lead: "Put the Skill folder where Claude Code, Codex or Cursor can find it, or ask your agent to install it from Skillry.",
  },
};

function titleFromSlug(slug: string) {
  return slug
    .split("/")
    .filter(Boolean)
    .slice(-1)[0]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function LearnPage() {
  const { link } = useApp();
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Learn Agent Skills</h1>
      <p className="mt-4 max-w-2xl text-lg text-black/60 dark:text-white/62">The essentials for choosing, installing, and using your first Skill.</p>
      <div className="mt-12 space-y-14">
        {HUB.map((group) => (
          <section key={group.title}>
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">{group.title}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <AppLink key={item.href} to={link(item.href)} className="rounded-[20px] border border-black/10 bg-[#fffdf8] p-5 hover:border-black/20 dark:border-white/12 dark:bg-[#1b1b18]">
                  <p className="font-semibold">{item.title}</p>
                  {"body" in item && item.body ? <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/58">{item.body}</p> : null}
                </AppLink>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function LearnArticlePage({ slug }: { slug: string }) {
  const { link } = useApp();
  const key = slug.replace(/^learn\//, "");
  const last = key.split("/").pop() || key;
  const copy = COPY[key] || COPY[last] || {
    title: titleFromSlug(key),
    lead: "This guide lives on skillry.dev/learn. The clone keeps the same route and a faithful outline so every Learn URL opens.",
  };
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <AppLink to={link("/learn")} className="text-sm text-black/50 hover:underline">
        Learn
      </AppLink>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{copy.title}</h1>
      <p className="mt-5 text-lg leading-8 text-black/65 dark:text-white/68">{copy.lead}</p>
      {copy.sections?.map((s) => (
        <section key={s.h} className="mt-10">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">{s.h}</h2>
          <p className="mt-3 leading-7 text-black/65 dark:text-white/68">{s.p}</p>
        </section>
      ))}
    </article>
  );
}
