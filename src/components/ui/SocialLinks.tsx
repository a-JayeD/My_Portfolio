// src/components/ui/SocialLinks.tsx

'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Terminal,
  Code2,
  Newspaper,
  ExternalLink,
} from 'lucide-react';
import { SocialLink } from '@/types';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface SocialLinksProps {
  links: SocialLink[];
  variant?: 'default' | 'minimal' | 'expanded';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Terminal,
  Code2,
  Newspaper,
};

export function SocialLinks({
  links,
  variant = 'default',
  size = 'md',
  showLabels = false,
  className,
}: SocialLinksProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (variant === 'expanded') {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={cn('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4', className)}
      >
        {links.map((link) => {
          const Icon = iconMap[link.icon] || ExternalLink;
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex items-center gap-3 p-4',
                'bg-white dark:bg-dark-800',
                'border border-dark-200 dark:border-dark-700',
                'rounded-xl',
                'hover:border-primary-500 dark:hover:border-primary-500',
                'hover:shadow-lg hover:shadow-primary-500/10',
                'transition-all duration-300'
              )}
            >
              <div
                className={cn(
                  'p-2 rounded-lg',
                  'bg-primary-100 dark:bg-primary-900/30',
                  'text-primary-600 dark:text-primary-400'
                )}
              >
                <Icon className={iconSizes[size]} />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-dark-900 dark:text-white text-sm">
                  {link.platform}
                </span>
                {link.username && (
                  <span className="text-dark-500 dark:text-dark-400 text-xs">
                    {link.username}
                  </span>
                )}
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn('flex items-center gap-2', className)}
    >
      {links
        .filter((link) => variant === 'default' || link.featured)
        .map((link) => {
          const Icon = iconMap[link.icon] || ExternalLink;
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'flex items-center justify-center',
                sizes[size],
                'rounded-xl',
                'bg-dark-100 dark:bg-dark-800',
                'text-dark-600 dark:text-dark-300',
                'hover:bg-primary-500 hover:text-white',
                'hover:shadow-lg hover:shadow-primary-500/25',
                'transition-all duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
              )}
              aria-label={link.platform}
            >
              <Icon className={iconSizes[size]} />
            </motion.a>
          );
        })}
    </motion.div>
  );
}