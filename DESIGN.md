---
name: "Explore Sivasagar — The Royal Archival Monograph"
description: "A digital heritage archive and open-air museum design system uniting royal Tai-Ahom materiality (Imperial Rangpur Forest, Swargadeo Antique Gold, Sanchi-Pat Warm Ivory, and Mohi Ink Charcoal) with crisp modern editorial precision."

colors:
  primary: "#071B16"
  primary-container: "#0C2820"
  on-primary: "#F4EFE5"
  secondary: "#12382D"
  secondary-container: "#184739"
  on-secondary: "#F4EFE5"
  tertiary: "#C6A56B"
  tertiary-container: "#D5B77E"
  on-tertiary: "#071B16"
  accent-gold-deep: "#8A6D3A"
  background: "#F4EFE5"
  surface: "#FAF7F2"
  surface-container-low: "#F4EFE5"
  surface-container: "#E8E0D1"
  surface-container-high: "#D8D0C1"
  on-surface: "#252A26"
  on-surface-variant: "#4A534D"
  on-dark-muted: "#A9B3AA"
  outline: "#252A26"
  outline-variant: "#D8D0C1"
  error: "#9E2A2B"
  warning: "#B87D28"
  success: "#2D6A4F"

typography:
  fontFamily:
    display: "Cormorant Garamond, Georgia, serif"
    body: "Instrument Sans, system-ui, -apple-system, sans-serif"
    mono: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
  scale:
    display:
      size: "clamp(2.6rem, 5vw, 4.5rem)"
      lineHeight: "1.06"
      weight: 400
      tracking: "-0.025em"
    h1:
      size: "clamp(2.25rem, 4.2vw, 3.5rem)"
      lineHeight: "1.08"
      weight: 400
      tracking: "-0.022em"
    h2:
      size: "clamp(1.875rem, 3.5vw, 3rem)"
      lineHeight: "1.1"
      weight: 400
      tracking: "-0.02em"
    title:
      size: "1.5rem"
      lineHeight: "1.28"
      weight: 500
      tracking: "-0.01em"
    body:
      size: "1rem"
      lineHeight: "1.68"
      weight: 400
      tracking: "0em"
    label:
      size: "0.8125rem"
      lineHeight: "1.4"
      weight: 500
      tracking: "0.01em"

rounded:
  none: "0px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "64px"
  3xl: "120px"

components:
  button:
    primary:
      backgroundColor: "{colors.primary}"
      textColor: "{colors.on-primary}"
      typography: "label"
      rounded: "{rounded.full}"
      padding: "12px 24px"
    gold:
      backgroundColor: "{colors.tertiary}"
      textColor: "{colors.on-tertiary}"
      typography: "label"
      rounded: "{rounded.full}"
      padding: "14px 28px"
    secondary:
      backgroundColor: "{colors.surface}"
      textColor: "{colors.on-surface}"
      typography: "label"
      rounded: "{rounded.full}"
      padding: "12px 24px"
  chip:
    default:
      backgroundColor: "{colors.surface}"
      textColor: "{colors.on-surface-variant}"
      typography: "label"
      rounded: "{rounded.full}"
      padding: "10px 20px"
    selected:
      backgroundColor: "{colors.primary}"
      textColor: "{colors.on-primary}"
      typography: "label"
      rounded: "{rounded.full}"
      padding: "10px 20px"
  card:
    default:
      backgroundColor: "{colors.surface}"
      textColor: "{colors.on-surface}"
      rounded: "{rounded.lg}"
      padding: "28px"
    dark:
      backgroundColor: "{colors.primary-container}"
      textColor: "{colors.on-primary}"
      rounded: "{rounded.lg}"
      padding: "28px"
  input:
    default:
      backgroundColor: "{colors.surface}"
      textColor: "{colors.on-surface}"
      typography: "body"
      rounded: "{rounded.md}"
      padding: "12px 16px"
      height: "44px"
  navigation:
    default:
      backgroundColor: "{colors.primary}"
      textColor: "{colors.on-primary}"
      rounded: "{rounded.full}"
      padding: "10px 20px"
      height: "44px"
---

## Overview

**Creative North Star: "The Royal Archival Monograph"**

Explore Sivasagar is an open-air digital museum and scholarly monograph dedicated to the six-century Ahom Kingdom (1228–1826 CE) and the historic monuments, hydraulic engineering, and living cultural traditions of Sivasagar, Assam. Its design language rejects commercial travel-portal tropes—booking widgets, star ratings, promotional countdowns, and generic SaaS card grids—in favor of the quiet permanence of an exhibition catalogue from the British Museum, the architectural restraint of Aman Resorts, and the typographic rigor of a university press monograph.

Every screen operates as a curated gallery room. Deep architectural expanses of *Imperial Rangpur Forest* (`#071B16`) alternate deliberately with sunlit folio spreads of *Sanchi-Pat Warm Ivory* (`#F4EFE5`), allowing long-form historical scholarship to breathe without visual fatigue. Proportions are governed by an equal-edge museum container (`.wrap-museum`), a 12-column architectural grid, and crisp `1px` hairline ledger dividers that honor the precision of Ahom royal *Buranji* chronicles and *koral* masonry.

**Key Characteristics:**
- **Bimodal Exhibition Rhythm:** Deliberate alternation between contemplative dark sanctuary chapters (`#071B16` / `#12382D`) and high-legibility parchment reading rooms (`#F4EFE5` / `#FAF7F2`).
- **Editorial Serif & Humanist Sans Pairing:** High-contrast literary display typography (*Cormorant Garamond*) paired with clean, unpretentious archival UI and prose copy (*Instrument Sans*).
- **12-Column Museum Header Split:** Every major section opens with a numbered archive index (`01 / Architectural Catalogue`), a 7-column serif headline on the left, and a 5-column contextual lead paragraph aligned to the bottom baseline on the right.
- **Flat-By-Default Hairline Ledger Architecture:** Cards, specification matrices, and comparison tables sit flat at rest inside `1px` structural hairlines, rising only on deliberate pointer interaction.
- **Zero Top Navbar Chrome:** The viewport opens directly into the full-bleed monument hero without a conventional sticky top navigation bar; wayfinding occurs through hero CTAs, in-section archival jump pills, and a floating "Saved Study List" museum drawer trigger.

---

## Colors

### Primary

- **Imperial Rangpur Forest** (`#071B16` · `primary` / `forest-950`): The foundational nocturnal sanctuary tone. Used for the Hero backdrop, the Royal Dynasty Chronicle (`HeritageSection`), the Cartographic Survey (`InteractiveMap`), the Living Cultural Traditions (`ExperiencesSection`), the Visual Archive (`PhotoGallery`), and primary solid pill buttons on light ivory surfaces.
- **Sanctuary Vault Green** (`#0C2820` · `primary-container` / `forest-900`): Elevated dark architectural surface used for exhibition cards, dynasty chapter panels, and sidebar drawers inside dark sections.
- **Swargadeo Antique Gold** (`#C6A56B` · `tertiary` / `gold-500`): Drawn from the gilded copper *kalash* finial of the Sivadol. Reserved for primary action pills on dark surfaces, active filter indicators, historical timeline nodes, and `1px` hairline borders on forest backgrounds (at 20–35% opacity).
- **Gilded Kalash Highlight** (`#D5B77E` · `tertiary-container` / `gold-400`): High-luminance gold used for overlines, numerals, and interactive icon states on deep forest backgrounds where `#C6A56B` needs additional legibility.
- **Inscribed Bronze Gold** (`#8A6D3A` · `accent-gold-deep` / `gold-700`): Deepened antique bronze formulated specifically to pass WCAG AA contrast when rendering gold overlines, archival index numbers, and citations on warm ivory (`#F4EFE5`) surfaces.

### Secondary

- **Deep Sanctuary Pine** (`#12382D` · `secondary` / `forest-800`): Secondary dark architectural tone used for subtle hover states on dark cards, map active list rows, and high-contrast section index labels on ivory backgrounds.
- **Canopy Moss Green** (`#184739` · `secondary-container` / `forest-700`): Interactive border and focus ring reinforcement on dark surfaces.

### Neutral

- **Vellum Sheet Ivory** (`#FAF7F2` · `surface` / `ivory-50`): Purest warm archival paper tone. Used for elevated monument cards, the 15-section Destination Monograph modal sheet, and table cells resting on `#F4EFE5`.
- **Sanchi-Pat Warm Ivory** (`#F4EFE5` · `background` / `ivory-100`): Named after the traditional *Sanchi-pat* (agarwood bark) manuscripts of Assam. Serves as the primary reading background for light chapters (`ExploreDestinations`, `HistoricalDiscoveriesSection`, `TravelGuideSection`) and the primary display text color on dark forest backgrounds.
- **Aged Folio Parchment** (`#E8E0D1` · `surface-container` / `ivory-200`): Secondary warm tone used for recessed callout boxes, folklore framing blocks, and secondary body copy on dark forest sections.
- **Namdang Sandstone Beige** (`#D8D0C1` · `surface-container-high` / `ivory-300`): Inspired by the quarried sandstone blocks of the Namdang Stone Bridge. Used for subtle badge fills, table header tints, and structural dividers on light surfaces.
- **Mohi Ink Charcoal** (`#252A26` · `on-surface` / `charcoal-800`): Named after traditional Assamese *Maah-Mohi* archival ink. Serves as the primary headline and UI ink on warm ivory surfaces, and as the base color for `1px` hairline borders (`rgba(37, 42, 38, 0.15)`).
- **Chronicle Prose Ink** (`#343B36` · `charcoal-700`): Long-form reading ink for historical narratives on ivory surfaces, softened slightly from pure charcoal to prevent halation across 62ch columns.
- **Archival Metadata Slate** (`#4A534D` · `on-surface-variant` / `charcoal-600`): Secondary ink for captions, period dates, architectural dimensions, and inactive filter labels on light surfaces.
- **Lichen Sage** (`#A9B3AA` · `on-dark-muted` / `charcoal-400`): Muted botanical sage used for secondary metadata, coordinates, and supporting prose on `#071B16` dark forest backgrounds.

### Named Rules

- **Strict Bimodal Contrast Rule:** Never place `#C6A56B` (*Swargadeo Antique Gold*) as small text directly on `#F4EFE5` (*Sanchi-Pat Warm Ivory*)—always step down to `#8A6D3A` (*Inscribed Bronze Gold*) or `#12382D` (*Deep Sanctuary Pine*) on light backgrounds so contrast exceeds 4.5:1.
- **Hairline Opacity Rule:** Never use opaque `#252A26` or `#C6A56B` for container borders. On warm ivory surfaces, all structural hairlines must be `rgba(37, 42, 38, 0.12)` to `rgba(37, 42, 38, 0.18)`. On deep forest surfaces, all structural hairlines must be `rgba(198, 165, 107, 0.18)` to `rgba(198, 165, 107, 0.30)`.
- **Zero Pure Black or White Rule:** Pure `#000000` and pure `#FFFFFF` are forbidden as section backgrounds or primary text colors. The darkest surface is `#071B16` and the lightest surface is `#FAF7F2`.
- **Single Solid Accent Per Viewport:** At most one solid `#C6A56B` gold fill element (such as the primary Hero CTA or active category marker) may appear in a single viewport; all other controls use transparent hairline pills or deep `#071B16` fills.

---

## Typography

### Hierarchy

- **Display (`display` · `clamp(2.6rem, 5vw, 4.5rem)` / `41.6px–72px` · Cormorant Garamond 400 · line-height `1.06` · tracking `-0.025em`):** Used for the Hero monument title and full-screen monograph title headers. Italicized spans (`font-style: italic`) are used selectively within Display headings to create classic editorial tension.
- **Heading 1 (`h1` · `clamp(2.25rem, 4.2vw, 3.5rem)` / `36px–56px` · Cormorant Garamond 400 · line-height `1.08` · tracking `-0.022em`):** Used for primary modal monograph titles and feature exhibition banners.
- **Heading 2 (`h2` · `clamp(1.875rem, 3.5vw, 3rem)` / `30px–48px` · Cormorant Garamond 400 · line-height `1.1` · tracking `-0.02em`):** Used in the left 7 columns of every 12-column Museum Section Split Header.
- **Title / Heading 3 (`title` · `1.5rem` / `24px` · Cormorant Garamond 500 · line-height `1.28` · tracking `-0.01em`):** Used for monument card titles, historical chapter titles, and discovery ledger headings.
- **Body (`body` · `1rem` / `16px`, rising to `1.0625rem` / `17px` in long-form monographs · Instrument Sans 400 · line-height `1.68` · tracking `0em`):** Used for all historical narratives, architectural analyses, and visitor guidelines.
- **Label & Archival Index (`label` · `0.8125rem` / `13px` · Instrument Sans 500 · line-height `1.4` · tracking `0.01em`):** Used for numbered section indices (`01 / Architectural Catalogue`), category filter chips, dynasty era tags (`1696–1714 CE`), and table column headers.
- **Scoped Monumental Wordmark (`Cinzel`, serif):** Strictly scoped to the oversized decorative `"SIVASAGAR"` background outline wordmark in the cinematic footer (`src/components/ui/motion-footer.tsx`). Never used for headings, UI controls, or body text.

### Named Rules

- **Strict Two-Family Discipline:** All editorial and UI surfaces must use only *Cormorant Garamond* (`font-serif` / `font-display`) and *Instrument Sans* (`font-sans`). Do not reintroduce *Playfair Display* or *Plus Jakarta Sans*.
- **62-Character Measure Cap (`.measure-prose`):** Every long-form historical paragraph, section lead, and monograph narrative must be constrained to `max-width: 62ch` (`60ch–68ch` range) to preserve effortless scholarly reading.
- **No Shouty All-Caps Body Copy:** Section overlines and metadata pills use sentence case or gentle tracking (`0.01em–0.04em`) at `13px` (`0.8125rem`) weight `500`, avoiding aggressive wide-tracked uppercase blocks (`tracking-[0.3em]`) that degrade readability.
- **Tabular Numerals for Dates & Dimensions:** Reign years (`1228–1826 CE`), monument heights (`104 ft`), tank areas (`257 acres`), and GPS coordinates must render with `font-variant-numeric: tabular-nums` so columns align cleanly in specification ledgers.

---

## Layout

Explore Sivasagar is built around a disciplined museum gallery grid that guarantees equal horizontal margins and generous vertical breathing room across every section.

- **Equal-Edge Museum Container (`.wrap-museum`):**
  - Defined in `src/index.css` as `width: min(100% - 2 * var(--gut), 1280px); margin-inline: auto;`.
  - Responsive outer gutter (`--gut`): `80px` on desktop (`>=1024px`), `48px` on tablet (`640px–1023px`), and `24px` on mobile (`<=639px`).
- **Vertical Section Rhythm (`--padt` / `--padb`):**
  - Top padding (`--padt`): `120px` on desktop, `96px` on tablet, `80px` on mobile.
  - Bottom padding (`--padb`): `96px` on desktop, `72px` on tablet, `64px` on mobile.
  - Every major section occupies at least one full, unhurried viewport screen and is separated from the next by either a bimodal background shift (`#071B16` ↔ `#F4EFE5`) or a full-bleed `1px` architectural hairline rule.
- **12-Column Architectural Grid:**
  - Desktop grids use `grid-template-columns: repeat(12, minmax(0, 1fr))` with a `24px` (`gap-6`) or `32px` (`gap-8`) gap.
  - **Museum Split Section Header:** Columns 1–7 hold the numbered archive index (`01 / Architectural Catalogue`) and the `h2` serif display heading; Columns 8–12 hold the `62ch` contextual lead paragraph aligned to the bottom baseline (`lg:items-end`).
  - **Card Density Cap:** Monument catalogues and cultural grids display at most **3 cards per row** on desktop (`lg:grid-cols-3`, `md:grid-cols-2`, `grid-cols-1`), with a maximum of 4 distinct data points per card (Image + Era badge, Title, 2-line historical summary, and Footer action/location row).

---

## Elevation & Depth

### Shadow Vocabulary

- **`none` (`0 0 #0000`):** Default resting state for all monument cards, historical ledgers, dynasty chapter panels, and specification matrices. Depth at rest is communicated strictly through surface color steps (`#F4EFE5` → `#FAF7F2` or `#071B16` → `#0C2820`) and `1px` hairlines.
- **`card-hover` (`0 12px 24px -8px rgba(7, 27, 22, 0.12)`):** Applied exclusively when a user hovers over an interactive `.m-card` monument or discovery card, paired with a `-2px` vertical lift.
- **`luxury` (`0 16px 32px -12px rgba(7, 27, 22, 0.18)`):** Reserved for floating architectural layers: the interactive Leaflet cartographic frame, floating map control pills, and the persistent "Saved Study List" floating trigger.
- **`modal-monograph` (`0 24px 64px -16px rgba(7, 27, 22, 0.45)`):** Reserved for the full-height Destination Detail Monograph modal and the Saved Study List slide-over drawer over a `backdrop-filter: blur(8px)` scrim (`rgba(7, 27, 22, 0.78)`).
- **`gold-glow` (`0 0 24px -6px rgba(198, 165, 107, 0.25)`):** Subtle ambient illumination used sparingly on the active map marker pin and primary Hero CTA hover state on dark surfaces.

### Named Rules

- **Flat-By-Default Hairline Ledger Rule:** Cards and data panels must never sit with heavy permanent drop shadows. Use `1px solid rgba(37, 42, 38, 0.15)` on ivory or `1px solid rgba(198, 165, 107, 0.22)` on dark forest at rest.
- **Hairline Gap Grid Technique:** For multi-cell historical specification matrices, royal officer (`Patra Mantri`) tables, and comparison charts, use a `1px` grid gap (`gap-px`) over a hairline-colored background container (`bg-charcoal-800/15` on light or `bg-gold-500/20` on dark) where each cell has a solid surface fill (`bg-ivory-50` or `bg-forest-900`). This produces razor-sharp `1px` interior and exterior ledger lines without doubled borders.
- **Restrained Glassmorphism:** `backdrop-filter: blur(8px)` (`backdrop-blur-md`) is permitted only on image-overlay era badges (`bg-forest-950/80`), modal backdrops, and the floating study-list drawer—never as a decorative card treatment over solid backgrounds.

---

## Shapes

The system uses the **`soft` architectural radius scale** (`data-radius="soft"` on `<html>`) paired with **pill-shaped interactive controls** (`data-buttons="pill"`):

- **`none` (`0px`):** Used for interior cells of `gap-px` hairline specification matrices and full-bleed section dividers.
- **`sm` (`6px` / `--r-sm`):** Used for inline archival tags, keyboard shortcut badges, and small thumbnail frames inside map popups.
- **`md` (`8px` / `--r-md`):** Used for text inputs, search fields, callout blocks, and recessed folklore citation boxes.
- **`lg` (`12px` / `--r-lg`):** The canonical outer radius for `.m-card` monument cards, photographic archive frames, the interactive Leaflet map viewport, and hairline grid wrappers (`overflow: hidden`).
- **`full` (`9999px`):** Mandatory for all primary/secondary buttons (`.m-btn`), category filter chips, dynasty chapter selector pills, and floating image badges.
- **No Asymmetric or Blob Radii:** Organic blob shapes, diagonal clip paths, and mismatched corner radii (e.g., `rounded-tl-3xl rounded-br-none`) are forbidden.

---

## Components

### Buttons

- **Primary Dark Pill (`.m-btn` on light surfaces):** `background: #071B16`, `color: #F4EFE5`, `border-radius: 9999px`, `padding: 12px 24px`, font `Instrument Sans` `13px` weight `500`. Hover shifts background to `#12382D` over `140ms`; active press scales to `scale(0.98)` over `90ms`. Trailing `.m-arrow` icon translates `+3px` horizontally on hover.
- **Primary Gold Pill (`.m-btn` on dark surfaces):** `background: #C6A56B`, `color: #071B16`, `border-radius: 9999px`, `padding: 14px 28px`, font `Instrument Sans` `13px` weight `500`. Hover shifts to `#D5B77E` with `gold-glow` shadow.
- **Secondary Hairline Pill:** `background: transparent`, `border: 1px solid rgba(37, 42, 38, 0.22)` (on ivory) or `1px solid rgba(198, 165, 107, 0.35)` (on dark), `border-radius: 9999px`, `padding: 12px 24px`. Hover fills with `rgba(37, 42, 38, 0.05)` or `rgba(198, 165, 107, 0.12)`.

### Chips

- **Category & Era Filter Chips:** Pill-shaped (`border-radius: 9999px`), `padding: 10px 20px`, `font-size: 13px`, `font-weight: 500`.
  - **Default (Light Surface):** `background: #FAF7F2`, `color: #4A534D`, `border: 1px solid rgba(37, 42, 38, 0.15)`.
  - **Selected (Light Surface):** `background: #071B16`, `color: #F4EFE5`, `border: 1px solid #071B16`.
  - **Default (Dark Surface):** `background: #0C2820`, `color: #A9B3AA`, `border: 1px solid rgba(198, 165, 107, 0.20)`.
  - **Selected (Dark Surface):** `background: #C6A56B`, `color: #071B16`, `border: 1px solid #C6A56B`.

### Cards / Containers

- **Monument Archive Card (`.m-card`):**
  - Outer frame: `background: #FAF7F2`, `border: 1px solid rgba(37, 42, 38, 0.15)`, `border-radius: 12px`, `overflow: hidden`.
  - Top media slot (`.m-zoom-frame`): `aspect-ratio: 4 / 3`, `overflow: hidden`, containing `.m-zoom-img` which scales silently to `1.03` over `600ms cubic-bezier(0.2, 0.8, 0.2, 1)` on card hover. Top-left floating pill badge (`bg-forest-950/80 backdrop-blur-md text-ivory-100`) displays the construction era (`1734 CE`), and top-right circular pill button toggles the "Save to Study List" bookmark.
  - Body slot (`padding: 28px`): Category + Patron overline (`13px` `#8A6D3A`), Monument Title (`24px` *Cormorant Garamond* `#252A26`), 2-line clamped historical summary (`15px` *Instrument Sans* `#343B36`), and a `1px` top-bordered footer row with location metadata on the left and `"Read Monograph →"` on the right.
  - Hover state: `transform: translateY(-2px)`, `border-color: rgba(198, 165, 107, 0.55)`, `box-shadow: 0 12px 24px -8px rgba(7, 27, 22, 0.12)`.

### Inputs / Fields

- **Archival Search & Filter Input:** `height: 44px`, `padding: 10px 16px`, `border-radius: 8px`, `background: #FAF7F2`, `border: 1px solid rgba(37, 42, 38, 0.20)`, `color: #252A26`, placeholder `#4A534D`. Focus state replaces the default browser outline with `border-color: #8A6D3A` and `box-shadow: 0 0 0 2px rgba(198, 165, 107, 0.25)`.

### Navigation

- **Zero Top Navbar Pattern:** The platform intentionally omits a persistent top navigation bar so the architecture and photography command the frame.
- **Floating Study List Trigger & Drawer (`TripPlannerDrawer`):** A floating pill button anchored at `bottom: 28px; right: 28px` (`background: #071B16`, `color: #F4EFE5`, `border: 1px solid rgba(198, 165, 107, 0.40)`, `border-radius: 9999px`, `box-shadow: luxury`) displays the count of bookmarked monuments for self-guided heritage study and opens a slide-over archival itinerary drawer.

### 12-Column Museum Split Header

- **Signature Section Introducer:** Used at the top of every primary section (`ExploreDestinations`, `HeritageSection`, `HistoricalDiscoveriesSection`, `InteractiveMap`, `ExperiencesSection`, `TravelGuideSection`, `PhotoGallery`).
- Left block (`lg:col-span-7`): Displays the section index overline (e.g., `01 / Architectural Catalogue`) above an `h2` *Cormorant Garamond* headline with an italicized keyword span.
- Right block (`lg:col-span-5`): Displays a `62ch` lead paragraph aligned to the bottom baseline of the headline, separated from the section body below by a full-width `1px` hairline rule (`border-b border-charcoal-800/15` or `border-gold-500/20`).

### Hairline Specification Ledger

- **Signature Scholarly Data Matrix:** Used inside the 15-section `DestinationDetailModal` monograph (Patron, Dynasty Reign, Architectural Typology, Primary Materials) and the Ahom Administrative System (`Paik` & `Patra Mantri` councils).
- Built with `grid gap-px bg-charcoal-800/15 border border-charcoal-800/15 rounded-lg overflow-hidden` where each cell (`bg-ivory-50 p-5`) contains a `13px` label (`#8A6D3A`) and a `16px` serif or tabular-numeral value (`#252A26`).

---

## Do's and Don'ts

### Do:
- **Do** preserve the strict alternation between *Imperial Rangpur Forest* (`#071B16`) and *Sanchi-Pat Warm Ivory* (`#F4EFE5`) chapters so the user experiences a deliberate spatial progression from dramatic sanctuary halls to bright reading rooms.
- **Do** enforce `.wrap-museum` and the 12-column split header across every section so left and right outer margins remain identical from top to bottom.
- **Do** clearly label oral folklore and local legends (such as the magnetic *Kalash* of Sivadol or the underground tunnels of Talatal Ghar) in recessed parchment callout blocks (`#E8E0D1`) distinct from verified archaeological facts.
- **Do** keep all micro-interactions quiet and physical: `-2px` card hover lift (`140ms`), `1.03` image zoom (`600ms`), `+3px` arrow nudge, and `0.98` button press (`90ms`), honoring `prefers-reduced-motion: reduce`.
- **Do** use real documentary and architectural photographs of Sivasagar's monuments with explicit historical captions and attribution.

### Don't:
- **Don't** add a conventional sticky top navigation bar, hamburger header, or floating promo banner above the Hero section.
- **Don't** introduce commercial tourism widgets—no hotel room prices, "Book Now" buttons, fake 5-star review badges, customer testimonial carousels, or urgency timers.
- **Don't** invent unverified historical dates, royal patrons, entry ticket prices, or archaeological measurements; use qualitative historical descriptions where exact figures are undocumented.
- **Don't** place more than 3 cards in a single row on desktop or more than 4 data points inside a single card preview.
- **Don't** use neon glow effects, multi-stop rainbow gradients, springy bounce animations, or third font families outside *Cormorant Garamond*, *Instrument Sans*, and the footer-scoped *Cinzel* wordmark.

