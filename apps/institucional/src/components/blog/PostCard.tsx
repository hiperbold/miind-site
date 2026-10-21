import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import MagicCard from '@/components/effects/MagicCard';
import BorderBeam from '@/components/effects/BorderBeam';
import { type PostWithTags, formatDate, getCoverPublicUrl } from '@/lib/blog';

interface Props { post: PostWithTags; index?: number; featured?: boolean; }

const PostCard: React.FC<Props> = ({ post, index = 0, featured }) => {
  const [cover, setCover] = useState<string | null>(null);
  useEffect(() => { getCoverPublicUrl(post.cover_url).then(setCover); }, [post.cover_url]);

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="group block">
        <MagicCard className="relative overflow-hidden rounded-[18px] bento-card grid md:grid-cols-2 gap-0">
          <BorderBeam size={420} duration={14} />
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden bg-surface-2">
            {cover ? (
              <img src={cover} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            ) : (
              <div className="absolute inset-0 mesh-bg" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
          </div>
          <div className="p-8 md:p-10 flex flex-col">
            <div className="eyebrow mb-5">
              <span>00 // FEATURED</span>
              <span className="ml-2 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                <span className="text-brand-cyan/80">new</span>
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold leading-tight mb-4 group-hover:text-aurora transition-colors">
              {post.title}
            </h2>
            {post.excerpt && <p className="text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>}
            <div className="mt-auto flex items-center justify-between pt-5 border-t border-border">
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>{formatDate(post.published_at)}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{post.reading_minutes} min</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan">
                Ler <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </MagicCard>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <MagicCard className="bento-card rounded-[14px] overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          {cover ? (
            <img src={cover} alt={post.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          ) : (
            <div className="absolute inset-0 mesh-bg" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan/80">#{tag}</span>
            ))}
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-auto">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug mb-3 group-hover:text-aurora transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
          )}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span>{formatDate(post.published_at)}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{post.reading_minutes} min</span>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
};

export default PostCard;
