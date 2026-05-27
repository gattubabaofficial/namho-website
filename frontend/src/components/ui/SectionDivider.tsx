import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'glow' | 'gradient' | 'subtle';
  className?: string;
}

export function SectionDivider({ variant = 'glow', className = '' }: SectionDividerProps) {
  const variantClasses = {
    glow: 'divider-glow',
    gradient: 'h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent',
    subtle: 'h-px bg-gradient-to-r from-transparent via-white/10 to-transparent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`${variantClasses[variant]} ${className}`}
    />
  );
}
