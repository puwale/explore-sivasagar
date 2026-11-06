import React, { useState, useMemo } from 'react';
import type { Destination } from '../data/sivasagarData';
import { MapPin, ArrowRight, Bookmark, Filter } from 'lucide-react';
import { SmartImage } from './SmartImage';
import ahomSymbolWatermark from '../assets/images/ahom-symbol-watermark.png';
import { OrbInput } from './ui/animated-input';

interface ExploreDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({
  destinations,
  onSelectDestination,
  savedIds,
  onToggleSave,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-scroll when targeted directly
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#destinations') {
      const el = document.getElementById('destinations');
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
  }, []);

  const categories = [
    'All',
    'Royal Palace',
    'Amphitheatre',
    'Ancient Temple',
    'Sacred Lake',
    'UNESCO Heritage',
    'Engineering Marvel',
    'Museum & Culture',
    'Wildlife & Nature',
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesQuery =
        searchQuery === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.assameseName.includes(searchQuery) ||
        dest.builtBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [destinations, selectedCategory, searchQuery]);

  return (
    <section
      id="destinations"
      className="relative overflow-hidden py-24 sm:py-32 bg-ivory-100 text-charcoal-800 border-b border-charcoal-800/10"
    >
      {/* Full-Section Ahom Symbol Watermark Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
      >
        <img
          src={ahomSymbolWatermark}
          alt=""
          className="w-[94vw] sm:w-[90vw] md:w-[1100px] lg:w-[1800px] xl:w-[2200px] 2xl:w-[2500px] max-w-none aspect-square object-contain object-center opacity-[0.25] pointer-events-none select-none transition-opacity duration-300"
          loading="lazy"
        />
      </div>

      <div className="wrap-museum relative z-10">
        {/* 12-Column Museum Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-charcoal-800/15 mb-10">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[13px] font-medium text-forest-800 block">
              01 / Dedicated Sivasagar Heritage Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest-950 font-normal tracking-[-0.02em] leading-[1.1]">
              Monuments, Sacred Lakes &amp; Royal Citadels
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-charcoal-700 leading-[1.65] font-normal">
              Ten documented landmarks across Sivasagar, Rangpur, Garhgaon, and Charaideo. Select
              any monument to read its complete historical monograph, construction techniques, and
              archival sources.
            </p>
          </div>
        </div>

        {/* Filter & Search Toolbar on Equal Edges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-12">
          {/* Category Pills with Mobile Scroll Hint */}
          <div className="relative min-w-0 max-w-full">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none pr-8 lg:pr-0">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`m-btn px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap border shrink-0 ${
                      isSelected
                        ? 'bg-forest-950 text-gold-400 border-forest-950'
                        : 'bg-ivory-50 text-charcoal-700 border-charcoal-800/15 hover:border-forest-800 hover:text-forest-950'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {/* Subtle Right-Edge Gradient Scroll Hint on Mobile / Tablet (Non-blocking) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 bottom-2 lg:bottom-0 w-10 bg-gradient-to-l from-ivory-100 via-ivory-100/70 to-transparent lg:hidden"
            />
          </div>

          {/* Monument Search Box with Rotating Tai-Ahom Emblem */}
          <div className="relative w-full lg:w-96 shrink-0">
            <OrbInput
              size="compact"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholders={[
                "Search monument or Swargadeo...",
                "Search Rang Ghar...",
                "Search Talatal Ghar...",
                "Search Kareng Ghar...",
                "Search Charaideo Maidams...",
                "Search Sivadol...",
                "Search Namdang Stone Bridge...",
              ]}
              aria-label="Search monument archive by name, Swargadeo, or historical era"
            />
          </div>
        </div>

        {/* Destination Cards Grid (3-up on desktop, 2-up on tablet, 1-up on mobile) */}
        {filteredDestinations.length === 0 ? (
          <div className="py-16 px-6 text-center bg-ivory-50 rounded-xl border border-charcoal-800/15">
            <Filter className="w-8 h-8 text-charcoal-500 mx-auto mb-3" />
            <p className="font-serif text-xl text-forest-950 mb-2">
              No historical sites match your current filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="m-btn mt-2 px-5 py-2.5 rounded-full bg-forest-950 text-ivory-100 text-[13px] font-medium"
            >
              Reset archive filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => {
              const isSaved = savedIds.includes(dest.id);
              return (
                <article
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="m-card group bg-ivory-50 border border-charcoal-800/15 hover:border-gold-600/60 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* 4:3 Photograph Frame — Uncluttered, No Text Overlay */}
                    <div className="relative aspect-[4/3] w-full bg-forest-950 m-zoom-frame border-b border-charcoal-800/10">
                      <SmartImage
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover object-center m-zoom-img"
                        fallbackTitle={dest.name}
                        fallbackCategory={dest.category}
                      />

                      {/* Subtle Bookmark Control */}
                      <button
                        onClick={(e) => onToggleSave(dest.id, e)}
                        aria-label={
                          isSaved
                            ? 'Remove from Heritage Study List'
                            : 'Save to Heritage Study List'
                        }
                        title={
                          isSaved
                            ? 'Saved in Heritage Study List'
                            : 'Save to Heritage Study List'
                        }
                        className={`m-btn absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center border ${
                          isSaved
                            ? 'bg-gold-500 text-forest-950 border-gold-400'
                            : 'bg-forest-950/80 text-ivory-100 border-gold-500/30 hover:bg-forest-950 hover:text-gold-400'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      {/* Meta Row: Category & Year Built */}
                      <div className="flex items-center justify-between gap-2 text-[13px] font-medium text-forest-800">
                        <span>{dest.category}</span>
                        <span className="text-charcoal-600">{dest.yearBuilt}</span>
                      </div>

                      {/* Title & Assamese Script */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-serif text-2xl font-medium text-forest-950 group-hover:text-forest-800 transition-colors leading-snug">
                            {dest.name}
                          </h3>
                          <span className="font-serif italic text-sm text-charcoal-600 shrink-0">
                            {dest.assameseName}
                          </span>
                        </div>
                        <p className="text-[13px] font-medium text-gold-700 mt-0.5">
                          Patron: {dest.builtBy}
                        </p>
                      </div>

                      {/* Plain, Readable 16px Body Description */}
                      <p className="text-base text-charcoal-700 leading-[1.6] line-clamp-3 font-normal">
                        {dest.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer closed with 1px hairline */}
                  <div className="px-6 py-4 border-t border-charcoal-800/10 flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-1.5 text-charcoal-600 truncate pr-3">
                      <MapPin className="w-3.5 h-3.5 text-forest-800 shrink-0" />
                      <span className="truncate">{dest.location}</span>
                    </div>

                    <span className="m-link font-medium text-forest-950 shrink-0">
                      <span>Read Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5 m-arrow" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
