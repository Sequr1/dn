import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from './RevealText';
import LightWaterAnimation from './LightWaterAnimation';

type Phase = 'input' | 'animating' | 'result';

export default function NumberSection() {
  const [inputValue, setInputValue] = useState('');
  const [phase, setPhase] = useState<Phase>('input');

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    setPhase('animating');
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleAnimationComplete = useCallback(() => {
    setPhase('result');
  }, []);

  const handleReset = useCallback(() => {
    setPhase('input');
    setInputValue('');
  }, []);

  return (
    <section className="relative overflow-hidden section-space">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mid-purple/8 to-transparent" />

      {/* Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-light-purple/5 blur-3xl pointer-events-none animate-gentle-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-warm-orange/4 blur-3xl pointer-events-none animate-gentle-pulse-2" />

      {/* Canvas animation — now fixed to viewport */}
      <LightWaterAnimation
        active={phase === 'animating'}
        onComplete={handleAnimationComplete}
      />

      {/* Content */}
      <div className="relative z-10 site-container">
        <div className="text-column mx-auto text-center">
          <RevealText>
            <h2 className="heading-section">
              <span className="text-gradient-purple-orange">Напиши любое число.</span>
            </h2>
          </RevealText>

          <AnimatePresence mode="wait">
            {/* INPUT */}
            {phase === 'input' && (
              <motion.div
                key="input-phase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
              >
                <div className="gap-block">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="..."
                    className="w-full block bg-transparent border-b-2 border-light-purple/20 pb-4 pt-3 text-center font-serif text-text-main placeholder:text-text-muted/20 focus:outline-none focus:border-warm-orange/40 transition-colors duration-400"
                    style={{ maxWidth: '280px', margin: '0 auto', fontSize: 'clamp(28px, 3vw, 44px)' }}
                  />
                </div>

                <p className="text-small text-text-muted tracking-wide" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
                  С этого начинается работа. Это ключ.
                </p>

                {inputValue.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 'clamp(32px, 4vw, 56px)' }}
                  >
                    <button
                      onClick={handleSubmit}
                      className="cursor-pointer relative overflow-hidden rounded-full font-sans tracking-wide text-text-soft transition-all duration-400 group"
                      style={{ padding: 'clamp(12px, 1.2vw, 18px) clamp(28px, 3vw, 44px)' }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-purple/35 to-warm-orange/35 p-[1px]">
                        <div className="h-full w-full rounded-full bg-deep-black/90 transition-all duration-400 group-hover:bg-deep-black/70" />
                      </div>
                      <span className="relative z-10 text-text-main text-body">Открыть</span>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ANIMATING — text over the fullscreen canvas */}
            {phase === 'animating' && (
              <motion.div
                key="animating-phase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                className="gap-block"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 51, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 1.5, delay: 2 }}
                  className="text-quote text-text-muted"
                >
                  Свет находит путь...
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 1.5, delay: 4 }}
                  className="text-small text-text-muted/50"
                  style={{ marginTop: 'clamp(16px, 2vw, 28px)' }}
                >
                  Мы откроем сейф твоих возможностей<br />через числовой код.
                </motion.p>
              </motion.div>
            )}

            {/* RESULT — запомни число */}
            {phase === 'result' && (
              <motion.div
                key="result-phase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="gap-block"
              >
                <div className="glass-purple rounded-2xl text-center" style={{ padding: 'clamp(32px, 5vw, 64px)' }}>
                  <p className="heading-card text-gradient-purple-orange" style={{ marginBottom: 'clamp(12px, 2vw, 24px)' }}>
                    Твоё число: {inputValue}
                  </p>
                  <p className="text-body-lg text-text-soft" style={{ lineHeight: 1.8 }}>
                    Запомни его.
                  </p>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-body-lg text-text-soft"
                  style={{ marginTop: 'clamp(28px, 4vw, 56px)' }}
                >
                  Листай ниже ↓
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  onClick={handleReset}
                  className="cursor-pointer text-small text-text-muted hover:text-text-soft transition-colors duration-300"
                  style={{ marginTop: 'clamp(20px, 2vw, 32px)' }}
                >
                  ← ввести другое число
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
