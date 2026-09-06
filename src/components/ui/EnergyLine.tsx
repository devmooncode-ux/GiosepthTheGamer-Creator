import { cn } from '@/lib/utils';

interface EnergyLineProps {
  className?: string;
  accent?: 'cyan' | 'gold' | 'ember' | 'energy';
  animated?: boolean;
}

const lineColors = {
  cyan: 'bg-gradient-to-r from-transparent via-cyan to-transparent',
  gold: 'bg-gradient-to-r from-transparent via-gold to-transparent',
  ember: 'bg-gradient-to-r from-transparent via-ember to-transparent',
  energy: 'bg-gradient-to-r from-transparent via-energy to-transparent',
};

export function EnergyLine({ className, accent = 'cyan', animated = false }: EnergyLineProps) {
  return (
    <div className={cn('h-px w-full overflow-hidden', className)}>
      <div
        className={cn(
          'h-full w-full',
          lineColors[accent],
          animated && 'origin-left scale-x-0 animate-line-expand'
        )}
      />
    </div>
  );
}
