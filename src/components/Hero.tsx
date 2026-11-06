import React from 'react';
import { Award, ShieldCheck, MapPin, Droplets } from 'lucide-react';
import rangGharHeroBg from '../assets/images/rang-ghar-hero-bg.png';

interface HeroProps {
  onExploreDestinations?: () => void;
  onDiscoverHeritage?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-forest-950 text-ivory-100 pt-10 sm:pt-20 lg:pt-24 pb-8 sm:pb-12"
    >
      {/* Cinematic Rang Ghar Landscape Background */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-no-repeat bg-[center_right_30%] sm:bg-[center_right_25%] md:bg-[center_right_20%] lg:bg-center"
          style={{ backgroundImage: `url(${rangGharHeroBg})` }}
        />

        {/* Mobile & Tablet (< lg): Balanced emerald overlay ensuring full text legibility while revealing Rang Ghar */}
        <div
          className="lg:hidden absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7, 27, 22, 0.88) 0%, rgba(7, 27, 22, 0.74) 45%, rgba(7, 27, 22, 0.85) 75%, rgba(7, 27, 22, 0.97) 100%)',
          }}
        />

        {/* Desktop (lg+): Horizontal cinematic emerald gradient.
            - Left: deep forest green (#071B16) for high contrast text readability.
            - Center: softer transparent emerald transition.
            - Right: transparent to preserve vibrant sunset orange, pavilion brickwork & sky.
        */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(7, 27, 22, 0.96) 0%, rgba(7, 27, 22, 0.90) 36%, rgba(7, 27, 22, 0.68) 55%, rgba(7, 27, 22, 0.32) 72%, rgba(7, 27, 22, 0.06) 88%, rgba(7, 27, 22, 0) 100%)',
          }}
        />

        {/* Bottom subtle dark emerald gradient for the heritage facts row */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 sm:h-52"
          style={{
            background:
              'linear-gradient(to top, rgba(7, 27, 22, 0.97) 0%, rgba(7, 27, 22, 0.75) 45%, rgba(7, 27, 22, 0) 100%)',
          }}
        />

        {/* Top subtle vignette for header bar readability */}
        <div
          className="absolute inset-x-0 top-0 h-24 sm:h-28"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7, 27, 22, 0.65) 0%, rgba(7, 27, 22, 0) 100%)',
          }}
        />
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
