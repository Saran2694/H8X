import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProfileScene from './components/ProfileScene.jsx';
import ProgressionScene from './components/ProgressionScene.jsx';
import AdminModal from './components/AdminModal.jsx';
import BookingModal from './components/BookingModal.jsx';
import CafeScene, { INITIAL_CAFE_MENU } from './components/CafeScene.jsx';
import EventsScene from './components/EventsScene.jsx';
import AgentScene from './components/AgentScene.jsx';
import ReceiptModal from './components/ReceiptModal.jsx';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import ExperienceShowcase from './components/ExperienceShowcase.jsx';
import GamificationHud from './components/GamificationHud.jsx';
import AboutSection from './components/AboutSection.jsx';
import Footer from './components/Footer.jsx';
import SectionFrame, { AngularDivider } from './components/AngularFrame.jsx';
import CafeteriaIntroSection from './components/CafeteriaIntroSection.jsx';
import { 
  INITIAL_PLAYER_WALLET, 
  INITIAL_REWARDS_CATALOG, 
  INITIAL_PAYMENT_TRANSACTIONS, 
  INITIAL_REDEEMED_REWARDS 
} from './data/paymentsData.js';
import { 
  INITIAL_EVENTS, 
  INITIAL_TOURNAMENTS, 
  INITIAL_TEAMS, 
  INITIAL_EVENT_REGISTRATIONS 
} from './data/eventsData.js';
import { INITIAL_NOTIFICATIONS } from './data/notificationsData.js';
import { INITIAL_OFFERS, validateOfferOrVoucher } from './data/offersData.js';
import { 
  Home, TrendingUp, Bot, Image, User, Users, Menu, ChevronLeft, ChevronRight, 
  ArrowRight, X, LayoutDashboard, Play, Pause, Sun, Waves, Feather, Heart, 
  Search, Calendar, Clock, Shield, CheckCircle2, ShoppingBag, Plus, 
  Minus, CreditCard, Award, QrCode, MapPin, AlertCircle, Sparkles, Filter,
  Trophy, Swords, Bell
} from 'lucide-react';

/* ==========================================================================
   1. DATA ARCHITECTURE
   ========================================================================== */

export const INITIAL_WORLDS_DATA = [
  {
    id: '01',
    code: 'SWIMMING',
    title: 'SWIMMING POOL',
    subtitle: 'AQUA ZONE',
    description: 'Immerse yourself in our temperature-controlled luxury aquatic arena. Features dynamic underwater lighting, lap tracking, and poolside cabanas.',
    bg: '/img/bg/swimmingpool.png',
    character: '/img/ch1.png',
    accentColor: '#00f0ff',
    price: '₹750 / session',
    priceVal: 750,
    hours: '06:00 AM – 10:00 PM',
    capacity: '20 Swimmers / Slot',
    slotsRemaining: 12,
    currentCapacity: '40% Booked',
    totalBookings: 24,
    status: 'AVAILABLE',
    isAvailable: true,
    xpReward: 100,
    rewardPoints: 75,
    features: ['Temperature Controlled', 'Hydrotherapy', 'Private Cabanas', 'Olympic Laps']
  },
  {
    id: '02',
    code: 'SPA',
    title: 'SPA',
    subtitle: 'WELLNESS ZONE',
    description: 'Rejuvenate your mind and body with premium spa therapies, modern steam amenities, cedar saunas, and a tranquil ambiance.',
    bg: '/img/bg/spa.png',
    character: '/img/ch2.png',
    accentColor: '#e5b96a',
    price: '₹2,499 / session',
    priceVal: 2499,
    hours: '08:00 AM – 09:00 PM',
    capacity: 'Private Rooms',
    slotsRemaining: 4,
    currentCapacity: '80% Booked',
    totalBookings: 18,
    status: 'AVAILABLE',
    isAvailable: true,
    xpReward: 80,
    rewardPoints: 250,
    features: ['Deep Tissue Massage', 'Aromatherapy', 'Cedar Dry Heat', 'Infrared Sauna']
  },
  {
    id: '03',
    code: 'CAFETERIA',
    title: 'CAFETERIA',
    subtitle: 'SOCIAL ZONE',
    description: 'Fuel up with gourmet artisanal coffee, high-protein culinary creations, fresh juices, and energy drinks designed for elite players.',
    bg: '/img/bg/cafitaria.png',
    character: '/img/ch3.png',
    accentColor: '#ff9900',
    price: '₹350 avg / order',
    priceVal: 350,
    hours: '07:00 AM – 11:30 PM',
    capacity: '120 Seats',
    slotsRemaining: 45,
    currentCapacity: '62% Booked',
    totalBookings: 68,
    status: 'AVAILABLE',
    isAvailable: true,
    xpReward: 30,
    rewardPoints: 35,
    features: ['High-Protein Platters', 'Artisanal Coffee', 'Smoothies & Shakes', 'Esports Snacks']
  },
  {
    id: '04',
    code: 'VIRTUAL GAMES',
    title: 'VIRTUAL GAMES',
    subtitle: 'PLAY ZONE',
    description: 'Step into the matrix with full-body haptic VR setups, simulator pods, 4K esports rigs, and competitive tactical arenas.',
    bg: '/img/bg/virtuvalgame.png',
    character: '/img/ch4.png',
    accentColor: '#a855f7',
    price: '₹1,200 / hour',
    priceVal: 1200,
    hours: '10:00 AM – 12:00 AM',
    capacity: '16 Haptic Pods',
    slotsRemaining: 6,
    currentCapacity: '62% Booked',
    totalBookings: 32,
    status: 'AVAILABLE',
    isAvailable: true,
    xpReward: 120,
    rewardPoints: 120,
    features: ['Full-Body Haptic Suits', 'Racing Simulators', '4K 240Hz Rigs', 'Multiplayer VR']
  },
  {
    id: '05',
    code: 'BOARD GAME CAFÉ',
    title: 'BOARD GAME CAFÉ',
    subtitle: 'STRATEGY ZONE',
    description: 'Challenge your allies to over 200 premium tabletop games, custom campaigns, strategy lounges, and master tournaments.',
    bg: '/img/bg/boardgamecafe.png',
    character: '/img/ch5.png',
    accentColor: '#ff3366',
    price: '₹499 / person',
    priceVal: 499,
    hours: '11:00 AM – 11:00 PM',
    capacity: '50 Table Slots',
    slotsRemaining: 18,
    currentCapacity: '64% Booked',
    totalBookings: 29,
    status: 'AVAILABLE',
    isAvailable: true,
    xpReward: 100,
    rewardPoints: 50,
    features: ['250+ Tabletop Titles', 'Game Masters', 'Strategy Lounges', 'Tournament Tables']
  },
  {
    id: '06',
    code: 'TURF',
    title: 'TURF',
    subtitle: 'ARENA ZONE',
    description: 'Dominate the multi-sport FIFA-certified synthetic turf. Engineered for football, cricket matches, and high-intensity combat.',
    bg: '/img/bg/turf.png',
    character: '/img/ch6.png',
    accentColor: '#00ff88',
    price: '₹1,800 / hour',
    priceVal: 1800,
    hours: '05:00 AM – 11:00 PM',
    capacity: '14 Players Pitch',
    slotsRemaining: 3,
    currentCapacity: '78% Booked',
    totalBookings: 42,
    status: 'AVAILABLE',
    isAvailable: true,
    xpReward: 150,
    rewardPoints: 180,
    features: ['4G FIFA Synthetic Turf', '1000 Lux Floodlights', 'Championship Goals', 'Locker Rooms']
  },
  {
    id: '07',
    code: 'SAUNA',
    title: 'SAUNA',
    subtitle: 'THERMAL ZONE',
    description: 'Purify your system in Finnish cedar wood dry heat and infrared thermal chambers. Deep cellular muscle recovery.',
    bg: '/img/bg/sauna.png',
    character: '/img/ch7.png',
    accentColor: '#ff5500',
    price: '₹999 / session',
    priceVal: 999,
    hours: '07:00 AM – 10:00 PM',
    capacity: 'Private Cedar Cabins',
    slotsRemaining: 5,
    currentCapacity: '75% Booked',
    totalBookings: 21,
    status: 'AVAILABLE',
    isAvailable: true,
    xpReward: 80,
    rewardPoints: 100,
    features: ['Finnish Cedar Wood', 'Infrared Spectrum', 'Aromatherapy Sauna', 'Ice Plunge Bath']
  }
];

export const WORLDS_DATA = INITIAL_WORLDS_DATA;

const CAFETERIA_MENU = [
  { id: 'c1', name: 'High-Protein Bowl', category: 'Meals', price: 450, desc: 'Grilled chicken, quinoa, avocado, sesame glaze' },
  { id: 'c2', name: 'H8X Cyber Espresso', category: 'Beverages', price: 220, desc: 'Double-shot espresso with vanilla bean foam' },
  { id: 'c3', name: 'Electro-Hydrate Smoothie', category: 'Beverages', price: 290, desc: 'Blue spirulina, coconut water, whey protein' },
  { id: 'c4', name: 'Loaded Tactical Nachos', category: 'Snacks', price: 380, desc: 'Melted cheddar, jalapeños, guacamole, salsa' }
];

const INITIAL_PROGRESSION_DATA = {
  user: {
    userId: 'HX-000184',
    name: 'SRI SARAN',
    email: 'sri.saran@h8x-universe.io',
    phone: '+91 98765 43210',
    avatar: '/img/ch1.png',
    level: 12,
    xp: 2850,
    nextLevelXp: 5000,
    totalVisits: 68,
    favouriteActivity: 'TURF',
    createdAt: '2025-11-10'
  },
  activities: [
    { id: '01', code: 'SWIMMING', name: 'SWIMMING POOL', visits: 12, xpEarned: 1200, unitXp: 100, icon: Waves, bg: '/img/bg/swimmingpool.png', char: '/img/ch1.png', accent: '#00f0ff', milestone: 'AQUA TITAN (15 Visits)' },
    { id: '02', code: 'SPA', name: 'SPA', visits: 4, xpEarned: 320, unitXp: 80, icon: Feather, bg: '/img/bg/spa.png', char: '/img/ch2.png', accent: '#e5b96a', milestone: 'ZEN MASTER (10 Visits)' },
    { id: '03', code: 'CAFETERIA', name: 'CAFETERIA', visits: 19, xpEarned: 570, unitXp: 30, icon: ShoppingBag, bg: '/img/bg/cafitaria.png', char: '/img/ch3.png', accent: '#ff9900', milestone: 'GOURMET LEGEND (25 Orders)' },
    { id: '04', code: 'VIRTUAL GAMES', name: 'VIRTUAL GAMES', visits: 8, xpEarned: 960, unitXp: 120, icon: Play, bg: '/img/bg/virtuvalgame.png', char: '/img/ch4.png', accent: '#a855f7', milestone: 'CYBER ACE (12 Sessions)' },
    { id: '05', code: 'BOARD GAME CAFÉ', name: 'BOARD GAME CAFÉ', visits: 6, xpEarned: 600, unitXp: 100, icon: Shield, bg: '/img/bg/boardgamecafe.png', char: '/img/ch5.png', accent: '#ff3366', milestone: 'GRANDMASTER (10 Matches)' },
    { id: '06', code: 'TURF', name: 'TURF', visits: 15, xpEarned: 2250, unitXp: 150, icon: Award, bg: '/img/bg/turf.png', char: '/img/ch6.png', accent: '#00ff88', milestone: 'ARENA WARRIOR (20 Matches)' },
    { id: '07', code: 'SAUNA', name: 'SAUNA', visits: 5, xpEarned: 400, unitXp: 80, icon: Sun, bg: '/img/bg/sauna.png', char: '/img/ch7.png', accent: '#ff5500', milestone: 'THERMAL TITAN (10 Sessions)' }
  ],
  achievements: [
    { id: 'ach1', title: 'FIRST MATCH', description: 'Complete your first Turf arena session.', icon: Award, xpReward: 150, requirement: '1 Turf Session', unlocked: true, unlockedAt: '2026-08-01', accent: '#00ff88' },
    { id: 'ach2', title: '10 TURF SESSIONS', description: 'Dominate 10 competitive Turf matches.', icon: Award, xpReward: 300, requirement: '10 Turf Sessions', unlocked: true, unlockedAt: '2026-09-02', accent: '#00ff88' },
    { id: 'ach3', title: 'AQUA MASTER', description: 'Reach 10 hydrotherapy swimming sessions.', icon: Waves, xpReward: 250, requirement: '10 Pool Visits', unlocked: true, unlockedAt: '2026-08-15', accent: '#00f0ff' },
    { id: 'ach4', title: 'VR EXPLORER', description: 'Complete 5 immersive Virtual Gaming sessions.', icon: Play, xpReward: 200, requirement: '5 VR Sessions', unlocked: true, unlockedAt: '2026-08-20', accent: '#a855f7' },
    { id: 'ach5', title: 'BOARD STRATEGIST', description: 'Win 5 tabletop strategy battles.', icon: Shield, xpReward: 200, requirement: '5 Board Game Visits', unlocked: true, unlockedAt: '2026-08-28', accent: '#ff3366' },
    { id: 'ach6', title: 'RECOVERY PRO', description: 'Complete 5 Spa and Thermal Sauna recovery cycles.', icon: Feather, xpReward: 250, requirement: '5 Spa / Sauna Visits', unlocked: true, unlockedAt: '2026-09-10', accent: '#e5b96a' },
    { id: 'ach7', title: 'GOURMET CONNOISSEUR', description: 'Order 20 high-protein culinary meals from the Café.', icon: ShoppingBag, xpReward: 300, requirement: '20 Café Orders', unlocked: false, unlockedAt: null, accent: '#ff9900' },
    { id: 'ach8', title: 'H8X OMNI CHAMPION', description: 'Experience all 7 H8X experiences in a single month.', icon: Sparkles, xpReward: 500, requirement: 'All 7 Zones', unlocked: false, unlockedAt: null, accent: '#e5b96a' }
  ],
  history: [
    { id: 'h1', activity: 'TURF', xp: 150, date: 'Today, 18:30', visits: 15, ref: 'BK-8821', accent: '#00ff88' },
    { id: 'h2', activity: 'SWIMMING POOL', xp: 100, date: 'Yesterday, 08:00', visits: 12, ref: 'BK-8740', accent: '#00f0ff' },
    { id: 'h3', activity: 'CAFETERIA', xp: 30, date: '2 Days Ago, 13:15', visits: 19, ref: 'BK-8699', accent: '#ff9900' },
    { id: 'h4', activity: 'SPA', xp: 80, date: '5 Days Ago, 17:00', visits: 4, ref: 'BK-8512', accent: '#e5b96a' },
    { id: 'h5', activity: 'VIRTUAL GAMES', xp: 120, date: '1 Week Ago, 20:00', visits: 8, ref: 'BK-8420', accent: '#a855f7' }
  ]
};

const GALLERY_DATA = [
  // --- REAL ENVIRONMENTS ---
  {
    id: 'gal-01',
    num: '01',
    title: 'SWIMMING POOL',
    category: 'SWIMMING',
    image: '/img/bg/swimmingpool.png',
    description: 'ENTER THE WATER. Temperature-controlled luxury aquatic arena with dynamic submerged lighting and underwater lap tracking.',
    featured: true,
    date: 'OCT 2026',
    accent: '#00f0ff'
  },
  {
    id: 'gal-02',
    num: '02',
    title: 'SPA & WELLNESS',
    category: 'SPA',
    image: '/img/bg/spa.png',
    description: 'TRANQUIL RECOVERY. Rejuvenate body and spirit with deep-tissue hydro-therapies, cedar wood aroma steam, and dry thermal sauna.',
    featured: true,
    date: 'OCT 2026',
    accent: '#e5b96a'
  },
  {
    id: 'gal-03',
    num: '03',
    title: 'H8X CAFETERIA',
    category: 'CAFÉ',
    image: '/img/bg/cafitaria.png',
    description: 'HIGH-PROTEIN LOUNGE. Gourmet artisanal coffee, electro-hydrate smoothies, and specialized player meal plans.',
    featured: false,
    date: 'SEP 2026',
    accent: '#ff9900'
  },
  {
    id: 'gal-04',
    num: '04',
    title: 'VIRTUAL GAMES ARENA',
    category: 'VIRTUAL GAMES',
    image: '/img/bg/virtuvalgame.png',
    description: 'STEP INTO THE MATRIX. Full-body haptic VR setups, 4K esports battle pods, and competitive multiplayer tactical battlefields.',
    featured: true,
    date: 'NOV 2026',
    accent: '#a855f7'
  },
  {
    id: 'gal-05',
    num: '05',
    title: 'BOARD GAME CAFÉ',
    category: 'BOARD GAMES',
    image: '/img/bg/boardgamecafe.png',
    description: 'STRATEGY LOUNGE. Over 250 tabletop titles, custom campaigns, dedicated game masters, and championship tables.',
    featured: false,
    date: 'OCT 2026',
    accent: '#ff3366'
  },
  {
    id: 'gal-06',
    num: '06',
    title: 'SYNTHETIC TURF',
    category: 'TURF',
    image: '/img/bg/turf.png',
    description: 'ARENA DOMINATION. Multi-sport FIFA-certified synthetic pitch equipped with 1000 Lux broadcast-grade floodlights.',
    featured: true,
    date: 'NOV 2026',
    accent: '#00ff88'
  },
  {
    id: 'gal-07',
    num: '07',
    title: 'THERMAL SAUNA',
    category: 'SAUNA',
    image: '/img/bg/sauna.png',
    description: 'DEEP CELLULAR RECOVERY. Finnish cedar dry heat and infrared spectrum chambers designed for high-performance athletes.',
    featured: false,
    date: 'OCT 2026',
    accent: '#ff5500'
  },

  // --- EVENTS CATEGORY ---
  {
    id: 'gal-ev1',
    num: '08',
    title: 'H8X NIGHT LEAGUE CHAMPIONSHIP',
    category: 'EVENTS',
    image: '/img/bg/turf.png',
    description: '8-team 7v7 nocturnal tournament under 1000 Lux floodlights. Cash prize pool ₹1,50,000 + Exclusive H8X Badges.',
    featured: true,
    date: 'LIVE NOW // OCT 24',
    status: 'REGISTRATION OPEN',
    accent: '#00ff88'
  },
  {
    id: 'gal-ev2',
    num: '09',
    title: 'CYBER-VR TACTICAL SHOWDOWN',
    category: 'EVENTS',
    image: '/img/bg/virtuvalgame.png',
    description: 'Full-body haptic squad showdown in Zero-G VR environment. Ranked global leaderboard points.',
    featured: true,
    date: 'UPCOMING // NOV 02',
    status: 'FIXTURES DRAWN',
    accent: '#a855f7'
  },
  {
    id: 'gal-ev3',
    num: '10',
    title: 'TABLETOP GRANDMASTER CUP',
    category: 'EVENTS',
    image: '/img/bg/boardgamecafe.png',
    description: '16-player Swiss tournament featuring Catan, Risk, and Scythe. Broadcast live on H8X Streams.',
    featured: false,
    date: 'UPCOMING // NOV 12',
    status: 'SLOTS AVAILABLE',
    accent: '#ff3366'
  },

  // --- CHARACTERS CATEGORY ---
  {
    id: 'gal-ch1',
    num: '01',
    title: 'AQUA OPERATIVE — KIRA',
    category: 'CHARACTERS',
    image: '/img/bg/swimmingpool.png',
    characterImg: '/img/ch1.png',
    description: 'Mapped to Aquatic Zone 01. Master of hydro-dynamic agility and thermal endurance.',
    mappedActivity: '01 — SWIMMING POOL',
    featured: true,
    date: 'H8X AGENT CH-01',
    accent: '#00f0ff'
  },
  {
    id: 'gal-ch2',
    num: '02',
    title: 'ZEN MASTER — LYRA',
    category: 'CHARACTERS',
    image: '/img/bg/spa.png',
    characterImg: '/img/ch2.png',
    description: 'Mapped to Wellness Zone 02. Specialist in deep muscle recovery and aromatic heat flow.',
    mappedActivity: '02 — SPA',
    featured: true,
    date: 'H8X AGENT CH-02',
    accent: '#e5b96a'
  },
  {
    id: 'gal-ch3',
    num: '03',
    title: 'BARISTA BOT — MAYA',
    category: 'CHARACTERS',
    image: '/img/bg/cafitaria.png',
    characterImg: '/img/ch3.png',
    description: 'Mapped to Cafeteria 03. Formulates specialized macro nutrients & artisanal cyber-espresso.',
    mappedActivity: '03 — CAFETERIA',
    featured: true,
    date: 'H8X AGENT CH-03',
    accent: '#ff9900'
  },
  {
    id: 'gal-ch4',
    num: '04',
    title: 'CYBER ACE — NYX',
    category: 'CHARACTERS',
    image: '/img/bg/virtuvalgame.png',
    characterImg: '/img/ch4.png',
    description: 'Mapped to Virtual Games 04. Undefeated champion of full-body VR matrix arenas.',
    mappedActivity: '04 — VIRTUAL GAMES',
    featured: true,
    date: 'H8X AGENT CH-04',
    accent: '#a855f7'
  },
  {
    id: 'gal-ch5',
    num: '05',
    title: 'STRATEGIST — ORION',
    category: 'CHARACTERS',
    image: '/img/bg/boardgamecafe.png',
    characterImg: '/img/ch5.png',
    description: 'Mapped to Board Game Café 05. Tabletop grandmaster skilled in tactical conquest.',
    mappedActivity: '05 — BOARD GAME CAFÉ',
    featured: true,
    date: 'H8X AGENT CH-05',
    accent: '#ff3366'
  },
  {
    id: 'gal-ch6',
    num: '06',
    title: 'STRIKER — VALKYRIE',
    category: 'CHARACTERS',
    image: '/img/bg/turf.png',
    characterImg: '/img/ch6.png',
    description: 'Mapped to Synthetic Turf 06. High-speed athletic striker dominating FIFA 4G turf.',
    mappedActivity: '06 — TURF',
    featured: true,
    date: 'H8X AGENT CH-06',
    accent: '#00ff88'
  },
  {
    id: 'gal-ch7',
    num: '07',
    title: 'THERMAL TITAN — VORTEX',
    category: 'CHARACTERS',
    image: '/img/bg/sauna.png',
    characterImg: '/img/ch7.png',
    description: 'Mapped to Sauna 07. Guardian of Finnish dry heat and infrared cellular detox.',
    mappedActivity: '07 — SAUNA',
    featured: true,
    date: 'H8X AGENT CH-07',
    accent: '#ff5500'
  }
];

const INITIAL_PROFILE = {
  id: 'HX-000184',
  name: 'SRI SARAN',
  tier: 'H8X PRO',
  points: 2850,
  nextTierPoints: 5000,
  level: 12,
  rank: 'Arena Explorer',
  bookings: [
    { id: 'BK-8821', activity: 'TURF ARENA ZONE', date: '2026-09-15', time: '18:00 - 19:00', players: 10, total: '₹1,800', status: 'CONFIRMED' }
  ]
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeHouse, setActiveHouse] = useState('gryffindor');
  const [activeWorldIdx, setActiveWorldIdx] = useState(1);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cafeOrders, setCafeOrders] = useState([
    {
      id: 'HXFO-02931',
      userId: 'HX-000184',
      player: 'SRI SARAN',
      playerId: 'HX-000184',
      activityBookingId: 'HXBK-02841',
      activityTitle: 'SYNTHETIC TURF',
      items: 'H8X CLASSIC BURGER × 2 + FRESH COLD-PRESSED JUICE × 2',
      subtotal: 800,
      activityCost: 1200,
      total: '₹2,000',
      totalNum: 2000,
      xpEarned: 80,
      status: 'PREPARING',
      paymentStatus: 'PAID',
      paymentMethod: 'UPI',
      time: '15m ago',
      createdAt: '2026-09-16T09:30:00Z'
    }
  ]);
  const [cafeMenu, setCafeMenu] = useState(INITIAL_CAFE_MENU);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const heroVideoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // PART 14: SHARED ACTIVITIES, OFFERS & NOTIFICATIONS STATE
  const [worldsData, setWorldsData] = useState(INITIAL_WORLDS_DATA);
  const WORLDS_DATA = worldsData;
  const [offersList, setOffersList] = useState(INITIAL_OFFERS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  // Navigation & Booking Modal States
  const [activeNav, setActiveNav] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(INITIAL_WORLDS_DATA[1]);
  const [selectedDate, setSelectedDate] = useState('2026-09-15');
  const [selectedTime, setSelectedTime] = useState('18:00 – 19:00');
  const [playerCount, setPlayerCount] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [progressionData, setProgressionData] = useState(INITIAL_PROGRESSION_DATA);
  const [selectedProgressionModal, setSelectedProgressionModal] = useState(null);
  const [xpNotification, setXpNotification] = useState(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  const [userProfile, setUserProfile] = useState(INITIAL_PROFILE);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // PART 11 PAYMENTS & REWARDS SHARED LEDGER STATE
  const [playerWallet, setPlayerWallet] = useState(INITIAL_PLAYER_WALLET);
  const [paymentTransactions, setPaymentTransactions] = useState(INITIAL_PAYMENT_TRANSACTIONS);
  const [rewardsCatalog, setRewardsCatalog] = useState(INITIAL_REWARDS_CATALOG);
  const [redeemedRewards, setRedeemedRewards] = useState(INITIAL_REDEEMED_REWARDS);

  // PART 12 EVENTS & TOURNAMENTS STATE
  const [eventsList, setEventsList] = useState(INITIAL_EVENTS);
  const [tournamentsList, setTournamentsList] = useState(INITIAL_TOURNAMENTS);
  const [teamsList, setTeamsList] = useState(INITIAL_TEAMS);
  const [userEventRegistrations, setUserEventRegistrations] = useState(INITIAL_EVENT_REGISTRATIONS);
  const [globalReceiptModal, setGlobalReceiptModal] = useState(null);

  // PART 13: AAA LOADING SCREEN STATE
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('INITIALIZING EXPERIENCE...');

  useEffect(() => {
    const p1 = setTimeout(() => { setLoadingProgress(45); setLoadingStatus('CALIBRATING MATRICES...'); }, 100);
    const p2 = setTimeout(() => { setLoadingProgress(85); setLoadingStatus('LOADING SHADERS...'); }, 250);
    const p3 = setTimeout(() => { setLoadingProgress(100); setLoadingStatus('SYSTEM READY'); }, 400);
    const p4 = setTimeout(() => { setIsLoading(false); }, 550);
    return () => {
      clearTimeout(p1); clearTimeout(p2); clearTimeout(p3); clearTimeout(p4);
    };
  }, []);

  // PART 13: GLOBAL SUBTLE PARALLAX SYSTEM (MOUSE TRACKING)
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const normalizedX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normalizedY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMouseParallax({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // PART 13: NAVIGATION DRAWER & CINEMATIC SECTION WARP TRANSITION
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [navigatingSectionTitle, setNavigatingSectionTitle] = useState('');

  // PART 13 & 14: GLOBAL ACCESSIBILITY KEYBOARD ESC LISTENER FOR ALL OVERLAYS
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsBookingOpen(false);
        setIsAdminOpen(false);
        setLightboxItem(null);
        setGlobalReceiptModal(null);
        setSelectedProgressionModal(null);
        setShowLevelUpModal(false);
        setIsNavDrawerOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // PART 14: DYNAMIC ACHIEVEMENT EVALUATION & REAL-TIME UNLOCK ENGINE
  const evaluateAndUnlockAchievements = (updatedProgression) => {
    if (!updatedProgression) return;
    const turfVisits = updatedProgression.activities?.find(a => a.code === 'TURF')?.visits || 0;
    const poolVisits = updatedProgression.activities?.find(a => a.code === 'SWIMMING')?.visits || 0;
    const vrVisits = updatedProgression.activities?.find(a => a.code === 'VIRTUAL GAMES')?.visits || 0;
    const boardVisits = updatedProgression.activities?.find(a => a.code === 'BOARD GAME CAFÉ')?.visits || 0;
    const spaVisits = updatedProgression.activities?.find(a => a.code === 'SPA')?.visits || 0;
    const saunaVisits = updatedProgression.activities?.find(a => a.code === 'SAUNA')?.visits || 0;
    const allVisited = updatedProgression.activities?.every(a => a.visits > 0);

    const newlyUnlocked = [];

    setProgressionData(prev => {
      const updatedAchievements = prev.achievements.map(ach => {
        if (ach.unlocked) return ach;
        let shouldUnlock = false;

        if (ach.id === 'ach1' && prev.user.totalVisits >= 1) shouldUnlock = true;
        if (ach.id === 'ach2' && turfVisits >= 10) shouldUnlock = true;
        if (ach.id === 'ach3' && poolVisits >= 10) shouldUnlock = true;
        if (ach.id === 'ach4' && vrVisits >= 5) shouldUnlock = true;
        if (ach.id === 'ach5' && boardVisits >= 5) shouldUnlock = true;
        if (ach.id === 'ach6' && (spaVisits + saunaVisits) >= 5) shouldUnlock = true;
        if (ach.id === 'ach8' && allVisited) shouldUnlock = true;

        if (shouldUnlock) {
          newlyUnlocked.push(ach);
          return { ...ach, unlocked: true, unlockedAt: 'Today' };
        }
        return ach;
      });

      return {
        ...prev,
        achievements: updatedAchievements
      };
    });

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(ach => {
        setNotifications(prev => [
          {
            id: `notif-ach-${Date.now()}-${ach.id}`,
            type: 'XP',
            title: `ACHIEVEMENT UNLOCKED: ${ach.title}`,
            desc: `${ach.description} (+${ach.xpReward} Bonus XP awarded!)`,
            time: 'Just Now',
            timestamp: new Date().toISOString(),
            read: false,
            link: 'membership',
            badgeColor: '#e5b96a'
          },
          ...prev
        ]);
      });
    }
  };

  // H8X AGENT STATE
  const [activeAgentCommand, setActiveAgentCommand] = useState(null); // null = idle 'READY' state
  const [agentSelectedDate, setAgentSelectedDate] = useState('2026-09-15');
  const [agentSelectedTime, setAgentSelectedTime] = useState('19:30');
  const [agentPlayerCount, setAgentPlayerCount] = useState(4);
  const [agentCafeItems, setAgentCafeItems] = useState([]);
  const [agentBookingConfirmed, setAgentBookingConfirmed] = useState(null);
  const [agentIsScanning, setAgentIsScanning] = useState(false);

  // PART 06 GALLERY STATE
  const [galleryCategory, setGalleryCategory] = useState('ALL');
  const [lightboxItem, setLightboxItem] = useState(null);

  // PER-SECTION AAA LIGHTING COLOR MAP
  const SECTION_THEMES = {
    hero: {
      color: '#e5b96a',
      glow: 'shadow-[0_0_15px_#e5b96a]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(229,185,106,0.95)]',
      text: 'text-[#e5b96a]',
      bg: 'bg-[#e5b96a]'
    },
    agent: {
      color: '#00f0ff',
      glow: 'shadow-[0_0_15px_#00f0ff]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(0,240,255,0.95)]',
      text: 'text-[#00f0ff]',
      bg: 'bg-[#00f0ff]'
    },
    activities: {
      color: '#00f0ff',
      glow: 'shadow-[0_0_15px_#00f0ff]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(0,240,255,0.95)]',
      text: 'text-[#00f0ff]',
      bg: 'bg-[#00f0ff]'
    },
    membership: {
      color: '#d946ef',
      glow: 'shadow-[0_0_15px_#d946ef]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(217,70,239,0.95)]',
      text: 'text-[#d946ef]',
      bg: 'bg-[#d946ef]'
    },
    cafeteria: {
      color: '#f97316',
      glow: 'shadow-[0_0_15px_#f97316]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(249,115,22,0.95)]',
      text: 'text-[#f97316]',
      bg: 'bg-[#f97316]'
    },
    gallery: {
      color: '#38bdf8',
      glow: 'shadow-[0_0_15px_#38bdf8]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(56,189,248,0.95)]',
      text: 'text-[#38bdf8]',
      bg: 'bg-[#38bdf8]'
    },
    events: {
      color: '#00ff88',
      glow: 'shadow-[0_0_15px_#00ff88]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(0,255,136,0.95)]',
      text: 'text-[#00ff88]',
      bg: 'bg-[#00ff88]'
    },
    profile: {
      color: '#e5b96a',
      glow: 'shadow-[0_0_15px_#e5b96a]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(229,185,106,0.95)]',
      text: 'text-[#e5b96a]',
      bg: 'bg-[#e5b96a]'
    },
    about: {
      color: '#e5b96a',
      glow: 'shadow-[0_0_15px_#e5b96a]',
      dropShadow: 'drop-shadow-[0_0_12px_rgba(229,185,106,0.95)]',
      text: 'text-[#e5b96a]',
      bg: 'bg-[#e5b96a]'
    }
  };

  // INTERSECTION OBSERVER WITH 40%–60% VIEWPORT THRESHOLD FOR CINEMATIC SCROLL SYNC
  useEffect(() => {
    const sectionIds = ['hero', 'agent', 'activities', 'membership', 'cafeteria', 'gallery', 'events', 'profile', 'about'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: [0.2, 0.4, 0.6]
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // GSAP AAA CHARACTER GLITCH TRANSITION REFS & STATE
  const [displayWorldIdx, setDisplayWorldIdx] = useState(1);
  const [incomingWorldIdx, setIncomingWorldIdx] = useState(null);
  const isTransitioningRef = useRef(false);

  const charMainRef = useRef(null);
  const charRedRef = useRef(null);
  const charCyanRef = useRef(null);
  const charGlowRef = useRef(null);

  // 600ms AAA CHARACTER TRANSITION
  const triggerCharacterGlitchTo = (newIdx) => {
    if (isTransitioningRef.current || newIdx === displayWorldIdx) return;
    isTransitioningRef.current = true;
    setIsGlitching(true);

    const mainEl = charMainRef.current;
    const redEl = charRedRef.current;
    const cyanEl = charCyanRef.current;

    if (mainEl && redEl && cyanEl) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsGlitching(false);
          isTransitioningRef.current = false;
          gsap.set([mainEl, redEl, cyanEl], { clearProps: 'all' });
        }
      });

      tl.to(mainEl, { opacity: 0.5, skewX: 12, duration: 0.15 })
        .to(redEl, { opacity: 0.8, x: -20, duration: 0.15 }, '<')
        .to(cyanEl, { opacity: 0.8, x: 20, duration: 0.15 }, '<')
        .to(mainEl, { opacity: 0, duration: 0.1, onComplete: () => setDisplayWorldIdx(newIdx) })
        .fromTo(mainEl, 
          { opacity: 0, skewX: -12, scale: 1.05 }, 
          { opacity: 1, skewX: 0, scale: 1.1, duration: 0.2, ease: 'power2.out' }
        )
        .to([redEl, cyanEl], { opacity: 0, x: 0, duration: 0.15 }, '<');
    } else {
      setDisplayWorldIdx(newIdx);
      setIsGlitching(false);
      isTransitioningRef.current = false;
    }
  };

  // 5 SECONDS HERO SLIDESHOW TIMER
  useEffect(() => {
    if (isBookingOpen || isAdminOpen) return;
    const interval = setInterval(() => {
      const nextIdx = (displayWorldIdx + 1) % WORLDS_DATA.length;
      triggerCharacterGlitchTo(nextIdx);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayWorldIdx, isBookingOpen, isAdminOpen]);

  const currentWorld = WORLDS_DATA[displayWorldIdx];

  const handleNextWorld = () => {
    const nextIdx = (displayWorldIdx + 1) % WORLDS_DATA.length;
    triggerCharacterGlitchTo(nextIdx);
  };

  const handlePrevWorld = () => {
    const prevIdx = (displayWorldIdx - 1 + WORLDS_DATA.length) % WORLDS_DATA.length;
    triggerCharacterGlitchTo(prevIdx);
  };

  const startBookingFor = (activity) => {
    setSelectedActivity(activity || WORLDS_DATA[displayWorldIdx]);
    setBookingStep(1);
    setIsBookingOpen(true);
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const executePayment = () => {
    const foodTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const grandTotalVal = selectedActivity.priceVal + foodTotal;

    const newBk = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      activity: `${selectedActivity.title} (${selectedActivity.subtitle})`,
      date: selectedDate,
      time: selectedTime,
      players: playerCount,
      total: `₹${grandTotalVal.toLocaleString('en-IN')}`,
      status: 'CONFIRMED'
    };

    setConfirmedBookingData(newBk);
    
    // Find matching activity unit XP
    const actData = progressionData.activities.find(a => a.code === selectedActivity.code) || progressionData.activities[0];
    const earnedXp = actData.unitXp || 100;

    // Trigger XP floating notification
    setXpNotification({
      activity: selectedActivity.title,
      xp: earnedXp,
      accent: actData.accent
    });
    setTimeout(() => setXpNotification(null), 4000);

    // Update Progression System Data
    setProgressionData(prev => {
      const newXp = prev.user.xp + earnedXp;
      const nextLevelXp = prev.user.nextLevelXp;
      const isLevelUp = newXp >= nextLevelXp;
      const updatedLevel = isLevelUp ? prev.user.level + 1 : prev.user.level;

      if (isLevelUp) {
        setShowLevelUpModal(true);
      }

      const updatedActivities = prev.activities.map(act => {
        if (act.code === selectedActivity.code) {
          return {
            ...act,
            visits: act.visits + 1,
            xpEarned: act.xpEarned + earnedXp
          };
        }
        return act;
      });

      const newHistoryItem = {
        id: `h-${Date.now()}`,
        activity: selectedActivity.title,
        xp: earnedXp,
        date: 'Just Now',
        visits: (actData.visits + 1),
        ref: newBk.id,
        accent: actData.accent
      };

      return {
        ...prev,
        user: {
          ...prev.user,
          xp: newXp,
          level: updatedLevel,
          totalVisits: prev.user.totalVisits + 1
        },
        activities: updatedActivities,
        history: [newHistoryItem, ...prev.history]
      };
    });

    setUserProfile(prev => ({
      ...prev,
      points: prev.points + earnedXp,
      bookings: [newBk, ...prev.bookings]
    }));
    setBookingStep(6);
  };

  const scrollToSection = (id, label) => {
    setIsNavDrawerOpen(false);
    if (label) {
      setNavigatingSectionTitle(label);
      setIsPageTransitioning(true);
      setTimeout(() => setIsPageTransitioning(false), 450);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#05060a] text-white font-['Inter'] select-none overflow-x-hidden relative min-h-screen">
      
      {/* HEADER NAVBAR MATCHING REFERENCE DESIGN */}
      <Header
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        credits={playerWallet?.rewardPoints || 0}
        onSignIn={() => setIsAdminOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* DYNAMIC CONTENT ROUTER */}
      {activeNav === 'cafe' ? (
        /* DEDICATED /cafeteria ROUTE PAGE */
        <main className="pt-16 min-h-screen">
          <CafeScene
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            progressionData={progressionData}
            setProgressionData={setProgressionData}
            cartItems={cartItems}
            setCartItems={setCartItems}
            cafeOrders={cafeOrders}
            setCafeOrders={setCafeOrders}
            cafeMenu={cafeMenu}
            setCafeMenu={setCafeMenu}
            WORLDS_DATA={WORLDS_DATA}
            playerWallet={playerWallet}
            setPlayerWallet={setPlayerWallet}
            paymentTransactions={paymentTransactions}
            setPaymentTransactions={setPaymentTransactions}
            notifications={notifications}
            setNotifications={setNotifications}
            onOpenBookingWithCombo={(combo) => {
              const targetAct = WORLDS_DATA.find(w => w.id === combo.activityId) || WORLDS_DATA[5];
              setSelectedActivity(targetAct);
              setIsBookingOpen(true);
            }}
          />
          <Footer onNavigate={(id) => {
            if (id === 'cafeteria') {
              setActiveNav('cafe');
            } else {
              setActiveNav('home');
              setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }} />
        </main>
      ) : (
        /* MAIN LANDING PAGE — 8 SECTIONS IN EXACT SPECIFIED ORDER */
        <main className="w-full">
          
          {/* 02 — FULLSCREEN VIDEO HERO */}
          <HeroSection 
            onEnter={() => {
              const agentElem = document.getElementById('agent');
              if (agentElem) agentElem.scrollIntoView({ behavior: 'smooth' });
            }} 
          />

          {/* 03 — AGENT / 7 ACTIVITIES */}
          <AgentScene 
            onBookActivity={(activity) => {
              const foundWorld = WORLDS_DATA.find(w => w.id === activity.id || w.title === activity.name) || WORLDS_DATA[0];
              setSelectedActivity(foundWorld);
              setIsBookingOpen(true);
            }}
          />

          {/* 04 — PROGRESSION + REWARDS */}
          <ProgressionScene 
            userProfile={userProfile}
            credits={playerWallet?.rewardPoints || 325}
            totalVisits={userProfile?.totalVisits || 12}
            level={userProfile?.level || 12}
          />

          {/* 05 — PROFILE */}
          <ProfileScene 
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            credits={playerWallet?.rewardPoints || 325}
            onSignInClick={() => setIsAdminOpen(true)}
          />

          {/* 06 — CAFETERIA INTRO */}
          <CafeteriaIntroSection 
            onExploreCafeteria={() => setActiveNav('cafe')} 
          />

          {/* 07 — ABOUT H8X */}
          <AboutSection 
            onExploreStory={() => {
              const agentElem = document.getElementById('agent');
              if (agentElem) agentElem.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 08 — FOOTER */}
          <Footer 
            onNavigate={(id) => {
              if (id === 'cafeteria') {
                setActiveNav('cafe');
              } else {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
          />
        </main>
      )}
      








      {/* CINEMATIC VIDEO HERO TRAILER MODAL */}
      {videoModalUrl && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-4xl bg-[#080b13] border-2 border-[#00f0ff] rounded-2xl p-6 text-center space-y-4 shadow-[0_0_100px_rgba(0,240,255,0.4)]">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs text-[#00f0ff] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span>CINEMATIC ARENA TRAILER // {currentWorld.title}</span>
              </div>
              <button 
                onClick={() => setVideoModalUrl(null)}
                className="p-1.5 rounded-full bg-black/80 border border-white/20 text-gray-400 hover:text-white hover:border-[#00f0ff]"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0" 
                title="H8X Cinematic Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span>H8X GAMING NETWORK 4K ENCODING</span>
              <button 
                onClick={() => {
                  setVideoModalUrl(null);
                  startBookingFor(currentWorld);
                }}
                className="cyber-btn px-6 py-2 bg-[#00f0ff] text-black font-black text-xs rounded"
              >
                BOOK THIS ARENA NOW →
              </button>
            </div>
          </div>
        </div>
      )}




















          















































      {/* ==========================================================================
         PART 09: COMPLETE H8X BOOKING & CHECKOUT SYSTEM
         ========================================================================== */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        progressionData={progressionData}
        setProgressionData={setProgressionData}
        cartItems={cartItems}
        setCartItems={setCartItems}
        WORLDS_DATA={WORLDS_DATA}
        CAFETERIA_MENU={CAFETERIA_MENU}
        playerWallet={playerWallet}
        setPlayerWallet={setPlayerWallet}
        paymentTransactions={paymentTransactions}
        setPaymentTransactions={setPaymentTransactions}
        worldsData={worldsData}
        setWorldsData={setWorldsData}
        offersList={offersList}
        setOffersList={setOffersList}
        notifications={notifications}
        setNotifications={setNotifications}
        redeemedRewards={redeemedRewards}
        setRedeemedRewards={setRedeemedRewards}
        onUnlockAchievements={evaluateAndUnlockAchievements}
        onBookingSuccess={(bookingData) => {
          setConfirmedBookingData(bookingData);
        }}
      />

      {/* ADMIN CONTROL CENTER MODAL */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        progressionData={progressionData}
        setProgressionData={setProgressionData}
        WORLDS_DATA={WORLDS_DATA}
        GALLERY_DATA={GALLERY_DATA}
        cafeOrders={cafeOrders}
        setCafeOrders={setCafeOrders}
        cafeMenu={cafeMenu}
        setCafeMenu={setCafeMenu}
        playerWallet={playerWallet}
        setPlayerWallet={setPlayerWallet}
        paymentTransactions={paymentTransactions}
        setPaymentTransactions={setPaymentTransactions}
        rewardsCatalog={rewardsCatalog}
        setRewardsCatalog={setRewardsCatalog}
        redeemedRewards={redeemedRewards}
        setRedeemedRewards={setRedeemedRewards}
        eventsList={eventsList}
        setEventsList={setEventsList}
        tournamentsList={tournamentsList}
        setTournamentsList={setTournamentsList}
        teamsList={teamsList}
        setTeamsList={setTeamsList}
        worldsData={worldsData}
        setWorldsData={setWorldsData}
        offersList={offersList}
        setOffersList={setOffersList}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      
      {/* GLOBAL RECEIPT MODAL */}
      <ReceiptModal 
        isOpen={!!globalReceiptModal}
        onClose={() => setGlobalReceiptModal(null)}
        transaction={globalReceiptModal}
      />

    </div>
  );
}