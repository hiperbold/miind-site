import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import Reveal from '@/components/effects/Reveal';
import BorderBeam from '@/components/effects/BorderBeam';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import ShareBar from '@/components/blog/ShareBar';
import PostCard from '@/components/blog/PostCard';
import { useSeo } from '@/hooks/useSeo';
import Breadcrumb from '@/components/Breadcrumb';
import {
  fetchPostBySlug, fetchPublishedPosts, formatDate, getCoverPublicUrl,
  recordView, type PostWithTags,
} from '@/lib/blog';

const BlogPostPage: React.FC = () => {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<PostWithTags | null>(null);
  const [related, setRelated] = useState<PostWithTags[]>([]);
  const [cover, setCover] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPostBySlug(slug).then(async (p) => {
      if (!mounted) return;
      setPost(p); setLoading(false);
      if (p) {
        recordView(p.id);
        getCoverPublicUrl(p.cover_url).then(setCover);
        const all = await fetchPublishedPosts();
        const rel = all.filter((x) => x.id !== p.id && x.tags.some((t) => p.tags.includes(t))).slice(0, 3);
        setRelated(rel.length ? rel : all.filter((x) => x.id !== p.id).slice(0, 3));
      }
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, [slug]);

  useSeo({
    title: post ? `${post.title} · Blog MIIND` : 'Blog · MIIND',
    description: post?.excerpt ?? undefined,
    canonical: `https://www.miind.com.br/blog/${slug}`,
    ogImage: cover ?? undefined,
  });

  useEffect(() => {
    if (!post) return;
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'blog-jsonld';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, description: post.excerpt,
      datePublished: post.published_at, dateModified: post.updated_at,
      image: cover, author: { '@type': 'Organization', name: 'MIIND' },
      publisher: { '@type': 'Organization', name: 'MIIND' },
    });
    document.head.querySelector('#blog-jsonld')?.remove();
    document.head.appendChild(ld);
    return () => { document.head.querySelector('#blog-jsonld')?.remove(); };
  }, [post, cover]);

  if (loading) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen bg-background pt-40 text-center text-sm font-mono uppercase tracking-widest text-muted-foreground">
          Carregando…
        </div>
      </PageTransition>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen bg-background pt-40 text-center">
          <p className="font-display text-2xl mb-4">Post não encontrado.</p>
          <Link to="/blog" className="text-brand-cyan underline">Voltar para o blog</Link>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <main className="relative pt-28 pb-20">
          <Breadcrumb
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
          {/* Hero */}
          <header className="relative mt-4">
            <div className="absolute inset-0 -z-10">
              {cover ? (
                <>
                  <img src={cover} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
                </>
              ) : (
                <div className="absolute inset-0 mesh-bg opacity-90" />
              )}
              <div className="absolute inset-0 system-grid opacity-40 pointer-events-none" />
            </div>

            <div className="container-editorial pt-6 pb-12">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3 mb-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {post.tags.map((t) => (
                    <span key={t} className="text-brand-cyan/80">#{t}</span>
                  ))}
                  {post.tags.length > 0 && <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />}
                  <span>{formatDate(post.published_at)}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{post.reading_minutes} min</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="display-xl max-w-4xl">{post.title}</h1>
              </Reveal>
              {post.excerpt && (
                <Reveal delay={0.2}>
                  <p className="lead mt-6 max-w-2xl">{post.excerpt}</p>
                </Reveal>
              )}
            </div>
          </header>

          {/* Body */}
          <div className="container-editorial grid lg:grid-cols-[1fr_240px] gap-12">
            <article>
              <Reveal>
                <MarkdownRenderer content={post.content_md} />
              </Reveal>

              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Compartilhar
                </span>
                <ShareBar url={url} title={post.title} />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-6">
                <div className="glass border border-border/60 rounded-2xl p-5">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Compartilhar</p>
                  <ShareBar url={url} title={post.title} orientation="horizontal" />
                </div>
              </div>
            </aside>
          </div>

          {/* CTA */}
          <div className="container-editorial mt-20">
            <Reveal>
              <section className="relative rounded-3xl overflow-hidden mesh-bg border border-border">
                <div className="absolute inset-0 system-grid opacity-40 pointer-events-none" />
                <div className="relative p-10 md:p-14 text-center">
                  <div className="eyebrow justify-center mb-6 inline-flex"><span>NEXT // STEP</span></div>
                  <h3 className="display-l max-w-2xl mx-auto">
                    Quer transformar este insight em <span className="text-aurora">um sistema que roda?</span>
                  </h3>
                  <div className="mt-8 flex justify-center">
                    <Link to="/#next-step" className="command-button relative overflow-hidden">
                      Conversar com a MIIND <ArrowRight className="w-4 h-4" />
                      <BorderBeam size={180} duration={6} />
                    </Link>
                  </div>
                </div>
              </section>
            </Reveal>

            {related.length > 0 && (
              <div className="mt-20">
                <div className="eyebrow mb-8"><span>RELATED // POSTS</span></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((p, i) => (
                    <Reveal key={p.id} delay={i * 0.06}>
                      <PostCard post={p} index={i} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default BlogPostPage;
