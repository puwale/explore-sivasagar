import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { DESTINATIONS } from '../data/sivasagarData';
import type { Destination } from '../data/sivasagarData';
import { MapPin, Navigation, Landmark, RotateCcw, ArrowRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface InteractiveMapProps {
  onSelectDestination: (dest: Destination) => void;
}

const getCategoryColor = (category: Destination['category']): string => {
  switch (category) {
    case 'UNESCO Heritage':
      return '#C6A56B'; // Antique Gold
    case 'Royal Palace':
    case 'Amphitheatre':
      return '#9A6B2F'; // Royal Bronze
    case 'Ancient Temple':
      return '#B45309'; // Terracotta Shrine
    case 'Sacred Lake':
      return '#1D6A7A'; // Artesian Teal
    case 'Engineering Marvel':
    case 'Museum & Culture':
      return '#12382D'; // Deep Heritage Forest
    case 'Wildlife & Nature':
      return '#2E6F40'; // Sanctuary Green
    default:
      return '#12382D';
  }
};

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

  const legendItems = [
    { label: 'UNESCO Maidams', color: '#C6A56B' },
    { label: 'Royal Palaces & Pavilion', color: '#9A6B2F' },
    { label: 'Ancient Temples (Dols)', color: '#B45309' },
    { label: 'Sacred Lakes (Pukhuris)', color: '#1D6A7A' },
    { label: 'Monuments & Museums', color: '#12382D' },
    { label: 'Wetlands & Nature', color: '#2E6F40' },
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: [26.975, 94.65],
      zoom: 11,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    const createCustomIcon = (category: Destination['category'], isSelected: boolean) => {
      const pinColor = getCategoryColor(category);
      const size = isSelected ? 40 : 34;

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: ${pinColor};
            border: 2.5px solid #F4EFE5;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 5px 14px rgba(7, 27, 22, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <div style="
              width: ${size * 0.38}px;
              height: ${size * 0.38}px;
              background: #F4EFE5;
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
        <div style="font-family: 'Instrument Sans', system-ui, sans-serif; width: 245px;">
          <img src="${dest.heroImage}" alt="${dest.name}" style="width: 100%; height: 118px; object-fit: cover;" />
          <div style="padding: 12px;">
            <span style="font-size: 11px; color: #C6A56B; font-weight: 600;">${dest.category} • ${dest.yearBuilt}</span>
            <h4 style="font-size: 16px; font-weight: 600; color: #F4EFE5; margin: 3px 0 4px 0;">${dest.name}</h4>
            <p style="font-size: 13px; color: #D8D0C1; margin: 0 0 8px 0; line-height: 1.4;">${dest.shortDescription.slice(0, 105)}...</p>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(198,165,107,0.25); padding-top: 8px;">
              <span style="font-size: 12px; color: #C6A56B;">${dest.builtBy.split('(')[0]}</span>
              <a href="https://www.google.com/maps/search/?api=1&query=${dest.coordinates[0]},${dest.coordinates[1]}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; font-weight: 600; color: #F4EFE5; text-decoration: underline;">Google Maps →</a>
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
        duration: 1.1,
      });
      const marker = markersRef.current[dest.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const handleResetMapView = () => {
    setActiveCategory('All');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.closePopup();
      mapInstanceRef.current.flyTo([26.975, 94.65], 11, {
        duration: 1.0,
      });
    }
  };

  const filteredPlaces = DESTINATIONS.filter(
    (d) => activeCategory === 'All' || d.category === activeCategory
  );

  return (
    <section
      id="map"
      className="py-24 sm:py-32 bg-ivory-100 text-charcoal-800 border-b border-charcoal-800/10"
    >
      <div className="wrap-museum">
        {/* 12-Column Museum Header Split */}
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
              Spatial distribution of the Ahom royal capitals—from central Sivadol and Borpukhuri to
              the citadel of Rangpur, the terraced palace of Garhgaon, and the UNESCO necropolis at
              Charaideo.
            </p>
          </div>
        </div>

        {/* Category Filter Bar & Reset Overview on Equal Edges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`m-btn px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap border ${
                  activeCategory === cat
                    ? 'bg-forest-950 text-gold-400 border-forest-950'
                    : 'bg-ivory-50 text-charcoal-700 border-charcoal-800/15 hover:border-forest-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetMapView}
            className="m-btn px-4 py-2 rounded-full text-[13px] font-medium text-forest-950 bg-ivory-200 hover:bg-gold-500/25 border border-charcoal-800/15 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Overview</span>
          </button>
        </div>

        {/* Cartographic Legend Bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 px-5 py-3 rounded-lg bg-ivory-50 border border-charcoal-800/15 text-[13px] text-charcoal-700">
          <span className="font-medium text-forest-950">Marker Key:</span>
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block border border-white shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* 12-Column Map & Active Site Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Leaflet Map Container (Cols 1-8) */}
          <div className="lg:col-span-8 bg-ivory-50 p-3 rounded-xl border border-charcoal-800/15">
            <div className="relative w-full h-[460px] sm:h-[600px] rounded-lg overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-full" />

              <div className="absolute top-3.5 left-3.5 z-[400] bg-forest-950/90 text-ivory-100 px-3.5 py-1.5 rounded-full text-[13px] font-medium border border-gold-500/35 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>{filteredPlaces.length} verified monument coordinates</span>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 9-12): Selected Place Sheet & Coordinate Directory */}
          <div className="lg:col-span-4 space-y-6">
            {selectedPlace && (
              <div className="bg-ivory-50 rounded-xl border border-charcoal-800/15 overflow-hidden">
                <div className="aspect-[16/10] w-full bg-forest-950 border-b border-charcoal-800/10">
                  <SmartImage
                    src={selectedPlace.heroImage}
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover"
                    fallbackTitle={selectedPlace.name}
                    fallbackCategory={selectedPlace.category}
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[13px] font-medium text-forest-800 mb-1">
                      <span>{selectedPlace.category}</span>
                      <span>{selectedPlace.yearBuilt}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-forest-950">
                      {selectedPlace.name}
                    </h3>
                    <p className="text-[15px] text-charcoal-700 leading-[1.6] line-clamp-3 mt-2">
                      {selectedPlace.historicalIntroduction || selectedPlace.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-[13px] text-charcoal-600 pt-3 border-t border-charcoal-800/10">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-3.5 h-3.5 text-gold-700 shrink-0" />
                      <span className="truncate">Patron: {selectedPlace.builtBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-forest-800 shrink-0" />
                      <span>{selectedPlace.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2">
                    <button
                      onClick={() => onSelectDestination(selectedPlace)}
                      className="m-btn flex-1 h-11 px-4 rounded-full bg-forest-950 hover:bg-forest-800 text-ivory-100 text-[14px] font-medium flex items-center justify-center gap-2"
                    >
                      <span>Read Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5 m-arrow text-gold-400" />
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.coordinates[0]},${selectedPlace.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="m-btn h-11 w-11 rounded-full border border-charcoal-800/20 hover:border-forest-950 text-charcoal-700 hover:text-forest-950 flex items-center justify-center shrink-0"
                      title="Open in Google Maps"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Quick-Jump Directory List */}
            <div className="bg-ivory-50 rounded-xl border border-charcoal-800/15 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-charcoal-800/10 text-[13px] font-medium text-forest-950">
                Select Monument to Focus Map
              </div>
              <div className="divide-y divide-charcoal-800/10 max-h-56 overflow-y-auto">
                {filteredPlaces.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => handleFocusPlace(dest)}
                    className={`w-full text-left px-5 py-3 text-[14px] flex items-center justify-between transition-colors ${
                      selectedPlace?.id === dest.id
                        ? 'bg-forest-950 text-gold-400 font-medium'
                        : 'text-charcoal-800 hover:bg-ivory-200/50'
                    }`}
                  >
                    <span className="truncate">{dest.name}</span>
                    <span className="text-[13px] opacity-80 ml-2 shrink-0">{dest.yearBuilt}</span>
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
