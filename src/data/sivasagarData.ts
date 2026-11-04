export interface Destination {
  id: string;
  name: string;
  assameseName: string;
  tagline: string;
  category: 'Royal Palace' | 'Amphitheatre' | 'Ancient Temple' | 'Sacred Lake' | 'UNESCO Heritage' | 'Engineering Marvel' | 'Museum & Culture' | 'Wildlife & Nature';
  era: string;
  builtBy: string;
  yearBuilt: string;
  location: string;
  distanceFromTown: string;
  coordinates: [number, number]; // [lat, lng]
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  historicalBackground: string[];
  architecturalDetails: {
    style: string;
    materials: string;
    keyFeatures: string[];
    dimensions?: string;
  };
  culturalSignificance: string;
  visitorInfo: {
    timings: string;
    entryFee: {
      indian: string;
      foreign: string;
      camera?: string;
    };
    bestTimeToVisit: string;
    idealDuration: string;
    dressCode?: string;
  };
  nearbyAttractions: {
    name: string;
    distance: string;
    brief: string;
  }[];
  travelTips: string[];
  verifiedFact: string;
  googleMapsQuery: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'rang-ghar',
    name: 'Rang Ghar',
    assameseName: 'ৰংঘৰ',
    tagline: 'Asia’s Oldest Surviving Royal Amphitheatre',
    category: 'Amphitheatre',
    era: 'Ahom Dynasty (Golden Era)',
    builtBy: 'Swargadeo Pramatta Singha',
    yearBuilt: '1744–1750 CE',
    location: 'Rupahi Pathar, Joysagar, Sivasagar',
    distanceFromTown: '3 km south of Sivasagar town center',
    coordinates: [26.9686, 94.6231],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Rang_Ghar_2.jpg/1280px-Rang_Ghar_2.jpg'
    ],
    shortDescription: 'A two-storied royal pavilion built by King Pramatta Singha where Ahom royalty watched buffalo fights, indigenous sports, and Rongali Bihu performances.',
    historicalBackground: [
      'Rang Ghar, translating to the "House of Entertainment", stands as a grand monument to the sporting and cultural life of the royal Ahom court.',
      'Originally commissioned in timber and bamboo by King Rudra Singha, the present two-storey brick and indigenous mortar monument was rebuilt by his successor, Swargadeo Pramatta Singha, between 1744 and 1750 CE.',
      'From its central arched royal gallery, the Swargadeo (Ahom King) and supreme nobility viewed spectacular traditional games during the harvest festival of Rongali Bihu, including bull and buffalo fights (*Moh-juj*), wrestling (*Mal-juj*), cock fights, and falconry.'
    ],
    architecturalDetails: {
      style: 'Tai-Ahom and Indo-Islamic synthesis with indigenous Assamese boat-roof design',
      materials: 'Baked clay flat bricks, bonded by indigenous mortar (Karpatia churna) formulated with sticky Bora rice (Bora saul), duck eggs, pulse (Mati mah), snail lime, and fish oil',
      dimensions: '11 m height, 27 m length, 11 m width',
      keyFeatures: [
        'Distinctive roof shaped like an inverted Ahom royal longboat (Khel Nao)',
        'Roof apex crowned with sculpted crocodile-dragon crests (Nga-Sang-Kham)',
        'Arched entrances with series of brick vaults and pillared open balconies',
        'Upper floor was reserved exclusively for the royal family, while courtiers sat on flanking verandas',
        'Remarkable natural acoustic amplification designed into the vaulted ceiling chambers'
      ]
    },
    culturalSignificance: 'Rang Ghar is the supreme cultural symbol of Assam. The silhouette of its iconic boat-shaped roof was officially adopted as the emblem for the 33rd National Games held in Assam and remains an immortal motif in Assamese art and currency.',
    visitorInfo: {
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFee: {
        indian: '₹25 per person (ASI regulated)',
        foreign: '₹300 per person',
        camera: '₹25 (still), ₹100 (video)'
      },
      bestTimeToVisit: 'October to April; especially vibrant during Rongali Bihu in mid-April',
      idealDuration: '45 to 75 minutes',
      dressCode: 'Comfortable casual attire; respectful conduct encouraged at heritage monument'
    },
    nearbyAttractions: [
      { name: 'Talatal Ghar', distance: '1.2 km', brief: 'The multi-level underground royal military palace' },
      { name: 'Joysagar Tank & Joydol', distance: '1.8 km', brief: 'Asia’s largest man-made lake and terracotta Shiva temple' },
      { name: 'Assam Tai Museum', distance: '2.5 km', brief: 'Priceless manuscripts, royal swords, and ancient relics' }
    ],
    travelTips: [
      'Visit in early morning or late afternoon for golden hour lighting that illuminates the red brick patina.',
      'Notice the roof ends where the ornamental stone crocodile tails taper upwards into the sky.',
      'Combine this with Talatal Ghar and Joysagar in a single morning heritage circuit.'
    ],
    verifiedFact: 'The organic indigenous mortar made from Bora sticky rice and duck eggs has kept the structure standing firm through severe earthquakes in 1897 and 1950.',
    googleMapsQuery: 'Rang+Ghar+Sivasagar+Assam'
  },
  {
    id: 'talatal-ghar',
    name: 'Talatal Ghar',
    assameseName: 'তলাতল ঘৰ',
    tagline: 'The Mysterious Underground Royal Citadel & Military Fort',
    category: 'Royal Palace',
    era: 'Ahom Dynasty',
    builtBy: 'Swargadeo Rudra Singha & Swargadeo Rajeswar Singha',
    yearBuilt: '1698–1769 CE',
    location: 'Rangpur, Joysagar, Sivasagar',
    distanceFromTown: '4 km south-west of Sivasagar town',
    coordinates: [26.9631, 94.6264],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/A_walkway_in_Talatal_Ghar%2C_Sivasagar%2C_Assam.jpg/1280px-A_walkway_in_Talatal_Ghar%2C_Sivasagar%2C_Assam.jpg'
    ],
    shortDescription: 'The grandest military stronghold of the Ahom Kingdom featuring seven storeys—four above ground and three subterranean—with legendary secret escape tunnels.',
    historicalBackground: [
      'Swargadeo Rudra Singha initially established the palace at Rangpur in 1698. His son, Swargadeo Rajeswar Singha (1751–1769 CE), subsequently expanded it into a massive multi-tiered fortress complex.',
      'Designed strategically to serve as both an imperial residence and an impregnable military garrison capable of sustaining royal troops during sieges.',
      'The palace housed weapons arsenals, gunpowder storage chambers, prayer sanctuaries, and subterranean cantonments that baffled invading Mughal and Burmese armies.'
    ],
    architecturalDetails: {
      style: 'Ahom defensive military fortress with subterranean brick vaulting',
      materials: 'Indigenous thin bricks (*Doiya itaa*), egg-rice adhesive mortar (*Karpatia churna*), and limestone',
      dimensions: 'Complex covers over 10,000 sq meters; 7 distinct storeys',
      keyFeatures: [
        'Seven storeys in total: three subterranean floors underground and four floors above ground',
        'Legendary subterranean tunnels: one leading 16 km to Garhgaon Palace and another 3 km to the Dikhow River',
        'Ingenious light wells and cross-ventilation shafts providing fresh air to deep underground quarters',
        'Octagonal temple pavilion (Gola Ghar / Khar Ghar) used as royal ammunition depot'
      ]
    },
    culturalSignificance: 'Talatal Ghar stands as an enduring testament to the unmatched defensive military genius of the Ahoms, who successfully repelled 17 Mughal invasions to preserve Assam’s independent sovereignty.',
    visitorInfo: {
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFee: {
        indian: '₹25 per person',
        foreign: '₹300 per person',
        camera: '₹25 (still)'
      },
      bestTimeToVisit: 'November to March',
      idealDuration: '1.5 to 2 hours',
      dressCode: 'Comfortable walking shoes are recommended as the site spans spacious lawns and multi-level brick pathways'
    },
    nearbyAttractions: [
      { name: 'Rang Ghar', distance: '1.2 km', brief: 'Iconic royal amphitheatre and sports pavilion' },
      { name: 'Joysagar Tank', distance: '1.5 km', brief: 'Historical lake consecrated to Queen Joymoti' },
      { name: 'Sivadol Temple', distance: '4.2 km', brief: 'Towering 104-ft Shiva temple in town center' }
    ],
    travelTips: [
      'The underground tunnels are currently sealed off by the Archaeological Survey of India (ASI) for visitor safety, but the grand upper arcades and vaulted brick rooms are open for exploration.',
      'Take a guided walk along the elevated rear terraces to witness the symmetry of the royal gardens and former military parade fields.'
    ],
    verifiedFact: 'The British administration sealed the secret underground tunnels in the late 19th century after soldiers exploring the intricate maze reportedly became disoriented.',
    googleMapsQuery: 'Talatal+Ghar+Sivasagar+Assam'
  },
  {
    id: 'kareng-ghar',
    name: 'Kareng Ghar (Garhgaon Palace)',
    assameseName: 'কাৰেং ঘৰ',
    tagline: 'The Seven-Storeyed Imperial Citadel of Garhgaon',
    category: 'Royal Palace',
    era: 'Ahom Dynasty',
    builtBy: 'Swargadeo Suklengmung & Swargadeo Pramatta Singha',
    yearBuilt: '1540 (Wood) / 1752 CE (Brick)',
    location: 'Garhgaon, Nazira subdivision, Sivasagar District',
    distanceFromTown: '15 km east of Sivasagar town',
    coordinates: [26.9292, 94.7562],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Kareng_Ghar%2C_Sivasagar%2C_Assam.jpg/1280px-Kareng_Ghar%2C_Sivasagar%2C_Assam.jpg'
    ],
    shortDescription: 'The regal principal palace of the Ahom monarchs at their long-time capital Garhgaon, displaying step-pyramidal architecture surrounded by ancient moats.',
    historicalBackground: [
      'Garhgaon was established as the royal capital by Swargadeo Suklengmung in 1540 CE. He constructed the original royal palace out of seasoned timber and bamboo.',
      'In 1662, during the Mughal invasion led by Mir Jumla, royal chronicler Shihabuddin Talish wrote with deep admiration that the wooden palace of Garhgaon was "one of the wonders of the world, adorned with carvings beyond human imagination".',
      'The existing multi-storeyed brick palace was rebuilt in 1752 CE by King Pramatta Singha and King Rajeswar Singha, surrounded by high ramparts and deep water moats (*Garh*).'
    ],
    architecturalDetails: {
      style: 'Step-pyramidal royal palace with Tai and indigenous Assamese motifs',
      materials: 'Sun-baked and kilned terracotta bricks, organic sticky rice and egg binder',
      dimensions: 'Surrounded by four fortified gateways and moats',
      keyFeatures: [
        'Seven-storeyed design tapering gracefully towards the summit',
        'Top floor contains a royal dome-shaped octagonal chamber called "Solang" for royal private council',
        'Broad arched corridors with natural cooling ventilation passages',
        'Royal chambers for the Swargadeo, Chief Queen (Bor-Kuanri), and royal treasuries'
      ]
    },
    culturalSignificance: 'Garhgaon served as the epicentre of Ahom royal governance, international diplomacy, and royal coronation ceremonies for four centuries.',
    visitorInfo: {
      timings: '08:30 AM – 05:00 PM (Daily)',
      entryFee: {
        indian: '₹25 per person',
        foreign: '₹300 per person',
        camera: '₹25'
      },
      bestTimeToVisit: 'October to April',
      idealDuration: '1.5 to 2 hours',
      dressCode: 'Comfortable clothing suitable for staircase ascent to upper royal terraces'
    },
    nearbyAttractions: [
      { name: 'Charaideo Maidams', distance: '16 km', brief: 'UNESCO World Heritage royal burial tumuli' },
      { name: 'Nazira Tea Estates', distance: '4 km', brief: 'Historic tea gardens and heritage colonial bungalows' },
      { name: 'Talatal Ghar', distance: '14 km', brief: 'The military fortress in Rangpur' }
    ],
    travelTips: [
      'Climb up to the fourth-storey balcony to enjoy panoramic 360-degree vistas of surrounding lush green paddy fields and emerald tea gardens.',
      'Notice the fine terracotta drainage spouts crafted in the form of makara sea-monsters along the roof eaves.'
    ],
    verifiedFact: 'The city was named "Garhgaon" (Village of Forts) because it was protected by three concentric fortified earthen walls and moats stretching miles in perimeter.',
    googleMapsQuery: 'Kareng+Ghar+Garhgaon+Nazira+Assam'
  },
  {
    id: 'sivadol',
    name: 'Sivadol & Borpukhuri',
    assameseName: 'শিৱদ’ল আৰু বৰপুখুৰী',
    tagline: 'One of the Tallest Shiva Temples in India & The Sacred 129-Acre Borpukhuri',
    category: 'Ancient Temple',
    era: 'Ahom Dynasty',
    builtBy: 'Bar Raja Queen Ambika (Consort of King Siba Singha)',
    yearBuilt: '1734 CE',
    location: 'Center of Sivasagar Town, banks of Borpukhuri',
    distanceFromTown: 'Located in the heart of Sivasagar town',
    coordinates: [26.9856, 94.6375],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/sivadol.JPG',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/sivadol.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sivadol_Sivasagar.JPG/1280px-Sivadol_Sivasagar.JPG'
    ],
    shortDescription: 'Standing 104 feet tall on the embankment of the massive 129-acre Borpukhuri, Sivadol is capped by an authentic 8-foot pure gold dome (Kalasha) surviving through centuries.',
    historicalBackground: [
      'Commissioned in 1734 CE by Queen Ambika, who assumed the sovereign title "Bar Raja" during the reign of King Siba Singha.',
      'Built as the crown jewel of a triad of sacred sanctuaries on the southern embankment of the great Sivasagar Tank (Borpukhuri), flanked by Vishnudol and Devidol.',
      'Sivadol remains a vibrant living shrine where ancient Vedic rituals, daily pujas, and the monumental Maha Shivaratri mela draw hundreds of thousands of pilgrims from across India.'
    ],
    architecturalDetails: {
      style: 'Ahom-Nilachal architectural style with tall fluted Shikhara and multi-tiered Mandapa',
      materials: 'Chiseled stone foundation, high-grade terracotta brick superstructure, and pure gold kalasha',
      dimensions: 'Height: 104 feet (32 meters); perimeter of base: 195 feet',
      keyFeatures: [
        'Massive octagonal sanctum (garbhagriha) housing the sacred natural Shiva linga',
        'Fluted curvilinear Shikhara decorated with vertical reeded pilasters',
        '8-foot pure gold mastaka (dome/kalasha) crowning the temple apex',
        'Bas-relief sculptures on exterior walls depicting avatars of Vishnu, goddess Durga, and celestial dancers'
      ]
    },
    culturalSignificance: 'The grand Maha Shivaratri celebration at Sivasagar Sivadol is the largest in northeast India, accompanied by an iconic annual fair with traditional Assamese handicrafts, music, and cuisine.',
    visitorInfo: {
      timings: '05:30 AM – 08:30 PM (Daily)',
      entryFee: {
        indian: 'Free entry (Temple darshan); donations voluntary',
        foreign: 'Free entry',
        camera: 'Free outside sanctum; photography prohibited inside inner sanctum'
      },
      bestTimeToVisit: 'Year-round; spectacular during Maha Shivaratri (February/March)',
      idealDuration: '1 to 1.5 hours',
      dressCode: 'Modest temple attire; shoes must be deposited at the guarded shoe stall outside'
    },
    nearbyAttractions: [
      { name: 'Borpukhuri Lake Front', distance: 'Adjacent', brief: 'Serene tree-lined promenade for morning walks' },
      { name: 'Vishnudol & Devidol', distance: '100 meters', brief: 'The twin companion temples on the same tank bank' },
      { name: 'Assam Tai Museum', distance: '800 meters', brief: 'Heritage cultural artifacts repository' }
    ],
    travelTips: [
      'Take an evening stroll along the Sivasagar tank walkway at sunset when the temple shikhara casts a golden reflection across the tranquil waters.',
      'Respect inner sanctum traditions: please refrain from flash photography in the sanctum sanctorum.'
    ],
    verifiedFact: 'The water surface of Borpukhuri tank remains elevated approximately 10 to 12 feet above the surrounding ground level of Sivasagar town, yet has never breached or flooded its sturdy royal banks in nearly 300 years.',
    googleMapsQuery: 'Sivadol+Sivasagar+Assam'
  },
  {
    id: 'joysagar-tank',
    name: 'Joysagar Tank & Joydol',
    assameseName: 'জয়সাগৰ পুখুৰী আৰু জয়দ’ল',
    tagline: 'Asia’s Largest Man-Made Lake, Consecrated to the Immortality of Joymoti',
    category: 'Sacred Lake',
    era: 'Ahom Dynasty',
    builtBy: 'Swargadeo Rudra Singha',
    yearBuilt: '1697–1698 CE',
    location: 'Joysagar, 5 km south of Sivasagar town',
    distanceFromTown: '5 km south of town center',
    coordinates: [26.9534, 94.6346],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Joysagar_Joydol_Relic.jpg/1280px-Joysagar_Joydol_Relic.jpg'
    ],
    shortDescription: 'Spanning 318 acres, Joysagar is the largest human-excavated historical lake in Asia, constructed in memory of Queen Mother Joymoti Konwari.',
    historicalBackground: [
      'Excavated in an astonishingly brief period of just 45 days in 1697 CE by Swargadeo Rudra Singha (Sukhrungphaa).',
      'The lake is a monumental royal tribute to his heroic mother, Sati Joymoti, who stoically endured weeks of brutal physical torture at Jerenga Pathar without uttering a word that would betray her fugitive husband Gadapani.',
      'Her ultimate sacrifice paved the way for Gadapani to take the throne as Swargadeo Gadadhar Singha and restore the greatness of the Ahom Kingdom.'
    ],
    architecturalDetails: {
      style: 'Ahom temple architecture with exquisite stone relief panels on tank bund',
      materials: 'Excavated earthen embankments, terracotta brick temples with carved granite plinths',
      dimensions: 'Water spread: 318 acres (1.28 sq km); total perimeter over 5 km',
      keyFeatures: [
        'Joydol (Kesavanarayan Temple) dedicated to Lord Vishnu with intricate carvings of incarnations and sports of Krishna',
        'Adjacent temples including Baidyanath Shivadol, Devi dol, and Ghanashyam dol',
        'Vast water body serves as an important winter habitat for migratory birds from Central Asia and Siberia'
      ]
    },
    culturalSignificance: 'Joymoti is revered as the epitome of Assamese courage, sacrifice, and patriotism. Joysagar remains a sacred pilgrimage site celebrating maternal devotion and resilience.',
    visitorInfo: {
      timings: 'Open all day; Temples open 06:00 AM – 06:30 PM',
      entryFee: {
        indian: 'Free access to lake; temple darshan free',
        foreign: 'Free access',
        camera: 'Free'
      },
      bestTimeToVisit: 'November to March (birdwatching season and pleasant breezes)',
      idealDuration: '1 to 2 hours',
      dressCode: 'Comfortable clothing; remove footwear when entering the temple plinths'
    },
    nearbyAttractions: [
      { name: 'Rang Ghar', distance: '1.8 km', brief: 'The royal sports amphitheatre' },
      { name: 'Talatal Ghar', distance: '1.5 km', brief: 'The multi-tiered citadel' },
      { name: 'Ghanashyam House', distance: '1 km', brief: 'Terracotta masonry home of royal architect Ghanashyam' }
    ],
    travelTips: [
      'Carry binoculars if visiting between November and February; hundreds of migratory teals, pintails, and geese roost on the lake.',
      'Walk around Joydol to examine the detailed bas-relief panels depicting elephants, peacocks, and musicians.'
    ],
    verifiedFact: 'Joysagar was dug by thousands of royal workers in just 45 days, creating a water reservoir with a holding capacity of millions of cubic meters.',
    googleMapsQuery: 'Joysagar+Tank+Joydol+Sivasagar+Assam'
  },
  {
    id: 'charaideo-maidam',
    name: 'Charaideo Maidam',
    assameseName: 'চৰাইদেউ মৈদাম',
    tagline: 'UNESCO World Heritage Site — The Sacred Royal Pyramids of Assam',
    category: 'UNESCO Heritage',
    era: 'Ahom Dynasty (13th – 18th Century CE)',
    builtBy: 'Successive Ahom Swargadeos (Initiated by Chaolung Sukaphaa)',
    yearBuilt: '1253 CE onwards (Inscribed UNESCO 2024)',
    location: 'Charaideo Hillock, ~30 km east of Sivasagar',
    distanceFromTown: '28 km east of Sivasagar town',
    coordinates: [26.9450, 94.9080],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Maidams_%28N-AS-24%29.jpg/1280px-Maidams_%28N-AS-24%29.jpg'
    ],
    shortDescription: 'Inscribed as India’s 43rd UNESCO World Heritage Site in 2024, Charaideo contains over 90 sacred royal burial tumuli of Ahom monarchs and queens, often termed the Pyramids of Assam.',
    historicalBackground: [
      'Charaideo was the first capital established by Chaolung Sukaphaa in 1253 CE after crossing the Patkai hills into the Brahmaputra Valley.',
      'Even after subsequent capitals moved to Garhgaon and Rangpur, Charaideo was preserved as the sacred ancestral sanctuary where the spirits of deceased Swargadeos and royal consorts rested.',
      'The Tai-Ahom belief system holds that kings are descendants of the heavenly deity Lengdon; hence, their burial chambers (*Maidams*) were consecrated with elaborate funerary rituals.'
    ],
    architecturalDetails: {
      style: 'Tai-Ahom earth-mound burial tumulus architecture',
      materials: 'Massive vaulted stone and brick subterranean vaults (*Kharu Ghar*), packed with layers of charcoal, timber, sand, and covered by grass-carpeted hemispherical earth mounds',
      dimensions: 'Individual maidams vary from 5 m to over 20 m in height, spanning hundreds of square meters',
      keyFeatures: [
        'Central underground vault housing the royal casket (*Rungdang*) alongside personal regalia, royal swords, and gold utensils',
        'Octagonal boundary wall (*Chau-chali*) enclosing the sacred perimeter',
        'Crowning open pavilion (*Chow-chali*) at the apex of the mound',
        'Lush landscaping among undulating green hills reminiscent of East Asian royal burial tumuli'
      ]
    },
    culturalSignificance: 'Charaideo is the spiritual cradle of the Assamese nation and the Tai-Ahom identity. Its 2024 UNESCO World Heritage inscription recognized its outstanding universal value to global human civilization.',
    visitorInfo: {
      timings: '09:00 AM – 05:00 PM (Daily)',
      entryFee: {
        indian: '₹25 per person',
        foreign: '₹300 per person',
        camera: '₹25'
      },
      bestTimeToVisit: 'October to April; Me-Dam-Me-Phi festival on January 31 is deeply moving',
      idealDuration: '2 to 3 hours',
      dressCode: 'Sacred heritage park: visitors are requested to keep voices low and refrain from walking on the turf of burial mounds'
    },
    nearbyAttractions: [
      { name: 'Kareng Ghar (Garhgaon)', distance: '16 km', brief: 'The seven-storeyed step palace' },
      { name: 'Sonari & Patkai Foothills', distance: '12 km', brief: 'Scenic tea valleys leading towards Nagaland hills' },
      { name: 'Disang River Bank', distance: '8 km', brief: 'Peaceful river picnic spots' }
    ],
    travelTips: [
      'Take time to visit the on-site Archaeological Interpretation Centre which houses 3D models and artifacts excavated from Maidam No. 2.',
      'Hiring an authorized ASI local guide at the gate brings the centuries of ancestral lore to life.'
    ],
    verifiedFact: 'In July 2024, UNESCO’s World Heritage Committee voted unanimously to inscribe the "Moidams – the Mound-Burial System of the Ahom Dynasty" into the World Heritage List under cultural criteria (iii) and (iv).',
    googleMapsQuery: 'Charaideo+Maidam+UNESCO+Heritage+Assam'
  },
  {
    id: 'tai-museum',
    name: 'Assam Tai Museum',
    assameseName: 'অসম টাই সংগ্ৰহালয়',
    tagline: 'Guardian of 600 Years of Tai-Ahom Chronicles, Relics & Royal Regalia',
    category: 'Museum & Culture',
    era: '13th to 19th Century Collections',
    builtBy: 'Established by Sivasagar District & Tai-Ahom Cultural Society',
    yearBuilt: '1992 CE',
    location: 'West bank of Borpukhuri, Sivasagar Town',
    distanceFromTown: 'Within town center walking zone',
    coordinates: [26.9839, 94.6328],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg'
    ],
    shortDescription: 'A treasure-house of Tai-Ahom history housing rare Sanchi-bark Buranji chronicles, royal swords (Hengdang), ancient coins, bronze idols, and traditional textiles.',
    historicalBackground: [
      'Founded in 1992 on the scenic western embankment of Sivasagar Tank to conserve the diminishing literary, martial, and artistic treasures of the Ahom civilization.',
      'Preserves ancient manuscripts written in the distinct Tai script, which documented continuous historical records (*Buranji*) unbroken from 1253 to 1826 CE.',
      'Showcases the royal regalia, ceremonial attire made of Muga and Eri wild silks, and religious scriptures used by Ahom high priests (*Deodhais* and *Bailungs*).'
    ],
    architecturalDetails: {
      style: 'Assamese cultural pavilion with traditional Tai motifs',
      materials: 'Brick, timber gallery displays, climate-controlled archive cases',
      keyFeatures: [
        'Dedicated manuscript gallery displaying Sanchi-bark treatises on astronomy, medicine, statecraft, and warfare',
        'Armoury hall featuring original curved Hengdang swords and bronze cannonballs (*Kamanchila*)',
        'Ethnographic gallery of Tai-Khamyang, Tai-Phake, and Tai-Ahom folk life'
      ]
    },
    culturalSignificance: 'The museum serves as the primary research institution for Tai linguistics, manuscript restoration, and historical documentation of pre-colonial Northeast India.',
    visitorInfo: {
      timings: '10:00 AM – 04:30 PM (Closed on Mondays and 2nd/4th Saturdays)',
      entryFee: {
        indian: '₹20 per adult, ₹10 per student',
        foreign: '₹100 per person',
        camera: '₹50'
      },
      bestTimeToVisit: 'Year-round during museum hours',
      idealDuration: '1 to 1.5 hours',
      dressCode: 'Casual, respectful behavior'
    },
    nearbyAttractions: [
      { name: 'Sivadol & Borpukhuri', distance: '400 meters', brief: 'Walk along the bank promenade' },
      { name: 'Sivasagar Central Market', distance: '600 meters', brief: 'Shop for authentic Muga silk and Assamese tea' }
    ],
    travelTips: [
      'Ask the museum curator to explain the composition of traditional natural ink (*Mohi*) made from silikha fruit and cow urine that kept manuscripts readable for over 400 years.',
      'Purchase bilingual booklets on Tai-Ahom script and Sivasagar history available at the counter.'
    ],
    verifiedFact: 'The Ahom kings kept the earliest systematic written histories (*Buranjis*) in the Indian subcontinent, mandating that every state event be faithfully recorded by court scribes.',
    googleMapsQuery: 'Assam+Tai+Museum+Sivasagar'
  },
  {
    id: 'namdang-stone-bridge',
    name: 'Namdang Stone Bridge',
    assameseName: 'নামদাং শিলৰ সাঁকো',
    tagline: 'The 320-Year-Old Engineering Marvel Carved From a Single Sandstone',
    category: 'Engineering Marvel',
    era: 'Ahom Dynasty',
    builtBy: 'Swargadeo Rudra Singha (Master artisan Ghanashyam Khanikar)',
    yearBuilt: '1703 CE',
    location: 'Over the Namdang River, NH-715, near Sivasagar',
    distanceFromTown: '8 km west of Sivasagar town',
    coordinates: [26.9587, 94.5772],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/namdang.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/namdang.jpg'
    ],
    shortDescription: 'Carved out of a single monolithic sandstone slab in 1703 CE, this 60-meter long humped stone bridge still bears modern heavy vehicular traffic on National Highway 715.',
    historicalBackground: [
      'Commissioned by Swargadeo Rudra Singha in 1703 CE and executed under the supervision of the renowned master craftsman Ghanashyam Khanikar.',
      'The raw sandstone monolith was quarried and brought down from the Naga Hills, then meticulously carved and anchored across the swift waters of the Namdang River.',
      'For over three centuries, it has connected Upper Assam and withstood massive earthquakes and heavy commercial freight traffic without requiring any major structural reinforcement.'
    ],
    architecturalDetails: {
      style: 'Monolithic arched masonry bridge without mortar or iron reinforcements in the main arch',
      materials: 'Solid sandstone block with indigenous binding cement made of sticky rice, duck eggs, and limestone at abutments',
      dimensions: 'Length: 60 meters (197 ft); Width: 6.5 meters (21.3 ft); Height: 1.7 meters',
      keyFeatures: [
        'Curved hump-back arch designed to distribute dynamic weight evenly into rock abutments',
        'Carved monolithic stone railings on both sides of the roadway',
        'Resistant to the erosive action of seasonal monsoon flash floods for over 320 years'
      ]
    },
    culturalSignificance: 'A living symbol of ancient Assamese civil engineering and material science, demonstrating how traditional organic mortar and precision stonecraft can outlast modern reinforced concrete.',
    visitorInfo: {
      timings: 'Open 24 hours (Active national highway bridge)',
      entryFee: {
        indian: 'Free',
        foreign: 'Free',
        camera: 'Free'
      },
      bestTimeToVisit: 'Daylight hours for photography and safe pedestrian viewing from riverbank',
      idealDuration: '30 to 45 minutes',
      dressCode: 'Comfortable clothing; exercise caution when crossing near highway traffic'
    },
    nearbyAttractions: [
      { name: 'Gaurisagar Tank & Temples', distance: '4 km', brief: 'Vast scenic tank built by Queen Phuleswari' },
      { name: 'Rang Ghar', distance: '7 km', brief: 'The royal sports amphitheatre' }
    ],
    travelTips: [
      'Step down carefully to the grassy riverbank beneath the bridge to inspect the hand-chiseled tool marks on the 1703 sandstone blocks.',
      'Park your vehicle safely off the highway shoulder at the designated parking bay before walking onto the pedestrian path.'
    ],
    verifiedFact: 'Despite being over 320 years old, this bridge continues to carry heavy modern buses, trucks, and freight on National Highway 715 every day without structural failure.',
    googleMapsQuery: 'Namdang+Stone+Bridge+Sivasagar'
  },
  {
    id: 'panidehing-bird-sanctuary',
    name: 'Panidehing Bird Sanctuary',
    assameseName: 'পানীদিহিং পক্ষী অভয়াৰণ্য',
    tagline: 'Assam’s Wetland Haven for 165+ Migratory & Indigenous Bird Species',
    category: 'Wildlife & Nature',
    era: 'Established as Wildlife Sanctuary in 1996',
    builtBy: 'Protected by Government of Assam Forest Department',
    yearBuilt: '1996 CE',
    location: 'Confluence of Brahmaputra & Disang rivers, northern Sivasagar',
    distanceFromTown: '22 km north-west of Sivasagar',
    coordinates: [27.1120, 94.5680],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg'
    ],
    shortDescription: 'A 33.93 sq km wetland sanctuary on the floodplains of the Brahmaputra, providing a serene winter paradise for over 165 species of migratory water birds and endangered storks.',
    historicalBackground: [
      'Originally identified by local nature conservationists as an irreplaceable breeding and roosting wetland for trans-Himalayan birds.',
      'Officially declared a Wildlife Sanctuary in August 1996, protecting vast beels (shallow water bodies), elephant grasslands, and swamp forests.',
      'Serves as an essential ecological filter and flood catchment between the mighty Brahmaputra and Disang rivers.'
    ],
    architecturalDetails: {
      style: 'Natural floodplain wetland and beel ecosystem',
      materials: 'Water bodies (Kandulimari, Megha, and Ghorjan beels), alluvial grasslands, and reeds',
      dimensions: 'Total protected sanctuary area: 33.93 square kilometers',
      keyFeatures: [
        'Vibrant habitat for rare Bar-headed Geese, Greylag Geese, Spot-billed Pelicans, and Ferruginous Ducks',
        'Breeding ground for globally threatened Greater Adjutant Stork (*Hargila*) and Lesser Adjutant',
        'Traditional country boat rides with local fishermen guides through pristine lotus swamps'
      ]
    },
    culturalSignificance: 'Panidehing showcases the harmonious relationship between Assamese rural riverine communities and waterfowl, and is a vital sanctuary for ornithologists and wildlife photographers.',
    visitorInfo: {
      timings: '06:00 AM – 04:30 PM (Forest checkpost permission required)',
      entryFee: {
        indian: '₹50 per person (Sanctuary entry)',
        foreign: '₹500 per person',
        camera: '₹100 (Still camera), ₹500 (Telephoto lens)'
      },
      bestTimeToVisit: 'November to March (Peak migratory bird congregating months)',
      idealDuration: '3 to 4 hours (Early morning trip recommended)',
      dressCode: 'Earth-toned outdoor clothing (greens, browns), sturdy walking boots, insect repellent'
    },
    nearbyAttractions: [
      { name: 'Disangmukh River Ghat', distance: '12 km', brief: 'Scenic confluence with Mising tribal villages and cuisine' },
      { name: 'Sivasagar Town', distance: '22 km', brief: 'Main historical base' }
    ],
    travelTips: [
      'Carry a spotting scope or telephoto camera lens (300mm–600mm) for bird photography.',
      'Hire a licensed forest boatman at the entry point to glide noiselessly into the heart of the beel.'
    ],
    verifiedFact: 'Flocks of up to 40,000 migratory waterfowl have been recorded wintering in Panidehing in a single season, travelling from as far as Siberia and Central Asia.',
    googleMapsQuery: 'Panidihing+Bird+Sanctuary+Sivasagar'
  },
  {
    id: 'gaurisagar-tank',
    name: 'Gaurisagar Tank & Temples',
    assameseName: 'গৌৰীসাগৰ পুখুৰী আৰু দৌল',
    tagline: 'The 150-Acre Sacred Reservoir & Temple Triad of Queen Phuleswari',
    category: 'Sacred Lake',
    era: 'Ahom Dynasty',
    builtBy: 'Queen Phuleswari (Bar Raja)',
    yearBuilt: '1723–1724 CE',
    location: 'Gaurisagar, NH-715, 12 km west of Sivasagar',
    distanceFromTown: '12 km west of Sivasagar town',
    coordinates: [26.9242, 94.5422],
    heroImage: import.meta.env.BASE_URL + 'images/destinations/gaurisagar.jpg',
    gallery: [
      import.meta.env.BASE_URL + 'images/destinations/gaurisagar.jpg'
    ],
    shortDescription: 'A sprawling 150-acre water reservoir flanked by three soaring 18th-century stone and brick temples dedicated to Lord Shiva, Vishnu, and Devi Durga.',
    historicalBackground: [
      'Built by Bar Raja Queen Phuleswari, formerly a royal court dancer who captivated King Siba Singha and became the first woman to rule the Ahom Kingdom with full sovereign power.',
      'Dedicated to goddess Gauri (Durga), the tank was excavated alongside three grand temples atop its northern bank.',
      'Queen Phuleswari was a devout Shakta patron who struck coins jointly in her name with the king, marking an extraordinary chapter in Assamese royal history.'
    ],
    architecturalDetails: {
      style: 'Ahom-Nilachal brick and stone temple complex',
      materials: 'Hand-molded terracotta bricks, chiseled sandstone plinths, organic mortar',
      dimensions: 'Tank area: 150 acres; Main temple height: ~90 feet',
      keyFeatures: [
        'Triad of monuments: Shiva Dol (central), Vishnu Dol, and Devi Dol',
        'Exterior niche sculptures portraying avatars of Durga Mahishasuramardini and celestial musicians',
        'Vast scenic waterfront flanked by aged raintrees and blooming water lilies'
      ]
    },
    culturalSignificance: 'Gaurisagar celebrates the remarkable political authority and artistic patronage of Ahom women rulers, who governed the empire as supreme monarchs (*Bar Raja*).',
    visitorInfo: {
      timings: '06:00 AM – 06:30 PM (Daily)',
      entryFee: {
        indian: 'Free',
        foreign: 'Free',
        camera: 'Free'
      },
      bestTimeToVisit: 'October to April; peaceful morning or sunset visits',
      idealDuration: '1 hour',
      dressCode: 'Modest casual or temple attire'
    },
    nearbyAttractions: [
      { name: 'Namdang Stone Bridge', distance: '4 km', brief: 'The 1703 monolithic bridge on NH-715' },
      { name: 'Sivasagar Sivadol', distance: '12 km', brief: 'The 104-ft Shiva temple in town' }
    ],
    travelTips: [
      'The quiet banks of Gaurisagar are significantly less crowded than Sivasagar town, making it ideal for peaceful meditation and scenic sunset photography.',
      'Stop here along NH-715 when traveling between Jorhat and Sivasagar.'
    ],
    verifiedFact: 'Queen Phuleswari was the first female ruler of Assam to issue official coins in her own sovereign name inscribed in Persian and Assamese characters.',
    googleMapsQuery: 'Gaurisagar+Tank+Temples+Sivasagar'
  }
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
    year: '1253 CE',
    title: 'Arrival of Chaolung Sukaphaa',
    swargadeo: 'Chaolung Sukaphaa (The Architect of Assam)',
    description: 'Crossing the rugged Patkai mountain ranges from Mong Mao (present-day Yunnan/Upper Myanmar), Prince Sukaphaa arrived in the fertile Brahmaputra Valley and founded the Ahom dynasty at Charaideo, establishing a 600-year united kingdom based on assimilation and respect for local tribes.',
    significance: 'Unification of diverse indigenous peoples under a unified Assamese civilizational ethos.',
    image: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg'
  },
  {
    year: '1540 CE',
    title: 'Establishment of Garhgaon Capital',
    swargadeo: 'Swargadeo Suklengmung (Gargayan Raja)',
    description: 'The capital was moved from Charaideo to Garhgaon along the Dikhow River. The king constructed massive protective ramparts (*Garh*), excavated royal canals, and issued the very first circular Ahom silver coinage.',
    significance: 'Transformed Garhgaon into an impenetrable imperial metropolis and diplomatic capital.',
    image: import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg'
  },
  {
    year: '1671 CE',
    title: 'Battle of Saraighat & Lachit Borphukan',
    swargadeo: 'Swargadeo Udayaditya Singha & General Lachit Borphukan',
    description: 'In one of the most famous naval battles in military history on the waters of the Brahmaputra, General Lachit Borphukan routed the numerically superior Mughal forces led by Ram Singh, famously declaring: "My uncle is not greater than my country."',
    significance: 'Decisively halted Mughal imperial expansion into Northeast India forever.',
    image: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg'
  },
  {
    year: '1696–1714 CE',
    title: 'The Golden Age of Rudra Singha',
    swargadeo: 'Swargadeo Rudra Singha (Sukhrungphaa)',
    description: 'Under Rudra Singha, Ahom power, art, and architecture reached their zenith. He shifted the capital to Rangpur, excavated the colossal Joysagar Tank in memory of his mother Joymoti, built the Namdang Stone Bridge, and patronized music, dance, and literature.',
    significance: 'Golden age of architectural renaissance, trade alliances, and civic engineering.',
    image: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg'
  },
  {
    year: '1744–1750 CE',
    title: 'Erection of Rang Ghar Amphitheatre',
    swargadeo: 'Swargadeo Pramatta Singha',
    description: 'Constructed Asia’s oldest surviving two-storey amphitheatre at Rupahi Pathar, providing a permanent royal stage for traditional bull fights, Bihu folk dance, and martial sports.',
    significance: 'Institutionalized Rongali Bihu as the premier national festival of Assam.',
    image: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg'
  },
  {
    year: '2024 CE',
    title: 'Charaideo Maidams Inscribed as UNESCO World Heritage',
    swargadeo: 'Enduring Legacy of 40+ Ahom Swargadeos',
    description: 'The royal mound-burial system of the Ahom dynasty at Charaideo was officially inscribed into the UNESCO World Heritage List in July 2024, honoring 600 years of unique burial architecture and royal traditions.',
    significance: 'Global recognition of Assam’s historic identity on the world stage.',
    image: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg'
  }
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
    title: 'Royal Ahom Heritage Trail',
    subtitle: 'Palaces, Forts & Secret Tunnels',
    icon: 'Landmark',
    image: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
    description: 'Trace the 600-year path of kings. Walk the vaulted corridors of Talatal Ghar, stand where royal spectators cheered at Rang Ghar, and climb the steps of the step-palace Kareng Ghar.',
    highlights: [
      'Guided walk through Talatal Ghar’s military arcades',
      'Acoustic marvels and royal balcony at Rang Ghar',
      'Panoramic terrace view at Kareng Ghar, Garhgaon',
      'Stone craftsmanship of the 1703 Namdang Bridge'
    ]
  },
  {
    id: 'culinary-journey',
    title: 'Authentic Assamese Gastronomy',
    subtitle: 'Khar, Duck Roast, Pitha & Organic Flavors',
    icon: 'UtensilsCrossed',
    image: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
    description: 'Savor genuine Upper Assamese cuisine prepared with zero artificial spices, fragrant Joha rice, fresh river fish, and slow-cooked duck with ash gourd (*Kumura*).',
    highlights: [
      'Omita Khar (traditional alkaline raw papaya dish)',
      'Hanh aru Kumura (Tender Duck curry cooked with ash gourd)',
      'Masor Tenga (Tangy light fish curry with Ou tenga / tomato)',
      'Bora Saul with Doi & Gur (Sticky rice with curd and jaggery)',
      'Freshly brewed Upper Assam orthodox second-flush black tea'
    ]
  },
  {
    id: 'cultural-textiles',
    title: 'Golden Muga Silk & Handloom Weaving',
    subtitle: 'Assam’s Royal Golden Fabric',
    icon: 'Sparkles',
    image: import.meta.env.BASE_URL + 'images/destinations/tai-museum.jpg',
    description: 'Witness the world-famous natural golden Muga silk, endemic exclusively to Assam. Visit local weavers producing exquisite Mekhela Sador adorned with traditional Kingkhap motifs.',
    highlights: [
      'Muga silk cocoons harvested from Som and Soalu trees',
      'Intricate Kingkhap (royal Ahom peacock and lion) brocade weaving',
      'Handcrafted Assamese brassware (Xorai and Bota) in Sivasagar markets',
      'Jaapi making (conical woven bamboo hat of Assam)'
    ]
  },
  {
    id: 'nature-birdwatching',
    title: 'Wetland Safari & Avian Photography',
    subtitle: 'Panidehing Sanctuary & River Confluences',
    icon: 'Compass',
    image: import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg',
    description: 'Drift along serene country boats in Panidehing’s lotus swamps to spot over 165 species of migratory geese, pelicans, and endangered storks against the morning mist.',
    highlights: [
      'Bar-headed Geese flying against the distant Patkai hills',
      'Rare sightings of Greater Adjutant Stork (*Hargila*)',
      'Sunset country boat cruise across Disangmukh riverbank',
      'Encounter Mising tribal river hamlets with stilt houses'
    ]
  },
  {
    id: 'festivals-bihu',
    title: 'Rongali Bihu & Me-Dam-Me-Phi',
    subtitle: 'Rhythms of Dhol, Pepa & Ancestral Homage',
    icon: 'Music',
    image: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
    description: 'Feel the electrifying resonance of the buffalo-horn Pepa and wild Dhol drums during Bohag Bihu at the historic Rupahi Pathar, or join the solemn prayers of Me-Dam-Me-Phi at Charaideo.',
    highlights: [
      'Traditional Bihu Husori troupes dancing in Muga silk attire',
      'Me-Dam-Me-Phi ancestral worship ritual on January 31',
      'Maha Shivaratri carnival on the embankments of Borpukhuri',
      'Moh-juj (buffalo fighting exhibition) during Magh Bihu'
    ]
  }
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
    title: '1-Day Classic Royal Highlights',
    description: 'Perfect for quick travelers who want to see the premier monuments of Sivasagar.',
    schedule: [
      {
        day: 1,
        title: 'The Royal Citadel & Sacred Waters',
        morning: '08:30 AM: Start at Rang Ghar amphitheatre, then walk 1.2 km to explore the seven levels and tunnels of Talatal Ghar.',
        afternoon: '01:00 PM: Relish an authentic Assamese thali with fish tenga and Joha rice in town. Then visit Joysagar Tank & Joydol.',
        evening: '04:30 PM: Visit Sivadol temple and stroll around Borpukhuri lake front at golden hour sunset.',
        culinaryHighlight: 'Assamese duck roast with ash gourd and hot pitha with Assam tea.'
      }
    ]
  },
  twoDay: {
    title: '2-Day Heritage & UNESCO Discovery',
    description: 'Deep dive into royal palaces and the UNESCO World Heritage Maidams of Charaideo.',
    schedule: [
      {
        day: 1,
        title: 'Heart of the Ahom Kingdom',
        morning: 'Visit Rang Ghar, Talatal Ghar, and the 1703 Namdang Stone Bridge on NH-715.',
        afternoon: 'Explore Joysagar Tank, Joydol, and the Assam Tai Museum on Borpukhuri.',
        evening: 'Sunset boat ride or tranquil walk at Sivadol, followed by exploring the local market for Muga silk.',
        culinaryHighlight: 'Traditional Omita Khar and Masor Tenga.'
      },
      {
        day: 2,
        title: 'Imperial Garhgaon & Charaideo Maidams',
        morning: '09:00 AM: Drive 15 km to Garhgaon to explore the step-pyramidal Kareng Ghar palace.',
        afternoon: '01:00 PM: Head to Charaideo Hillock to explore the sacred royal burial mounds (UNESCO World Heritage).',
        evening: 'Drive through verdant tea gardens of Nazira before returning to town for evening tea.',
        culinaryHighlight: 'Til Pitha, Ghila Pitha, and smoked pork/fish at an authentic heritage eatery.'
      }
    ]
  },
  threeDay: {
    title: '3-Day Complete Sivasagar & Nature Immersion',
    description: 'The ultimate royal experience covering all monuments, UNESCO site, and Panidehing bird sanctuary.',
    schedule: [
      {
        day: 1,
        title: 'Town Heritage & Sacred Temples',
        morning: 'Explore Sivadol, Vishnudol, Devidol, and the Assam Tai Museum on Borpukhuri.',
        afternoon: 'Gaurisagar Tank and temples, followed by Namdang Stone Bridge.',
        evening: 'Sunset photography at Borpukhuri and shopping for handloom gamosas.',
        culinaryHighlight: 'Traditional Assamese Thali with aromatic Joha rice.'
      },
      {
        day: 2,
        title: 'Imperial Palaces & UNESCO Maidams',
        morning: 'Explore Rang Ghar, Talatal Ghar, and Joysagar Tank complex.',
        afternoon: 'Visit Kareng Ghar in Garhgaon and proceed to the sacred Charaideo Maidams.',
        evening: 'Tea tasting at a heritage tea estate bungalow near Nazira.',
        culinaryHighlight: 'Hanh aru Kumura (Duck with ash gourd) cooked over wood fire.'
      },
      {
        day: 3,
        title: 'Wild Wetlands of Panidehing & River Culture',
        morning: '06:00 AM early morning excursion to Panidehing Bird Sanctuary for migratory bird watching.',
        afternoon: 'Visit Disangmukh to experience Mising tribal culture, stilt architecture, and traditional weaving.',
        evening: 'Farewell sunset cruise on the Brahmaputra tributary.',
        culinaryHighlight: 'Fish cooked inside bamboo hollow (*Banhortung Mas*) and Apong.'
      }
    ]
  }
};

export const FAQS = [
  {
    question: 'How do I reach Sivasagar?',
    answer: 'By Air: Nearest airports are Jorhat Airport (JRH, 60 km / 1.5 hrs drive) and Dibrugarh Airport (DIB, 80 km / 2 hrs drive), both well connected to Delhi, Kolkata, and Guwahati. By Rail: Sivasagar Town Railway Station (SRTN) connects to Guwahati; major junction Simaluguri Jn (SLGR, 16 km away) is serviced by Rajdhani and express trains. By Road: Sivasagar is directly on National Highway 715 (NH-715) with luxury night super buses from Guwahati (360 km, 7-8 hours).'
  },
  {
    question: 'When is the best time to visit Sivasagar?',
    answer: 'The optimal season is from October to April when the weather is pleasantly cool, dry, and sunny (temperatures 12°C to 28°C). Rongali Bihu in mid-April offers incredible cultural festivities. Maha Shivaratri in February/March brings huge vibrant celebrations at Sivadol. For birdwatchers, November to February is peak season at Panidehing and Joysagar.'
  },
  {
    question: 'What is special about the mortar used in Sivasagar monuments?',
    answer: 'Ahom architects used a remarkable indigenous bio-mortar called "Karpatia Churna". It was concocted using sticky Bora rice (Bora saul), duck eggs, pulses (Mati mah), snail lime, and fish oil. This organic formulation produced an elastic yet indestructible bonding agent that has preserved monuments like Rang Ghar and Talatal Ghar through severe regional earthquakes for over 300 years.'
  },
  {
    question: 'Are the secret underground tunnels of Talatal Ghar open to the public?',
    answer: 'Currently, the deep subterranean levels and underground escape tunnels (which historically led 16 km to Garhgaon Palace and 3 km to the Dikhow River) are sealed off by the Archaeological Survey of India (ASI) for visitor safety and structural preservation. However, all the grand above-ground storeys, arched corridors, and gun storage chambers are fully accessible for exploration.'
  },
  {
    question: 'Why was Charaideo Maidams designated a UNESCO World Heritage Site in 2024?',
    answer: 'Charaideo Maidams was inscribed on the UNESCO World Heritage List in July 2024 under cultural criteria (iii) and (iv) as an extraordinary testimony to the 600-year mound-burial tradition of the Tai-Ahom dynasty. The 90+ royal tumuli showcase sophisticated subterranean stone and brick vault architecture, representing the only surviving Tai funerary landscape of this scale in the world.'
  },
  {
    question: 'What local handicrafts and souvenirs should I buy in Sivasagar?',
    answer: 'Must-buys include authentic golden Muga silk sarees and Mekhela Sadors, warm Eri (Ahimsa) silk shawls, hand-carved miniature wooden Rang Ghar models, brass Xorai and Bota utensils, traditional Assamese Jaapi (bamboo conical hat), and single-estate orthodox Assam black tea from local gardens.'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Rang Ghar Royal Amphitheatre',
    location: 'Joysagar, Sivasagar',
    category: 'Monuments',
    image: import.meta.env.BASE_URL + 'images/destinations/rang-ghar.jpg',
    caption: 'Asia’s oldest royal sports amphitheatre with its iconic boat-shaped roof built by King Pramatta Singha.'
  },
  {
    id: 2,
    title: 'Majestic Sivadol Shikhara & Kalasha',
    location: 'Borpukhuri, Sivasagar',
    category: 'Temples',
    image: import.meta.env.BASE_URL + 'images/destinations/sivadol.JPG',
    caption: 'The 104-foot tall Shiva temple crowned by an authentic 8-foot pure gold dome (Kalasha).'
  },
  {
    id: 3,
    title: 'Talatal Ghar Military Fort & Citadel',
    location: 'Rangpur, Sivasagar',
    category: 'Architecture',
    image: import.meta.env.BASE_URL + 'images/destinations/talatal-ghar.jpg',
    caption: 'Vaulted brick passageways and defensive barracks of the Ahom imperial citadel.'
  },
  {
    id: 4,
    title: 'Serene Waters of Joysagar & Joydol',
    location: 'Joysagar',
    category: 'Lakes',
    image: import.meta.env.BASE_URL + 'images/destinations/joysagar.jpg',
    caption: 'Asia’s largest historical excavated tank spanning 318 acres of tranquil water.'
  },
  {
    id: 5,
    title: 'Charaideo Royal Maidams (UNESCO 2024)',
    location: 'Charaideo Hillock',
    category: 'UNESCO Heritage',
    image: import.meta.env.BASE_URL + 'images/destinations/charaideo.jpg',
    caption: 'The sacred royal pyramids of Ahom Swargadeos, inscribed by UNESCO in July 2024.'
  },
  {
    id: 6,
    title: 'Kareng Ghar (Garhgaon Palace)',
    location: 'Garhgaon, Nazira',
    category: 'Architecture',
    image: import.meta.env.BASE_URL + 'images/destinations/kareng-ghar.jpg',
    caption: 'The seven-storeyed step-pyramidal palace and royal coronation seat of the Ahom monarchs.'
  },
  {
    id: 7,
    title: 'Namdang 1703 Monolithic Stone Bridge',
    location: 'Over Namdang River, NH-715',
    category: 'Monuments',
    image: import.meta.env.BASE_URL + 'images/destinations/namdang.jpg',
    caption: 'Carved out of a single gigantic sandstone slab in 1703 CE, still bearing vehicular highway traffic today.'
  },
  {
    id: 8,
    title: 'Migratory Waterfowl of Panidehing',
    location: 'Panidehing Sanctuary',
    category: 'Nature',
    image: import.meta.env.BASE_URL + 'images/destinations/panidehing.jpg',
    caption: 'Wintering waterfowl congregate over pristine wetland marshes along the Brahmaputra floodplains.'
  },
  {
    id: 9,
    title: 'Gaurisagar Devidol & Sacred Lake',
    location: 'Gaurisagar, Sivasagar',
    category: 'Lakes',
    image: import.meta.env.BASE_URL + 'images/destinations/gaurisagar.jpg',
    caption: 'The 150-acre reservoir and temple triad commissioned by Queen Phuleswari in 1723 CE.'
  }
];
