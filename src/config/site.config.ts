// src/config/site.config.ts

import { SiteConfig, NavItem } from '@/types';

// ============================================
// 🔧 SITE CONFIGURATION - CUSTOMIZE HERE
// ============================================

export const siteConfig: SiteConfig = {
  // Basic site info
  name: 'John Doe | Software Engineer',
  description: 'Full-stack Software Engineer specializing in building exceptional digital experiences. Expert in React, Node.js, TypeScript, and cloud technologies.',
  url: 'https://johndoe.dev', // Your domain
  ogImage: '/images/og-image.png',
  
  // SEO keywords - Add relevant keywords for your profile
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Frontend Engineer',
    'Backend Developer',
    'Cloud Architecture',
    'System Design',
    'API Development',
  ],
  
  author: 'John Doe',
  twitterHandle: '@johndoe',
  themeColor: '#0ea5e9',
  googleAnalyticsId: 'G-XXXXXXXXXX', // Add your GA ID
};

// Navigation items
export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

// Footer navigation
export const footerNav = {
  main: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '#contact' },
  ],
  resources: [
    { label: 'Resume', href: '/resume.pdf', external: true },
    { label: 'GitHub', href: 'https://github.com/johndoe', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/johndoe', external: true },
  ],
};