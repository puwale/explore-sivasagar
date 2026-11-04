import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Destination } from '../data/sivasagarData';
import { Search, MapPin, ArrowRight, Bookmark, Sparkles, Filter } from 'lucide-react';
import { SmartImage } from './SmartImage';

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
      const matchesCategory =
        selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesQuery =
        searchQuery === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.assameseName.includes(searchQuery) ||
        dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [destinations, selectedCategory, searchQuery]);

  return (
    <section id="destinations" className="py-28 sm:py-32 bg-ivory-100 text-charcoal-800 relative">
      {/* Decorative Golden Top Transition */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-forest-950 to-transparent pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-800/10 border border-gold-600/30 text-forest-800 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            Curated Historical Sites
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest-950 font-normal tracking-tight mb-5 leading-tight">
            Explore Sacred & Royal Destinations
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed font-light">
            Journey through magnificent step-palaces, ancient amphitheaters, UNESCO royal burial
            mounds, and vast sacred tanks that defined 600 years of Tai-Ahom sovereignty.
          </p>
        </motion.div>

        {/* Filter Controls & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-14 space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search monuments, temples, or lakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-14 py-3 rounded-full bg-white border border-charcoal-200/90 text-charcoal-800 text-sm focus:outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-800/15 shadow-sm transition-all placeholder:text-charcoal-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? 'bg-forest-800 text-ivory-100 shadow-md scale-105 font-semibold'
                      : 'bg-white/90 text-charcoal-600 hover:bg-forest-800/10 hover:text-forest-900 border border-charcoal-200/70'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-2xl border border-charcoal-200">
            <Filter className="w-10 h-10 text-charcoal-400 mx-auto mb-3" />
            <p className="text-lg font-serif text-charcoal-700">No destinations match your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-forest-800 underline hover:text-gold-600"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredDestinations.map((dest, idx) => {
              const isSaved = savedIds.includes(dest.id);
              return (
                <motion.article
                  key={dest.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.12 }}
                  onClick={() => onSelectDestination(dest)}
                  className="group bg-white rounded-3xl overflow-hidden border border-charcoal-200/80 shadow-sm hover:shadow-luxury hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col relative"
                >
                  {/* Card Image Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-forest-950">
                    <SmartImage
                      src={dest.heroImage}
                      alt={`${dest.name} - ${dest.assameseName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.95] group-hover:brightness-105"
                      fallbackTitle={dest.name}
                      fallbackCategory={dest.category}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-black/20 pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-forest-900/85 backdrop-blur-md text-gold-300 border border-gold-500/30 shadow-md">
                        {dest.category}
                      </span>
                    </div>

                    {/* Save / Bookmark Button */}
                    <button
                      onClick={(e) => onToggleSave(dest.id, e)}
                      aria-label={isSaved ? 'Remove from saved' : 'Save to itinerary'}
                      className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                        isSaved
                          ? 'bg-gold-500 text-forest-950 shadow-gold-glow scale-105'
                          : 'bg-charcoal-900/60 text-white hover:bg-forest-900 hover:text-gold-300'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    {/* Bottom overlay inside image: Assamese title & year */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-baseline justify-between text-ivory-100">
                      <span className="text-xs font-serif italic text-gold-300">
                        {dest.assameseName}
                      </span>
                      <span className="text-[11px] font-mono tracking-wider opacity-85">
                        {dest.yearBuilt}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Tagline */}
                      <h3 className="font-serif text-2xl font-semibold text-forest-950 group-hover:text-forest-700 transition-colors mb-1.5 leading-snug">
                        {dest.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
                        {dest.tagline}
                      </p>

                      {/* Short Description */}
                      <p className="text-charcoal-600 text-sm line-clamp-2 leading-relaxed mb-4 font-light">
                        {dest.shortDescription}
                      </p>
                    </div>

                    {/* Meta info & CTA footer */}
                    <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-500">
                        <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                        <span className="truncate max-w-[170px]">{dest.location}</span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-forest-800 group-hover:text-gold-600 transition-colors uppercase tracking-wider">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
