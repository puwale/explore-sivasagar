"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BookOpen,
  Compass,
  Home,
  Images,
  Landmark,
  Map,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingDockItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface FloatingDockProps {
  items: FloatingDockItem[];
  className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <>
      <nav
        aria-label="Heritage quick navigation"
        className={cn(
          "fixed bottom-5 left-1/2 z-[45] hidden -translate-x-1/2 md:block",
          className,
        )}
      >
        <motion.div
          onMouseMove={(event) => mouseX.set(event.clientX)}
          onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
          className="flex h-[76px] items-end gap-3 rounded-[26px] border border-[#C6A56B]/30 bg-[#071B16]/80 px-4 pb-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
        >
          {items.map((item) => (
            <DockIcon key={item.title} item={item} mouseX={mouseX} />
          ))}
        </motion.div>
      </nav>

      <MobileDock items={items} />
    </>
  );
}

function DockIcon({
  item,
  mouseX,
}: {
  item: FloatingDockItem;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? value - bounds.left - bounds.width / 2 : Number.POSITIVE_INFINITY;
  });
  const size = useSpring(
    useTransform(distance, [-150, 0, 150], [42, 62, 42]),
    { mass: 0.12, stiffness: 170, damping: 16 },
  );
  const iconSize = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 28, 20]),
    { mass: 0.12, stiffness: 170, damping: 16 },
  );
  const [hovered, setHovered] = useState(false);

  return (
    <a
      ref={ref}
      href={item.href}
      aria-label={item.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center justify-end pb-0.5 text-[#F4EFE5] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A56B] focus-visible:ring-offset-4 focus-visible:ring-offset-[#071B16] rounded-full"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -top-9 whitespace-nowrap rounded-md border border-[#C6A56B]/25 bg-[#071B16]/95 px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#F4EFE5] shadow-lg"
          >
            {item.title}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full border border-[#C6A56B]/15 bg-[#12382D]/90 text-[#F4EFE5] transition-colors group-hover:border-[#C6A56B]/60 group-hover:text-[#C6A56B]"
      >
        <motion.span style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
          {item.icon}
        </motion.span>
      </motion.span>
    </a>
  );
}

function MobileDock({ items }: { items: FloatingDockItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Heritage quick navigation"
      className="fixed bottom-5 left-1/2 z-[45] -translate-x-1/2 md:hidden"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[58px] left-1/2 flex -translate-x-1/2 flex-col gap-2 rounded-2xl border border-[#C6A56B]/30 bg-[#071B16]/90 p-2 shadow-2xl backdrop-blur-2xl"
          >
            {items.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 min-w-[158px] items-center gap-3 rounded-xl px-3 text-xs font-medium text-[#F4EFE5] transition-colors hover:bg-[#C6A56B]/10 hover:text-[#C6A56B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A56B]"
              >
                <span className="flex h-5 w-5 items-center justify-center">{item.icon}</span>
                {item.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-label={open ? "Close quick navigation" : "Open quick navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C6A56B]/40 bg-[#071B16]/90 text-[#C6A56B] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-[#12382D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A56B]"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </nav>
  );
}

export const HERITAGE_DOCK_ITEMS: FloatingDockItem[] = [
  { title: "Home", href: "#home", icon: <Home className="h-full w-full" /> },
  { title: "Explore", href: "#destinations", icon: <Compass className="h-full w-full" /> },
  { title: "Heritage", href: "#heritage", icon: <Landmark className="h-full w-full" /> },
  { title: "Map", href: "#map", icon: <Map className="h-full w-full" /> },
  { title: "Gallery", href: "#gallery", icon: <Images className="h-full w-full" /> },
];
