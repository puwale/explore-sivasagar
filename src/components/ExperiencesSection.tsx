import React, { useState } from 'react';
import { EXPERIENCES } from '../data/sivasagarData';
import { CheckCircle } from 'lucide-react';
import { SmartImage } from './SmartImage';

export const ExperiencesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(EXPERIENCES[0].id);

  const activeExperience = EXPERIENCES.find((e) => e.id === activeTab) || EXPERIENCES[0];

  return (
    <section
      id="experiences"
      className="py-24 sm:py-32 bg-forest-950 text-ivory-100 border-b border-gold-500/20"
    >
      <div className="wrap-museum">
        {/* 12-Column Museum Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-gold-500/20 mb-10">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[13px] font-medium text-gold-400 block">
              05 / Intangible Heritage &amp; Living Traditions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal tracking-[-0.02em] leading-[1.1]">
              Culture, People &amp; Living Traditions
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-ivory-200 leading-[1.65] font-normal">
              Sivasagar’s heritage endures in the daily traditions of its people—from GI-protected
              golden Muga silk weaving and indigenous Tai-Assamese gastronomy to sacred Bihu
              observances and floodplain ecology.
            </p>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {EXPERIENCES.map((exp) => {
            const isSelected = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`m-btn px-5 py-2.5 rounded-full text-[14px] font-medium whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gold-500 text-forest-950 border-gold-400'
                    : 'bg-forest-900/60 border-gold-500/25 text-ivory-100 hover:border-gold-500/50'
                }`}
              >
                {exp.title}
              </button>
            );
          })}
        </div>

        {/* 12-Column Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-forest-900/45 rounded-xl p-6 sm:p-10 border border-gold-500/25">
          {/* Left (Cols 1-6): Clean 4:3 Photograph without Text Overlay */}
          <div className="lg:col-span-6 aspect-[4/3] rounded-lg overflow-hidden bg-forest-950 border border-gold-500/20">
            <SmartImage
              src={activeExperience.image}
              alt={activeExperience.title}
              className="w-full h-full object-cover object-center"
              fallbackTitle={activeExperience.title}
              fallbackCategory="Living Heritage"
            />
          </div>

          {/* Right (Cols 7-12): Cultural Documentation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-gold-400 block">
                {activeExperience.title}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-ivory-100 leading-tight">
                {activeExperience.subtitle}
              </h3>
              <p className="text-base text-ivory-200 leading-[1.7] font-normal pt-1">
                {activeExperience.description}
              </p>
            </div>

            {/* Documented Elements closed with 1px hairlines */}
            <div className="space-y-2 pt-2">
              <span className="text-[13px] font-medium text-gold-400 block">
                Documented Cultural Elements
              </span>
              <ul className="border-t border-gold-500/20 divide-y divide-gold-500/20">
                {activeExperience.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-3 flex items-start gap-3 text-[15px] text-ivory-100 leading-[1.6]"
                  >
                    <CheckCircle className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeExperience.id === 'culinary-journey' && (
              <div className="pt-4 border-t border-gold-500/20 text-[14px] text-ivory-200 leading-[1.6]">
                <strong className="text-gold-400 font-medium">
                  Historical Note on Bora Saul:{' '}
                </strong>
                The same indigenous glutinous Bora Saul (sticky rice) celebrated in Sivasagar’s
                festive Jolpan breakfasts was also boiled by royal Ahom engineers to formulate the
                amylopectin biopolymer in Karpatia Churna brick mortar.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
