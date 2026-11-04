# Explore Sivasagar — Redesigned & Polished

A premium, luxury editorial-style travel discovery and tourism platform dedicated to the royal heritage, sacred architecture, ancient monuments, and natural splendors of **Sivasagar, Assam, India** — the historic seat of the 600-year Ahom Dynasty (1253–1826 CE).

---

## 🏛️ Recent Redesign Highlights

### 1. Completely Removed Top Navigation Bar
- The page now begins directly at the very top (`pt-0`) with a full-bleed cinematic hero section.
- Zero navbar container interference or artificial padding.
- Replaced with an unobtrusive, floating luxury glass action pill at the bottom-right corner for quick access to the curated itinerary drawer and saved bookmarks.

### 2. Smooth Scrolling, Parallax & Liquid Metal Shader Background
- Animated Liquid Metal Shader background in the Hero Section with custom dark metallic aesthetics, dynamic domain warping, and subtle silver specular highlights.
- Framer Motion `useScroll` and `useTransform` driving an elegant parallax effect on the background.
- Passive pointer wave interaction that does not interfere with touch scrolling or button clicks.
- Hardware-accelerated WebGL with DPR capping, IntersectionObserver-based pause/resume, reduced-motion accessibility, and graceful CSS gradient fallback.

### 3. Authentic High-Resolution Photography
All generic and unrelated imagery has been replaced with authentic, verified photographs of Sivasagar monuments and sites stored directly in `public/images/destinations/`:
- **Rang Ghar**: Iconic two-storeyed royal amphitheatre with boat-shaped roof.
- **Talatal Ghar**: Arched brick military stronghold and subterranean fortress.
- **Kareng Ghar (Garhgaon Palace)**: Imperial step-pyramidal palace in Garhgaon.
- **Sivadol & Borpukhuri**: 104-ft Shiva temple with its authentic 8-ft pure gold dome.
- **Joysagar Tank & Joydol**: Asia’s largest excavated lake (318 acres).
- **Charaideo Maidam**: Sacred royal burial mounds (UNESCO World Heritage Site 2024).
- **Namdang Stone Bridge**: 1703 monolithic carved sandstone bridge on NH-715.
- **Panidehing Bird Sanctuary**: Floodplain wetland sanctuary for migratory waterfowl.
- **Gaurisagar Tank & Temples**: 150-acre reservoir and temple triad.
- **Assam Tai Museum**: Historical museum on the bank of Borpukhuri.

### 4. Cinematic Motion Footer (`motion-footer.tsx`)
- Placed in `src/components/ui/motion-footer.tsx` with shadcn / Tailwind architecture.
- Continuously moving horizontal marquee with antique gold symbols (`✦`).
- Giant background typography (`SIVASAGAR`) with GSAP ScrollTrigger parallax depth.
- Interactive magnetic glass navigation pills for site sections.
- Elegant final reveal message at the absolute bottom: *"Thank you for visiting Sivasagar."* followed by *"DISCOVER THE LEGACY OF ASSAM"*.
- Magnetic Back to Top button with smooth scroll.

### 5. Polished Editorial Travel-Magazine Visuals
- Generous breathing room between sections (`py-28` to `py-32`).
- Deep Forest Green (`#173B32`, `#0F2620`), Warm Ivory (`#F5F1E8`), Antique Gold (`#C6A56B`), and Charcoal (`#202522`).
- High-contrast serif headlines paired with ultra-clean body text.
- Micro-interactions on buttons, cards, and interactive tabs.

---

## 🚀 Running the Project

```bash
# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
