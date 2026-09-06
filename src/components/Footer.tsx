import { Youtube, Instagram, Twitch, Zap, ArrowUp, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { EnergyLine } from '@/components/ui/EnergyLine';
import { cn } from '@/lib/utils';

const socialIcons: Record<string, typeof Youtube> = {
  youtube: Youtube,
  instagram: Instagram,
  twitch: Twitch,
};

export function Footer() {
  const handleSocialClick = (platform: string, url: string) => {
    trackEvent({ type: 'social_click', platform });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-graphite-950 border-t border-graphite-700/50 overflow-hidden">
      <EnergyLine accent="cyan" animated />

      <div className="section-pad py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-cyan/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan" fill="currentColor" />
              </div>
              <span className="text-sm font-display font-bold tracking-[0.1em]">
                GIOSEPH<span className="text-cyan">.</span>
              </span>
            </div>
            <p className="text-text-dim text-sm leading-relaxed max-w-xs">
              {siteConfig.creator.alias} — {siteConfig.creator.realName}.
              Il brand digitale ufficiale. Oltre YouTube.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.icon] ?? Youtube;
                return (
                  <button
                    key={social.platform}
                    onClick={() => handleSocialClick(social.platform, social.url)}
                    className="w-10 h-10 rounded-full border border-graphite-600 flex items-center justify-center text-text-dim hover:text-cyan hover:border-cyan/40 transition-colors"
                    aria-label={`Visita ${social.platform}`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="meta-text mb-4">Navigazione</h4>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="text-text-dim text-sm hover:text-text transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="meta-text mb-4">Piattaforme</h4>
            <ul className="space-y-2">
              {siteConfig.socials.map((social) => (
                <li key={social.platform}>
                  <button
                    onClick={() => handleSocialClick(social.platform, social.url)}
                    className="text-text-dim text-sm hover:text-text transition-colors text-left"
                  >
                    {social.platform}
                    <span className="meta-text ml-2">{social.handle}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="meta-text mb-4">Business</h4>
            <a
              href={`mailto:${siteConfig.creator.businessEmail}`}
              className="flex items-center gap-2 text-text-dim text-sm hover:text-cyan transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Contattaci
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-graphite-700/50">
          <p className="text-text-dim text-xs leading-relaxed max-w-2xl">
            {siteConfig.disclosure}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="meta-text">
            © {new Date().getFullYear()} {siteConfig.creator.alias} — {siteConfig.creator.realName}. Tutti i diritti riservati.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 meta-text hover:text-cyan transition-colors"
          >
            Torna su
            <span className="w-8 h-8 rounded-full border border-graphite-600 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
