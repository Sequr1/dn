import RevealText from './RevealText';

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden section-space">
      {/* Warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[350px] h-[350px] rounded-full bg-warm-orange/8 blur-3xl animate-gentle-pulse" />
      </div>
      <div className="absolute top-1/3 left-1/3 pointer-events-none">
        <div className="w-[250px] h-[250px] rounded-full bg-light-purple/6 blur-3xl animate-gentle-pulse-2" />
      </div>

      <div className="relative z-10 site-container">
        <div className="text-column mx-auto text-center">
          <RevealText>
            <h2 className="heading-section">
              Ты не обязан верить.
            </h2>
          </RevealText>

          <RevealText delay={0.3}>
            <p className="heading-section text-gradient-orange-gold gap-heading">
              Тебе достаточно почувствовать.
            </p>
          </RevealText>

          <RevealText delay={0.6}>
            <div className="gap-section">
              <div className="mx-auto h-px bg-gradient-to-r from-transparent via-warm-orange/30 to-transparent" style={{ width: 'clamp(48px, 5vw, 80px)', marginBottom: 'clamp(32px, 4vw, 64px)' }} />

              <p className="text-body-lg text-text-soft">
                Если внутри есть отклик —
              </p>
              <p className="text-body-lg" style={{ marginTop: 'clamp(12px, 1.5vw, 24px)' }}>
                <span className="text-gradient-purple-orange font-medium">
                  этого достаточно, чтобы начать.
                </span>
              </p>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
