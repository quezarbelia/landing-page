import { motion, HTMLMotionProps } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  elevated?: boolean;
}

export default function GlassCard({ children, className, elevated = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        elevated ? "glass-elevated" : "glass-card",
        "rounded-3xl p-8 glow-subtle overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

