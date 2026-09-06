import { motion } from 'framer-motion';
import { Youtube, Gamepad2, Flame, Users, Handshake } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { EnergyLine } from '@/components/ui/EnergyLine';

const timeline = [
  {
    year: '2012',
    title: 'Inizio del percorso YouTube',
    desc: 'Il canale nasce e inizia a pubblicare contenuti gaming.',
    icon: Youtube,
    accent: 'cyan' as const,
  },
  {
    year: '2012 — oggi',
    title: 'Migliaia di video',
    desc: 'Gameplay, walkthrough, unboxing, recensioni e vlog pubblicati costantemente.',
    icon: Gamepad2,
    accent: 'gold' as const,
  },
  {
    year: 'Tema ricorrente',
    title: 'Dragon Ball come pilastro',
    desc: 'Xenoverse, Kakarot, Sparking! ZERO — Dragon Ball diventa un filo conduttore.',
    icon: Flame,
    accent: 'ember' as const,
  },
  {
    year: 'Community',
    title: 'Una community che cresce',
    desc: 'La community diventa parte attiva del percorso del creator.',
    icon: Users,
    accent: 'energy' as const,
  },
  {
    year: 'Oggi',
    title: 'Collaborazioni & eventi',
    desc: 'Collaborazioni commerciali, eventi dal vivo e partnership con brand.',
    icon: Handshake,
    accent: 'cyan' as const,
  },
];

export function About() {
  const reduced = useReducedMotion();
  const yearsActive = new Date().getFullYear() - siteConfig.creator.channelStartYear;

  return (
    <section id="about" className="relative py-24 md:py-32 section-pad">
      <SectionHeader
        index="06"
        title="About Gioseph"
        subtitle="La storia di un creator che ha costruito un percorso decennale su YouTube."
        accent="cyan"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-xl2 surface">
            <p className="text-5xl font-display font-extrabold text-cyan">{yearsActive}+</p>
            <p className="meta-text mt-2">Anni su YouTube</p>
          </div>
          <div className="p-6 rounded-xl2 surface">
            <p className="text-5xl font-display font-extrabold text-gold">Migliaia</p>
            <p className="meta-text mt-2">Video pubblicati</p>
          </div>
          <div className="p-6 rounded-xl2 surface">
            <p className="text-5xl font-display font-extrabold text-ember">3</p>
            <p className="meta-text mt-2">Piattaforme attive</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-graphite-700" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-start gap-5"
                >
                  <div className="relative z-10 shrink-0 w-10 h-10 rounded-full border border-graphite-600 bg-graphite-900 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-text-dim" />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="meta-text text-text-dim">{item.year}</span>
                      <MetadataTag accent={item.accent}>{`0${i + 1}`}</MetadataTag>
                    </div>
                    <h3 className="text-lg font-display font-bold mb-1">{item.title}</h3>
                    <p className="text-text-dim text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl2 surface">
            <p className="text-text-dim text-sm leading-relaxed">
              {siteConfig.creator.description}
            </p>
            <EnergyLine className="mt-4" accent="cyan" />
            <p className="meta-text mt-4">
              Basato su informazioni pubbliche. Nessuna biografia è stata fabbricata.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
