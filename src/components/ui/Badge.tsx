// src/components/ui/Badge.tsx

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variants: Record<BadgeVariant, string> = {
  default: `
    bg-dark-100 text-dark-700 
    dark:bg-dark-700 dark:text-dark-200
    border border-dark-200 dark:border-dark-600
  `,
  primary: `
    bg-primary-100 text-primary-700 
    dark:bg-primary-900/30 dark:text-primary-300
    border border-primary-200 dark:border-primary-800
  `,
  secondary: `
    bg-dark-100 text-dark-600 
    dark:bg-dark-800 dark:text-dark-300
    border border-dark-200 dark:border-dark-700
  `,
  accent: `
    bg-accent-100 text-accent-700 
    dark:bg-accent-900/30 dark:text-accent-300
    border border-accent-200 dark:border-accent-800
  `,
  success: `
    bg-green-100 text-green-700 
    dark:bg-green-900/30 dark:text-green-300
    border border-green-200 dark:border-green-800
  `,
  warning: `
    bg-yellow-100 text-yellow-700 
    dark:bg-yellow-900/30 dark:text-yellow-300
    border border-yellow-200 dark:border-yellow-800
  `,
  error: `
    bg-red-100 text-red-700 
    dark:bg-red-900/30 dark:text-red-300
    border border-red-200 dark:border-red-800
  `,
};

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          'transition-colors duration-200',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';