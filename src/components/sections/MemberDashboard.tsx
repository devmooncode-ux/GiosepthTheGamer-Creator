import { motion } from 'framer-motion';
import {
  Crown, Calendar, Play, Bookmark, Settings, LogOut, Sparkles, Clock, Eye,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { EnergyLine } from '@/components/ui/EnergyLine';
import { cn } from '@/lib/utils';

const memberExclusiveContent = [
  { title: 'Dietro le quinte — Registrazione Ep. Speciale', type: 'BTS', duration: '12:30', date: '2 giorni fa' },
  { title: 'Q&A Mensile — Ottobre 2024', type: 'Live', duration: '45:00', date: '1 settimana fa' },
  { title: 'Wallpaper Collection — Dragon Ball Set', type: 'Download', duration: '8 files', date: '2 settimane fa' },
];

const upcomingEvents = [
  { title: 'Live Q&A Novembre', date: '15 Nov 2024', type: 'Members Only' },
  { title: 'Watch Party — Sparking! ZERO', date: '22 Nov 2024', type: 'Community' },
];

export function MemberDashboard() {
  const reduced = useReducedMotion();

  return (
    <section id="dashboard" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-graphite-950" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(45,126,255,0.08), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,229,255,0.06), transparent 50%)',
        }}
      />

      <div className="relative section-pad">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan animate-energy-pulse" />
          <span className="meta-text text-cyan">Member Area</span>
          <EnergyLine className="flex-1 max-w-[200px]" accent="cyan" />
        </div>

        <SectionHeader
          index="05"
          title="Dashboard Membro"
          subtitle="Il tuo spazio esclusivo. Contenuti premium, eventi privati e accesso anticipato."
          accent="energy"
        />

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-6 rounded-xl2 surface-2">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-4 h-4 text-gold" />
              <span className="meta-text text-gold">Tier Attiva</span>
            </div>
            <p className="text-xl font-display font-bold">Super Saiyan</p>
            <p className="text-text-dim text-sm mt-1">Tier 02</p>
          </div>

          <div className="p-6 rounded-xl2 surface-2">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-cyan" />
              <span className="meta-text text-cyan">Membro dal</span>
            </div>
            <p className="text-xl font-display font-bold">15 Ott 2024</p>
            <p className="text-text-dim text-sm mt-1">Abbonamento attivo</p>
          </div>

          <div className="p-6 rounded-xl2 surface-2">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-energy" />
              <span className="meta-text text-energy">Stato</span>
            </div>
            <p className="text-xl font-display font-bold">Premium</p>
            <p className="text-text-dim text-sm mt-1">Tutti i vantaggi attivi</p>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 md:p-8 rounded-xl3 surface-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold">Contenuti Esclusivi</h3>
              <MetadataTag accent="cyan">Members Only</MetadataTag>
            </div>

            <div className="space-y-3">
              {memberExclusiveContent.map((content) => (
                <div
                  key={content.title}
                  className="group flex items-center gap-4 p-4 rounded-xl2 bg-graphite-850 hover:bg-graphite-800 transition-colors cursor-pointer"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl2 bg-graphite-700 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                    <Play className="w-5 h-5 text-text-dim group-hover:text-cyan transition-colors" fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{content.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <MetadataTag accent="ember">{content.type}</MetadataTag>
                      <span className="meta-text flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {content.duration}
                      </span>
                    </div>
                  </div>
                  <span className="meta-text hidden sm:block">{content.date}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 md:p-8 rounded-xl3 surface-2"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold">Prossimi Eventi</h3>
                <MetadataTag accent="gold">Members</MetadataTag>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.title} className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl2 border border-graphite-600 flex flex-col items-center justify-center">
                      <span className="text-[0.625rem] font-mono text-cyan leading-none">{event.date.split(' ')[0]}</span>
                      <span className="text-[0.5rem] font-mono text-text-dim leading-none mt-0.5">
                        {event.date.split(' ')[1]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{event.title}</p>
                      <p className="meta-text mt-1">{event.date} · {event.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 md:p-8 rounded-xl3 surface-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <Bookmark className="w-4 h-4 text-cyan" />
                <h3 className="text-lg font-display font-bold">Video Salvati</h3>
              </div>
              <div className="space-y-2">
                {['Dragon Ball Xenoverse 2 — Walkthrough', 'Sparking! ZERO — Recensione'].map((title) => (
                  <div key={title} className="flex items-center gap-3 p-3 rounded-xl2 bg-graphite-850">
                    <Eye className="w-4 h-4 text-text-dim shrink-0" />
                    <span className="text-sm text-text-dim truncate">{title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl2 surface-2"
        >
          <div className="flex items-center gap-3 flex-1">
            <Settings className="w-5 h-5 text-text-dim" />
            <div>
              <p className="text-sm font-semibold">Gestione Account</p>
              <p className="meta-text">Impostazioni, cambio tier, cancellazione</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
              Impostazioni
            </Button>
            <Button variant="secondary" size="sm">
              <LogOut className="w-4 h-4" />
              Gestisci Abbonamento
            </Button>
          </div>
        </motion.div>

        <div className={cn('mt-6 text-center')}>
          <p className="meta-text">
            Il dashboard membro è un'anteprima concettuale. L'autenticazione e i pagamenti sono integration-ready.
          </p>
        </div>
      </div>
    </section>
  );
}
