import RevealText from './RevealText';

export default function ClosingSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/10 to-deep-black" />

      {/* Warm glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-gradient-to-t from-warm-orange/12 via-light-purple/8 to-transparent blur-3xl animate-gentle-pulse" />
      </div>

      {/* Purple orb */}
      <div className="absolute top-20 right-1/4 w-[250px] h-[250px] rounded-full bg-light-purple/5 blur-3xl pointer-events-none animate-gentle-pulse-2" />

      <div className="relative z-10 site-container section-space w-full">
        <div className="text-column mx-auto text-center">

          <RevealText>
            <h2 className="heading-hero">
              Ты уже знаешь,
            </h2>
          </RevealText>

          <RevealText delay={0.25}>
            <p
              className="heading-hero text-gradient-orange-gold"
              style={{ marginTop: 'clamp(8px, 1vw, 16px)' }}
            >
              что тебе нужно.
            </p>
          </RevealText>

          <RevealText delay={0.45}>
            <div
              className="glass-purple rounded-2xl mx-auto"
              style={{
                marginTop: 'clamp(40px, 5vw, 72px)',
                padding: 'clamp(28px, 4vw, 52px)',
                maxWidth: '600px'
              }}
            >
              <p className="text-body-lg text-text-soft" style={{ lineHeight: 1.8 }}>
                Напиши своё число в мессенджер
                <br className="hidden sm:inline" /> или сообщи по телефону.
              </p>

              <p
                className="text-quote text-text-main"
                style={{ marginTop: 'clamp(16px, 2vw, 28px)' }}
              >
                <span className="text-gradient-purple-orange">
                  Мы откроем сейф твоих возможностей.
                </span>
              </p>
            </div>
          </RevealText>

          {/* Buttons */}
          <RevealText delay={0.65}>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              style={{ marginTop: 'clamp(36px, 4vw, 64px)' }}
            >

              {/* Phone */}
              <a
                href="tel:+79300050056"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full text-white transition-all duration-500"
                style={{ padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 3vw, 52px)' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-purple via-warm-orange to-light-purple opacity-80 group-hover:opacity-100 animate-color-shift" />

                <span className="relative z-10 flex items-center gap-3">
                  <span className="font-medium" style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}>
                    +7 930 005-00-56
                  </span>
                </span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/navlyanskiyonline"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full text-white transition-all duration-500"
                style={{ padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 3vw, 52px)' }}
              >
                <div className="absolute inset-0 rounded-full border border-light-purple/30 group-hover:border-warm-orange/40 group-hover:bg-white/5" />

                <span className="relative z-10 flex items-center gap-3">
                  <span className="font-medium" style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}>
                    Написать в Telegram
                  </span>
                </span>
              </a>

            </div>
          </RevealText>

          <RevealText delay={1.0}>
            <p
              className="text-body text-text-muted text-column--narrow mx-auto"
              style={{ marginTop: 'clamp(40px, 5vw, 72px)' }}
            >
              Иногда достаточно одного разговора,
              <br />
              чтобы всё встало на свои места.
            </p>
          </RevealText>

        </div>
      </div>
    </section>
  );
}
