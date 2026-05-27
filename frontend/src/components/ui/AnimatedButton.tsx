import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const baseClasses = 'font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-neon hover:shadow-[0_0_40px_rgba(124,58,237,0.8)]',
    secondary: 'border-2 border-neon-cyan/50 text-white hover:bg-neon-cyan/10 backdrop-blur-sm',
    ghost: 'border border-white/20 text-white hover:bg-white/5',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const buttonContent = (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {buttonContent}
    </button>
  );
}
