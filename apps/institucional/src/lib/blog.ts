import { supabase } from '@/integrations/supabase/client';

export type PostStatus = 'draft' | 'published';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  content_md: string;
  reading_minutes: number;
  status: PostStatus;
  published_at: string | null;
  author_id: string | null;
  lang: string;
  created_at: string;
  updated_at: string;
}

export interface PostWithTags extends Post {
  tags: string[];
}

const db = supabase as unknown as {
  from: (t: string) => any;
};

export async function fetchPublishedPosts(): Promise<PostWithTags[]> {
  const { data, error } = await db
    .from('posts')
    .select('*, post_tags(tag)')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((p: any) => ({
    ...p,
    tags: (p.post_tags ?? []).map((t: any) => t.tag),
  }));
}

export async function fetchPostBySlug(slug: string): Promise<PostWithTags | null> {
  const { data, error } = await db
    .from('posts')
    .select('*, post_tags(tag)')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return { ...data, tags: (data.post_tags ?? []).map((t: any) => t.tag) };
}

export async function fetchAllPostsAdmin(): Promise<PostWithTags[]> {
  const { data, error } = await db
    .from('posts')
    .select('*, post_tags(tag)')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((p: any) => ({
    ...p,
    tags: (p.post_tags ?? []).map((t: any) => t.tag),
  }));
}

export async function recordView(postId: string) {
  try {
    await db.from('post_views').insert({ post_id: postId });
  } catch {
    /* ignore */
  }
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export function estimateReadingMinutes(md: string): number {
  const words = md.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string | null, locale = 'pt-BR'): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export async function getCoverPublicUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  const { data } = await (supabase as any).storage
    .from('blog-covers')
    .createSignedUrl(path, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? null;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await (db.from('user_roles') as any)
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle();
  return !!data;
}
