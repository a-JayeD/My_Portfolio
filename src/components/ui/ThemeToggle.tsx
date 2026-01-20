// src/components/ui/ThemeToggle.tsx

'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'dropdown';
  className?: string;
}

export function ThemeToggle({ variant = 'icon', className }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, isDark } = useTheme();

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'relative p-2 rounded-xl',
          'bg-dark-100 dark:bg-dark-800',
          'hover:bg-dark-200 dark:hover:bg-dark-700',
          'transition-colors duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          className
        )}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-primary-400" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-500" />
          )}
        </motion.div>
      </motion.button>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'relative w-14 h-7 rounded-full',
          'bg-dark-200 dark:bg-dark-700',
          'transition-colors duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          className
        )}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          className={cn(
            'absolute top-1 w-5 h-5 rounded-full',
            'bg-white shadow-md',
            'flex items-center justify-center'
          )}
          animate={{ left: isDark ? '1.75rem' : '0.25rem' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-dark-600" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-500" />
          )}
        </motion.div>
      </button>
    );
  }

  return null;
}