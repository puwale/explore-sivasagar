import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Destination } from '../data/sivasagarData';
import { SmartImage } from './SmartImage';
import {
  X,
  MapPin,
  Navigation,
  CheckCircle2,
  Bookmark,
  Share2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  AlertTriangle,
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
  const [imageSelection, setImageSelection] = useState<{ destId: string; index: number }>({
    destId: '',
    index: 0,
  });
  const [copiedShare, setCopiedShare] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const activeImageIndex =
    destination && imageSelection.destId === destination.id ? imageSelection.index : 0;

  const setActiveImageIndex = (indexOrUpdater: number | ((prev: number) => number)) => {
    if (!destination) return;
    const nextIndex =
      typeof indexOrUpdater === 'function' ? indexOrUpdater(activeImageIndex) : indexOrUpdater;
    setImageSelection({ destId: destination.id, index: nextIndex });
  };

  useEffect(() => {
    if (destination) {
      // Store currently active element to restore focus on close
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

      document.body.style.overflow = 'hidden';
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      // Shift focus to close button for assistive devices
      const focusTimer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      // Keyboard handler for Escape dismissal and Tab focus trapping
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
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
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';

        // Restore focus back to the triggering element
        if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [destination, onClose]);

  const images = destination
    ? destination.gallery.length > 0
      ? destination.gallery
      : [destination.heroImage]
    : [];

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Main Publication Container */}
          <motion.div
            ref={modalContainerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="monograph-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-6xl bg-ivory-50 rounded-xl shadow-2xl overflow-hidden border border-gold-500/30 max-h-[93vh] flex flex-col"
          >
            {/* Sticky Editorial Top Bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-4 bg-forest-950 text-ivory-100 border-b border-gold-500/25">
              <div className="flex items-center gap-3 flex-wrap text-[13px]">
                <span className="font-medium text-gold-400">{destination.category}</span>
                <span className="text-gold-500/40">•</span>
                <span className="font-serif italic text-ivory-200">{destination.assameseName}</span>
                <span className="hidden md:inline text-gold-500/40">•</span>
                <span className="hidden md:inline text-charcoal-400">{destination.era}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={(e) => onToggleSave(destination.id, e)}
                  className={`m-btn px-3.5 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-1.5 ${
                    isSaved
                      ? 'bg-gold-500 text-forest-950 border-gold-400'
                      : 'bg-forest-900 border-gold-500/30 text-ivory-200 hover:text-gold-300'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Bookmark'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="m-btn p-2 rounded-full bg-forest-900 border border-gold-500/30 text-ivory-200 hover:text-gold-300 relative"
                  title="Share historical monograph"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedShare && (
                    <span className="absolute -bottom-8 right-0 text-[12px] bg-gold-500 text-forest-950 font-medium px-2 py-0.5 rounded">
                      Copied!
                    </span>
                  )}
                </button>

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="m-btn p-2 rounded-full bg-forest-900 border border-forest-700 text-ivory-200 hover:text-white hover:bg-forest-800"
                  aria-label="Close monograph"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Publication Body */}
            <div ref={scrollContainerRef} className="overflow-y-auto p-5 sm:p-8 lg:p-12 space-y-12">
              {/* Monograph Title Header & Clean Photograph Frame */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-charcoal-800/15">
                  <div className="lg:col-span-8 space-y-2">
                    <span className="text-[13px] font-medium text-forest-800 block">
                      Historical Monograph • {destination.yearBuilt}
                    </span>
                    <h1 id="monograph-title" className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-forest-950 tracking-[-0.02em] leading-[1.08]">
                      {destination.name}
                    </h1>
                    <p className="font-serif italic text-lg sm:text-xl text-gold-700">
                      {destination.tagline}
                    </p>
                  </div>

                  <div className="lg:col-span-4 text-[14px] text-charcoal-700 space-y-1 lg:border-l lg:border-charcoal-800/15 lg:pl-6">
                    <div>
                      <span className="text-charcoal-500">Royal Patron: </span>
                      <strong className="text-forest-950 font-medium">{destination.builtBy}</strong>
                    </div>
                    <div>
                      <span className="text-charcoal-500">Location: </span>
                      <span className="text-forest-950">{destination.location}</span>
                    </div>
                  </div>
                </div>

                {/* Clean Photograph Frame (No text overlaid on image) */}
                <div className="relative h-72 sm:h-96 md:h-[460px] rounded-xl overflow-hidden bg-forest-950 border border-charcoal-800/15">
                  <SmartImage
                    src={images[activeImageIndex]}
                    alt={`${destination.name} view ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                    fallbackTitle={destination.name}
                    fallbackCategory={destination.category}
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1
                          )
                        }
                        className="m-btn absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-forest-950/80 text-ivory-100 hover:text-gold-400 flex items-center justify-center border border-gold-500/30"
                        aria-label="Previous photograph"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="m-btn absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-forest-950/80 text-ivory-100 hover:text-gold-400 flex items-center justify-center border border-gold-500/30"
                        aria-label="Next photograph"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-opacity ${
                          activeImageIndex === idx
                            ? 'border-forest-950 opacity-100'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <SmartImage
                          src={img}
                          alt={`${destination.name} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          fallbackTitle={destination.name}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Section I: Historical Introduction & Verified Record */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-charcoal-800/15">
                <div className="lg:col-span-7 space-y-2">
                  <span className="text-[13px] font-medium text-forest-800 block">
                    I. Historical Introduction
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-forest-950 leading-[1.55]">
                    {destination.historicalIntroduction}
                  </p>
                </div>

                <div className="lg:col-span-5 p-6 rounded-xl bg-forest-950 text-ivory-100 border border-gold-500/35 space-y-2">
                  <div className="flex items-center gap-2 text-gold-400 text-[13px] font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Verified Historical Record (ASI &amp; Buranji)</span>
                  </div>
                  <p className="text-[15px] text-ivory-100 leading-[1.65] font-normal">
                    {destination.verifiedFact}
                  </p>
                </div>
              </div>

              {/* Sections II, III, IV: Three-Column Origins Hairline Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-charcoal-800/15 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-charcoal-800/15 bg-ivory-100/60">
                <div className="p-6 space-y-2.5">
                  <span className="text-[13px] font-medium text-forest-800 block">
                    II. When Was It Built?
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-forest-950">
                    {destination.yearBuilt}
                  </h3>
                  <p className="text-[15px] text-charcoal-700 leading-[1.65]">
                    {destination.whenBuiltDetails}
                  </p>
                </div>

                <div className="p-6 space-y-2.5">
                  <span className="text-[13px] font-medium text-forest-800 block">
                    III. Who Built It?
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-forest-950">
                    {destination.builtBy}
                  </h3>
                  <p className="text-[15px] text-charcoal-700 leading-[1.65]">
                    {destination.whoBuiltDetails}
                  </p>
                </div>

                <div className="p-6 space-y-2.5">
                  <span className="text-[13px] font-medium text-forest-800 block">
                    IV. Why Was It Built?
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-forest-950">
                    Sovereign &amp; Cultural Purpose
                  </h3>
                  <p className="text-[15px] text-charcoal-700 leading-[1.65]">
                    {destination.whyBuilt}
                  </p>
                </div>
              </div>

              {/* Main 12-Column Monograph Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column (Cols 1-8): Long-Form Historical & Architectural Sections */}
                <div className="lg:col-span-8 space-y-12">
                  {/* Section V: Historical Background */}
                  <section className="space-y-4 pb-10 border-b border-charcoal-800/15">
                    <div>
                      <span className="text-[13px] font-medium text-forest-800 block">
                        V. Historical Narrative
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950 mt-1">
                        Historical Background
                      </h2>
                    </div>
                    <div className="space-y-4 text-base text-charcoal-800 leading-[1.72] font-normal measure-prose">
                      {destination.historicalBackground.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  {/* Sections VI & VII: Architecture, Techniques & Materials Ledger */}
                  <section className="space-y-6 pb-10 border-b border-charcoal-800/15">
                    <div>
                      <span className="text-[13px] font-medium text-forest-800 block">
                        VI &amp; VII. Structural Engineering &amp; Material Science
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950 mt-1">
                        Architecture, Techniques &amp; Materials Used
                      </h3>
                    </div>

                    <dl className="border-t border-charcoal-800/15 divide-y divide-charcoal-800/15 text-[15px]">
                      <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                        <dt className="sm:col-span-4 font-medium text-charcoal-600">
                          Architectural Style
                        </dt>
                        <dd className="sm:col-span-8 font-medium text-forest-950">
                          {destination.architecturalDetails.style}
                        </dd>
                      </div>
                      <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                        <dt className="sm:col-span-4 font-medium text-charcoal-600">
                          Materials Used
                        </dt>
                        <dd className="sm:col-span-8 font-medium text-forest-950">
                          {destination.architecturalDetails.materials}
                        </dd>
                      </div>
                      <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                        <dt className="sm:col-span-4 font-medium text-charcoal-600">
                          Construction Techniques
                        </dt>
                        <dd className="sm:col-span-8 text-charcoal-800 leading-[1.65]">
                          {destination.architecturalDetails.techniques}
                        </dd>
                      </div>
                      {destination.architecturalDetails.dimensions && (
                        <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                          <dt className="sm:col-span-4 font-medium text-charcoal-600">
                            Recorded Dimensions
                          </dt>
                          <dd className="sm:col-span-8 text-forest-950">
                            {destination.architecturalDetails.dimensions}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="space-y-2.5 pt-2">
                      <span className="block text-[13px] font-medium text-forest-800">
                        Key Architectural &amp; Structural Features
                      </span>
                      <ul className="border-t border-charcoal-800/15 divide-y divide-charcoal-800/15">
                        {destination.architecturalDetails.keyFeatures.map((feat, idx) => (
                          <li
                            key={idx}
                            className="py-3 flex items-start gap-3 text-[15px] text-charcoal-800 leading-[1.65]"
                          >
                            <span className="text-gold-700 font-medium">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Section VIII: Associated Historical Events */}
                  <section className="space-y-5 pb-10 border-b border-charcoal-800/15">
                    <div>
                      <span className="text-[13px] font-medium text-forest-800 block">
                        VIII. Chronological Ledger
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950 mt-1">
                        Historical Events Associated With {destination.name}
                      </h3>
                    </div>

                    <div className="border-t border-charcoal-800/15 divide-y divide-charcoal-800/15">
                      {destination.associatedEvents.map((ev, idx) => (
                        <div
                          key={idx}
                          className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4"
                        >
                          <div className="sm:col-span-3 text-[14px] font-medium text-forest-800">
                            {ev.year}
                          </div>
                          <div className="sm:col-span-9 space-y-1">
                            <h4 className="font-serif text-xl font-medium text-forest-950">
                              {ev.event}
                            </h4>
                            <p className="text-[15px] text-charcoal-700 leading-[1.65]">
                              {ev.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section IX: Cultural & Spiritual Significance */}
                  <section className="space-y-3 pb-10 border-b border-charcoal-800/15">
                    <span className="text-[13px] font-medium text-forest-800 block">
                      IX. Living Heritage
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950">
                      Cultural &amp; Spiritual Significance
                    </h3>
                    <p className="text-base text-charcoal-800 leading-[1.72] font-normal measure-prose">
                      {destination.culturalSignificance}
                    </p>
                  </section>

                  {/* Section X: Documented Historical Facts */}
                  <section className="space-y-4 pb-10 border-b border-charcoal-800/15">
                    <div>
                      <span className="text-[13px] font-medium text-forest-800 block">
                        X. Archival Insights
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950 mt-1">
                        Documented Historical Facts
                      </h3>
                    </div>
                    <ol className="border-t border-charcoal-800/15 divide-y divide-charcoal-800/15">
                      {destination.interestingFacts.map((fact, idx) => (
                        <li
                          key={idx}
                          className="py-3.5 flex items-start gap-3.5 text-[15px] text-charcoal-800 leading-[1.65]"
                        >
                          <span className="text-[13px] font-medium text-forest-800 shrink-0 mt-0.5">
                            0{idx + 1}.
                          </span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ol>
                  </section>

                  {/* Section XI: Legends & Local Stories (Explicitly Labelled as Folklore) */}
                  {destination.folkloreAndLegends.length > 0 && (
                    <section className="space-y-5 pb-10 border-b border-charcoal-800/15">
                      <div>
                        <span className="text-[13px] font-medium text-gold-700 block">
                          XI. Oral Tradition &amp; Folklore Notice
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950 mt-1">
                          Legends, Local Belief &amp; Historical Assessment
                        </h3>
                        <p className="text-[14px] text-charcoal-600 mt-1">
                          Popular oral traditions are preserved below alongside their modern
                          archaeological and documentary evaluation.
                        </p>
                      </div>

                      <div className="space-y-6">
                        {destination.folkloreAndLegends.map((item, idx) => (
                          <div
                            key={idx}
                            className="border border-gold-600/35 rounded-xl overflow-hidden bg-ivory-100/70"
                          >
                            <div className="px-5 py-3.5 border-b border-gold-600/25 font-serif text-xl font-medium text-forest-950">
                              {item.title}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gold-600/25 text-[15px]">
                              <div className="p-5 space-y-1.5">
                                <span className="block text-[13px] font-medium text-gold-700">
                                  Local Legend / Oral Tradition
                                </span>
                                <p className="text-charcoal-800 leading-[1.65]">{item.narrative}</p>
                              </div>
                              <div className="p-5 bg-forest-950 text-ivory-100 space-y-1.5">
                                <span className="block text-[13px] font-medium text-gold-400">
                                  Archaeological &amp; Historical Assessment
                                </span>
                                <p className="text-ivory-200 leading-[1.65]">
                                  {item.historicalAssessment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Section XII: Historical State vs. Present-Day Conservation */}
                  <section className="space-y-5">
                    <div>
                      <span className="text-[13px] font-medium text-forest-800 block">
                        XII. Chronological Comparison
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950 mt-1">
                        Historical State vs. Present-Day Conservation
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border border-charcoal-800/15 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-charcoal-800/15">
                      <div className="p-5 space-y-2 bg-ivory-100/50">
                        <span className="text-[13px] font-medium text-forest-800 block">
                          In the Royal Ahom Era (Then)
                        </span>
                        <p className="text-[15px] text-charcoal-800 leading-[1.65]">
                          {destination.thenAndNow.historicalState}
                        </p>
                      </div>
                      <div className="p-5 space-y-2 bg-forest-950 text-ivory-100">
                        <span className="text-[13px] font-medium text-gold-400 block">
                          Present-Day Site Condition (Now)
                        </span>
                        <p className="text-[15px] text-ivory-200 leading-[1.65]">
                          {destination.thenAndNow.presentDayState}
                        </p>
                      </div>
                    </div>

                    <p className="text-[14px] text-charcoal-700">
                      <strong className="text-forest-950 font-medium">
                        Conservation Status:{' '}
                      </strong>
                      {destination.thenAndNow.conservationStatus}
                    </p>
                  </section>
                </div>

                {/* Right Column (Cols 9-12): Practical Visitor Ledger, Location & Bibliography */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Section XIII: Practical Visitor Information Ledger */}
                  <div className="p-6 rounded-xl bg-ivory-100/70 border border-charcoal-800/15 space-y-5">
                    <div className="border-b border-charcoal-800/15 pb-3">
                      <span className="text-[13px] font-medium text-forest-800 block">
                        XIII. Practical Visitor Ledger
                      </span>
                      <h3 className="font-serif text-2xl font-medium text-forest-950">
                        Visitor Information
                      </h3>
                    </div>

                    <dl className="divide-y divide-charcoal-800/15 text-[14px]">
                      <div className="py-3 space-y-0.5">
                        <dt className="text-charcoal-600 font-medium">Visiting Hours</dt>
                        <dd className="text-forest-950 font-medium">
                          {destination.visitorInfo.timings}
                        </dd>
                        <dd className="text-[13px] text-charcoal-600">
                          Open: {destination.visitorInfo.openingHours} • Close:{' '}
                          {destination.visitorInfo.closingHours}
                        </dd>
                      </div>

                      <div className="py-3 space-y-1">
                        <dt className="text-charcoal-600 font-medium">Recorded Entry Tariff</dt>
                        <dd className="text-forest-950">
                          Indian Citizens: <strong>{destination.visitorInfo.entryFee.indian}</strong>
                        </dd>
                        <dd className="text-forest-950">
                          Foreign Nationals:{' '}
                          <strong>{destination.visitorInfo.entryFee.foreign}</strong>
                        </dd>
                        {destination.visitorInfo.entryFee.camera && (
                          <dd className="text-charcoal-700">
                            Camera: {destination.visitorInfo.entryFee.camera}
                          </dd>
                        )}
                      </div>

                      <div className="py-3 grid grid-cols-2 gap-3">
                        <div>
                          <dt className="text-charcoal-600 font-medium">Best Season</dt>
                          <dd className="text-forest-950 font-medium mt-0.5">
                            {destination.visitorInfo.bestTimeToVisit}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-charcoal-600 font-medium">Study Duration</dt>
                          <dd className="text-forest-950 font-medium mt-0.5">
                            {destination.visitorInfo.idealDuration}
                          </dd>
                        </div>
                      </div>

                      {destination.visitorInfo.facilities && (
                        <div className="py-3 space-y-1">
                          <dt className="text-charcoal-600 font-medium">On-Site Facilities</dt>
                          <dd className="text-charcoal-800 leading-[1.55]">
                            {destination.visitorInfo.facilities}
                          </dd>
                        </div>
                      )}
                    </dl>

                    {/* Mandatory Verification Advisory */}
                    <div className="p-4 rounded-lg bg-gold-500/15 border border-gold-600/35 text-[13px] text-charcoal-800 space-y-1">
                      <div className="flex items-center gap-1.5 font-medium text-forest-950">
                        <AlertTriangle className="w-4 h-4 text-gold-700 shrink-0" />
                        <span>Local Verification Advisory</span>
                      </div>
                      <p className="leading-[1.55]">
                        {destination.visitorInfo.entryFee.verificationNote}
                      </p>
                      <p className="text-charcoal-600 pt-0.5">
                        Last Reviewed: {destination.visitorInfo.lastVerified}
                      </p>
                    </div>
                  </div>

                  {/* Section XIV: Location & Map */}
                  <div className="p-6 rounded-xl bg-ivory-100/70 border border-charcoal-800/15 space-y-4">
                    <div className="flex items-center gap-2 text-forest-950 font-serif text-2xl font-medium">
                      <MapPin className="w-5 h-5 text-forest-800" />
                      <span>XIV. Location &amp; Map</span>
                    </div>

                    <div className="space-y-1 text-[14px] text-charcoal-700">
                      <p className="font-medium text-forest-950">{destination.location}</p>
                      <p>{destination.distanceFromTown}</p>
                    </div>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="m-btn w-full h-11 rounded-full bg-forest-950 hover:bg-forest-800 text-ivory-100 font-medium text-[14px] flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4 text-gold-400" />
                      <span>Get Directions in Google Maps</span>
                    </a>
                  </div>

                  {/* Adjacent Historical Sites */}
                  <div className="p-6 rounded-xl bg-ivory-100/70 border border-charcoal-800/15 space-y-3">
                    <h4 className="font-serif text-xl font-medium text-forest-950">
                      Adjacent Historical Sites
                    </h4>
                    <div className="divide-y divide-charcoal-800/15 text-[14px]">
                      {destination.nearbyAttractions.map((nearby, idx) => (
                        <div key={idx} className="py-3 space-y-0.5 first:pt-0 last:pb-0">
                          <div className="flex items-center justify-between font-medium text-forest-950">
                            <span>{nearby.name}</span>
                            <span className="text-[13px] text-forest-800">{nearby.distance}</span>
                          </div>
                          <p className="text-[13px] text-charcoal-600">{nearby.brief}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Etiquette Notice */}
                  {destination.visitorInfo.dressCode && (
                    <div className="p-5 rounded-xl bg-ivory-100/70 border border-charcoal-800/15 text-[14px] text-charcoal-700 space-y-1">
                      <div className="font-medium text-forest-950 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-gold-700" />
                        <span>Monument &amp; Shrine Etiquette</span>
                      </div>
                      <p className="leading-[1.6]">{destination.visitorInfo.dressCode}</p>
                    </div>
                  )}

                  {/* Section XV: Sources & Further Reading */}
                  <div className="p-6 rounded-xl bg-forest-950 text-ivory-100 border border-gold-500/30 space-y-4">
                    <div className="flex items-center gap-2 text-gold-400">
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <h4 className="font-serif text-xl font-medium text-ivory-100">
                        XV. Sources &amp; Further Reading
                      </h4>
                    </div>
                    <ul className="divide-y divide-gold-500/20 text-[14px]">
                      {destination.sources.map((src, idx) => (
                        <li key={idx} className="py-3 first:pt-0 last:pb-0 space-y-0.5">
                          <span className="font-medium text-ivory-100 block">{src.title}</span>
                          <span className="text-[13px] text-gold-400 block">
                            {src.institutionOrAuthor}
                          </span>
                          {src.note && (
                            <span className="text-[13px] text-charcoal-400 block">{src.note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Related Historical Monuments */}
              <div className="pt-8 border-t border-charcoal-800/15 space-y-6">
                <div>
                  <span className="text-[13px] font-medium text-forest-800 block">
                    Continue Reading the Archive
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950">
                    Related Historical Monuments in Sivasagar
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="m-card group bg-ivory-100/70 border border-charcoal-800/15 hover:border-gold-600/50 overflow-hidden cursor-pointer"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-forest-950 m-zoom-frame">
                        <SmartImage
                          src={rel.gallery[0] || rel.heroImage}
                          alt={rel.name}
                          className="w-full h-full object-cover m-zoom-img"
                          fallbackTitle={rel.name}
                          fallbackCategory={rel.category}
                        />
                      </div>
                      <div className="p-4 space-y-1">
                        <div className="text-[13px] text-charcoal-600">
                          {rel.category} • {rel.yearBuilt}
                        </div>
                        <h4 className="font-serif text-xl font-medium text-forest-950 group-hover:text-forest-800">
                          {rel.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-4 bg-ivory-100 border-t border-charcoal-800/15 flex flex-wrap items-center justify-between gap-3 text-[13px] text-charcoal-700">
              <span className="font-serif italic text-base text-forest-950">
                Explore Sivasagar — Preserving the Past. Sharing the Legacy. Celebrating Sivasagar.
              </span>
              <button
                onClick={onClose}
                className="m-btn px-5 py-2.5 rounded-full bg-forest-950 text-ivory-100 hover:bg-forest-800 font-medium"
              >
                Return to Heritage Archive
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
