import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, Zap } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { RevealText } from '@/components/ui/RevealText';
import { EnergyLine } from '@/components/ui/EnergyLine';
import { MetadataTag } from '@/components/ui/MetadataTag';

const dragonBallGames = [
  { name: 'Dragon Ball Xenoverse 2', desc: 'Walkthrough, DLC e sfide estreme', tag: 'Series' },
  { name: 'Dragon Ball Z: Kakarot', desc: '100% completion run e guide', tag: 'RPG' },
  { name: 'Dragon Ball: Sparking! ZERO', desc: 'Recensione e copertura completa', tag: 'Fighting' },
  { name: 'Dragon Ball Xenoverse', desc: 'Contenuti classici dal canale', tag: 'Classic' },
];

export function DragonBallArea() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yGlow = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const opacityGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0.3]);

  return (
    <section
      ref={ref}
      id="dragonball"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        style={reduced ? undefined : { y: yGlow, opacity: opacityGlow }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(255,106,26,0.12), transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(0,229,255,0.06), transparent 50%)',
          }}
        />
      </motion.div>

      <div className="relative section-pad">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="w-5 h-5 text-ember" />
          <span className="meta-text text-ember">Content Pillar</span>
          <EnergyLine className="flex-1 max-w-[200px]" accent="ember" />
        </div>

        <RevealText as="h2" className="text-display-lg font-display font-extrabold text-balance max-w-3xl">
          Dragon Ball è nel
          <span className="text-ember"> DNA</span> del canale.
        </RevealText>

        <RevealText as="p" delay={0.1} className="mt-6 text-text-dim text-base md:text-lg max-w-xl leading-relaxed">
          Dal primo Xenoverse a Sparking! ZERO, la passione per Dragon Ball attraversa
          oltre un decennio di contenuti. Ma il brand resta il creator.
        </RevealText>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {dragonBallGames.map((game, i) => (
            <motion.div
              key={game.name}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-8 rounded-xl2 surface hover:border-ember/30 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full border border-ember/30 flex items-center justify-center group-hover:border-ember transition-colors">
                  <Zap className="w-5 h-5 text-ember" fill="currentColor" />
                </div>
                <MetadataTag accent="ember">{game.tag}</MetadataTag>
              </div>
              <h3 className="text-lg font-display font-bold mb-2">{game.name}</h3>
              <p className="text-text-dim text-sm leading-relaxed">{game.desc}</p>

              <div className="absolute bottom-0 left-6 right-6">
                <EnergyLine accent="ember" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3">
          <span className="meta-text text-text-dim">
            Il creator rimane il brand. Dragon Ball è un pilastro, non il protagonista.
          </span>
        </div>
      </div>
    </section>
  );
}
