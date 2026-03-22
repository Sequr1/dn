import RevealText from './RevealText';

export default function ClosingSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-between">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/10 to-deep-black" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-gradient-to-t from-warm-orange/12 via-light-purple/8 to-transparent blur-3xl animate-gentle-pulse" />
      </div>

      <div className="relative z-10 site-container section-space w-full flex flex-col justify-between flex-1">
        <div className="text-column mx-auto text-center">

          {/* Headline */}
          <RevealText>
            <h2 className="heading-hero">Ты уже знаешь,</h2>
          </RevealText>

          <RevealText delay={0.25}>
            <p className="heading-hero text-gradient-orange-gold mt-2">
              что тебе нужно.
            </p>
          </RevealText>

          {/* Message */}
          <RevealText delay={0.45}>
            <div className="glass-purple rounded-2xl mx-auto mt-10 p-8 max-w-[600px]">
              <p className="text-body-lg text-text-soft leading-relaxed">
                Напиши своё число в мессенджер
                <br className="hidden sm:inline" /> или сообщи по телефону.
              </p>
              <p className="text-quote text-text-main mt-4">
                <span className="text-gradient-purple-orange">
                  Мы откроем сейф твоих возможностей.
                </span>
              </p>
            </div>
          </RevealText>

          {/* Buttons */}
          <RevealText delay={0.65}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Phone */}
              <a
                href="tel:+79300050056"
                className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-white transition-all"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-purple via-warm-orange to-light-purple opacity-80 group-hover:opacity-100 animate-color-shift" />
                <span className="relative z-10 flex items-center gap-3">
                  <span>+7 930 005-00-56</span>
                </span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/navlyanskiyonline"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-white transition-all border border-light-purple/30 hover:bg-white/5"
              >
                <span className="relative z-10">
                  Написать в Telegram
                </span>
              </a>
            </div>
          </RevealText>

          {/* Closing text */}
          <RevealText delay={1.0}>
            <p className="text-body text-text-muted mt-16">
              Иногда достаточно одного разговора,
              <br />
              чтобы всё встало на свои места.
            </p>
          </RevealText>
        </div>

        {/* ===== FOOTER ===== */}
        <RevealText delay={1.2}>
          <footer className="mt-16 pb-6 text-center text-sm text-text-muted">
            <div className="mb-3 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-light-purple/20 to-transparent" />

            <p>
              © {new Date().getFullYear()} Пространство. Все права защищены.
            </p>

            <p className="mt-2">
              designed by{" "}
              <a
                href="https://t.me/searchernov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-purple hover:text-warm-orange transition-colors"
              >
                Anatoly (@searchernov)
              </a>
            </p>
          </footer>
        </RevealText>
      </div>
    </section>
  );
}
