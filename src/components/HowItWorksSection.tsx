import RevealText from './RevealText';

const methods = [
  { text: 'Трансовое погружение через диалог', icon: '◎', glassClass: 'glass-purple', accentColor: 'text-light-purple/60' },
  { text: 'Считывание состояния', icon: '◈', glassClass: 'glass-orange', accentColor: 'text-warm-orange/60' },
  { text: 'Видение ситуации со стороны', icon: '◇', glassClass: 'glass-orange', accentColor: 'text-soft-orange/60' },
  { text: 'Работа со страхами', icon: '△', glassClass: 'glass-purple', accentColor: 'text-vivid-purple/60' },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden section-space">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/15 to-transparent" />

      {/* Orbs */}
      <div className="absolute bottom-20 -right-32 w-[300px] h-[300px] rounded-full bg-light-purple/6 blur-3xl pointer-events-none animate-gentle-pulse" />
      <div className="absolute top-32 -left-20 w-[250px] h-[250px] rounded-full bg-warm-orange/5 blur-3xl pointer-events-none animate-gentle-pulse-2" />

      <div className="relative z-10 site-container">
        <div className="text-column mx-auto text-center">
          <RevealText>
            <h2 className="heading-section">
              <span className="text-gradient-purple">Мы идём глубже, чем слова.</span>
            </h2>
          </RevealText>
        </div>

        {/* Cards — 2 columns on desktop */}
        <div
          className="gap-block"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(16px, 2vw, 32px)',
            maxWidth: '960px',
            margin: '0 auto',
            marginTop: 'clamp(48px, 6vw, 96px)',
          }}
        >
          {methods.map((method, i) => (
            <RevealText key={i} delay={0.15 * (i + 1)}>
              <div
                className={`${method.glassClass} rounded-2xl text-center transition-all duration-400 hover:border-white/10`}
                style={{ padding: 'clamp(32px, 4vw, 56px) clamp(24px, 3vw, 40px)' }}
              >
                <span className={`${method.accentColor}`} style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                  {method.icon}
                </span>
                <p className="text-body text-text-soft" style={{ marginTop: 'clamp(16px, 2vw, 28px)' }}>
                  {method.text}
                </p>
              </div>
            </RevealText>
          ))}
        </div>

        {/* Quote */}
        <RevealText delay={0.8}>
          <div className="text-column mx-auto text-center gap-section">
            <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-light-purple/25 to-transparent" style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }} />
            <blockquote className="text-quote">
              Страх нельзя убрать полностью.
              <br />
              <span className="block text-text-main italic" style={{ marginTop: 'clamp(12px, 1.5vw, 24px)' }}>
                Но можно перестать быть его заложником.
              </span>
            </blockquote>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
