import { useMouseFollowEffect } from '../../hooks/useMouseFollowEffect';
import { ReactNode } from 'react';

interface HoverGlowEffectProps {
  children: ReactNode;
  glowColor?: string;
  glowSize?: number;
  className?: string;
}

export function HoverGlowEffect({
  children,
  glowColor = 'rgba(124, 58, 237, 0.3)',
  glowSize = 200,
  className = '',
}: HoverGlowEffectProps) {
  const { elementRef, mousePosition } = useMouseFollowEffect();

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glow effect */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
        }}
      />
      {children}
    </div>
  );
}
