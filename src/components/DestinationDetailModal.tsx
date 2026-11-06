import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import type { Destination } from '../data/sivasagarData';
import { SmartImage } from './SmartImage';
import gamosaDivider from '../assets/images/gamosa-divider.png';
import japiEmblem from '../assets/images/japi-emblem.png';
import rangGharHeroBg from '../assets/images/rang-ghar-hero-bg.png';
import ahomSymbolWatermark from '../assets/images/ahom-symbol-watermark.png';
import {
  X,
  MapPin,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  AlertTriangle,
  Crown,
  Trophy,
  ShieldCheck,
  Landmark,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  Clock,
  Sparkles,
  FileText,
  Wrench,
  CheckCircle2,
  Compass,
  Building,
  Columns,
  Maximize2,
} from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSelectRelated: (dest: Destination) => void;
  allDestinations: Destination[];
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

/**
 * Interactive Leaflet Mini-Map Component
 * Matches the reference mockup: dark luxury cartography with custom red location pin.
 */
const MonumentMiniMap: React.FC<{
  coordinates: [number, number];
  name: string;
}> = ({ coordinates, name }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: coordinates,
      zoom: 14,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
      className: 'dark-map-tiles',
    }).addTo(map);

    const markerIcon = L.divIcon({
      className: 'monument-map-pin',
      html: `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translate(-50%, -100%);
        ">
          <div style="
            width: 26px;
            height: 26px;
            background: #E53E3E;
            border: 2px solid #FFFFFF;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 8px; height: 8px; background: #FFFFFF; border-radius: 50%;"></div>
          </div>
          <div style="
            margin-top: 4px;
            background: rgba(7, 27, 22, 0.94);
            color: #FAF7F2;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
            border: 1px solid rgba(198, 165, 107, 0.4);
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
          ">
            ${name}
          </div>
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 26],
    });

    L.marker(coordinates, { icon: markerIcon }).addTo(map);

    mapInstanceRef.current = map;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 350);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, name]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onSelectRelated,
  allDestinations,
  isSaved,
  onToggleSave,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(() => {
    const param = new URLSearchParams(window.location.search).get('lightbox');
    return param !== null ? Number(param) : null;
  });

  // Accordion open/close states (Historical Background expanded by default)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    background: true,
    architecture: false,
    techniques: false,
    events: false,
    culture: false,
    sources: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Image list
  const images = useMemo(() => {
    if (!destination) return [];
    if (destination.gallery && destination.gallery.length > 0) {
      return destination.gallery;
    }
    return [destination.heroImage];
  }, [destination]);

  useEffect(() => {
    if (destination) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      const scrollTimer = setTimeout(() => {
        if (scrollContainerRef.current) {
          const scrollParam = new URLSearchParams(window.location.search).get('scroll');
          if (scrollParam) {
            scrollContainerRef.current.scrollTop = Number(scrollParam);
          }
        }
      }, 120);

      const focusTimer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (lightboxIndex !== null) {
            setLightboxIndex(null);
            return;
          }
          event.preventDefault();
          onClose();
          return;
        }

        if (lightboxIndex !== null) {
          if (event.key === 'ArrowRight') {
            setLightboxIndex((prev) =>
              prev === null ? 0 : (prev + 1) % images.length
            );
          } else if (event.key === 'ArrowLeft') {
            setLightboxIndex((prev) =>
              prev === null ? 0 : (prev - 1 + images.length) % images.length
            );
          }
          return;
        }

        if (event.key === 'Tab' && modalContainerRef.current) {
          const focusableElements = modalContainerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(focusTimer);
        clearTimeout(scrollTimer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';

        if (
          previouslyFocusedElementRef.current &&
          typeof previouslyFocusedElementRef.current.focus === 'function'
        ) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [destination, onClose, lightboxIndex, images.length]);

  // Hero background image: use cinematic Rang Ghar landscape if Rang Ghar, else heroImage
  const heroBgImage = useMemo(() => {
    if (!destination) return '';
    if (destination.id === 'rang-ghar') {
      return rangGharHeroBg;
    }
    return destination.heroImage;
  }, [destination]);

  const handleShare = () => {
    if (!destination) return;
    if (navigator.share) {
      navigator
        .share({
          title: `${destination.name} — Explore Sivasagar Digital Heritage Archive`,
          text: destination.shortDescription,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const googleMapsUrl = destination
    ? `https://www.google.com/maps/search/?api=1&query=${destination.coordinates[0]},${destination.coordinates[1]}`
    : '';

  // Match nearby attractions with real destinations for interactive clicks
  const matchedNearby = useMemo(() => {
    if (!destination) return [];
    return destination.nearbyAttractions.map((nearby) => {
      const match = allDestinations.find(
        (d) =>
          d.id !== destination.id &&
          (d.name.toLowerCase().includes(nearby.name.toLowerCase()) ||
            nearby.name.toLowerCase().includes(d.name.toLowerCase()))
      );
      return {
        ...nearby,
        destination: match || null,
        image: match?.heroImage || images[0] || '',
      };
    });
  }, [destination, allDestinations, images]);

  // 4 Thumbnail previews for About section
  const aboutThumbnails = useMemo(() => {
    if (!destination) return [];
    const list = [...images];
    while (list.length < 4 && list.length > 0) {
      list.push(list[0]);
    }
    return list.slice(0, 4);
  }, [destination, images]);

  if (!destination) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-0 sm:p-3 lg:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Main Modal Dialog Container */}
        <motion.div
          ref={modalContainerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="monument-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-6xl bg-[#F4EFE5] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden border border-gold-500/30 max-h-[100svh] sm:max-h-[95vh] flex flex-col my-auto"
        >
          {/* Scrollable Container */}
          <div ref={scrollContainerRef} className="overflow-y-auto flex-1 flex flex-col">
            {/* ============================================================== */}
            {/* 1. CINEMATIC HERO SECTION                                      */}
            {/* ============================================================== */}
            <div className="relative w-full min-h-[290px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] bg-forest-950 flex flex-col justify-between overflow-hidden">
              {/* Full-bleed Monument Landscape Background */}
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right_25%] lg:bg-center"
                style={{ backgroundImage: `url(${heroBgImage})` }}
              />

              {/* Left Side Dark Forest Green Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, rgba(7, 27, 22, 0.96) 0%, rgba(7, 27, 22, 0.88) 35%, rgba(7, 27, 22, 0.55) 60%, rgba(7, 27, 22, 0.15) 80%, rgba(7, 27, 22, 0) 100%)',
                }}
              />

              {/* Bottom Subtle Gradient for Seam Transition */}
              <div
                className="absolute inset-x-0 bottom-0 h-28"
                style={{
                  background:
                    'linear-gradient(to top, rgba(7, 27, 22, 0.90) 0%, transparent 100%)',
                }}
              />

              {/* Top Bar with Breadcrumbs & Modal Controls */}
              <div className="relative z-20 flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6">
                {/* Breadcrumbs */}
                <nav
                  aria-label="Breadcrumb"
                  className="text-[12px] sm:text-[13px] font-sans text-ivory-200/90 flex items-center gap-1.5"
                >
                  <span className="hover:text-gold-300 transition-colors">Home</span>
                  <span className="text-gold-500/60">›</span>
                  <span className="hover:text-gold-300 transition-colors">Monuments</span>
                  <span className="text-gold-500/60">›</span>
                  <span className="text-gold-400 font-medium">{destination.name}</span>
                </nav>

                {/* Controls: Bookmark, Share, Close */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => onToggleSave(destination.id, e)}
                    className={`m-btn px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isSaved
                        ? 'bg-gold-500 text-forest-950 border-gold-400 font-semibold'
                        : 'bg-forest-950/80 border-gold-500/35 text-ivory-100 hover:text-gold-300 hover:bg-forest-900'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Bookmark'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="m-btn p-2 rounded-full bg-forest-950/80 border border-gold-500/35 text-ivory-100 hover:text-gold-300 hover:bg-forest-900 transition-colors relative"
                    title="Share historical monograph"
                    aria-label="Share historical monograph"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedShare && (
                      <span className="absolute -bottom-8 right-0 text-[11px] bg-gold-500 text-forest-950 font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>

                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="m-btn p-2 rounded-full bg-forest-950/80 border border-gold-500/35 text-ivory-100 hover:text-white hover:bg-forest-900 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hero Left Content: Category Badge, Title, Subtitle */}
              <div className="relative z-20 px-5 sm:px-8 pb-12 sm:pb-14 max-w-2xl space-y-3 sm:space-y-4">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/80 border border-gold-500/40 text-gold-300 text-xs font-medium backdrop-blur-sm">
                  <Crown className="w-3.5 h-3.5 text-gold-400" />
                  <span>{destination.category}</span>
                </div>

                {/* Main Monument Title */}
                <h1
                  id="monument-title"
                  className="font-serif text-3xl sm:text-5xl lg:text-[3.6rem] font-normal text-white tracking-[-0.025em] leading-[1.08] drop-shadow-md"
                >
                  {destination.name}
                </h1>

                {/* Subtitle / Tagline */}
                <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-gold-400 drop-shadow-sm tracking-wide">
                  {destination.tagline}
                </p>
              </div>
            </div>

            {/* ============================================================== */}
            {/* 2. ASSAMESE GAMOSA & JAPI SEAM STRADDLE DIVIDER                */}
            {/* 50% visually on Forest Green Hero, 50% on Warm Ivory Body     */}
            {/* ============================================================== */}
            <div
              className="relative z-30 w-full h-0 flex items-center justify-center overflow-visible pointer-events-none select-none"
              aria-hidden="true"
            >
              {/* Left Gamosa Strip: starts at far-left, reaches center */}
              <div className="absolute top-0 left-0 w-[50%] -translate-y-1/2 flex items-center justify-start pointer-events-none">
                <img
                  src={gamosaDivider}
                  alt=""
                  className="w-full h-[clamp(44px,5.2vw,70px)] object-fill drop-shadow-md"
                />
              </div>

              {/* Center Japi Medallion: centered 50/50 on the seam, layered above Gamosas */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
                <img
                  src={japiEmblem}
                  alt=""
                  className="h-[clamp(70px,8.2vw,108px)] w-auto object-contain drop-shadow-xl"
                />
              </div>

              {/* Right Gamosa Strip: starts at far-right, reaches center */}
              <div className="absolute top-0 right-0 w-[50%] -translate-y-1/2 flex items-center justify-end pointer-events-none">
                <img
                  src={gamosaDivider}
                  alt=""
                  className="w-full h-[clamp(44px,5.2vw,70px)] object-fill scale-x-[-1] drop-shadow-md"
                />
              </div>
            </div>

            {/* ============================================================== */}
            {/* 3. MAIN CONTENT: TWO-COLUMN EDITORIAL PUBLICATION              */}
            {/* ============================================================== */}
            <div className="bg-[#F4EFE5] text-charcoal-800 px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-12 flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* ---------------------------------------------------------- */}
                {/* LEFT COLUMN: About, 4 Pills, Accordions & Photo Gallery   */}
                {/* ---------------------------------------------------------- */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                  {/* ABOUT SECTION */}
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl sm:text-3xl text-forest-950 font-normal">
                      About{' '}
                      <span className="italic font-serif text-forest-900">
                        {destination.name}
                      </span>
                    </h2>

                    {/* Lead Paragraph with Gold Vertical Accent Bar */}
                    <div className="border-l-4 border-gold-500 pl-4 py-1 text-base sm:text-[16.5px] text-charcoal-800 leading-[1.68] font-normal">
                      {destination.shortDescription}
                    </div>

                    {/* 4 Thumbnail Photo Cards Preview Strip */}
                    <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 pt-2">
                      {aboutThumbnails.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setLightboxIndex(idx)}
                          className="group relative aspect-[16/11] rounded-xl overflow-hidden border border-charcoal-800/15 hover:border-gold-500 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                        >
                          <SmartImage
                            src={img}
                            alt={`${destination.name} view ${idx + 1}`}
                            loading="eager"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            fallbackTitle={destination.name}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4 FEATURE PILLS / INFO CARDS ROW */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                    {/* Card 1: Purpose */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/10 rounded-xl p-3.5 space-y-1.5 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900">
                        <Building className="w-4 h-4 text-gold-700" />
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-forest-950">
                        {destination.category}
                      </h4>
                      <p className="text-[12px] text-charcoal-600 leading-[1.4] line-clamp-2">
                        {destination.whyBuilt.split('.')[0] || 'Royal architectural foundation.'}
                      </p>
                    </div>

                    {/* Card 2: Historic Significance */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/10 rounded-xl p-3.5 space-y-1.5 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900">
                        <Trophy className="w-4 h-4 text-gold-700" />
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-forest-950">
                        Historic Significance
                      </h4>
                      <p className="text-[12px] text-charcoal-600 leading-[1.4] line-clamp-2">
                        {destination.tagline}
                      </p>
                    </div>

                    {/* Card 3: Ahom Legacy */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/10 rounded-xl p-3.5 space-y-1.5 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900">
                        <ShieldCheck className="w-4 h-4 text-gold-700" />
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-forest-950">
                        Ahom Legacy
                      </h4>
                      <p className="text-[12px] text-charcoal-600 leading-[1.4] line-clamp-2">
                        {destination.era}
                      </p>
                    </div>

                    {/* Card 4: Cultural Value */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/10 rounded-xl p-3.5 space-y-1.5 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900">
                        <Columns className="w-4 h-4 text-gold-700" />
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-forest-950">
                        Cultural Value
                      </h4>
                      <p className="text-[12px] text-charcoal-600 leading-[1.4] line-clamp-2">
                        {destination.culturalSignificance.split('.')[0] || 'Living heritage traditions.'}
                      </p>
                    </div>
                  </div>

                  {/* EXPANDABLE ACCORDION SECTIONS */}
                  <div className="space-y-4 pt-2">
                    {/* ACCORDION 1: Historical Background */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/12 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => toggleSection('background')}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors"
                        aria-expanded={openSections.background}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 shrink-0">
                            <BookOpen className="w-4 h-4 text-gold-700" />
                          </div>
                          <div>
                            <span className="text-[11px] font-medium tracking-wider uppercase text-gold-800 block">
                              Section I • Origins &amp; Chronicle
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-forest-950">
                              Historical Background
                            </h3>
                          </div>
                        </div>
                        <div className="text-charcoal-500 shrink-0 ml-3">
                          {openSections.background ? (
                            <ChevronUp className="w-5 h-5 text-gold-700" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {openSections.background && (
                        <div className="px-5 pb-6 pt-2 border-t border-charcoal-800/10 space-y-6">
                          {/* Introduction */}
                          <p className="font-serif text-lg sm:text-xl text-forest-950 leading-[1.55]">
                            {destination.historicalIntroduction}
                          </p>

                          {/* 3 Origins Hairline Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 border border-charcoal-800/15 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-charcoal-800/15 bg-white/70">
                            <div className="p-4 space-y-1.5">
                              <span className="text-[12px] font-medium text-forest-800 block">
                                When Was It Built?
                              </span>
                              <h4 className="font-serif text-xl font-medium text-forest-950">
                                {destination.yearBuilt}
                              </h4>
                              <p className="text-[13.5px] text-charcoal-700 leading-[1.6]">
                                {destination.whenBuiltDetails}
                              </p>
                            </div>

                            <div className="p-4 space-y-1.5">
                              <span className="text-[12px] font-medium text-forest-800 block">
                                Who Built It?
                              </span>
                              <h4 className="font-serif text-xl font-medium text-forest-950">
                                {destination.builtBy}
                              </h4>
                              <p className="text-[13.5px] text-charcoal-700 leading-[1.6]">
                                {destination.whoBuiltDetails}
                              </p>
                            </div>

                            <div className="p-4 space-y-1.5">
                              <span className="text-[12px] font-medium text-forest-800 block">
                                Why Was It Built?
                              </span>
                              <h4 className="font-serif text-xl font-medium text-forest-950">
                                Sovereign Purpose
                              </h4>
                              <p className="text-[13.5px] text-charcoal-700 leading-[1.6]">
                                {destination.whyBuilt}
                              </p>
                            </div>
                          </div>

                          {/* Historical Background Paragraphs */}
                          <div className="space-y-3.5 text-[15px] sm:text-base text-charcoal-800 leading-[1.72]">
                            {destination.historicalBackground.map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>

                          {/* Verified Record Box */}
                          <div className="p-4 rounded-xl bg-forest-950 text-ivory-100 border border-gold-500/30 space-y-1.5">
                            <div className="flex items-center gap-2 text-gold-400 text-xs font-medium">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>Verified Historical Record (ASI &amp; Buranji)</span>
                            </div>
                            <p className="text-[14px] text-ivory-100 leading-[1.6]">
                              {destination.verifiedFact}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ACCORDION 2: Architecture & Design */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/12 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => toggleSection('architecture')}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors"
                        aria-expanded={openSections.architecture}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 shrink-0">
                            <Layers className="w-4 h-4 text-gold-700" />
                          </div>
                          <div>
                            <span className="text-[11px] font-medium tracking-wider uppercase text-gold-800 block">
                              Section II • Spatial Engineering
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-forest-950">
                              Architecture &amp; Design
                            </h3>
                          </div>
                        </div>
                        <div className="text-charcoal-500 shrink-0 ml-3">
                          {openSections.architecture ? (
                            <ChevronUp className="w-5 h-5 text-gold-700" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {openSections.architecture && (
                        <div className="px-5 pb-6 pt-2 border-t border-charcoal-800/10 space-y-5">
                          {/* Key architectural dl */}
                          <dl className="divide-y divide-charcoal-800/10 text-[14.5px]">
                            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                              <dt className="sm:col-span-4 font-medium text-charcoal-600">
                                Architectural Style
                              </dt>
                              <dd className="sm:col-span-8 font-medium text-forest-950">
                                {destination.architecturalDetails.style}
                              </dd>
                            </div>

                            {destination.architecturalDetails.dimensions && (
                              <div className="py-2.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                                <dt className="sm:col-span-4 font-medium text-charcoal-600">
                                  Recorded Dimensions
                                </dt>
                                <dd className="sm:col-span-8 text-forest-950">
                                  {destination.architecturalDetails.dimensions}
                                </dd>
                              </div>
                            )}
                          </dl>

                          {/* Key Features List */}
                          <div className="space-y-2 pt-2">
                            <span className="text-[13px] font-medium text-forest-800 block">
                              Key Architectural &amp; Structural Features
                            </span>
                            <ul className="border-t border-charcoal-800/10 divide-y divide-charcoal-800/10">
                              {destination.architecturalDetails.keyFeatures.map((feat, idx) => (
                                <li
                                  key={idx}
                                  className="py-2.5 flex items-start gap-2.5 text-[14.5px] text-charcoal-800 leading-[1.6]"
                                >
                                  <span className="text-gold-700 font-bold mt-0.5">•</span>
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ACCORDION 3: Construction Techniques & Materials Used */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/12 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => toggleSection('techniques')}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors"
                        aria-expanded={openSections.techniques}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 shrink-0">
                            <Wrench className="w-4 h-4 text-gold-700" />
                          </div>
                          <div>
                            <span className="text-[11px] font-medium tracking-wider uppercase text-gold-800 block">
                              Section III • Material Science
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-forest-950">
                              Construction Techniques &amp; Materials Used
                            </h3>
                          </div>
                        </div>
                        <div className="text-charcoal-500 shrink-0 ml-3">
                          {openSections.techniques ? (
                            <ChevronUp className="w-5 h-5 text-gold-700" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {openSections.techniques && (
                        <div className="px-5 pb-6 pt-2 border-t border-charcoal-800/10 space-y-5">
                          <dl className="divide-y divide-charcoal-800/10 text-[14.5px]">
                            <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                              <dt className="sm:col-span-4 font-medium text-charcoal-600">
                                Materials Used
                              </dt>
                              <dd className="sm:col-span-8 font-medium text-forest-950">
                                {destination.architecturalDetails.materials}
                              </dd>
                            </div>
                            <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                              <dt className="sm:col-span-4 font-medium text-charcoal-600">
                                Construction Techniques
                              </dt>
                              <dd className="sm:col-span-8 text-charcoal-800 leading-[1.65]">
                                {destination.architecturalDetails.techniques}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      )}
                    </div>

                    {/* ACCORDION 4: Historical Timeline & Associated Events */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/12 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => toggleSection('events')}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors"
                        aria-expanded={openSections.events}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 shrink-0">
                            <Clock className="w-4 h-4 text-gold-700" />
                          </div>
                          <div>
                            <span className="text-[11px] font-medium tracking-wider uppercase text-gold-800 block">
                              Section IV • Chronological Ledger
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-forest-950">
                              Historical Timeline &amp; Events
                            </h3>
                          </div>
                        </div>
                        <div className="text-charcoal-500 shrink-0 ml-3">
                          {openSections.events ? (
                            <ChevronUp className="w-5 h-5 text-gold-700" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {openSections.events && (
                        <div className="px-5 pb-6 pt-2 border-t border-charcoal-800/10 space-y-4">
                          <div className="divide-y divide-charcoal-800/10">
                            {destination.associatedEvents.map((ev, idx) => (
                              <div
                                key={idx}
                                className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4"
                              >
                                <div className="sm:col-span-3 text-[14px] font-semibold text-forest-900">
                                  {ev.year}
                                </div>
                                <div className="sm:col-span-9 space-y-1">
                                  <h4 className="font-serif text-lg font-medium text-forest-950">
                                    {ev.event}
                                  </h4>
                                  <p className="text-[14px] text-charcoal-700 leading-[1.6]">
                                    {ev.details}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ACCORDION 5: Cultural & Historical Importance */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/12 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => toggleSection('culture')}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors"
                        aria-expanded={openSections.culture}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 shrink-0">
                            <Sparkles className="w-4 h-4 text-gold-700" />
                          </div>
                          <div>
                            <span className="text-[11px] font-medium tracking-wider uppercase text-gold-800 block">
                              Section V • Living Traditions
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-forest-950">
                              Cultural &amp; Historical Importance
                            </h3>
                          </div>
                        </div>
                        <div className="text-charcoal-500 shrink-0 ml-3">
                          {openSections.culture ? (
                            <ChevronUp className="w-5 h-5 text-gold-700" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {openSections.culture && (
                        <div className="px-5 pb-6 pt-2 border-t border-charcoal-800/10 space-y-6">
                          {/* Narrative */}
                          <p className="text-[15px] sm:text-base text-charcoal-800 leading-[1.72]">
                            {destination.culturalSignificance}
                          </p>

                          {/* Documented Historical Facts */}
                          <div className="space-y-3 pt-2">
                            <h4 className="font-serif text-lg font-medium text-forest-950">
                              Documented Historical Facts
                            </h4>
                            <ol className="divide-y divide-charcoal-800/10 border-t border-charcoal-800/10 text-[14.5px]">
                              {destination.interestingFacts.map((fact, idx) => (
                                <li
                                  key={idx}
                                  className="py-2.5 flex items-start gap-3 text-charcoal-800 leading-[1.6]"
                                >
                                  <span className="text-[12px] font-bold text-forest-800 mt-0.5">
                                    0{idx + 1}.
                                  </span>
                                  <span>{fact}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Folklore, Legends & Historical Assessment */}
                          {destination.folkloreAndLegends.length > 0 && (
                            <div className="space-y-4 pt-2">
                              <div>
                                <h4 className="font-serif text-lg font-medium text-forest-950">
                                  Oral Traditions &amp; Historical Assessment
                                </h4>
                                <p className="text-xs text-charcoal-600 mt-0.5">
                                  Preserving popular local legends alongside modern archaeological evaluation.
                                </p>
                              </div>

                              <div className="space-y-4">
                                {destination.folkloreAndLegends.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="border border-gold-600/30 rounded-xl overflow-hidden bg-white/70"
                                  >
                                    <div className="px-4 py-2.5 border-b border-gold-600/20 font-serif text-base font-medium text-forest-950">
                                      {item.title}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gold-600/20 text-[13.5px]">
                                      <div className="p-4 space-y-1">
                                        <span className="text-xs font-semibold text-gold-800 block">
                                          Local Legend / Oral Narrative
                                        </span>
                                        <p className="text-charcoal-800 leading-[1.6]">
                                          {item.narrative}
                                        </p>
                                      </div>
                                      <div className="p-4 bg-forest-950 text-ivory-100 space-y-1">
                                        <span className="text-xs font-semibold text-gold-400 block">
                                          Archaeological &amp; Historical Assessment
                                        </span>
                                        <p className="text-ivory-200 leading-[1.6]">
                                          {item.historicalAssessment}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* ACCORDION 6: Historical Evidence, References & Conservation */}
                    <div className="bg-[#FAF7F2] border border-charcoal-800/12 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => toggleSection('sources')}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors"
                        aria-expanded={openSections.sources}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 shrink-0">
                            <FileText className="w-4 h-4 text-gold-700" />
                          </div>
                          <div>
                            <span className="text-[11px] font-medium tracking-wider uppercase text-gold-800 block">
                              Section VI • Sources &amp; Conservation
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-forest-950">
                              Historical Evidence &amp; References
                            </h3>
                          </div>
                        </div>
                        <div className="text-charcoal-500 shrink-0 ml-3">
                          {openSections.sources ? (
                            <ChevronUp className="w-5 h-5 text-gold-700" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {openSections.sources && (
                        <div className="px-5 pb-6 pt-2 border-t border-charcoal-800/10 space-y-5">
                          {/* Then & Now Comparison */}
                          <div className="grid grid-cols-1 md:grid-cols-2 border border-charcoal-800/15 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-charcoal-800/15">
                            <div className="p-4 space-y-1.5 bg-white/60">
                              <span className="text-xs font-semibold text-forest-800 block uppercase tracking-wider">
                                In the Royal Era (Then)
                              </span>
                              <p className="text-[14px] text-charcoal-800 leading-[1.6]">
                                {destination.thenAndNow.historicalState}
                              </p>
                            </div>
                            <div className="p-4 space-y-1.5 bg-forest-950 text-ivory-100">
                              <span className="text-xs font-semibold text-gold-400 block uppercase tracking-wider">
                                Present-Day Condition (Now)
                              </span>
                              <p className="text-[14px] text-ivory-200 leading-[1.6]">
                                {destination.thenAndNow.presentDayState}
                              </p>
                            </div>
                          </div>

                          <p className="text-[13.5px] text-charcoal-700">
                            <strong className="text-forest-950 font-semibold">
                              Conservation Status:{' '}
                            </strong>
                            {destination.thenAndNow.conservationStatus}
                          </p>

                          {/* Sources & Bibliography */}
                          <div className="p-5 rounded-xl bg-forest-950 text-ivory-100 border border-gold-500/30 space-y-3">
                            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold">
                              <BookOpen className="w-4 h-4" />
                              <span>Documentary Citations &amp; Buranjis</span>
                            </div>
                            <ul className="divide-y divide-gold-500/20 text-[13.5px]">
                              {destination.sources.map((src, idx) => (
                                <li key={idx} className="py-2.5 first:pt-0 last:pb-0 space-y-0.5">
                                  <span className="font-medium text-ivory-100 block">
                                    {src.title}
                                  </span>
                                  <span className="text-xs text-gold-400 block">
                                    {src.institutionOrAuthor}
                                  </span>
                                  {src.note && (
                                    <span className="text-xs text-charcoal-400 block">
                                      {src.note}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PHOTO GALLERY SECTION (At foot of left column) */}
                  <div className="space-y-4 pt-4 border-t border-charcoal-800/12">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-forest-950 font-serif text-2xl font-normal">
                        <ImageIcon className="w-5 h-5 text-forest-800" />
                        <span>Photo Gallery</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(0)}
                        className="text-xs sm:text-sm font-medium text-forest-800 hover:text-forest-950 flex items-center gap-1 transition-colors"
                      >
                        <span>View All Photos ({images.length})</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Gallery Images Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setLightboxIndex(idx)}
                          className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-charcoal-800/15 hover:border-gold-500 shadow-sm transition-all cursor-pointer bg-forest-950"
                        >
                          <SmartImage
                            src={img}
                            alt={`${destination.name} gallery image ${idx + 1}`}
                            loading="eager"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            fallbackTitle={destination.name}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                            <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ---------------------------------------------------------- */}
                {/* RIGHT COLUMN: Quick Info, Map & Directions, Nearby         */}
                {/* ---------------------------------------------------------- */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                  {/* QUICK INFO CARD */}
                  <div className="p-6 rounded-2xl bg-[#071B16] text-white border border-gold-500/35 shadow-luxury relative overflow-hidden">
                    {/* Subtle Corner Watermark Emblem */}
                    <div
                      className="absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      <img
                        src={ahomSymbolWatermark}
                        alt=""
                        className="w-full h-full object-contain filter invert"
                      />
                    </div>

                    <h3 className="font-serif text-2xl font-normal text-white mb-5 flex items-center justify-between border-b border-gold-500/25 pb-3">
                      <span>Quick Info</span>
                      <Crown className="w-5 h-5 text-gold-400" />
                    </h3>

                    <dl className="divide-y divide-gold-500/15 text-[14px] space-y-0">
                      <div className="py-2.5 flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between gap-2">
                          <dt className="text-ivory-200/70 font-medium">Location</dt>
                          <dd className="text-right text-ivory-100 font-medium">
                            {destination.location}
                          </dd>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between gap-2">
                          <dt className="text-ivory-200/70 font-medium">Built In</dt>
                          <dd className="text-right text-gold-300 font-serif font-medium">
                            {destination.yearBuilt}
                          </dd>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <Crown className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between gap-2">
                          <dt className="text-ivory-200/70 font-medium">Built By</dt>
                          <dd className="text-right text-ivory-100 font-medium">
                            {destination.builtBy}
                          </dd>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between gap-2">
                          <dt className="text-ivory-200/70 font-medium">Dynasty</dt>
                          <dd className="text-right text-ivory-100 font-medium">
                            {destination.era}
                          </dd>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <Landmark className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between gap-2">
                          <dt className="text-ivory-200/70 font-medium">Type</dt>
                          <dd className="text-right text-ivory-100 font-medium">
                            {destination.category}
                          </dd>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <Compass className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between gap-2">
                          <dt className="text-ivory-200/70 font-medium">From Town</dt>
                          <dd className="text-right text-ivory-100 font-medium">
                            {destination.distanceFromTown}
                          </dd>
                        </div>
                      </div>

                      {destination.architecturalDetails.dimensions && (
                        <div className="py-2.5 flex items-start gap-3">
                          <Layers className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                          <div className="flex-1 flex justify-between gap-2">
                            <dt className="text-ivory-200/70 font-medium">Dimensions</dt>
                            <dd className="text-right text-ivory-100 font-medium text-xs">
                              {destination.architecturalDetails.dimensions}
                            </dd>
                          </div>
                        </div>
                      )}
                    </dl>
                  </div>

                  {/* LOCATION & MAP CARD */}
                  <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-charcoal-800/12 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-forest-900 text-ivory-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-gold-400" />
                      </div>
                      <h3 className="font-serif text-xl font-normal text-forest-950">
                        Location &amp; Map
                      </h3>
                    </div>

                    {/* Map Box */}
                    <div className="relative h-48 w-full rounded-xl overflow-hidden border border-charcoal-800/15 shadow-inner">
                      <MonumentMiniMap
                        coordinates={destination.coordinates}
                        name={destination.name}
                      />
                    </div>

                    {/* Address & Google Maps Direction Button */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center gap-2 text-xs text-charcoal-700">
                        <MapPin className="w-3.5 h-3.5 text-forest-800 shrink-0" />
                        <span>{destination.location}, Assam, India</span>
                      </div>

                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m-btn w-full h-11 rounded-full bg-forest-950 hover:bg-forest-900 text-ivory-100 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                      </a>
                    </div>
                  </div>

                  {/* NEARBY ATTRACTIONS CARD */}
                  <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-charcoal-800/12 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-forest-900 text-ivory-100 flex items-center justify-center shrink-0">
                        <Landmark className="w-4 h-4 text-gold-400" />
                      </div>
                      <h3 className="font-serif text-xl font-normal text-forest-950">
                        Nearby Attractions
                      </h3>
                    </div>

                    <div className="divide-y divide-charcoal-800/10">
                      {matchedNearby.map((nearby, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            if (nearby.destination) {
                              onSelectRelated(nearby.destination);
                            }
                          }}
                          className={`py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group transition-colors ${
                            nearby.destination ? 'cursor-pointer' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-11 rounded-lg overflow-hidden bg-forest-950 border border-charcoal-800/15 shrink-0">
                              <SmartImage
                                src={nearby.image}
                                alt={nearby.name}
                                loading="eager"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                fallbackTitle={nearby.name}
                              />
                            </div>
                            <div>
                              <h4 className="font-serif text-base font-medium text-forest-950 group-hover:text-gold-700 transition-colors">
                                {nearby.name}
                              </h4>
                              <p className="text-xs text-charcoal-600 line-clamp-1">
                                {nearby.brief}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-mono font-medium text-charcoal-600 group-hover:text-forest-950 shrink-0 whitespace-nowrap">
                            {nearby.distance} ›
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VISITOR INFORMATION & PRACTICAL ADVISORY */}
                  <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-charcoal-800/12 shadow-sm space-y-4 text-xs sm:text-[13px]">
                    <div className="flex items-center gap-2.5 border-b border-charcoal-800/10 pb-3">
                      <Clock className="w-4 h-4 text-forest-800" />
                      <h3 className="font-serif text-xl font-normal text-forest-950">
                        Visitor Information
                      </h3>
                    </div>

                    <dl className="space-y-2.5 text-charcoal-700">
                      <div>
                        <dt className="font-medium text-forest-950">Visiting Hours:</dt>
                        <dd className="text-charcoal-600 mt-0.5">
                          {destination.visitorInfo.timings} ({destination.visitorInfo.openingHours} –{' '}
                          {destination.visitorInfo.closingHours})
                        </dd>
                      </div>

                      <div className="border-t border-charcoal-800/10 pt-2.5">
                        <dt className="font-medium text-forest-950">Entry Tariff:</dt>
                        <dd className="text-charcoal-600 mt-0.5">
                          Indian: <strong>{destination.visitorInfo.entryFee.indian}</strong> • Foreign:{' '}
                          <strong>{destination.visitorInfo.entryFee.foreign}</strong>
                        </dd>
                      </div>

                      <div className="border-t border-charcoal-800/10 pt-2.5 grid grid-cols-2 gap-2">
                        <div>
                          <dt className="font-medium text-forest-950">Best Season:</dt>
                          <dd className="text-charcoal-600 mt-0.5">
                            {destination.visitorInfo.bestTimeToVisit}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-forest-950">Study Duration:</dt>
                          <dd className="text-charcoal-600 mt-0.5">
                            {destination.visitorInfo.idealDuration}
                          </dd>
                        </div>
                      </div>

                      {destination.visitorInfo.facilities && (
                        <div className="border-t border-charcoal-800/10 pt-2.5">
                          <dt className="font-medium text-forest-950">On-Site Facilities:</dt>
                          <dd className="text-charcoal-600 mt-0.5">
                            {destination.visitorInfo.facilities}
                          </dd>
                        </div>
                      )}
                    </dl>

                    {/* Advisory */}
                    <div className="p-3.5 rounded-xl bg-gold-500/12 border border-gold-500/30 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-forest-950">
                        <AlertTriangle className="w-3.5 h-3.5 text-gold-700 shrink-0" />
                        <span>Verification Notice</span>
                      </div>
                      <p className="text-charcoal-700 leading-[1.5]">
                        {destination.visitorInfo.entryFee.verificationNote}
                      </p>
                      <p className="text-[11px] text-charcoal-500 pt-0.5">
                        Reviewed: {destination.visitorInfo.lastVerified}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Bar */}
            <div className="px-6 py-4 bg-[#FAF7F2] border-t border-charcoal-800/15 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-[13px] text-charcoal-700">
              <span className="font-serif italic text-base text-forest-950">
                Explore Sivasagar — Preserving the Past. Sharing the Legacy. Celebrating Sivasagar.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="m-btn px-5 py-2 rounded-full bg-forest-950 text-ivory-100 hover:bg-forest-900 font-medium text-xs sm:text-sm transition-colors"
              >
                Return to Heritage Archive
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE LIGHTBOX VIEWER                                 */}
      {/* ============================================================== */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md">
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/15 min-w-0 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="font-serif text-base sm:text-lg font-medium text-gold-400 truncate">
                {destination.name}
              </span>
              <span className="text-white/40 shrink-0">•</span>
              <span className="text-xs font-mono text-white/80 shrink-0">
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(images.length).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Close photo viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center Image Frame */}
          <div className="relative flex-1 w-full min-h-0 flex items-center justify-center my-3 sm:my-4 overflow-hidden px-2 sm:px-14">
            <div className="relative max-h-[75vh] max-w-full flex items-center justify-center">
              <img
                key={images[lightboxIndex]}
                src={images[lightboxIndex]}
                alt={`${destination.name} full view ${lightboxIndex + 1}`}
                className="max-h-[72vh] sm:max-h-[76vh] max-w-[88vw] sm:max-w-[84vw] w-auto h-auto object-contain rounded-lg shadow-2xl select-none mx-auto block"
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + images.length) % images.length
                    )
                  }
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center transition-all cursor-pointer z-10 shadow-lg active:scale-95"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % images.length
                    )
                  }
                  className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center transition-all cursor-pointer z-10 shadow-lg active:scale-95"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    lightboxIndex === idx
                      ? 'border-gold-400 scale-105'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
