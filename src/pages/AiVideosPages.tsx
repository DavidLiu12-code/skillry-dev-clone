import { AppLink } from "../lib/href";
import { useApp } from "../context/AppContext";
import { VIDEO_COLLECTIONS, videos, videosIn } from "../lib/skills";

export function AiVideosHubPage() {
  const { link } = useApp();
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Viral Opus 5.5 videos, with their prompts.</h1>
      <p className="mt-5 max-w-2xl text-lg text-black/60">Original clip, remake, and the prompt behind each one — plus collections for other models.</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {VIDEO_COLLECTIONS.map((c) => (
          <AppLink key={c.slug} to={link(`/ai-videos/${c.slug}`)} className="rounded-[24px] border border-black/10 bg-[#fffdf8] p-6 dark:border-white/12 dark:bg-[#1b1b18]">
            <h2 className="text-2xl font-semibold">{c.title}</h2>
            <p className="mt-2 text-sm text-black/55 dark:text-white/58">{c.subtitle}</p>
            <p className="mt-4 text-xs tabular-nums text-black/40">{videosIn(c.slug).length} videos</p>
          </AppLink>
        ))}
      </div>
    </div>
  );
}

export function AiVideosCollectionPage({ collection }: { collection: string }) {
  const { link } = useApp();
  const meta = VIDEO_COLLECTIONS.find((c) => c.slug === collection);
  const list = videosIn(collection);
  const title = meta?.headline ?? collection;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm text-black/50">
        <AppLink to={link("/ai-videos")} className="hover:underline">
          AI videos
        </AppLink>
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-black/60">{meta?.subtitle}</p>
      <p className="mt-2 text-sm text-black/45">Browse {list.length} videos</p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => (
          <AppLink key={v.id} to={link(`/ai-videos/${v.id}`)} className="rounded-[20px] border border-black/10 bg-[#fffdf8] p-5 hover:-translate-y-0.5 hover:border-black/20 dark:border-white/12 dark:bg-[#1b1b18]">
            <div className="aspect-video rounded-2xl bg-[#d97757]/20" />
            <h2 className="mt-3 truncate font-semibold">{v.name.startsWith("@") ? v.name : `@${v.name}`}</h2>
            <p className="text-xs text-black/45">{meta?.title ?? collection}</p>
          </AppLink>
        ))}
      </div>
    </div>
  );
}

export function AiVideoDetailPage({ collection, slug }: { collection: string; slug: string }) {
  const { link } = useApp();
  const item = videos.find((v) => v.collection === collection && v.slug === slug);
  const name = item?.name ?? slug;
  const display = name.startsWith("@") ? name : `@${name}`;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <AppLink to={link(`/ai-videos/${collection}`)} className="text-sm text-black/50 hover:underline">
        {collection}
      </AppLink>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{display}</h1>
      <div className="mt-8 aspect-video rounded-[24px] bg-[#11110f]" />
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Prompt</h2>
        <p className="mt-3 rounded-[18px] border border-black/10 bg-[#fffdf8] p-5 font-mono text-sm leading-7 dark:border-white/12 dark:bg-[#1b1b18]">
          The original prompt is shown on skillry.dev when the author published it. This clone keeps the URL and layout; media remains on skillry.dev / media.skillry.dev.
        </p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Make videos like this with your agent</h2>
        <p className="mt-3 leading-7 text-black/65">Install a Video Skill from the catalog, then adapt the motion, type and product shots for your own launch.</p>
        <AppLink to={link("/skills/output/video")} className="mt-5 inline-flex h-11 items-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
          Browse video Skills
        </AppLink>
      </section>
    </article>
  );
}
