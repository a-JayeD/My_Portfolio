// src/components/ui/FilterTabs.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FilterTab {
  id: string;
  label: string;
  count?: number;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pills' | 'underline' | 'bordered';
  className?: string;
}

export function FilterTabs({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className,
}: FilterTabsProps) {
  if (variant === 'underline') {
    return (
      <div className={cn('flex gap-1 border-b border-dark-200 dark:border-dark-700', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-primary-500'
                : 'text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 text-dark-400">({tab.count})</span>
            )}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
              />
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'bordered') {
    return (
      <div
        className={cn(
          'inline-flex p-1 rounded-xl',
          'bg-dark-100 dark:bg-dark-800',
          'border border-dark-200 dark:border-dark-700',
          className
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium rounded-lg transition-all',
              activeTab === tab.id
                ? 'text-white'
                : 'text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary-500 rounded-lg"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    activeTab === tab.id
                      ? 'bg-white/20'
                      : 'bg-dark-200 dark:bg-dark-700'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    );
  }

  // Pills variant (default)
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-full transition-all',
            activeTab === tab.id
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
              : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 opacity-70">({tab.count})</span>
          )}
        </motion.button>
      ))}
    </div>
  );
}