import { useScrollProgress } from './hooks/useScrollProgress';
import ScrollBackground from './components/ScrollBackground';
import HeroSection from './components/HeroSection';
import WhatHappensSection from './components/WhatHappensSection';
import ExperienceSection from './components/ExperienceSection';
import HowItWorksSection from './components/HowItWorksSection';
import TrustSection from './components/TrustSection';
import PackagesSection from './components/PackagesSection';
import NumberSection from './components/NumberSection';
import ClosingSection from './components/ClosingSection';

function Divider({ variant = 'purple' }: { variant?: 'purple' | 'orange' | 'mixed' }) {
  const colors = {
    purple: 'via-light-purple/20',
    orange: 'via-warm-orange/15',
    mixed: 'via-light-purple/15',
  };
  return (
    <div className="site-container" style={{ paddingTop: 'clamp(8px, 2vw, 24px)', paddingBottom: 'clamp(8px, 2vw, 24px)' }}>
      <div className={`h-px bg-gradient-to-r from-transparent ${colors[variant]} to-transparent`} />
    </div>
  );
}

export default function App() {
  useScrollProgress();

  return (
    <div className="relative bg-deep-black min-h-screen">
      <div className="noise-overlay" />
      <ScrollBackground />

      <main className="relative z-10">
        <HeroSection />
        <Divider variant="mixed" />
        <WhatHappensSection />
        <Divider variant="orange" />
        <ExperienceSection />
        <Divider variant="purple" />
        <HowItWorksSection />
        <Divider variant="mixed" />
        <TrustSection />
        <Divider variant="purple" />
        <PackagesSection />
        <Divider variant="orange" />
        <NumberSection />
        <Divider variant="mixed" />
        <ClosingSection />
      </main>
    </div>
  );
}
