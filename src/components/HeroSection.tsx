import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-purple/70 to-deep-black" />

      {/* Orbs */}
      <div className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-light-purple/15 blur-3xl animate-gentle-pulse" />
      <div className="absolute -bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-warm-orange/10 blur-3xl animate-gentle-pulse-2" />

      {/* Light streams */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? 'light-stream' : 'light-stream-orange'}
            style={{
              left: `${25 + i * 12}%`,
              animationDelay: `${i * 0.6}s`,
              height: `${80 + i * 25}px`,
              opacity: 0.25 + i * 0.06,
            }}
          />
        ))}
      </div>

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-br from-light-purple/20 via-warm-orange/8 to-transparent blur-3xl animate-gentle-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 site-container text-center">
        <div className="text-column mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="heading-hero"
          >
            <span className="text-gradient-purple-orange">Ты не потерян.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="heading-section text-text-soft gap-heading"
          >
            Ты просто стоишь в точке, где старые ответы больше не работают.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 2.0 }}
            className="gap-block"
          >
            <button
              onClick={scrollToNext}
              className="group relative cursor-pointer overflow-hidden rounded-full font-sans tracking-wide text-white transition-all duration-500"
              style={{ padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 3vw, 52px)' }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-purple via-warm-orange to-light-purple p-[1px]">
                <div className="h-full w-full rounded-full bg-deep-black/90 transition-all duration-500 group-hover:bg-deep-black/70" />
              </div>
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-warm-orange transition-transform duration-400 group-hover:translate-x-1" style={{ fontSize: 'clamp(16px, 1.3vw, 22px)' }}>→</span>
                <span className="italic text-text-main" style={{ fontSize: 'clamp(15px, 1.1vw, 19px)' }}>Я готов увидеть</span>
              </span>
            </button>
          </motion.div>

          {/* Micro text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 3.0 }}
            className="text-small text-text-muted tracking-wide"
            style={{ marginTop: 'clamp(24px, 3vw, 48px)' }}
          >
            Если откликается — значит, ты уже готов.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border border-light-purple/25 flex items-start justify-center pt-2 animate-float">
          <div className="h-2.5 w-1 rounded-full bg-gradient-to-b from-light-purple/60 to-warm-orange/40" />
        </div>
      </motion.div>
    </section>
  );
}
