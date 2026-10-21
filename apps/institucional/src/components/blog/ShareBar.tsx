import { Linkedin, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props { url: string; title: string; orientation?: 'vertical' | 'horizontal'; }

const ShareBar: React.FC<Props> = ({ url, title, orientation = 'horizontal' }) => {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const u = encodeURIComponent(url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true); toast.success('Link copiado');
      setTimeout(() => setCopied(false), 1500);
    } catch { toast.error('Não foi possível copiar'); }
  };

  const layout = orientation === 'vertical' ? 'flex-col' : 'flex-row';
  const items = [
    { Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, label: 'LinkedIn' },
    { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${u}&text=${text}`, label: 'X' },
  ];

  return (
    <div className={`flex ${layout} items-center gap-2`}>
      {items.map(({ Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg glass border border-border/40 text-foreground/75 hover:text-foreground hover:border-brand-cyan/40 transition-colors">
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button onClick={copy} aria-label="Copiar link"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg glass border border-border/40 text-foreground/75 hover:text-foreground hover:border-brand-cyan/40 transition-colors">
        {copied ? <Check className="w-4 h-4 text-brand-cyan" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default ShareBar;
