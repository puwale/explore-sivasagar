import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ITINERARIES, FAQS } from '../data/sivasagarData';
import {
  Plane,
  Train,
  Car,
  ChevronDown,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

export const TravelGuideSection: React.FC = () => {
  const [selectedItinerary, setSelectedItinerary] = useState<'oneDay' | 'twoDay' | 'threeDay'>('twoDay');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeItinerary = ITINERARIES[selectedItinerary];

  return (
    <section id="guide" className="py-28 sm:py-32 bg-ivory-100 text-charcoal-800 relative">
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
            Visitor Handbook
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest-950 font-normal tracking-tight mb-5">
            Sivasagar Travel Guide
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed font-light">
            Everything you need for an unforgettable journey: transport routes, recommended
            sightseeing itineraries, weather patterns, and local travel advice.
          </p>
        </motion.div>

        {/* 1. How to Reach Section */}
        <div className="mb-24">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-950 mb-8 text-center sm:text-left">
            How to Reach Sivasagar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* By Air */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-charcoal-200/80 shadow-sm hover:shadow-luxury transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-4">
                <Plane className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-forest-950 mb-2">
                By Air
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                <li>
                  <strong className="text-charcoal-900">Jorhat Airport (JRH):</strong> ~60 km (1.5 hours by taxi via NH-715). Daily flights connecting Kolkata, Guwahati, Delhi.
                </li>
                <li>
                  <strong className="text-charcoal-900">Dibrugarh Airport (DIB):</strong> ~80 km (2 hours by road). Frequent national flights.
                </li>
              </ul>
            </motion.div>

            {/* By Rail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-charcoal-200/80 shadow-sm hover:shadow-luxury transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-4">
                <Train className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-forest-950 mb-2">
                By Railway
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                <li>
                  <strong className="text-charcoal-900">Simaluguri Junction (SLGR):</strong> 16 km away. Major mainline junction with Rajdhani Express and North-East Express halts.
                </li>
                <li>
                  <strong className="text-charcoal-900">Sivasagar Town Station (SRTN):</strong> Direct intercity passenger service from Guwahati.
                </li>
              </ul>
            </motion.div>

            {/* By Road */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-charcoal-200/80 shadow-sm hover:shadow-luxury transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-forest-950 mb-2">
                By Road & Local Transit
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                <li>
                  <strong className="text-charcoal-900">NH-715 Highway:</strong> Directly bisects Sivasagar. Overnight luxury sleeper buses from Guwahati (360 km, 7-8 hrs).
                </li>
                <li>
                  <strong className="text-charcoal-900">Local Commute:</strong> Pre-paid taxis, shared auto-rickshaws, and e-rickshaws (*tuk-tuks*) are readily available.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* 2. Suggested Sightseeing Itineraries */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                Curated Routes
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-950">
                Suggested Sightseeing Itineraries
              </h3>
            </div>

            {/* Itinerary Selectors */}
            <div className="inline-flex rounded-2xl bg-white p-1.5 border border-charcoal-200 shadow-sm self-start sm:self-auto">
              {(['oneDay', 'twoDay', 'threeDay'] as const).map((key) => {
                const label = key === 'oneDay' ? '1-Day' : key === 'twoDay' ? '2-Day' : '3-Day';
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedItinerary(key)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      selectedItinerary === key
                        ? 'bg-forest-800 text-ivory-100 shadow-sm'
                        : 'text-charcoal-600 hover:text-forest-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Itinerary Display */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-charcoal-200/80 shadow-luxury">
            <div className="mb-8 pb-6 border-b border-charcoal-100">
              <h4 className="font-serif text-2xl font-semibold text-forest-950">
                {activeItinerary.title}
              </h4>
              <p className="text-charcoal-600 text-sm mt-1">{activeItinerary.description}</p>
            </div>

            <div className="space-y-8">
              {activeItinerary.schedule.map((dayPlan, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-gold-500/50 space-y-4">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-forest-800 border-2 border-white" />

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-forest-900 text-gold-400 text-xs font-mono font-bold">
                      DAY {dayPlan.day}
                    </span>
                    <h5 className="font-serif text-lg font-semibold text-forest-950">
                      {dayPlan.title}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-charcoal-700">
                    <div className="p-4 rounded-2xl bg-ivory-100/70 border border-charcoal-200/60">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-forest-800 mb-1">
                        Morning
                      </span>
                      <p>{dayPlan.morning}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-ivory-100/70 border border-charcoal-200/60">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-forest-800 mb-1">
                        Afternoon
                      </span>
                      <p>{dayPlan.afternoon}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-ivory-100/70 border border-charcoal-200/60">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-forest-800 mb-1">
                        Evening
                      </span>
                      <p>{dayPlan.evening}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-forest-50 text-forest-950 text-xs font-medium flex items-center gap-2 border border-forest-200">
                    <Lightbulb className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>
                      <strong>Dining Highlight:</strong> {dayPlan.culinaryHighlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Frequently Asked Questions Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-950">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Verified answers to common traveler inquiries about visiting Sivasagar
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-charcoal-200/80 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif text-lg font-semibold text-forest-950 hover:text-gold-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-charcoal-700 font-light leading-relaxed border-t border-charcoal-100 bg-ivory-50/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
