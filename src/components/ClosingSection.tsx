import RevealText from './RevealText';

export default function ClosingSection() {
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

          {/* Headline */}
          <RevealText>
            <h2 className="heading-hero">
              Ты уже знаешь,
            </h2>
          </RevealText>

          <RevealText delay={0.25}>
            <p className="heading-hero text-gradient-orange-gold" style={{ marginTop: 'clamp(8px, 1vw, 16px)' }}>
              что тебе нужно.
            </p>
          </RevealText>

          {/* Safe phrase */}
          <RevealText delay={0.45}>
            <div className="glass-purple rounded-2xl mx-auto" style={{ marginTop: 'clamp(40px, 5vw, 72px)', padding: 'clamp(28px, 4vw, 52px)', maxWidth: '600px' }}>
              <p className="text-body-lg text-text-soft" style={{ lineHeight: 1.8 }}>
                Напиши своё число в мессенджер<br className="hidden sm:inline" /> или сообщи по телефону.
              </p>
              <p className="text-quote text-text-main" style={{ marginTop: 'clamp(16px, 2vw, 28px)' }}>
                <span className="text-gradient-purple-orange">Мы откроем сейф твоих возможностей.</span>
              </p>
            </div>
          </RevealText>

          {/* Contact buttons */}
          <RevealText delay={0.65}>
            <div style={{ marginTop: 'clamp(36px, 4vw, 64px)' }} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Phone */}
              <a
                href="tel:+79300050056"
                className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full font-sans tracking-wide text-white transition-all duration-500"
                style={{ padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 3vw, 52px)' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-purple via-warm-orange to-light-purple bg-[length:200%_100%] opacity-80 transition-opacity duration-400 group-hover:opacity-100 animate-color-shift" />
                <span className="relative z-10 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span className="font-medium" style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}>+7 900 123-45-67</span>
                </span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/navlyanskiynew"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full font-sans tracking-wide text-white transition-all duration-500"
                style={{ padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 3vw, 52px)' }}
              >
                <div className="absolute inset-0 rounded-full border border-light-purple/30 transition-all duration-400 group-hover:border-warm-orange/40 group-hover:bg-white/5" />
                <span className="relative z-10 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  <span className="font-medium" style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}>Написать в Telegram</span>
                </span>
              </a>
            </div>
          </RevealText>

          {/* VK */}
<RevealText delay={0.8}>
  <div style={{ marginTop: 'clamp(16px, 2vw, 24px)' }}>
    <a
      href="https://vk.ru/navlyanskiy"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full font-sans tracking-wide text-white transition-all duration-500"
      style={{ padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 3vw, 52px)' }}
    >
      <div className="absolute inset-0 rounded-full border border-light-purple/30 transition-all duration-400 group-hover:border-warm-orange/40 group-hover:bg-white/5" />
      
      <span className="relative z-10 flex items-center gap-3">
        {/* VK SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.004 2C6.478 2 2 6.477 2 12c0 5.523 4.478 10 10.004 10C17.523 22 22 17.523 22 12c0-5.523-4.477-10-9.996-10zm4.93 14.615h-1.18c-.445 0-.58-.36-1.377-1.157-.695-.68-.997-.77-1.166-.77-.232 0-.3.063-.3.36v1.055c0 .285-.09.512-.838.512-1.24 0-2.616-.75-3.586-2.146-1.46-2.045-1.86-3.58-1.86-3.89 0-.167.063-.32.36-.32h1.18c.3 0 .413.134.53.447.583 1.69 1.55 3.176 1.95 3.176.15 0 .214-.07.214-.444v-1.72c-.045-.785-.463-.85-.463-1.13 0-.14.11-.27.3-.27h1.85c.25 0 .34.13.34.42v2.31c0 .25.11.34.18.34.15 0 .27-.09.54-.36.85-.95 1.46-2.42 1.46-2.42.08-.18.21-.34.5-.34h1.18c.36 0 .44.18.36.43-.15.69-1.63 2.77-1.63 2.77-.13.21-.18.31 0 .54.13.17.56.55.85.89.54.61.96 1.12 1.07 1.47.11.35-.06.53-.41.53z"/>
        </svg>

        <span
          className="font-medium"
          style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}
        >
          Написать ВКонтакте
        </span>
      </span>
    </a>
  </div>
</RevealText>

          {/* Closing micro text */}
          <RevealText delay={1.0}>
            <p className="text-body text-text-muted text-column--narrow mx-auto" style={{ marginTop: 'clamp(40px, 5vw, 72px)' }}>
              Иногда достаточно одного разговора,
              <br />
              чтобы всё встало на свои места.
            </p>
          </RevealText>

          {/* Decorative bottom */}
          <RevealText delay={1.2}>
            <div className="flex flex-col items-center" style={{ marginTop: 'clamp(40px, 5vw, 80px)', gap: '10px' }}>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-light-purple/20 to-transparent" />
              <div className="h-px w-14 bg-gradient-to-r from-transparent via-warm-orange/15 to-transparent" />
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
