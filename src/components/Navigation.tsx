import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = siteConfig.nav.map((n) => document.getElementById(n.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const handleMembersClick = () => {
    trackEvent({ type: 'membership_cta', location: 'nav' });
    handleNavClick('members');
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out-expo',
          scrolled
            ? 'bg-graphite-950/85 backdrop-blur-xl border-b border-graphite-700/50'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <nav className="section-pad flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group"
            aria-label="Vai alla home"
          >
            <div className="w-8 h-8 rounded-full border border-cyan/40 flex items-center justify-center group-hover:border-cyan transition-colors">
              <Zap className="w-4 h-4 text-cyan" fill="currentColor" />
            </div>
            <span className="text-sm font-display font-bold tracking-[0.1em] text-text">
              GIOSEPH<span className="text-cyan">.</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'relative px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300',
                  activeSection === item.id
                    ? 'text-text'
                    : 'text-text-dim hover:text-text'
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan"
                    transition={reduced ? { duration: 0 } : { duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="primary"
              onClick={handleMembersClick}
              className="hidden md:inline-flex"
            >
              Join Members
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-graphite-600 text-text hover:border-cyan/50 transition-colors"
              aria-label="Apri menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] bg-graphite-950 lg:hidden"
          >
            <div className="section-pad flex items-center justify-between h-16">
              <span className="text-sm font-display font-bold tracking-[0.1em]">
                GIOSEPH<span className="text-cyan">.</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-graphite-600"
                aria-label="Chiudi menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="section-pad flex flex-col gap-2 mt-8">
              {siteConfig.nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'flex items-center justify-between py-4 border-b border-graphite-700 text-left',
                    activeSection === item.id ? 'text-cyan' : 'text-text'
                  )}
                >
                  <span className="text-2xl font-display font-bold">{item.label}</span>
                  <span className="meta-text">{String(i + 1).padStart(2, '0')}</span>
                </motion.button>
              ))}

              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6"
              >
                <Button size="lg" variant="primary" onClick={handleMembersClick} className="w-full">
                  Join Members
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
