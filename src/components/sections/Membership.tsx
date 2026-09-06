import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Crown, Zap, Star, ChevronDown, Lock, Sparkles } from 'lucide-react';
import { siteConfig, type MembershipTier } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { EnergyLine } from '@/components/ui/EnergyLine';
import { cn } from '@/lib/utils';

const accentStyles = {
  cyan: { text: 'text-cyan', border: 'border-cyan/40', bg: 'bg-cyan/5', glow: 'glow-cyan', icon: Zap },
  gold: { text: 'text-gold', border: 'border-gold/40', bg: 'bg-gold/5', glow: 'glow-gold', icon: Star },
  ember: { text: 'text-ember', border: 'border-ember/40', bg: 'bg-ember/5', glow: 'glow-ember', icon: Crown },
  energy: { text: 'text-energy', border: 'border-energy/40', bg: 'bg-energy/5', glow: '', icon: Sparkles },
} as const;

type AccentKey = keyof typeof accentStyles;

export function Membership() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduced = useReducedMotion();

  const handleSelectTier = (tier: MembershipTier) => {
    trackEvent({ type: 'subscription_attempt', tierId: tier.id });
    setSelectedTier(tier.id);
    setShowCheckout(true);
  };

  return (
    <section id="members" className="relative py-24 md:py-32 section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.06), transparent 50%)',
          }}
        />
      </div>

      <div className="relative">
        <SectionHeader
          index="04"
          title="Membership"
          subtitle="Un'esperienza premium per veri fan. Più dei video — un accesso esclusivo al mondo del creator."
          accent="gold"
        />

        <div className="mt-6 flex items-center gap-3">
          <MetadataTag accent="neutral">{siteConfig.membership.disclaimer}</MetadataTag>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {siteConfig.membership.tiers.map((tier, i) => {
            const accent = accentStyles[tier.accent as AccentKey];
            const Icon = accent.icon;
            return (
              <motion.div
                key={tier.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'relative p-6 md:p-8 rounded-xl3 surface flex flex-col',
                  tier.popular && cn(accent.border, accent.glow)
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <MetadataTag accent={tier.accent as AccentKey}>Più scelto</MetadataTag>
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <span className="meta-text">Tier {tier.tierNumber}</span>
                  <div className={cn('w-10 h-10 rounded-full border flex items-center justify-center', accent.border)}>
                    <Icon className={cn('w-5 h-5', accent.text)} />
                  </div>
                </div>

                <h3 className={cn('text-2xl font-display font-bold mb-1', accent.text)}>
                  {tier.name}
                </h3>
                <p className="text-text-dim text-sm mb-6">{tier.tagline}</p>

                <div className="mb-6">
                  <span className="text-4xl font-display font-extrabold">€{tier.priceMonthly}</span>
                  <span className="meta-text ml-2">/ mese</span>
                </div>

                <EnergyLine accent={tier.accent as AccentKey} className="mb-6" />

                <ul className="space-y-3 flex-1">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-text-dim">
                      <Check className={cn('w-4 h-4 mt-0.5 shrink-0', accent.text)} />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? 'primary' : 'secondary'}
                  size="md"
                  className="mt-8 w-full"
                  onClick={() => handleSelectTier(tier)}
                >
                  Diventa {tier.name}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20">
          <SectionHeader
            index="04.1"
            title="FAQ"
            accent="cyan"
            className="mb-8"
          />
          <div className="space-y-3 max-w-3xl">
            {siteConfig.membership.faq.map((item, i) => (
              <div key={i} className="surface rounded-xl2 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-base font-semibold">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-text-dim shrink-0 transition-transform duration-300',
                      openFaq === i && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-text-dim text-sm leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCheckout && selectedTier && (
          <CheckoutModal
            tier={siteConfig.membership.tiers.find((t) => t.id === selectedTier)!}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function CheckoutModal({ tier, onClose }: { tier: MembershipTier; onClose: () => void }) {
  const accent = accentStyles[tier.accent as AccentKey];
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md p-8 rounded-xl3 surface-2"
        role="dialog"
        aria-modal="true"
        aria-label={`Checkout membership ${tier.name}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={cn('w-12 h-12 rounded-full border flex items-center justify-center', accent.border)}>
            <Lock className={cn('w-5 h-5', accent.text)} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Checkout — {tier.name}</h3>
            <p className="meta-text">Tier {tier.tierNumber}</p>
          </div>
        </div>

        <div className="flex items-baseline justify-between py-4 border-y border-graphite-700">
          <span className="text-text-dim text-sm">Abbonamento mensile</span>
          <span className="text-2xl font-display font-bold">€{tier.priceMonthly}</span>
        </div>

        <div className="mt-6 p-4 rounded-xl2 bg-graphite-850 border border-graphite-700">
          <p className="text-xs text-text-dim leading-relaxed">
            <Lock className="w-3 h-3 inline mr-1.5 text-cyan" />
            Il pagamento sicuro è gestito tramite Stripe. I dati non vengono mai salvati sul sito.
            Il sistema è integration-ready — collega Stripe per abilitare i pagamenti reali.
          </p>
        </div>

        <Button variant="secondary" size="md" className="mt-6 w-full" onClick={onClose}>
          Annulla
        </Button>
      </motion.div>
    </motion.div>
  );
}
