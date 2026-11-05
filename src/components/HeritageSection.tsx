import React, { useState } from 'react';
import { AHOM_TIMELINE, AHOM_HISTORY_CHAPTERS } from '../data/sivasagarData';
import { Shield, Layers, Award, BookOpen, Landmark, Crown, ArrowRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

export const HeritageSection: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const pillars = [
    {
      title: '600 Years of Undefeated Sovereignty',
      description:
        'Founded in 1228 CE by Chaolung Sukaphaa (with Charaideo established as the first permanent capital in 1253 CE), the Ahom Kingdom ruled the Brahmaputra Valley for nearly six centuries—repelling 17 Mughal invasions, culminating in the Battle of Saraighat (1671 CE) and Battle of Itakhuli (1682 CE).',
      icon: Shield,
      tag: 'Sovereign History',
    },
    {
      title: 'Indigenous Architectural Engineering',
      description:
        'Ahom architects perfected a biological lime-pozzolana mortar called Karpatia Churna using sticky Bora rice (Bora Saul), duck eggs, Matimah pulses, and snail-shell lime. This ductile bond preserved massive brick monuments across centuries of seismic activity.',
      icon: Layers,
      tag: 'Material Science',
    },
    {
      title: 'Sacred Moidams & Royal Tumuli',
      description:
        'The royal burial mounds of Charaideo—inscribed as a UNESCO World Heritage Site in July 2024—represent the world’s finest surviving Tai funerary landscape, featuring vaulted brick chambers, octagonal boundary walls, and sacred ritual offerings.',
      icon: Award,
      tag: 'UNESCO 2024',
    },
    {
      title: 'Buranji Chronicles & Cultural Synthesis',
      description:
        'The Ahoms introduced the Buranji tradition—empirical historical chronicles written on treated Sanchi-pat (Aquilaria malaccensis) bark with indelible Mohi ink—while fostering the Bor-Asom cultural synthesis of Tai and indigenous communities.',
      icon: BookOpen,
      tag: 'Archives & Culture',
    },
  ];

  const activeChapter = AHOM_HISTORY_CHAPTERS[selectedChapter] || AHOM_HISTORY_CHAPTERS[0];
  const activeEpoch = AHOM_TIMELINE[selectedMilestone] || AHOM_TIMELINE[0];

  return (
    <section
      id="heritage"
      className="py-24 sm:py-32 bg-forest-950 text-ivory-100 border-b border-gold-500/20"
    >
      <div className="wrap-museum space-y-24">
        {/* 12-Column Museum Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-gold-500/20">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[13px] font-medium text-gold-400 block">
              02 / The Six-Century Tai-Ahom Civilization
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal tracking-[-0.02em] leading-[1.1]">
              History of the Ahom Kingdom
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-ivory-200 leading-[1.65] font-normal">
              From Chaolung Sukaphaa’s crossing of the Patkai mountains in 1228 CE to the golden
              architectural renaissance of Rangpur (Sivasagar) in the 18th century, examine the
              institutions, rulers, and monuments that forged Assam’s historical identity.
            </p>
          </div>
        </div>

        {/* 4 Core Civilizational Pillars — Clean Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gold-500/20 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gold-500/20 bg-forest-900/40">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div key={idx} className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-forest-800 border border-gold-500/30 flex items-center justify-center text-gold-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[13px] font-medium text-gold-400">{pillar.tag}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-ivory-100 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] text-ivory-200 leading-[1.65] font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Historical Monograph Chapters — 12-Column Split Reader */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-1.5">
              <span className="text-[13px] font-medium text-gold-400 block">
                Historical Monograph Chapters
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-ivory-100 tracking-[-0.015em]">
                Origins, Statecraft &amp; Transformation of Sivasagar
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15px] text-charcoal-400 leading-[1.6]">
                Select a chapter to read how Sivasagar (historically Rangpur and Garhgaon) evolved
                into the political and architectural nerve centre of the Ahom Kingdom.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Cols 1-4): Chapter Index List */}
            <div className="lg:col-span-4 border border-gold-500/25 rounded-xl overflow-hidden divide-y divide-gold-500/20 bg-forest-900/30">
              {AHOM_HISTORY_CHAPTERS.map((chap, idx) => {
                const isActive = selectedChapter === idx;
                return (
                  <button
                    key={chap.id}
                    onClick={() => setSelectedChapter(idx)}
                    className={`w-full text-left p-5 transition-colors flex items-start justify-between gap-4 ${
                      isActive
                        ? 'bg-gold-500 text-forest-950'
                        : 'text-ivory-100 hover:bg-forest-900/80'
                    }`}
                  >
                    <div className="space-y-1">
                      <span
                        className={`text-[13px] font-medium block ${
                          isActive ? 'text-forest-900' : 'text-gold-400'
                        }`}
                      >
                        Chapter 0{idx + 1} • {chap.era}
                      </span>
                      <span className="font-serif text-xl font-medium leading-snug block">
                        {chap.title}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isActive ? 'text-forest-950' : 'text-gold-400/70'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column (Cols 5-12): Open Chapter Dossier */}
            <div className="lg:col-span-8 bg-forest-900/50 border border-gold-500/25 rounded-xl p-6 sm:p-10 space-y-8">
              <div className="border-b border-gold-500/20 pb-6 space-y-2">
                <span className="text-[13px] font-medium text-gold-400 block">
                  {activeChapter.era}
                </span>
                <h4 className="font-serif text-2xl sm:text-4xl font-normal text-ivory-100 leading-tight">
                  {activeChapter.title}
                </h4>
                <p className="font-serif italic text-lg text-gold-300">
                  {activeChapter.subtitle}
                </p>
              </div>

              {/* Main 16px Narrative Paragraphs */}
              <div className="space-y-4 text-base text-ivory-100 leading-[1.7] font-normal measure-prose max-w-[65ch]">
                {activeChapter.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Key Rulers & Core Takeaway Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gold-500/20">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-gold-400 text-[13px] font-medium">
                    <Crown className="w-4 h-4" />
                    <span>Key Sovereign Figures</span>
                  </div>
                  <ul className="space-y-1.5 text-[15px] text-ivory-200">
                    {activeChapter.keyRulers.map((ruler, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-gold-400">•</span>
                        <span>{ruler}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[13px] font-medium text-gold-400 block">
                    Core Historical Takeaway
                  </span>
                  <p className="font-serif italic text-lg text-ivory-100 leading-relaxed">
                    &ldquo;{activeChapter.keyTakeaway}&rdquo;
                  </p>
                  <p className="text-[13px] text-charcoal-400 pt-2">
                    Sources: Deodhai Asam Buranji, Tungkhungia Buranji &amp; E.A. Gait (1906)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Defining Epochs Chronological Ledger */}
        <div className="space-y-8 pt-8 border-t border-gold-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-1.5">
              <span className="text-[13px] font-medium text-gold-400 block">
                Chronological Ledger of the Swargadeos
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-ivory-100 tracking-[-0.015em]">
                10 Defining Epochs: 1228 CE to 2024 CE
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15px] text-charcoal-400 leading-[1.6]">
                Select any epoch below to inspect the royal decrees, military defenses, and
                monumental constructions that shaped Sivasagar.
              </p>
            </div>
          </div>

          {/* 10 Epoch Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {AHOM_TIMELINE.map((item, index) => {
              const isSelected = selectedMilestone === index;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedMilestone(index)}
                  className={`m-btn p-3.5 rounded-lg border text-left ${
                    isSelected
                      ? 'bg-gold-500 text-forest-950 border-gold-400 font-medium'
                      : 'bg-forest-900/50 border-gold-500/20 text-ivory-100 hover:border-gold-500/50'
                  }`}
                >
                  <span className="block text-[13px] font-semibold">{item.year}</span>
                  <span
                    className={`block text-[13px] truncate mt-0.5 ${
                      isSelected ? 'text-forest-900' : 'text-charcoal-400'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Epoch Split Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-forest-900/45 rounded-xl p-6 sm:p-8 border border-gold-500/25">
            {/* Left (Cols 1-5): Clean 4:3 Photograph without Text Overlay */}
            <div className="lg:col-span-5 aspect-[4/3] rounded-lg overflow-hidden bg-forest-950 border border-gold-500/20">
              <SmartImage
                src={activeEpoch.image}
                alt={activeEpoch.title}
                className="w-full h-full object-cover object-center"
                fallbackTitle={activeEpoch.title}
                fallbackCategory="Ahom Era"
              />
            </div>

            {/* Right (Cols 6-12): Historical Record */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-gold-400">
                <span>Epoch: {activeEpoch.year}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 text-ivory-200">
                  <Landmark className="w-4 h-4 text-gold-400" />
                  {activeEpoch.swargadeo}
                </span>
              </div>

              <h4 className="font-serif text-2xl sm:text-4xl font-normal text-ivory-100 leading-tight">
                {activeEpoch.title}
              </h4>

              <p className="text-base text-ivory-200 leading-[1.7] font-normal">
                {activeEpoch.description}
              </p>

              <div className="pt-4 border-t border-gold-500/20 space-y-1">
                <span className="text-[13px] font-medium text-gold-400 block">
                  Historical Significance
                </span>
                <p className="font-serif italic text-lg text-ivory-100">
                  &ldquo;{activeEpoch.significance}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
