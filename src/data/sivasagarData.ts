export interface AssociatedEvent {
  year: string;
  event: string;
  details: string;
}

export interface FolkloreItem {
  title: string;
  narrative: string;
  historicalAssessment: string;
}

export interface SourceReference {
  title: string;
  institutionOrAuthor: string;
  note?: string;
}

export interface Destination {
  id: string;
  name: string;
  assameseName: string;
  tagline: string;
  category:
    | 'Royal Palace'
    | 'Amphitheatre'
    | 'Ancient Temple'
    | 'Sacred Lake'
    | 'UNESCO Heritage'
    | 'Engineering Marvel'
    | 'Museum & Culture'
    | 'Wildlife & Nature';
  era: string;
  builtBy: string;
  yearBuilt: string;
  whenBuiltDetails: string;
  whoBuiltDetails: string;
  whyBuilt: string;
  location: string;
  distanceFromTown: string;
  coordinates: [number, number]; // [lat, lng]
  heroImage: string;
  gallery: string[];
  imageCaption?: string;
  shortDescription: string;
  historicalIntroduction: string;
  historicalBackground: string[];
  architecturalDetails: {
    style: string;
    techniques: string;
    materials: string;
    keyFeatures: string[];
    dimensions?: string;
  };
  associatedEvents: AssociatedEvent[];
  culturalSignificance: string;
  interestingFacts: string[];
  folkloreAndLegends: FolkloreItem[];
  thenAndNow: {
    historicalState: string;
    presentDayState: string;
    conservationStatus: string;
  };
  visitorInfo: {
    timings: string;
    openingHours: string;
    closingHours: string;
    entryFee: {
      indian: string;
      foreign: string;
      camera?: string;
      verificationNote: string;
    };
    bestTimeToVisit: string;
    idealDuration: string;
    dressCode?: string;
    facilities: string;
    lastVerified: string;
  };
  nearbyAttractions: {
    name: string;
    distance: string;
    brief: string;
  }[];
  travelTips: string[];
  verifiedFact: string;
  sources: SourceReference[];
  googleMapsQuery: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'rang-ghar',
    name: 'Rang Ghar',
    assameseName: 'ৰংঘৰ',
    tagline: 'Asia’s Oldest Surviving Two-Storeyed Royal Amphitheatre',
    category: 'Amphitheatre',
    era: 'Ahom Dynasty (Tungkhungia Royal Period)',
    builtBy: 'Swargadeo Pramatta Singha',
    yearBuilt: '1744–1750 CE (Brick Reconstruction)',
    whenBuiltDetails:
      'Originally constructed in bamboo and seasoned timber during the reign of Swargadeo Rudra Singha (1696–1714 CE). The surviving two-storeyed red-brick pavilion was erected between 1744 and 1750 CE (Saka 1666–1672).',
    whoBuiltDetails:
      'Commissioned in durable brick masonry by Swargadeo Pramatta Singha (Sunenphaa), second son of King Rudra Singha, following the foundational ceremonial layout created by his father at Rupahi Pathar.',
    whyBuilt:
      'Conceived as the royal sports pavilion (House of Entertainment) from which the Ahom monarch, queens, council of ministers (Patra Mantris), and visiting tributary envoys viewed martial games, falconry, elephant combats, buffalo fights, and Rongali Bihu celebrations on the vast Rupahi Pathar plains.',
    location: 'Rupahi Pathar, Joysagar, Sivasagar',
    distanceFromTown: '3 km south-west of Sivasagar town center',
    coordinates: [26.9686, 94.6231],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Rang_Ghar_2.jpg/1280px-Rang_Ghar_2.jpg',
    ],
    imageCaption: 'The two-storeyed brick pavilion of Rang Ghar at Rupahi Pathar, showing its inverted royal longboat roof profile.',
    shortDescription:
      'A two-storied royal pavilion built by King Pramatta Singha where Ahom royalty watched indigenous sports, martial displays, and Rongali Bihu performances.',
    historicalIntroduction:
      'Rising above the open greens of Rupahi Pathar on the outskirts of the erstwhile royal capital of Rangpur, Rang Ghar ("The House of Entertainment") is one of the earliest surviving masonry amphitheatres in Asia. It served as the ceremonial viewing gallery of the Ahom court during the eighteenth century, embodying the synthesis of Tai-Ahom cultural traditions with indigenous Assamese and late-medieval masonry techniques.',
    historicalBackground: [
      'When Swargadeo Rudra Singha established the ceremonial capital of Rangpur near modern Sivasagar around 1698–1700 CE, he designated the expansive plains of Rupahi Pathar for public spectacles, military reviews, and seasonal festivities. His initial pavilion was built of timber and bamboo.',
      'Between 1744 and 1750 CE, his son Swargadeo Pramatta Singha replaced the wooden pavilion with a permanent two-storeyed brick structure so that the royal court could observe games and seasonal festivals in all weather conditions.',
      'From the shaded upper arcades, the Swargadeo and the royal household watched traditional hawk-hunting (Xেন-যুঁজ), elephant contests, wrestling (মল-যুঁজ), buffalo horn-locking (ম’হ-যুঁজ), and collective Bihu Husori dances performed by guilds from across Upper Assam.',
    ],
    architecturalDetails: {
      style: 'Tai-Ahom and late-medieval Indo-Islamic arched vault synthesis crowned by an indigenous Assamese parabolic boat-roof',
      techniques:
        'Load-bearing thick brick piers supporting true arcuate vaults and cross-vaulted ceilings; external walls articulated with multi-foiled cusped arches and terraced eaves designed to shed heavy monsoon rainfall while channeling cross-breezes through the upper viewing hall.',
      materials:
        'Kiln-fired thin flat clay bricks (Doiya itaa) of varying dimensions bonded with Karpatia Churna—an indigenous organic lime mortar compounded from glutinous Bora rice (Bora saul), duck eggs, black gram pulse (Mati mah), snail-shell lime (Samuk chuna), Bael fruit mucilage, and resinous oils.',
      dimensions: 'Approx. 27 meters (88.5 ft) in length, 11 meters (36 ft) in width, and 11 meters in height',
      keyFeatures: [
        'Parabolic vaulted roof shaped like an inverted royal Ahom longboat (Khel-nao)',
        'Sculpted stone crocodile-dragon finials (Makara / Nga-Sang-Kham) crowning the roof ridge ends',
        'Trapezoidal ground plan with an central rectangular hall flanked by octagonal end projections',
        'Internal brick staircases fitted with low-riser steps leading to the royal upper gallery',
        'Multi-foiled arched openings arranged in tiers to provide unobstructed sightlines over Rupahi Pathar',
      ],
    },
    associatedEvents: [
      {
        year: 'c. 1700 CE',
        event: 'Inauguration of Rupahi Pathar Royal Games',
        details: 'Swargadeo Rudra Singha institutionalizes state-sponsored Bihu performances and martial games from a timber pavilion on this site.',
      },
      {
        year: '1744–1750 CE',
        event: 'Construction of the Brick Amphitheatre',
        details: 'Swargadeo Pramatta Singha constructs the surviving two-storeyed masonry Rang Ghar.',
      },
      {
        year: '1897 & 1950 CE',
        event: 'Survival Through Great Assam Earthquakes',
        details: 'The monument withstands two of the strongest recorded earthquakes in modern history (magnitudes 8.0+ and 8.6) with minimal structural collapse due to its ductile organic mortar.',
      },
    ],
    culturalSignificance:
      'Rang Ghar is universally recognized as an emblem of Assamese cultural heritage. By bringing folk performers, wrestlers, and artisans before the royal court at Rupahi Pathar, the monument helped elevate Rongali Bihu from a pastoral fertility observance into the shared national festival of Assam.',
    interestingFacts: [
      'Unlike Roman amphitheatres where spectators encircled a sunken pit, Rang Ghar functioned as a raised royal pavilion overlooking an open unfenced field (Rupahi Pathar) stretching across several hundred meters.',
      'The masonry contains no iron clamps or steel reinforcement; its tensile resilience comes entirely from the protein-and-starch polymers in the Bora rice and duck-egg mortar.',
      'Small circular apertures and vaulted bays inside the ground floor acted as thermal buffers, keeping the upper royal deck noticeably cooler during humid April afternoons.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore: The Secret Underground Passage to Talatal Ghar',
        narrative:
          'Local oral tradition holds that a hidden underground passage once connected the lower chambers of Rang Ghar directly to the royal citadel of Talatal Ghar (1.2 km away) so the king could enter and exit unseen.',
        historicalAssessment:
          'Labelled as Local Folklore: Archaeological surveys by the ASI confirm shallow service vaults beneath the structure, but no continuous subterranean tunnel linking Rang Ghar to Talatal Ghar has been archaeologically verified.',
      },
    ],
    thenAndNow: {
      historicalState:
        'In the 18th century, the exterior brickwork was coated in polished white lime stucco (chun-surkhi) with painted floral friezes and gilded finials, overlooking an active royal polo and sports ground.',
      presentDayState:
        'Today, the monument displays its weathered terracotta brick core set amidst manicured lawns maintained by the Archaeological Survey of India (ASI), serving as a protected national monument.',
      conservationStatus: 'Monument of National Importance protected by the Archaeological Survey of India (ASI), Guwahati Circle.',
    },
    visitorInfo: {
      timings: 'Sunrise to Sunset (Typically 08:00 AM – 05:00 PM)',
      openingHours: '08:00 AM',
      closingHours: '05:00 PM',
      entryFee: {
        indian: '₹25 per person (Cashless / Digital payment often lower)',
        foreign: '₹300 per person',
        camera: '₹25 (Still camera; commercial tripod filming requires ASI permit)',
        verificationNote: 'Please verify locally before visiting — ASI ticket tariffs are subject to official revision.',
      },
      bestTimeToVisit: 'October to April; mid-April coincides with Rongali Bihu cultural observances',
      idealDuration: '45 to 75 minutes',
      dressCode: 'Respectful casual attire; sturdy footwear recommended for uneven brick steps',
      facilities: 'ASI ticket counter, landscaped pathways, informational plaques, and basic washrooms near entrance (Please verify locally before visiting).',
      lastVerified: '2024 (Archaeological Survey of India, Guwahati Circle records)',
    },
    nearbyAttractions: [
      { name: 'Talatal Ghar', distance: '1.2 km', brief: 'Multi-storeyed brick royal citadel and military garrison of Rangpur' },
      { name: 'Joysagar Tank & Joydol', distance: '1.8 km', brief: '1697 royal reservoir and carved brick-and-stone temples' },
      { name: 'Ghanashyam’s House (Nati Gosain Dol)', distance: '2.2 km', brief: 'Early 18th-century terracotta brick residence attributed to the royal architect' },
    ],
    travelTips: [
      'Examine the eastern and western gables to see the surviving stone crocodile-dragon motifs along the roofline.',
      'Observe the varying brick thicknesses in the lower arches, typical of 18th-century Doiya itaa masonry.',
      'Combine Rang Ghar with nearby Talatal Ghar and Joysagar Tank as part of the historic Rangpur royal circuit.',
    ],
    verifiedFact:
      'Protected by the Archaeological Survey of India (Monument No. N-AS-42), Rang Ghar’s organic lime-and-glutinous-rice mortar has endured nearly three centuries of high humidity and major seismic events.',
    sources: [
      {
        title: 'Monument Dossier: Rang Ghar, Sibsagar (N-AS-42)',
        institutionOrAuthor: 'Archaeological Survey of India (ASI), Guwahati Circle',
      },
      {
        title: 'A History of Assam (1906)',
        institutionOrAuthor: 'Sir Edward Albert Gait',
        note: 'Documents the architectural patronage of Swargadeo Rudra Singha and Swargadeo Pramatta Singha at Rangpur.',
      },
      {
        title: 'Tungkhungia Buranji',
        institutionOrAuthor: 'Translated & Edited by Dr. Surya Kumar Bhuyan (DHAS, Assam)',
      },
    ],
    googleMapsQuery: 'Rang+Ghar+Sivasagar+Assam',
  },
  {
    id: 'talatal-ghar',
    name: 'Talatal Ghar',
    assameseName: 'তলাতল ঘৰ',
    tagline: 'The Multi-Tiered Imperial Citadel & Military Stronghold of Rangpur',
    category: 'Royal Palace',
    era: 'Ahom Dynasty (1698–1769 CE)',
    builtBy: 'Swargadeo Rudra Singha & Swargadeo Rajeswar Singha',
    yearBuilt: '1698 CE (Timber) / 1751–1769 CE (Brick Citadel)',
    whenBuiltDetails:
      'First established in 1698 CE by Swargadeo Rudra Singha as a timber-and-earth royal complex when shifting the capital to Rangpur. Rebuilt and expanded in permanent brick masonry by Swargadeo Rajeswar Singha between 1751 and 1769 CE.',
    whoBuiltDetails:
      'Initiated by Swargadeo Rudra Singha (Sukhrungphaa) and given its surviving monumental brick form by his younger son, Swargadeo Rajeswar Singha (Suramphaa).',
    whyBuilt:
      'Constructed as the principal administrative secretariat, royal residence, and fortified military garrison of the capital city of Rangpur, engineered with multi-level defensive arcades and subterranean storage vaults.',
    location: 'Rangpur, Joysagar, Sivasagar',
    distanceFromTown: '4 km south-west of Sivasagar town center',
    coordinates: [26.9631, 94.6264],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/A_walkway_in_Talatal_Ghar%2C_Sivasagar%2C_Assam.jpg/1280px-A_walkway_in_Talatal_Ghar%2C_Sivasagar%2C_Assam.jpg',
    ],
    imageCaption: 'The arched brick colonnades and open upper terraces of Talatal Ghar at Rangpur, Sivasagar.',
    shortDescription:
      'The largest surviving monument of the Ahom Kingdom, designed as a seven-storeyed palace and military complex with four upper levels and three subterranean tiers.',
    historicalIntroduction:
      'Located in the heart of historic Rangpur, Talatal Ghar is the largest surviving secular monument built by the Ahom monarchs. Combining palace apartments, council halls, a royal chapel, and a fortified munitions depot (Khar Ghar), the structure exemplifies the defensive architecture developed by the Ahoms during the eighteenth century.',
    historicalBackground: [
      'Following the turbulent wars with the Mughal Empire in the 17th century, Swargadeo Rudra Singha resolved to build a new fortified capital at Rangpur in 1698 CE, near the site where his mother Joymoti had suffered martyrdom.',
      'During the prosperous reign of Swargadeo Rajeswar Singha (1751–1769 CE), the palace was reconstructed in kiln-baked brick across multiple levels. While the upper storeys originally supported finely carved timber halls and reception pavilions, the surviving brick substructures contained guardrooms, storerooms, and labyrinthine corridors.',
      'During the Moamoria Rebellion (late 18th century) and the Burmese invasions of Assam (1817–1826 CE), the wooden upper superstructures suffered severe fire damage, leaving the massive brick lower storeys and terraces standing today.',
    ],
    architecturalDetails: {
      style: 'Ahom fortified palace architecture featuring axial courtyards, multi-bay brick arcades, and subterranean masonry chambers',
      techniques:
        'Load-bearing cellular brick walls arranged along a north-south axis with later east-west wings; weight reduction achieved via hollow vaulted chambers, open terraces, and octagonal corner bastions.',
      materials:
        'Thin kiln-fired bricks (Doiya itaa), lime-surkhi plaster, and organic Karpatia Churna binder; the uppermost apartments originally utilized seasoned Nahor (Mesua ferrea) and Sal timber.',
      dimensions: 'Main surviving plinth extends over 10,000 sq meters; historically 7 storeys (4 above ground, 3 below ground)',
      keyFeatures: [
        'Parallel rows of semi-circular and pointed brick arches forming shaded ground-level colonnades',
        'Subterranean chambers (Talatal) beneath the main plinth designed for cool storage and emergency shelter',
        'Adjacent octagonal brick Worship House (Puja Ghar) and the Khar Ghar (Royal Gunpowder & Munitions Magazine)',
        'Remnants of terracotta water pipes and lime-plastered drainage channels along the upper terraces',
      ],
    },
    associatedEvents: [
      {
        year: '1698 CE',
        event: 'Foundation of Rangpur Capital',
        details: 'Swargadeo Rudra Singha establishes the royal seat at Rangpur with Talatal Ghar at its core.',
      },
      {
        year: '1751–1769 CE',
        event: 'Brick Reconstruction under Rajeswar Singha',
        details: 'Swargadeo Rajeswar Singha adds the subterranean brick tiers and expands the palace wings.',
      },
      {
        year: '1786–1794 CE',
        event: 'Moamoria Uprising & Capital Shift',
        details: 'Prolonged conflict at Rangpur prompts Swargadeo Gaurinath Singha to relocate the Ahom capital westward to Jorhat in 1794 CE.',
      },
    ],
    culturalSignificance:
      'Talatal Ghar represents the administrative and military zenith of the Ahom state. Its vast scale reflects the organizational capacity of the Paik labour system and the sophisticated urban planning of 18th-century Rangpur.',
    interestingFacts: [
      'The upper storeys of Ahom palaces were deliberately built in lightweight timber over heavy brick lower storeys—an indigenous seismic design principle that prevented top-heavy masonry collapse during earthquakes.',
      'Next to the main palace stands the Khar Ghar, a thick-walled brick magazine where gunpowder (khar) and matchlock weapons were stored under strict royal guard.',
      'Recent non-invasive Ground Penetrating Radar (GPR) surveys by IIT Kanpur and ASI have studied the subsurface anomalies beneath the monument to map its buried foundations.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore: The 16-Kilometer Escape Tunnel to Garhgaon',
        narrative:
          'Popular tradition states that two secret escape tunnels ran from the lowest underground levels of Talatal Ghar—one stretching 3 km to the Dikhow River and another extending 16 km all the way to the Kareng Ghar palace at Garhgaon—and that British explorers sealed them after people were lost inside.',
        historicalAssessment:
          'Labelled as Local Folklore: While subterranean cellars and sealed lower openings exist within the palace foundation, modern archaeological and geophysical studies have not confirmed a 16-km brick tunnel through the alluvial water table to Garhgaon.',
      },
    ],
    thenAndNow: {
      historicalState:
        'Originally surrounded by a brick fortification wall, earthen ramparts (garh), and water moats, crowned by two upper storeys of carved timber halls (Solang Ghar).',
      presentDayState:
        'The surviving multi-level brick arcades, open terraces, and octagonal outbuildings stand within an expansive ASI-maintained archaeological park.',
      conservationStatus: 'Protected Monument of National Importance under the Archaeological Survey of India (ASI).',
    },
    visitorInfo: {
      timings: 'Sunrise to Sunset (Typically 08:00 AM – 05:00 PM)',
      openingHours: '08:00 AM',
      closingHours: '05:00 PM',
      entryFee: {
        indian: '₹25 per person',
        foreign: '₹300 per person',
        camera: '₹25 (Still camera)',
        verificationNote: 'Please verify locally before visiting — ASI entry fees are subject to official revision.',
      },
      bestTimeToVisit: 'October to April for pleasant outdoor exploration of the open brick terraces',
      idealDuration: '1.5 to 2 hours',
      dressCode: 'Comfortable walking footwear; the complex involves climbing brick staircases and sunny terraces',
      facilities: 'ASI ticket kiosk, garden pathways, drinking water, and parking area (Please verify locally before visiting).',
      lastVerified: '2024 (ASI Guwahati Circle)',
    },
    nearbyAttractions: [
      { name: 'Rang Ghar', distance: '1.2 km', brief: 'Two-storeyed royal sports pavilion at Rupahi Pathar' },
      { name: 'Joysagar Tank & Joydol', distance: '1.5 km', brief: '318-acre historic reservoir and Vishnu temple' },
      { name: 'Rudrasagar Tank & Shivadol', distance: '3.5 km', brief: '18th-century tank and temple built by King Lakshmi Singha' },
    ],
    travelTips: [
      'Notice the octagonal brick shrine and the separate munitions house (Khar Ghar) on the western side of the main plinth.',
      'The sealed lower entryways are cordoned off for structural conservation; please respect ASI barriers.',
    ],
    verifiedFact:
      'Historical Buranjis record that while the lower masonry levels (Talatal) served as secure storehouses and guard quarters, the Ahom monarch resided in the timber pavilions erected atop the highest brick terrace.',
    sources: [
      {
        title: 'Archaeological Survey of India — Sibsagar Group of Monuments',
        institutionOrAuthor: 'ASI Guwahati Circle',
      },
      {
        title: 'Comprehensive History of Assam, Vol. III',
        institutionOrAuthor: 'Edited by H.K. Barpujari (Publication Board Assam)',
      },
      {
        title: 'Tungkhungia Buranji',
        institutionOrAuthor: 'S.K. Bhuyan',
      },
    ],
    googleMapsQuery: 'Talatal+Ghar+Sivasagar+Assam',
  },
  {
    id: 'kareng-ghar',
    name: 'Kareng Ghar (Garhgaon Palace)',
    assameseName: 'কাৰেং ঘৰ (গড়গাঁও)',
    tagline: 'The Seven-Storeyed Step-Pyramidal Citadel of Imperial Garhgaon',
    category: 'Royal Palace',
    era: 'Ahom Dynasty (1540 CE Capital / 1752 CE Brick Reconstruction)',
    builtBy: 'Swargadeo Suklengmung (Capital) & Swargadeo Pramatta Singha / Rajeswar Singha (Brick Palace)',
    yearBuilt: '1540 CE (Timber) / 1752 CE (Brick)',
    whenBuiltDetails:
      'Garhgaon was established as the Ahom capital in 1540 CE by Swargadeo Suklengmung. After earlier wooden palaces perished, the surviving seven-tiered brick palace was built in 1752 CE.',
    whoBuiltDetails:
      'Founded by Swargadeo Suklengmung (Gargayan Raja); the surviving masonry Kareng Ghar was constructed by Swargadeo Pramatta Singha and Swargadeo Rajeswar Singha.',
    whyBuilt:
      'Built as the principal royal residence and council seat at Garhgaon—the fortified capital of the Ahom Kingdom for over a century and a half.',
    location: 'Garhgaon, near Nazira, Sivasagar District',
    distanceFromTown: '15 km east of Sivasagar town center',
    coordinates: [26.9292, 94.7562],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Kareng_Ghar%2C_Sivasagar%2C_Assam.jpg/1280px-Kareng_Ghar%2C_Sivasagar%2C_Assam.jpg',
    ],
    imageCaption: 'The receding step-pyramidal brick tiers of Kareng Ghar at the historic capital of Garhgaon.',
    shortDescription:
      'The step-pyramidal royal palace at the ancient capital of Garhgaon, rising in receding brick terraces once encircled by bamboo palisades and deep moats.',
    historicalIntroduction:
      'Situated 15 kilometers east of Sivasagar town near the Dikhow River, Kareng Ghar ("The Royal Palace") stands at the center of Garhgaon, which served as the principal seat of the Ahom monarchy from 1540 CE until the rise of Rangpur. Its distinctive step-pyramidal silhouette is one of the finest examples of royal secular architecture in Northeast India.',
    historicalBackground: [
      'Swargadeo Suklengmung established the capital at Garhgaon in 1540 CE, surrounding the royal enclosure with high earthen ramparts (garh) planted with dense thorny bamboo thickets (Kotoha banh) and deep wet moats.',
      'When the Mughal general Mir Jumla occupied Garhgaon in March 1662, his accompanying chronicler Shihabuddin Talish left a famous eyewitness description of the earlier wooden palace, marveling at its 66-pillared audience hall (Solang) and polished lattice woodwork.',
      'After the older wooden structures decayed or were damaged during political upheavals, Swargadeo Rajeswar Singha reconstructed the palace in 1752 CE as a seven-storeyed masonry edifice tapering upward in receding terraces.',
    ],
    architecturalDetails: {
      style: 'Step-pyramidal terraced royal citadel with arcaded galleries and central watch-pavilion',
      techniques:
        'Receding load-bearing brick storeys where each upper level steps inward, creating wide wraparound perimeter promenades and distributing structural weight evenly onto the broad ground plinth.',
      materials:
        'Kiln-baked flat bricks (Doiya itaa), lime-sand plaster, and organic Karpatia Churna mortar.',
      dimensions: 'Four surviving above-ground masonry tiers with three subterranean cellar levels; surrounded by ancient moat traces',
      keyFeatures: [
        'Pyramidal elevation with open parapets and corner watch-posts on each receding terrace',
        'Arched ground-floor bays leading into cool, interconnected vaulted chambers',
        'Crowning single-roomed chamber at the summit providing a 360-degree view of the Garhgaon plains',
        'Remnants of ancient stone-lined gateways (Singhaduar) and protective earthen ramparts surrounding the complex',
      ],
    },
    associatedEvents: [
      {
        year: '1540 CE',
        event: 'Foundation of Garhgaon by Suklengmung',
        details: 'Garhgaon becomes the royal capital of the Ahom Kingdom with concentric earthen fortifications.',
      },
      {
        year: '1662 CE',
        event: 'Eyewitness Account by Shihabuddin Talish',
        details: 'During Mir Jumla’s expedition, Persian chronicler Shihabuddin Talish writes in the Fathiyah-i-Ibriyah that no ruler in the world possessed a timber palace matching the craftsmanship of Garhgaon.',
      },
      {
        year: '1752 CE',
        event: 'Construction of the Brick Kareng Ghar',
        details: 'The surviving multi-tiered masonry palace is erected during the Tungkhungia period.',
      },
    ],
    culturalSignificance:
      'Garhgaon and its Kareng Ghar symbolize the resilience and architectural sophistication of the Ahom state during its centuries of consolidation and defense of the Brahmaputra Valley.',
    interestingFacts: [
      'Shihabuddin Talish recorded in 1662 that 12,000 carpenters had worked for a full year to construct the earlier wooden audience hall at Garhgaon, using interlocking joinery without iron nails.',
      'The surrounding ramparts of Garhgaon were planted with dense thorny bamboo so thick that not even a horseman or arrow could penetrate the perimeter.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore: The Echoing Whisper Chambers',
        narrative:
          'Local lore suggests the corner chambers and hollow flues of Kareng Ghar were acoustically tuned so royal guards on the top terrace could overhear whispers from the ground-level entrance arches.',
        historicalAssessment:
          'Labelled as Local Folklore: While the vaulted brick corridors naturally amplify footsteps and voices, the vertical shafts primarily served for rainwater drainage and ventilation.',
      },
    ],
    thenAndNow: {
      historicalState:
        'Historically the centerpiece of a bustling walled royal city with four monumental Lion Gates (Singhaduar), royal elephant stables, and timber audience halls.',
      presentDayState:
        'The four above-ground brick storeys stand intact within a quiet, tree-fringed archaeological compound protected by the ASI.',
      conservationStatus: 'Protected Monument of National Importance (ASI, Guwahati Circle).',
    },
    visitorInfo: {
      timings: 'Sunrise to Sunset (Typically 08:30 AM – 05:00 PM)',
      openingHours: '08:30 AM',
      closingHours: '05:00 PM',
      entryFee: {
        indian: '₹25 per person',
        foreign: '₹300 per person',
        camera: '₹25 (Still camera)',
        verificationNote: 'Please verify locally before visiting — subject to ASI tariff updates.',
      },
      bestTimeToVisit: 'October to April',
      idealDuration: '1 to 1.5 hours',
      dressCode: 'Comfortable attire; steep brick steps lead between terraces',
      facilities: 'ASI ticket counter, garden seating, and parking outside the gate (Please verify locally before visiting).',
      lastVerified: '2024 (ASI Guwahati Circle)',
    },
    nearbyAttractions: [
      { name: 'Charaideo Maidams', distance: '16 km', brief: 'UNESCO World Heritage royal burial mounds further east' },
      { name: 'Nazira Historic Town', distance: '3 km', brief: 'Historic Dikhow river crossing and Assam Company headquarters' },
      { name: 'Talatal Ghar', distance: '15 km', brief: 'Sister royal citadel at Rangpur, Sivasagar' },
    ],
    travelTips: [
      'Kareng Ghar lies directly along the route between Sivasagar town and Charaideo Maidams, making it natural to study both sites on the same day.',
      'Take care on the narrow interior brick stairways when ascending to the upper terraces.',
    ],
    verifiedFact:
      'In the Fathiyah-i-Ibriyah (1662 CE), Mughal chronicler Shihabuddin Talish documented that the outer fortification of Garhgaon had a circumference of nearly three kos (approx. 9–10 km) protected by a deep moat.',
    sources: [
      {
        title: 'Fathiyah-i-Ibriyah (1662 CE)',
        institutionOrAuthor: 'Shihabuddin Talish (Translated by Sir Jadunath Sarkar)',
      },
      {
        title: 'A History of Assam',
        institutionOrAuthor: 'Sir Edward Albert Gait',
      },
      {
        title: 'ASI Monument Records: Kareng Ghar, Garhgaon',
        institutionOrAuthor: 'Archaeological Survey of India',
      },
    ],
    googleMapsQuery: 'Kareng+Ghar+Garhgaon+Nazira+Assam',
  },
  {
    id: 'sivadol',
    name: 'Sivadol & Borpukhuri',
    assameseName: 'শিৱদ’ল আৰু বৰপুখুৰী',
    tagline: 'The 104-Foot Royal Shiva Temple & 129-Acre Elevated Reservoir',
    category: 'Ancient Temple',
    era: 'Ahom Dynasty (Reign of Swargadeo Siba Singha)',
    builtBy: 'Bar Raja Queen Ambika (Draupadi)',
    yearBuilt: '1734 CE (Tank 1733 CE / Temples 1734 CE)',
    whenBuiltDetails:
      'The great Sivasagar Tank (Borpukhuri) was excavated in 1733 CE (Saka 1655), and the triad of temples—Sivadol, Vishnudol, and Devidol—was consecrated on its southern embankment in 1734 CE (Saka 1656).',
    whoBuiltDetails:
      'Commissioned by Queen Ambika (formerly Kalugaon Konwari, crowned as Bar Raja or Chief Sovereign) during the reign of her consort, Swargadeo Siba Singha (1714–1744 CE).',
    whyBuilt:
      'Erected to honor Lord Shiva—after whom both the monarch Siba Singha and the town of Sivasagar were named—and to establish a sacred civic reservoir and temple complex at the heart of the kingdom.',
    location: 'Southern Embankment of Borpukhuri, Central Sivasagar Town',
    distanceFromTown: '0 km (Heart of Sivasagar town)',
    coordinates: [26.9856, 94.6375],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/sivadol.JPG',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/sivadol.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sivadol_Sivasagar.JPG/1280px-Sivadol_Sivasagar.JPG',
    ],
    imageCaption: 'Sivadol rising 104 feet above the southern bank of Borpukhuri, crowned by its gilded Kalasha.',
    shortDescription:
      'Standing 104 feet high on the bank of the 129-acre Borpukhuri tank, Sivadol is one of the tallest historical Shiva temples in India, crowned by an 8-foot gilded copper-and-gold Kalasha.',
    historicalIntroduction:
      'Giving the modern town of Sivasagar ("The Ocean of Shiva") its name, the Sivadol and the adjoining Borpukhuri reservoir represent the pinnacle of 18th-century Ahom sacred architecture and hydrological engineering. Flanked by the companion shrines of Vishnudol and Devidol, Sivadol remains both a protected national monument and an active center of worship.',
    historicalBackground: [
      'During the reign of Swargadeo Siba Singha, astrologers predicted the king’s rule would be threatened; in response, the king declared his chief queens successively as "Bar Raja" (Supreme Ruler), vesting them with royal authority to mint coins and commission state monuments.',
      'After the passing of the first Bar Raja, Queen Phuleswari, Siba Singha married her sister Draupadi, who took the royal name Ambika and ascended as Bar Raja. In 1733 CE, Queen Ambika directed the excavation of the 129-acre Borpukhuri tank, followed in 1734 CE by the construction of Sivadol, Vishnudol, and Devidol.',
      'During the 1950 Assam earthquake, the upper finial (Kalasha) of Sivadol was dislodged; it was carefully restored and re-installed atop the shikhara by the Archaeological Survey of India alongside local artisans.',
    ],
    architecturalDetails: {
      style: 'Ahom-Nilachal Do-chala and rekha-deul synthesis with a fluted vertical Shikhara and octagonal garbhagriha',
      techniques:
        'Deep stone-block foundation anchored into the compacted earthen embankment of Borpukhuri; upper superstructure built in concentric rings of thin terracotta brick with vertical honeycombed ribs (angashikharas) that reduce wind load.',
      materials:
        'Dressed sandstone blocks for the lower plinth and sculpted friezes, kiln-baked bricks with organic Karpatia Churna mortar for the spire, and a copper-core Kalasha plated in gold leaf.',
      dimensions: 'Height: 104 feet (approx. 31.7 meters); Base perimeter: 195 feet (approx. 59.4 meters); Kalasha height: ~8 feet',
      keyFeatures: [
        'Unique inverted-linga (Kurmaphrista / subterranean water-fed) natural stone Shiva Linga inside the sanctum sanctorum',
        'Fluted curvilinear spire (Shikhara) adorned with tiered miniature turret motifs (urushringas)',
        '8-foot-tall crowning mastaka and gold-plated Kalasha finial',
        'Sandstone bas-relief panels on the lower outer walls depicting Shaivite, Vaishnavite, and Shakta iconography alongside Ahom court motifs',
      ],
    },
    associatedEvents: [
      {
        year: '1733–1734 CE',
        event: 'Excavation of Borpukhuri & Consecration of the Temple Triad',
        details: 'Bar Raja Queen Ambika completes the 129-acre reservoir and dedicates Sivadol, Vishnudol, and Devidol.',
      },
      {
        year: 'August 15, 1950',
        event: '1950 Great Assam Earthquake & Restoration',
        details: 'The 8.6-magnitude earthquake shakes down the golden Kalasha without toppling the brick spire; the Kalasha is subsequently restored to the apex.',
      },
    ],
    culturalSignificance:
      'Sivadol is the spiritual anchor of Sivasagar town. Every year during Maha Shivaratri, hundreds of thousands of devotees and scholars gather around Borpukhuri for one of Northeast India’s oldest continuous religious congregations.',
    interestingFacts: [
      'The water level of the 129-acre Borpukhuri tank sits above the surrounding street level of Sivasagar town, fed by natural underground artesian springs (nadi-mukh) rather than surface river canals.',
      'Between the inner and outer earthen embankments (par), Ahom engineers dug a perimeter drainage moat (jamuna) to regulate seepage and protect the surrounding town from flooding.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore:Attempts to Plunder the Golden Dome',
        narrative:
          'Local oral accounts tell that during the Burmese invasions (Manor Din), raiders attempted to shoot down or pry loose the golden Kalasha atop Sivadol, only to be driven back by swarms of wild hornets nesting inside the spire.',
        historicalAssessment:
          'Labelled as Local Folklore: While Burmese forces did plunder numerous temples in Upper Assam between 1817 and 1825, the survival of the Kalasha is attributed to the sheer height and steep overhang of the 104-foot spire.',
      },
    ],
    thenAndNow: {
      historicalState:
        'Originally approached via ceremonial royal ghats on the southern bank of Borpukhuri, reserved for the royal court and orthodox priests.',
      presentDayState:
        'An active living temple and ASI-protected national monument surrounded by a pedestrian heritage promenade circling the entire 129-acre lake.',
      conservationStatus: 'Protected Monument of National Importance (ASI) & Active Shrine managed by the Sivadol Development Board.',
    },
    visitorInfo: {
      timings: '05:30 AM – 08:30 PM (Daily)',
      openingHours: '05:30 AM',
      closingHours: '08:30 PM',
      entryFee: {
        indian: 'Free entry',
        foreign: 'Free entry',
        camera: 'Free in outer compound; photography strictly prohibited inside the inner sanctum (Garbhagriha)',
        verificationNote: 'Verified free access; donations to the temple trust are entirely voluntary.',
      },
      bestTimeToVisit: 'Year-round; February/March for Maha Shivaratri cultural observations',
      idealDuration: '1 to 1.5 hours (including Vishnudol, Devidol, and Borpukhuri bank)',
      dressCode: 'Modest temple attire; footwear must be left at the designated shoe stand outside the temple gate',
      facilities: 'Shoe stand, drinking water, paved lakeside walkway, and lighting (Please verify locally before visiting).',
      lastVerified: '2024 (Sivasagar District Administration & ASI records)',
    },
    nearbyAttractions: [
      { name: 'Vishnudol & Devidol', distance: '50–100 meters', brief: 'Companion 1734 CE temples on the same southern bank of Borpukhuri' },
      { name: 'Assam Tai Museum', distance: '750 meters', brief: 'Repository of Tai-Ahom manuscripts, swords, and royal textiles on the western bank' },
      { name: 'Borpukhuri Birdwatching Promenade', distance: 'Adjacent', brief: 'Winter roosting site for migratory lesser whistling ducks' },
    ],
    travelTips: [
      'Walk 100 meters east and west of Sivadol to examine the sculpted sandstone panels on Vishnudol and Devidol.',
      'Observe how the water level of Borpukhuri remains constant across both dry winters and heavy monsoons.',
    ],
    verifiedFact:
      'Standing 104 feet tall with a base perimeter of 195 feet, Sivadol is documented by the Archaeological Survey of India as one of the tallest historic brick-and-stone Shiva temples in India.',
    sources: [
      {
        title: 'Monument Dossier: Sivadol, Vishnudol and Devidol on Sivasagar Tank',
        institutionOrAuthor: 'Archaeological Survey of India (ASI), Guwahati Circle',
      },
      {
        title: 'Sivasagar District Gazetteer',
        institutionOrAuthor: 'Government of Assam',
      },
      {
        title: 'Descriptive List of Inscriptions of Assam',
        institutionOrAuthor: 'Dr. Maheswar Neog (Prachya-Sasanavali)',
      },
    ],
    googleMapsQuery: 'Sivadol+Sivasagar+Assam',
  },
  {
    id: 'joysagar-tank',
    name: 'Joysagar Tank & Joydol',
    assameseName: 'জয়সাগৰ পুখুৰী আৰু জয়দ’ল',
    tagline: 'The 318-Acre Royal Memorial Reservoir & Kesavanarayan Temple Complex',
    category: 'Sacred Lake',
    era: 'Ahom Dynasty (Reign of Swargadeo Rudra Singha)',
    builtBy: 'Swargadeo Rudra Singha (Sukhrungphaa)',
    yearBuilt: '1697–1698 CE',
    whenBuiltDetails:
      'The tank was excavated in 1697 CE (Saka 1619) in 45 days; the five temples on its banks—headed by Joydol (Kesavanarayan Dol)—were constructed in 1698 CE.',
    whoBuiltDetails:
      'Commissioned by Swargadeo Rudra Singha (1696–1714 CE), eldest son of Swargadeo Gadadhar Singha and Sati Joymoti.',
    whyBuilt:
      'Excavated at Jerenga Pathar to commemorate the supreme sacrifice of Queen Mother Joymoti, who endured fatal torture on this spot rather than reveal the whereabouts of her exiled husband Gadapani during the tyrannical regime of Lora Raja (Sulikphaa).',
    location: 'Joysagar, 5 km south-west of Sivasagar Town',
    distanceFromTown: '5 km south-west of Sivasagar town center',
    coordinates: [26.9534, 94.6346],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Joysagar_Joydol_Relic.jpg/1280px-Joysagar_Joydol_Relic.jpg',
    ],
    imageCaption: 'Joydol (Kesavanarayan Temple) overlooking the vast 318-acre expanse of Joysagar Tank.',
    shortDescription:
      'Encompassing 318 acres (including its earthen embankments), Joysagar is the largest historic human-excavated reservoir in India, consecrated by King Rudra Singha in memory of his mother Sati Joymoti.',
    historicalIntroduction:
      'Spanning 318 acres of water and embankments at the historic plains of Jerenga Pathar, Joysagar Tank and its crowning shrine, Joydol, unite filial piety, royal hydraulic engineering, and terracotta sculptural mastery. Consecrated in 1697–1698 CE by Swargadeo Rudra Singha, it marks the beginning of the golden era of Ahom monument building.',
    historicalBackground: [
      'In 1679 CE, during the political purges orchestrated by the regent Laluksola Borphukan and the boy-king Sulikphaa (Lora Raja), Prince Gadapani fled into the Naga Hills. His wife, Princess Joymoti, was seized and tied to a thorny Kotoha tree at Jerenga Pathar, where she died after days of interrogation without betraying her husband.',
      'After Gadapani reclaimed the throne as Swargadeo Gadadhar Singha (1681–1696 CE), his son Rudra Singha succeeded him in 1696 CE. Determined to immortalize his mother’s martyrdom, Rudra Singha mobilized thousands of Paik workers to excavate Joysagar Tank at the site of her sacrifice in 1697 CE.',
      'In 1698 CE, the king erected a cluster of temples along the northern and western banks: Joydol (Vishnu/Kesavanarayan), Baidyanath Shivadol, Devidol (Hara-Gauri), Surya Mandir, and Nati Gosain Dol.',
    ],
    architecturalDetails: {
      style: 'Nilachal-inspired pancharatha brick temple architecture with rich exterior terracotta and stone bas-relief friezes',
      techniques:
        'Artesian spring-fed tank design with wide tiered earthen bunds (par); temple exterior clad in grid-like moulded terracotta and sandstone plaques depicting secular and mythological scenes.',
      materials:
        'Compacted alluvial clay embankments, subterranean Sal wood pilings around central spring heads (Nag-mari), kiln-baked bricks, and carved sandstone blocks.',
      dimensions: 'Total area including embankments: ~318 acres (1.28 sq km); Water surface area: ~155 acres; Average depth: ~14 feet',
      keyFeatures: [
        'Joydol (Kesavanarayan Dol) featuring hundreds of carved exterior panels of Vishnu avatars, riders on horseback, and royal hunting scenes',
        'Subterranean earthen pipeline system that historically channeled fresh water from Joysagar to the royal palace at Talatal Ghar (1.5 km away)',
        'Baidyanath Shivadol, Devidol, and the Bengal-style Do-chala Ghanashyam House (Nati Gosain Dol) along the perimeter',
      ],
    },
    associatedEvents: [
      {
        year: 'March 1680 CE',
        event: 'Martyrdom of Sati Joymoti at Jerenga Pathar',
        details: 'Princess Joymoti sacrifices her life at Jerenga Pathar to protect the future Swargadeo Gadadhar Singha.',
      },
      {
        year: '1697–1698 CE',
        event: 'Excavation of Joysagar & Consecration of Joydol',
        details: 'Swargadeo Rudra Singha excavates the 318-acre reservoir in 45 days and builds the temple complex.',
      },
    ],
    culturalSignificance:
      'Joysagar is revered across Assam as a monument to maternal courage and self-sacrifice. Every year on March 27, Joymoti Divas is observed across Assam in remembrance of Sati Joymoti.',
    interestingFacts: [
      'Ahom hydrologists buried a carved wooden post (Nag-mari) over the central artesian spring of the tank before flooding the basin, ensuring continuous groundwater recharge.',
      'Traces of an 18th-century terracotta pipeline demonstrating gravity-fed water supply from Joysagar toward the royal citadel at Rangpur have been documented by historians.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore: The Trail of Boiled Rice (Chaul-dhowa)',
        narrative:
          'Local tradition recounts that to determine the exact layout of the tank, royal priests walked across Jerenga Pathar following the path where Joymoti had been led by her captors.',
        historicalAssessment:
          'Labelled as Local Folklore / Oral Tradition: While the tank’s location at Jerenga Pathar is historically documented in the Buranjis, its exact rectangular orientation (north-south elongated axis) followed established Tantric and Vastu hydraulic geometry.',
      },
    ],
    thenAndNow: {
      historicalState:
        'Served as the sacred water source for the royal court of Rangpur and the ceremonial center of Rudra Singha’s capital.',
      presentDayState:
        'A serene, expansive water body and protected archaeological zone that also acts as a major winter refuge for migratory waterfowl.',
      conservationStatus: 'Temples protected as Monuments of National Importance by the Archaeological Survey of India (ASI).',
    },
    visitorInfo: {
      timings: 'Tank banks open all day; Temple precincts open Sunrise to Sunset (06:00 AM – 06:00 PM)',
      openingHours: '06:00 AM',
      closingHours: '06:00 PM',
      entryFee: {
        indian: 'Free entry',
        foreign: 'Free entry',
        camera: 'Free',
        verificationNote: 'Verified open public access; please verify locally for any special festival regulations.',
      },
      bestTimeToVisit: 'November to March (when migratory ducks and geese cover the reservoir)',
      idealDuration: '1 to 2 hours',
      dressCode: 'Modest attire; remove footwear before stepping onto the temple mandapa plinths',
      facilities: 'Roadside parking along the northern bank and ASI informational signage (Please verify locally before visiting).',
      lastVerified: '2024 (ASI & Sivasagar District Administration)',
    },
    nearbyAttractions: [
      { name: 'Talatal Ghar', distance: '1.5 km', brief: 'Seven-storeyed royal citadel of Rangpur' },
      { name: 'Rang Ghar', distance: '1.8 km', brief: 'Two-storeyed royal amphitheatre' },
      { name: 'Ghanashyam’s House (Nati Gosain Dol)', distance: '800 meters', brief: 'Terracotta brick hut-style shrine on the southwest bank of Joysagar' },
    ],
    travelTips: [
      'Walk around the outer wall of Joydol to study the bas-relief panels showing 18th-century Ahom soldiers, elephants, and musicians.',
      'Do not miss the small terracotta brick shrine known as Ghanashyam’s House (Nati Gosain Dol) on the southwestern corner of the tank.',
    ],
    verifiedFact:
      'Encompassing 318 acres including its four massive earthen banks, Joysagar is documented in district gazetteers as the largest human-excavated historical tank in India.',
    sources: [
      {
        title: 'Tungkhungia Buranji',
        institutionOrAuthor: 'Dr. Surya Kumar Bhuyan (Department of Historical and Antiquarian Studies, Assam)',
      },
      {
        title: 'ASI Monument Dossier: Joydol, Shivadol, Devidol and Ghanashyam’s House, Joysagar',
        institutionOrAuthor: 'Archaeological Survey of India, Guwahati Circle',
      },
      {
        title: 'Sivasagar District Administration Heritage Archives',
        institutionOrAuthor: 'Government of Assam (sivasagar.assam.gov.in)',
      },
    ],
    googleMapsQuery: 'Joysagar+Tank+Joydol+Sivasagar+Assam',
  },
  {
    id: 'charaideo-maidam',
    name: 'Charaideo Maidams',
    assameseName: 'চৰাইদেউ মৈদাম',
    tagline: 'UNESCO World Heritage Site — The Royal Mound-Burial Landscape of the Ahom Dynasty',
    category: 'UNESCO Heritage',
    era: 'Ahom Dynasty (1253 CE – 18th Century CE)',
    builtBy: 'Successive Ahom Swargadeos (Initiated under Chaolung Sukaphaa)',
    yearBuilt: '1253 CE onwards (Inscribed by UNESCO in July 2024)',
    whenBuiltDetails:
      'Initiated following the establishment of the first Ahom capital at Charaideo (Che-Tam-Doi) by Chaolung Sukaphaa in 1253 CE, with royal burials continuing until the late 18th century.',
    whoBuiltDetails:
      'Constructed by the specialized royal guild of Changrung Phukan (Chief Royal Engineer and Architect) for deceased Ahom Swargadeos, queens, and princes.',
    whyBuilt:
      'Created as the sacred royal necropolis where departed Ahom monarchs—revered as descendants of the heavenly lord Khunlung—were entombed with their royal regalia so their spirits (Dam) could ascend and watch over the realm.',
    location: 'Charaideo Foothills, ~28 km east of Sivasagar Town',
    distanceFromTown: '28 km east of Sivasagar town center',
    coordinates: [26.9450, 94.9080],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Maidams_%28N-AS-24%29.jpg/1280px-Maidams_%28N-AS-24%29.jpg',
    ],
    imageCaption: 'The hemispherical earthen royal burial tumuli (Moidams) nestled at the foothills of the Patkai range at Charaideo.',
    shortDescription:
      'Inscribed as a UNESCO World Heritage Site in July 2024, Charaideo preserves over 90 royal burial tumuli (Moidams) of the Ahom kings and queens, set amidst the sacred foothills of the Patkai range.',
    historicalIntroduction:
      'Nestled at the undulating foothills of the Patkai range, Charaideo (derived from the Tai-Ahom "Che-Tam-Doi", meaning "the shining city on the hills") was the first permanent capital founded by Chaolung Sukaphaa in 1253 CE. Even after the administrative seat moved to Garhgaon and Rangpur, Charaideo remained the supreme sacred necropolis of the Ahom monarchy for nearly six centuries.',
    historicalBackground: [
      'In Tai-Ahom cosmology, prior to the adoption of cremation in the mid-18th century, deceased monarchs were interred in monumental vaulted earth-mounds known as Moidams (from Tai "Phrang-Mai-Dam", meaning to bury the spirit of the dead).',
      'The Changrung Phukan’s Buranji, an authentic engineering manual of the Ahom court, records the exact quantities of stone boulders, kiln-baked bricks, lime mortar, and labor required to construct each royal Moidam.',
      'Between 2000 and 2002, scientific excavations of Maidam No. 2 by the Archaeological Survey of India confirmed the internal three-part structure recorded in the Buranjis: a subterranean vaulted brick-and-stone chamber (Ghar), a hemispherical earthen mound (Midam), and an octagonal dwarf boundary wall (Garh) with a crowning shrine (Chou-chali).',
    ],
    architecturalDetails: {
      style: 'Tai-Ahom royal tumulus funerary architecture harmonized with natural hillock topography',
      techniques:
        'Subterranean corbelled and true-arch masonry vaults covered by alternating waterproof layers of compacted clay, boulders, brickbats, and black soil to prevent water infiltration and erosion.',
      materials:
        'Sandstone blocks, kiln-baked bricks, Karpatia Churna organic mortar, seasoned Sal and Nahor timber for the inner Rungdang casket, and turf-covered earthen fill.',
      dimensions: 'Core heritage zone spans 95 hectares with 90+ documented mounds ranging from 4 m to over 18 m in height',
      keyFeatures: [
        'Underground vaulted chamber (Ghar) where the royal wooden coffin (Rungdang) rested on a raised platform',
        'Hemispherical earth mound engineered to shed heavy monsoon rainfall',
        'Brick-built octagonal boundary wall (Garh) with an arched western entrance gateway (Singhaduar)',
        'Crowning open pavilion (Chou-chali) at the apex of the mound used for ancestral offerings',
      ],
    },
    associatedEvents: [
      {
        year: '1253 CE',
        event: 'Foundation of Che-Tam-Doi (Charaideo)',
        details: 'Chaolung Sukaphaa establishes his first capital and ritual center at Charaideo.',
      },
      {
        year: '1268 CE',
        event: 'Entombment of Chaolung Sukaphaa',
        details: 'Upon his passing in 1268 CE, founder-king Sukaphaa is laid to rest at Charaideo, inaugurating the royal burial tradition.',
      },
      {
        year: '2000–2002 CE',
        event: 'ASI Scientific Excavation of Maidam No. 2',
        details: 'Archaeologists uncover the subterranean brick vault, skeletal remains, ivory buttons, gold ornaments, and wooden coffin fragments.',
      },
      {
        year: 'July 26, 2024',
        event: 'UNESCO World Heritage Inscription',
        details: 'At its 46th session in New Delhi, UNESCO inscribes "Moidams – the Mound-Burial System of the Ahom Dynasty" under Cultural Criteria (iii) and (iv).',
      },
    ],
    culturalSignificance:
      'Charaideo is the spiritual cradle of the Tai-Ahom civilization and Northeast India’s first Cultural World Heritage Site. Every year on January 31, the festival of Me-Dam-Me-Phi (ancestral veneration) is celebrated here with deep reverence.',
    interestingFacts: [
      'The Changrung Phukan’s Buranji notes that afterSwargadeo Gadadhar Singha died in 1696 CE, constructing his massive Moidam at Charaideo took several months of coordinated engineering work.',
      'Even after Hindu cremation rites were adopted under Swargadeo Rajeswar Singha, the ashes and funerary urns of monarchs continued to be interred within Moidams at Charaideo.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore: Curses Upon the Tomb Plunderers',
        narrative:
          'Local oral tradition recounts that those who desecrated the sacred mounds in search of buried royal gold during Mir Jumla’s 1662 invasion and later colonial looting were struck by sudden misfortune.',
        historicalAssessment:
          'Labelled as Local Folklore / Historical Context: Historical chronicles confirm that both Mughal troops in 1662 and later treasure-hunters did excavate several Moidams for funerary gold, prompting the ASI to place the surviving necropolis under strict legal protection.',
      },
    ],
    thenAndNow: {
      historicalState:
        'A restricted royal sanctuary guarded by dedicated priestly clans (Deodhais, Bailungs, and Mohans) where annual state sacrifices and ancestral rites were performed.',
      presentDayState:
        'A globally protected UNESCO World Heritage Site (2024) managed jointly by the Archaeological Survey of India and the Directorate of Archaeology, Government of Assam.',
      conservationStatus: 'UNESCO World Heritage Site (2024) & ASI Monument of National Importance (N-AS-24).',
    },
    visitorInfo: {
      timings: '08:30 AM – 05:00 PM (Daily)',
      openingHours: '08:30 AM',
      closingHours: '05:00 PM',
      entryFee: {
        indian: '₹25 per person',
        foreign: '₹300 per person',
        camera: '₹25 (Still camera)',
        verificationNote: 'Please verify locally before visiting — subject to ASI and UNESCO site management updates.',
      },
      bestTimeToVisit: 'October to April; January 31 for the Me-Dam-Me-Phi ancestral observance',
      idealDuration: '2 to 3 hours',
      dressCode: 'Respectful attire; visitors are strictly prohibited from climbing or stepping onto the earthen burial mounds',
      facilities: 'Site Interpretation Centre, ASI ticket kiosk, heritage walkways, and resting benches (Please verify locally before visiting).',
      lastVerified: '2024 (UNESCO World Heritage Committee & ASI Dossier)',
    },
    nearbyAttractions: [
      { name: 'Kareng Ghar (Garhgaon)', distance: '16 km', brief: 'Seven-tiered royal palace along the route back toward Sivasagar' },
      { name: 'Langkuri Dol', distance: '2 km', brief: 'Ancient Shiva shrine within the Charaideo sacred hillock zone' },
      { name: 'Moidam Interpretation Centre', distance: 'On-site', brief: 'Exhibits archaeological findings from Maidam No. 2' },
    ],
    travelTips: [
      'Begin your visit at the on-site Interpretation Gallery to understand the cross-section diagram of Maidam No. 2 before walking the grounds.',
      'Please remain on the paved stone pathways; Charaideo is a sacred royal cemetery and walking on the mounds is prohibited.',
    ],
    verifiedFact:
      'On 26 July 2024, UNESCO inscribed "Moidams – the Mound-Burial System of the Ahom Dynasty" as a World Heritage Site under criteria (iii) and (iv), recognizing its unique 600-year funerary tradition.',
    sources: [
      {
        title: 'UNESCO World Heritage Nomination Dossier: Moidams – the Mound-Burial System of the Ahom Dynasty (ID 1711)',
        institutionOrAuthor: 'UNESCO World Heritage Centre / Archaeological Survey of India (2024)',
      },
      {
        title: 'Changrung Phukanar Buranji',
        institutionOrAuthor: 'Edited by B.C. Handique (Department of Historical and Antiquarian Studies, Assam)',
      },
      {
        title: 'Excavation Report on Maidam No. 2, Charaideo',
        institutionOrAuthor: 'Archaeological Survey of India, Guwahati Circle',
      },
    ],
    googleMapsQuery: 'Charaideo+Maidam+UNESCO+Heritage+Assam',
  },
  {
    id: 'namdang-stone-bridge',
    name: 'Namdang Stone Bridge',
    assameseName: 'নামদাং শিলৰ সাঁকো',
    tagline: 'The 1703 Monolithic Sandstone Bridge Over the Namdang River',
    category: 'Engineering Marvel',
    era: 'Ahom Dynasty (Reign of Swargadeo Rudra Singha)',
    builtBy: 'Swargadeo Rudra Singha (Crafted under Master Artisan Ghanashyam Khanikar)',
    yearBuilt: '1703 CE',
    whenBuiltDetails:
      'Constructed in 1703 CE (Saka 1625) during the infrastructure expansion of the capital city of Rangpur.',
    whoBuiltDetails:
      'Commissioned by Swargadeo Rudra Singha and executed by specialized stone-carvers (Silakutis) under the supervision of master architect Ghanashyam Khanikar.',
    whyBuilt:
      'Built to provide an all-weather military and royal thoroughfare across the swift, flood-prone Namdang River (a tributary of the Dikhow) along the western approach to the capital at Rangpur.',
    location: 'Over the Namdang River, NH-715, 8 km west of Sivasagar Town',
    distanceFromTown: '8 km west of Sivasagar town center',
    coordinates: [26.9587, 94.5772],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/namdang.jpg',
    gallery: [import.meta.env.BASE_URL + 'images/destinations/namdang.jpg'],
    imageCaption: 'The 1703 CE monolithic sandstone bridge spanning the Namdang River in Sivasagar district.',
    shortDescription:
      'Chiseled primarily from a single massive sandstone formation in 1703 CE, this 60-meter-long slightly humped stone bridge has carried traffic across the Namdang River for over three centuries.',
    historicalIntroduction:
      'Spanning the Namdang River along the historic royal road (now National Highway 715), the Namdang Stone Bridge (Namdang Silor Sako) is a masterpiece of pre-industrial civil engineering in Assam. Constructed in 1703 CE during the reign of Swargadeo Rudra Singha, it demonstrates the extraordinary skill of Ahom stone-masons and hydraulic engineers.',
    historicalBackground: [
      'Before the reign of Swargadeo Rudra Singha, bridges in the Brahmaputra Valley were commonly constructed of bamboo, timber, or brick piers that required frequent rebuilding after monsoon floods.',
      'In 1703 CE, Rudra Singha directed his master architect Ghanashyam and the guild of stone-cutters (Silakutis) to fashion a permanent stone bridge across the Namdang River.',
      'Rather than assembling small loose stones that could be swept away by river currents, the artisans shaped the main span from a massive solid sandstone outcrop transported from the nearby Naga hills, cutting arched water channels underneath to allow the river to pass freely.',
    ],
    architecturalDetails: {
      style: 'Slightly cambered (hump-backed) monolithic sandstone arch-and-culvert bridge',
      techniques:
        'Rock-cut culvert channels bored through solid sandstone, reinforced at the riverbanks with heavy dressed stone abutments bonded with organic Karpatia Churna lime mortar.',
      materials:
        'Quarried solid sandstone monoliths and dressed stone blocks bonded at the abutments with sticky-rice, duck-egg, and lime mortar.',
      dimensions: 'Length: ~60 meters (197 feet); Width: ~6.5 meters (21.3 feet); Thickness/Height: ~1.7 meters (5.5 feet)',
      keyFeatures: [
        'Slight parabolic camber along the deck that distributes vertical compressive loads into the riverbank abutments',
        'Cut-water channels underneath that allow monsoon currents to pass with minimal hydraulic resistance',
        'Low monolithic stone parapets carved along the outer edges of the span',
      ],
    },
    associatedEvents: [
      {
        year: '1703 CE',
        event: 'Completion of the Namdang Stone Bridge',
        details: 'Constructed under Swargadeo Rudra Singha as the western gateway bridge into the capital city of Rangpur.',
      },
      {
        year: '20th–21st Century',
        event: 'Three Centuries of Continuous Highway Service',
        details: 'For over 300 years, the bridge served directly as part of National Highway 37 (now NH-715) before modern bypass conservation measures were initiated.',
      },
    ],
    culturalSignificance:
      'The Namdang Stone Bridge stands as tangible proof of the durability of Ahom civil engineering, surviving three centuries of monsoon floods, major earthquakes, and modern vehicular loads.',
    interestingFacts: [
      'The bridge is only slightly curved like a bow, an intentional structural geometry that places the sandstone under compression whenever weight passes over it.',
      'Stone-carved reliefs and mason marks can still be seen along the underside and flanks of the bridge during the dry winter months when the water level is low.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore: Carved in a Single Night by Viswakarma',
        narrative:
          'Folk tales in the surrounding villages once claimed that such a massive single-stone bridge could only have been sculpted in a single night by divine intervention.',
        historicalAssessment:
          'Labelled as Local Folklore: Historical Buranjis clearly credit Swargadeo Rudra Singha’s artisan guilds and the architect Ghanashyam Khanikar with quarrying and carving the bridge in 1703 CE.',
      },
    ],
    thenAndNow: {
      historicalState:
        'Carried royal elephants, cavalry, palanquins, and artillery units entering Rangpur along the royal highway.',
      presentDayState:
        'Preserved as a historic engineering landmark along NH-715, studied by civil engineers and historians for its longevity.',
      conservationStatus: 'Historical Landmark documented by the Directorate of Archaeology, Assam & ASI.',
    },
    visitorInfo: {
      timings: 'Open 24 hours (Viewable from the roadside)',
      openingHours: 'Open 24 Hours',
      closingHours: 'Open 24 Hours',
      entryFee: {
        indian: 'Free',
        foreign: 'Free',
        camera: 'Free',
        verificationNote: 'Public highway landmark; no entry ticket required.',
      },
      bestTimeToVisit: 'November to March during daylight hours when the river level is low and the stone arches are clearly visible',
      idealDuration: '20 to 40 minutes',
      dressCode: 'Standard casual attire; exercise strict caution regarding highway traffic',
      facilities: 'Roadside pull-off only; no dedicated visitor center on-site (Please verify locally before visiting).',
      lastVerified: '2024 (Sivasagar District Administration)',
    },
    nearbyAttractions: [
      { name: 'Gaurisagar Tank & Temples', distance: '4 km', brief: '150-acre royal tank and temple triad built by Bar Raja Queen Phuleswari' },
      { name: 'Rang Ghar', distance: '7 km', brief: 'Royal sports pavilion at Rupahi Pathar' },
    ],
    travelTips: [
      'Always park well clear of the active roadway and view the bridge profile from the grassy embankment beside the river.',
      'Visit during winter low-water season to see the rock-cut arched channels beneath the roadway.',
    ],
    verifiedFact:
      'Built in 1703 CE under Swargadeo Rudra Singha, this 60-meter sandstone bridge carried main highway traffic across the Namdang River for more than 300 years.',
    sources: [
      {
        title: 'Sivasagar District Official Portal — Historical Monuments',
        institutionOrAuthor: 'Sivasagar District Administration, Government of Assam',
      },
      {
        title: 'A History of Assam',
        institutionOrAuthor: 'Sir Edward Albert Gait',
      },
    ],
    googleMapsQuery: 'Namdang+Stone+Bridge+Sivasagar',
  },
  {
    id: 'gaurisagar-tank',
    name: 'Gaurisagar Tank & Temples',
    assameseName: 'গৌৰীসাগৰ পুখুৰী আৰু দৌল',
    tagline: 'The 150-Acre Sacred Reservoir & Temple Triad of Bar Raja Queen Phuleswari',
    category: 'Sacred Lake',
    era: 'Ahom Dynasty (Reign of Swargadeo Siba Singha)',
    builtBy: 'Bar Raja Queen Phuleswari Konwari (Pramateswari)',
    yearBuilt: '1723–1724 CE',
    whenBuiltDetails:
      'Excavated and consecrated between 1723 and 1724 CE (Saka 1645) during the early reign of Swargadeo Siba Singha and Bar Raja Phuleswari.',
    whoBuiltDetails:
      'Commissioned by Queen Phuleswari (who assumed the title Pramateswari Devi and the sovereign rank of Bar Raja), first chief queen of Swargadeo Siba Singha.',
    whyBuilt:
      'Dedicated to Goddess Gauri (Durga/Parvati) following Queen Phuleswari’s elevation as Bar Raja and her royal patronage of Shakta worship.',
    location: 'Gaurisagar, along NH-715, 12 km west of Sivasagar Town',
    distanceFromTown: '12 km west of Sivasagar town center',
    coordinates: [26.9242, 94.5422],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/gaurisagar.jpg',
    gallery: [import.meta.env.BASE_URL + 'images/destinations/gaurisagar.jpg'],
    imageCaption: 'The 18th-century temple spires reflected in the tranquil waters of the 150-acre Gaurisagar Tank.',
    shortDescription:
      'A 150-acre royal reservoir flanked on its northern embankment by three monumental 18th-century temples—Devidol, Shivadol, and Vishnudol—commissioned by Bar Raja Queen Phuleswari.',
    historicalIntroduction:
      'Located 12 kilometers west of Sivasagar town, the Gaurisagar Tank and its triad of temples stand as an enduring monument to Queen Phuleswari, the first woman in Ahom history to exercise sovereign royal authority as "Bar Raja" (Chief King) and mint state coins jointly with the monarch.',
    historicalBackground: [
      'In 1722 CE, when astrologers foretold the end of Swargadeo Siba Singha’s rule (the Chhatra-bhanga yoga), the king transferred the royal umbrella and insignia of sovereignty to his chief queen, Phuleswari, declaring her Bar Raja.',
      'A devoted follower of Shaktism, Queen Phuleswari assumed the Sanskrit name Pramateswari ("Consort of Shiva") and commissioned the 150-acre Gaurisagar reservoir along with three grand temples on its northern bank—dedicated to Goddess Devi (Gauri), Lord Shiva, and Lord Vishnu.',
      'Her architectural layout directly inspired her sister and successor, Queen Ambika, who built the Sivasagar Borpukhuri and Sivadol complex a decade later in 1734 CE.',
    ],
    architecturalDetails: {
      style: 'Ahom-Nilachal temple architecture featuring Nagara-inspired curvilinear shikharas and arched mandapas',
      techniques:
        'Brick-and-stone composite masonry set upon a raised earthen embankment; exterior walls divided into vertical registers fitted with carved sandstone and terracotta relief panels.',
      materials:
        'Hand-moulded flat terracotta bricks, dressed sandstone plinths, and indigenous Karpatia Churna lime-rice mortar.',
      dimensions: 'Tank area (including embankments): ~150 acres; Central temple height: ~85–90 feet',
      keyFeatures: [
        'Three distinct shrines—Devidol, Shivadol, and Vishnudol—aligned along the wooded northern bank of the lake',
        'Intricate exterior relief carvings on Devidol depicting Mahishasuramardini, floral arabesques, and courtly figures',
        'Octagonal garbhagriha (sanctum) plans coupled with rectangular front prayer halls (mandapas)',
      ],
    },
    associatedEvents: [
      {
        year: '1722 CE',
        event: 'Coronation of Queen Phuleswari as Bar Raja',
        details: 'Queen Phuleswari becomes the first female sovereign (Bar Raja) of the Ahom Kingdom and strikes joint silver and gold coins.',
      },
      {
        year: '1723–1724 CE',
        event: 'Excavation of Gaurisagar & Construction of the Temple Triad',
        details: 'The 150-acre reservoir and the three temples of Devidol, Shivadol, and Vishnudol are consecrated.',
      },
    ],
    culturalSignificance:
      'Gaurisagar is a landmark in the political and religious history of Assam, documenting the unprecedented constitutional role of the Bar Raja queens in 18th-century Ahom governance.',
    interestingFacts: [
      'Coins minted by Bar Raja Phuleswari bore the inscription "Sri Sri Siva Singha Nrpa Mahisi Sri Phuleswari Devya" (Queen Phuleswari, Consort of King Siba Singha).',
      'Queen Phuleswari also established a Sanskrit tol (academy) at Gaurisagar to promote classical scholarship and manuscript illumination.',
    ],
    folkloreAndLegends: [
      {
        title: 'Folklore: From Temple Dancer to Supreme Sovereign',
        narrative:
          'Popular folk narratives recount that Phuleswari was originally a graceful temple dancer named Phulmati before catching the eye of King Siba Singha and rising to become Bar Raja.',
        historicalAssessment:
          'Labelled as Historical Context & Oral Tradition: Buranjis confirm her humble origins in a dramatic rise to become the most powerful queen of early 18th-century Assam.',
      },
    ],
    thenAndNow: {
      historicalState:
        'Served as the royal Shakta ceremonial complex and seasonal retreat west of the capital city of Rangpur.',
      presentDayState:
        'A peaceful lakeside heritage precinct protected by the Archaeological Survey of India, frequented by scholars, devotees, and migratory birds.',
      conservationStatus: 'Protected Monuments of National Importance under the Archaeological Survey of India (ASI).',
    },
    visitorInfo: {
      timings: '06:00 AM – 06:00 PM (Daily)',
      openingHours: '06:00 AM',
      closingHours: '06:00 PM',
      entryFee: {
        indian: 'Free entry',
        foreign: 'Free entry',
        camera: 'Free',
        verificationNote: 'Verified open access; please verify locally for festival timings during Durga Puja and Shivaratri.',
      },
      bestTimeToVisit: 'October to April; late afternoon offers calm reflections of the three spires across the water',
      idealDuration: '45 to 60 minutes',
      dressCode: 'Modest temple attire; remove shoes before entering temple sanctums',
      facilities: 'Lakeside pathways, open parking near the highway turnoff, and ASI heritage plaques (Please verify locally before visiting).',
      lastVerified: '2024 (ASI Guwahati Circle)',
    },
    nearbyAttractions: [
      { name: 'Namdang Stone Bridge', distance: '4 km', brief: '1703 CE monolithic sandstone bridge along NH-715' },
      { name: 'Rudrasagar Tank & Temple', distance: '5 km', brief: '18th-century tank and Shiva temple to the east' },
      { name: 'Sivasagar Sivadol', distance: '12 km', brief: '104-ft temple built by Phuleswari’s sister, Queen Ambika' },
    ],
    travelTips: [
      'Compare the sculptural niches of Gaurisagar Devidol with those of Sivasagar Sivadol to see how royal architecture evolved between 1723 and 1734 CE.',
      'Pair your visit with the Namdang Stone Bridge located just 4 km east along the same highway.',
    ],
    verifiedFact:
      'Bar Raja Queen Phuleswari was the first woman in Assamese history to have royal octagonal coins struck bearing her own name alongside the reigning monarch.',
    sources: [
      {
        title: 'ASI Monument Dossier: Gaurisagar Group of Temples (Devidol, Sivadol, Vishnudol)',
        institutionOrAuthor: 'Archaeological Survey of India, Guwahati Circle',
      },
      {
        title: 'Coinage and Economy of North Eastern States of India',
        institutionOrAuthor: 'Jai Prakash Singh & Nisar Ahmad (Numismatic Society of India)',
      },
      {
        title: 'Tungkhungia Buranji',
        institutionOrAuthor: 'S.K. Bhuyan',
      },
    ],
    googleMapsQuery: 'Gaurisagar+Tank+Temples+Sivasagar',
  },
  {
    id: 'tai-museum',
    name: 'Assam Tai Museum',
    assameseName: 'অসম টাই সংগ্ৰহালয়',
    tagline: 'Custodian of Tai-Ahom Buranji Manuscripts, Epigraphy & Royal Regalia',
    category: 'Museum & Culture',
    era: '13th to 19th Century Archival Collections (Museum Est. 1992 CE)',
    builtBy: 'Directorate of Museums, Government of Assam & Tai-Ahom Cultural Scholars',
    yearBuilt: '1992 CE',
    whenBuiltDetails:
      'Inaugurated in 1992 CE on the western embankment of the historic Sivasagar Tank (Borpukhuri) to preserve the material and literary heritage of the Tai-Ahom period.',
    whoBuiltDetails:
      'Established under the Directorate of Museums, Government of Assam, with contributions from local families and Tai-Ahom scholarly institutions.',
    whyBuilt:
      'Created to safeguard rare Sanchi-bark Buranji manuscripts, royal garments, weaponry, epigraphic inscriptions, and ethnographic artifacts of the Tai peoples of Assam.',
    location: 'Western Bank of Borpukhuri, Sivasagar Town',
    distanceFromTown: '0.5 km (Within central Sivasagar town)',
    coordinates: [26.9839, 94.6328],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg',
    gallery: [import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg'],
    imageCaption: 'The Assam Tai Museum on the western embankment of Borpukhuri, Sivasagar.',
    shortDescription:
      'A specialized historical museum on the bank of Borpukhuri preserving rare Sanchi-bark Buranji manuscripts, royal Hengdang swords, Muga silk court attire, and Tai-Ahom archaeological relics.',
    historicalIntroduction:
      'Overlooking the western waters of the Sivasagar Borpukhuri, the Assam Tai Museum provides essential historical context for understanding the monuments of Sivasagar. While the palaces and temples showcase Ahom masonry on a monumental scale, this museum preserves the delicate written chronicles, court textiles, numismatics, and ceremonial instruments that animated daily life in the Ahom kingdom.',
    historicalBackground: [
      'Unlike many pre-modern Indian polities, the Tai-Ahoms brought with them from Mong Mao a strict historiographical tradition: the compilation of Buranjis ("a storehouse of knowledge that teaches the ignorant"), written initially in the archaic Tai-Ahom script and later in Assamese.',
      'Founded in 1992 CE, the Assam Tai Museum gathered dispersed royal heirlooms, Sanchi-bark manuscripts, stone inscriptions, and ritual vessels from across Upper Assam into a dedicated public archive.',
      'The museum also documents the living cultural heritage of related Tai communities in Assam—including the Tai-Phake, Tai-Khamyang, Tai-Aiton, Tai-Turung, and Tai-Khamti peoples.',
    ],
    architecturalDetails: {
      style: 'Contemporary institutional museum building accented with traditional Tai-Ahom roof and gateway motifs',
      techniques:
        'Indoor exhibition galleries organized by theme: Epigraphy & Manuscripts, Royal Armoury, Textiles & Costumes, Numismatics, and Tai Ethnography.',
      materials:
        'Preserved organic artifacts on Sanchi bark (Aquilaria malaccensis), wrought iron and steel weaponry, bell-metal (Kanh) and brassware, carved wood, and terracotta.',
      keyFeatures: [
        'Original Sanchi-pat manuscripts inscribed with indelible herbal Mohi ink in the Tai-Ahom script',
        'Ceremonial and martial Hengdang (traditional single-edged Ahom sword with long hilt)',
        'Royal court garments woven in natural golden Muga silk and Eri silk',
        'Inscribed stone slabs, cannonballs (Kamanchila), and royal household utensils (Xorai, Bota, and Ban-bati)',
      ],
    },
    associatedEvents: [
      {
        year: '13th–19th Century CE',
        event: 'Compilation of the Royal Buranjis',
        details: 'Court scribes (Likhak Baruas) under the supervision of the Likhakar Barua systematically record state events, treaties, and genealogy.',
      },
      {
        year: '1992 CE',
        event: 'Establishment of the Assam Tai Museum',
        details: 'The museum opens on the western bank of Borpukhuri under the Government of Assam to conserve Tai-Ahom antiquities.',
      },
    ],
    culturalSignificance:
      'The Assam Tai Museum is a vital educational resource for students, epigraphists, and visitors seeking to understand the language, historiography, and material culture of the Ahom civilization.',
    interestingFacts: [
      'Sanchi-pat manuscripts were prepared by curing strips of Agarwood bark (Aquilaria malaccensis), rubbing them smooth with burnt brick, and coating them with yellow arsenic (Haital) to repel insects for centuries.',
      'The indelible black ink (Mohi) used in Buranjis was brewed from Silikha (Terminalia chebula), bull’s urine, iron sulfate, and soot, making the text resistant to water and humidity.',
    ],
    folkloreAndLegends: [
      {
        title: 'Tradition: The Sacred Sword of Sovereignty (Hengdang)',
        narrative:
          'According to Tai-Ahom royal tradition, the ancestral Hengdang sword was handed down from the heavenly deity Lengdon to Khunlung and Khunlai and carried by Sukaphaa across the Patkai mountains.',
        historicalAssessment:
          'Labelled as Royal Tradition & Ceremonial Lore: In Ahom coronation rituals (Singarigharutha), holding the ancestral Hengdang was a mandatory constitutional symbol of legitimate kingship.',
      },
    ],
    thenAndNow: {
      historicalState:
        'Historically, royal manuscripts were stored in the Gandhia Bharal (Royal Archive and Treasury) within the palace complex under the charge of the Gandhia Barua.',
      presentDayState:
        'Curated inside the Assam Tai Museum on the western bank of Borpukhuri for public study and preservation.',
      conservationStatus: 'State Museum under the Directorate of Museums, Cultural Affairs Department, Government of Assam.',
    },
    visitorInfo: {
      timings: '10:00 AM – 04:30 PM (Closed on Mondays, 2nd & 4th Saturdays, and Government Holidays)',
      openingHours: '10:00 AM',
      closingHours: '04:30 PM',
      entryFee: {
        indian: 'Nominal state museum ticket (Approx. ₹10–₹20 for adults; concessions for students)',
        foreign: 'Approx. ₹50–₹100',
        camera: 'Subject to museum curator permission (Flash photography of manuscripts is prohibited)',
        verificationNote: 'Please verify locally before visiting — museum hours and holiday closures follow Government of Assam schedules.',
      },
      bestTimeToVisit: 'Year-round on open weekdays between 10:30 AM and 04:00 PM',
      idealDuration: '45 to 75 minutes',
      dressCode: 'Respectful casual attire',
      facilities: 'Exhibition halls, curator office, and lakeside walkway outside (Please verify locally before visiting).',
      lastVerified: '2024 (Directorate of Museums, Government of Assam)',
    },
    nearbyAttractions: [
      { name: 'Sivadol, Vishnudol & Devidol', distance: '600 meters', brief: 'Walk along the Borpukhuri embankment to the 1734 CE temple triad' },
      { name: 'Borpukhuri Historic Tank', distance: 'Adjacent', brief: '129-acre elevated royal water reservoir' },
    ],
    travelTips: [
      'Visit the Assam Tai Museum before exploring the palaces at Rangpur and Garhgaon so you can visualize the weapons, garments, and manuscripts that once filled those halls.',
      'Note that the museum is closed on Mondays and government holidays.',
    ],
    verifiedFact:
      'The Tai-Ahom Buranjis preserved in Assam represent one of the rare continuous secular prose chronicle traditions in pre-modern South and Southeast Asia.',
    sources: [
      {
        title: 'Directorate of Museums — District & Sub-Divisional Museums of Assam',
        institutionOrAuthor: 'Cultural Affairs Department, Government of Assam',
      },
      {
        title: 'Studies in the Literature of Assam',
        institutionOrAuthor: 'Dr. Surya Kumar Bhuyan',
      },
      {
        title: 'IGNCA Manuscript & Cultural Archives on Sanchi-Pat',
        institutionOrAuthor: 'Indira Gandhi National Centre for the Arts (IGNCA)',
      },
    ],
    googleMapsQuery: 'Assam+Tai+Museum+Sivasagar',
  },
  {
    id: 'panidehing-bird-sanctuary',
    name: 'Panidehing Bird Sanctuary',
    assameseName: 'পানীদিহিং পক্ষী অভয়াৰণ্য',
    tagline: 'The Alluvial Floodplain Wetland Between the Brahmaputra and Disang Rivers',
    category: 'Wildlife & Nature',
    era: 'Natural Floodplain Ecosystem (Notified as Wildlife Sanctuary in 1996 CE)',
    builtBy: 'Natural Riverine Landscape (Protected by Assam Forest Department)',
    yearBuilt: 'Notified August 1996 CE',
    whenBuiltDetails:
      'Formed over millennia by the shifting alluvial channels and oxbow wetlands (beels) between the Brahmaputra and Disang rivers; officially notified as a Bird Sanctuary by the Government of Assam in August 1996.',
    whoBuiltDetails:
      'Conserved by the Department of Environment and Forests, Government of Assam, with active participation from surrounding Mising and Assamese riverine communities.',
    whyBuilt:
      'Protected to conserve 33.93 square kilometers of critical floodplain wetlands, shallow beels, and wet grasslands that support over 165 species of resident and trans-Himalayan migratory birds.',
    location: 'Northern Sivasagar District, between the Disang and Demow/Brahmaputra rivers',
    distanceFromTown: '22 km north-west of Sivasagar town center',
    coordinates: [27.1120, 94.5680],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg',
    gallery: [import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg'],
    imageCaption: 'Migratory and resident waterfowl across the alluvial wetlands and beels of Panidehing Bird Sanctuary.',
    shortDescription:
      'A 33.93-sq-km riverine wetland ecosystem between the Brahmaputra and Disang rivers, preserving the natural floodplain ecology that sustained Upper Assam for centuries.',
    historicalIntroduction:
      'To understand why the Ahom civilization flourished in Sivasagar, one must understand the riverine geography of the Brahmaputra Valley. Located 22 kilometers northwest of Sivasagar town at the confluence zone of the Brahmaputra, Disang, and Demow rivers, Panidehing Bird Sanctuary preserves the primeval alluvial wetlands (beels) that shaped Assam’s ecology, wet-rice agriculture, and river transport.',
    historicalBackground: [
      'Throughout the Ahom era, the floodplains bordering the Brahmaputra and Disang rivers served as natural buffers, seasonal fisheries, elephant-catching grounds (Hati-mahals), and naval waterways connecting Rangpur to the main channel of the Brahmaputra.',
      'Recognizing its extraordinary avian biodiversity and vulnerability to encroachment, the Government of Assam officially notified the 33.93-square-kilometer wetland complex as the Panidehing Wildlife (Bird) Sanctuary in August 1996.',
      'Today, the sanctuary’s network of perennial water bodies—including Ghorajan,abonori, and Kandulimari beels—provides winter refuge to thousands of migratory waterfowl arriving across the Himalayas from Central Asia, Tibet, and Siberia.',
    ],
    architecturalDetails: {
      style: 'Alluvial riverine floodplain, oxbow marshes (beels), and wet savanna grassland ecosystem',
      techniques:
        'Seasonal hydrological cycle driven by summer monsoon inundation from the Brahmaputra and Disang rivers, leaving nutrient-rich silt and shallow winter marshes.',
      materials:
        'Alluvial clay and silt, aquatic flora (water hyacinth, wild lotus, reeds, and elephant grass), and riparian woodland.',
      dimensions: 'Notified sanctuary area: 33.93 sq km (approx. 3,393 hectares)',
      keyFeatures: [
        'Over 165 recorded avian species, including Bar-headed Geese, Greylag Geese, Ferruginous Pochards, and Northern Pintails',
        'Important foraging habitat for globally threatened species such as the Greater Adjutant Stork (Hargila), Lesser Adjutant, and Spot-billed Pelican',
        'Adjacent riverine villages showcasing traditional Mising stilt architecture (Chang-ghar) adapted to seasonal floods',
      ],
    },
    associatedEvents: [
      {
        year: 'Ahom Era (13th–19th Century)',
        event: 'Riverine Corridor of the Disang & Brahmaputra',
        details: 'The Disangmukh and Panidehing floodplains form the northern riverine frontier of the Sivasagar royal heartland.',
      },
      {
        year: 'August 1996 CE',
        event: 'Official Notification as a Wildlife Sanctuary',
        details: 'The Government of Assam declares 33.93 sq km of the Panidehing wetlands a protected Bird Sanctuary.',
      },
    ],
    culturalSignificance:
      'Panidehing illustrates the ecological foundation of Sivasagar: the harmony between riverine wetlands, seasonal bird migrations, and the traditional Chang-ghar (stilt-house) lifestyle of Upper Assam’s indigenous communities.',
    interestingFacts: [
      'Panidehing is recognized by BirdLife International and the Bombay Natural History Society (BNHS) as an Important Bird and Biodiversity Area (IBA) in Assam.',
      'The nearby Mising communities build raised bamboo-and-timber homes (Chang-ghars) elevated on stilts specifically to live in harmony with the annual monsoon rise of the Brahmaputra and Disang rivers.',
    ],
    folkloreAndLegends: [
      {
        title: 'Oral Tradition: The Shifting Course of the Dihing and Disang',
        narrative:
          'Local riverine elders recount that the name "Pani-Dehing" recalls an ancient epoch when a channel of the Burhi Dihing river flowed through these wetlands before shifting its course northward.',
        historicalAssessment:
          'Labelled as Geomorphological & Oral History: Historical hydrography confirms that the tributaries of Upper Assam have shifted channels multiple times following major seismic and flood events.',
      },
    ],
    thenAndNow: {
      historicalState:
        'An untamed floodplain marshland teeming with wild waterfowl, river dolphins, and alluvial grasslands bordering the royal territories of Rangpur.',
      presentDayState:
        'A protected 33.93-sq-km Bird Sanctuary and Important Bird Area (IBA) managed by the Assam Forest Department.',
      conservationStatus: 'Protected Wildlife Sanctuary under the Department of Environment and Forests, Government of Assam.',
    },
    visitorInfo: {
      timings: '06:00 AM – 04:00 PM (Daylight hours; subject to Assam Forest Department range office permission)',
      openingHours: '06:00 AM',
      closingHours: '04:00 PM',
      entryFee: {
        indian: 'Subject to Assam Forest Department range tariff (Please verify locally before visiting)',
        foreign: 'Subject to Assam Forest Department range tariff',
        camera: 'Still and telephoto camera fees regulated by Forest Range Office',
        verificationNote: 'Please verify locally before visiting — entry rules and seasonal access depend on water levels and Forest Department regulations.',
      },
      bestTimeToVisit: 'November to February (Dry winter season when migratory birds congregate and dirt tracks are passable)',
      idealDuration: '3 to 4 hours (Early morning visit starting around 06:30 AM is essential for bird observation)',
      dressCode: 'Muted earth-toned outdoor clothing, walking boots, and sun protection',
      facilities: 'Basic forest beat checkpost and observation watchtowers; visitors should carry their own drinking water (Please verify locally before visiting).',
      lastVerified: '2024 (Assam Forest Department & Sivasagar District Administration)',
    },
    nearbyAttractions: [
      { name: 'Disangmukh River Confluence', distance: '10 km', brief: 'Scenic confluence of the Disang and Brahmaputra rivers with Mising villages' },
      { name: 'Sivasagar Town & Borpukhuri', distance: '22 km', brief: 'Historic town center and 1734 CE temple complex' },
    ],
    travelTips: [
      'Maintain strict silence and avoid bright clothing when observing migratory flocks along the beel margins.',
      'Check road and track conditions locally before traveling, as monsoon floods submerge access trails between May and September.',
    ],
    verifiedFact:
      'Designated as an Important Bird and Biodiversity Area (IBA Site Code IN-AS-34), Panidehing supports over 165 recorded bird species across 33.93 square kilometers of alluvial wetlands.',
    sources: [
      {
        title: 'Important Bird Areas in India — Assam: Panidehing Bird Sanctuary',
        institutionOrAuthor: 'Bombay Natural History Society (BNHS) & BirdLife International',
      },
      {
        title: 'Protected Areas of Assam: Wildlife Sanctuaries',
        institutionOrAuthor: 'Department of Environment and Forests, Government of Assam',
      },
    ],
    googleMapsQuery: 'Panidihing+Bird+Sanctuary+Sivasagar',
  },
];


export interface AhomHistoryChapter {
  id: string;
  era: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  keyRulers: string[];
  keyTakeaway: string;
}

export const AHOM_HISTORY_CHAPTERS: AhomHistoryChapter[] = [
  {
    id: 'origin-sukaphaa',
    era: '1228–1268 CE',
    title: 'Origin of the Kingdom & Arrival of Chaolung Sukaphaa',
    subtitle: 'From Mong Mao Across the Patkai to Charaideo',
    paragraphs: [
      'The Ahom Kingdom (1228–1826 CE) originated when the Tai prince Chaolung Sukaphaa departed his ancestral homeland of Mong Mao (in the Dehong region of present-day Yunnan/Upper Myanmar boundary) in 1215 CE with a small retinue of nobles, priests (Deodhais and Bailungs), soldiers, elephants, and horses.',
      'After a thirteen-year journey across the rugged Patkai mountain range, Sukaphaa entered the upper Brahmaputra Valley in 1228 CE. Rather than subjugating the existing Moran and Borahi communities by brute force, he pursued a policy of kinship, intermarriage, and agricultural cooperation, laying the foundations of a shared Assamese identity.',
      'After testing several riverine settlements plagued by seasonal floods, Sukaphaa established his first permanent capital in 1253 CE at Charaideo (Che-Tam-Doi, "the shining city on the hills") in present-day Sivasagar/Charaideo district.',
    ],
    keyRulers: ['Chaolung Sukaphaa (r. 1228–1268 CE)', 'Suteuphaa (r. 1268–1281 CE)'],
    keyTakeaway:
      'Charaideo became the permanent spiritual sanctuary and royal necropolis of the dynasty for the next six hundred years.',
  },
  {
    id: 'consolidation-garhgaon',
    era: '1397–1681 CE',
    title: 'State Formation, Garhgaon & the Mughal Wars',
    subtitle: 'Expansion of the Ahom State, the Paik System & Saraighat',
    paragraphs: [
      'Between the late 14th and 16th centuries, monarchs such as Swargadeo Sudangphaa (Bamuni Konwar) and Swargadeo Suhungmung (Dihingia Raja, r. 1497–1539 CE) expanded Ahom territory westward, integrated the Chutia and Kachari realms, introduced the Saka calendar alongside the Tai Lak-ni cycle, and initiated the writing of Buranjis in the Assamese language.',
      'In 1540 CE, Swargadeo Suklengmung established the fortified imperial capital at Garhgaon along the Dikhow River in Sivasagar. Under Swargadeo Pratap Singha (r. 1603–1641 CE) and chief administrator Momai Tamuli Borbarua, the adult male population was organized into the Paik and Khel system—a non-feudal civic and military service structure that mobilized labor for embankments, roads, and defense.',
      'Tested repeatedly by imperial Mughal expeditions—including Mir Jumla’s occupation of Garhgaon in 1662 CE—Ahom sovereignty was decisively defended at the naval Battle of Saraighat (1671 CE) under Commander-in-Chief Lachit Borphukan and finally secured at the Battle of Itakhuli (1682 CE) under Swargadeo Gadadhar Singha.',
    ],
    keyRulers: [
      'Swargadeo Suhungmung (r. 1497–1539 CE)',
      'Swargadeo Suklengmung (r. 1540–1552 CE)',
      'Swargadeo Pratap Singha (r. 1603–1641 CE)',
      'Swargadeo Udayaditya Singha & Lachit Borphukan (1671 CE)',
      'Swargadeo Gadadhar Singha (r. 1681–1696 CE)',
    ],
    keyTakeaway:
      'Garhgaon in Sivasagar district served as the political nerve center from which the Ahom state administered the valley and resisted seventeen Mughal campaigns.',
  },
  {
    id: 'rangpur-golden-age',
    era: '1696–1769 CE',
    title: 'Rangpur (Sivasagar) as the Imperial & Architectural Metropolis',
    subtitle: 'The Tungkhungia Renaissance under Rudra Singha & the Bar Raja Queens',
    paragraphs: [
      'With external frontiers secure after 1682 CE, the Tungkhungia line of monarchs transformed the Sivasagar plains into a monumental landscape of brick palaces, soaring temples, stone bridges, and vast man-made reservoirs.',
      'In 1697–1698 CE, Swargadeo Rudra Singha excavated the 318-acre Joysagar Tank in memory of his mother Sati Joymoti and established the ceremonial capital of Rangpur ("The City of Joy" — modern Sivasagar). He invited master artisan Ghanashyam Khanikar to oversee brick-and-terracotta architecture and built the monolithic Namdang Stone Bridge in 1703 CE.',
      'Under Swargadeo Siba Singha (r. 1714–1744 CE), his sovereign queens—Bar Raja Phuleswari and Bar Raja Ambika—excavated the Gaurisagar (1723 CE) and Sivasagar Borpukhuri (1733–1734 CE) tanks, crowning the latter with the 104-foot Sivadol. Swargadeo Pramatta Singha subsequently erected the brick Rang Ghar (1744–1750 CE), while Swargadeo Rajeswar Singha completed the multi-tiered brick Kareng Ghar (1752 CE) and Talatal Ghar (1751–1769 CE).',
    ],
    keyRulers: [
      'Swargadeo Rudra Singha (r. 1696–1714 CE)',
      'Swargadeo Siba Singha (r. 1714–1744 CE)',
      'Bar Raja Queen Phuleswari & Bar Raja Queen Ambika',
      'Swargadeo Pramatta Singha (r. 1744–1751 CE)',
      'Swargadeo Rajeswar Singha (r. 1751–1769 CE)',
    ],
    keyTakeaway:
      'Almost all of Sivasagar’s surviving masonry monuments were constructed within a seventy-year architectural flowering between 1697 and 1769 CE.',
  },
  {
    id: 'later-period-legacy',
    era: '1769–1826 CE & Present',
    title: 'The Later Period & Enduring Historical Legacy',
    subtitle: 'Internal Upheavals, Capital Shift & Modern Preservation',
    paragraphs: [
      'Beginning in 1769 CE, the Moamoria Rebellion—an agrarian and sectarian uprising—shook the administrative foundations of Rangpur. Prolonged instability led Swargadeo Gaurinath Singha to shift the royal capital westward from Rangpur (Sivasagar) to Jorhat in 1794 CE.',
      'Subsequent court factionalism invited three devastating Burmese invasions between 1817 and 1824 CE (remembered in Assamese history as Manor Din), which ended with the Anglo-Burmese War and the Treaty of Yandabo on 24 February 1826, bringing six centuries of Ahom rule to a close.',
      'Despite earthquakes and political transitions, the monuments of Sivasagar and Charaideo endured. Today, protected by the Archaeological Survey of India, the Government of Assam, and UNESCO (2024), Sivasagar stands as an open-air historical archive of the Tai-Ahom civilization.',
    ],
    keyRulers: [
      'Swargadeo Lakshmi Singha (r. 1769–1780 CE)',
      'Swargadeo Gaurinath Singha (r. 1780–1795 CE)',
      'Swargadeo Kamaleswar Singha & Purnananda Burhagohain',
      'Swargadeo Purandar Singha',
    ],
    keyTakeaway:
      'Though the capital shifted in 1794 CE, Sivasagar remains the richest concentration of pre-colonial royal architecture and hydraulic engineering in Northeast India.',
  },
];

export interface AhomHeritageMilestone {
  year: string;
  title: string;
  swargadeo: string;
  description: string;
  significance: string;
  image: string;
}

export const AHOM_TIMELINE: AhomHeritageMilestone[] = [
  {
    year: '1228–1253 CE',
    title: 'Arrival of Sukaphaa & Foundation of Charaideo',
    swargadeo: 'Chaolung Sukaphaa',
    description:
      'Crossing the Patkai mountains from Mong Mao, Prince Sukaphaa enters the Brahmaputra Valley in 1228 CE and establishes the first permanent capital of the Ahom kingdom at Charaideo (Che-Tam-Doi) in 1253 CE.',
    significance:
      'Marks the beginning of nearly 600 years of continuous Ahom sovereignty and the sacred royal burial tradition at Charaideo.',
    image: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
  },
  {
    year: '1497–1539 CE',
    title: 'Expansion of the Realm & First Assamese Buranjis',
    swargadeo: 'Swargadeo Suhungmung (Dihingia Raja)',
    description:
      'Swargadeo Suhungmung extends the kingdom across Upper Assam, creates the third great ministerial office (Borpatragohain), adopts the Hindu title Swarganarayan, and commissions the earliest Buranji chronicles in the Assamese language.',
    significance:
      'Consolidates diverse ethnic communities into a unified state and expands the historiographical tradition.',
    image: import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg',
  },
  {
    year: '1540 CE',
    title: 'Establishment of Imperial Garhgaon Capital',
    swargadeo: 'Swargadeo Suklengmung (Gargayan Raja)',
    description:
      'The royal capital is transferred to Garhgaon on the banks of the Dikhow River. The monarch constructs concentric earthen ramparts (Garh), excavates the Garhgaon Tank, and mints the first Ahom coins.',
    significance:
      'Establishes Garhgaon in Sivasagar district as the fortified seat of Ahom emperors for over 150 years.',
    image: import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
  },
  {
    year: '1662–1671 CE',
    title: 'Mughal Expedition to Garhgaon & Battle of Saraighat',
    swargadeo: 'Swargadeo Chakradhwaj Singha, Udayaditya Singha & Lachit Borphukan',
    description:
      'After Mir Jumla’s brief occupation of Garhgaon in 1662 CE, the Ahom forces reorganize under Swargadeo Chakradhwaj Singha and Commander-in-Chief Lachit Borphukan, culminating in the decisive naval victory over the Mughal fleet at Saraighat in 1671 CE.',
    significance:
      'Preserves the political independence of Assam and prevents Mughal annexation of the Brahmaputra Valley.',
    image: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
  },
  {
    year: '1680–1681 CE',
    title: 'Sacrifice of Sati Joymoti & Accession of Gadadhar Singha',
    swargadeo: 'Swargadeo Gadadhar Singha (Supatphaa) & Sati Joymoti',
    description:
      'Princess Joymoti endures martyrdom at Jerenga Pathar to protect her exiled husband Gadapani. In 1681 CE, Gadapani ascends the throne as Swargadeo Gadadhar Singha, restoring stability and initiating the Tungkhungia royal line.',
    significance:
      'Ushers in the era of internal peace and prosperity that made Sivasagar’s monumental architecture possible.',
    image: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
  },
  {
    year: '1697–1703 CE',
    title: 'Foundation of Rangpur, Joysagar & Namdang Bridge',
    swargadeo: 'Swargadeo Rudra Singha (Sukhrungphaa)',
    description:
      'Swargadeo Rudra Singha excavates the 318-acre Joysagar Tank (1697 CE) at Jerenga Pathar, builds the Joydol temple (1698 CE), founds the new capital city of Rangpur, and constructs the monolithic Namdang Stone Bridge (1703 CE).',
    significance:
      'Transforms Rangpur (modern Sivasagar) into the cultural and architectural metropolis of Northeast India.',
    image: import.meta.env.BASE_URL + 'images/destinations/namdang.jpg',
  },
  {
    year: '1723–1734 CE',
    title: 'Era of the Bar Raja Queens: Gaurisagar & Sivasagar Sivadol',
    swargadeo: 'Swargadeo Siba Singha, Bar Raja Phuleswari & Bar Raja Ambika',
    description:
      'Crowned successively as sovereign Bar Rajas, Queen Phuleswari commissions the 150-acre Gaurisagar Tank and temples (1723–1724 CE), while her sister Queen Ambika excavates the 129-acre Borpukhuri and constructs the 104-foot Sivadol (1733–1734 CE).',
    significance:
      'Gives Sivasagar town its modern name and skyline while marking a unique era of female royal patronage.',
    image: import.meta.env.BASE_URL + 'images/destinations/sivadol.JPG',
  },
  {
    year: '1744–1769 CE',
    title: 'Brick Reconstruction of Rang Ghar, Kareng Ghar & Talatal Ghar',
    swargadeo: 'Swargadeo Pramatta Singha & Swargadeo Rajeswar Singha',
    description:
      'Swargadeo Pramatta Singha constructs the two-storeyed brick Rang Ghar amphitheatre (1744–1750 CE), followed by Swargadeo Rajeswar Singha’s monumental brick reconstructions of Kareng Ghar at Garhgaon (1752 CE) and the seven-tiered Talatal Ghar at Rangpur (1751–1769 CE).',
    significance:
      'Represents the zenith of Ahom secular brick masonry and indigenous Karpatia Churna engineering.',
    image: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
  },
  {
    year: '1794–1826 CE',
    title: 'Capital Shift to Jorhat & the Treaty of Yandabo',
    swargadeo: 'Swargadeo Gaurinath Singha & Later Monarchs',
    description:
      'Following the Moamoria uprisings, the royal capital is moved from Rangpur to Jorhat in 1794 CE. Subsequent Burmese invasions lead to British intervention and the Treaty of Yandabo in February 1826.',
    significance:
      'Concludes the 598-year sovereign rule of the Ahom dynasty, leaving Sivasagar’s monuments as enduring historical witnesses.',
    image: import.meta.env.BASE_URL + 'images/destinations/gaurisagar.jpg',
  },
  {
    year: 'July 2024 CE',
    title: 'UNESCO World Heritage Inscription of Charaideo Moidams',
    swargadeo: 'Enduring Legacy of the Ahom Civilization',
    description:
      'At the 46th World Heritage Committee session, UNESCO inscribes "Moidams – the Mound-Burial System of the Ahom Dynasty" at Charaideo onto the World Heritage List under cultural criteria (iii) and (iv).',
    significance:
      'Secures global recognition for the royal funerary architecture and historical heritage of Sivasagar and Charaideo.',
    image: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
  },
];

export interface HistoricalDiscoveryItem {
  id: string;
  category: 'Material Science' | 'Hydraulic Engineering' | 'Epigraphy & Archives' | 'Archaeology' | 'Fact vs. Folklore';
  verificationStatus: 'Verified Archaeological / Historical Fact' | 'Comparative Fact vs. Folklore Analysis';
  title: string;
  subtitle: string;
  summary: string;
  detailedExplanation: string[];
  technicalSpecs: { label: string; value: string }[];
  sourceAttribution: string;
}

export const HISTORICAL_DISCOVERIES: HistoricalDiscoveryItem[] = [
  {
    id: 'karpatia-churna-mortar',
    category: 'Material Science',
    verificationStatus: 'Verified Archaeological / Historical Fact',
    title: 'The Chemistry of Karpatia Churna (Indigenous Organic Mortar)',
    subtitle: 'How Glutinous Rice, Duck Eggs & Snail Lime Resisted Magnitude 8.6 Earthquakes',
    summary:
      'Ahom structures in Sivasagar were built without Portland cement or iron clamps. Instead, royal engineers under the Changrung Phukan compounded a bio-polymer lime mortar capable of absorbing severe seismic shear.',
    detailedExplanation: [
      'Historical records in the Changrung Phukanar Buranji and chemical analyses conducted by conservation scientists show that Ahom mortar (Karpatia Churna) combined slaked lime burnt from river snail shells (Samuk chuna) and limestone (Sil chuna) with finely crushed brick dust (Surkhi) for pozzolanic strength.',
      'To this mineral base, masons added an organic emulsion of boiled Bora Saul (indigenous glutinous rice rich in amylopectin), black gram paste (Mati mah), duck egg whites (albumen), Bael fruit mucilage (Aegle marmelos), jaggery (Gur), and resinous oils.',
      'The amylopectin starch from Bora rice and albumen proteins from duck eggs controlled the crystallization of calcium carbonate during curing, creating a micro-elastic matrix that allowed monuments like Rang Ghar and Sivadol to survive the Great Assam Earthquakes of 1897 and 1950.',
    ],
    technicalSpecs: [
      { label: 'Primary Mineral Binder', value: 'Snail-shell lime (Samuk chuna) & Surkhi brick dust' },
      { label: 'Organic Biopolymers', value: 'Bora Saul (amylopectin starch), Mati Mah & Duck Egg Albumen' },
      { label: 'Brick Type', value: 'Doiya Itaa — thin, wide kiln-baked terracotta bricks fired with Nahor wood' },
    ],
    sourceAttribution: 'Changrung Phukanar Buranji (DHAS Assam) & ASI Conservation Studies',
  },
  {
    id: 'pukhuri-hydrology',
    category: 'Hydraulic Engineering',
    verificationStatus: 'Verified Archaeological / Historical Fact',
    title: 'Artesian Hydrology of the Elevated Royal Tanks (Pukhuris)',
    subtitle: 'Why Sivasagar’s Giant Lakes Never Dry Up or Stagnate',
    summary:
      'Reservoirs such as Joysagar (318 acres), Gaurisagar (150 acres), and Borpukhuri (129 acres) were not filled by river canals; they were engineered over natural artesian groundwater veins so their water levels remain above street level year-round.',
    detailedExplanation: [
      'Before excavating a royal tank (Sagar / Pukhuri), Ahom hydrologists (Pani-pariksha specialists) tested soil moisture and nocturnal condensation using earthen lamps and upside-down brass bowls to locate pressurized subterranean aquifers (Nadi-mukh).',
      'Once the spring head was exposed, workers drove a massive hollowed wooden shaft (Nag-mari) carved from rot-resistant Sal timber into the aquifer and lined the tank bed with layers of charcoal and sand for natural filtration.',
      'The excavated earth was compacted into high perimeter embankments (Par) flanked by an outer drainage canal (Jamuna) that carried away surface runoff while maintaining hydrostatic pressure inside the main basin.',
    ],
    technicalSpecs: [
      { label: 'Axial Orientation', value: 'Elongated North–South axis along natural groundwater flow' },
      { label: 'Central Spring Conduit', value: 'Seasoned Sal-wood Nag-mari pillar driven over artesian vein' },
      { label: 'Seepage Control', value: 'Dual embankments (Par) separated by a perimeter drainage ditch (Jamuna)' },
    ],
    sourceAttribution: 'Sivasagar District Gazetteer & Historical Hydrological Surveys of Upper Assam',
  },
  {
    id: 'buranji-sanchi-pat',
    category: 'Epigraphy & Archives',
    verificationStatus: 'Verified Archaeological / Historical Fact',
    title: 'Sanchi-Pat Manuscripts, Mohi Ink & Octagonal Coinage',
    subtitle: 'Archival Science and Numismatics of the Ahom Court',
    summary:
      'The Ahom state maintained systematic secular historical chronicles (Buranjis) on cured Agarwood bark and minted distinctive octagonal gold and silver coins reflecting the traditional eight-sided geography of Assam.',
    detailedExplanation: [
      'Folios of Sanchi-pat were prepared from the bark of the Sanchi tree (Aquilaria malaccensis). Strips were soaked, scraped smooth, dried in the dew, rubbed with para-grass and burnt brick, and treated with yellow arsenic sulfide (Haital) to prevent fungal or insect decay.',
      'Court scribes wrote with bamboo or fern pens dipped in Mohi—a permanent ink fermented from Silikha (Terminalia chebula) bark, iron sulfate, soot, and cattle urine, which bonded chemically into the bark fibers without fading over centuries.',
      'In numismatics, beginning in the 17th century, Ahom monarchs struck octagonal silver and gold coins (representing the eight-cornered realm of Saumarpeeth) inscribed in Tai-Ahom, Sanskrit (in Assamese script), and occasionally Persian.',
    ],
    technicalSpecs: [
      { label: 'Manuscript Substrate', value: 'Cured Sanchi bark (Aquilaria malaccensis) treated with Haital' },
      { label: 'Indelible Ink (Mohi)', value: 'Silikha (Myrobalan), iron oxide, soot & natural mordants' },
      { label: 'Coin Geometry', value: 'Octagonal planchet symbolizing the eight-sided boundary of Assam' },
    ],
    sourceAttribution: 'Assam Tai Museum Archives, IGNCA & Numismatic Society of India',
  },
  {
    id: 'charaideo-maidam-excavation',
    category: 'Archaeology',
    verificationStatus: 'Verified Archaeological / Historical Fact',
    title: 'Excavation of Maidam No. 2 at Charaideo (2000–2002)',
    subtitle: 'Scientific Verification of the Changrung Phukan’s Engineering Manual',
    summary:
      'When the Archaeological Survey of India excavated Maidam No. 2 at Charaideo between 2000 and 2002, the physical subterranean vault matched the 18th-century engineering descriptions in the Changrung Phukanar Buranji.',
    detailedExplanation: [
      'Archaeologists uncovered a massive domical brick-and-stone subterranean vault (Kharu-ghar) with an arched entrance on the western side, sealed with bricks after the royal interment.',
      'Surrounding the earthen mound was an octagonal brick boundary wall (Garh) pierced by a ceremonial western gateway. Although the tomb had been partially disturbed by treasure-seekers in past centuries, excavators recovered ivory buttons, gold pendants, wooden coffin fragments, cowrie shells, and skeletal remains.',
      'This archaeological correlation between written Buranji texts and excavated stratigraphy played a central role in UNESCO’s decision to inscribe Charaideo on the World Heritage List in July 2024.',
    ],
    technicalSpecs: [
      { label: 'Excavated Site', value: 'Maidam No. 2, Charaideo (ASI Guwahati Circle, 2000–2002)' },
      { label: 'Structural Layers', value: 'Brick-and-stone vault, boulder/clay mantle, and octagonal wall' },
      { label: 'Recovered Artifacts', value: 'Ivory buttons, gold floral ornaments, Rungdang wood fragments & ceramics' },
    ],
    sourceAttribution: 'ASI Excavation Report & UNESCO World Heritage Nomination Dossier (2024)',
  },
  {
    id: 'fact-vs-folklore-tunnels',
    category: 'Fact vs. Folklore',
    verificationStatus: 'Comparative Fact vs. Folklore Analysis',
    title: 'Distinguishing Fact from Folklore: Tunnels, Tanks & Monuments',
    subtitle: 'Separating Verified Archaeological Evidence from Oral Tradition',
    summary:
      'Like many ancient royal capitals, Sivasagar is rich in both documented history and imaginative oral lore. Historians and archaeologists carefully distinguish between the two.',
    detailedExplanation: [
      'ESTABLISHED FACT: Talatal Ghar possesses three subterranean masonry levels (cellars/vaults) beneath its main plinth used for storage, security, and cooling, and geophysical surveys confirm buried foundation structures across the complex.',
      'LOCAL FOLKLORE: The popular claim that a continuous 16-kilometer brick tunnel ran underground from Talatal Ghar to Kareng Ghar in Garhgaon (crossing beneath the Dikhow River and high alluvial water tables) remains unverified by archaeological excavation and is classified by historians as local folklore.',
      'ESTABLISHED FACT: Joysagar and Borpukhuri were scientifically sited over natural artesian springs (Nadi-mukh). LOCAL FOLKLORE: Stories of golden boats or supernatural guardians at the bottom of the tanks belong to rich regional oral tradition rather than historical record.',
    ],
    technicalSpecs: [
      { label: 'Subterranean Cellars at Talatal Ghar', value: 'Verified Architectural Fact (ASI Documented)' },
      { label: '16-km Underground Tunnel to Garhgaon', value: 'Unverified Oral Folklore (Not confirmed by GPR/ASI)' },
      { label: 'Boranji Construction Records', value: 'Primary Historical Source (Changrung Phukanar Buranji)' },
    ],
    sourceAttribution: 'Archaeological Survey of India (ASI) & Department of Historical and Antiquarian Studies (DHAS), Assam',
  },
];

export interface ExperienceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  highlights: string[];
  description: string;
}

export const EXPERIENCES: ExperienceCategory[] = [
  {
    id: 'heritage-trail',
    title: 'Ahom Architecture & Monument Study',
    subtitle: 'Palaces, Amphitheatres, Sacred Tanks & Stone Bridges',
    icon: 'Landmark',
    image: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
    description:
      'Examine the evolution of Tai-Ahom and indigenous Assamese architecture across Rangpur and Garhgaon—from the parabolic boat-roof of Rang Ghar and the receding terraces of Kareng Ghar to the 104-foot fluted shikhara of Sivadol.',
    highlights: [
      'Study the arcuate brick colonnades and octagonal Khar Ghar magazine at Talatal Ghar',
      'Observe the crocodile-dragon (Nga-Sang-Kham) roof finials and acoustics at Rang Ghar',
      'Compare the step-pyramidal layout of Kareng Ghar (1752 CE) with earlier timber descriptions',
      'Inspect the 1703 CE monolithic rock-cut engineering of the Namdang Stone Bridge',
    ],
  },
  {
    id: 'culinary-journey',
    title: 'Traditional Assamese Culinary Heritage',
    subtitle: 'Indigenous Ingredients, Alkaline Khar, Tenga & Bora Saul',
    icon: 'UtensilsCrossed',
    image: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
    description:
      'Rooted in the fertile floodplains of the Brahmaputra Valley, traditional Upper Assamese and Tai-Ahom food culture emphasizes seasonal herbs, fermented bamboo shoots (Khorisa), slow-simmered gravies, and heirloom rice varieties.',
    highlights: [
      'Khar: Traditional alkaline culinary preparation filtered through sun-dried banana plantain ash',
      'Masor Tenga: Light, tangy river-fish broth soured naturally with Ou-tenga (elephant apple) or Thekera',
      'Bora Saul & Joha Rice: Indigenous glutinous and aromatic winter rice cultivars of Upper Assam',
      'Pitha & Laru: Traditional harvest delicacies prepared during Magh Bihu and Rongali Bihu',
      'Medicinal & Wild Greens (Xaak): Over a hundred varieties of forest and floodplain greens traditionally gathered during Bohag Bihu',
    ],
  },
  {
    id: 'cultural-textiles',
    title: 'Muga Silk, Handloom & Metalcraft Traditions',
    subtitle: 'The Royal Looms & Artisan Guilds (Khels) of Sivasagar',
    icon: 'Sparkles',
    image: import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg',
    description:
      'During the Ahom era, specialized artisan guilds (Khels) produced golden Muga silk textiles, ceremonial brassware, and carved ivory and wood crafts under royal patronage.',
    highlights: [
      'Muga Silk (Antheraea assamensis): Naturally golden wild silk endemic to the Brahmaputra Valley, historically reserved for royal attire',
      'Kingkhap & Gamosa Motifs: Traditional geometric andzoomorphic brocade patterns symbolizing Ahom sovereignty',
      'Xorai & Bota: Traditional bell-metal and brass offering trays used to honor elders, scholars, and sacred texts',
      'Jaapi Craftsmanship: Woven bamboo-and-palm-leaf sunshades historically worn as insignia of rank by Ahom nobles',
    ],
  },
  {
    id: 'festivals-bihu',
    title: 'Living Festivals & Ancestral Observances',
    subtitle: 'Rongali Bihu, Me-Dam-Me-Phi & Maha Shivaratri',
    icon: 'Music',
    image: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
    description:
      'Sivasagar’s monuments are not silent relics; they remain the living stage for Assam’s most important seasonal, spiritual, and ancestral observances.',
    highlights: [
      'Me-Dam-Me-Phi (January 31): The sacred Tai-Ahom ceremony of ancestral veneration observed with traditional oblations at Charaideo',
      'Rongali (Bohag) Bihu (Mid-April): The Assamese New Year and spring festival celebrated with Husori carols, Dhol, and buffalo-horn Pepa at Rupahi Pathar',
      'Maha Shivaratri (February/March): Centrifugal spiritual gathering around the 1734 CE Sivadol and Borpukhuri embankment',
      'Joymoti Divas (March 27): Annual commemoration of the courage and martyrdom of Sati Joymoti at Joysagar',
    ],
  },
  {
    id: 'nature-birdwatching',
    title: 'Riverine Ecology & Floodplain Landscapes',
    subtitle: 'The Brahmaputra, Dikhow, Disang & Panidehing Wetlands',
    icon: 'Compass',
    image: import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg',
    description:
      'Explore the alluvial rivers, oxbow wetlands (beels), and historic earthen embankments (Alis and Garhs) that defined settlement patterns and ecological resilience in Sivasagar.',
    highlights: [
      'Panidehing Bird Sanctuary: 33.93 sq km of alluvial wetlands supporting over 165 resident and migratory bird species',
      'Historic Royal Roads (Alis): Elevated earthen causeways such as Dhodar Ali and চেউনী আলি (Seuni Ali) that doubled as flood embankments',
      'Sacred Tank Ecosystems: Winter waterfowl habitats across the 318-acre Joysagar and 150-acre Gaurisagar reservoirs',
      'Riverine Stilt Architecture (Chang-ghar): Traditional flood-resilient dwellings of the Mising communities near Disangmukh',
    ],
  },
];

export interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  culinaryHighlight: string;
}

export const ITINERARIES = {
  oneDay: {
    title: '1-Day Core Rangpur & Sivasagar Town Study Circuit',
    description:
      'A focused chronological circuit covering the central 18th-century monuments of Sivasagar town and historic Rangpur.',
    schedule: [
      {
        day: 1,
        title: 'The Royal Citadel of Rangpur & Sacred Borpukhuri',
        morning:
          '08:30 AM: Begin at Rang Ghar (1744–1750 CE) on Rupahi Pathar, then proceed 1.2 km to examine the multi-tiered brick arcades and Khar Ghar magazine of Talatal Ghar.',
        afternoon:
          '01:30 PM: Visit the 318-acre Joysagar Tank (1697 CE) and study the exterior bas-relief plaques of Joydol and Ghanashyam’s House. Afterward, visit the Assam Tai Museum (check open weekdays).',
        evening:
          '04:30 PM: Walk the southern embankment of Borpukhuri to study the 104-foot Sivadol, Vishnudol, and Devidol (1734 CE) at sunset.',
        culinaryHighlight:
          'Cultural Note: Notice the contrast between the secular arched vaults of Rangpur and the Nagara-inspired temple spires of Borpukhuri.',
      },
    ],
  },
  twoDay: {
    title: '2-Day Complete Ahom Capitals & UNESCO Charaideo Circuit',
    description:
      'Traces the full historical movement of the Ahom capitals—from Charaideo (1253 CE) to Garhgaon (1540 CE) and Rangpur (1698 CE).',
    schedule: [
      {
        day: 1,
        title: 'Western & Central Monuments: Gaurisagar, Namdang & Rangpur',
        morning:
          '08:30 AM: Start 12 km west at Gaurisagar Tank & Temples (1723 CE), then stop 4 km east to inspect the monolithic 1703 CE Namdang Stone Bridge.',
        afternoon:
          '01:00 PM: Explore Talatal Ghar, Rang Ghar, and the Joysagar Tank & Joydol temple complex in the historic Rangpur sector.',
        evening:
          '04:30 PM: Visit the Assam Tai Museum and conclude at Sivadol & Borpukhuri in central Sivasagar town.',
        culinaryHighlight:
          'Historical Focus: Compare Queen Phuleswari’s 1723 Gaurisagar complex with Queen Ambika’s 1734 Borpukhuri complex.',
      },
      {
        day: 2,
        title: 'Eastern Capitals: Imperial Garhgaon & UNESCO Charaideo Maidams',
        morning:
          '08:30 AM: Travel 15 km east to Garhgaon to study the seven-tiered step-pyramidal Kareng Ghar palace (1752 CE) and its ancient moat traces.',
        afternoon:
          '12:30 PM: Continue 16 km further east to the Charaideo Foothills to explore the UNESCO World Heritage Moidams (1253 CE onwards) and the on-site Archaeological Interpretation Centre.',
        evening:
          '04:00 PM: Return to Sivasagar town for a quiet walk along the elevated embankments of Borpukhuri.',
        culinaryHighlight:
          'Historical Focus: Experience the 13th-century royal necropolis of Charaideo alongside the 16th–18th century capital of Garhgaon.',
      },
    ],
  },
  threeDay: {
    title: '3-Day Comprehensive Architecture, Archives & Riverine Ecology Circuit',
    description:
      'An in-depth heritage study combining all royal capitals, sacred reservoirs, archival museums, and the Brahmaputra–Disang floodplain ecosystem.',
    schedule: [
      {
        day: 1,
        title: 'Sivasagar Town Archives, Sacred Tanks & Western Gateways',
        morning:
          'Explore Sivadol, Vishnudol, Devidol (1734 CE), and study the Sanchi-bark Buranji manuscripts at the Assam Tai Museum.',
        afternoon:
          'Visit the Gaurisagar Tank & Temple triad (1723 CE) and examine the rock-cut channels of the 1703 CE Namdang Stone Bridge.',
        evening:
          'Circumambulate the 129-acre Borpukhuri embankment to observe its elevated artesian hydrology.',
        culinaryHighlight:
          'Study Theme: Epigraphy, numismatics, and Bar Raja female royal patronage.',
      },
      {
        day: 2,
        title: 'The Royal Citadels of Rangpur, Garhgaon & Charaideo',
        morning:
          'Study Rang Ghar, Talatal Ghar, and the 1697–1698 CE Joysagar Tank and Joydol complex.',
        afternoon:
          'Travel east to explore Kareng Ghar at Garhgaon and the UNESCO World Heritage royal burial tumuli at Charaideo.',
        evening:
          'Review the excavation exhibits of Maidam No. 2 at the Charaideo Interpretation Centre.',
        culinaryHighlight:
          'Study Theme: Evolution of Ahom secular palace engineering and funerary architecture.',
      },
      {
        day: 3,
        title: 'Riverine Geography & Floodplain Ecology of Panidehing',
        morning:
          '06:00 AM: Early morning field visit to the 33.93-sq-km Panidehing Bird Sanctuary between the Brahmaputra and Disang rivers.',
        afternoon:
          'Observe traditional flood-resilient Chang-ghar (stilt-house) architecture and riverine ecology near Disangmukh.',
        evening:
          'Conclude your study in Sivasagar town.',
        culinaryHighlight:
          'Study Theme: How the alluvial floodplains of the Brahmaputra and its tributaries shaped Ahom settlement and defence.',
      },
    ],
  },
};

export const FAQS = [
  {
    question: 'Where is Sivasagar located and how can visitors reach the district?',
    answer:
      'Sivasagar is located in Upper Assam, approximately 360 km east of Guwahati along National Highway 715 (NH-715). Nearest Airports: Jorhat Airport (JRH, ~60 km west) and Dibrugarh Airport (DIB, ~80 km northeast). Nearest Railway Stations: Sivasagar Town Station (SRTN, in town) and Simaluguri Junction (SLGR, ~16 km away). Please verify current train and flight schedules prior to travel.',
  },
  {
    question: 'Why are the historic monuments of Sivasagar concentrated within a small radius?',
    answer:
      'For nearly six centuries (1253–1794 CE), the political and spiritual capitals of the Ahom Kingdom—Charaideo, Garhgaon, and Rangpur—were all situated within the fertile watershed between the Dikhow, Disang, and Burhi Dihing rivers in present-day Sivasagar and Charaideo districts.',
  },
  {
    question: 'What was the composition of the organic mortar (Karpatia Churna) used in Ahom monuments?',
    answer:
      'As recorded in the Changrung Phukanar Buranji, Ahom engineers mixed slaked snail-shell lime (Samuk chuna) and crushed brick dust (Surkhi) with an organic binder of boiled glutinous Bora rice (Bora saul), black gram pulse (Mati mah), duck eggs, Bael fruit mucilage, and resinous oil. This created a water-resistant, seismic-dampening mortar.',
  },
  {
    question: 'Are the subterranean chambers and tunnels of Talatal Ghar open to visitors?',
    answer:
      'The three underground levels of Talatal Ghar have been sealed by the Archaeological Survey of India (ASI) for structural conservation and visitor safety. Visitors can freely explore the expansive ground-level vaulted colonnades, upper brick terraces, and adjacent octagonal shrines. Note that popular stories of a 16-km tunnel reaching Garhgaon are classified as local folklore rather than verified archaeology.',
  },
  {
    question: 'Why was Charaideo Maidams inscribed as a UNESCO World Heritage Site in 2024?',
    answer:
      'In July 2024, UNESCO inscribed "Moidams – the Mound-Burial System of the Ahom Dynasty" under Cultural Criteria (iii) and (iv). The site preserves over 90 royal burial mounds built between the 13th and 18th centuries, representing an extraordinary and unique example of Tai royal funerary architecture.',
  },
  {
    question: 'Are monument opening hours and ticket fees fixed year-round?',
    answer:
      'ASI-protected monuments (Rang Ghar, Talatal Ghar, Kareng Ghar, Charaideo Maidams) generally open from sunrise to sunset (approx. 08:00 AM – 05:00 PM), while active shrines such as Sivadol, Joydol, and Gaurisagar remain open from early morning until evening. Because official tariffs and timings may be updated by the ASI or District Administration, please verify locally before visiting.',
  },
];

export interface GalleryItem {
  id: number;
  title: string;
  location: string;
  category:
    | 'Ahom Monuments'
    | 'Royal Palaces'
    | 'Temples'
    | 'Historical Architecture'
    | 'Ancient Lakes'
    | 'Charaideo Maidams'
    | 'Nature and Landscapes'
    | 'Sivasagar Then and Now';
  image: string;
  era: string;
  caption: string;
  credit: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Rang Ghar Royal Amphitheatre — Southern Facade',
    location: 'Rupahi Pathar, Rangpur (Sivasagar)',
    category: 'Ahom Monuments',
    image: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
    era: '1744–1750 CE (Swargadeo Pramatta Singha)',
    caption:
      'The two-storeyed brick royal sports pavilion at Rupahi Pathar, showcasing its parabolic inverted boat-roof and multi-foiled cusped arches.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument (N-AS-42)',
  },
  {
    id: 2,
    title: 'Talatal Ghar — Imperial Citadel & Vaulted Colonnades',
    location: 'Rangpur, Sivasagar',
    category: 'Royal Palaces',
    image: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
    era: '1698–1769 CE (Rudra Singha & Rajeswar Singha)',
    caption:
      'Ground-level brick arcades and upper open terraces of the seven-tiered royal citadel at Rangpur, originally crowned by timber audience halls.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
  },
  {
    id: 3,
    title: 'Kareng Ghar — The Step-Pyramidal Palace of Garhgaon',
    location: 'Garhgaon, Nazira Subdivision, Sivasagar',
    category: 'Royal Palaces',
    image: import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
    era: '1752 CE Brick Reconstruction (1540 CE Capital)',
    caption:
      'Receding masonry tiers and perimeter promenades of the royal palace at Garhgaon, the long-standing capital of the Ahom monarchs.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
  },
  {
    id: 4,
    title: 'Sivadol & the Golden Kalasha on Borpukhuri',
    location: 'Central Sivasagar Town',
    category: 'Temples',
    image: import.meta.env.BASE_URL + 'images/destinations/sivadol.JPG',
    era: '1734 CE (Bar Raja Queen Ambika)',
    caption:
      'Rising 104 feet above the southern bank of Borpukhuri, Sivadol features a fluted shikhara crowned by an 8-foot gold-plated Kalasha.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
  },
  {
    id: 5,
    title: 'Joysagar Tank & Joydol (Kesavanarayan Temple)',
    location: 'Joysagar, Jerenga Pathar, Sivasagar',
    category: 'Ancient Lakes',
    image: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
    era: '1697–1698 CE (Swargadeo Rudra Singha)',
    caption:
      'The 1698 CE Joydol temple overlooking the 318-acre Joysagar Tank, excavated in memory of Sati Joymoti.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
  },
  {
    id: 6,
    title: 'Royal Burial Tumuli (Moidams) at Charaideo',
    location: 'Charaideo Foothills (~28 km east of Sivasagar)',
    category: 'Charaideo Maidams',
    image: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
    era: '1253 CE – 18th Century CE (UNESCO Inscribed 2024)',
    caption:
      'Hemispherical earthen burial mounds enclosing vaulted subterranean royal chambers at Charaideo, inscribed on the UNESCO World Heritage List in July 2024.',
    credit: 'Explore Sivasagar Heritage Archive / UNESCO & ASI Site (N-AS-24)',
  },
  {
    id: 7,
    title: 'Namdang Monolithic Stone Bridge (1703 CE)',
    location: 'Over the Namdang River, NH-715, Sivasagar',
    category: 'Historical Architecture',
    image: import.meta.env.BASE_URL + 'images/destinations/namdang.jpg',
    era: '1703 CE (Swargadeo Rudra Singha / Architect Ghanashyam)',
    caption:
      'Carved from a single massive sandstone formation in 1703 CE, this 60-meter slightly cambered bridge has spanned the Namdang River for over three centuries.',
    credit: 'Explore Sivasagar Heritage Archive / Historical Civil Engineering Landmark',
  },
  {
    id: 8,
    title: 'Gaurisagar Reservoir & 18th-Century Temple Triad',
    location: 'Gaurisagar, 12 km west of Sivasagar',
    category: 'Ancient Lakes',
    image: import.meta.env.BASE_URL + 'images/destinations/gaurisagar.jpg',
    era: '1723–1724 CE (Bar Raja Queen Phuleswari)',
    caption:
      'The tranquil 150-acre reservoir and temple complex consecrated by Queen Phuleswari, the first female Bar Raja of the Ahom Kingdom.',
    credit: 'Explore Sivasagar Heritage Archive / ASI Protected Monument',
  },
  {
    id: 9,
    title: 'Panidehing Floodplain Wetlands & Waterfowl Habitat',
    location: 'Panidehing Bird Sanctuary, Northern Sivasagar',
    category: 'Nature and Landscapes',
    image: import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg',
    era: 'Notified Wildlife Sanctuary (1996 CE)',
    caption:
      'Alluvial beels and marshes between the Brahmaputra and Disang rivers supporting over 165 species of resident and trans-Himalayan migratory birds.',
    credit: 'Explore Sivasagar Ecological Archive / IBA Site IN-AS-34',
  },
  {
    id: 10,
    title: 'Assam Tai Museum — Epigraphic & Manuscript Repository',
    location: 'Western Bank of Borpukhuri, Sivasagar Town',
    category: 'Historical Architecture',
    image: import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg',
    era: 'Established 1992 CE (Collections: 13th–19th Century)',
    caption:
      'Situated on the western embankment of Borpukhuri, preserving Sanchi-pat Buranjis, Hengdang swords, and Tai-Ahom royal regalia.',
    credit: 'Explore Sivasagar Heritage Archive / Directorate of Museums, Assam',
  },
  {
    id: 11,
    title: 'Then & Now: Rang Ghar’s Enduring Brick Core Through Two Great Earthquakes',
    location: 'Rupahi Pathar, Sivasagar',
    category: 'Sivasagar Then and Now',
    image: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
    era: '1750 CE Royal Stucco vs. Present-Day Exposed Doiya Itaa Brickwork',
    caption:
      'Historically coated in polished white lime plaster overlooking royal games, Rang Ghar today reveals its structural terracotta brick core after surviving the 1897 and 1950 Assam earthquakes.',
    credit: 'Comparative Conservation Documentation / ASI Guwahati Circle',
  },
  {
    id: 12,
    title: 'Then & Now: From 18th-Century Royal Capital to Protected Archaeological Park',
    location: 'Talatal Ghar & Kareng Ghar, Sivasagar',
    category: 'Sivasagar Then and Now',
    image: import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
    era: '1540–1769 CE Royal Citadels vs. Present-Day Conservation',
    caption:
      'While the upper timber reception halls (Solang Ghar) described by 17th-century chroniclers perished in 19th-century conflicts, the multi-storeyed brick substructures remain preserved by the ASI.',
    credit: 'Comparative Historical Documentation / Explore Sivasagar Archive',
  },
];
