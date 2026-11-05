import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from './data/sivasagarData';
import type { Destination } from './data/sivasagarData';
import { Hero } from './components/Hero';
import { ExploreDestinations } from './components/ExploreDestinations';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { HeritageSection } from './components/HeritageSection';
import { InteractiveMap } from './components/InteractiveMap';
import { ExperiencesSection } from './components/ExperiencesSection';
import { TravelGuideSection } from './components/TravelGuideSection';
import { PhotoGallery } from './components/PhotoGallery';
import { TripPlannerDrawer } from './components/TripPlannerDrawer';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { FloatingDock, HERITAGE_DOCK_ITEMS } from '@/components/ui/floating-dock';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

export function App() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sivasagar_saved_places');
      return saved ? JSON.parse(saved) : ['rang-ghar', 'charaideo-maidam', 'sivadol'];
    } catch {
      return ['rang-ghar', 'charaideo-maidam', 'sivadol'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sivasagar_saved_places', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveSaved = (id: string) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllSaved = () => {
    setSavedIds([]);
  };

  const savedDestinations = DESTINATIONS.filter((d) => savedIds.includes(d.id));

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-charcoal-800 font-sans selection:bg-gold-500/25 selection:text-forest-950 overflow-x-hidden">
      {/* NO TOP NAVBAR - The page starts directly from the top */}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Full-bleed Hero Section Starting at the Very Top */}
        <Hero
          onExploreDestinations={() => handleNavigate('destinations')}
          onDiscoverHeritage={() => handleNavigate('heritage')}
        />

        {/* Explore Destinations Grid */}
        <ExploreDestinations
          destinations={DESTINATIONS}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />

        {/* Heritage of Ahom Kingdom with Interactive Timeline */}
        <HeritageSection />

        {/* Interactive Leaflet Map with verified coordinates */}
        <InteractiveMap
          onSelectDestination={(dest) => setSelectedDestination(dest)}
        />

        {/* Experiences & Local Gastronomy */}
        <ExperiencesSection />

        {/* Travel Guide, Sightseeing Routes & FAQs */}
        <TravelGuideSection />

        {/* Immersive Photo Gallery & Lightbox */}
        <PhotoGallery />
      </main>

      {/* Cinematic Motion Footer */}
      <CinematicFooter onNavigate={handleNavigate} />

      {/* Dedicated Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onSelectRelated={(dest) => setSelectedDestination(dest)}
        allDestinations={DESTINATIONS}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Trip Planner Drawer */}
      <TripPlannerDrawer
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        savedDestinations={savedDestinations}
        onRemove={handleRemoveSaved}
        onClearAll={handleClearAllSaved}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
      />

      {/* Persistent heritage navigation dock */}
      <FloatingDock items={HERITAGE_DOCK_ITEMS} />

      {/* Sleek Floating Luxury Itinerary Pill (Bottom Right) */}
      <aside aria-label="Quick itinerary access" className="fixed bottom-6 right-6 z-40">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlannerOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-forest-950/90 text-ivory-100 border border-gold-500/40 shadow-2xl backdrop-blur-md hover:border-gold-400 hover:bg-forest-900 transition-all duration-300"
          title="Open Saved Itinerary"
        >
          <div className="relative">
            <Bookmark className="w-4 h-4 text-gold-400 fill-gold-400" />
            {savedIds.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold-500 text-forest-950 text-[10px] font-bold flex items-center justify-center">
                {savedIds.length}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase font-display hidden sm:inline text-ivory-100">
            Curated Itinerary
          </span>
        </motion.button>
      </aside>
    </div>
  );
}

export default App;
