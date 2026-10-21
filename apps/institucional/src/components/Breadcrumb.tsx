import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <nav
        aria-label="Breadcrumb"
        className="px-5 sm:px-10 lg:px-14 xl:px-16"
      >
        <ol className="flex items-center flex-wrap gap-2 text-xs font-mono uppercase tracking-widest">
          <li>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-brand-cyan" />
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="inline-flex items-center gap-2">
                <ChevronRight
                  aria-hidden="true"
                  className="w-3 h-3 text-muted-foreground/40"
                />
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-foreground truncate max-w-[260px] sm:max-w-[420px]"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
