import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Destination } from '../data/sivasagarData';
import { SmartImage } from './SmartImage';
import {
  X,
  MapPin,
  Clock,
  Ticket,
  Calendar,
  Compass,
  Navigation,
  CheckCircle2,
  Bookmark,
  Share2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSelectRelated: (dest: Destination) => void;
  allDestinations: Destination[];
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onSelectRelated,
  allDestinations,
  isSaved,
  onToggleSave,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    // Lock scroll on body when modal is open
    if (destination) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [destination]);

  const images = destination
    ? destination.gallery.length > 0
      ? destination.gallery
      : [destination.heroImage]
    : [];

  const handleShare = () => {
    if (!destination) return;
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} — Explore Sivasagar`,
        text: destination.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const related = destination
    ? allDestinations.filter((d) => d.id !== destination.id).slice(0, 3)
    : [];

  const googleMapsUrl = destination
    ? `https://www.google.com/maps/search/?api=1&query=${destination.coordinates[0]},${destination.coordinates[1]}`
    : '';

  return (
    <AnimatePresence>
      {destination && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 lg:p-6">
          {/* Background backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Main Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl bg-ivory-50 rounded-3xl shadow-2xl overflow-hidden border border-gold-500/25 max-h-[92vh] flex flex-col"
          >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-forest-950/90 text-ivory-100 backdrop-blur-md border-b border-gold-500/20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/30">
              {destination.category}
            </span>
            <span className="text-xs font-serif italic text-ivory-300 hidden sm:inline">
              {destination.assameseName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save to Itinerary */}
            <button
              onClick={(e) => onToggleSave(destination.id, e)}
              className={`p-2 rounded-full border transition-all ${
                isSaved
                  ? 'bg-gold-500 text-forest-950 border-gold-400 shadow-gold-glow'
                  : 'bg-forest-900/60 border-gold-500/30 text-ivory-200 hover:text-gold-300'
              }`}
              title={isSaved ? 'Saved in itinerary' : 'Save to itinerary'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-forest-900/60 border border-gold-500/30 text-ivory-200 hover:text-gold-300 transition-all relative"
              title="Share destination"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-gold-500 text-forest-950 font-bold px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-forest-900/80 border border-forest-700 text-ivory-200 hover:text-white hover:bg-forest-800 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-10">
          {/* Hero Gallery Section */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-forest-950 shadow-luxury">
              <SmartImage
                src={images[activeImageIndex]}
                alt={`${destination.name} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-500"
                fallbackTitle={destination.name}
                fallbackCategory={destination.category}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Navigation Arrows if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-forest-950/60 text-ivory-100 hover:bg-forest-950 hover:text-gold-300 flex items-center justify-center backdrop-blur-sm transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-forest-950/60 text-ivory-100 hover:bg-forest-950 hover:text-gold-300 flex items-center justify-center backdrop-blur-sm transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Title Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-ivory-100">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight drop-shadow-md">
                    {destination.name}
                  </h1>
                  <p className="text-gold-400 font-serif italic text-base sm:text-lg">
                    {destination.tagline}
                  </p>
                </div>
                <div className="text-xs bg-forest-950/80 px-3 py-1.5 rounded-lg border border-gold-500/30 backdrop-blur-md self-start sm:self-auto">
                  <span className="text-gold-400 font-bold">{destination.yearBuilt}</span> • {destination.builtBy}
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-gold-500 scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-charcoal-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-forest-800 text-xs font-semibold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-gold-600" />
                Visiting Hours
              </div>
              <p className="text-sm font-semibold text-charcoal-900">{destination.visitorInfo.timings}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-charcoal-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-forest-800 text-xs font-semibold uppercase tracking-wider mb-1">
                <Ticket className="w-3.5 h-3.5 text-gold-600" />
                Entry Fee
              </div>
              <p className="text-sm font-semibold text-charcoal-900">{destination.visitorInfo.entryFee.indian}</p>
              <p className="text-[11px] text-charcoal-500">Foreigners: {destination.visitorInfo.entryFee.foreign}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-charcoal-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-forest-800 text-xs font-semibold uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-gold-600" />
                Best Time
              </div>
              <p className="text-sm font-semibold text-charcoal-900">{destination.visitorInfo.bestTimeToVisit}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-charcoal-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-forest-800 text-xs font-semibold uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5 text-gold-600" />
                Ideal Duration
              </div>
              <p className="text-sm font-semibold text-charcoal-900">{destination.visitorInfo.idealDuration}</p>
            </div>
          </div>

          {/* Verified Historical Fact Callout */}
          <div className="p-5 rounded-2xl bg-forest-900 text-ivory-100 border border-gold-500/40 relative overflow-hidden shadow-luxury">
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0 text-gold-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-1 flex items-center gap-1.5 font-display">
                  <span>Verified Historical Fact</span>
                  <span className="text-[10px] text-ivory-300 font-sans tracking-normal">• Archaeological Survey of India (ASI)</span>
                </h4>
                <p className="text-sm sm:text-base text-ivory-100 font-light leading-relaxed">
                  {destination.verifiedFact}
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Content: History & Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (2 Cols): History & Architecture */}
            <div className="lg:col-span-2 space-y-8">
              {/* Historical Background */}
              <section>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-950 mb-4 pb-2 border-b border-charcoal-200">
                  Historical Background
                </h2>
                <div className="space-y-4 text-charcoal-700 font-light leading-relaxed text-base">
                  {destination.historicalBackground.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Architectural Information */}
              <section className="p-6 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <h3 className="font-serif text-xl font-semibold text-forest-950">
                    Architectural & Engineering Marvel
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pb-4 border-b border-charcoal-100">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-charcoal-400 font-semibold mb-0.5">
                      Architectural Style
                    </span>
                    <span className="font-medium text-forest-900">{destination.architecturalDetails.style}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-charcoal-400 font-semibold mb-0.5">
                      Key Construction Materials
                    </span>
                    <span className="font-medium text-forest-900">{destination.architecturalDetails.materials}</span>
                  </div>
                </div>

                {destination.architecturalDetails.dimensions && (
                  <p className="text-xs text-charcoal-500 font-mono">
                    <strong className="text-charcoal-700">Dimensions:</strong> {destination.architecturalDetails.dimensions}
                  </p>
                )}

                <div>
                  <span className="block text-xs uppercase tracking-wider text-charcoal-500 font-semibold mb-2">
                    Key Structural Highlights:
                  </span>
                  <ul className="space-y-2">
                    {destination.architecturalDetails.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Cultural Significance */}
              <section>
                <h3 className="font-serif text-2xl font-semibold text-forest-950 mb-3">
                  Cultural Significance
                </h3>
                <p className="text-charcoal-700 font-light leading-relaxed text-base bg-ivory-100 p-5 rounded-xl border-l-4 border-forest-800">
                  {destination.culturalSignificance}
                </p>
              </section>

              {/* Practical Travel Tips */}
              <section>
                <h3 className="font-serif text-2xl font-semibold text-forest-950 mb-3">
                  Practical Travel Tips
                </h3>
                <ul className="space-y-2.5">
                  {destination.travelTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-charcoal-200/60 text-sm text-charcoal-700">
                      <Info className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Column (1 Col): Location, Directions & Nearby */}
            <div className="space-y-6">
              {/* Location Card */}
              <div className="p-6 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-forest-900 font-serif text-lg font-semibold">
                  <MapPin className="w-5 h-5 text-forest-700" />
                  Location & Map
                </div>

                <div className="space-y-1 text-sm text-charcoal-700">
                  <p className="font-medium text-forest-950">{destination.location}</p>
                  <p className="text-xs text-charcoal-500">{destination.distanceFromTown}</p>
                  <p className="text-xs font-mono text-charcoal-400 mt-1">
                    Coordinates: {destination.coordinates[0].toFixed(4)}°N, {destination.coordinates[1].toFixed(4)}°E
                  </p>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-ivory-100 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-gold-400" />
                  <span>Get Directions in Google Maps</span>
                </a>
              </div>

              {/* Nearby Attractions */}
              <div className="p-6 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm space-y-4">
                <h4 className="font-serif text-lg font-semibold text-forest-950">
                  Nearby Attractions
                </h4>
                <div className="space-y-3">
                  {destination.nearbyAttractions.map((nearby, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-ivory-100/70 border border-charcoal-200/60 space-y-1">
                      <div className="flex items-center justify-between text-sm font-semibold text-forest-950">
                        <span>{nearby.name}</span>
                        <span className="text-xs text-gold-700 bg-gold-400/20 px-2 py-0.5 rounded-full font-mono">
                          {nearby.distance}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-600">{nearby.brief}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dress Code & Etiquette Notice */}
              {destination.visitorInfo.dressCode && (
                <div className="p-4 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-600 space-y-1">
                  <div className="font-semibold text-charcoal-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-gold-600" />
                    Visitor Etiquette
                  </div>
                  <p>{destination.visitorInfo.dressCode}</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Destinations Carousel / Grid */}
          <div className="pt-8 border-t border-charcoal-200">
            <h3 className="font-serif text-2xl font-semibold text-forest-950 mb-6">
              More Historic Places to Discover
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="group bg-white rounded-xl overflow-hidden border border-charcoal-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={rel.gallery[0] || rel.heroImage}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-forest-950/80 text-[10px] text-gold-400 font-semibold uppercase">
                      {rel.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-lg font-semibold text-forest-950 group-hover:text-gold-600 transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-charcoal-500 truncate mt-1">{rel.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 bg-white border-t border-charcoal-200 flex items-center justify-between text-xs text-charcoal-500">
          <span>Explore Sivasagar Heritage Portal</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-forest-900 text-ivory-100 hover:bg-forest-800 transition-colors font-semibold uppercase tracking-wider"
          >
            Back to All Places
          </button>
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
};
