// HOGWARTS MAGICAL TRIALS & HOUSE TOURNAMENTS DATA ARCHITECTURE

export const INITIAL_EVENTS = [
  {
    id: 'ev-1',
    number: '01',
    title: 'TRIWIZARD TOURNAMENT MAZE',
    tagline: 'QUIDDITCH + DARK ARTS COMBINED SHOWDOWN',
    description: 'The premier magical championship of Hogwarts. Wizards navigate the enchanted hedges of the Triwizard Maze before dueling dark creatures and claiming the Triwizard Cup.',
    category: 'TOURNAMENTS',
    activityId: 'TURF',
    activityTitle: 'QUIDDITCH & DUELING',
    date: '28 SEP 2026',
    startTime: '07:00 PM',
    endTime: '11:00 PM',
    location: 'TRIWIZARD MAZE & GREAT HALL',
    capacity: 48,
    participants: 32,
    entryFee: 500,
    entryFeeFormatted: '⚡ 500 Galleons',
    xpReward: 500,
    rewardPoints: 300,
    duration: '4 HOURS',
    status: 'REGISTRATION OPEN',
    image: '/img/bg/turf.png',
    character: '/img/ch6.png',
    characterName: 'SEEKER BLAZE',
    accentColor: '#00ff88',
    format: '4 House Knockout Brackets',
    hasTournamentBracket: true,
    tournamentId: 'tour-1',
    rules: [
      'Each House squad requires 5 Champion Wizards + 2 Substitutes.',
      'Maze Stage: Dodge Sphinx riddles and Blast-Ended Skrewts.',
      'Dueling Stage: Best of 3 spellcasting rounds in the Great Hall.',
      'All Champions must check in with the Goblet of Fire 20 mins prior.'
    ],
    prizes: [
      { place: '1ST PLACE', prize: '⚡ 15,000 Galleons + 1,000 XP + TRIWIZARD CUP CHAMPION BADGE' },
      { place: '2ND PLACE', prize: '⚡ 8,000 Galleons + 700 XP + HOUSE FINALIST BADGE' },
      { place: '3RD PLACE', prize: '⚡ 4,000 Galleons + 500 XP' }
    ],
    featured: true
  },
  {
    id: 'ev-2',
    number: '02',
    title: 'HOGWARTS HOUSE QUIDDITCH CUP',
    tagline: 'INTER-HOUSE CHAMPIONSHIP MATCH',
    description: 'High-octane broomstick competition. Gryffindor vs Slytherin, sudden-death Golden Snitch release, and live Great Hall commentary by Lee Jordan.',
    category: 'QUIDDITCH',
    activityId: 'TURF',
    activityTitle: 'QUIDDITCH PITCH',
    date: '28 SEP 2026',
    startTime: '07:00 PM',
    endTime: '10:30 PM',
    location: 'QUIDDITCH STADIUM',
    capacity: 48,
    participants: 32,
    entryFee: 500,
    entryFeeFormatted: '⚡ 500 Galleons',
    xpReward: 500,
    rewardPoints: 300,
    duration: '3.5 HOURS',
    status: 'REGISTRATION OPEN',
    image: '/img/bg/turf.png',
    character: '/img/ch6.png',
    characterName: 'SEEKER BLAZE',
    accentColor: '#00ff88',
    format: 'Inter-House Elimination',
    hasTournamentBracket: true,
    tournamentId: 'tour-2',
    rules: [
      'Standard Ministry Quidditch Regulations apply.',
      '150 points granted upon catching the Golden Snitch.',
      'Beaters permitted enchanted Bludger rebounds.'
    ],
    prizes: [
      { place: 'CHAMPIONS', prize: '⚡ 12,000 Galleons + House Cup Trophy + 1,000 XP' },
      { place: 'RUNNER UP', prize: '⚡ 6,000 Galleons + 700 XP' }
    ],
    featured: false
  },
  {
    id: 'ev-3',
    number: '03',
    title: 'GREAT HALL DUELING CLUB',
    tagline: '1V1 WAND SPELLCASTING SHOWDOWN',
    description: 'Step onto the dueling stage in the Great Hall. Compete in 1v1 wand duels using Expelliarmus, Protego, and Stupefy charms.',
    category: 'DARK ARTS',
    activityId: 'VIRTUAL GAMES',
    activityTitle: 'DUELING SANCTUARY',
    date: '29 SEP 2026',
    startTime: '06:00 PM',
    endTime: '09:30 PM',
    location: 'GREAT HALL DUELING STAGE',
    capacity: 24,
    participants: 22,
    entryFee: 400,
    entryFeeFormatted: '⚡ 400 Galleons',
    xpReward: 450,
    rewardPoints: 250,
    duration: '3.5 HOURS',
    status: 'ALMOST FULL',
    image: '/img/bg/virtuvalgame.png',
    character: '/img/ch4.png',
    characterName: 'AUROR VANCE',
    accentColor: '#a855f7',
    format: '1v1 Double Elimination',
    hasTournamentBracket: true,
    tournamentId: 'tour-3',
    rules: [
      'Unforgivable Curses strictly forbidden.',
      'Best of 3 disarming spells per dueling match.',
      'Wand core telemetry monitored by Ministry Officials.'
    ],
    prizes: [
      { place: '1ST PLACE', prize: '⚡ 10,000 Galleons + 900 XP + Master Duellist Wand' },
      { place: '2ND PLACE', prize: '⚡ 5,000 Galleons + 600 XP' }
    ],
    featured: false
  },
  {
    id: 'ev-4',
    number: '04',
    title: 'GRAND WIZARD CHESS TOURNAMENT',
    tagline: 'STRATEGIC MARBLE CHESS MASTERY',
    description: 'Command live enchanted marble chess pieces in the Room of Requirement. Master tactical piece sacrifices and royal checkmates.',
    category: 'ROOM OF REQUIREMENT',
    activityId: 'BOARD GAMES',
    activityTitle: 'ROOM OF REQUIREMENT',
    date: '30 SEP 2026',
    startTime: '04:00 PM',
    endTime: '08:30 PM',
    location: 'ROOM OF REQUIREMENT TOWER',
    capacity: 16,
    participants: 16,
    entryFee: 300,
    entryFeeFormatted: '⚡ 300 Galleons',
    xpReward: 400,
    rewardPoints: 200,
    duration: '4.5 HOURS',
    status: 'ALMOST FULL',
    image: '/img/bg/boardgamecafe.png',
    character: '/img/ch5.png',
    characterName: 'STRATOS ALBUS',
    accentColor: '#ff3366',
    format: 'Swiss Round + Top 4 Cut',
    hasTournamentBracket: false,
    rules: [
      'Timed turns: 90 seconds maximum per move.',
      'Enchanted pieces execute commands via spoken Latin.',
      'Complimentary Butterbeer provided.'
    ],
    prizes: [
      { place: '1ST PLACE', prize: '⚡ 7,500 Galleons + 800 XP + Grandmaster Knight Sigil' },
      { place: '2ND PLACE', prize: '⚡ 3,500 Galleons + 500 XP' }
    ],
    featured: false
  },
  {
    id: 'ev-5',
    number: '05',
    title: 'BLACK LAKE MERPEOPLE RACE',
    tagline: 'UNDERWATER GILLYWEED SPRINTS',
    description: 'Swim through underwater caverns beneath the Black Lake. Individual 50m and squad relay Gillyweed aqua sprints.',
    category: 'AQUA CHARMS',
    activityId: 'SWIMMING',
    activityTitle: 'BLACK LAKE COVE',
    date: '02 OCT 2026',
    startTime: '08:00 PM',
    endTime: '10:30 PM',
    location: 'BLACK LAKE ABYSS',
    capacity: 20,
    participants: 12,
    entryFee: 350,
    entryFeeFormatted: '⚡ 350 Galleons',
    xpReward: 350,
    rewardPoints: 200,
    duration: '2.5 HOURS',
    status: 'UPCOMING',
    image: '/img/bg/swimmingpool.png',
    character: '/img/ch1.png',
    characterName: 'SYRENIA LAKE',
    accentColor: '#00f0ff',
    format: 'Timed Underwater Heats',
    hasTournamentBracket: false,
    rules: [
      'Gillyweed potion provided prior to race.',
      'Merpeople referee checkpoints active.'
    ],
    prizes: [
      { place: '1ST PLACE', prize: '⚡ 6,000 Galleons + 750 XP + Trident Crest' },
      { place: '2ND PLACE', prize: '⚡ 3,000 Galleons + 450 XP' }
    ],
    featured: false
  },
  {
    id: 'ev-6',
    number: '06',
    title: 'GRYFFINDOR VS SLYTHERIN CLASH',
    tagline: 'LIVE QUIDDITCH MATCH IN PROGRESS',
    description: 'Rivalry match between Gryffindor Chasers and Slytherin Seekers. Live Great Hall broadcast and real-time score updates.',
    category: 'TOURNAMENTS',
    activityId: 'TURF',
    activityTitle: 'QUIDDITCH PITCH',
    date: 'Today',
    startTime: '08:30 PM',
    endTime: '10:00 PM',
    location: 'MAIN STADIUM',
    capacity: 16,
    participants: 16,
    entryFee: 0,
    entryFeeFormatted: 'FREE (SPECTATOR)',
    xpReward: 300,
    rewardPoints: 150,
    duration: 'LIVE',
    status: 'LIVE',
    image: '/img/bg/turf.png',
    character: '/img/ch6.png',
    characterName: 'SEEKER BLAZE',
    accentColor: '#d4af37',
    format: 'Live Rivalry Match',
    hasTournamentBracket: true,
    tournamentId: 'tour-1',
    liveMatch: {
      round: 'SEMI FINAL',
      teamA: 'GRYFFINDOR LIONS',
      teamB: 'SLYTHERIN SERPENTS',
      scoreA: 170,
      scoreB: 140,
      minute: "68'",
      status: 'LIVE ●'
    },
    rules: [
      'Great Hall spectating open to all wizards.',
      'Live magical commentary active.'
    ],
    prizes: [
      { place: 'WINNER', prize: 'Advancement to Final + 1,000 House Points' }
    ],
    featured: false
  },
  {
    id: 'ev-7',
    number: '07',
    title: 'DUNGEON ALCHEMY MASTERCLASS',
    tagline: 'POTIONS & FELIX FELICIS BREWING',
    description: 'Masterclass session on brewing Felix Felicis (Liquid Luck) and Draught of Peace in the Hogwarts Dungeons.',
    category: 'COMMUNITY',
    activityId: 'SPA',
    activityTitle: 'POTIONS LAB',
    date: '10 SEP 2026',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    location: 'DUNGEONS SECTORS A-C',
    capacity: 30,
    participants: 30,
    entryFee: 600,
    entryFeeFormatted: '⚡ 600 Galleons',
    xpReward: 300,
    rewardPoints: 200,
    duration: '3 HOURS',
    status: 'COMPLETED',
    image: '/img/bg/spa.png',
    character: '/img/ch2.png',
    characterName: 'SEVERUS DRAUGHT',
    accentColor: '#d4af37',
    format: 'Guided Masterclass',
    hasTournamentBracket: false,
    rules: ['Safety goggles and dragon-hide gloves mandatory.'],
    prizes: [{ place: 'ALL PARTICIPANTS', prize: 'Master Alchemist Certificate + 300 XP' }],
    featured: false
  }
];

export const INITIAL_TOURNAMENTS = [
  {
    id: 'tour-1',
    eventId: 'ev-1',
    name: 'TRIWIZARD TOURNAMENT BRACKET',
    format: '4-House Knockout',
    currentRound: 'SEMI FINAL',
    status: 'LIVE',
    winner: null,
    rounds: [
      {
        name: 'ROUND 1 (QUARTERFINALS)',
        matches: [
          {
            id: 'm1',
            teamA: { name: 'GRYFFINDOR LIONS', score: 180, isWinner: true, captain: 'HARRY POTTER' },
            teamB: { name: 'SLYTHERIN VIPERS', score: 120, isWinner: false, captain: 'DRACO MALFOY' },
            status: 'COMPLETED',
            arena: 'STADIUM PITCH 1'
          },
          {
            id: 'm2',
            teamA: { name: 'RAVENCLAW EAGLES', score: 90, isWinner: false, captain: 'CHO CHANG' },
            teamB: { name: 'SLYTHERIN SERPENTS', score: 150, isWinner: true, captain: 'BLAISE ZABINI' },
            status: 'COMPLETED',
            arena: 'STADIUM PITCH 2'
          }
        ]
      },
      {
        name: 'ROUND 2 (SEMI FINALS)',
        matches: [
          {
            id: 'm5',
            teamA: { name: 'GRYFFINDOR LIONS', score: 170, isWinner: null, captain: 'HARRY POTTER' },
            teamB: { name: 'SLYTHERIN SERPENTS', score: 140, isWinner: null, captain: 'BLAISE ZABINI' },
            status: 'LIVE',
            arena: 'MAIN STADIUM',
            liveMinute: "68'"
          }
        ]
      },
      {
        name: 'GRAND FINAL',
        matches: [
          {
            id: 'm7',
            teamA: { name: 'TBD (SEMI WINNER)', score: 0, isWinner: null },
            teamB: { name: 'HUFFLEPUFF BADGERS', score: 0, isWinner: null },
            status: 'UPCOMING',
            arena: 'GREAT HALL ARENA',
            scheduledTime: '10:15 PM'
          }
        ]
      }
    ]
  }
];

export const INITIAL_TEAMS = [
  {
    id: 'tm-1',
    name: 'GRYFFINDOR LIONS',
    captainId: 'WIZ-934812',
    captainName: 'HARRY POTTER',
    memberIds: ['WIZ-934812', 'WIZ-00219', 'WIZ-00305', 'WIZ-00412', 'WIZ-00633'],
    membersCount: 5,
    tag: 'GRYF',
    wins: 8,
    losses: 1,
    score: 1240,
    level: 18,
    activeTournament: 'TRIWIZARD TOURNAMENT'
  },
  {
    id: 'tm-2',
    name: 'SLYTHERIN SERPENTS',
    captainId: 'WIZ-00219',
    captainName: 'DRACO MALFOY',
    memberIds: ['WIZ-00219', 'WIZ-00501', 'WIZ-00502', 'WIZ-00503', 'WIZ-00504'],
    membersCount: 5,
    tag: 'SLYTH',
    wins: 7,
    losses: 2,
    score: 1180,
    level: 16,
    activeTournament: 'TRIWIZARD TOURNAMENT'
  }
];

export const INITIAL_EVENT_REGISTRATIONS = [
  {
    id: 'HXEV-02841',
    eventId: 'ev-1',
    eventTitle: 'TRIWIZARD TOURNAMENT MAZE',
    userId: 'WIZ-934812',
    playerName: 'HARRY POTTER',
    teamId: 'tm-1',
    teamName: 'GRYFFINDOR LIONS',
    isCaptain: true,
    paymentId: 'HXPAY-829104',
    paymentStatus: 'PAID',
    entryFeePaid: 500,
    date: '28 SEP 2026',
    time: '07:00 PM',
    status: 'CONFIRMED',
    xpEarned: 500,
    pointsEarned: 300,
    resultStatus: 'LIVE (IN SEMI FINAL)',
    createdAt: '2026-09-15T14:30:00Z'
  }
];

export const INITIAL_EVENT_LEADERBOARDS = [
  { rank: '01', name: 'GRYFFINDOR LIONS', level: 18, xp: '18,450 XP', wins: 8, losses: 1, score: 1240, badge: 'TRIWIZARD CHAMPION', category: 'QUIDDITCH' },
  { rank: '02', name: 'SLYTHERIN SERPENTS', level: 16, xp: '15,200 XP', wins: 7, losses: 2, score: 1180, badge: 'DUELMASTER', category: 'DARK ARTS' },
  { rank: '03', name: 'RAVENCLAW EAGLES', level: 15, xp: '14,100 XP', wins: 6, losses: 2, score: 1050, badge: 'RUNE MASTER', category: 'ROOM OF REQUIREMENT' },
  { rank: '04', name: 'HUFFLEPUFF BADGERS', level: 14, xp: '12,900 XP', wins: 5, losses: 3, score: 980, badge: 'HERBOLOGIST', category: 'AQUA CHARMS' }
];

export const EVENT_ACHIEVEMENTS = [
  {
    id: 'ach-ev-1',
    title: 'TRIWIZARD CHAMPION',
    description: 'Enlist and participate in your first official Hogwarts Tournament.',
    xpReward: 150,
    pointsReward: 100,
    unlocked: true,
    progress: '1/1'
  },
  {
    id: 'ach-ev-2',
    title: 'ORDER OF MERIT',
    description: 'Complete 5 wizarding duels across Hogwarts Sanctuary.',
    xpReward: 400,
    pointsReward: 250,
    unlocked: true,
    progress: '5/5'
  }
];
