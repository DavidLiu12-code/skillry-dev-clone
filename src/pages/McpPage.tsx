import { IconCheck } from "@tabler/icons-react";
import { toast } from "sonner";
import { FAQ } from "../components/FAQ";
import { useApp } from "../context/AppContext";

export function McpPage() {
  const { tt } = useApp();
  const prompt = "Read https://skillry.dev/install/agent.md and follow the instructions to connect the official CLI, then help me discover the right Skill.";
  return (
    <div className="mx-auto max-w-[980px] px-4 py-16 sm:px-6">
      <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Connect Skillry to your agent</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60 dark:text-white/62">
        Skillry MCP lets Claude Code, Codex, Cursor and other clients search and inspect Skills from your agent. Authorize once in the browser; no Skillry API key is required.
      </p>
      <section className="mt-12 rounded-[24px] border border-[#aebce0] bg-[#e7ecfb] p-6 shadow-[10px_12px_0_rgba(17,18,18,.12)] dark:border-white/12 dark:bg-[#101521]">
        <h2 className="text-xl font-semibold">Send this to your agent. It adds Skillry for you.</h2>
        <p className="mt-4 font-mono text-sm leading-7">{prompt}</p>
        <button
          type="button"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white dark:bg-white dark:text-[#121313]"
          onClick={async () => {
            await navigator.clipboard.writeText(prompt);
            toast("Copied");
          }}
        >
          Copy
        </button>
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Or add it yourself in three steps</h2>
        <ol className="mt-6 grid gap-4">
          {["Add the Skillry MCP server to your client", "Approve account access in the browser", "Ask your agent to search or install a Skill"].map((step, i) => (
            <li key={step} className="flex gap-3 rounded-[18px] border border-black/10 bg-[#fffdf8] p-4 dark:border-white/12 dark:bg-[#1b1b18]">
              <span className="font-mono text-sm text-black/40">0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">What your agent can do with Skillry MCP</h2>
        <ul className="mt-5 grid gap-2.5">
          {["Search published Skills", "Inspect requirements before you install", "Install a Skill into the workspace", "Check installed Skills for updates"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <IconCheck className="size-4" /> {item}
            </li>
          ))}
        </ul>
      </section>
      <FAQ
        title="Questions"
        items={[
          { q: tt("skills_pricing_faq_mcp_question"), a: tt("skills_pricing_faq_mcp_answer") },
          { q: tt("skills_pricing_faq_auth_question"), a: tt("skills_pricing_faq_auth_answer") },
        ]}
      />
    </div>
  );
}
