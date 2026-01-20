// src/components/ui/ProjectCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
}

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Card
      variant="glass"
      padding="none"
      hover
      className={cn(
        'group overflow-hidden',
        isFeatured && 'md:col-span-2'
      )}
    >
      <div
        className={cn(
          'flex flex-col',
          isFeatured && 'md:flex-row'
        )}
      >
        {/* Image */}
        <div
          className={cn(
            'relative overflow-hidden',
            isFeatured ? 'md:w-1/2' : 'aspect-video'
          )}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick links on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="View GitHub repository"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="View live demo"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>

          {/* Status badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="accent" size="sm">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={cn(
            'p-6 flex flex-col',
            isFeatured && 'md:w-1/2 md:p-8'
          )}
        >
          {/* Category */}
          <Badge variant="primary" size="sm" className="self-start mb-3">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </Badge>

          {/* Title */}
          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {project.metrics.slice(0, 3).map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-primary-500">
                    {metric.value}
                  </div>
                  <div className="text-xs text-dark-500 dark:text-dark-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="secondary" size="sm">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
              <Badge variant="secondary" size="sm">
                +{project.techStack.length - 5}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="group/btn"
            >
              <span className="group-hover/btn:translate-x-1 transition-transform">
                View Details
              </span>
            </Button>
            
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-200 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-200 transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}