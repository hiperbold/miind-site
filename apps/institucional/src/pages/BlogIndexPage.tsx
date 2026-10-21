import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import Reveal from '@/components/effects/Reveal';
import Particles from '@/components/effects/Particles';
import BorderBeam from '@/components/effects/BorderBeam';
import Breadcrumb from '@/components/Breadcrumb';
import PostCard from '@/components/blog/PostCard';
import TagFilter from '@/components/blog/TagFilter';
import { useSeo } from '@/hooks/useSeo';
import { fetchPublishedPosts, type PostWithTags } from '@/lib/blog';

const BlogIndexPage: React.FC = () => {
  const [posts, setPosts] = useState<PostWithTags[]>([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState('Todos');
  const [q, setQ] = useState('');

  useSeo({
    title: 'Blog · MIIND',
    description: 'Notas sobre IA aplicada, automação, agentes e engenharia de produto em produção. Conteúdo escrito pelo time MIIND.',
    canonical: 'https://www.miind.com.br/blog',
  });

  useEffect(() => {
    fetchPublishedPosts().then((p) => { setPosts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let list = posts;
    if (tag !== 'Todos') list = list.filter((p) => p.tags.includes(tag));
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(needle) ||
        (p.excerpt ?? '').toLowerCase().includes(needle)
      );
    }
    return list;
  }, [posts, tag, q]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <main id="main-content" className="pt-20 md:pt-24">
          <Breadcrumb items={[{ label: 'Blog' }]} />



          {/* Bloco Hero */}
          <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="section-frame">
                <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

                <div aria-hidden="true" className="absolute inset-0 mesh-bg opacity-90 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none"><Particles quantity={22} /></div>
                <div aria-hidden="true" className="absolute inset-0 system-grid opacity-50 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" />
                  <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
                </div>

                <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
                  <div className="text-center max-w-3xl mx-auto">
                    <Reveal>
                      <div className="eyebrow justify-center mb-6 inline-flex">
                        <span>00 // BLOG</span>
                        <span className="ml-2 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                          <span className="text-brand-cyan/80">live</span>
                        </span>
                      </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <h1 className="display-xl mb-6">
                        Notas sobre <span className="text-aurora">IA que roda em produção.</span>
                      </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="lead">
                        Engenharia, agentes, automação e processo — escrito pelo time MIIND a partir do que vemos
                        no front das operações reais.
                      </p>
                    </Reveal>

                    <Reveal delay={0.3}>
                      <div className="mt-8 max-w-md mx-auto">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="search" value={q} onChange={(e) => setQ(e.target.value)}
                            placeholder="Buscar no blog…"
                            className="w-full glass border border-border/60 rounded-full pl-11 pr-4 h-11 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand-cyan/50 transition-colors"
                          />
                        </div>
                      </div>
                    </Reveal>

                    {allTags.length > 0 && (
                      <div className="mt-8">
                        <Reveal><TagFilter tags={allTags} active={tag} onChange={setTag} /></Reveal>
                      </div>
                    )}
                  </div>
                </div>
              </div>
          </section>

          {/* Bloco Lista */}
          <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="section-frame">
                <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
                <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" />
                  <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
                </div>

                <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
                  <div className="space-y-10">
                    {loading && (
                      <div className="text-center text-sm font-mono uppercase tracking-widest text-muted-foreground py-20">
                        Carregando…
                      </div>
                    )}

                    {!loading && filtered.length === 0 && (
                      <div className="relative text-center py-20 rounded-3xl bg-surface-1 border border-border overflow-hidden">
                        <BorderBeam size={300} duration={12} />
                        <div className="eyebrow justify-center mb-4 inline-flex"><span>EMPTY // STATE</span></div>
                        <p className="font-display text-2xl mb-3">Nenhum post por aqui ainda.</p>
                        <p className="text-muted-foreground">Volte em breve — estamos escrevendo.</p>
                      </div>
                    )}

                    {featured && (
                      <Reveal>
                        <PostCard post={featured} featured />
                      </Reveal>
                    )}

                    {rest.length > 0 && (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rest.map((p, i) => (
                          <Reveal key={p.id} delay={i * 0.06}>
                            <PostCard post={p} index={i + 1} />
                          </Reveal>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
          </section>

          {/* Bloco CTA */}
          <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="section-frame">
                <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
                <div aria-hidden="true" className="absolute inset-0 mesh-bg opacity-80 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 system-grid opacity-40 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />

                <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16 text-center">
                  <div className="eyebrow justify-center mb-6 inline-flex"><span>NEXT // STEP</span></div>
                  <h3 className="display-l max-w-2xl mx-auto">
                    Quer aplicar o que escrevemos aqui na sua operação?
                  </h3>
                  <div className="mt-8 flex flex-wrap gap-3 justify-center items-center">
                    <Link to="/#next-step" className="command-button relative overflow-hidden">
                      Falar com a MIIND <ArrowRight className="w-4 h-4" />
                      <BorderBeam size={180} duration={6} />
                    </Link>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground glass border border-border/60 hover:border-brand-cyan/50 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-brand-cyan" />
                      Voltar para a Home
                    </Link>
                  </div>
                </div>
              </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default BlogIndexPage;
