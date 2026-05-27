import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  animated?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  animated = true,
  delay = 0,
}: GlassCardProps) {
  const baseClasses = 'glass rounded-2xl p-6 transition-all duration-300';
  const hoverClasses = hover ? 'hover:border-neon-purple/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]' : '';
  const glowClasses = glow ? 'shadow-[0_0_30px_rgba(124,58,237,0.2)]' : '';

  const cardClasses = `${baseClasses} ${hoverClasses} ${glowClasses} ${className}`;

  if (!animated) {
    return <div className={cardClasses}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cardClasses}
    >
      {children}
    </motion.div>
  );
}
