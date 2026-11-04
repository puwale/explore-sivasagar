import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '../data/sivasagarData';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, MapPin } from 'lucide-react';
import { SmartImage } from './SmartImage';

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Monuments', 'Temples', 'Architecture', 'Lakes', 'UNESCO Heritage', 'Nature'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  return (
    <section id="gallery" className="py-28 sm:py-32 bg-forest-950 text-ivory-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-900 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-gold-glow">
            <Camera className="w-3.5 h-3.5 text-gold-400" />
            Visual Splendor
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory-50 font-normal tracking-tight mb-5">
            Sivasagar Photo Gallery
          </h2>
          <p className="text-ivory-300/80 text-base sm:text-lg leading-relaxed font-light">
            A photographic anthology of ancient brickwork, gilded shikharas, reflection lakes, and
            vibrant Assamese heritage.
          </p>
        </motion.div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-gold-glow scale-105'
                  : 'bg-forest-900/60 text-ivory-200 border border-gold-500/20 hover:bg-forest-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              onClick={() => setLightboxIndex(index)}
              className="group relative h-80 sm:h-88 rounded-3xl overflow-hidden bg-forest-900 border border-gold-500/20 cursor-pointer shadow-md hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-500"
            >
              <SmartImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                fallbackTitle={item.title}
                fallbackCategory={item.category}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-forest-950/85 backdrop-blur-md text-gold-300 border border-gold-500/30">
                  {item.category}
                </span>
              </div>

              {/* Enlarge Icon on hover */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-forest-950/70 border border-gold-500/40 text-gold-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-5 left-5 right-5 text-ivory-100">
                <h4 className="font-serif text-xl sm:text-2xl font-semibold text-ivory-50 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-ivory-300/80 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-950/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 p-2 rounded-full text-ivory-200 hover:text-white hover:bg-forest-800 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <div className="relative w-full max-h-[72vh] rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl bg-black">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-contain max-h-[72vh] mx-auto"
                />

                {/* Prev / Next controls */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-forest-950/80 border border-gold-500/40 text-ivory-100 hover:text-gold-400 flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-forest-950/80 border border-gold-500/40 text-ivory-100 hover:text-gold-400 flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption & Metadata */}
              <div className="mt-4 text-center max-w-2xl px-4">
                <h3 className="font-serif text-2xl font-semibold text-ivory-100">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs font-mono text-gold-400 mt-0.5">
                  {filteredItems[lightboxIndex].location} • {filteredItems[lightboxIndex].category}
                </p>
                <p className="text-sm text-ivory-200/90 font-light mt-2">
                  {filteredItems[lightboxIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
