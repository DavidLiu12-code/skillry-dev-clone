import skillsData from "../data/skills.json";
import shelvesData from "../data/shelves.json";
import extrasData from "../data/skill-extras.json";
import videosData from "../data/videos.json";

export type Skill = {
  id: string;
  slug: string;
  name: string;
  preview: string;
  output: string;
  installs: number;
  bookmarks: number;
  isFree: boolean;
  isNew: boolean;
  bg: string;
  imageCount: number;
  tools: string[];
  source?: string;
};

export type VideoItem = {
  id: string;
  collection: string;
  slug: string;
  name: string;
  image?: string | null;
};

export const skills = skillsData as Skill[];
export const shelves = shelvesData as Record<string, string[]>;
export const skillExtras = extrasData as Record<
  string,
  { version?: string; blurb?: string; description?: string; about?: string; youGet?: string[] }
>;
export const videos = videosData as VideoItem[];

export const skillBySlug = new Map(skills.map((s) => [s.slug, s]));

export function getSkillsBySlugs(slugs: string[] = []) {
  return slugs.map((slug) => skillBySlug.get(slug)).filter(Boolean) as Skill[];
}

export const OUTPUT_FILTER: Record<string, string> = {
  image: "Image",
  video: "Video",
  slides: "Slides",
  presentation: "Slides",
  web: "Web",
  html: "Web",
};

export function searchSkills(
  query: string,
  opts: { output?: string[]; free?: boolean; featured?: boolean } = {},
) {
  const q = query.trim().toLowerCase();
  return skills.filter((s) => {
    if (opts.free && !s.isFree) return false;
    if (opts.featured && s.source === "sitemap") return false;
    if (opts.output?.length && !opts.output.includes(s.output)) return false;
    if (!q) return true;
    const blob = `${s.name} ${s.slug} ${s.output} ${s.tools.join(" ")}`.toLowerCase();
    return blob.includes(q);
  });
}

export function similarSkills(skill: Skill, limit = 8) {
  return skills.filter((s) => s.slug !== skill.slug && s.output === skill.output).slice(0, limit);
}

export const VIDEO_COLLECTIONS = [
  {
    slug: "opus-5-5",
    title: "Opus 5.5",
    headline: "Viral Opus 5.5 videos, with their prompts.",
    subtitle: "Original clip, remake, and the prompt behind each one.",
  },
  {
    slug: "gemini-4-argon",
    title: "Gemini 4 Argon",
    headline: "What people made with Gemini 4 Argon.",
    subtitle: "Code paintings, 3D worlds and playable games, from the first day of Google's new model.",
  },
  {
    slug: "kimi-k3-1",
    title: "Kimi K3.1",
    headline: "What people made with Kimi K3.1.",
    subtitle: "3D worlds, playable games and motion design, from the first days of Moonshot AI's new model.",
  },
  {
    slug: "fable-5-5",
    title: "Fable 5.5",
    headline: "What people made with Fable 5.5.",
    subtitle: '"INSANE" is what creators keep saying about Fable 5.5.',
  },
];

export function videosIn(collection: string) {
  return videos.filter((v) => v.collection === collection);
}
