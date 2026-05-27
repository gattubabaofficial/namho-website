import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  variant?: 'primary' | 'cyan' | 'purple';
  className?: string;
  animated?: boolean;
}

export function GradientText({
  children,
  variant = 'primary',
  className = '',
  animated = false,
}: GradientTextProps) {
  const variantClasses = {
    primary: 'text-gradient-primary',
    cyan: 'text-gradient-cyan',
    purple: 'text-gradient-purple',
  };

  const baseClasses = `${variantClasses[variant]} ${className}`;

  if (!animated) {
    return <span className={baseClasses}>{children}</span>;
  }

  return (
    <motion.span
      initial={{ opacity: 0, backgroundPosition: '0% 50%' }}
      animate={{ opacity: 1, backgroundPosition: '100% 50%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={baseClasses}
    >
      {children}
    </motion.span>
  );
}
