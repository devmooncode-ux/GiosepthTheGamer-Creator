import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  index: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  accent?: 'cyan' | 'gold' | 'ember' | 'energy';
  className?: string;
}

const accentColors = {
  cyan: 'text-cyan',
  gold: 'text-gold',
  ember: 'text-ember',
  energy: 'text-energy',
};

export function SectionHeader({
  index,
  title,
  subtitle,
  align = 'left',
  accent = 'cyan',
  className,
}: SectionHeaderProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const isCenter = align === 'center';

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-3 transition-all duration-700 ease-out-expo',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn('meta-text', accentColors[accent])}>{index}</span>
        <span className="h-px w-8 bg-graphite-600" />
      </div>
      <h2 className="text-display-md font-display font-bold text-balance max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-text-dim text-base leading-relaxed max-w-xl',
            isCenter && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
