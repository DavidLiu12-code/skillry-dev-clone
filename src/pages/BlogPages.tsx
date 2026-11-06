import { AppLink } from "../lib/href";
import { useApp } from "../context/AppContext";
import post from "../data/blog-introducing.json";

export function BlogPage() {
  const { link } = useApp();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-[-0.05em]">Blog</h1>
      <p className="mt-3 text-black/55 dark:text-white/58">Notes on Agent Skills, the catalog, and how Skillry is built.</p>
      <AppLink to={link("/blog/introducing-skillry")} className="mt-10 block rounded-[24px] border border-black/10 bg-[#fffdf8] p-6 hover:border-black/20 dark:border-white/12 dark:bg-[#1b1b18]">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-black/60 dark:text-white/62">{post.paragraphs[0]}</p>
      </AppLink>
    </div>
  );
}

export function BlogPostPage() {
  const { link } = useApp();
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <AppLink to={link("/blog")} className="text-sm text-black/50 hover:underline">
        Blog
      </AppLink>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
      <div className="mt-8 space-y-5 text-[17px] leading-8 text-black/75 dark:text-white/75">
        {post.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </article>
  );
}
