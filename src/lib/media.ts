export function pub(path: string) {
  if (path.startsWith("http")) return path;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\//, "")}`;
}

export const ORIGIN = "https://skillry.dev";
export const CDN = "https://media.skillry.dev/cdn-cgi/image";

export function skillPreview(path: string) {
  if (path.startsWith("http")) return path;
  return `${ORIGIN}${path}`;
}

export function cdnImage(key: string, width: number, extra = "quality=80,fit=scale-down,format=auto") {
  return `${CDN}/width=${width},${extra}/${key}`;
}

export function testimonialAvatar(key: string) {
  return cdnImage(key, 80, "quality=85,fit=cover,format=auto");
}

export const AGENT_ICONS: Record<string, string> = {
  "Claude Code": "/agents/claudecode-color-D0FKA8SV.svg",
  Codex: "/agents/codex-color-DxVtZdUr.svg",
  Cursor: "/agents/cursor-BWvu9foS.svg",
  "Hermes Agent": "/agents/hermesagent-DUfTwIy7.svg",
  Grok: "/agents/grok-CXGI5ZJ8.svg",
  OpenCode: "/agents/opencode-DBd2g-kp.svg",
  OpenClaw: "/agents/openclaw-color-DBLUwWEL.svg",
  "Claude Desktop / Cowork": "/agents/claude-color-dJjxgD3o.svg",
  "Claude Desktop": "/agents/claude-color-dJjxgD3o.svg",
  ChatGPT: "/agents/openai-L0iksW7i.svg",
  "Gemini CLI": "/agents/geminicli-color-CD1WV2cz.svg",
  Gemini: "/agents/gemini-color-CV8WvAGK.svg",
  "Kimi Code CLI": "/agents/kimi-color-DUX2TEfP.svg",
  Kimi: "/agents/kimi-CoXq7FVU.svg",
  Antigravity: "/agents/antigravity-color-DgAQAdn3.svg",
  "GitHub Copilot": "/agents/githubcopilot-C9GEQNVa.svg",
};

export const HERO_AGENTS = [
  { name: "Claude Code", icon: AGENT_ICONS["Claude Code"] },
  { name: "Codex", icon: AGENT_ICONS.Codex },
  { name: "Cursor", icon: AGENT_ICONS.Cursor },
  { name: "Hermes Agent", icon: AGENT_ICONS["Hermes Agent"] },
  { name: "Grok", icon: AGENT_ICONS.Grok },
  { name: "OpenCode", icon: AGENT_ICONS.OpenCode },
  { name: "OpenClaw", icon: AGENT_ICONS.OpenClaw },
];

export const CONNECT_AGENTS = [
  { name: "Claude Code", icon: AGENT_ICONS["Claude Code"] },
  { name: "Codex", icon: AGENT_ICONS.Codex },
  { name: "Kimi Code CLI", icon: AGENT_ICONS["Kimi Code CLI"] },
  { name: "Gemini CLI", icon: AGENT_ICONS["Gemini CLI"] },
  { name: "Antigravity", icon: AGENT_ICONS.Antigravity },
  { name: "Cursor", icon: AGENT_ICONS.Cursor },
];

export const ROTATING_AGENTS = CONNECT_AGENTS;

export const MORE_AGENTS = [
  "Gemini CLI",
  "Kimi CLI",
  "Antigravity",
  "Claude Desktop",
  "GitHub Copilot",
  "Kilo Code",
];

export const HERO_LOGOS = Array.from(
  { length: 29 },
  (_, i) => `/hero-skill-logos/skill-logo-${String(i + 1).padStart(2, "0")}.webp`,
);

export const STUDIO = {
  hero: "home/made-by-skillry/studio-designed-by-hand.93234d1014.png",
  design: "home/made-by-skillry/step-1.d45bc8fbea.png",
  write: "home/made-by-skillry/step-2.00032b56ed.png",
  run: "home/made-by-skillry/step-3.591388050b.png",
  update: "home/made-by-skillry/step-4.e52fc17f70.png",
};

export const BF_END = new Date("2026-12-01T07:59:59.000Z");
