export const WORLDS_DATA = [
  {
    id: '01',
    code: 'BLACK LAKE AQUATIC',
    title: 'BLACK LAKE COVE',
    subtitle: 'AQUA CHARMS ZONE',
    description: 'Dive into the enchanted Black Lake guarded by Merpeople. Master Gillyweed underwater breathing, aquatic charms, and dark creature defense.',
    bg: '/img/bg/swimmingpool.png',
    character: '/img/ch1.png',
    characterName: 'SYRENIA LAKE',
    role: 'AQUA HERBOLOGIST',
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    stats: { temp: '16°C Enchanted', depth: '40m Abyss', creature: 'Giant Squid' }
  },
  {
    id: '02',
    code: 'POTIONS LAB',
    title: 'DUNGEON ALCHEMY',
    subtitle: 'POTIONS MASTERCLASS',
    description: 'Brew Felix Felicis, Polyjuice Potion, and Elixir of Life over bubbling cauldrons in the Hogwarts Dungeons under expert guidance.',
    bg: '/img/bg/spa.png',
    character: '/img/ch2.png',
    characterName: 'SEVERUS DRAUGHT',
    role: 'POTIONS MASTER',
    accentColor: '#e5b96a',
    glowColor: 'rgba(229, 185, 106, 0.4)',
    stats: { ingredients: 'Boomslang & Bezoar', cauldrons: 'Pewter No.2', purity: '100%' }
  },
  {
    id: '03',
    code: 'GREAT HALL FEAST',
    title: 'GREAT HALL BANQUET',
    subtitle: 'FEAST & BUTTERBEER',
    description: 'Dine under floating candles and changing enchanted ceilings. Enjoy endless pitchers of foaming Butterbeer, Pumpkin Pasties, and Roast Pheasant.',
    bg: '/img/bg/cafitaria.png',
    character: '/img/ch3.png',
    characterName: 'HELGA FEASTSMITH',
    role: 'HEAD HOUSE ELVES CHEF',
    accentColor: '#ff9900',
    glowColor: 'rgba(255, 153, 0, 0.4)',
    stats: { candles: '1,000 Floating', butterbeer: 'On Tap', houseTables: '4 House Sets' }
  },
  {
    id: '04',
    code: 'DARK ARTS DEFENSE',
    title: 'DUELING SANCTUARY',
    subtitle: 'DEFENSE AGAINST DARK ARTS',
    description: 'Master Expelliarmus, Stupefy, and Expecto Patronum in our spellcasting dueling arena equipped with target Boggarts and enchanted dummies.',
    bg: '/img/bg/virtuvalgame.png',
    character: '/img/ch4.png',
    characterName: 'AUROR VANCE',
    role: 'GRAND DUELMASTER',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    stats: { spellsUnlocked: '24 Charms', boggartPods: '8 Arenas', wandSync: 'Sub-second' }
  },
  {
    id: '05',
    code: 'REQUIREMENT ROOM',
    title: 'WIZARD CHESS TOWER',
    subtitle: 'STRATEGY & ANCIENT RELICS',
    description: 'Step into the Room of Requirement for life-sized Wizard Chess battles, Exploding Snap duels, and ancient rune deciphering.',
    bg: '/img/bg/boardgamecafe.png',
    character: '/img/ch5.png',
    characterName: 'STRATOS ALBUS',
    role: 'CHESS GRANDMASTER',
    accentColor: '#ff3366',
    glowColor: 'rgba(255, 51, 102, 0.4)',
    stats: { chessPieces: 'Enchanted Marble', strategyDecks: '150+ Spells', difficulty: 'Auror' }
  },
  {
    id: '06',
    code: 'QUIDDITCH PITCH',
    title: 'CHAMPIONSHIP PITCH',
    subtitle: 'HIGH-FLYING ARENA',
    description: 'Mount your Firebolt broomstick and chase the Golden Snitch while dodging Bludgers across the legendary Hogwarts Quidditch Stadium.',
    bg: '/img/bg/turf.png',
    character: '/img/ch6.png',
    characterName: 'SEEKER BLAZE',
    role: 'GRYFFINDOR CAPTAIN',
    accentColor: '#00ff88',
    glowColor: 'rgba(0, 255, 136, 0.4)',
    stats: { broom: 'Firebolt Supreme', snitchSpeed: '120 mph', spectators: '5,000' }
  },
  {
    id: '07',
    code: 'DRAGON SAUNA',
    title: 'DRAGON FIRE CHAMBER',
    subtitle: 'THERMAL PHOENIX RECOVERY',
    description: 'Relax in dragon-fire thermal chambers warmed by Norwegian Ridgeback heat stones and soothing Phoenix feather steam aromatherapy.',
    bg: '/img/bg/sauna.png',
    character: '/img/ch7.png',
    characterName: 'IGNIS DRAGONLORD',
    role: 'THERMAL GUARDIAN',
    accentColor: '#ff5500',
    glowColor: 'rgba(255, 85, 0, 0.4)',
    stats: { heatSource: 'Dragon Fire', steam: 'Phoenix Essence', detox: '100%' }
  }
];

export const INITIAL_USER_PROFILE = {
  id: 'WIZ-934812',
  name: 'HARRY "HORCRUX" POTTER',
  house: 'Gryffindor',
  wand: '11" Holly, Phoenix Feather Core',
  patronus: 'Stag',
  galleons: 4850,
  sickles: 14,
  knuts: 21,
  rank: 'AUROR FIRST CLASS',
  level: 8,
  xp: 3450,
  nextLevelXp: 4500,
  avatar: '/img/ch2.png',
  housePoints: 480,
  visits: {
    swimming: 14,
    spa: 9,
    cafeteria: 28,
    virtualGames: 16,
    boardGames: 11,
    turf: 22,
    sauna: 8
  },
  achievements: [
    { title: 'LUMOS MAXIMA', desc: 'Mastered Light & Wand Manipulation', date: '2026-08-10' },
    { title: 'TRIWIZARD CHAMPION', desc: 'Conquered the Hungarian Horntail Dragon', date: '2026-08-18' },
    { title: 'HORCRUX HUNTER', desc: 'Destroyed Tom Riddle\'s Diary & Marvolo\'s Ring', date: '2026-09-01' },
    { title: 'GOLDEN SNITCH CAPTAIN', desc: 'Caught Snitch in under 3 minutes', date: '2026-09-08' }
  ],
  bookings: [
    { id: 'BK-9921', zone: 'POTIONS LAB — DUNGEON ALCHEMY', date: '2026-09-24', time: '16:00', players: 2, status: 'CONFIRMED' },
    { id: 'BK-9945', zone: 'QUIDDITCH PITCH — CHAMPIONSHIP MATCH', date: '2026-09-26', time: '19:30', players: 4, status: 'CONFIRMED' }
  ]
};

export const AGENT_COMMANDS = [
  { command: 'LUMOS', zoneId: '01', response: 'Enchanting wand light activated. Aquatic sanctuary paths illuminated.' },
  { command: 'BREW FELIX', zoneId: '02', response: 'Potions cauldron preheated to 100°C. Liquid Luck ingredients loaded.' },
  { command: 'BUTTERBEER', zoneId: '03', response: 'Great Hall feast table reserved. Cold foaming Butterbeer queued.' },
  { command: 'EXPECTO PATRONUM', zoneId: '04', response: 'Silver Stag Patronus summoned. Dueling sanctuary wards enabled.' },
  { command: 'WIZARD CHESS', zoneId: '05', response: 'Room of Requirement unlocked. Marble knight & queen pieces active.' },
  { command: 'FLY BROOM', zoneId: '06', response: 'Firebolt broomstick tuned. Golden Snitch released into pitch.' },
  { command: 'DRAGON SAUNA', zoneId: '07', response: 'Dragon fire thermal stones heated. Phoenix ash steam initialized.' }
];

export const GALLERY_ITEMS = [
  { title: 'GREAT HALL FLOATING CANDLES', category: 'GREAT HALL', img: '/img/bg/cafitaria.png' },
  { title: 'DUNGEON ALCHEMY & POTIONS', category: 'POTIONS', img: '/img/bg/spa.png' },
  { title: 'BLACK LAKE MERPEOPLE COVE', category: 'AQUA CHARMS', img: '/img/bg/swimmingpool.png' },
  { title: 'DUELING SANCTUARY ARENA', category: 'DARK ARTS', img: '/img/bg/virtuvalgame.png' },
  { title: 'ROOM OF REQUIREMENT RELICS', category: 'ROOM OF REQUIREMENT', img: '/img/bg/boardgamecafe.png' },
  { title: 'QUIDDITCH WORLD CUP PITCH', category: 'QUIDDITCH', img: '/img/bg/turf.png' },
  { title: 'DRAGON FIRE THERMAL CHAMBER', category: 'DRAGON SAUNA', img: '/img/bg/sauna.png' }
];
