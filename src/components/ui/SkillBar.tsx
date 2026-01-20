// src/components/ui/SkillBar.tsx

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function SkillBar({
  name,
  level,
  color,
  showPercentage = true,
  size = 'md',
  animated = true,
}: SkillBarProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-dark-700 dark:text-dark-200">
          {name}
        </span>
        {showPercentage && (
          <span className="text-sm text-dark-500 dark:text-dark-400">
            {level}%
          </span>
        )}
      </div>
      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          'bg-dark-200 dark:bg-dark-700',
          heights[size]
        )}
      >
        <motion.div
          className={cn(
            'h-full rounded-full',
            'bg-gradient-to-r from-primary-500 to-accent-500'
          )}
          style={color ? { background: color } : undefined}
          initial={{ width: 0 }}
          animate={inView || !animated ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// Alternative: Circular skill indicator
interface CircularSkillProps {
  name: string;
  level: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function CircularSkill({
  name,
  level,
  size = 80,
  strokeWidth = 6,
  color,
}: CircularSkillProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-dark-200 dark:text-dark-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color || 'url(#gradient)'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              inView
                ? { strokeDashoffset }
                : { strokeDashoffset: circumference }
            }
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-dark-900 dark:text-white">
            {level}%
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-dark-600 dark:text-dark-300 text-center">
        {name}
      </span>
    </div>
  );
}