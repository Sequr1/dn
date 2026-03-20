import RevealText from './RevealText';

const packages = [
  {
    name: 'Начало',
    price: '500',
    tagline: 'Первый шаг к ясности',
    features: [
      'Разбор ситуации',
      'Видение текущего состояния',
      'Точка, с которой начинается движение',
    ],
    note: 'Подходит, если ты просто хочешь понять, что происходит',
    glassClass: 'glass-orange',
    accentGradient: 'text-gradient-orange-gold',
    dotColor: 'bg-warm-orange/40',
    priceColor: 'text-warm-orange',
    topBorder: 'from-warm-orange/30 via-soft-orange/20 to-warm-orange/8',
  },
  {
    name: 'Глубина',
    price: '3 000',
    tagline: 'Полный разбор твоей реальности',
    features: [
      'Чтение по руке',
      'Подключение чувствования',
      'Трансовая работа',
      'Выявление корня',
    ],
    note: 'Ты начинаешь видеть не только проблему, но и путь',
    glassClass: 'glass-purple',
    accentGradient: 'text-gradient-purple',
    dotColor: 'bg-light-purple/40',
    priceColor: 'text-light-purple',
    topBorder: 'from-light-purple/30 via-vivid-purple/20 to-light-purple/8',
  },
  {
    name: 'Сопровождение',
    price: 'индивидуально',
    tagline: 'До результата',
    features: [
      'Работа с психикой',
      'Поддержка в процессе',
      'Фиксация изменений',
    ],
    note: 'Не просто понять. Дойти.',
    glassClass: 'glass',
    accentGradient: 'text-gradient-purple-orange',
    dotColor: 'bg-gold/40',
    priceColor: 'text-gold',
    topBorder: 'from-warm-orange/20 via-light-purple/20 to-gold/20',
  },
];

export default function PackagesSection() {
  return (
    <section className="relative overflow-hidden section-space">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/10 to-transparent" />

      {/* Orbs */}
      <div className="absolute top-1/4 -left-40 w-[350px] h-[350px] rounded-full bg-light-purple/5 blur-3xl pointer-events-none animate-gentle-pulse" />
      <div className="absolute bottom-1/4 -right-40 w-[300px] h-[300px] rounded-full bg-warm-orange/5 blur-3xl pointer-events-none animate-gentle-pulse-2" />

      <div className="relative z-10 site-container--wide">
        <div className="text-column mx-auto text-center">
          <RevealText>
            <h2 className="heading-section">
              Выбери глубину погружения
            </h2>
          </RevealText>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(20px, 2.5vw, 36px)',
            marginTop: 'clamp(48px, 6vw, 96px)',
          }}
        >
          {packages.map((pkg, i) => (
            <RevealText key={i} delay={0.2 * (i + 1)}>
              <div
                className={`${pkg.glassClass} rounded-2xl transition-all duration-400 hover:border-white/10 flex flex-col h-full relative overflow-hidden`}
                style={{ padding: 'clamp(28px, 3vw, 48px) clamp(24px, 2.5vw, 40px)' }}
              >
                {/* Colored top accent */}
                <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${pkg.topBorder} rounded-full`} />

                {/* Name & tagline */}
                <div style={{ marginTop: 'clamp(8px, 1vw, 16px)', marginBottom: 'clamp(24px, 3vw, 40px)' }}>
                  <h3 className={`heading-card ${pkg.accentGradient}`}>
                    {pkg.name}
                  </h3>
                  <p className="text-small text-text-muted italic" style={{ marginTop: 'clamp(12px, 1.5vw, 20px)' }}>
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price */}
                <div style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>
                  <span className={`font-serif font-light ${pkg.priceColor}`} style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                    {pkg.price}
                  </span>
                  {pkg.price !== 'индивидуально' && (
                    <span className="ml-2 text-small text-text-muted">₽</span>
                  )}
                </div>

                {/* Features */}
                <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.5vw, 24px)', marginBottom: 'clamp(24px, 3vw, 40px)' }}>
                  {pkg.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-4">
                      <div className={`mt-2.5 h-2 w-2 rounded-full ${pkg.dotColor} flex-shrink-0`} />
                      <p className="text-body text-text-soft">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <div className="border-t border-white/[0.04]" style={{ paddingTop: 'clamp(16px, 2vw, 28px)' }}>
                  <p className="text-small text-text-muted italic">
                    👉 {pkg.note}
                  </p>
                </div>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
