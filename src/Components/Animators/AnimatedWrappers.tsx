// components/AnimatedWrappers.tsx
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Shared props for all motion.div-based components
type MotionDivProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

// Props for motion.button-based components
type AnimatedButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode;
  className?: string;
};

// Extended props for buttons that support a `delay`
type AnimatedButtonScaleInProps = AnimatedButtonProps & {
  delay?: number;
};

// Props for table rows
type MotionRowProps = {
  children: React.ReactNode;
  delay?: number;
};

/**
 * Fade in and slide upward (used for background or entrance)
 */
export function FadeInUp({ children, delay = 0, duration = 0.6, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Simple fade in (used for text blocks)
 */
export function FadeIn({ children, delay = 0.2, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Table row fade in with upward slide (used in GroupResultsSummary)
 */
export function AnimatedRow({ children, delay = 0 }: MotionRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.tr>
  );
}

/**
 * Fade in from above (used for centered card drop effect)
 */
export function FadeInDrop({ children, duration = 0.8, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide in from the left (used for input fields)
 */
export function FadeInXLeft({ children, delay = 0, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide in from the right (used for rating input)
 */
export function FadeInRight({ children, delay = 0, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade in + scale (used for rating cards or major transitions)
 */
export function FadeInScale({ children, delay = 0.1, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 120 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Simple text fade-in (used for headers)
 */
export function FadeInText({ children, delay = 0.3, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Basic button with hover/tap animations
 */
export function AnimatedButton({
  children,
  className = '',
  ...rest
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/**
 * Button that fades/scales in and supports hover/tap
 */
export function AnimatedButtonScaleIn({
  children,
  className = '',
  delay = 0.6,
  ...rest
}: AnimatedButtonScaleInProps) {
  return (
    <motion.button
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/**
 * For individual rating tiles (fade in with stagger)
 */
export function StaggeredFadeTile({ children, delay = 0, className = '' }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
