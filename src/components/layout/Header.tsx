// src/components/layout/Header.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { navItems } from '@/config/site.config';
import profile from '@/config/profile.json';
import { cn } from '@/lib/utils';
import { useScrollDirection, useScrollProgress } from '@/hooks/useScrollAnimation';
import { useIsMobile } from '@/hooks/useMediaQuery';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();
  const scrollProgress = useScrollProgress();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ 
          y: scrollDirection === 'down' && isScrolled ? -100 : 0 
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="#home"
              className="flex items-center gap-2 z-50"
              onClick={() => handleNavClick('#home')}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                  {profile.name.charAt(0)}
                </div>
                {/* Online indicator */}
                {profile.availability === 'available' && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-900" />
                )}
              </motion.div>
              <span className="font-bold text-lg text-dark-900 dark:text-white hidden sm:block">
                {profile.name.split(' ')[0]}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg',
                    'text-dark-600 dark:text-dark-300',
                    'hover:text-dark-900 dark:hover:text-white',
                    'hover:bg-dark-100 dark:hover:bg-dark-800',
                    'transition-all duration-200'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle variant="icon" />
              
              {/* Resume button - desktop only */}
              <Button
                variant="gradient"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                className="hidden md:flex"
                onClick={() => window.open(profile.resumeUrl, '_blank')}
              >
                Resume
              </Button>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors z-50"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-dark-900 dark:text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-dark-900 dark:text-white" />
                )}
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white dark:bg-dark-900 z-40 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-6">
                {/* Nav items */}
                <nav className="flex-1 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl',
                          'text-dark-600 dark:text-dark-300',
                          'hover:text-dark-900 dark:hover:text-white',
                          'hover:bg-dark-100 dark:hover:bg-dark-800',
                          'transition-all duration-200',
                          'text-lg font-medium'
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Resume button */}
                <div className="pt-4 border-t border-dark-200 dark:border-dark-700">
                  <Button
                    variant="gradient"
                    fullWidth
                    leftIcon={<Download className="w-5 h-5" />}
                    onClick={() => window.open(profile.resumeUrl, '_blank')}
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}