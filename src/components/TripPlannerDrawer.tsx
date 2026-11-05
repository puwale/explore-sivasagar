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
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-screen max-w-md bg-ivory-50 border-l border-gold-500/30 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-forest-950 text-ivory-100 flex items-center justify-between border-b border-gold-500/20">
                <div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-gold-400" />
                    <h2 className="font-serif text-2xl font-normal">Saved Heritage Study List</h2>
                  </div>
                  <p className="text-[13px] text-charcoal-400 mt-1">
                    {totalDestinations} {totalDestinations === 1 ? 'monument' : 'monuments'}{' '}
                    bookmarked for study &amp; route planning
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="m-btn p-2 rounded-full bg-forest-900 text-ivory-200 hover:text-white"
                  aria-label="Close study list"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">
                {savedDestinations.length === 0 ? (
                  <div className="text-center py-20 px-4 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-forest-950/10 text-forest-800 flex items-center justify-center mx-auto">
                      <Compass className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl text-forest-950 font-medium">
                      Your Study List is Empty
                    </h3>
                    <p className="text-[15px] text-charcoal-600 max-w-xs mx-auto leading-[1.6]">
                      Click the bookmark icon on any historical monument card to compile your
                      personal Sivasagar study route.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-charcoal-800/15 text-[13px]">
                      <span className="font-medium text-charcoal-600">
                        Bookmarked Historical Sites
                      </span>
                      <button
                        onClick={onClearAll}
                        className="text-rose-700 hover:text-rose-900 font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="divide-y divide-charcoal-800/15 border-b border-charcoal-800/15">
                      {savedDestinations.map((dest, index) => (
                        <div
                          key={dest.id}
                          className="py-4 flex items-start gap-3.5 group"
                        >
                          <span className="text-[13px] font-medium text-forest-800 mt-1 shrink-0">
                            0{index + 1}.
                          </span>

                          <div
                            className="flex-1 cursor-pointer space-y-1"
                            onClick={() => {
                              onClose();
                              onSelectDestination(dest);
                            }}
                          >
                            <span className="text-[13px] font-medium text-gold-700 block">
                              {dest.category} • {dest.yearBuilt}
                            </span>
                            <h4 className="font-serif text-xl font-medium text-forest-950 group-hover:text-forest-800 transition-colors">
                              {dest.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[13px] text-charcoal-600">
                              <MapPin className="w-3.5 h-3.5 text-forest-800 shrink-0" />
                              <span className="truncate">{dest.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[13px] text-charcoal-600">
                              <Clock className="w-3.5 h-3.5 text-forest-800 shrink-0" />
                              <span>Study Duration: {dest.visitorInfo.idealDuration}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemove(dest.id)}
                            className="m-btn p-1.5 text-charcoal-500 hover:text-rose-700 rounded-lg"
                            title="Remove from study list"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {savedDestinations.length > 0 && (
                <div className="p-6 bg-ivory-100 border-t border-charcoal-800/15 space-y-3">
                  <a
                    href={`https://www.google.com/maps/dir/${savedDestinations
                      .map((d) => `${d.coordinates[0]},${d.coordinates[1]}`)
                      .join('/')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-btn w-full h-12 rounded-full bg-forest-950 text-ivory-100 font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-forest-800"
                  >
                    <Navigation className="w-4 h-4 text-gold-400" />
                    <span>Open Multi-Site Circuit in Google Maps</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="m-btn w-full h-11 rounded-full border border-charcoal-800/20 text-charcoal-800 text-[14px] font-medium hover:bg-ivory-200/60"
                  >
                    Continue Reading Archive
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
