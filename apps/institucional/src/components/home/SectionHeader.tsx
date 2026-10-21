import Reveal from '../effects/Reveal';

interface Props {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
}

const SectionHeader = ({ index, label, title, lead, align = 'left' }: Props) => (
  <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-14`}>
    <Reveal>
      <div className="eyebrow mb-6">
        <span>{index} // {label}</span>
        <span className="ml-2 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
          <span className="text-brand-cyan/80">live</span>
        </span>
      </div>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="display-l text-foreground">{title}</h2>
    </Reveal>
    {lead && (
      <Reveal delay={0.16}>
        <p className="lead mt-6">{lead}</p>
      </Reveal>
    )}
  </div>
);

export default SectionHeader;
