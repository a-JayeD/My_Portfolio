// src/components/layout/Footer.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { siteConfig, footerNav } from '@/config/site.config';
import profile from '@/config/profile.json';
import socialLinks from '@/config/social.json';
import { cn } from '@/lib/utils';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-50 dark:bg-dark-950 border-t border-dark-200 dark:border-dark-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      // src/components/layout/Footer.tsx (continued)

      <div className="relative section-container section-padding">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="#home" className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-xl text-dark-900 dark:text-white">
                  {profile.name}
                </h3>
                <p className="text-sm text-dark-500 dark:text-dark-400">
                  {profile.title}
                </p>
              </div>
            </Link>
            <p className="text-dark-600 dark:text-dark-300 max-w-md mb-6">
              {profile.shortBio}
            </p>
            <SocialLinks links={socialLinks.links} size="md" />
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-dark-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerNav.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-dark-600 dark:text-dark-400',
                      'hover:text-primary-500 dark:hover:text-primary-400',
                      'transition-colors duration-200',
                      'animated-underline inline-block'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-dark-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerNav.resources.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'text-dark-600 dark:text-dark-400',
                      'hover:text-primary-500 dark:hover:text-primary-400',
                      'transition-colors duration-200',
                      'animated-underline inline-block'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-200 dark:border-dark-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 dark:text-dark-400 text-sm text-center sm:text-left">
              © {currentYear} {profile.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-dark-500 dark:text-dark-400 text-sm">
              Built with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'fixed bottom-8 right-8 z-40',
          'w-12 h-12 rounded-full',
          'bg-primary-500 text-white',
          'shadow-lg shadow-primary-500/25',
          'hover:bg-primary-600',
          'transition-colors duration-200',
          'flex items-center justify-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}