import RevealText from './RevealText';

export default function ClosingSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/10 to-deep-black" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-gradient-to-t from-warm-orange/12 via-light-purple/8 to-transparent blur-3xl animate-gentle-pulse" />
      </div>

      {/* Orb */}
      <div className="absolute top-20 right-1/4 w-[250px] h-[250px] rounded-full bg-light-purple/5 blur-3xl pointer-events-none animate-gentle-pulse-2" />

      <div className="relative z-10 site-container section-space w-full">
        <div className="text-column mx-auto text-center">

          {/* Headline */}
          <RevealText>
            <h2 className="heading-hero">
              Ты уже знаешь,
            </h2>
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
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">

              {/* Phone */}
              <a
                href="tel:+79300050056"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full text-white transition-all duration-500 px-8 py-4"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-purple via-warm-orange to-light-purple opacity-80 group-hover:opacity-100 animate-color-shift" />
                <span className="relative z-10 font-medium">
                  +7 930 005-00-56
                </span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/navlyanskiyonline"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full text-white transition-all duration-500 px-8 py-4 border border-light-purple/30 hover:bg-white/5"
              >
                <span className="relative z-10 font-medium">
                  Написать в Telegram
                </span>
              </a>
            </div>
          </RevealText>

          {/* VK */}
          <RevealText delay={0.8}>
            <div className="mt-4">
              <a
                href="https://vk.ru/navlyanskiy"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full text-white transition-all duration-500 px-8 py-4 border border-light-purple/30 hover:bg-white/5"
              >
                <span className="relative z-10 font-medium">
                  Написать ВКонтакте
                </span>
              </a>
            </div>
          </RevealText>

          {/* Closing text */}
          <RevealText delay={1.0}>
            <p className="text-body text-text-muted text-column--narrow mx-auto mt-16">
              Иногда достаточно одного разговора,
              <br />
              чтобы всё встало на свои места.
            </p>
          </RevealText>

          {/* Decorative */}
          <RevealText delay={1.2}>
            <div className="flex flex-col items-center mt-16 gap-2">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-light-purple/20 to-transparent" />
              <div className="h-px w-14 bg-gradient-to-r from-transparent via-warm-orange/15 to-transparent" />
            </div>
          </RevealText>

        </div>
      </div>
    </section>
  );
}
