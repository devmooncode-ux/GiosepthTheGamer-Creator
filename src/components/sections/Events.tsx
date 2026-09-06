import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, CircleDashed } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { cn } from '@/lib/utils';

export function Events() {
  const reduced = useReducedMotion();
  const events = siteConfig.events;

  return (
    <section className="relative py-24 md:py-32 section-pad">
      <SectionHeader
        index="07"
        title="Eventi & Collaborazioni"
        subtitle="Apparizioni reali e collaborazioni dal mondo gaming."
        accent="ember"
      />

      <div className="mt-12 space-y-4">
        {events.map((event, i) => (
          <motion.div
            key={event.title}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center p-6 rounded-xl2 surface hover:border-cyan/20 transition-colors duration-300"
          >
            <div className="md:col-span-2 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl2 border border-graphite-600 flex flex-col items-center justify-center">
                <span className="text-xs font-mono text-cyan leading-none">{event.year}</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <h3 className="text-lg font-display font-bold">{event.title}</h3>
              <p className="text-text-dim text-sm mt-1">{event.description}</p>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <MetadataTag accent="neutral">{event.type}</MetadataTag>
            </div>

            <div className="md:col-span-3 flex items-center gap-2 md:justify-end">
              {event.status === 'confirmed' ? (
                <span className="flex items-center gap-1.5 meta-text text-cyan">
                  <CheckCircle2 className="w-4 h-4" />
                  Confermato
                </span>
              ) : (
                <span className="flex items-center gap-1.5 meta-text text-gold">
                  <CircleDashed className="w-4 h-4" />
                  In corso
                </span>
              )}
            </div>
          </motion.div>
        ))}

        <div className="mt-6 p-6 rounded-xl2 surface-2 text-center">
          <p className="meta-text">
            <MapPin className="w-3 h-3 inline mr-1.5 text-cyan" />
            Mostra solo eventi confermati o configurati dal proprietario del sito.
          </p>
        </div>
      </div>
    </section>
  );
}
