# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Cultural travelers & heritage visitors** planning a respectful, historically informed visit to Sivasagar, Rangpur, Garhgaon, and the UNESCO World Heritage Charaideo Moidams—seeking reliable monument background, spatial context, and practical visiting reference before and during their trip.
- **Students, historians & researchers** studying the six-century Ahom Kingdom (1228–1826 CE), Tai-Ahom statecraft, *Buranji* historiography, indigenous *Karpatia Churna* organic mortar chemistry, and artesian *Pukhuri* hydraulic engineering.
- **People of Assam & the global Assamese diaspora** preserving, documenting, and sharing Sivasagar's civilizational legacy and living cultural traditions.

## Product Purpose

Explore Sivasagar is a non-commercial digital heritage archive and historical information platform dedicated exclusively to Sivasagar, Assam, and the royal legacy of the Ahom Kingdom. It exists to preserve, document, and present Sivasagar's historical monuments, royal architecture, sacred reservoirs, and living cultural identity in one coherent, authoritative publication. Success means a visitor or researcher can understand the verified historical context, construction science, patronage, and geographical layout of Sivasagar's landmarks without commercial clutter or unverified claims.

## Positioning

Unlike commercial tourism portals, booking marketplaces, or generic travel blogs, Explore Sivasagar treats every landmark in Sivasagar as a primary historical document—pairing 15-section documentary monographs, indigenous material science (*Karpatia Churna*, *Doiya Itaa*), artesian hydrology, and primary *Buranji* / ASI / UNESCO citations with an explicit separation between verified archaeological record and oral folklore.

## Operating Context

- Used on desktop and mobile web for both pre-visit historical study and on-site monument navigation across Sivasagar town, Joysagar/Rangpur, Garhgaon, Gaurisagar, Namdang, and Charaideo.
- Grounded in real historical and institutional artifacts: *Buranji* chronicles on *Sanchi-pat* bark, Archaeological Survey of India (ASI Guwahati Circle) records, the 2024 UNESCO World Heritage inscription of the Charaideo Moidams, and Assam State Directorate of Archaeology protection standards.
- Visitors move between reading long-form monument monographs, inspecting chronological epochs (`1228 CE` to `2024 CE`), comparing verified engineering facts against local folklore, plotting routes on the interactive Leaflet coordinate map, and saving a personal `sivasagar_saved_places` study circuit.

## Capabilities and Constraints

- **Strictly Non-Commercial**: Never include hotel bookings, taxi booking widgets, commercial tour packages, paid listings, business directories, or user account gates.
- **Historical & Epistemic Integrity**: Never fabricate historical dates, Swargadeo rulers, architectural dimensions, or sources. Always distinguish verified historical/archaeological evidence from local legends (explicitly badged as oral tradition/folklore).
- **Visitor Information Advisory**: Monument timings, ASI entry tariffs, and transit notes must always carry the explicit advisory `"Please verify locally before visiting"` rather than presenting changing operational hours or fees as static guarantees.
- **Technical & Structural Constraints**:
  - React 19 + Vite 8 + TypeScript + Tailwind CSS single-page application.
  - Deployed to GitHub Pages under the base path `/explore-sivasagar/` (all local `public/` assets must resolve via `import.meta.env.BASE_URL`).
  - No conventional top navigation bar; the experience opens directly into the full-bleed Hero section (`LiquidMetalShader`) and closes with the `CinematicFooter` (`src/components/ui/motion-footer.tsx`).
  - Interactive Leaflet cartographic survey (`src/components/InteractiveMap.tsx`), 15-section monograph reader (`src/components/DestinationDetailModal.tsx`), and `localStorage`-backed Saved Heritage Study List (`src/components/TripPlannerDrawer.tsx`) must remain intact.

## Brand Commitments

- **Name**: Explore Sivasagar
- **Central Motto**: *"Preserving the Past. Sharing the Legacy. Celebrating Sivasagar."*
- **Closing Signature**: *"Thank you for visiting Sivasagar. — DISCOVER THE LEGACY OF ASSAM"*
- **Voice & Tone**: Scholarly, respectful, plainspoken, and editorial—free of commercial hype or unverified superlatives.
- **Binding Palette & Surface Identity**: Luxury heritage museum palette anchored in Deep Forest Green (`#071B16`, `#12382D`), Antique Gold (`#C6A56B`), Warm Ivory (`#F4EFE5`), Stone Beige (`#D8D0C1`), Charcoal (`#252A26`), and Muted Sage (`#A9B3AA`), paired with `Cormorant Garamond` and `Instrument Sans` (with `Cinzel` scoped to the footer background wordmark).

## Evidence on Hand

- **10 Documented Monument Monographs** in `src/data/sivasagarData.ts` (`DESTINATIONS`): *Rang Ghar*, *Talatal Ghar*, *Kareng Ghar*, *Sivadol & Sivasagar Tank*, *Joysagar Tank & Joydol*, *Charaideo Maidams*, *Namdang Stone Bridge*, *Gaurisagar Tank & Temples*, *Assam Tai Museum*, and *Panidehing Bird Sanctuary*.
- **4 Ahom History Chapters** (`AHOM_HISTORY_CHAPTERS`), **10 Chronological Epochs** (`AHOM_TIMELINE`), **5 Scientific & Archaeological Dossiers** (`HISTORICAL_DISCOVERIES`), **5 Living Tradition Profiles** (`EXPERIENCES`), **3 Study Circuits** (`ITINERARIES`), and **12 Archival Gallery Plates** (`GALLERY_ITEMS`).
- **Local Photography Assets**: Stored in `public/images/destinations/` (`rang-ghar.jpg`, `talatal-ghar.jpg`, `kareng-ghar.jpg`, `sivadol.JPG`, `joysagar.jpg`, `charaideo.jpg`, `namdang.jpg`, `panidehing.jpg`, `gaurisagar.jpg`, `tai-museum.jpg`).
- **Absences Not to Fabricate**: Do not invent visitor reviews, testimonials, ratings, live ticket-purchasing APIs, or unverified archaeological measurements.

## Product Principles

1. **Primary-Source Authority Over Tourism Hype**: Present every monument through verified chronology, royal patronage, and material engineering rather than promotional slogans.
2. **Explicit Epistemic Honesty**: Separate documented archaeological facts from cherished oral folklore side by side so both history and local tradition are respected without confusion.
3. **Museum-Grade Reading Clarity**: Prioritize quiet typographic hierarchy, equal grid alignment, uncluttered photography, and open reference ledgers over decorative UI noise.
4. **Stewardship Over Commercialization**: Guide visitors toward respectful monument etiquette, conservation awareness, and verified local inquiry rather than transactional funnels.

## Accessibility & Inclusion

- High-contrast text legibility across both Warm Ivory (`#F4EFE5` / `#FAF7F2`) reading surfaces and Deep Forest (`#071B16` / `#0C2820`) exhibition bands, with body copy at `16px` (`1rem`) and nothing below `13px`.
- Full keyboard navigation, semantic landmarks, descriptive `alt` text with graceful image fallbacks (`SmartImage.tsx`), and `@media (prefers-reduced-motion: reduce)` support across all interactive controls.

