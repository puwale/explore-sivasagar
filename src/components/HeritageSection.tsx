import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AHOM_TIMELINE } from '../data/sivasagarData';
import { Shield, Sparkles, BookOpen, Layers, Award, Landmark } from 'lucide-react';
import { SmartImage } from './SmartImage';

export const HeritageSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const pillars = [
    {
      title: '600 Years of Undefeated Sovereignty',
      description:
        'Founded in 1253 CE by Chaolung Sukaphaa, the Ahom Kingdom ruled the Brahmaputra Valley for almost six centuries unbroken—successfully turning back 17 imperial Mughal invasions, most famously at the naval Battle of Saraighat in 1671 led by General Lachit Borphukan.',
      icon: Shield,
      tag: 'Martial Glory',
    },
    {
      title: 'Indigenous Architectural Engineering',
      description:
        'Ahom architects perfected a biological mortar called Karpatia churna using sticky Bora rice (Bora saul), duck eggs, snail lime, and pulses. This organic bond proved ductile and seismic-resistant, preserving massive brick monuments through centuries of earthquakes.',
      icon: Layers,
      tag: 'Material Science',
    },
    {
      title: 'Sacred Moidams & Royal Tumuli',
      description:
        'The royal burial mounds of Charaideo—inscribed as a UNESCO World Heritage Site in 2024—represent the world’s only surviving Tai funerary tumulus landscape, featuring vaulted subterranean chambers consecrated with sacred ritual caskets and ancestral regalia.',
      icon: Award,
      tag: 'UNESCO 2024',
    },
    {
      title: 'Tai-Ahom Cultural & Literary Legacy',
      description:
        'The Ahoms maintained Buranjis—unprecedented chronological prose histories written on treated Sanchi bark (Aquilaria agallocha) with indelible silikha ink. They enriched Assamese society with golden Muga silk weaving, brass crafts, and the national Bihu festival.',
      icon: BookOpen,
      tag: 'Literature & Arts',
    },
  ];

  return (
    <section id="heritage" className="py-28 sm:py-32 bg-forest-950 text-ivory-100 relative overflow-hidden">
      {/* Decorative Golden Ambient Gradients */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-forest-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            The Immortal Ahom Dynasty
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ivory-50 mb-6">
            Legacy of the Swargadeos
          </h2>
          <p className="text-ivory-300/80 text-base sm:text-lg font-light leading-relaxed">
            From the arrival of Prince Sukaphaa in 1253 CE to the golden architectural era of
            Rudra Singha, explore how the Ahoms forged an unyielding civilizational identity across
            six centuries.
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(198, 165, 107, 0.5)' }}
                className="p-6 sm:p-7 rounded-3xl bg-forest-900/60 border border-gold-500/20 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-forest-800 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-400/90 bg-forest-950/80 px-2.5 py-1 rounded-full border border-gold-500/20">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-ivory-100 mb-3 group-hover:text-gold-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-300/80 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Chronological Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="bg-forest-900/40 border border-gold-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-forest-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                Chronicles of Swargadeos
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-100 mt-1">
                Ahom Epochs: 1253 to 2024
              </h3>
            </div>
            <p className="text-xs text-ivory-300 max-w-md font-light">
              Click on each epoch below to witness the major triumphs and monumental milestones
              that shaped Assam’s history.
            </p>
          </div>

          {/* Timeline Buttons Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
            {AHOM_TIMELINE.map((item, index) => {
              const isSelected = selectedMilestone === index;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedMilestone(index)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-gold-500 text-forest-950 border-gold-400 font-bold shadow-gold-glow scale-105'
                      : 'bg-forest-950/60 border-forest-800 text-ivory-200 hover:border-gold-500/40 hover:bg-forest-900'
                  }`}
                >
                  <span className="block text-xs font-mono font-bold">{item.year}</span>
                  <span className="block text-[11px] truncate mt-0.5 opacity-90">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Milestone Interactive Showcase */}
          <AnimatePresence mode="wait">
            {AHOM_TIMELINE[selectedMilestone] && (
              <motion.div
                key={selectedMilestone}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-forest-950/80 rounded-2xl p-6 sm:p-8 border border-gold-500/25"
              >
                {/* Image side */}
                <div className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden relative shadow-luxury">
                  <SmartImage
                    src={AHOM_TIMELINE[selectedMilestone].image}
                    alt={AHOM_TIMELINE[selectedMilestone].title}
                    className="w-full h-full object-cover object-center"
                    fallbackTitle={AHOM_TIMELINE[selectedMilestone].title}
                    fallbackCategory="Ahom Era"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-gold-400 bg-forest-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold-500/30">
                    Era: {AHOM_TIMELINE[selectedMilestone].year}
                  </div>
                </div>

                {/* Text side */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
                    <Landmark className="w-4 h-4" />
                    <span>{AHOM_TIMELINE[selectedMilestone].swargadeo}</span>
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-100">
                    {AHOM_TIMELINE[selectedMilestone].title}
                  </h4>

                  <p className="text-sm sm:text-base text-ivory-200/90 font-light leading-relaxed">
                    {AHOM_TIMELINE[selectedMilestone].description}
                  </p>

                  <div className="pt-4 border-t border-forest-800/80">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold block mb-1">
                      Historical Significance:
                    </span>
                    <p className="text-xs sm:text-sm text-ivory-300 font-serif italic">
                      "{AHOM_TIMELINE[selectedMilestone].significance}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
