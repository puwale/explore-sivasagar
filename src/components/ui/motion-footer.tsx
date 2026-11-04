"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, ArrowUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE LUXURY HERITAGE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #071B16;
  color: #F4EFE5;
  
  /* Sivasagar Luxury Heritage Color Tokens */
  --footer-bg-primary: #071B16;
  --footer-bg-secondary: #12382D;
  --footer-gold: #C6A56B;
  --footer-gold-glow: rgba(198, 165, 107, 0.4);
  --footer-ivory: #F4EFE5;
  --footer-charcoal: #252A26;
  --footer-muted: #A9B3AA;
  
  /* Glass Pill Interactive Theming */
  --pill-bg-1: rgba(18, 56, 45, 0.55);
  --pill-bg-2: rgba(7, 27, 22, 0.75);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(198, 165, 107, 0.28);
  --pill-inset-shadow: rgba(0, 0, 0, 0.7);
  --pill-border: rgba(198, 165, 107, 0.22);
  
  --pill-bg-1-hover: rgba(18, 56, 45, 0.85);
  --pill-bg-2-hover: rgba(198, 165, 107, 0.18);
  --pill-border-hover: rgba(198, 165, 107, 0.65);
  --pill-shadow-hover: rgba(198, 165, 107, 0.25);
  --pill-highlight-hover: rgba(244, 239, 229, 0.45);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(198, 165, 107, 0.4)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(198, 165, 107, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 9s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 36s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 56px 56px;
  background-image: 
    linear-gradient(to right, rgba(198, 165, 107, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(198, 165, 107, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Theme-adaptive Aurora Glow with Antique Gold & Deep Emerald */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(198, 165, 107, 0.16) 0%, 
    rgba(18, 56, 45, 0.4) 40%, 
    transparent 75%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 15px 35px -8px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #F4EFE5;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-family: 'Cinzel', serif;
  font-size: clamp(3rem, 13.5vw, 14.5rem);
  line-height: 0.85;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(198, 165, 107, 0.22);
  background: linear-gradient(180deg, rgba(198, 165, 107, 0.18) 0%, rgba(244, 239, 229, 0.02) 55%, transparent 95%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, #F4EFE5 45%, #C6A56B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(198, 165, 107, 0.25));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MARQUEE ITEM
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-8 md:space-x-12 px-4 md:px-6 shrink-0">
    <span className="hover:text-[#F4EFE5] transition-colors">DISCOVER SIVASAGAR</span>
    <span className="text-[#C6A56B] text-base drop-shadow-[0_0_8px_rgba(198,165,107,0.6)]">✦</span>
    <span className="hover:text-[#F4EFE5] transition-colors">EXPLORE ASSAM</span>
    <span className="text-[#C6A56B] text-base drop-shadow-[0_0_8px_rgba(198,165,107,0.6)]">✦</span>
    <span className="hover:text-[#F4EFE5] transition-colors">AHOM HERITAGE</span>
    <span className="text-[#C6A56B] text-base drop-shadow-[0_0_8px_rgba(198,165,107,0.6)]">✦</span>
    <span className="hover:text-[#F4EFE5] transition-colors">HISTORY &amp; CULTURE</span>
    <span className="text-[#C6A56B] text-base drop-shadow-[0_0_8px_rgba(198,165,107,0.6)]">✦</span>
    <span className="hover:text-[#F4EFE5] transition-colors">THE LEGACY OF ASSAM</span>
    <span className="text-[#C6A56B] text-base drop-shadow-[0_0_8px_rgba(198,165,107,0.6)]">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export interface CinematicFooterProps {
  onNavigate?: (sectionId: string) => void;
  className?: string;
}

export function CinematicFooter({ onNavigate, className }: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const thankYouRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simple static fade-in if reduced motion preferred
        gsap.set([giantTextRef.current, headingRef.current, descriptionRef.current, linksRef.current, thankYouRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Background Giant Typography Parallax Effect
      gsap.fromTo(
        giantTextRef.current,
        { y: "8vh", scale: 0.85, opacity: 0.15 },
        {
          y: "-3vh",
          scale: 1,
          opacity: 0.85,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, descriptionRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 65%",
            end: "center center",
            scrub: 0.8,
          },
        }
      );

      // Final Thank You Message Reveal
      gsap.fromTo(
        thankYouRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: thankYouRef.current,
            start: "top 90%",
            end: "bottom 95%",
            scrub: 0.8,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navigationLinks = [
    { label: "Home", targetId: "home" },
    { label: "Explore Destinations", targetId: "destinations" },
    { label: "Ahom Heritage", targetId: "heritage" },
    { label: "Photo Gallery", targetId: "gallery" },
    { label: "Travel Guide", targetId: "guide" },
    { label: "About Sivasagar", targetId: "experiences" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        ref={wrapperRef}
        className={cn(
          "relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#071B16] text-[#F4EFE5] cinematic-footer-wrapper pt-14 pb-8 z-20 border-t border-[#C6A56B]/20",
          className
        )}
      >
        {/* Ambient Light & Grid Background */}
        <div className="footer-aurora absolute left-1/2 top-1/3 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none opacity-70" />

        {/* Giant Background Typography: SIVASAGAR */}
        <div
          ref={giantTextRef}
          aria-hidden="true"
          className="footer-giant-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center"
        >
          SIVASAGAR
        </div>

        {/* 1. Diagonal Sleek Marquee (Top of footer) */}
        <div className="relative w-full overflow-hidden border-y border-[#C6A56B]/25 bg-[#071B16]/80 backdrop-blur-md py-4 z-10 shadow-2xl mb-12 sm:mb-16">
          <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-semibold tracking-[0.28em] text-[#A9B3AA] uppercase select-none">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 2. Main Center Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 max-w-5xl mx-auto w-full text-center">
          {/* Subtle Decorative Brand Emblem */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12382D]/70 border border-[#C6A56B]/35 mb-6 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span className="text-[11px] font-medium tracking-[0.22em] text-[#C6A56B] uppercase font-display">
              Royal Seat of 600-Year Dynasty
            </span>
          </div>

          {/* Luxury Serif Heading */}
          <h2
            ref={headingRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight footer-text-glow leading-[1.08] mb-6"
          >
            Continue Exploring.
          </h2>

          {/* Supporting Description */}
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#A9B3AA] font-light leading-relaxed mb-10 tracking-wide"
          >
            Discover the timeless beauty, royal architecture, ancient monuments, and extraordinary cultural heritage of Sivasagar.
          </p>

          {/* Interactive Magnetic Navigation Pills */}
          <div ref={linksRef} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full max-w-4xl">
            {navigationLinks.map((link) => (
              <MagneticButton
                key={link.targetId}
                as="button"
                onClick={(e: React.MouseEvent) => handleLinkClick(e, link.targetId)}
                className="footer-glass-pill px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[#F4EFE5] font-medium text-xs sm:text-sm tracking-[0.12em] uppercase transition-all duration-300 flex items-center gap-2 group"
              >
                <span className="group-hover:text-[#C6A56B] transition-colors">{link.label}</span>
                <span className="text-[#C6A56B]/40 group-hover:text-[#C6A56B] group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* 3. Middle Bar: Copyright & Back to Top */}
        <div className="relative z-10 w-full max-w-7xl mx-auto mt-16 sm:mt-20 pt-8 pb-4 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#C6A56B]/15 text-xs text-[#A9B3AA]">
          {/* Copyright */}
          <div className="text-[11px] sm:text-xs font-light tracking-wider order-2 md:order-1 text-center md:text-left">
            © 2026 Explore Sivasagar. All Rights Reserved.
          </div>

          {/* Heritage Badge */}
          <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-[#C6A56B]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4EFE5]">
              Assam Tai-Ahom Heritage Archives
            </span>
          </div>

          {/* Back to top Button */}
          <div className="order-3 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A56B] font-medium hidden sm:inline">
              Back to Top
            </span>
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Scroll smoothly back to top of page"
              className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-[#C6A56B] hover:text-[#F4EFE5] group border-[#C6A56B]/30 hover:border-[#C6A56B]"
            >
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </div>

        {/* 4. FINAL THANK YOU MESSAGE — VERY IMPORTANT (Absolute bottom of entire footer) */}
        <div
          ref={thankYouRef}
          className="relative z-10 w-full max-w-4xl mx-auto pt-10 sm:pt-14 pb-8 sm:pb-12 px-4 text-center"
        >
          {/* Subtle Decorative Antique Gold Separator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#C6A56B]/50 to-[#C6A56B]" />
            <span className="text-[#C6A56B] text-xs sm:text-sm">✦</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#C6A56B]" />
            <span className="text-[#C6A56B] text-xs sm:text-sm">✦</span>
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#C6A56B]/50 to-[#C6A56B]" />
          </div>

          {/* Primary Thank You Message */}
          <h3 className="font-serif italic text-2xl sm:text-4xl md:text-5xl font-normal text-[#F4EFE5] tracking-tight mb-3 drop-shadow-md">
            &ldquo;Thank you for visiting Sivasagar.&rdquo;
          </h3>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#C6A56B] font-display">
            DISCOVER THE LEGACY OF ASSAM
          </p>
        </div>
      </footer>
    </>
  );
}

