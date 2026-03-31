"use client";
import { useCallback, useEffect, useState } from 'react';

const links = [
  { label: 'The Problem', href: '#problem' },
  { label: 'The Proposal', href: '#proposal' },
  { label: 'Why It Works', href: '#why' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Read the Paper', href: '#paper' },
  { label: 'Press', href: '#press' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setTimeout(() => setMenuMounted(false), 150);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  const openMenu = () => {
    setMenuMounted(true);
    requestAnimationFrame(() => setMenuOpen(true));
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-colors duration-200 ease-out ${
        scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-5xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <span className="font-display font-bold text-text">Old Town Free Enterprise District</span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm text-text-muted hover:text-accent transition-colors duration-150">
                {link.label}
              </a>
            ))}
            <a href="#paper"
              className="bg-accent text-bg font-bold px-4 py-2 rounded-md text-sm hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]">
              Read the Paper
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-text p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={menuOpen ? closeMenu : openMenu}
          >
            {menuOpen ? (
              <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuMounted && (
        <div
          className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 transition-all duration-200 ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
          onClick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href}
              onClick={closeMenu}
              className="text-2xl font-display font-bold text-text hover:text-accent transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
