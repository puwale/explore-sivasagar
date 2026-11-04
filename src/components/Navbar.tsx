import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Bookmark, ChevronRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenPlanner: () => void;
  savedCount: number;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPlanner, savedCount, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section in viewport
      const sections = ['home', 'destinations', 'heritage', 'map', 'experiences', 'guide', 'gallery'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Explore Places' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'map', label: 'Interactive Map' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'guide', label: 'Travel Guide' },
    { id: 'gallery', label: 'Photo Gallery' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-forest-950/80 via-forest-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
                <Compass className="w-5 h-5 text-forest-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-display tracking-[0.22em] text-ivory-100 font-bold text-base sm:text-lg leading-tight uppercase group-hover:text-gold-400 transition-colors">
                  EXPLORE SIVASAGAR
                </span>
                <span className="text-[10px] tracking-[0.3em] text-gold-400/90 font-medium uppercase">
                  Legacy of Assam
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase transition-all duration-200 rounded-md relative ${
                      isActive
                        ? 'text-gold-400 font-semibold'
                        : 'text-ivory-100/80 hover:text-gold-300 hover:bg-forest-900/40'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Saved Itinerary Button */}
              <button
                onClick={onOpenPlanner}
                className="relative p-2 rounded-lg bg-forest-900/60 border border-gold-500/30 text-ivory-100 hover:text-gold-400 hover:border-gold-400/60 transition-all duration-200"
                title="Saved Places & Itinerary"
                aria-label="Saved Places"
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold-500 text-forest-950 text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Prominent Explore Now CTA */}
              <button
                onClick={() => handleLinkClick('destinations')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 font-semibold text-xs tracking-wider uppercase shadow-gold-glow hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Explore Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-ivory-100 hover:text-gold-400 hover:bg-forest-900/60 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-20 left-4 right-4 bg-forest-950/95 border border-gold-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Navigation
            </div>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-forest-800 text-gold-400 font-semibold'
                      : 'text-ivory-100 hover:bg-forest-900/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-gold-500/60" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-forest-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanner();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gold-500/40 text-ivory-100 text-sm font-medium"
              >
                <Bookmark className="w-4 h-4 text-gold-400" />
                <span>Saved Destinations ({savedCount})</span>
              </button>
              <button
                onClick={() => handleLinkClick('destinations')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 font-bold text-sm uppercase tracking-wider text-center"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

