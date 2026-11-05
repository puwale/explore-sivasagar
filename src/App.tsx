import React, { useState, useEffect, lazy, Suspense } from 'react';
import { DESTINATIONS } from './data/sivasagarData';
import type { Destination } from './data/sivasagarData';
import { Hero } from './components/Hero';
import { ExploreDestinations } from './components/ExploreDestinations';
import { HeritageSection } from './components/HeritageSection';
import { HistoricalDiscoveriesSection } from './components/HistoricalDiscoveriesSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { TravelGuideSection } from './components/TravelGuideSection';
import { PhotoGallery } from './components/PhotoGallery';
import { TripPlannerDrawer } from './components/TripPlannerDrawer';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { FloatingDock, type FloatingDockItem } from '@/components/ui/floating-dock';
import { Bookmark, Compass, Home, Landmark, Scroll, Map, Image as ImageIcon } from 'lucide-react';

// Lazy-loaded heavy modules for optimal initial load performance
const InteractiveMap = lazy(() =>
  import('./components/InteractiveMap').then((m) => ({ default: m.InteractiveMap }))
);

const DestinationDetailModal = lazy(() =>
  import('./components/DestinationDetailModal').then((m) => ({ default: m.DestinationDetailModal }))
);

function MapFallback() {
  return (
    <section id="map" className="py-24 sm:py-32 bg-ivory-100 text-charcoal-800 border-b border-charcoal-800/10">
      <div className="wrap-museum">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-charcoal-800/15 mb-10">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[13px] font-medium text-forest-800 block">
              04 / Cartographic Heritage Survey
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest-950 font-normal tracking-[-0.02em] leading-[1.1]">
              Interactive Historical Map of Sivasagar
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-charcoal-700 leading-[1.65] font-normal">
              Spatial distribution of the Ahom royal capitals—from central Sivadol and Borpukhuri to the citadel of Rangpur and Charaideo.
            </p>
          </div>
        </div>

        <div className="h-[600px] w-full rounded-2xl bg-ivory-50 border border-charcoal-800/15 flex flex-col items-center justify-center p-6 text-center shadow-luxury">
          <div className="w-14 h-14 rounded-full bg-forest-950/10 border border-gold-500/30 flex items-center justify-center mb-4 text-forest-950 animate-pulse">
            <Compass className="w-7 h-7 text-gold-700" />
          </div>
          <h3 className="font-serif text-xl font-medium text-forest-950 mb-1">
            Loading Cartographic Survey...
          </h3>
          <p className="text-sm text-charcoal-600 max-w-sm">
            Initializing satellite and terrain cartography for Sivasagar monuments and hydraulic networks.
          </p>
        </div>
      </div>
    </section>
  );
}

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

  const dockItems: FloatingDockItem[] = [
    {
      title: 'Home',
      icon: <Home className="w-full h-full" />,
      href: '#home',
      onClick: (e) => {
        e.preventDefault();
        handleNavigate('home');
      },
    },
    {
      title: 'Explore Destinations',
      icon: <Landmark className="w-full h-full" />,
      href: '#destinations',
      onClick: (e) => {
        e.preventDefault();
        handleNavigate('destinations');
      },
    },
    {
      title: 'Ahom Heritage',
      icon: <Scroll className="w-full h-full" />,
      href: '#heritage',
      onClick: (e) => {
        e.preventDefault();
        handleNavigate('heritage');
      },
    },
    {
      title: 'Interactive Map',
      icon: <Map className="w-full h-full" />,
      href: '#map',
      onClick: (e) => {
        e.preventDefault();
        handleNavigate('map');
      },
    },
    {
      title: 'Photo Gallery',
      icon: <ImageIcon className="w-full h-full" />,
      href: '#gallery',
      onClick: (e) => {
        e.preventDefault();
        handleNavigate('gallery');
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-charcoal-800 font-sans selection:bg-gold-500/25 selection:text-forest-950 overflow-x-hidden">
      {/* NO TOP NAVBAR - The page starts directly from the top */}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Full-bleed Hero Section Starting at the Very Top */}
        <Hero
          onExploreDestinations={() => handleNavigate('destinations')}
          onDiscoverHeritage={() => handleNavigate('heritage')}
        />

        {/* Dedicated Sivasagar Heritage Collection */}
        <ExploreDestinations
          destinations={DESTINATIONS}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />

        {/* History of the Ahom Kingdom with Monograph Chapters & 10-Epoch Timeline */}
        <HeritageSection />

        {/* Historical Facts, Engineering Marvels & Archaeological Discoveries */}
        <HistoricalDiscoveriesSection />

        {/* Interactive Leaflet Map with Differentiated Category Markers & Legend (Lazy Loaded) */}
        <Suspense fallback={<MapFallback />}>
          <InteractiveMap onSelectDestination={(dest) => setSelectedDestination(dest)} />
        </Suspense>

        {/* Culture, People & Living Traditions of Sivasagar */}
        <ExperiencesSection />

        {/* Visitor Reference Guide, Study Circuits & FAQs */}
        <TravelGuideSection />

        {/* Historical Photo Gallery & Archival Lightbox */}
        <PhotoGallery />
      </main>

      {/* Cinematic Motion Footer */}
      <CinematicFooter onNavigate={handleNavigate} />

      {/* Dedicated Destination Historical Monograph Modal (Lazy Loaded) */}
      {selectedDestination && (
        <Suspense fallback={null}>
          <DestinationDetailModal
            destination={selectedDestination}
            onClose={() => setSelectedDestination(null)}
            onSelectRelated={(dest) => setSelectedDestination(dest)}
            allDestinations={DESTINATIONS}
            isSaved={savedIds.includes(selectedDestination.id)}
            onToggleSave={handleToggleSave}
          />
        </Suspense>
      )}

      {/* Saved Heritage Study List Drawer */}
      <TripPlannerDrawer
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        savedDestinations={savedDestinations}
        onRemove={handleRemoveSaved}
        onClearAll={handleClearAllSaved}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
      />

      {/* Floating Heritage Navigation Dock (Bottom Center) */}
      <FloatingDock items={dockItems} />

      {/* Sleek Floating Study List Pill (Bottom Right) */}
      <aside aria-label="Quick study list access" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsPlannerOpen(true)}
          className="m-btn relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-forest-950/95 text-ivory-100 border border-gold-500/40 shadow-luxury hover:border-gold-400 hover:bg-forest-900"
          title="Open Saved Heritage Study List"
        >
          <div className="relative">
            <Bookmark className="w-4 h-4 text-gold-400 fill-gold-400" />
            {savedIds.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold-500 text-forest-950 text-[11px] font-semibold flex items-center justify-center">
                {savedIds.length}
              </span>
            )}
          </div>
          <span className="text-[13px] font-medium hidden sm:inline text-ivory-100">
            Heritage Study List
          </span>
        </button>
      </aside>
    </div>
  );
}

export default App;
