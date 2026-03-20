import RevealText from './RevealText';

const steps = [
  { text: 'ты находишь, что выбивает почву из-под ног', accent: 'text-light-purple/60' },
  { text: 'понимаешь, откуда это началось', accent: 'text-vivid-purple/50' },
  { text: 'видишь, что это тебе даёт', accent: 'text-warm-orange/50' },
  { text: 'и решаешь — оставлять это или нет', accent: 'text-soft-orange/60' },
];

export default function ExperienceSection() {
  return (
    <section className="relative overflow-hidden section-space">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mid-purple/10 to-transparent" />

      {/* Light through water visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[600px] rounded-full bg-gradient-to-t from-warm-orange/10 via-light-purple/12 to-transparent blur-3xl animate-gentle-pulse" />
      </div>

      {/* Secondary orb */}
      <div className="absolute top-1/4 -left-40 w-[300px] h-[300px] rounded-full bg-warm-orange/6 blur-3xl pointer-events-none animate-gentle-pulse-2" />

      <div className="relative z-10 site-container">
        <div className="text-column mx-auto text-center">
          <RevealText>
            <h2 className="heading-section">
              Это не консультация.
            </h2>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="heading-section text-gradient-orange-gold gap-heading">
              Это момент, когда ты начинаешь видеть.
            </p>
          </RevealText>

          <RevealText delay={0.35}>
            <p className="text-label text-text-muted gap-block">
              В течение часа
            </p>
          </RevealText>
        </div>

        {/* Steps */}
        <div className="text-column mx-auto" style={{ marginTop: 'clamp(32px, 4vw, 56px)' }}>
          {steps.map((step, i) => (
            <RevealText key={i} delay={0.12 * (i + 3)}>
              <div
                className="flex items-start gap-6 border-b border-white/[0.04] group"
                style={{ padding: 'clamp(20px, 2.5vw, 36px) 0' }}
              >
                <span
                  className={`flex-shrink-0 flex items-center justify-center rounded-full border border-light-purple/12 font-sans ${step.accent} transition-colors duration-400 group-hover:border-warm-orange/25 group-hover:text-warm-orange/80`}
                  style={{ width: 'clamp(36px, 3vw, 48px)', height: 'clamp(36px, 3vw, 48px)', fontSize: 'clamp(13px, 1vw, 16px)', marginTop: '2px' }}
                >
                  {i + 1}
                </span>
                <p className="text-body-lg text-text-soft transition-colors duration-400 group-hover:text-text-main">
                  {step.text}
                </p>
              </div>
            </RevealText>
          ))}
        </div>

        {/* Quote */}
        <RevealText delay={0.8}>
          <div className="text-column mx-auto text-center gap-section">
            <blockquote className="text-quote text-text-soft">
              Ответ не приходит извне.
              <br />
              <span className="block" style={{ marginTop: 'clamp(12px, 1.5vw, 24px)' }}>Он поднимается изнутри —</span>
              <span className="block text-gradient-orange-gold not-italic font-normal" style={{ marginTop: 'clamp(12px, 1.5vw, 24px)' }}>
                как поток, который всегда был там.
              </span>
            </blockquote>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
