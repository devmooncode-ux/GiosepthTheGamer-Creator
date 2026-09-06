import { motion } from 'framer-motion';
import { Users, MessageSquare, Radio, Calendar, Heart } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { EnergyLine } from '@/components/ui/EnergyLine';

const communityFeatures = [
  {
    icon: Radio,
    title: 'Stream dal vivo',
    desc: 'Upcoming streams e interazione diretta con la community.',
    accent: 'cyan' as const,
  },
  {
    icon: MessageSquare,
    title: 'Sondaggi & Domande',
    desc: 'La community partecipa attivamente alle decisioni del canale.',
    accent: 'gold' as const,
  },
  {
    icon: Heart,
    title: 'Momenti Community',
    desc: 'I migliori momenti e interazioni con i fan, raccontati dal creator.',
    accent: 'ember' as const,
  },
  {
    icon: Calendar,
    title: 'Annunci & Eventi',
    desc: 'Appuntamenti, eventi e iniziative dedicate alla community.',
    accent: 'energy' as const,
  },
];

export function Community() {
  const reduced = useReducedMotion();

  return (
    <section id="community" className="relative py-24 md:py-32 section-pad">
      <SectionHeader
        index="03"
        title="Non stai solo guardando."
        subtitle="Sei parte della community. Il brand vive attraverso le persone che lo seguono."
        accent="energy"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {communityFeatures.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-6 md:p-8 rounded-xl2 surface hover:border-cyan/20 transition-colors duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full border border-graphite-600 flex items-center justify-center group-hover:border-cyan/40 transition-colors">
                <feature.icon className="w-5 h-5 text-text-dim group-hover:text-cyan transition-colors" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-display font-bold">{feature.title}</h3>
                  <MetadataTag accent={feature.accent}>{`0${i + 1}`}</MetadataTag>
                </div>
                <p className="text-text-dim text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-12 relative p-8 md:p-12 rounded-xl3 surface-2 text-center overflow-hidden"
      >
        <div className="absolute inset-0 energy-gradient opacity-50" />
        <div className="relative">
          <Users className="w-10 h-10 text-cyan mx-auto mb-4" />
          <p className="text-display-md font-display font-bold text-balance max-w-2xl mx-auto">
            "La community non è un numero. È il motivo per cui continuo a creare."
          </p>
          <p className="meta-text mt-4 text-cyan">— GiosephTheGamer</p>
          <EnergyLine className="mt-6 max-w-xs mx-auto" accent="cyan" animated />
        </div>
      </motion.div>
    </section>
  );
}
