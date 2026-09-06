import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Rocket, Cpu, Code, Calendar, BadgeCheck, Radio, Users,
  CheckCircle2, ArrowRight, Mail,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { EnergyLine } from '@/components/ui/EnergyLine';
import { cn } from '@/lib/utils';

const iconMap: Record<string, typeof Gamepad2> = {
  gamepad: Gamepad2,
  rocket: Rocket,
  cpu: Cpu,
  code: Code,
  calendar: Calendar,
  'badge-check': BadgeCheck,
  radio: Radio,
  users: Users,
};

const budgetRanges = [
  'Under €5,000',
  '€5,000 — €15,000',
  '€15,000 — €30,000',
  '€30,000+',
  'Non specificato',
];

const timelines = [
  'Entro 1 mese',
  '1 — 3 mesi',
  '3 — 6 mesi',
  'Piu di 6 mesi',
  'Da definire',
];

interface FormState {
  company: string;
  contactName: string;
  businessEmail: string;
  website: string;
  campaignType: string;
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  additionalInfo: string;
}

const initialForm: FormState = {
  company: '',
  contactName: '',
  businessEmail: '',
  website: '',
  campaignType: '',
  projectDescription: '',
  budgetRange: '',
  timeline: '',
  additionalInfo: '',
};

export function Collaborate() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const reduced = useReducedMotion();

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.company.trim()) e.company = 'Richiesto';
    if (!form.contactName.trim()) e.contactName = 'Richiesto';
    if (!form.businessEmail.trim()) e.businessEmail = 'Richiesto';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) e.businessEmail = 'Email non valida';
    if (!form.campaignType) e.campaignType = 'Seleziona una categoria';
    if (!form.projectDescription.trim()) e.projectDescription = 'Richiesto';
    if (!form.timeline) e.timeline = 'Seleziona una timeline';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    trackEvent({ type: 'contact_form_submit', campaignType: form.campaignType });
    setSubmitted(true);
  };

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (field: keyof FormState) =>
    cn(
      'w-full px-4 py-3 rounded-xl2 bg-graphite-850 border text-text text-sm transition-colors duration-200',
      'focus:outline-none focus:border-cyan/50 placeholder:text-text-dim/50',
      errors[field] ? 'border-ember/50' : 'border-graphite-700'
    );

  return (
    <section id="collaborate" className="relative py-24 md:py-32 section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(245,184,32,0.06), transparent 50%)',
          }}
        />
      </div>

      <div className="relative">
        <SectionHeader
          index="08"
          title="Let's Create Something."
          subtitle="Per brand, publisher e partner che vogliono collaborare con un creator gaming professionale."
          accent="gold"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-display font-bold mb-6">Tipologie di Collaborazione</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.collaborationTypes.map((type, i) => {
                const Icon = iconMap[type.icon] ?? Gamepad2;
                return (
                  <motion.div
                    key={type.id}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group flex items-center gap-3 p-4 rounded-xl2 surface hover:border-gold/30 transition-colors cursor-pointer"
                    onClick={() => update('campaignType', type.label)}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full border border-graphite-600 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                      <Icon className="w-4 h-4 text-text-dim group-hover:text-gold transition-colors" />
                    </div>
                    <span className="text-sm font-semibold">{type.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 p-6 rounded-xl2 surface-2">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-cyan" />
                <span className="meta-text text-cyan">Contatto Business</span>
              </div>
              <a
                href={`mailto:${siteConfig.creator.businessEmail}`}
                className="text-lg font-display font-bold hover:text-cyan transition-colors"
              >
                {siteConfig.creator.businessEmail}
              </a>
              <EnergyLine className="mt-4" accent="gold" />
              <p className="meta-text mt-4">
                Risposta garantita entro 48 ore lavorative.
              </p>
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-12 rounded-xl3 surface-2 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-6 glow-cyan">
                    <CheckCircle2 className="w-8 h-8 text-cyan" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">Richiesta Inviata</h3>
                  <p className="text-text-dim text-sm max-w-sm">
                    Grazie per il tuo interesse. Ti contatteremo entro 48 ore lavorative.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    className="mt-8"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                    }}
                  >
                    Nuova Richiesta
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="meta-text block mb-2">Azienda *</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => update('company', e.target.value)}
                        className={inputClass('company')}
                        placeholder="Nome azienda"
                      />
                      {errors.company && <p className="text-ember text-xs mt-1">{errors.company}</p>}
                    </div>
                    <div>
                      <label className="meta-text block mb-2">Referente *</label>
                      <input
                        type="text"
                        value={form.contactName}
                        onChange={(e) => update('contactName', e.target.value)}
                        className={inputClass('contactName')}
                        placeholder="Nome e cognome"
                      />
                      {errors.contactName && <p className="text-ember text-xs mt-1">{errors.contactName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="meta-text block mb-2">Email Business *</label>
                      <input
                        type="email"
                        value={form.businessEmail}
                        onChange={(e) => update('businessEmail', e.target.value)}
                        className={inputClass('businessEmail')}
                        placeholder="email@azienda.com"
                      />
                      {errors.businessEmail && <p className="text-ember text-xs mt-1">{errors.businessEmail}</p>}
                    </div>
                    <div>
                      <label className="meta-text block mb-2">Sito Web</label>
                      <input
                        type="url"
                        value={form.website}
                        onChange={(e) => update('website', e.target.value)}
                        className={inputClass('website')}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="meta-text block mb-2">Tipo di Campagna *</label>
                    <select
                      value={form.campaignType}
                      onChange={(e) => update('campaignType', e.target.value)}
                      className={inputClass('campaignType')}
                    >
                      <option value="">Seleziona...</option>
                      {siteConfig.collaborationTypes.map((t) => (
                        <option key={t.id} value={t.label}>{t.label}</option>
                      ))}
                    </select>
                    {errors.campaignType && <p className="text-ember text-xs mt-1">{errors.campaignType}</p>}
                  </div>

                  <div>
                    <label className="meta-text block mb-2">Descrizione Progetto *</label>
                    <textarea
                      value={form.projectDescription}
                      onChange={(e) => update('projectDescription', e.target.value)}
                      rows={4}
                      className={inputClass('projectDescription')}
                      placeholder="Descrivi il progetto e gli obiettivi..."
                    />
                    {errors.projectDescription && <p className="text-ember text-xs mt-1">{errors.projectDescription}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="meta-text block mb-2">Budget (opzionale)</label>
                      <select
                        value={form.budgetRange}
                        onChange={(e) => update('budgetRange', e.target.value)}
                        className={inputClass('budgetRange')}
                      >
                        <option value="">Seleziona...</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="meta-text block mb-2">Timeline *</label>
                      <select
                        value={form.timeline}
                        onChange={(e) => update('timeline', e.target.value)}
                        className={inputClass('timeline')}
                      >
                        <option value="">Seleziona...</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.timeline && <p className="text-ember text-xs mt-1">{errors.timeline}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="meta-text block mb-2">Informazioni Aggiuntive</label>
                    <textarea
                      value={form.additionalInfo}
                      onChange={(e) => update('additionalInfo', e.target.value)}
                      rows={2}
                      className={inputClass('additionalInfo')}
                      placeholder="Altro da comunicare..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    Invia Richiesta
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
