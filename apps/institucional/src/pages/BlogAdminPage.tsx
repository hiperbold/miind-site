import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import {
  fetchAllPostsAdmin, isCurrentUserAdmin, slugify,
  estimateReadingMinutes, type PostWithTags,
} from '@/lib/blog';
import { ArrowLeft, Plus, Save, Send, Trash2, Upload, Eye, EyeOff } from 'lucide-react';

const db = supabase as any;

type Mode = 'list' | 'edit';

interface Draft {
  id?: string;
  slug: string; title: string; excerpt: string; cover_url: string;
  content_md: string; status: 'draft' | 'published'; tagsCsv: string;
}

const EMPTY: Draft = { slug: '', title: '', excerpt: '', cover_url: '', content_md: '', status: 'draft', tagsCsv: '' };

const BlogAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [mode, setMode] = useState<Mode>('list');
  const [posts, setPosts] = useState<PostWithTags[]>([]);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showPreview, setShowPreview] = useState(false);

  const checkAccess = async () => {
    const ok = await isCurrentUserAdmin();
    setAllowed(ok); setReady(true);
    if (ok) load();
  };

  useEffect(() => { checkAccess(); }, []);

  const load = async () => {
    try { setPosts(await fetchAllPostsAdmin()); }
    catch (e: any) { toast.error(e.message ?? 'Erro ao carregar'); }
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { toast.error(error.message); return; }
    await checkAccess();
  };

  const signOut = async () => { await supabase.auth.signOut(); setAllowed(false); };

  const newPost = () => { setDraft(EMPTY); setMode('edit'); };
  const editPost = (p: PostWithTags) => {
    setDraft({
      id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt ?? '',
      cover_url: p.cover_url ?? '', content_md: p.content_md,
      status: p.status, tagsCsv: p.tags.join(', '),
    });
    setMode('edit');
  };

  const onTitleChange = (v: string) => {
    setDraft((d) => ({ ...d, title: v, slug: d.slug ? d.slug : slugify(v) }));
  };

  const uploadCover = async (file: File) => {
    const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ''))}.${file.name.split('.').pop()}`;
    const { error } = await db.storage.from('blog-covers').upload(path, file, { upsert: false });
    if (error) { toast.error(error.message); return; }
    setDraft((d) => ({ ...d, cover_url: path }));
    toast.success('Capa enviada');
  };

  const save = async (publish: boolean) => {
    if (!draft.title.trim() || !draft.slug.trim()) { toast.error('Título e slug obrigatórios'); return; }
    const tags = draft.tagsCsv.split(',').map((t) => t.trim()).filter(Boolean);
    const payload: any = {
      slug: slugify(draft.slug),
      title: draft.title,
      excerpt: draft.excerpt || null,
      cover_url: draft.cover_url || null,
      content_md: draft.content_md,
      reading_minutes: estimateReadingMinutes(draft.content_md),
      status: publish ? 'published' : draft.status,
      published_at: publish ? new Date().toISOString() : null,
    };
    let postId = draft.id;
    if (draft.id) {
      const { error } = await db.from('posts').update(payload).eq('id', draft.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      payload.author_id = user?.id ?? null;
      const { data, error } = await db.from('posts').insert(payload).select('id').single();
      if (error) { toast.error(error.message); return; }
      postId = data.id;
    }
    // sync tags
    if (postId) {
      await db.from('post_tags').delete().eq('post_id', postId);
      if (tags.length) {
        await db.from('post_tags').insert(tags.map((tag) => ({ post_id: postId, tag })));
      }
    }
    toast.success(publish ? 'Publicado' : 'Salvo');
    setMode('list'); load();
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir este post?')) return;
    const { error } = await db.from('posts').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Excluído'); load();
  };

  if (!ready) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen bg-background pt-40 text-center text-sm font-mono uppercase tracking-widest text-muted-foreground">
          Verificando acesso…
        </div>
      </PageTransition>
    );
  }

  if (!allowed) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen bg-background pt-32 pb-20">
          <div className="container-editorial max-w-md">
            <div className="eyebrow mb-6"><span>ADMIN // BLOG</span></div>
            <h1 className="display-l mb-6">Acesso restrito</h1>
            <p className="text-muted-foreground mb-8">Faça login com uma conta de administrador.</p>
            <form onSubmit={signIn} className="space-y-4">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="email" className="w-full glass border border-border/60 rounded-lg px-4 h-11" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="senha" className="w-full glass border border-border/60 rounded-lg px-4 h-11" />
              <button type="submit" className="command-button w-full justify-center">Entrar</button>
            </form>
            <p className="mt-6 text-xs text-muted-foreground">
              O usuário precisa ter papel <code className="font-mono">admin</code> na tabela user_roles.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen bg-background pt-28 pb-20">
        <div className="container-editorial">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="eyebrow mb-3"><span>ADMIN // BLOG</span></div>
              <h1 className="font-display text-3xl font-semibold">Gerenciar posts</h1>
            </div>
            <div className="flex items-center gap-3">
              {mode === 'edit' && (
                <button onClick={() => setMode('list')} className="inline-flex items-center gap-2 px-4 h-10 rounded-lg glass border border-border/60 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
              )}
              {mode === 'list' && (
                <button onClick={newPost} className="command-button">
                  <Plus className="w-4 h-4" /> Novo post
                </button>
              )}
              <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground">sair</button>
            </div>
          </div>

          {mode === 'list' && (
            <div className="space-y-3">
              {posts.length === 0 && <p className="text-muted-foreground">Nenhum post ainda.</p>}
              {posts.map((p) => (
                <div key={p.id} className="glass border border-border/60 rounded-xl p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                      <span className={p.status === 'published' ? 'text-brand-cyan' : 'text-muted-foreground'}>
                        {p.status}
                      </span>
                      <span>/{p.slug}</span>
                    </div>
                    <h3 className="font-display text-lg truncate">{p.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link to={`/blog/${p.slug}`} className="text-xs text-muted-foreground hover:text-foreground">ver</Link>
                    <button onClick={() => editPost(p)} className="px-3 h-9 rounded-lg glass border border-border/60 text-sm">editar</button>
                    <button onClick={() => remove(p.id)} className="inline-flex items-center justify-center w-9 h-9 rounded-lg glass border border-border/60 text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {mode === 'edit' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Título</label>
                  <input value={draft.title} onChange={(e) => onTitleChange(e.target.value)}
                    className="w-full mt-1 glass border border-border/60 rounded-lg px-4 h-11" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Slug</label>
                  <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                    className="w-full mt-1 glass border border-border/60 rounded-lg px-4 h-11 font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Resumo</label>
                  <textarea value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                    rows={3} className="w-full mt-1 glass border border-border/60 rounded-lg px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Tags (vírgula)</label>
                  <input value={draft.tagsCsv} onChange={(e) => setDraft({ ...draft, tagsCsv: e.target.value })}
                    className="w-full mt-1 glass border border-border/60 rounded-lg px-4 h-11 text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Capa</label>
                  <div className="mt-1 flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 h-11 rounded-lg glass border border-border/60 cursor-pointer text-sm">
                      <Upload className="w-4 h-4" /> Enviar
                      <input type="file" accept="image/*" className="hidden"
                        onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                    </label>
                    <input value={draft.cover_url} onChange={(e) => setDraft({ ...draft, cover_url: e.target.value })}
                      placeholder="caminho ou URL" className="flex-1 glass border border-border/60 rounded-lg px-4 h-11 font-mono text-xs" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Conteúdo (Markdown)</label>
                    <button type="button" onClick={() => setShowPreview((s) => !s)} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                      {showPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {showPreview ? 'ocultar preview' : 'mostrar preview'}
                    </button>
                  </div>
                  <textarea value={draft.content_md} onChange={(e) => setDraft({ ...draft, content_md: e.target.value })}
                    rows={20} className="w-full glass border border-border/60 rounded-lg px-4 py-3 font-mono text-xs leading-relaxed" />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <button onClick={() => save(false)} className="inline-flex items-center gap-2 px-4 h-11 rounded-lg glass border border-border/60 text-sm">
                    <Save className="w-4 h-4" /> Salvar rascunho
                  </button>
                  <button onClick={() => save(true)} className="command-button">
                    <Send className="w-4 h-4" /> Publicar
                  </button>
                </div>
              </div>

              <div className={`${showPreview ? '' : 'hidden lg:block'}`}>
                <div className="sticky top-28 max-h-[80vh] overflow-y-auto rounded-2xl border border-border/60 bg-surface-1 p-6">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Preview</p>
                  <h2 className="font-display text-2xl mb-3">{draft.title || 'Sem título'}</h2>
                  {draft.excerpt && <p className="text-muted-foreground mb-6">{draft.excerpt}</p>}
                  <MarkdownRenderer content={draft.content_md || '_Comece a escrever…_'} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default BlogAdminPage;
