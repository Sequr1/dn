import RevealText from './RevealText';

const points = [
  { text: 'Тет-а-тет диалог', color: 'from-light-purple/50 to-vivid-purple/30' },
  { text: '1 час, в котором исчезает лишнее', color: 'from-warm-orange/40 to-soft-orange/30' },
  { text: 'Погружение внутрь себя', color: 'from-light-purple/40 to-warm-orange/20' },
  { text: 'Без давления. Без навязывания.', color: 'from-soft-orange/40 to-gold/30' },
];

export default function WhatHappensSection() {
  return (
    <section className="relative overflow-hidden section-space">
      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/20 to-transparent" />

      {/* Decorative orb */}
      <div className="absolute top-20 -right-40 w-[350px] h-[350px] rounded-full bg-light-purple/6 blur-3xl pointer-events-none animate-gentle-pulse" />

      <div className="relative z-10 site-container">
        <div className="text-column mx-auto text-center">
          <RevealText>
            <h2 className="heading-section">
              Здесь тебе не скажут, как жить.
            </h2>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="heading-section text-gradient-purple-orange gap-heading">
              Здесь ты сам услышишь ответ.
            </p>
          </RevealText>
        </div>

        {/* Points */}
        <div className="text-column mx-auto gap-block">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2vw, 32px)' }}>
            {points.map((point, i) => (
              <RevealText key={i} delay={0.12 * (i + 2)}>
                <div className="flex items-center gap-6 group" style={{ padding: 'clamp(8px, 1vw, 16px) 0' }}>
                  <div className={`h-px flex-shrink-0 bg-gradient-to-r ${point.color} transition-all duration-500 group-hover:w-20`} style={{ width: 'clamp(32px, 3vw, 64px)' }} />
                  <p className="text-body-lg text-text-soft transition-colors duration-400 group-hover:text-text-main">
                    {point.text}
                  </p>
                </div>
              </RevealText>
            ))}
          </div>
        </div>

        {/* Quote */}
        <RevealText delay={0.8}>
          <div className="text-column mx-auto gap-section relative">
            <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-warm-orange/40 via-light-purple/20 to-transparent rounded-full" />
            <blockquote className="text-quote text-text-soft" style={{ paddingLeft: 'clamp(32px, 3vw, 52px)' }}>
              Я не веду тебя.
              <br />
              <span className="block text-soft-orange/70" style={{ marginTop: 'clamp(12px, 1.5vw, 24px)' }}>
                Я убираю шум, чтобы ты услышал себя.
              </span>
            </blockquote>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
