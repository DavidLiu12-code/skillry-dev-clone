# skillry.dev 页面清单

来源：https://skillry.dev/sitemap.xml（约 16398 URL）+ robots.txt + llms.txt

## 营销 / 工具（英文，每种另有 8 个 locale）

- `/`
- `/skills`（目录）
- `/pricing`
- `/affiliate`
- `/mcp`
- `/blog` · `/blog/introducing-skillry`
- `/dot-avatar-maker`
- `/iphone-duo-mockup`

## Learn（英文）

- `/learn`
- `/learn/getting-started` · `/learn/install` · `/learn/troubleshooting` · `/learn/what-are-agent-skills`
- `/learn/agents`（及子页：claude-code / codex / cursor 等）
- `/learn/mcp`（及各 agent 安装子页）
- `/learn/ecosystem` · `/learn/use` · `/learn/reference`
- 专题文：`/learn/can-claude-generate-images`、`claude-motion`、`claude-powerpoint`、`gamma-alternative`、`frontend-design-skills`、`remotion-vs-hyperframes` 等

## 内容规模页

| 模式 | 约数（全站含 locale） | 说明 |
|---|---|---|
| `/skills` + `/skills/:slug` | ~693 en + 多语言镜像 | Agent Skills 详情 |
| `/ai-videos` + `/ai-videos/:slug` | ~1087 en + 镜像 | AI 视频页 |
| `/LOC/...` | 8 locales × 上述结构 | zh, zh-tw, ja, ko, es, pt-br, de, fr |

## 鉴权 / 应用（robots Disallow，需登录）

- `/auth` `/auth/login` `/auth/register` `/auth/forgot-password` …
- `/dashboard` `/settings` `/admin/*` `/device` `/api/*`

## 复刻优先级

1. 首页 + `/skills` 目录 + 若干 skill 详情  
2. `/pricing` `/blog` `/mcp` `/learn` 主干  
3. `/ai-videos` 列表 + 详情模板  
4. `/zh` 首页（代表 locale）  
5. auth/dashboard：登录墙 UI，不强行接后端  

## 补充：英文 sitemap 精确拆分（1822 条）

统计来自 `/tmp/skillry-recon/sitemap.xml` 去 locale 后的英文 path：

### 静态主干
`/` `/skills` `/pricing` `/mcp` `/blog` `/blog/introducing-skillry` `/affiliate` `/dot-avatar-maker` `/iphone-duo-mockup`

### Learn（全部已列路由）
- `/learn`
- `/learn/what-are-agent-skills` `/learn/getting-started` `/learn/install` `/learn/troubleshooting`
- `/learn/agents` `/learn/agents/claude-code` `/learn/agents/codex` `/learn/agents/cursor`
- `/learn/mcp` 及 `/learn/mcp/{claude-code,codex,cursor,vscode,gemini-cli,claude-desktop}`
- `/learn/use` `/learn/use/triggering` `/learn/use/manage-update` `/learn/use/safety`
- `/learn/reference` `/learn/reference/skill-locations` `/learn/reference/skillry-mcp`
- `/learn/ecosystem` `/learn/ecosystem/skills-vs-mcp` `/learn/ecosystem/skills-vs-prompts` `/learn/ecosystem/skills-vs-instructions`
- 专题：`/learn/can-claude-generate-images` `/learn/frontend-design-skills` `/learn/claude-powerpoint` `/learn/gamma-alternative` `/learn/remotion-vs-hyperframes` `/learn/claude-motion` `/learn/claude-motion-alternatives`

### Skills 目录过滤（sitemap 另有，不属于 :slug 详情）
- `/skills/output/{image,video,slides,web}`
- `/skills/agent` + 约 32 个 agent 子路径（claude-code、codex、cursor、github-copilot、gemini-cli、opencode、antigravity、openclaw、kimi-code、trae 等）
- `/skills/task/*`（16）`/skills/role/*`（8）`/skills/use-case/*`（11）

### 规模页（英文）
- Skill 详情：`/skills/:slug` **621** 条（另加过滤路径后英文 skills 相关约 692）
- AI 视频集合页：`/ai-videos/opus-5-5`（419）`/ai-videos/gemini-4-argon`（305）`/ai-videos/kimi-k3-1`（277）`/ai-videos/fable-5-5`（83）以及 `/ai-videos/manus-2-launch-video` `/ai-videos/ai-motion-graphics` `/ai-videos/product-launch-video`
- 视频详情形态：`/ai-videos/:collection/:slug`（英文约 1080）

### 页脚有、sitemap 未收录的公开页
`/privacy` `/terms` `/cookie` `/third-party-notices`

### Locale
每个上述英文 URL × 8：`/zh` `/zh-tw` `/ja` `/ko` `/es` `/pt-br` `/de` `/fr`（sitemap 各 1822 条）。

### Clone 已接通
首页（en + `/zh` 等 locale 前缀）、`/skills` 目录与过滤 URL、620+ skill 详情模板（含精选卡真实封面/安装数）、`/pricing` `/blog` `/mcp` `/learn/*`、`/ai-videos` 集合+详情模板、工具页与法律路由、`/auth/*` 与 dashboard/settings/admin/device 登录墙。
