import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Users, ArrowDown, Youtube } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { EnergyLine } from '@/components/ui/EnergyLine';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const opacityMeta = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const handleWatchLatest = () => {
    trackEvent({ type: 'youtube_click', location: 'hero_watch_latest' });
    window.open(siteConfig.socials[0].url, '_blank', 'noopener,noreferrer');
  };

  const handleJoinCommunity = () => {
    const el = document.getElementById('community');
    el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center"
    >
      <motion.div
        style={reduced ? undefined : { y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-graphite-950" />
        <div className="absolute inset-0 energy-gradient" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 30%, rgba(0,229,255,0.12), transparent 50%), radial-gradient(circle at 75% 70%, rgba(255,106,26,0.08), transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center section-pad">
        <motion.div
          style={reduced ? undefined : { opacity: opacityMeta }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {siteConfig.heroMetadata.map((tag, i) => (
            <MetadataTag key={tag} accent={i === 0 ? 'cyan' : i === 2 ? 'ember' : 'neutral'}>
              {tag}
            </MetadataTag>
          ))}
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: yTitle, opacity: opacityTitle }}
          className="text-center"
        >
          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="meta-text mb-4"
          >
            {siteConfig.creator.positioning}
          </motion.p>

          <motion.h1
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-2xl font-display font-extrabold tracking-tight text-balance"
          >
            GIOSEPH
            <span className="block text-cyan text-glow-cyan">THE GAMER</span>
          </motion.h1>

          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-text-dim max-w-xl mx-auto leading-relaxed text-balance"
          >
            Il brand digitale ufficiale. Gaming, Dragon Ball e community —
            <span className="text-text"> oltre YouTube.</span>
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" variant="primary" onClick={handleWatchLatest}>
              <Play className="w-4 h-4" fill="currentColor" />
              Watch Latest
            </Button>
            <Button size="lg" variant="secondary" onClick={handleJoinCommunity}>
              <Users className="w-4 h-4" />
              Join the Community
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={reduced ? undefined : { opacity: opacityMeta }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="meta-text">Scroll</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-cyan" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <EnergyLine animated accent="cyan" />
      </div>

      <div className="absolute top-20 right-6 hidden md:flex flex-col items-end gap-1 z-10">
        <span className="meta-text text-cyan">● LIVE</span>
        <a
          href={siteConfig.socials[0].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent({ type: 'youtube_click', location: 'hero_badge' })}
          className="flex items-center gap-1.5 meta-text hover:text-text transition-colors"
        >
          <Youtube className="w-3 h-3" />
          {siteConfig.socials[0].handle}
        </a>
      </div>
    </section>
  );
}
