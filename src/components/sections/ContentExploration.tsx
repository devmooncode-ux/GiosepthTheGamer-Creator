import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getVideoFeed } from '@/lib/youtube';
import { siteConfig, type ContentCategory } from '@/config/site';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { VideoCard } from '@/components/ui/VideoCard';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { cn } from '@/lib/utils';

const accentMap = {
  cyan: { text: 'text-cyan', border: 'border-cyan/40', bg: 'bg-cyan/5', dot: 'bg-cyan' },
  gold: { text: 'text-gold', border: 'border-gold/40', bg: 'bg-gold/5', dot: 'bg-gold' },
  ember: { text: 'text-ember', border: 'border-ember/40', bg: 'bg-ember/5', dot: 'bg-ember' },
  energy: { text: 'text-energy', border: 'border-energy/40', bg: 'bg-energy/5', dot: 'bg-energy' },
} as const;

export function ContentExploration() {
  const feed = getVideoFeed();
  const [activeCategory, setActiveCategory] = useState<string>('dragonball');
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yLine = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const categories = siteConfig.contentCategories;
  const activeCat = categories.find((c) => c.id === activeCategory) as ContentCategory;
  const activeVideos = feed.byCategory[activeCategory] ?? [];
  const accent = accentMap[activeCat.accent];

  const scrollRail = (dir: 'left' | 'right') => {
    const el = railRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section ref={sectionRef} id="gaming" className="relative py-24 md:py-32 section-pad overflow-hidden">
      <motion.div
        style={reduced ? undefined : { y: yLine }}
        className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-graphite-700 to-transparent"
      />

      <SectionHeader
        index="02"
        title="Esplora i Contenuti"
        subtitle="Categorie editoriali dal mondo gaming e Dragon Ball."
        accent="ember"
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const a = accentMap[cat.accent];
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full border text-xs uppercase tracking-widest font-mono transition-all duration-300',
                isActive
                  ? cn(a.border, a.text, a.bg)
                  : 'border-graphite-600 text-text-dim hover:text-text hover:border-graphite-500'
              )}
            >
              <span className={cn('inline-block w-1.5 h-1.5 rounded-full mr-2', isActive ? a.dot : 'bg-graphite-500')} />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MetadataTag accent={activeCat.accent}>{activeCat.label}</MetadataTag>
          <span className="meta-text">{activeVideos.length} video</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollRail('left')}
            className="w-10 h-10 rounded-full border border-graphite-600 flex items-center justify-center text-text-dim hover:text-text hover:border-text-dim transition-colors"
            aria-label=" Scorri a sinistra"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollRail('right')}
            className="w-10 h-10 rounded-full border border-graphite-600 flex items-center justify-center text-text-dim hover:text-text hover:border-text-dim transition-colors"
            aria-label="Scorri a destra"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-6 flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
      >
        {activeVideos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="snap-start shrink-0 w-[280px] md:w-[340px]"
          >
            <VideoCard video={video} />
          </motion.div>
        ))}
        {activeVideos.length === 0 && (
          <div className="py-20 text-center text-text-dim meta-text">
            Nessun video in questa categoria. Configura i contenuti per abilitare.
          </div>
        )}
      </div>
    </section>
  );
}
