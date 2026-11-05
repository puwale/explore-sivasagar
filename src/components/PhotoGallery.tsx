import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  FolderArchive,
  LayoutGrid,
  Upload,
  Shield,
} from 'lucide-react';
import { SmartImage } from './SmartImage';
import { GlassFolder, type FolderFile } from './ui/glass-folder-cards';
import {
  ROYAL_PALACES_EXPANDED,
  AHOM_ARCHITECTURE_EXPANDED,
  TEMPLES_LAKES_EXPANDED,
  UNESCO_HERITAGE_EXPANDED,
  CULTURE_TRADITIONS_EXPANDED,
  type AuthenticGalleryPlate,
} from '../data/expandedGalleryData';
import {
  getApprovedSubmissions,
  getPendingSubmissions,
  type GallerySubmission,
} from '../services/gallerySubmissionService';
import { VisitorUploadModal } from './VisitorUploadModal';
import { AdminModerationModal } from './AdminModerationModal';

export interface CuratedCollectionDisplay {
  id: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions';
  label: string;
  seed: number;
  plates: AuthenticGalleryPlate[];
}

export interface ViewerState {
  collectionId: string;
  collectionTitle: string;
  items: AuthenticGalleryPlate[];
  currentIndex: number;
}

export const PhotoGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'folders' | 'all'>('folders');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewerState, setViewerState] = useState<ViewerState | null>(null);
  const [brokenPlateIds, setBrokenPlateIds] = useState<Set<string>>(new Set());

  // Community Submissions State
  const [approvedSubmissions, setApprovedSubmissions] = useState<GallerySubmission[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [targetUploadCollection, setTargetUploadCollection] = useState<
    'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions' | undefined
  >(undefined);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Mark an image URL / plate as broken so it is completely skipped
  const handleImageError = useCallback((plateId: string) => {
    setBrokenPlateIds((prev) => {
      if (prev.has(plateId)) return prev;
      const next = new Set(prev);
      next.add(plateId);
      return next;
    });
  }, []);

  // Fetch approved & pending submissions
  const loadCommunityData = useCallback(() => {
    Promise.all([getApprovedSubmissions(), getPendingSubmissions()]).then(([approved, pending]) => {
      setApprovedSubmissions(approved);
      setPendingCount(pending.length);
    });
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([getApprovedSubmissions(), getPendingSubmissions()]).then(([approved, pending]) => {
      if (active) {
        setApprovedSubmissions(approved);
        setPendingCount(pending.length);
      }
    });

    const handleUpdate = () => {
      Promise.all([getApprovedSubmissions(), getPendingSubmissions()]).then(([approved, pending]) => {
        if (active) {
          setApprovedSubmissions(approved);
          setPendingCount(pending.length);
        }
      });
    };

    window.addEventListener('gallery_submissions_updated', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('gallery_submissions_updated', handleUpdate);
    };
  }, []);

  // Convert approved community submission to AuthenticGalleryPlate
  const submissionToPlate = (sub: GallerySubmission): AuthenticGalleryPlate => ({
    id: `community-${sub.id}`,
    collectionId: sub.collectionId,
    destinationId: sub.destinationId,
    title: sub.title,
    category:
      sub.collectionId === 'palaces'
        ? 'Royal Palaces'
        : sub.collectionId === 'architecture'
        ? 'Ahom Architecture'
        : sub.collectionId === 'temples-lakes'
        ? 'Temples & Sacred Lakes'
        : sub.collectionId === 'unesco-heritage'
        ? 'UNESCO & Heritage'
        : 'Culture & Traditions',
    location: 'Community Contribution · Sivasagar',
    image: sub.imageUrl,
    era: 'Community Documented Heritage',
    caption: sub.description || `${sub.title} documented by ${sub.contributorName}.`,
    credit: `Contributed by ${sub.contributorName} (${sub.license})`,
    photographer: sub.contributorName,
    license: sub.license,
  });

  // Dynamic collections with approved visitor photographs included strictly inside their selected collection
  const collections: CuratedCollectionDisplay[] = useMemo(() => [
    {
      id: 'palaces',
      label: 'Royal Palaces',
      seed: 11,
      plates: [
        ...ROYAL_PALACES_EXPANDED,
        ...approvedSubmissions.filter((s) => s.collectionId === 'palaces').map(submissionToPlate),
      ].filter((p) => !brokenPlateIds.has(p.id)),
    },
    {
      id: 'architecture',
      label: 'Ahom Architecture',
      seed: 24,
      plates: [
        ...AHOM_ARCHITECTURE_EXPANDED,
        ...approvedSubmissions.filter((s) => s.collectionId === 'architecture').map(submissionToPlate),
      ].filter((p) => !brokenPlateIds.has(p.id)),
    },
    {
      id: 'temples-lakes',
      label: 'Temples & Sacred Lakes',
      seed: 37,
      plates: [
        ...TEMPLES_LAKES_EXPANDED,
        ...approvedSubmissions.filter((s) => s.collectionId === 'temples-lakes').map(submissionToPlate),
      ].filter((p) => !brokenPlateIds.has(p.id)),
    },
    {
      id: 'unesco-heritage',
      label: 'UNESCO & Heritage',
      seed: 53,
      plates: [
        ...UNESCO_HERITAGE_EXPANDED,
        ...approvedSubmissions.filter((s) => s.collectionId === 'unesco-heritage').map(submissionToPlate),
      ].filter((p) => !brokenPlateIds.has(p.id)),
    },
    {
      id: 'culture-traditions',
      label: 'Culture & Traditions',
      seed: 68,
      plates: [
        ...CULTURE_TRADITIONS_EXPANDED,
        ...approvedSubmissions.filter((s) => s.collectionId === 'culture-traditions').map(submissionToPlate),
      ].filter((p) => !brokenPlateIds.has(p.id)),
    },
  ], [approvedSubmissions, brokenPlateIds]);

  // All plates flat array for the catalog view (only verified valid plates)
  const allPlates = useMemo(() => collections.flatMap((c) => c.plates), [collections]);

  const categories = [
    'All',
    'Royal Palaces',
    'Ahom Architecture',
    'Temples & Sacred Lakes',
    'UNESCO & Heritage',
    'Culture & Traditions',
  ];

  const filteredCatalogPlates = useMemo(
    () => allPlates.filter((item) => selectedCategory === 'All' || item.category === selectedCategory),
    [allPlates, selectedCategory]
  );

  // Compute active plates in viewer filtering out any broken entries
  const validViewerItems = useMemo(() => {
    if (!viewerState) return [];
    return viewerState.items.filter((item) => !brokenPlateIds.has(item.id));
  }, [viewerState, brokenPlateIds]);

  const safeCurrentIndex = useMemo(() => {
    if (validViewerItems.length === 0) return 0;
    const idx = viewerState ? viewerState.currentIndex : 0;
    return Math.max(0, Math.min(idx, validViewerItems.length - 1));
  }, [viewerState, validViewerItems]);

  const currentPlate = validViewerItems.length > 0 ? validViewerItems[safeCurrentIndex] : null;

  // Navigate strictly within active collection among valid items
  const handleNext = useCallback(() => {
    setViewerState((prev) => {
      if (!prev) return prev;
      const valid = prev.items.filter((item) => !brokenPlateIds.has(item.id));
      if (valid.length <= 1) return prev;
      const nextIndex = (safeCurrentIndex + 1) % valid.length;
      return { ...prev, items: valid, currentIndex: nextIndex };
    });
  }, [brokenPlateIds, safeCurrentIndex]);

  const handlePrev = useCallback(() => {
    setViewerState((prev) => {
      if (!prev) return prev;
      const valid = prev.items.filter((item) => !brokenPlateIds.has(item.id));
      if (valid.length <= 1) return prev;
      const prevIndex = safeCurrentIndex <= 0 ? valid.length - 1 : safeCurrentIndex - 1;
      return { ...prev, items: valid, currentIndex: prevIndex };
    });
  }, [brokenPlateIds, safeCurrentIndex]);

  const handleCloseViewer = useCallback(() => {
    setViewerState(null);
  }, []);

  // Keyboard navigation strictly scoped to current viewer
  useEffect(() => {
    if (!viewerState || validViewerItems.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseViewer();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerState, validViewerItems, handlePrev, handleNext, handleCloseViewer]);

  // Touch swipe gestures strictly scoped to current collection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Open collection viewer strictly with that collection's plates
  const openCollectionViewer = (
    colId: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions',
    initialIndex: number
  ) => {
    const col = collections.find((c) => c.id === colId);
    if (!col) return;
    const valid = col.plates.filter((p) => !brokenPlateIds.has(p.id));
    if (valid.length === 0) return;
    const safeIndex = Math.max(0, Math.min(initialIndex, valid.length - 1));
    setViewerState({
      collectionId: col.id,
      collectionTitle: col.label,
      items: valid,
      currentIndex: safeIndex,
    });
  };

  // Open catalog viewer
  const openCatalogViewer = (index: number) => {
    const valid = filteredCatalogPlates.filter((p) => !brokenPlateIds.has(p.id));
    if (valid.length === 0) return;
    const safeIndex = Math.max(0, Math.min(index, valid.length - 1));
    setViewerState({
      collectionId: 'catalog-' + selectedCategory,
      collectionTitle: selectedCategory === 'All' ? 'Complete Archival Catalog' : selectedCategory,
      items: valid,
      currentIndex: safeIndex,
    });
  };

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-forest-950 text-ivory-100 border-b border-gold-500/20 overflow-hidden"
    >
      <div className="wrap-museum">
        {/* Museum Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-8 border-b border-gold-500/20 mb-8">
          <div className="lg:col-span-7 space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[13px] font-medium text-gold-400 block tracking-wider uppercase">
                07 / Photographic &amp; Archival Plates
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-forest-800 border border-gold-500/30 text-[11px] font-sans text-gold-300">
                {allPlates.length} Verified Archival Plates
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal tracking-[-0.02em] leading-[1.1]">
              Sivasagar Historical Photo Gallery
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <p className="text-base text-ivory-200 leading-[1.65] font-normal">
              High-resolution photographic documentation of Sivasagar’s palaces, parabolic boat-roof
              amphitheatres, sacred artesian reservoirs, and UNESCO burial tumuli.
            </p>

            {/* Actions Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Upload Photo Button */}
              <button
                type="button"
                onClick={() => {
                  setTargetUploadCollection(undefined);
                  setIsUploadModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-gold-500 text-forest-950 font-medium text-[13px] hover:bg-gold-400 transition-all shadow-md flex items-center gap-2 active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>

              {/* Admin Moderation Button */}
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="relative px-3.5 py-2 rounded-lg bg-forest-900 border border-gold-500/30 text-ivory-200 hover:text-white hover:bg-forest-800 transition-all text-[13px] font-medium flex items-center gap-2"
                title="Curator Moderation Portal"
              >
                <Shield className="w-4 h-4 text-gold-400" />
                <span>Curator Portal</span>
                {pendingCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-forest-950 text-[10px] font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-forest-900/80 p-1 rounded-lg border border-gold-500/25 ml-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('folders')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                    viewMode === 'folders'
                      ? 'bg-gold-500 text-forest-950 shadow-sm'
                      : 'text-ivory-200 hover:text-white'
                  }`}
                >
                  <FolderArchive className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Curated Folders</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                    viewMode === 'all'
                      ? 'bg-gold-500 text-forest-950 shadow-sm'
                      : 'text-ivory-200 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">All Plates</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW 1: Glass Folder Cards (Primary Curated Museum Collections) */}
        {viewMode === 'folders' && (
          <div className="space-y-10">
            {/* Curated Portfolios Header Notice */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-gold-400/90 border-b border-gold-500/15 pb-3">
              <span>Interactive Archival Portfolios · Hover or tap to expand plates</span>
              <span>5 Curated Heritage Folios · {allPlates.length} Authentic Photographs</span>
            </div>

            {/* Responsive Folder Cards Layout: Desktop max 3/row, Tablet 2/row, Mobile 1/row with generous 32-40px spacing */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-10 xl:gap-12 py-6 max-w-[1120px] mx-auto">
              {collections.map((col, idx) => {
                const folderFiles: FolderFile[] = col.plates.slice(0, 5).map((plate) => ({
                  name: plate.title.split('—')[0].trim(),
                  meta: plate.era,
                  image: plate.image,
                  id: plate.id,
                }));

                return (
                  <div
                    key={col.id}
                    className="flex flex-col items-center w-full max-w-[320px] transition-transform duration-300"
                  >
                    {/* Folder Card Stage with comfortable vertical expansion padding */}
                    <div className="relative flex justify-center w-full pt-8 pb-1">
                      <GlassFolder
                        label={col.label}
                        meta={`${col.plates.length} Archival Plates`}
                        tone="dark"
                        art="verdant"
                        seed={col.seed}
                        files={folderFiles}
                        action="none"
                        width={320}
                        appearDelay={idx * 70}
                        onFileSelect={(_, fileIndex) => {
                          openCollectionViewer(col.id, fileIndex);
                        }}
                      />
                    </div>

                    {/* Quick Collection Details Bar with distinct framing and clear separation */}
                    <div className="mt-4 w-full flex items-center justify-between text-[12px] px-3.5 py-2.5 rounded-lg bg-forest-900/60 border border-gold-500/20 shadow-sm">
                      <span className="font-sans font-medium text-ivory-200/90 tracking-wide">
                        {col.plates.length} authentic plates
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setTargetUploadCollection(col.id);
                          setIsUploadModalOpen(true);
                        }}
                        className="text-gold-400 hover:text-gold-300 font-medium text-[12px] hover:underline transition-colors cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <span>+ Add Photo</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: Complete Photographic Index (All Plates Grid with Filters) */}
        {viewMode === 'all' && (
          <div className="space-y-8">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
              {categories.map((cat) => {
                const count =
                  cat === 'All' ? allPlates.length : allPlates.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`m-btn px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap border transition-all ${
                      selectedCategory === cat
                        ? 'bg-gold-500 text-forest-950 border-gold-400 font-semibold'
                        : 'bg-forest-900/60 text-ivory-100 border-gold-500/25 hover:border-gold-500/50'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Clean Archival Plate Grid - Renders ONLY genuine loadable photographs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalogPlates.map((item, index) => (
                <article
                  key={item.id}
                  onClick={() => openCatalogViewer(index)}
                  className="m-card group bg-forest-900/50 border border-gold-500/20 hover:border-gold-500/50 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* 4:3 Photograph Frame */}
                    <div className="relative aspect-[4/3] w-full bg-forest-950 m-zoom-frame border-b border-gold-500/15">
                      <SmartImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center m-zoom-img"
                        onError={() => handleImageError(item.id)}
                      />

                      <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-forest-950/80 border border-gold-500/35 text-gold-400 flex items-center justify-center">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Card Metadata */}
                    <div className="p-5 sm:p-6 space-y-2">
                      <div className="flex items-center justify-between gap-2 text-[12px] font-medium text-gold-400">
                        <span>{item.category}</span>
                        <span className="text-charcoal-400">{item.era}</span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-ivory-100 group-hover:text-gold-300 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-3.5 border-t border-gold-500/15 flex items-center justify-between text-[12px] text-ivory-200">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <span className="text-gold-400 font-medium shrink-0">Inspect Plate →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Consolidated Archival Source Note */}
        <div className="mt-12 pt-6 border-t border-gold-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-charcoal-400">
          <span>
            Photographs via Archaeological Survey of India (ASI), Wikimedia Commons (CC-BY / CC-BY-SA),
            and community contributors.
          </span>
          <span>Click any plate inside a folder to inspect high-resolution photographs.</span>
        </div>
      </div>

      {/* Photography-First Exhibition Lightbox Modal */}
      <AnimatePresence>
        {viewerState && currentPlate && validViewerItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#071B16]/98 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={handleCloseViewer}
          >
            {/* Top Minimal Counter: reflects strictly genuine loadable photographs */}
            <div className="absolute top-5 sm:top-7 left-6 sm:left-10 z-20 flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm tracking-widest text-gold-400/90 select-none">
                {String(safeCurrentIndex + 1).padStart(2, '0')} /{' '}
                {String(validViewerItems.length).padStart(2, '0')}
              </span>
            </div>

            {/* Top Close Button */}
            <div className="absolute top-5 sm:top-7 right-6 sm:left-auto sm:right-10 z-20">
              <button
                type="button"
                onClick={handleCloseViewer}
                className="p-2 sm:p-2.5 rounded-full text-ivory-200/80 hover:text-white bg-forest-900/60 hover:bg-forest-800/80 border border-gold-500/25 backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer"
                aria-label="Close photography viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left & Right Navigation Controls strictly within active collection */}
            {validViewerItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-950/70 hover:bg-forest-900/90 border border-gold-500/25 hover:border-gold-400/60 text-ivory-200 hover:text-gold-300 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-950/70 hover:bg-forest-900/90 border border-gold-500/25 hover:border-gold-400/60 text-ivory-200 hover:text-gold-300 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </>
            )}

            {/* Main Immersive Photograph Frame with Subtle Transitions & Mobile Swipe */}
            <div
              className="relative w-full h-full flex items-center justify-center select-none touch-pan-y px-4 sm:px-16"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlate.id}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                  className="relative max-h-[88vh] max-w-[92vw] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={
                      currentPlate.image.startsWith('/') && !currentPlate.image.startsWith(import.meta.env.BASE_URL)
                        ? `${import.meta.env.BASE_URL}${currentPlate.image.slice(1)}`
                        : currentPlate.image
                    }
                    alt={currentPlate.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(currentPlate.id)}
                    className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg shadow-2xl pointer-events-none select-none"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visitor Upload Modal */}
      <VisitorUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        defaultCollectionId={targetUploadCollection}
        onUploadSuccess={() => {
          loadCommunityData();
        }}
      />

      {/* Admin Moderation Portal */}
      <AdminModerationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onModerationComplete={() => {
          loadCommunityData();
        }}
      />
    </section>
  );
};

export default PhotoGallery;
