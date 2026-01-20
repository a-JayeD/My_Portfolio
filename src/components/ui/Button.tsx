// src/components/ui/Button.tsx

'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-500 text-white 
    hover:bg-primary-600 
    active:bg-primary-700 
    shadow-lg shadow-primary-500/25
    dark:shadow-primary-500/20
  `,
  secondary: `
    bg-dark-100 text-dark-900 
    dark:bg-dark-800 dark:text-white 
    hover:bg-dark-200 dark:hover:bg-dark-700
  `,
  outline: `
    border-2 border-primary-500 text-primary-500 
    hover:bg-primary-500 hover:text-white 
    dark:border-primary-400 dark:text-primary-400
  `,
  ghost: `
    text-dark-600 dark:text-dark-300 
    hover:bg-dark-100 dark:hover:bg-dark-800 
    hover:text-dark-900 dark:hover:text-white
  `,
  gradient: `
    bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 
    bg-[length:200%_auto] 
    text-white 
    hover:bg-[position:right_center] 
    shadow-lg shadow-primary-500/25
    animate-gradient
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-medium transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';