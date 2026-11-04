import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Destination } from '../data/sivasagarData';
import { X, Trash2, MapPin, Clock, Compass, Navigation } from 'lucide-react';

interface TripPlannerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedDestinations: Destination[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onSelectDestination: (dest: Destination) => void;
}

export const TripPlannerDrawer: React.FC<TripPlannerDrawerProps> = ({
  isOpen,
  onClose,
  savedDestinations,
  onRemove,
  onClearAll,
  onSelectDestination,
}) => {
  const totalDestinations = savedDestinations.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-ivory-50 border-l border-gold-500/30 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-forest-950 text-ivory-100 flex items-center justify-between border-b border-gold-500/20">
                <div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-gold-400" />
                    <h2 className="font-serif text-xl font-semibold">Saved Sivasagar Itinerary</h2>
                  </div>
                  <p className="text-xs text-ivory-300/80 mt-1">
                    {totalDestinations} {totalDestinations === 1 ? 'place' : 'places'} bookmarked
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-forest-900 text-ivory-300 hover:text-white transition-colors"
                  aria-label="Close itinerary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {savedDestinations.length === 0 ? (
                  <div className="text-center py-20 px-4 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-forest-800/10 text-forest-800 flex items-center justify-center mx-auto">
                      <Compass className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-xl text-forest-950 font-semibold">
                      Your Itinerary is Empty
                    </h3>
                    <p className="text-sm text-charcoal-500 max-w-xs mx-auto">
                      Click the bookmark icon on any destination card to curate your personalized
                      Sivasagar heritage route.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-2 border-b border-charcoal-200">
                      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                        Your Curated Places
                      </span>
                      <button
                        onClick={onClearAll}
                        className="text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {savedDestinations.map((dest, index) => (
                        <div
                          key={dest.id}
                          className="group bg-white rounded-2xl p-4 border border-charcoal-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3 relative"
                        >
                          <span className="w-6 h-6 rounded-full bg-forest-900 text-gold-400 text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>

                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => {
                              onClose();
                              onSelectDestination(dest);
                            }}
                          >
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-700">
                              {dest.category}
                            </span>
                            <h4 className="font-serif text-lg font-semibold text-forest-950 group-hover:text-forest-700 transition-colors">
                              {dest.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mt-1">
                              <MapPin className="w-3 h-3 text-forest-700" />
                              <span className="truncate">{dest.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mt-0.5">
                              <Clock className="w-3 h-3 text-forest-700" />
                              <span>Duration: {dest.visitorInfo.idealDuration}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemove(dest.id)}
                            className="p-1.5 text-charcoal-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Remove from itinerary"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Footer Actions */}
              {savedDestinations.length > 0 && (
                <div className="p-6 bg-white border-t border-charcoal-200 space-y-3">
                  <a
                    href={`https://www.google.com/maps/dir/${savedDestinations
                      .map((d) => `${d.coordinates[0]},${d.coordinates[1]}`)
                      .join('/')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-forest-900 text-ivory-100 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-forest-800 transition-colors shadow-sm"
                  >
                    <Navigation className="w-4 h-4 text-gold-400" />
                    <span>Open Multi-Stop Route in Maps</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-2xl border border-charcoal-300 text-charcoal-700 text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-50 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
