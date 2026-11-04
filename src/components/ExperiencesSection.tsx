import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '../data/sivasagarData';
import { Sparkles, CheckCircle } from 'lucide-react';
import { SmartImage } from './SmartImage';

export const ExperiencesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(EXPERIENCES[0].id);

  const activeExperience = EXPERIENCES.find((e) => e.id === activeTab) || EXPERIENCES[0];

  return (
    <section id="experiences" className="py-28 sm:py-32 bg-forest-900 text-ivory-100 relative overflow-hidden">
      {/* Decorative Golden Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-950 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Curated Immersions
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory-50 font-normal tracking-tight mb-5">
            Sivasagar Experiences
          </h2>
          <p className="text-ivory-200/80 text-base sm:text-lg leading-relaxed font-light">
            Beyond the ancient brick walls lies a world of exquisite golden silk, royal culinary
            delicacies, migratory bird wetlands, and soul-stirring folk rhythms.
          </p>
        </motion.div>

        {/* Experience Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-4 mb-14 scrollbar-none">
          {EXPERIENCES.map((exp) => {
            const isSelected = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 border-gold-400 font-bold shadow-gold-glow scale-105'
                    : 'bg-forest-950/60 border-gold-500/20 text-ivory-200 hover:bg-forest-800'
                }`}
              >
                {exp.title}
              </button>
            );
          })}
        </div>

        {/* Active Experience Editorial Showcase */}
        <div className="bg-forest-950/85 rounded-3xl p-6 sm:p-10 lg:p-12 border border-gold-500/30 shadow-2xl backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExperience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Image (6 Cols) */}
              <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-luxury">
                <SmartImage
                  src={activeExperience.image}
                  alt={activeExperience.title}
                  className="w-full h-full object-cover object-center"
                  fallbackTitle={activeExperience.title}
                  fallbackCategory="Assamese Experience"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-display">
                    {activeExperience.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-semibold mt-1">
                    {activeExperience.title}
                  </h3>
                </div>
              </div>

              {/* Content (6 Cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                    Featured Experience
                  </span>
                  <h3 className="font-serif text-3xl font-semibold text-ivory-100 mt-1 mb-3">
                    {activeExperience.subtitle}
                  </h3>
                  <p className="text-ivory-200/90 text-base font-light leading-relaxed">
                    {activeExperience.description}
                  </p>
                </div>

                {/* Highlights Checklist */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display">
                    Signature Highlights:
                  </h4>
                  <div className="space-y-2.5">
                    {activeExperience.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-ivory-200">
                        <CheckCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assamese Cuisine Spotlight Banner */}
                {activeExperience.id === 'culinary-journey' && (
                  <div className="p-4 rounded-2xl bg-forest-900 border border-gold-500/30 text-xs text-ivory-200 space-y-1">
                    <div className="font-semibold text-gold-400 uppercase tracking-wider">
                      Culinary Secret: Joha Rice & Duck Roast
                    </div>
                    <p>
                      Ahom royal feasts (*Bhoj*) paired indigenous sticky Bora saul with freshly pressed mustard oil, slow-roasted duck seasoned only with wild black pepper and ash gourd, and soothing herbal digestives.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
