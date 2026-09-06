import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetadataTagProps {
  children: ReactNode;
  accent?: 'cyan' | 'gold' | 'ember' | 'energy' | 'neutral';
  className?: string;
}

const tagStyles = {
  cyan: 'border-cyan/30 text-cyan bg-cyan/5',
  gold: 'border-gold/30 text-gold bg-gold/5',
  ember: 'border-ember/30 text-ember bg-ember/5',
  energy: 'border-energy/30 text-energy bg-energy/5',
  neutral: 'border-graphite-600 text-text-dim bg-graphite-800/50',
};

export function MetadataTag({ children, accent = 'neutral', className }: MetadataTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[0.625rem] font-mono uppercase tracking-[0.12em]',
        tagStyles[accent],
        className
      )}
    >
      {children}
    </span>
  );
}
