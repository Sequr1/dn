import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealText({ children, delay = 0, className = '' }: RevealTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        filter: { duration: 0.9, delay: delay + 0.15 },
      }}
      viewport={{ once: true, margin: '-80px' }}
      style={{ willChange: 'opacity, transform, filter' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
