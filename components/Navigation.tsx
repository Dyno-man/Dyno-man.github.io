'use client';

import Link from 'next/link';
import { useState } from 'react';
import SocialLinks from './SocialLinks';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-xl font-semibold text-dark-text hover:text-accent-blue transition-colors duration-200"
          >
            Grant Versluis
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-dark-text-muted hover:text-accent-blue transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="text-dark-text-muted hover:text-accent-blue transition-colors duration-200"
            >
              Projects
            </Link>
            <div className="h-6 w-px bg-dark-border" />
            <SocialLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark-text-muted hover:text-accent-blue transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              href="/"
              className="block text-dark-text-muted hover:text-accent-blue transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="block text-dark-text-muted hover:text-accent-blue transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <div className="pt-2">
              <SocialLinks />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

