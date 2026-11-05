import React, { useState } from 'react';
import { HISTORICAL_DISCOVERIES, type HistoricalDiscoveryItem } from '../data/sivasagarData';
import {
  FlaskConical,
  Droplets,
  ScrollText,
  Compass,
  Scale,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const HistoricalDiscoveriesSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(HISTORICAL_DISCOVERIES[0]?.id || '');

  const activeDiscovery =
    HISTORICAL_DISCOVERIES.find((d) => d.id === selectedId) || HISTORICAL_DISCOVERIES[0];

  const getCategoryIcon = (category: HistoricalDiscoveryItem['category']) => {
    switch (category) {
      case 'Material Science':
        return FlaskConical;
      case 'Hydraulic Engineering':
        return Droplets;
      case 'Epigraphy & Archives':
        return ScrollText;
      case 'Archaeology':
        return Compass;
      case 'Fact vs. Folklore':
        return Scale;
      default:
        return FlaskConical;
    }
  };

  return (
    <section
      id="discoveries"
      className="py-24 sm:py-32 bg-ivory-100 text-charcoal-800 border-b border-charcoal-800/10"
    >
      <div className="wrap-museum">
        {/* 12-Column Museum Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-charcoal-800/15 mb-12">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[13px] font-medium text-forest-800 block">
              03 / Scientific &amp; Archival Dossier
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest-950 font-normal tracking-[-0.02em] leading-[1.1]">
              Historical Facts, Engineering &amp; Discoveries
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-charcoal-700 leading-[1.65] font-normal">
              Material science, artesian hydrology, manuscript preservation, and modern
              archaeological excavations explaining how Sivasagar’s monuments have endured for
              centuries—alongside a clear separation of verified history from oral folklore.
            </p>
          </div>
        </div>

        {/* 12-Column Interactive Dossier Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Cols 1-5): Clean Index List closed with 1px rules */}
          <div className="lg:col-span-5 border border-charcoal-800/15 rounded-xl overflow-hidden divide-y divide-charcoal-800/15 bg-ivory-50">
            {HISTORICAL_DISCOVERIES.map((item) => {
              const Icon = getCategoryIcon(item.category);
              const isSelected = activeDiscovery.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-5 sm:p-6 transition-colors flex items-start gap-4 ${
                    isSelected
                      ? 'bg-forest-950 text-ivory-100'
                      : 'text-charcoal-800 hover:bg-ivory-200/60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-gold-500 text-forest-950 border-gold-400'
                        : 'bg-ivory-100 text-forest-900 border-charcoal-800/15'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[13px] font-medium ${
                          isSelected ? 'text-gold-400' : 'text-forest-800'
                        }`}
                      >
                        {item.category}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-gold-400' : 'text-charcoal-500'
                        }`}
                      />
                    </div>
                    <h3
                      className={`font-serif text-xl font-medium leading-snug ${
                        isSelected ? 'text-ivory-100' : 'text-forest-950'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (Cols 6-12): Open Dossier Panel */}
          <div className="lg:col-span-7 bg-ivory-50 rounded-xl border border-charcoal-800/15 overflow-hidden">
            {/* Header Band */}
            <div className="bg-forest-950 text-ivory-100 p-6 sm:p-8 border-b border-gold-500/25 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
                <span className="font-medium text-gold-400">{activeDiscovery.category}</span>
                <span className="inline-flex items-center gap-1.5 text-ivory-200">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>{activeDiscovery.verificationStatus}</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-ivory-100 leading-tight">
                {activeDiscovery.title}
              </h3>
              <p className="font-serif italic text-lg text-gold-300">
                {activeDiscovery.subtitle}
              </p>
            </div>

            {/* Dossier Content */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Summary */}
              <p className="text-base sm:text-[17px] text-forest-950 font-medium leading-[1.65]">
                {activeDiscovery.summary}
              </p>

              {/* Technical Specifications Ledger (.rows with 1px rules) */}
              <div className="space-y-2">
                <span className="block text-[13px] font-medium text-forest-800">
                  Technical &amp; Archival Parameters
                </span>
                <dl className="border-t border-charcoal-800/15 divide-y divide-charcoal-800/15">
                  {activeDiscovery.technicalSpecs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-[15px]"
                    >
                      <dt className="sm:col-span-5 font-medium text-charcoal-600">{spec.label}</dt>
                      <dd className="sm:col-span-7 font-medium text-forest-950">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Documented Evidence Paragraphs */}
              <div className="space-y-3 pt-2 border-t border-charcoal-800/15">
                <span className="block text-[13px] font-medium text-forest-800">
                  Documented Evidence &amp; Historical Analysis
                </span>
                <div className="space-y-4 text-base text-charcoal-800 leading-[1.7] font-normal">
                  {activeDiscovery.detailedExplanation.map((detail, dIdx) => (
                    <p key={dIdx}>{detail}</p>
                  ))}
                </div>
              </div>

              {/* Primary Source Attribution Line */}
              <div className="pt-5 border-t border-charcoal-800/15 flex items-start gap-3 text-[14px] text-charcoal-700">
                <BookOpen className="w-4 h-4 text-forest-800 shrink-0 mt-1" />
                <div>
                  <span className="font-medium text-forest-950">Primary Source Attribution: </span>
                  <span>{activeDiscovery.sourceAttribution}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
