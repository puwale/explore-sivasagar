import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ChevronDown, Compass, ShieldCheck, Award, MapPin, Sparkles } from 'lucide-react';
import { LiquidMetalShader } from './LiquidMetalShader';

interface HeroProps {
  onExploreDestinations: () => void;
  onDiscoverHeritage: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDestinations, onDiscoverHeritage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], ['0%', '12%']);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest-950 text-ivory-100 pt-0 pb-16"
    >
      {/* Liquid Metal Shader Animated Full-bleed Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full"
      >
        <LiquidMetalShader
          baseColor="#1A1A1A"
          metalColor="#AEB8C4"
          highlightColor="#FFFFFF"
          distortion={0.45}
          speed={0.35}
          interactive={true}
          className="w-full h-full"
        />

        {/* Sophisticated Editorial Vignettes & Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-forest-950/70 pointer-events-none" />
      </motion.div>

      {/* Atmospheric Golden Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/15 rounded-full blur-[140px] pointer-events-none z-[1]" />

      {/* Content Container with Framer Motion Animation */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24"
      >
        {/* Top Floating Brand Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-forest-900/80 border border-gold-500/40 backdrop-blur-md mb-6 shadow-gold-glow">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gold-300 font-display">
            DISCOVER ASSAM
          </span>
          <span className="text-ivory-200/40 text-xs">•</span>
          <span className="text-[11px] sm:text-xs tracking-wider text-ivory-200/90 font-light">
            Royal Seat of 600-Year Dynasty
          </span>
        </motion.div>

        {/* Regal Title */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ivory-50 leading-[1.06] mb-6 drop-shadow-lg"
        >
          Where History{' '}
          <span className="italic font-normal font-serif text-gold-400 gold-gradient-text block sm:inline">
            Lives Forever.
          </span>
        </motion.h1>

        {/* Supporting Editorial Paragraph */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-ivory-200/90 font-light leading-relaxed mb-10 tracking-wide"
        >
          Explore the timeless heritage, royal architecture, ancient monuments, and natural beauty
          of Sivasagar — the eternal capital of the legendary Ahom Kingdom.
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 35px -5px rgba(198, 165, 107, 0.45)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreDestinations}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-forest-950 font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-gold-glow flex items-center justify-center gap-2.5 group transition-all"
          >
            <span>Explore Destinations</span>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(23, 59, 50, 0.85)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onDiscoverHeritage}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-forest-900/70 border border-gold-400/40 text-ivory-100 font-medium text-xs sm:text-sm tracking-[0.16em] uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <span>Discover Our Heritage</span>
          </motion.button>
        </motion.div>

        {/* Cinematic Metric Highlights Bar */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 max-w-4xl mx-auto pt-8 border-t border-gold-500/25 text-left"
        >
          <motion.div
            whileHover={{ y: -3, borderColor: 'rgba(198, 165, 107, 0.5)' }}
            className="p-4 rounded-2xl bg-forest-900/60 border border-gold-500/20 backdrop-blur-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-gold-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">UNESCO 2024</span>
            </div>
            <p className="text-sm font-serif font-semibold text-ivory-100">Charaideo Maidams</p>
            <p className="text-[11px] text-ivory-300/70 font-light">Pyramids of Assam</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: 'rgba(198, 165, 107, 0.5)' }}
            className="p-4 rounded-2xl bg-forest-900/60 border border-gold-500/20 backdrop-blur-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-gold-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">600 Years</span>
            </div>
            <p className="text-sm font-serif font-semibold text-ivory-100">Unvanquished Rule</p>
            <p className="text-[11px] text-ivory-300/70 font-light">1253 – 1826 CE</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: 'rgba(198, 165, 107, 0.5)' }}
            className="p-4 rounded-2xl bg-forest-900/60 border border-gold-500/20 backdrop-blur-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-gold-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">10+ Monuments</span>
            </div>
            <p className="text-sm font-serif font-semibold text-ivory-100">Royal Strongholds</p>
            <p className="text-[11px] text-ivory-300/70 font-light">ASI Protected Heritage</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: 'rgba(198, 165, 107, 0.5)' }}
            className="p-4 rounded-2xl bg-forest-900/60 border border-gold-500/20 backdrop-blur-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-gold-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">318 Acres</span>
            </div>
            <p className="text-sm font-serif font-semibold text-ivory-100">Joysagar Lake</p>
            <p className="text-[11px] text-ivory-300/70 font-light">Asia’s Largest Manmade Lake</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Elegant Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        onClick={onExploreDestinations}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300 font-medium">
          Scroll to explore
        </span>
        <div className="p-1.5 rounded-full text-gold-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </motion.div>
    </section>
  );
};
