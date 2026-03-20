import { useEffect } from 'react';

/**
 * Scroll-reactive background using pure CSS.
 * Reads --scroll-progress custom property set by useScrollProgress hook.
 * No React re-renders — all transitions handled by GPU-composited CSS.
 */
export default function ScrollBackground() {
  useEffect(() => {
    // Ensure initial value is set
    document.documentElement.style.setProperty('--scroll-progress', '0');
  }, []);

  return (
    <div className="scroll-bg-container">
      {/* Deep purple atmosphere layer */}
      <div className="scroll-bg-purple" />
      {/* Warm orange accent from bottom */}
      <div className="scroll-bg-orange" />
      {/* Purple orb top-right — static, GPU-composited */}
      <div className="scroll-bg-orb-purple" />
      {/* Orange orb bottom-left — static, GPU-composited */}
      <div className="scroll-bg-orb-orange" />
    </div>
  );
}
