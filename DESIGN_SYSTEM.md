# Namho Website - Premium Futuristic Design System

## Overview

This document outlines the design system, components, and styling conventions used in the Namho website. The design follows a **premium futuristic AI tech company aesthetic** with cinematic animations, glassmorphism effects, and advanced interactions.

## Design Philosophy

- **Cinematic & Immersive**: Every section tells a story with smooth, purposeful animations
- **Minimal but Luxurious**: Clean layouts with premium visual effects
- **High-Tech & AI-Native**: Modern, forward-thinking design language
- **Performance-First**: Optimized animations and effects for 60fps performance

## Color Palette

### Primary Colors
- **Neon Purple**: `#7C3AED` - Primary accent and highlights
- **Neon Cyan**: `#06B6D4` - Secondary accent and interactive elements
- **Neon Blue**: `#3B82F6` - Tertiary accent for depth

### Background
- **Dark Background**: `#050816` - Main background color
- **Dark Surface**: `#0a0e2e` - Secondary surface
- **Glass Background**: `rgba(255, 255, 255, 0.05)` - Glassmorphism base

## Typography

### Font Families
- **Display Font**: Panchang (for headlines and large text)
- **Body Font**: Work Sans (for body text and UI)
- **Serif Font**: Boska (for accent text and special elements)

### Font Weights
- Light: 200
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

## Components

### UI Components

#### AnimatedButton
Reusable button component with hover animations and variants.

```tsx
import { AnimatedButton } from '@/components/ui/AnimatedButton';

<AnimatedButton variant="primary" size="lg">
  Click Me
</AnimatedButton>
```

**Variants**: `primary`, `secondary`, `ghost`
**Sizes**: `sm`, `md`, `lg`

#### GlassCard
Glassmorphism card component with optional glow and animations.

```tsx
import { GlassCard } from '@/components/ui/GlassCard';

<GlassCard glow hover animated>
  Card content here
</GlassCard>
```

#### GradientText
Text with animated gradient effects.

```tsx
import { GradientText } from '@/components/ui/GradientText';

<GradientText variant="primary" animated>
  Gradient Text
</GradientText>
```

**Variants**: `primary`, `cyan`, `purple`

#### SectionDivider
Animated divider for visual separation.

```tsx
import { SectionDivider } from '@/components/ui/SectionDivider';

<SectionDivider variant="glow" />
```

**Variants**: `glow`, `gradient`, `subtle`

### Effect Components

#### ParticleBackground
Ambient particle system for background effects.

```tsx
import { ParticleBackground } from '@/components/effects/ParticleBackground';

<ParticleBackground particleCount={50} speed={0.5} />
```

#### HoverGlowEffect
Interactive glow effect that follows mouse movement.

```tsx
import { HoverGlowEffect } from '@/components/effects/HoverGlowEffect';

<HoverGlowEffect glowColor="rgba(124, 58, 237, 0.3)">
  Content
</HoverGlowEffect>
```

## Hooks

### useMouseFollowEffect
Track mouse position relative to an element.

```tsx
import { useMouseFollowEffect } from '@/hooks/useMouseFollowEffect';

const { elementRef, mousePosition } = useMouseFollowEffect();
```

### useScrollReveal
Trigger animations when element enters viewport.

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';

const { elementRef, isVisible } = useScrollReveal({ threshold: 0.1 });
```

## CSS Classes

### Utility Classes

#### Glassmorphism
- `.glass` - Standard glassmorphism effect
- `.glass-dark` - Dark glassmorphism variant
- `.glass-glow` - Glassmorphism with glow effect

#### Gradient Effects
- `.gradient-text` - Multi-color gradient text
- `.gradient-text-purple` - Purple gradient text
- `.gradient-text-cyan` - Cyan gradient text
- `.gradient-border` - Gradient border effect

#### Glow Effects
- `.neon-glow` - Purple neon glow
- `.neon-glow-cyan` - Cyan neon glow
- `.neon-glow-blue` - Blue neon glow
- `.ambient-glow` - Ambient multi-color glow

#### Interactive
- `.hover-lift` - Lifts element on hover with shadow
- `.hover-glow` - Adds glow on hover
- `.hover-scale` - Scales element on hover
- `.hover-brightness` - Increases brightness on hover

### Animation Classes

#### Built-in Animations
- `.animate-float` - Floating motion
- `.animate-glow-pulse` - Pulsing glow effect
- `.animate-shimmer` - Shimmer animation
- `.animate-slide-in-right` - Slide in from right
- `.animate-slide-in-left` - Slide in from left
- `.animate-slide-in-up` - Slide in from bottom
- `.animate-scale-in` - Scale in animation
- `.animate-rotate-slow` - Slow rotation
- `.animate-blob` - Blob morphing animation
- `.animate-text-reveal` - Text reveal animation

## Tailwind Extensions

### Custom Colors
```js
colors: {
  neon: {
    purple: '#7C3AED',
    cyan: '#06B6D4',
    blue: '#3B82F6',
  },
  dark: {
    bg: '#050816',
    surface: '#0a0e2e',
    card: '#111827',
  }
}
```

### Custom Shadows
```js
boxShadow: {
  glow: '0 0 20px rgba(124, 58, 237, 0.5)',
  'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
  'ambient': '0 0 40px rgba(124, 58, 237, 0.3), 0 0 60px rgba(6, 182, 212, 0.2)',
}
```

### Custom Animations
```js
animation: {
  'float': 'float 6s ease-in-out infinite',
  'glow-pulse': 'glowPulse 2s ease-in-out infinite',
  'blob': 'blob 7s infinite',
  // ... and more
}
```

## Best Practices

### Performance
1. Use `will-change` sparingly for animated elements
2. Prefer transform and opacity for animations
3. Use `backdrop-filter` with caution on mobile
4. Lazy load heavy components and 3D assets

### Accessibility
1. Maintain sufficient color contrast
2. Use semantic HTML elements
3. Provide keyboard navigation for interactive elements
4. Test with screen readers

### Responsive Design
1. Mobile-first approach
2. Test on various screen sizes
3. Use Tailwind's responsive prefixes (sm:, md:, lg:, etc.)
4. Optimize touch targets for mobile (min 44px)

### Animation Guidelines
1. Keep animations under 500ms for UI interactions
2. Use easing functions for natural motion
3. Avoid animation on page load for better performance
4. Provide reduced motion alternatives

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── AnimatedButton.tsx
│   │   ├── GlassCard.tsx
│   │   ├── GradientText.tsx
│   │   └── SectionDivider.tsx
│   ├── effects/
│   │   ├── ParticleBackground.tsx
│   │   └── HoverGlowEffect.tsx
│   └── layout/
├── hooks/
│   ├── useMouseFollowEffect.ts
│   └── useScrollReveal.ts
├── pages/
│   └── public/
│       └── HomePage.tsx
├── index.css
└── App.css
```

## Customization

### Changing Primary Color
Update the CSS variables in `index.css`:
```css
--neon-purple: #YOUR_COLOR;
```

### Adjusting Animation Speed
Modify animation durations in `tailwind.config.js`:
```js
animation: {
  'float': 'float 8s ease-in-out infinite', // Changed from 6s
}
```

### Modifying Glassmorphism Effect
Update the `.glass` class in `index.css`:
```css
.glass {
  background: rgba(255, 255, 255, 0.08); /* Increase opacity */
  backdrop-filter: blur(15px); /* Increase blur */
}
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with -webkit prefixes)
- Mobile browsers: Full support with performance considerations

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [CSS Backdrop Filter Support](https://caniuse.com/css-backdrop-filter)
- [Web Animations Performance](https://web.dev/animations-guide/)

## Contributing

When adding new components or effects:
1. Follow the existing naming conventions
2. Add TypeScript types
3. Document props and usage
4. Test on multiple devices
5. Ensure accessibility compliance
6. Update this design system document

## Version History

- **v1.0.0** (Current) - Initial premium futuristic design system with glassmorphism, animations, and custom fonts
