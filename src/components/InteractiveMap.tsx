import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { DESTINATIONS } from '../data/sivasagarData';
import type { Destination } from '../data/sivasagarData';
import { MapPin, Navigation, Sparkles, Info } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface InteractiveMapProps {
  onSelectDestination: (dest: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectDestination }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPlace, setSelectedPlace] = useState<Destination | null>(DESTINATIONS[0]);

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

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: [26.9750, 94.6500],
      zoom: 11,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    const createCustomIcon = (category: string, isSelected: boolean) => {
      let pinColor = '#173B32';
      if (category === 'UNESCO Heritage') pinColor = '#C6A56B';
      else if (category === 'Royal Palace' || category === 'Amphitheatre') pinColor = '#AB894E';
      else if (category === 'Sacred Lake' || category === 'Wildlife & Nature') pinColor = '#2A6657';

      const size = isSelected ? 42 : 34;

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: ${pinColor};
            border: 2px solid #FFFFFF;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <div style="
              width: ${size * 0.4}px;
              height: ${size * 0.4}px;
              background: #F5F1E8;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
      });
    };

    markersRef.current = {};
    DESTINATIONS.forEach((dest) => {
      const marker = L.marker(dest.coordinates, {
        icon: createCustomIcon(dest.category, false),
      }).addTo(map);

      const popupHtml = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; width: 230px;">
          <img src="${dest.heroImage}" alt="${dest.name}" style="width: 100%; height: 110px; object-fit: cover;" />
          <div style="padding: 12px;">
            <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #C6A56B; font-weight: 700;">${dest.category}</span>
            <h4 style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin: 2px 0 4px 0;">${dest.name}</h4>
            <p style="font-size: 11px; color: #EAE3D2; margin: 0 0 8px 0; line-height: 1.3;">${dest.tagline}</p>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(198,165,107,0.25); padding-top: 8px;">
              <span style="font-size: 10px; color: #C6A56B;">${dest.yearBuilt}</span>
              <a href="https://www.google.com/maps/search/?api=1&query=${dest.coordinates[0]},${dest.coordinates[1]}" target="_blank" rel="noopener noreferrer" style="font-size: 10px; font-weight: 600; color: #F5F1E8; text-decoration: underline;">Directions →</a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedPlace(dest);
      });

      markersRef.current[dest.id] = marker;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    DESTINATIONS.forEach((dest) => {
      const marker = markersRef.current[dest.id];
      if (!marker) return;

      const shouldShow = activeCategory === 'All' || dest.category === activeCategory;
      if (shouldShow) {
        if (!mapInstanceRef.current?.hasLayer(marker)) {
          marker.addTo(mapInstanceRef.current!);
        }
      } else {
        if (mapInstanceRef.current?.hasLayer(marker)) {
          marker.remove();
        }
      }
    });
  }, [activeCategory]);

  const handleFocusPlace = (dest: Destination) => {
    setSelectedPlace(dest);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(dest.coordinates, 14, {
        duration: 1.2,
      });
      const marker = markersRef.current[dest.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const filteredPlaces = DESTINATIONS.filter(
    (d) => activeCategory === 'All' || d.category === activeCategory
  );

  return (
    <section id="map" className="py-28 sm:py-32 bg-ivory-50 text-charcoal-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-800/10 border border-gold-600/30 text-forest-800 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            Cartographic Exploration
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest-950 font-normal tracking-tight mb-5">
            Interactive Sivasagar Map
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed font-light">
            Locate historic monuments, sacred temples, UNESCO royal burial maidams, and water
            reservoirs plotted on verified geographical coordinates.
          </p>
        </motion.div>

        {/* Category Filters for Map */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-forest-800 text-ivory-100 shadow-md font-semibold'
                  : 'bg-white text-charcoal-600 border border-charcoal-200 hover:bg-forest-900/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Map & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Leaflet Map Container (8 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 bg-white p-3 sm:p-4 rounded-3xl border border-charcoal-200/80 shadow-luxury overflow-hidden"
          >
            <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-full" />

              <div className="absolute top-4 left-4 z-[400] bg-forest-950/90 text-ivory-100 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-gold-500/30 shadow-md flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Showing {filteredPlaces.length} verified heritage coordinates</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Selection & Place Details Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {selectedPlace && (
              <motion.div
                key={selectedPlace.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-6 border border-charcoal-200/80 shadow-sm space-y-4"
              >
                <div className="relative h-44 rounded-2xl overflow-hidden bg-forest-950">
                  <SmartImage
                    src={selectedPlace.heroImage}
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover"
                    fallbackTitle={selectedPlace.name}
                    fallbackCategory={selectedPlace.category}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-forest-900/90 text-gold-400 text-[10px] font-bold uppercase tracking-wider">
                    {selectedPlace.category}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif text-2xl font-semibold text-forest-950">
                      {selectedPlace.name}
                    </h3>
                    <span className="text-xs text-charcoal-500 font-mono">
                      {selectedPlace.yearBuilt}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-2">
                    {selectedPlace.tagline}
                  </p>
                  <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed mb-4">
                    {selectedPlace.shortDescription}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-charcoal-600 pb-2 border-b border-charcoal-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>{selectedPlace.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>Timings: {selectedPlace.visitorInfo.timings}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onSelectDestination(selectedPlace)}
                    className="flex-1 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-ivory-100 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm text-center"
                  >
                    View Full Details
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.coordinates[0]},${selectedPlace.coordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl border border-charcoal-300 hover:border-gold-500 text-charcoal-700 hover:text-gold-600 transition-colors"
                    title="Directions in Google Maps"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}

            <div className="bg-white rounded-3xl p-5 border border-charcoal-200/80 shadow-sm">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-3 px-2">
                Click to Jump to Location
              </h4>
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {filteredPlaces.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => handleFocusPlace(dest)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                      selectedPlace?.id === dest.id
                        ? 'bg-forest-800 text-ivory-100 font-semibold'
                        : 'text-charcoal-700 hover:bg-forest-50'
                    }`}
                  >
                    <span className="truncate">{dest.name}</span>
                    <span className="text-[10px] opacity-75 font-mono ml-2 shrink-0">
                      {dest.category.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
