import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMediaQuery';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => onComplete(), 300);
      return () => clearTimeout(t);
    }

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setStage(1), 200));
    timers.push(window.setTimeout(() => setStage(2), 600));
    timers.push(window.setTimeout(() => setStage(3), 1000));
    timers.push(
      window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(onComplete, 700);
      }, 1400)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete, reduced]);

  return (
    <AnimatePresence>
    {!exiting && (
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-graphite-950"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={stage >= 0 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="w-12 h-12 rounded-full border border-cyan/30 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan to-energy animate-energy-pulse" />
            </div>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={stage >= 1 ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-display font-bold tracking-[0.15em] text-text"
            >
              GIOSEPH
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={stage >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-32 bg-gradient-to-r from-transparent via-cyan to-transparent origin-center"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={stage >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="meta-text"
          >
            <span className="text-cyan">●</span> SYSTEM READY
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: 'linear' }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan via-energy to-ember origin-left"
        />
      </motion.div>
    )}
    </AnimatePresence>
  );
}
