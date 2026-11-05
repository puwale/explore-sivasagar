import React, { useState } from 'react';
import { ITINERARIES, FAQS } from '../data/sivasagarData';
import { Plane, Train, Car, AlertTriangle } from 'lucide-react';

export const TravelGuideSection: React.FC = () => {
  const [selectedItinerary, setSelectedItinerary] = useState<'oneDay' | 'twoDay' | 'threeDay'>(
    'twoDay'
  );

  const activeItinerary = ITINERARIES[selectedItinerary];

  return (
    <section
      id="guide"
      className="py-24 sm:py-32 bg-ivory-100 text-charcoal-800 border-b border-charcoal-800/10"
    >
      <div className="wrap-museum space-y-20">
        {/* 12-Column Museum Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-charcoal-800/15">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[13px] font-medium text-forest-800 block">
              06 / Visitor Reference &amp; Study Circuits
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest-950 font-normal tracking-[-0.02em] leading-[1.1]">
              Visiting Sivasagar: Practical Reference
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-charcoal-700 leading-[1.65] font-normal">
              Public transit access, chronological historical study circuits across Rangpur,
              Garhgaon, and Charaideo, and verified visitor guidelines for researchers and
              travelers.
            </p>
          </div>
        </div>

        {/* Non-Commercial Public Information Notice (Full .wrap-museum width) */}
        <div className="p-6 rounded-xl bg-ivory-50 border border-gold-600/40 flex items-start gap-4 text-[15px] text-charcoal-800">
          <AlertTriangle className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-medium text-forest-950 block">
              Non-Commercial Public Information Notice
            </span>
            <p className="leading-[1.65]">
              Explore Sivasagar is an independent historical and cultural documentation platform and
              does not sell tickets, hotel stays, or transport packages. Monument timings, ASI entry
              tariffs, and public transit schedules are provided for educational reference—
              <strong className="text-forest-950 font-medium">
                {' '}
                please verify locally before visiting
              </strong>
              .
            </p>
          </div>
        </div>

        {/* 1. Public Transit & Regional Access — Clean 3-Column Hairline Grid */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-forest-950">
            Public Transit &amp; Regional Access
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-charcoal-800/15 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-charcoal-800/15 bg-ivory-50">
            {/* Air */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-forest-950 text-gold-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-2xl font-medium text-forest-950">Nearest Airports</h4>
              <ul className="space-y-3 text-[15px] text-charcoal-700 leading-[1.65]">
                <li>
                  <strong className="text-forest-950 font-medium">Jorhat Airport (JRH):</strong>{' '}
                  ~55–60 km west (~1.5 hours via NH-2 / NH-715). Regular flights from Guwahati,
                  Kolkata, and New Delhi.
                </li>
                <li>
                  <strong className="text-forest-950 font-medium">Dibrugarh Airport (DIB):</strong>{' '}
                  ~80 km east (~2 hours by road). Major Upper Assam aviation hub.
                </li>
              </ul>
            </div>

            {/* Rail */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-forest-950 text-gold-400 flex items-center justify-center">
                <Train className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-2xl font-medium text-forest-950">
                Railway Connections
              </h4>
              <ul className="space-y-3 text-[15px] text-charcoal-700 leading-[1.65]">
                <li>
                  <strong className="text-forest-950 font-medium">
                    Simaluguri Junction (SLGR):
                  </strong>{' '}
                  ~16 km south-east of Sivasagar town. Major Northeast Frontier Railway junction
                  served by Rajdhani Express and long-distance express trains.
                </li>
                <li>
                  <strong className="text-forest-950 font-medium">
                    Sivasagar Town Station (SRTN):
                  </strong>{' '}
                  Located in town; served by intercity trains connecting Guwahati and Jorhat.
                </li>
              </ul>
            </div>

            {/* Road */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-forest-950 text-gold-400 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-2xl font-medium text-forest-950">
                National Highway &amp; Local Transit
              </h4>
              <ul className="space-y-3 text-[15px] text-charcoal-700 leading-[1.65]">
                <li>
                  <strong className="text-forest-950 font-medium">NH-2 / NH-715 Corridor:</strong>{' '}
                  Sivasagar lies ~360 km east of Guwahati (7–8 hours by ASTC or intercity coach)
                  along the arterial highway of Upper Assam.
                </li>
                <li>
                  <strong className="text-forest-950 font-medium">Within the Monument Zone:</strong>{' '}
                  Town monuments are walkable or reachable via electric rickshaws; Garhgaon (15 km)
                  and Charaideo (28 km) are connected by local buses and taxis.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Suggested Historical Study Circuits — Clean Ledger Layout */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[13px] font-medium text-forest-800 block">
                Chronological &amp; Spatial Routes
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-forest-950">
                Suggested Historical Study Circuits
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {(['oneDay', 'twoDay', 'threeDay'] as const).map((key) => {
                const label =
                  key === 'oneDay'
                    ? '1-Day Circuit'
                    : key === 'twoDay'
                      ? '2-Day Survey'
                      : '3-Day Archive';
                const isSelected = selectedItinerary === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedItinerary(key)}
                    className={`m-btn px-4 py-2 rounded-full text-[13px] font-medium border ${
                      isSelected
                        ? 'bg-forest-950 text-gold-400 border-forest-950'
                        : 'bg-ivory-50 text-charcoal-700 border-charcoal-800/15 hover:border-forest-800'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-ivory-50 rounded-xl border border-charcoal-800/15 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-charcoal-800/15 space-y-1">
              <h4 className="font-serif text-2xl sm:text-3xl font-medium text-forest-950">
                {activeItinerary.title}
              </h4>
              <p className="text-base text-charcoal-700">{activeItinerary.description}</p>
            </div>

            <div className="divide-y divide-charcoal-800/15">
              {activeItinerary.schedule.map((dayPlan, idx) => (
                <div key={idx} className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="px-3 py-1 rounded-full bg-forest-950 text-gold-400 text-[13px] font-medium">
                      Day 0{dayPlan.day}
                    </span>
                    <h5 className="font-serif text-2xl font-medium text-forest-950">
                      {dayPlan.title}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="space-y-1.5">
                      <span className="block text-[13px] font-medium text-forest-800">
                        Morning Session
                      </span>
                      <p className="text-[15px] text-charcoal-800 leading-[1.65]">
                        {dayPlan.morning}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="block text-[13px] font-medium text-forest-800">
                        Afternoon Session
                      </span>
                      <p className="text-[15px] text-charcoal-800 leading-[1.65]">
                        {dayPlan.afternoon}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="block text-[13px] font-medium text-forest-800">
                        Evening Session
                      </span>
                      <p className="text-[15px] text-charcoal-800 leading-[1.65]">
                        {dayPlan.evening}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-charcoal-800/10 text-[14px] text-charcoal-700">
                    <strong className="text-forest-950 font-medium">Study Focus: </strong>
                    {dayPlan.culinaryHighlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Open FAQ Ledger (system.md: FAQs open in full, no accordion) */}
        <div className="space-y-8 pt-6 border-t border-charcoal-800/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-1.5">
              <span className="text-[13px] font-medium text-forest-800 block">
                Open Reference Ledger
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-forest-950">
                Frequently Asked Historical &amp; Visitor Questions
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15px] text-charcoal-600 leading-[1.6]">
                All answers are displayed open in full for immediate reference without accordions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 border-t border-charcoal-800/15 pt-8">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="pb-8 border-b border-charcoal-800/15 space-y-2.5 flex flex-col justify-start"
              >
                <h4 className="font-serif text-xl sm:text-2xl font-medium text-forest-950 leading-snug">
                  {faq.question}
                </h4>
                <p className="text-base text-charcoal-700 leading-[1.68] font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
