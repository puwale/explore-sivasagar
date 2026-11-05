import React from 'react';
import { ArrowRight, Award, ShieldCheck, MapPin, Droplets } from 'lucide-react';
import { LiquidMetalShader } from './LiquidMetalShader';

interface HeroProps {
  onExploreDestinations: () => void;
  onDiscoverHeritage: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDestinations, onDiscoverHeritage }) => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-forest-950 text-ivory-100 pt-10 sm:pt-20 lg:pt-24 pb-8 sm:pb-12"
    >
      {/* Liquid Metal Shader Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <LiquidMetalShader
          baseColor="#071B16"
          metalColor="#8F9E95"
          highlightColor="#F4EFE5"
          distortion={0.4}
          speed={0.3}
          interactive={true}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/75 pointer-events-none" />
      </div>

      {/* Main Content Container on Equal Edges (.wrap-museum) */}
      <div className="relative z-10 wrap-museum flex-1 flex flex-col justify-center py-5 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end">
          {/* Left Column (Cols 1-8): Category Line, H1, Motto */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-3 text-[13px] font-medium text-gold-400 border-b border-gold-500/35 pb-2">
              <span>Digital Heritage Archive</span>
              <span className="text-gold-500/50">•</span>
              <span className="text-ivory-200">Sivasagar, Assam (Rangpur &amp; Garhgaon)</span>
            </div>

            <h1 className="font-serif text-[2.6rem] sm:text-6xl lg:text-[4.5rem] font-normal tracking-[-0.025em] text-ivory-100 leading-[1.06]">
              Historical Monuments &amp; Royal Citadels of{' '}
              <span className="italic text-gold-400">Sivasagar.</span>
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-gold-400 tracking-wide">
              Preserving the Past. Sharing the Legacy. Celebrating Sivasagar.
            </p>
          </div>

          {/* Right Column (Cols 9-12): Plain Lead Paragraph & Two Actions */}
          <div className="lg:col-span-4 space-y-6 lg:pb-1">
            <p className="text-base sm:text-[17px] text-ivory-200 font-normal leading-[1.65]">
              Documenting six centuries of the Ahom Kingdom (1228–1826 CE)—its brick step-palaces,
              two-storeyed royal pavilion, artesian water reservoirs, and UNESCO World Heritage
              burial mounds at Charaideo.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                onClick={onExploreDestinations}
                className="m-btn h-12 px-6 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-medium text-[15px] flex items-center justify-center gap-2.5"
              >
                <span>Read 10 Site Monographs</span>
                <ArrowRight className="w-4 h-4 m-arrow" />
              </button>

              <button
                onClick={onDiscoverHeritage}
                className="m-btn h-12 px-6 rounded-full bg-forest-900/90 hover:bg-forest-800 border border-gold-500/40 text-ivory-100 font-medium text-[15px] flex items-center justify-center"
              >
                <span>Read Ahom History</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Docked Fact Strip at Foot of First Screen */}
      <div className="relative z-10 wrap-museum pt-6 border-t border-gold-500/25">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold-400 text-[13px] font-medium">
              <Award className="w-4 h-4 shrink-0" />
              <span>UNESCO World Heritage (2024)</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-ivory-100 font-medium">
              Charaideo Moidams
            </p>
            <p className="text-[13px] text-charcoal-400">
              Royal Mound-Burial System (1253&nbsp;CE&nbsp;onwards)
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold-400 text-[13px] font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>598 Years of Sovereignty</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-ivory-100 font-medium">
              1228 – 1826 CE
            </p>
            <p className="text-[13px] text-charcoal-400">
              Founded by Chaolung Sukaphaa across the Patkai
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold-400 text-[13px] font-medium">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>10 Documented Landmarks</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-ivory-100 font-medium">
              Rangpur &amp; Garhgaon
            </p>
            <p className="text-[13px] text-charcoal-400">
              ASI &amp; Assam State Protected Monuments
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold-400 text-[13px] font-medium">
              <Droplets className="w-4 h-4 shrink-0" />
              <span>318-Acre Artesian Reservoir</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-ivory-100 font-medium">
              Joysagar Tank (1697 CE)
            </p>
            <p className="text-[13px] text-charcoal-400">
              Excavated in 45 days under King&nbsp;Rudra&nbsp;Singha
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
