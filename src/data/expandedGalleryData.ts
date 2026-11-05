const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/explore-sivasagar/';

export interface AuthenticGalleryPlate {
  id: string;
  collectionId: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions';
  destinationId: string;
  title: string;
  category: string;
  location: string;
  image: string;
  era: string;
  caption: string;
  credit: string;
  photographer: string;
  license: string;
}

// ==============================================================================
// 1. ROYAL PALACES (10 Authentic Verified Photographs)
// ==============================================================================
export const ROYAL_PALACES_EXPANDED: AuthenticGalleryPlate[] = [
  // Kareng Ghar (Garhgaon) — 5 Distinct Photographs
  {
    id: 'kareng-01',
    collectionId: 'palaces',
    destinationId: 'kareng-ghar',
    title: 'Kareng Ghar — Step-Pyramidal Royal Palace of Garhgaon',
    category: 'Royal Palaces',
    location: 'Garhgaon, Nazira Subdivision, Sivasagar',
    image: BASE_URL + 'images/destinations/kareng-ghar.jpg',
    era: '1752 CE Brick Reconstruction (1540 CE Capital)',
    caption: 'Receding masonry tiers and perimeter promenades of the royal palace at Garhgaon, the capital founded by Suklenmung.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Public Heritage',
  },
  {
    id: 'kareng-02',
    collectionId: 'palaces',
    destinationId: 'kareng-ghar',
    title: 'Kareng Ghar — Historic Elevation of Royal Palace',
    category: 'Royal Palaces',
    location: 'Garhgaon Historical Enclosure',
    image: BASE_URL + 'images/destinations/kareng-arch-1.png',
    era: '1754 CE (Swargadeo Rajeswar Singha)',
    caption: 'Historical structural elevation of the four-storeyed masonry palace commissioned by King Rajeswar Singha.',
    credit: 'Historical Archive / Wikimedia Commons',
    photographer: 'Public Domain Archive',
    license: 'Public Domain',
  },
  {
    id: 'kareng-03',
    collectionId: 'palaces',
    destinationId: 'kareng-ghar',
    title: 'Kareng Ghar — South-Western Multi-Tiered Brickwork',
    category: 'Royal Palaces',
    location: 'Garhgaon, Sivasagar',
    image: BASE_URL + 'images/destinations/kareng-arch-2.jpg',
    era: '18th Century Ahom Royal Architecture',
    caption: 'Angled perspective showing the four tiers of exposed Doiya Itaa bricks bonded with organic mortar.',
    credit: 'Wikimedia Commons / Gurpreetsingh1010',
    photographer: 'Gurpreetsingh1010',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'kareng-04',
    collectionId: 'palaces',
    destinationId: 'kareng-ghar',
    title: 'Kareng Ghar — Upper Pavilion Base & Promenades',
    category: 'Royal Palaces',
    location: 'Garhgaon, Sivasagar',
    image: BASE_URL + 'images/destinations/kareng-arch-3.jpg',
    era: '1752 CE (Swargadeo Rajeswar Singha)',
    caption: 'Close architectural study of the upper observation terrace overlooking the Dikhow river plains.',
    credit: 'Wikimedia Commons / Samudrabikash06',
    photographer: 'Samudrabikash06',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'kareng-05',
    collectionId: 'palaces',
    destinationId: 'kareng-ghar',
    title: 'Kareng Ghar — Arcaded Terrace Colonnade',
    category: 'Royal Palaces',
    location: 'Garhgaon Historical Enclosure',
    image: BASE_URL + 'images/destinations/kareng-colonnade.jpg',
    era: '18th Century Royal Palace Architecture',
    caption: 'Open brick arches framing the inner chambers and ceremonial terraces of Garhgaon.',
    credit: 'Explore Sivasagar Heritage Archive',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Public Heritage',
  },

  // Talatal Ghar (Rangpur) — 5 Distinct Photographs
  {
    id: 'talatal-01',
    collectionId: 'palaces',
    destinationId: 'talatal-ghar',
    title: 'Talatal Ghar — Seven-Tiered Imperial Citadel',
    category: 'Royal Palaces',
    location: 'Rangpur, Sivasagar',
    image: BASE_URL + 'images/destinations/talatal-ghar.jpg',
    era: '1698–1769 CE (Rudra Singha & Rajeswar Singha)',
    caption: 'Ground-level brick arcades and upper terraces of the seven-tiered royal citadel at Rangpur.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Public Heritage',
  },
  {
    id: 'talatal-02',
    collectionId: 'palaces',
    destinationId: 'talatal-ghar',
    title: 'Talatal Ghar — Ornate Brick Arches & Entrance Gateway',
    category: 'Royal Palaces',
    location: 'Rangpur, Sivasagar',
    image: BASE_URL + 'images/destinations/talatal-arch-1.jpg',
    era: '1751–1769 CE Masonry Portals',
    caption: 'Vaulted entrance archway leading into the central military and administrative courtyards of Rangpur.',
    credit: 'Wikimedia Commons / Joli Rumi',
    photographer: 'Joli Rumi',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'talatal-03',
    collectionId: 'palaces',
    destinationId: 'talatal-ghar',
    title: 'Talatal Ghar — Vaulted Doorway of Royal Quarters',
    category: 'Royal Palaces',
    location: 'Rangpur Citadel Enclosure',
    image: BASE_URL + 'images/destinations/talatal-arch-2.jpg',
    era: '18th Century Ahom Military Fortification',
    caption: 'Detailed brick portal demonstrating the acoustic and cooling air currents engineered through thick masonry.',
    credit: 'Wikimedia Commons / Joli Rumi',
    photographer: 'Joli Rumi',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'talatal-04',
    collectionId: 'palaces',
    destinationId: 'talatal-ghar',
    title: 'Talatal Ghar — Subterranean Corridors & Walkway',
    category: 'Royal Palaces',
    location: 'Lower Tiers, Talatal Ghar',
    image: BASE_URL + 'images/destinations/talatal-arch-3.jpg',
    era: '1698–1769 CE Underground Engineering',
    caption: 'Reinforced brick walkway connecting the subterranean arsenal levels with the upper residential pavilions.',
    credit: 'Wikimedia Commons / Joli Rumi',
    photographer: 'Joli Rumi',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'talatal-05',
    collectionId: 'palaces',
    destinationId: 'talatal-ghar',
    title: 'Talatal Ghar — Ahom Architectural Motifs & Reliefs',
    category: 'Royal Palaces',
    location: 'Rangpur Palace Grounds',
    image: BASE_URL + 'images/destinations/talatal-arch-4.jpg',
    era: 'Mid-18th Century Ahom Brickwork',
    caption: 'Intricate decorative relief patterns molded directly into the lime-surkhi and Bora Saul brick mortar.',
    credit: 'Wikimedia Commons / Joli Rumi',
    photographer: 'Joli Rumi',
    license: 'CC BY-SA 4.0',
  },
];

// ==============================================================================
// 2. AHOM ARCHITECTURE (8 Authentic Verified Photographs)
// ==============================================================================
export const AHOM_ARCHITECTURE_EXPANDED: AuthenticGalleryPlate[] = [
  // Rang Ghar — 5 Distinct Photographs
  {
    id: 'rang-01',
    collectionId: 'architecture',
    destinationId: 'rang-ghar',
    title: 'Rang Ghar Royal Amphitheatre — Southern Facade',
    category: 'Ahom Architecture',
    location: 'Rupahi Pathar, Rangpur (Sivasagar)',
    image: BASE_URL + 'images/destinations/rang-ghar.jpg',
    era: '1744–1750 CE (Swargadeo Pramatta Singha)',
    caption: 'The two-storeyed royal sports pavilion showcasing its parabolic inverted longboat roof and cusped arches.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument (N-AS-42)',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Protected Monument',
  },
  {
    id: 'rang-02',
    collectionId: 'architecture',
    destinationId: 'rang-ghar',
    title: 'Rang Ghar — Parabolic Inverted Longboat Roofline',
    category: 'Ahom Architecture',
    location: 'Rupahi Pathar, Sivasagar',
    image: BASE_URL + 'images/destinations/rang-ghar-arch-1.jpg',
    era: '1750 CE Completion',
    caption: 'Classic Ahom roof curvature derived from traditional Tai longboat architecture and thatch pavilion design.',
    credit: 'Wikimedia Commons / Rangan Datta Wiki',
    photographer: 'Rangan Datta',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'rang-03',
    collectionId: 'architecture',
    destinationId: 'rang-ghar',
    title: 'Rang Ghar — Ground-Level Archways & Pavilion Bays',
    category: 'Ahom Architecture',
    location: 'Rangpur, Sivasagar',
    image: BASE_URL + 'images/destinations/rang-ghar-arch-2.jpg',
    era: '1744–1750 CE (Swargadeo Pramatta Singha)',
    caption: 'Symmetrical open bays where royal dignitaries gathered to watch athletic contests and buffalo bouts.',
    credit: 'Wikimedia Commons / Rangan Datta Wiki',
    photographer: 'Rangan Datta',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'rang-04',
    collectionId: 'architecture',
    destinationId: 'rang-ghar',
    title: 'Rang Ghar — Western Profile & Surkhi Mortar Joinery',
    category: 'Ahom Architecture',
    location: 'Rupahi Pathar Grounds',
    image: BASE_URL + 'images/destinations/rang-ghar-arch-3.jpg',
    era: '18th Century Royal Pavilion',
    caption: 'Full-profile perspective showing the durable organic mortar composed of sticky rice, duck eggs, and snail lime.',
    credit: 'Wikimedia Commons / Rangan Datta Wiki',
    photographer: 'Rangan Datta',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'rang-05',
    collectionId: 'architecture',
    destinationId: 'rang-ghar',
    title: 'Rang Ghar — Royal Viewing Balcony & Terraces',
    category: 'Ahom Architecture',
    location: 'Rupahi Pathar, Sivasagar',
    image: BASE_URL + 'images/destinations/rang-ghar-arch-4.jpg',
    era: '1750 CE Royal Amphitheatre',
    caption: 'Upper balcony chamber where Swargadeo Pramatta Singha sat during Bohag Bihu festivities.',
    credit: 'Wikimedia Commons / Rangan Datta Wiki',
    photographer: 'Rangan Datta',
    license: 'CC BY-SA 4.0',
  },

  // Namdang Stone Bridge — 3 Distinct Photographs
  {
    id: 'namdang-01',
    collectionId: 'architecture',
    destinationId: 'namdang-bridge',
    title: 'Namdang Stone Bridge — Monolithic Basalt Engineering',
    category: 'Ahom Architecture',
    location: 'National Highway 37 across Namdang River',
    image: BASE_URL + 'images/destinations/namdang.jpg',
    era: '1703 CE (Swargadeo Rudra Singha)',
    caption: 'Cut from a single massive solid sandstone block and shaped without iron joints by master artisan Ghanashyam.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Public Heritage',
  },
  {
    id: 'namdang-02',
    collectionId: 'architecture',
    destinationId: 'namdang-bridge',
    title: 'Namdang Bridge — Riverbed Piers & Structural Arch',
    category: 'Ahom Architecture',
    location: 'Namdang Riverbank, Sivasagar',
    image: BASE_URL + 'images/destinations/namdang-arch-1.jpg',
    era: '1703 CE Engineering Feat',
    caption: 'View of the massive monolithic piers enduring 320+ years of high-volume monsoon water flow.',
    credit: 'Wikimedia Commons / Rangan Datta Wiki',
    photographer: 'Rangan Datta',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'namdang-03',
    collectionId: 'architecture',
    destinationId: 'namdang-bridge',
    title: 'Namdang Bridge — Modern Heavy-Traffic Deck',
    category: 'Ahom Architecture',
    location: 'NH-37 Corridor, Sivasagar',
    image: BASE_URL + 'images/destinations/namdang-arch-2.jpg',
    era: '1703 CE to Present Operational Use',
    caption: 'Operational highway carriageway demonstrating the exceptional load-bearing capacity of Ahom stone engineering.',
    credit: 'Wikimedia Commons / Rangan Datta Wiki',
    photographer: 'Rangan Datta',
    license: 'CC BY-SA 4.0',
  },
];

// ==============================================================================
// 3. TEMPLES & SACRED LAKES (8 Authentic Verified Photographs)
// ==============================================================================
export const TEMPLES_LAKES_EXPANDED: AuthenticGalleryPlate[] = [
  // Sivadol — 5 Distinct Photographs
  {
    id: 'sivadol-01',
    collectionId: 'temples-lakes',
    destinationId: 'sivadol',
    title: 'Sivadol — 104-Foot Sacred Sikhara & Golden Kalasha',
    category: 'Temples & Sacred Lakes',
    location: 'Southern Bank, Borpukhuri, Sivasagar Town',
    image: BASE_URL + 'images/destinations/sivadol.JPG',
    era: '1734 CE (Bar Raja Queen Ambika)',
    caption: 'Tallest Shiva temple tower in northeastern India crowned with an 8-foot pure gold mastaka finial.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Public Heritage',
  },
  {
    id: 'sivadol-02',
    collectionId: 'temples-lakes',
    destinationId: 'sivadol',
    title: 'Sivadol — Spire Elevation & Shikhara Ribbing',
    category: 'Temples & Sacred Lakes',
    location: 'Borpukhuri Precincts, Sivasagar',
    image: BASE_URL + 'images/destinations/sivadol-arch-1.jpg',
    era: '1734 CE (Nilachala / Nagara Architecture)',
    caption: 'Fluted vertical ribs of the 32-metre superstructure rising above the surrounding sacred precincts.',
    credit: 'Wikimedia Commons / Sarangakrishnachetia',
    photographer: 'Sarangakrishnachetia',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'sivadol-03',
    collectionId: 'temples-lakes',
    destinationId: 'sivadol',
    title: 'Sivadol — Sanctum Courtyard & Devotee Promenades',
    category: 'Temples & Sacred Lakes',
    location: 'Sivadol Central Compound',
    image: BASE_URL + 'images/destinations/sivadol-arch-2.jpg',
    era: '18th Century Sacred Complex',
    caption: 'Courtyard pathways flanked by the Vishnu and Devi shrines consecrated during Swargadeo Siba Singha’s rule.',
    credit: 'Wikimedia Commons / Sarangakrishnachetia',
    photographer: 'Sarangakrishnachetia',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'sivadol-04',
    collectionId: 'temples-lakes',
    destinationId: 'sivadol',
    title: 'Sivadol — Stone Frieze Carvings & Sculpted Panels',
    category: 'Temples & Sacred Lakes',
    location: 'Lower Exterior Sanctum Wall',
    image: BASE_URL + 'images/destinations/sivadol-arch-3.jpg',
    era: '1734 CE Sculptural Reliefs',
    caption: 'Bas-relief panels embedded in the exterior walls depicting Nataraja and Vedic mythological scenes.',
    credit: 'Wikimedia Commons / Sarangakrishnachetia',
    photographer: 'Sarangakrishnachetia',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'sivadol-05',
    collectionId: 'temples-lakes',
    destinationId: 'sivadol',
    title: 'Sivadol — Borpukhuri Lakefront Panoramic Vista',
    category: 'Temples & Sacred Lakes',
    location: 'Borpukhuri Embankment, Sivasagar',
    image: BASE_URL + 'images/destinations/sivadol-arch-4.jpg',
    era: '1734 CE Water Temple Architecture',
    caption: 'Temple spire reflected upon the tranquil waters of the 129-acre royal excavation.',
    credit: 'Wikimedia Commons / Sardar Hironjyoti Beshra',
    photographer: 'Sardar Hironjyoti Beshra',
    license: 'CC BY-SA 3.0',
  },

  // Joysagar & Gaurisagar — 3 Distinct Photographs
  {
    id: 'joysagar-01',
    collectionId: 'temples-lakes',
    destinationId: 'joysagar-tank',
    title: 'Joysagar Tank & Joydol Temple Complex',
    category: 'Temples & Sacred Lakes',
    location: 'Rangpur Southern Suburb, Sivasagar',
    image: BASE_URL + 'images/destinations/joysagar.jpg',
    era: '1697–1698 CE (Swargadeo Rudra Singha)',
    caption: 'India’s largest man-made lake constructed in 45 days in sacred remembrance of Queen Sati Joymoti.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Public Heritage',
  },
  {
    id: 'gaurisagar-01',
    collectionId: 'temples-lakes',
    destinationId: 'gaurisagar-tank',
    title: 'Gaurisagar Borpukhuri — 150-Acre Sacred Reservoir',
    category: 'Temples & Sacred Lakes',
    location: 'Gaurisagar, 12 km West of Sivasagar Town',
    image: BASE_URL + 'images/destinations/gaurisagar.jpg',
    era: '1723–1724 CE (Bar Raja Queen Phuleswari)',
    caption: 'Vast reservoir excavated alongside Shiva, Devi, and Vishnu temples by the pioneering queen ruler Phuleswari.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
    photographer: 'Explore Sivasagar Archive',
    license: 'ASI Public Heritage',
  },
  {
    id: 'gaurisagar-02',
    collectionId: 'temples-lakes',
    destinationId: 'gaurisagar-tank',
    title: 'Gaurisagar Devidol — Brick & Stone Masonry Shikhara',
    category: 'Temples & Sacred Lakes',
    location: 'Gaurisagar Temple Bank, Sivasagar',
    image: BASE_URL + 'images/destinations/gaurisagar-arch-1.jpg',
    era: '1723–1724 CE Royal Temple',
    caption: 'The historical temple sanctuary constructed on the northern bank of Gaurisagar tank.',
    credit: 'Wikimedia Commons / Dhunub',
    photographer: 'Dhunub',
    license: 'CC BY-SA 4.0',
  },
];

// ==============================================================================
// 4. UNESCO & HERITAGE (5 Authentic Verified Photographs)
// ==============================================================================
export const UNESCO_HERITAGE_EXPANDED: AuthenticGalleryPlate[] = [
  {
    id: 'unesco-01',
    collectionId: 'unesco-heritage',
    destinationId: 'charaideo-maidams',
    title: 'Charaideo Maidams — UNESCO World Heritage Royal Tumuli',
    category: 'UNESCO & Heritage',
    location: 'Charaideo Hillock, 30 km from Sivasagar',
    image: BASE_URL + 'images/destinations/charaideo.jpg',
    era: '1253 CE – 18th Century CE (UNESCO Inscribed 2024)',
    caption: 'Hemispherical vaulted earth-covered royal burial mounds of the Tai-Ahom Swargadeos at the original capital.',
    credit: 'Explore Sivasagar Heritage Archive / UNESCO World Heritage Site',
    photographer: 'Explore Sivasagar Archive',
    license: 'UNESCO World Heritage Archive',
  },
  {
    id: 'unesco-02',
    collectionId: 'unesco-heritage',
    destinationId: 'charaideo-maidams',
    title: 'Charaideo Maidam — Earthen Pyramidal Vault Profile',
    category: 'UNESCO & Heritage',
    location: 'Charaideo World Heritage Site',
    image: BASE_URL + 'images/destinations/charaideo-arch-1.jpg',
    era: '13th–18th Century CE Ahom Royal Necropolis',
    caption: 'Preserved royal burial mound showcasing the grass-covered domical superstructure and sacred perimeter.',
    credit: 'Wikimedia Commons / BhuyanBhaskar',
    photographer: 'BhuyanBhaskar',
    license: 'CC BY 4.0',
  },
  {
    id: 'unesco-03',
    collectionId: 'unesco-heritage',
    destinationId: 'charaideo-maidams',
    title: 'Charaideo Maidam — Protected Archaeological Enclosure',
    category: 'UNESCO & Heritage',
    location: 'Charaideo Hillocks, Sivasagar',
    image: BASE_URL + 'images/destinations/charaideo-arch-2.jpg',
    era: 'ASI National Monument & UNESCO Site',
    caption: 'The landscaped archaeological reserve containing over 90 royal and noble burial tumuli.',
    credit: 'Wikimedia Commons / Mozzworld',
    photographer: 'Mozzworld',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'unesco-04',
    collectionId: 'unesco-heritage',
    destinationId: 'charaideo-maidams',
    title: 'Charaideo Maidam — Vault Masonry & Octagonal Base',
    category: 'UNESCO & Heritage',
    location: 'Charaideo Necropolis, Assam',
    image: BASE_URL + 'images/destinations/charaideo-arch-3.jpg',
    era: 'Medieval Tai-Ahom Funeral Architecture',
    caption: 'Octagonal boundary walls and masonry pavilion base erected for the burial rituals of departed monarchs.',
    credit: 'Wikimedia Commons / BhuyanBhaskar',
    photographer: 'BhuyanBhaskar',
    license: 'CC BY 4.0',
  },
  {
    id: 'unesco-05',
    collectionId: 'unesco-heritage',
    destinationId: 'charaideo-maidams',
    title: 'Charaideo Moidams — Sacred Undulating Landscape',
    category: 'UNESCO & Heritage',
    location: 'Charaideo Foot of Patkai Hills',
    image: BASE_URL + 'images/destinations/charaideo-arch-4.jpg',
    era: '1253 CE Sacred Royal Ancestor Grounds',
    caption: 'Sweeping landscape view across the sacred hills chosen by King Chaolung Sukaphaa for eternal royal rest.',
    credit: 'Wikimedia Commons / Sarangakrishnachetia',
    photographer: 'Sarangakrishnachetia',
    license: 'CC BY-SA 4.0',
  },
];

// ==============================================================================
// 5. CULTURE & TRADITIONS (2 Authentic Verified Photographs)
// ==============================================================================
export const CULTURE_TRADITIONS_EXPANDED: AuthenticGalleryPlate[] = [
  {
    id: 'culture-01',
    collectionId: 'culture-traditions',
    destinationId: 'tai-museum',
    title: 'Tai-Ahom Museum — Manuscripts & Royal Insignia',
    category: 'Culture & Traditions',
    location: 'Borpukhuri Lakefront Promenade',
    image: BASE_URL + 'images/destinations/tai-museum.jpg',
    era: 'Established 1992 CE (Collections: 13th–19th Century)',
    caption: 'Repository of Sanchi-pat bark manuscripts, royal swords (Hengdang), coins, and ceremonial regalia.',
    credit: 'Explore Sivasagar Heritage Archive / Directorate of Museums',
    photographer: 'Explore Sivasagar Archive',
    license: 'Cultural Heritage Public Archive',
  },
  {
    id: 'culture-02',
    collectionId: 'culture-traditions',
    destinationId: 'panidihing-sanctuary',
    title: 'Pani Dihing Sanctuary — Wetland Habitat of the Brahmaputra Plains',
    category: 'Culture & Traditions',
    location: 'Demow & Brahmaputra Confluence, Sivasagar',
    image: BASE_URL + 'images/destinations/panidehing.jpg',
    era: 'Ecological Habitat & Historical River Confluence',
    caption: 'Wetland preserve hosting over 267 avian species where medieval Ahoms managed floodway channels.',
    credit: 'Explore Sivasagar Heritage Archive / Assam Forest Dept',
    photographer: 'Explore Sivasagar Archive',
    license: 'Ecological Heritage Archive',
  },
];

// Helper to get collection plates by id
export function getPlatesByCollection(
  id: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions'
): AuthenticGalleryPlate[] {
  switch (id) {
    case 'palaces':
      return ROYAL_PALACES_EXPANDED;
    case 'architecture':
      return AHOM_ARCHITECTURE_EXPANDED;
    case 'temples-lakes':
      return TEMPLES_LAKES_EXPANDED;
    case 'unesco-heritage':
      return UNESCO_HERITAGE_EXPANDED;
    case 'culture-traditions':
      return CULTURE_TRADITIONS_EXPANDED;
    default:
      return [];
  }
}

// Destination metadata mapping for dropdowns
export interface DestinationOption {
  id: string;
  name: string;
  collectionId: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions';
  collectionName: string;
}

export const EXISTING_DESTINATION_OPTIONS: DestinationOption[] = [
  // Royal Palaces
  { id: 'kareng-ghar', name: 'Kareng Ghar (Garhgaon Palace)', collectionId: 'palaces', collectionName: 'Royal Palaces' },
  { id: 'talatal-ghar', name: 'Talatal Ghar (Rangpur Citadel)', collectionId: 'palaces', collectionName: 'Royal Palaces' },

  // Ahom Architecture
  { id: 'rang-ghar', name: 'Rang Ghar (Royal Amphitheatre)', collectionId: 'architecture', collectionName: 'Ahom Architecture' },
  { id: 'namdang-bridge', name: 'Namdang Stone Bridge', collectionId: 'architecture', collectionName: 'Ahom Architecture' },

  // Temples & Sacred Lakes
  { id: 'sivadol', name: 'Sivadol Temple & Borpukhuri', collectionId: 'temples-lakes', collectionName: 'Temples & Sacred Lakes' },
  { id: 'joysagar-tank', name: 'Joysagar Tank & Joydol', collectionId: 'temples-lakes', collectionName: 'Temples & Sacred Lakes' },
  { id: 'gaurisagar-tank', name: 'Gaurisagar Tank & Devidol', collectionId: 'temples-lakes', collectionName: 'Temples & Sacred Lakes' },

  // UNESCO & Heritage
  { id: 'charaideo-maidams', name: 'Charaideo Maidams (UNESCO Site)', collectionId: 'unesco-heritage', collectionName: 'UNESCO & Heritage' },

  // Culture & Traditions
  { id: 'tai-museum', name: 'Tai-Ahom Museum & Archives', collectionId: 'culture-traditions', collectionName: 'Culture & Traditions' },
  { id: 'panidihing-sanctuary', name: 'Pani Dihing Sanctuary & Wetlands', collectionId: 'culture-traditions', collectionName: 'Culture & Traditions' },
];
