"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Compass, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface FloatingDockProps {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  homeSectionId?: string;
  destinationsSectionId?: string;
  footerElementSelector?: string;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  desktopClassName,
  mobileClassName,
  homeSectionId = "home",
  destinationsSectionId = "destinations",
  footerElementSelector = "footer",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isPastHero = false;
    let isFooterVisible = false;

    const updateVisibility = () => {
      setIsVisible(isPastHero && !isFooterVisible);
    };

    const homeEl = document.getElementById(homeSectionId);
    const destinationsEl = document.getElementById(destinationsSectionId);
    const footerEl = document.querySelector(footerElementSelector);

    // 1. Observer for Hero: active while home is in view
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isPastHero = false;
          } else {
            const rect = entry.boundingClientRect;
            if (rect.bottom <= 120) {
              isPastHero = true;
            }
          }
          updateVisibility();
        });
      },
      {
        threshold: [0, 0.15, 0.5],
        rootMargin: "0px",
      }
    );

    // 2. Observer for Destinations: affirmative trigger as soon as destinations enters
    const destObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isPastHero = true;
            updateVisibility();
          }
        });
      },
      {
        threshold: [0, 0.1],
        rootMargin: "0px 0px -10% 0px",
      }
    );

    // 3. Observer for Footer: hides dock as soon as footer enters
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFooterVisible = entry.isIntersecting;
          updateVisibility();
        });
      },
      {
        threshold: [0, 0.05],
        rootMargin: "0px",
      }
    );

    if (homeEl) heroObserver.observe(homeEl);
    if (destinationsEl) destObserver.observe(destinationsEl);
    if (footerEl) footerObserver.observe(footerEl);

    // Initial scroll check in case page was refreshed midway down
    const initialCheck = () => {
      const scrollY = window.scrollY;
      const heroBottom = homeEl ? homeEl.offsetTop + homeEl.offsetHeight : 600;
      const footerTop = footerEl ? (footerEl as HTMLElement).offsetTop : document.body.scrollHeight;
      const viewportBottom = scrollY + window.innerHeight;

      isPastHero = scrollY + 100 >= heroBottom;
      isFooterVisible = viewportBottom >= footerTop + 40;
      updateVisibility();
    };

    initialCheck();
    window.addEventListener("scroll", initialCheck, { passive: true });

    return () => {
      heroObserver.disconnect();
      destObserver.disconnect();
      footerObserver.disconnect();
      window.removeEventListener("scroll", initialCheck);
    };
  }, [homeSectionId, destinationsSectionId, footerElementSelector]);

  return (
    <nav
      aria-label="Floating heritage site navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              duration: 0.28,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="pointer-events-auto"
          >
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FloatingDockMobile: React.FC<{
  items: FloatingDockItem[];
  className?: string;
}> = ({ items, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="mobile-nav"
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 p-2 rounded-2xl bg-forest-950/95 backdrop-blur-xl border border-gold-500/35 shadow-luxury"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 8,
                  transition: { delay: idx * 0.03 },
                }}
                transition={{
                  duration: 0.2,
                  delay: (items.length - 1 - idx) * 0.04,
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    item.onClick?.(e);
                    setOpen(false);
                  }}
                  aria-label={item.title}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-900/90 text-ivory-100 hover:text-gold-400 hover:bg-forest-800 border border-gold-500/25 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <div className="h-5 w-5 flex items-center justify-center">
                    {item.icon}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close heritage navigation menu" : "Open heritage navigation menu"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-950/95 text-gold-400 hover:text-ivory-100 border border-gold-500/40 shadow-luxury active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        {open ? (
          <X className="h-5 w-5 transition-transform duration-200" />
        ) : (
          <Compass className="h-5 w-5 transition-transform duration-200" />
        )}
      </button>
    </div>
  );
};

const FloatingDockDesktop: React.FC<{
  items: FloatingDockItem[];
  className?: string;
}> = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "hidden md:flex h-16 items-end gap-3 rounded-full bg-forest-950/90 backdrop-blur-xl px-4 pb-3 border border-gold-500/35 shadow-luxury",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-140, 0, 140], [42, 68, 42]);
  const heightTransform = useTransform(distance, [-140, 0, 140], [42, 68, 42]);

  const widthTransformIcon = useTransform(distance, [-140, 0, 140], [20, 32, 20]);
  const heightTransformIcon = useTransform(distance, [-140, 0, 140], [20, 32, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={title}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-full"
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-forest-900/90 text-ivory-100 border border-gold-500/25 hover:border-gold-400 hover:text-gold-300 transition-colors shadow-sm"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 6, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute -top-9 left-1/2 w-fit rounded-full border border-gold-500/35 bg-forest-950/95 backdrop-blur-md px-3 py-1 font-serif text-[12px] tracking-wide text-gold-300 shadow-md whitespace-nowrap"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

export default FloatingDock;
