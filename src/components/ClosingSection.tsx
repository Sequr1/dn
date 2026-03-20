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
                href="tel:+79001234567"
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
                href="https://t.me/username"
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

          {/* WhatsApp */}
          <RevealText delay={0.8}>
            <div style={{ marginTop: 'clamp(16px, 2vw, 24px)' }}>
              <a
                href="https://wa.me/79001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full font-sans tracking-wide text-white transition-all duration-500"
                style={{ padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 3vw, 52px)' }}
              >
                <div className="absolute inset-0 rounded-full border border-light-purple/30 transition-all duration-400 group-hover:border-warm-orange/40 group-hover:bg-white/5" />
                <span className="relative z-10 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span className="font-medium" style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}>Написать в WhatsApp</span>
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
