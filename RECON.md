# skillry.dev 侦察报告

目标站：https://skillry.dev/  
侦察时间：2026-11-06（Asia/Shanghai）

## 技术栈（有证据）

| 项 | 结论 | 证据 |
|---|---|---|
| 构建 | Vite | `/assets/main-*.js`、`__vite`、hashed assets |
| UI 框架 | React 18+ | `createRoot`、`useState`×327、`useEffect`×162、`react-dom` |
| 样式 | Tailwind CSS | `styles-*.css` 中 `--tw-*` 约 2882 处 |
| 浮层/交互组件 | Radix 痕迹 + shadcn 生态周边 | CSS/`data-radix`；bundle 含 **sonner**、**cmdk**、**vaul**（常见于 shadcn/ui 栈） |
| CMS/媒体 | Sanity + Cloudflare Images | `cdn.sanity.io`；`media.skillry.dev/cdn-cgi/image/...` |
| i18n | 9 语言路径前缀 | robots / sitemap hreflang：en, zh-CN(`/zh`), zh-TW(`/zh-tw`), ja, ko, es, pt-br, de, fr |

## 未检出（或伪阳性）

- **Framer Motion / motion/react**：主 bundle 无包名
- **GSAP / ScrollTrigger**：出现的 `gsap` 字符串是技能标签枚举（`"gsap":"GSAP"`），不是库引用
- **Aceternity / Magic UI**：未检出包名
- **显式 `shadcn` 包**：仅出现在技能/内容正则词表中；但 sonner/cmdk/vaul + Tailwind + Radix 风格高度吻合 shadcn 体系 → 复刻按 **Tailwind + Radix/shadcn 组件** 落地

## 规模

- sitemap：约 **16398** 条 URL
- 英文约 1822：`/skills/:slug`≈692，`/ai-videos/:slug`≈1087，外加 learn/blog/pricing 等
- 其余为 8 个 locale 镜像

## 复刻选型

Vite + React + TypeScript + React Router（或原站同款路由；以最终 bundle 确认为准）+ Tailwind + Lucide/Radix + sonner/cmdk/vaul（按需）。  
海量 skills/ai-videos 用列表 + 详情模板 + 抽样真实内容；鉴权页（auth/dashboard/settings/admin）做 UI 壳并标明需后端。

## 补充侦察（同源 HTML / bundle，2026-11-06 晚）

### 路由与 SSR
- 首页 HTML 含 `<script class="$tsr" id="$tsr-stream-barrier">` 与 `$_TSR.router` → **TanStack Router / TanStack Start** SSR，不是纯 CSR。
- `createFileRoute`、`defaultPreload` 出现在 `main-*.js`。
- 自定义根节点：`<skillry-app class="flex min-h-screen flex-col">`。
- 复刻落地：同一路由库 **@tanstack/react-router** + Vite SPA（无 Start 服务端）。

### 组件 / 图标 / 字体（比初报更细）
- HTML `data-base-ui-navigation-menu-trigger`、`data-slot="dialog-trigger"` → **Base UI**（shadcn/ui v4 底层，不是旧版 Radix 包名）。`data-radix` 仍有痕迹。
- 图标 class `tabler-icon tabler-icon-clock` + 资源名 `IconArrowDown` / `IconRepeat` → **@tabler/icons-react**（不是 Lucide）。
- 正文字体：`html{font-family:var(--font-brand)}`，`--font-brand:"Bricolage Grotesque"`；`@font-face` 指向 `/fonts/bricolage-400|600|700.woff2`。
- 主题 token（`:root` / `.dark`）完全是 shadcn 变量集：`--background #f4f1e9` / dark `#121313`，`--accent #f4ff71`，`--radius .875rem`。默认画布首页还叠加 `bg-[#f4f1e9]` 与 `dark:bg-[#11110f]`。
- i18n：Paraglide 痕迹 + `/assets/en-*.json`（1996 keys）、`/assets/zh-*.json`；clone 直接使用这两份官方文案表。
- 其它库字符串：`better-auth`、`zod`、`nuqs`、`marked`；动效以 CSS `@keyframes`（`hero-logo-loop` 52s、`testimonial-loop` 120s、`agent-logo-swap`）为主，**未装 Framer Motion / GSAP**。

### 伪阳性（再次确认）
- `gsap` / `shadcn` 出现在技能标签/词表，不是已安装的 GSAP 或 shadcn 包。
- 未检出 Aceternity / Magic UI / framer-motion。

### 媒体
- Skill 预览：同源 `/skills/:slug/media/preview-1.webp?variant=card`。
- 站内图：`media.skillry.dev/cdn-cgi/image/width=...,quality=80,...`（Cloudflare Images）。评价头像 `testimonials/*.webp`。工作室插画 `home/made-by-skillry/*`。

### 复刻已安装的同栈库
Vite + React + TypeScript + **TanStack Router** + **Tailwind CSS v4** + **@base-ui/react** + **@tabler/icons-react** + **sonner** + **cmdk** + **vaul** + 原站 Bricolage 字体与 en/zh JSON。
