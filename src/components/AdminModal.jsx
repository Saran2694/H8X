import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Users, Calendar, Activity, DollarSign, Settings, X, Plus, Search,
  Bell, Shield, CheckCircle2, AlertCircle, Edit3, Trash2, Eye, RefreshCw, Filter,
  Download, ArrowUpRight, ArrowDownRight, Tag, ShoppingBag, Image, Bot, TrendingUp,
  FileText, Check, Lock, Unlock, Play, Waves, Sun, Feather, Award, ChevronRight, Zap,
  Clock, CreditCard, Sparkles, Sliders, ChevronDown, Flame, Copy, CheckCheck, Coffee, Utensils,
  Printer, Gift, Wallet, PieChart, BarChart3, Trophy, Swords
} from 'lucide-react';
import { gsap } from 'gsap';
import { INITIAL_CAFE_MENU } from './CafeScene.jsx';
import ReceiptModal from './ReceiptModal.jsx';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  userProfile, 
  setUserProfile, 
  progressionData, 
  setProgressionData,
  WORLDS_DATA = [],
  GALLERY_DATA = [],
  cafeOrders = [],
  setCafeOrders,
  cafeMenu = [],
  setCafeMenu,
  playerWallet,
  setPlayerWallet,
  paymentTransactions = [],
  setPaymentTransactions,
  rewardsCatalog = [],
  setRewardsCatalog,
  redeemedRewards = [],
  setRedeemedRewards,
  eventsList = [],
  setEventsList,
  tournamentsList = [],
  setTournamentsList,
  teamsList = [],
  setTeamsList,
  worldsData,
  setWorldsData,
  offersList: externalOffersList,
  setOffersList: setExternalOffersList,
  notifications: externalNotifications,
  setNotifications: setExternalNotifications
}) {
  const [activeTab, setActiveTab] = useState('01 DASHBOARD');
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  
  // Part 12 Events Admin States
  const [eventCategoryFilter, setEventCategoryFilter] = useState('ALL');
  const [editingEvent, setEditingEvent] = useState(null);
  const [isNewEventModal, setIsNewEventModal] = useState(false);
  const [selectedAdminTournamentId, setSelectedAdminTournamentId] = useState('tour-1');
  
  // Modals inside admin
  const [selectedUserModal, setSelectedUserModal] = useState(null);
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);
  const [selectedActivityModal, setSelectedActivityModal] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [copiedToast, setCopiedToast] = useState(null);

  // Timeframe filters
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('MONTH');
  const [bookingFilter, setBookingFilter] = useState('ALL');
  const [cafeCategoryFilter, setCafeCategoryFilter] = useState('ALL');
  const [settingsActiveTab, setSettingsActiveTab] = useState('XP SETTINGS');

  // GSAP Metric Animated Counters
  const [countTodayBookings, setCountTodayBookings] = useState(0);
  const [countTodayRevenue, setCountTodayRevenue] = useState(0);
  const [countActiveUsers, setCountActiveUsers] = useState(0);
  const [countTotalUsers, setCountTotalUsers] = useState(0);
  const [countSlots, setCountSlots] = useState(0);
  const [countCafeOrders, setCountCafeOrders] = useState(0);
  const [countNewMembers, setCountNewMembers] = useState(0);

  // 15. NOTIFICATIONS
  const [notifications, setNotifications] = useState([
    { id: 'n1', type: 'BOOKING', title: 'New Booking Confirmed', desc: 'Sri Saran booked Turf Arena for 18 Sep 19:30', time: '3m ago', read: false },
    { id: 'n2', type: 'PAYMENT', title: 'Payment Received', desc: '₹1,450 for Turf + Café order (TX-9842)', time: '12m ago', read: false },
    { id: 'n3', type: 'CAPACITY', title: 'Low Activity Capacity Alert', desc: 'Turf Arena 19:00 slot reached 90% capacity', time: '45m ago', read: false },
    { id: 'n4', type: 'NEW_USER', title: 'New Player Registered', desc: 'Kavya Verma (HX-000305) completed registration', time: '2h ago', read: true },
    { id: 'n5', type: 'CAFÉ', title: 'Café Pre-Order In Queue', desc: 'High-Protein Bowls × 2 pending kitchen approval', time: '3h ago', read: true }
  ]);

  // 16. MOCK DATA SEED: 8 REALISTIC UNIQUE USERS
  const [usersList, setUsersList] = useState([
    { 
      id: 'HX-000184', 
      name: 'SRI SARAN', 
      email: 'sri.saran@h8x-universe.io', 
      phone: '+91 98765 43210', 
      level: 12, 
      xp: 2850, 
      nextLevelXp: 5000,
      visits: 68, 
      bookingsCount: 15, 
      spend: '₹24,850', 
      status: 'ACTIVE', 
      avatar: '/img/ch1.png', 
      favourite: 'TURF',
      membership: 'H8X PRO MEMBER',
      joinedDate: '2025-11-10',
      achievementsCount: 6,
      matches: 15,
      sessions: 43
    },
    { 
      id: 'HX-000219', 
      name: 'AARAV SHARMA', 
      email: 'aarav.sharma@h8x.io', 
      phone: '+91 98123 45678', 
      level: 8, 
      xp: 1940, 
      nextLevelXp: 2500,
      visits: 34, 
      bookingsCount: 8, 
      spend: '₹12,400', 
      status: 'ACTIVE', 
      avatar: '/img/ch2.png', 
      favourite: 'SPA',
      membership: 'H8X PRO MEMBER',
      joinedDate: '2026-01-15',
      achievementsCount: 4,
      matches: 4,
      sessions: 22
    },
    { 
      id: 'HX-000305', 
      name: 'KAVYA VERMA', 
      email: 'kavya.v@h8x.io', 
      phone: '+91 97890 12345', 
      level: 15, 
      xp: 4200, 
      nextLevelXp: 6000,
      visits: 92, 
      bookingsCount: 22, 
      spend: '₹38,900', 
      status: 'ACTIVE', 
      avatar: '/img/ch3.png', 
      favourite: 'CAFETERIA',
      membership: 'H8X ELITE VIP',
      joinedDate: '2025-08-01',
      achievementsCount: 7,
      matches: 8,
      sessions: 60
    },
    { 
      id: 'HX-000412', 
      name: 'ROHAN MEHTA', 
      email: 'rohan.m@h8x.io', 
      phone: '+91 96543 21098', 
      level: 5, 
      xp: 950, 
      nextLevelXp: 1500,
      visits: 18, 
      bookingsCount: 4, 
      spend: '₹6,200', 
      status: 'ACTIVE', 
      avatar: '/img/ch4.png', 
      favourite: 'VIRTUAL GAMES',
      membership: 'H8X MEMBER',
      joinedDate: '2026-03-20',
      achievementsCount: 3,
      matches: 6,
      sessions: 12
    },
    { 
      id: 'HX-000520', 
      name: 'ANANYA ROY', 
      email: 'ananya.roy@h8x.io', 
      phone: '+91 95432 10987', 
      level: 10, 
      xp: 2310, 
      nextLevelXp: 3000,
      visits: 45, 
      bookingsCount: 11, 
      spend: '₹16,500', 
      status: 'ACTIVE', 
      avatar: '/img/ch5.png', 
      favourite: 'BOARD GAME CAFÉ',
      membership: 'H8X PRO MEMBER',
      joinedDate: '2025-12-05',
      achievementsCount: 5,
      matches: 14,
      sessions: 25
    },
    { 
      id: 'HX-000633', 
      name: 'VIKRAM CHAWLA', 
      email: 'vikram.c@h8x.io', 
      phone: '+91 94321 09876', 
      level: 3, 
      xp: 450, 
      nextLevelXp: 1000,
      visits: 9, 
      bookingsCount: 2, 
      spend: '₹3,500', 
      status: 'ACTIVE', 
      avatar: '/img/ch6.png', 
      favourite: 'TURF',
      membership: 'H8X MEMBER',
      joinedDate: '2026-05-12',
      achievementsCount: 2,
      matches: 7,
      sessions: 2
    },
    { 
      id: 'HX-000744', 
      name: 'NEHA GUPTA', 
      email: 'neha.g@h8x.io', 
      phone: '+91 93210 98765', 
      level: 14, 
      xp: 3890, 
      nextLevelXp: 5000,
      visits: 81, 
      bookingsCount: 19, 
      spend: '₹31,200', 
      status: 'ACTIVE', 
      avatar: '/img/ch7.png', 
      favourite: 'SAUNA',
      membership: 'H8X PRO MEMBER',
      joinedDate: '2025-09-18',
      achievementsCount: 6,
      matches: 2,
      sessions: 55
    },
    { 
      id: 'HX-000855', 
      name: 'ARJUN PATEL', 
      email: 'arjun.p@h8x.io', 
      phone: '+91 92109 87654', 
      level: 1, 
      xp: 120, 
      nextLevelXp: 500,
      visits: 2, 
      bookingsCount: 1, 
      spend: '₹750', 
      status: 'DISABLED', 
      avatar: '/img/ch1.png', 
      favourite: 'SWIMMING',
      membership: 'STANDARD',
      joinedDate: '2026-08-25',
      achievementsCount: 1,
      matches: 0,
      sessions: 2
    }
  ]);

  // 4. BOOKINGS STATE
  const [adminBookings, setAdminBookings] = useState([
    { id: 'HXBK-02841', player: 'SRI SARAN', playerId: 'HX-000184', activity: 'SYNTHETIC TURF', date: '2026-09-18', time: '19:30', people: 4, amount: '₹1,800', payment: 'PAID', status: 'CONFIRMED' },
    { id: 'HXBK-02790', player: 'AARAV SHARMA', playerId: 'HX-000219', activity: 'SWIMMING POOL', date: '2026-09-17', time: '08:00', people: 2, amount: '₹750', payment: 'PAID', status: 'COMPLETED' },
    { id: 'HXBK-02610', player: 'KAVYA VERMA', playerId: 'HX-000305', activity: 'VIRTUAL GAMES', date: '2026-09-16', time: '18:00', people: 3, amount: '₹1,200', payment: 'PAID', status: 'CONFIRMED' },
    { id: 'HXBK-02500', player: 'ROHAN MEHTA', playerId: 'HX-000412', activity: 'SPA & WELLNESS', date: '2026-09-15', time: '16:00', people: 1, amount: '₹2,499', payment: 'PENDING', status: 'PENDING' },
    { id: 'HXBK-02410', player: 'ANANYA ROY', playerId: 'HX-000520', activity: 'BOARD GAME CAFÉ', date: '2026-09-14', time: '17:00', people: 4, amount: '₹1,996', payment: 'PAID', status: 'COMPLETED' },
    { id: 'HXBK-02305', player: 'VIKRAM CHAWLA', playerId: 'HX-000633', activity: 'SYNTHETIC TURF', date: '2026-09-13', time: '20:00', people: 8, amount: '₹3,600', payment: 'PAID', status: 'CANCELLED' }
  ]);

  // Dynamic Real-time Sync for Primary User HX-000184
  const effectiveUsersList = usersList.map(u => {
    if (u.id === 'HX-000184' && userProfile) {
      const currentLevel = progressionData?.user?.level || userProfile.level || u.level;
      const currentXp = progressionData?.user?.xp || userProfile.points || u.xp;
      const currentVisits = progressionData?.user?.totalVisits || u.visits;
      const currentBookings = (userProfile.bookings?.length || 0) + 15;
      const currentSpend = `₹${(playerWallet?.totalSpent || 24850).toLocaleString('en-IN')}`;
      const unlockedAchs = progressionData?.achievements?.filter(a => a.unlocked)?.length || u.achievementsCount;
      return {
        ...u,
        name: userProfile.name || u.name,
        email: userProfile.email || u.email,
        phone: userProfile.phone || u.phone,
        avatar: userProfile.avatar || u.avatar,
        level: currentLevel,
        xp: currentXp,
        visits: currentVisits,
        bookingsCount: currentBookings,
        spend: currentSpend,
        achievementsCount: unlockedAchs
      };
    }
    return u;
  });

  // Combined Real-time Bookings List
  const effectiveBookings = [
    ...(userProfile?.bookings || []).map(b => ({
      id: b.id,
      player: b.playerName || userProfile?.name || 'SRI SARAN',
      playerId: b.userId || userProfile?.id || 'HX-000184',
      activity: b.activity,
      date: b.date,
      time: b.time,
      people: b.people || b.players || 1,
      amount: b.total,
      payment: b.paymentStatus || 'PAID',
      status: b.status || 'CONFIRMED'
    })),
    ...adminBookings.filter(ab => !(userProfile?.bookings || []).some(ub => ub.id === ab.id))
  ];

  // 5. ACTIVITIES MANAGEMENT STATE
  const [adminActivities, setAdminActivities] = useState([
    { id: '01', code: 'SWIMMING', title: 'SWIMMING POOL', subtitle: 'AQUA ZONE', price: '₹750 / session', capacity: '20 Swimmers / Slot', hours: '06:00 AM – 10:00 PM', xpReward: 100, status: 'OPERATIONAL', bg: '/img/bg/swimmingpool.png', desc: 'Temperature-controlled luxury aquatic arena with underwater lighting.' },
    { id: '02', code: 'SPA', title: 'SPA', subtitle: 'WELLNESS ZONE', price: '₹2,499 / session', capacity: 'Private Rooms', hours: '08:00 AM – 09:00 PM', xpReward: 80, status: 'OPERATIONAL', bg: '/img/bg/spa.png', desc: 'Tranquil hydrotherapy therapies, cedar sauna, and deep muscle recovery.' },
    { id: '03', code: 'CAFETERIA', title: 'CAFETERIA', subtitle: 'SOCIAL ZONE', price: '₹350 avg / order', capacity: '120 Seats', hours: '07:00 AM – 11:30 PM', xpReward: 30, status: 'OPERATIONAL', bg: '/img/bg/cafitaria.png', desc: 'Artisanal high-protein nutrition, electro-hydrate smoothies & cyber coffee.' },
    { id: '04', code: 'VIRTUAL GAMES', title: 'VIRTUAL GAMES', subtitle: 'PLAY ZONE', price: '₹1,200 / hour', capacity: '16 Haptic Pods', hours: '10:00 AM – 12:00 AM', xpReward: 120, status: 'OPERATIONAL', bg: '/img/bg/virtuvalgame.png', desc: 'Full-body haptic VR setups, 4K esports rigs, and competitive combat.' },
    { id: '05', code: 'BOARD GAME CAFÉ', title: 'BOARD GAME CAFÉ', subtitle: 'STRATEGY ZONE', price: '₹499 / person', capacity: '50 Table Slots', hours: '11:00 AM – 11:00 PM', xpReward: 100, status: 'OPERATIONAL', bg: '/img/bg/boardgamecafe.png', desc: 'Over 250 tabletop titles, custom campaigns, and tournament tables.' },
    { id: '06', code: 'TURF', title: 'SYNTHETIC TURF', subtitle: 'ARENA ZONE', price: '₹1,800 / hour', capacity: '14 Players Pitch', hours: '05:00 AM – 11:00 PM', xpReward: 150, status: 'OPERATIONAL', bg: '/img/bg/turf.png', desc: 'FIFA 4G synthetic turf pitch equipped with 1000 Lux broadcast floodlights.' },
    { id: '07', code: 'SAUNA', title: 'THERMAL SAUNA', subtitle: 'THERMAL ZONE', price: '₹999 / session', capacity: 'Private Cedar Cabins', hours: '07:00 AM – 10:00 PM', xpReward: 80, status: 'OPERATIONAL', bg: '/img/bg/sauna.png', desc: 'Finnish cedar dry heat and infrared spectrum chambers for cellular recovery.' }
  ]);

  // Sync admin activities with global worldsData
  useEffect(() => {
    if (worldsData && worldsData.length > 0) {
      setAdminActivities(prev => prev.map(a => {
        const match = worldsData.find(w => w.id === a.id);
        if (match) {
          return {
            ...a,
            status: match.status === 'MAINTENANCE' ? 'MAINTENANCE' : 'OPERATIONAL',
            price: match.price,
            capacity: match.capacity,
            hours: match.hours,
            xpReward: match.xpReward || a.xpReward
          };
        }
        return a;
      }));
    }
  }, [worldsData]);

  // 6. PROGRESSION ADJUSTMENT HISTORY
  const [xpAdjustReason, setXpAdjustReason] = useState('Tournament participation');
  const [xpAdjustAmount, setXpAdjustAmount] = useState(250);
  const [selectedProgressionUser, setSelectedProgressionUser] = useState('HX-000184');
  const [xpAdjustHistory, setXpAdjustHistory] = useState([
    { id: 'adj-1', playerId: 'HX-000184', amount: '+250 XP', reason: 'Tournament participation', date: '2026-09-14 18:30', admin: 'SYS_ADMIN' },
    { id: 'adj-2', playerId: 'HX-000219', amount: '+100 XP', reason: 'Milestone Bonus Compensation', date: '2026-09-12 11:15', admin: 'SYS_ADMIN' },
    { id: 'adj-3', playerId: 'HX-000305', amount: '+500 XP', reason: 'Arena Grandmaster Title Award', date: '2026-09-10 14:00', admin: 'SYS_ADMIN' }
  ]);

  // 7. AGENT COMMANDS CONTROL
  const [agentCommandsState, setAgentCommandsState] = useState([
    { id: 'cmd-swim', name: 'SWIM', code: 'SWIMMING', status: true, response: 'Aquatic Zone temperature 28°C ready. Lap slots available.', promo: 'Book now for 100 XP bonus' },
    { id: 'cmd-recover', name: 'RECOVER', code: 'SPA', status: true, response: 'Therapeutic steam & cedar sauna rooms pre-heated.', promo: 'Recovery combo available' },
    { id: 'cmd-eat', name: 'EAT', code: 'CAFETERIA', status: true, response: 'Artisanal high-protein menu & cyber coffee ready.', promo: 'Double protein bowl recommended' },
    { id: 'cmd-playvr', name: 'PLAY VR', code: 'VIRTUAL GAMES', status: true, response: 'Haptic suits & 4K battle rigs calibrated.', promo: 'Ranked VR Showdown open' },
    { id: 'cmd-board', name: 'BOARD GAMES', code: 'BOARD GAME CAFÉ', status: true, response: '250+ Tabletop games & strategy lounge open.', promo: 'Grandmaster Cup next week' },
    { id: 'cmd-turf', name: 'PLAY TURF', code: 'TURF', status: true, response: 'FIFA 4G synthetic turf under 1000 Lux floodlights active.', promo: 'Night league slot open' },
    { id: 'cmd-sauna', name: 'RELAX', code: 'SAUNA', status: true, response: 'Finnish cedar dry heat chambers operational.', promo: 'Cellular detox cycle recommended' }
  ]);

  // 8. CAFÉ ORDERS STATE (Including combined transactions)
  const [adminCafeOrders, setAdminCafeOrders] = useState([
    { 
      id: 'ORD-881', 
      player: 'SRI SARAN', 
      playerId: 'HX-000184',
      items: 'BURGER × 2 + JUICE × 2', 
      total: '₹1,450', 
      combo: 'TURF BOOKING + CAFÉ ORDER', 
      activityBookingId: 'HXBK-02841',
      category: 'MEALS',
      time: '10m ago', 
      status: 'PREPARING' 
    },
    { 
      id: 'ORD-874', 
      player: 'KAVYA VERMA', 
      playerId: 'HX-000305',
      items: 'HIGH-PROTEIN BOWL × 1, ESPRESSO × 1', 
      total: '₹670', 
      combo: 'SINGLE CAFÉ ORDER', 
      category: 'MEALS',
      time: '25m ago', 
      status: 'READY' 
    },
    { 
      id: 'ORD-862', 
      player: 'ROHAN MEHTA', 
      playerId: 'HX-000412',
      items: 'LOADED TACTICAL NACHOS × 1', 
      total: '₹380', 
      combo: 'VR + CAFÉ EXPERIENCE', 
      category: 'SNACKS',
      time: '1h ago', 
      status: 'COMPLETED' 
    },
    { 
      id: 'ORD-850', 
      player: 'ANANYA ROY', 
      playerId: 'HX-000520',
      items: 'ELECTRO-HYDRATE SMOOTHIE × 2', 
      total: '₹580', 
      combo: 'BOARD CAFÉ DRINKS', 
      category: 'BEVERAGES',
      time: '2h ago', 
      status: 'COMPLETED' 
    }
  ]);

  // Sync external cafeOrders into adminCafeOrders
  useEffect(() => {
    if (cafeOrders && cafeOrders.length > 0) {
      setAdminCafeOrders(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newOnes = cafeOrders.filter(o => !existingIds.has(o.id));
        return [...newOnes, ...prev];
      });
    }
  }, [cafeOrders]);

  // 8B. CAFÉ MENU MANAGEMENT STATE (Part 10)
  const [adminCafeMenu, setAdminCafeMenu] = useState(INITIAL_CAFE_MENU);
  const [cafeViewMode, setCafeViewMode] = useState('ORDERS'); // 'ORDERS' or 'MENU'
  const [editingCafeItem, setEditingCafeItem] = useState(null);
  const [isNewCafeItem, setIsNewCafeItem] = useState(false);

  // 9. PAYMENTS LEDGER & REWARDS ADMIN STATE (PART 11)
  const [adminSelectedReceipt, setAdminSelectedReceipt] = useState(null);
  const [adminPaymentSearch, setAdminPaymentSearch] = useState('');
  const [adminPaymentFilter, setAdminPaymentFilter] = useState('ALL');
  const [adminPaymentTimeframe, setAdminPaymentTimeframe] = useState('TODAY');
  const [adminPaymentSubTab, setAdminPaymentSubTab] = useState('TRANSACTIONS'); // 'TRANSACTIONS' or 'REWARDS_CATALOG'
  const [editingReward, setEditingReward] = useState(null);
  const [isNewReward, setIsNewReward] = useState(false);
  const [rewardToast, setRewardToast] = useState(null);

  // Refund Processor Handler
  const handleProcessRefund = (txn) => {
    if (setPaymentTransactions) {
      setPaymentTransactions(prev => prev.map(p => {
        if (p.id === txn.id) {
          return {
            ...p,
            status: 'REFUNDED',
            refundStatus: 'REFUNDED',
            refundAmount: p.amount
          };
        }
        return p;
      }));
    }

    // If paid via H8X Wallet, refund to playerWallet.availableBalance
    if (txn.method === 'H8X WALLET' && setPlayerWallet) {
      setPlayerWallet(prev => ({
        ...prev,
        availableBalance: prev.availableBalance + txn.amount
      }));
    }

    setRewardToast(`Refund of ₹${txn.amount.toLocaleString()} processed successfully for ${txn.id}.`);
    setTimeout(() => setRewardToast(null), 3500);
  };

  const handleSaveReward = (rewardItem) => {
    if (!rewardItem.title) return;
    if (isNewReward) {
      const created = {
        ...rewardItem,
        id: `rwd-${Date.now()}`
      };
      if (setRewardsCatalog) setRewardsCatalog(prev => [created, ...prev]);
    } else {
      if (setRewardsCatalog) {
        setRewardsCatalog(prev => prev.map(r => r.id === rewardItem.id ? rewardItem : r));
      }
    }
    setEditingReward(null);
    setIsNewReward(false);
    setRewardToast('Rewards Catalog successfully updated.');
    setTimeout(() => setRewardToast(null), 3000);
  };

  const handleDeleteReward = (rewardId) => {
    if (setRewardsCatalog) {
      setRewardsCatalog(prev => prev.filter(r => r.id !== rewardId));
    }
    setRewardToast('Reward removed from catalog.');
    setTimeout(() => setRewardToast(null), 3000);
  };

  const handleToggleRewardStock = (rewardId) => {
    if (setRewardsCatalog) {
      setRewardsCatalog(prev => prev.map(r => r.id === rewardId ? { ...r, stock: r.stock > 0 ? 0 : 50 } : r));
    }
  };

  // 10. GALLERY ADMIN ITEMS
  const [adminGalleryItems, setAdminGalleryItems] = useState([
    { id: 'gal-01', title: 'SWIMMING POOL', category: 'SWIMMING', img: '/img/bg/swimmingpool.png', featured: true, views: '14.2k' },
    { id: 'gal-02', title: 'SPA & WELLNESS', category: 'SPA', img: '/img/bg/spa.png', featured: true, views: '11.8k' },
    { id: 'gal-03', title: 'H8X CAFETERIA', category: 'CAFÉ', img: '/img/bg/cafitaria.png', featured: false, views: '9.4k' },
    { id: 'gal-04', title: 'VIRTUAL GAMES ARENA', category: 'VIRTUAL GAMES', img: '/img/bg/virtuvalgame.png', featured: true, views: '18.9k' },
    { id: 'gal-05', title: 'BOARD GAME CAFÉ', category: 'BOARD GAMES', img: '/img/bg/boardgamecafe.png', featured: false, views: '8.2k' },
    { id: 'gal-06', title: 'SYNTHETIC TURF', category: 'TURF', img: '/img/bg/turf.png', featured: true, views: '22.1k' },
    { id: 'gal-07', title: 'THERMAL SAUNA', category: 'SAUNA', img: '/img/bg/sauna.png', featured: false, views: '7.6k' },
    { id: 'gal-ev1', title: 'NIGHT LEAGUE CHAMPIONSHIP', category: 'EVENTS', img: '/img/bg/turf.png', featured: true, views: '25.6k' },
    { id: 'gal-ch1', title: 'KIRA — AQUA OPERATIVE', category: 'CHARACTERS', img: '/img/ch1.png', featured: true, views: '31.0k' }
  ]);

  // 11. OFFERS STATE (Wired to Shared Global Offers State)
  const [internalOffersList, setInternalOffersList] = useState([
    { id: 'OFF-01', code: 'H8XFIRST', title: 'WELCOME OPERATIVE', desc: '20% discount on your first activity reservation', activity: 'ALL ACTIVITIES', discount: '20% OFF', startDate: '2026-09-01', endDate: '2026-10-31', usageLimit: 100, usage: 42, status: 'ACTIVE' },
    { id: 'OFF-02', code: 'ARENA50', title: 'WEEKEND ARENA CLASH', desc: '50% discount on synthetic turf and VR arenas', activity: 'TURF & VR', discount: '50% OFF', startDate: '2026-09-10', endDate: '2026-10-15', usageLimit: 50, usage: 28, status: 'ACTIVE' },
    { id: 'OFF-03', code: 'RECOVERYPRO', title: 'RECOVERY COMBO', desc: 'Flat ₹300 credit on Spa and Sauna thermal recovery sessions', activity: 'SPA + SAUNA', discount: '₹300 CREDIT', startDate: '2026-09-05', endDate: '2026-11-01', usageLimit: 150, usage: 65, status: 'ACTIVE' }
  ]);
  const offersList = externalOffersList || internalOffersList;
  const setOffersList = setExternalOffersList || setInternalOffersList;

  // 13. SETTINGS STATE
  const [xpSettings, setXpSettings] = useState({
    turfXp: 150,
    swimXp: 100,
    spaXp: 80,
    vrXp: 120,
    boardXp: 100,
    cafeXp: 30,
    saunaXp: 80,
    xpMultiplier: '1.5x (PRO)',
    levelThreshold: 250
  });

  // Animated counters trigger on open
  useEffect(() => {
    if (!isOpen) return;

    const animTargets = [
      { val: 0, target: effectiveBookings.length, setter: setCountTodayBookings, dur: 1 },
      { val: 0, target: 48950, setter: setCountTodayRevenue, dur: 1.2 },
      { val: 0, target: 84, setter: setCountActiveUsers, dur: 0.9 },
      { val: 0, target: effectiveUsersList.length, setter: setCountTotalUsers, dur: 1.1 },
      { val: 0, target: 14, setter: setCountSlots, dur: 0.7 },
      { val: 0, target: 73, setter: setCountCafeOrders, dur: 0.8 },
      { val: 0, target: 28, setter: setCountNewMembers, dur: 1 }
    ];

    animTargets.forEach(t => {
      const obj = { v: t.val };
      gsap.to(obj, {
        v: t.target,
        duration: t.dur,
        ease: 'power2.out',
        onUpdate: () => t.setter(Math.floor(obj.v))
      });
    });
  }, [isOpen, effectiveBookings.length, effectiveUsersList.length]);

  if (!isOpen) return null;

  // 14. GLOBAL COMMAND-STYLE SEARCH (Searches across live shared data)
  const handleGlobalSearch = (term) => {
    setGlobalSearch(term);
    if (!term.trim()) {
      setSearchResults(null);
      return;
    }
    const q = term.toLowerCase();
    const matchedUser = effectiveUsersList.find(u => 
      u.id.toLowerCase().includes(q) || 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q)
    );
    const matchedBooking = effectiveBookings.find(b => 
      b.id.toLowerCase().includes(q) || 
      b.player.toLowerCase().includes(q) || 
      (b.playerId && b.playerId.toLowerCase().includes(q)) ||
      b.activity.toLowerCase().includes(q)
    );
    const matchedPayment = adminPayments.find(p => 
      p.id.toLowerCase().includes(q) || 
      p.playerId.toLowerCase().includes(q)
    );

    setSearchResults({
      user: matchedUser || null,
      booking: matchedBooking || null,
      payment: matchedPayment || null
    });
  };

  // 3. ADMIN USER ACTIONS: UPDATE LEVEL, ADD XP, TOGGLE STATUS
  const handleAddXPToUser = (targetUserId, delta) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === targetUserId) {
        const newXp = Math.max(0, u.xp + delta);
        const newLevel = Math.floor(newXp / xpSettings.levelThreshold) + 1;
        return { ...u, xp: newXp, level: newLevel };
      }
      return u;
    }));

    // Live Sync with primary userProfile / progressionData if matching
    if (targetUserId === 'HX-000184') {
      if (setProgressionData) {
        setProgressionData(prev => {
          const newXp = Math.max(0, prev.user.xp + delta);
          const newLvl = Math.floor(newXp / 250) + 1;
          return {
            ...prev,
            user: { ...prev.user, xp: newXp, level: newLvl }
          };
        });
      }
      if (setUserProfile) {
        setUserProfile(prev => ({
          ...prev,
          points: Math.max(0, prev.points + delta)
        }));
      }
    }

    // Append to audit log
    const newAudit = {
      id: `adj-${Date.now()}`,
      playerId: targetUserId,
      amount: `${delta >= 0 ? '+' : ''}${delta} XP`,
      reason: xpAdjustReason,
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      admin: 'SYS_ADMIN'
    };
    setXpAdjustHistory(prev => [newAudit, ...prev]);

    // Toast feedback
    setCopiedToast(`Dispatched ${delta >= 0 ? '+' : ''}${delta} XP to ${targetUserId}`);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  const handleToggleUserStatus = (targetUserId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === targetUserId) {
        const nextStatus = u.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleToggleBookingStatus = (bookingId, newStatus) => {
    setAdminBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  const handleToggleCafeOrderStatus = (orderId, newStatus) => {
    setAdminCafeOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (setCafeOrders) {
      setCafeOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  // 15. CAFÉ ADMIN MENU MANAGEMENT HANDLERS
  const handleSaveCafeItem = (itemData) => {
    if (isNewCafeItem) {
      const newItem = {
        ...itemData,
        id: `cf-${Date.now()}`,
        available: itemData.available !== undefined ? itemData.available : true
      };
      setAdminCafeMenu(prev => [newItem, ...prev]);
      if (setCafeMenu) setCafeMenu(prev => [newItem, ...prev]);
    } else {
      setAdminCafeMenu(prev => prev.map(item => item.id === itemData.id ? itemData : item));
      if (setCafeMenu) setCafeMenu(prev => prev.map(item => item.id === itemData.id ? itemData : item));
    }
    setEditingCafeItem(null);
    setIsNewCafeItem(false);
  };

  const handleToggleCafeItemAvailability = (itemId) => {
    setAdminCafeMenu(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, available: !item.available };
      }
      return item;
    }));
    if (setCafeMenu) {
      setCafeMenu(prev => prev.map(item => item.id === itemId ? { ...item, available: !item.available } : item));
    }
  };

  const handleDeleteCafeItem = (itemId) => {
    setAdminCafeMenu(prev => prev.filter(item => item.id !== itemId));
    if (setCafeMenu) {
      setCafeMenu(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const handleToggleAgentCmd = (cmdId) => {
    setAgentCommandsState(prev => prev.map(c => c.id === cmdId ? { ...c, status: !c.status } : c));
  };

  const handleToggleActivityStatus = (actId) => {
    let nextStatus = 'OPERATIONAL';
    setAdminActivities(prev => prev.map(a => {
      if (a.id === actId) {
        nextStatus = a.status === 'OPERATIONAL' ? 'MAINTENANCE' : 'OPERATIONAL';
        return { ...a, status: nextStatus };
      }
      return a;
    }));

    if (setWorldsData) {
      setWorldsData(prev => prev.map(w => {
        if (w.id === actId) {
          const isMaint = nextStatus === 'MAINTENANCE';
          return {
            ...w,
            status: isMaint ? 'MAINTENANCE' : 'AVAILABLE',
            isAvailable: !isMaint
          };
        }
        return w;
      }));
    }

    if (setExternalNotifications) {
      const act = adminActivities.find(a => a.id === actId);
      setExternalNotifications(prev => [
        {
          id: `notif-adm-${Date.now()}`,
          type: 'EVENT',
          title: `FACILITY STATUS UPDATED: ${act?.title || actId}`,
          desc: `Command Center switched ${act?.title || actId} to ${nextStatus}. ${nextStatus === 'MAINTENANCE' ? 'Public reservations suspended.' : 'Full operations resumed.'}`,
          time: 'Just Now',
          timestamp: new Date().toISOString(),
          read: false,
          link: 'activities',
          badgeColor: nextStatus === 'MAINTENANCE' ? '#ff3366' : '#00ff88'
        },
        ...prev
      ]);
    }
  };

  // =========================================================================
  // PART 12: EVENTS & TOURNAMENTS ADMIN HANDLERS
  // =========================================================================
  const handleSaveEvent = (eventData) => {
    if (!eventData.title) return;
    if (isNewEventModal) {
      const newEv = {
        ...eventData,
        id: `ev-${Date.now()}`,
        number: `${(eventsList.length + 1) < 10 ? '0' : ''}${eventsList.length + 1}`,
        participants: eventData.participants || 0,
        status: eventData.status || 'REGISTRATION OPEN',
        image: eventData.image || '/img/bg/turf.png',
        character: eventData.character || '/img/ch6.png',
        characterName: eventData.characterName || 'VALKYRIE — STRIKER',
        rules: eventData.rules || ['Standard H8X Tournament Rules apply.'],
        prizes: eventData.prizes || [{ place: '1ST PLACE', prize: '₹10,000 + Champion Badge' }]
      };
      if (setEventsList) setEventsList(prev => [newEv, ...prev]);
      setCopiedToast(`Arena Event "${newEv.title}" published successfully.`);
    } else {
      if (setEventsList) {
        setEventsList(prev => prev.map(e => e.id === eventData.id ? eventData : e));
      }
      setCopiedToast(`Event "${eventData.title}" parameters updated.`);
    }
    setEditingEvent(null);
    setIsNewEventModal(false);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  const handleDeleteEvent = (eventId) => {
    if (setEventsList) {
      setEventsList(prev => prev.filter(e => e.id !== eventId));
    }
    setCopiedToast('Event removed from arena schedule.');
    setTimeout(() => setCopiedToast(null), 3000);
  };

  const handleToggleEventStatus = (eventId, nextStatus) => {
    if (setEventsList) {
      setEventsList(prev => prev.map(e => e.id === eventId ? { ...e, status: nextStatus } : e));
    }
    setCopiedToast(`Event status switched to ${nextStatus}`);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  const handleUpdateMatchScore = (tournId, roundIdx, matchId, s1, s2) => {
    if (!setTournamentsList) return;
    setTournamentsList(prev => prev.map(tourn => {
      if (tourn.id !== tournId) return tourn;
      const updatedRounds = tourn.rounds.map((round, rIdx) => {
        if (rIdx !== roundIdx) return round;
        const updatedMatches = round.matches.map(m => {
          if (m.id !== matchId) return m;
          const score1Num = Number(s1);
          const score2Num = Number(s2);
          const winner = score1Num > score2Num ? m.team1 : score2Num > score1Num ? m.team2 : null;
          return {
            ...m,
            score1: score1Num,
            score2: score2Num,
            winner: winner,
            status: winner ? 'FINISHED' : 'LIVE'
          };
        });
        return { ...round, matches: updatedMatches };
      });
      return { ...tourn, rounds: updatedRounds };
    }));
    setCopiedToast(`Match score updated in live bracket.`);
    setTimeout(() => setCopiedToast(null), 2000);
  };

  const handleAdvanceWinner = (tournId, roundIdx, matchId, winningTeam) => {
    if (!setTournamentsList) return;
    setTournamentsList(prev => prev.map(tourn => {
      if (tourn.id !== tournId) return tourn;
      const updatedRounds = tourn.rounds.map((round, rIdx) => {
        if (rIdx !== roundIdx) return round;
        const updatedMatches = round.matches.map(m => {
          if (m.id !== matchId) return m;
          return {
            ...m,
            winner: winningTeam,
            status: 'FINISHED'
          };
        });
        return { ...round, matches: updatedMatches };
      });
      return { ...tourn, rounds: updatedRounds };
    }));
    setCopiedToast(`Advanced ${winningTeam} to next round!`);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  const NAV_ITEMS = [
    '01 DASHBOARD', '02 USERS', '03 BOOKINGS', '04 ACTIVITIES', 
    '05 PROGRESSION', '06 AGENT', '07 PAYMENTS', '08 CAFÉ ORDERS', 
    '09 GALLERY', '10 OFFERS', '11 REPORTS', '12 EVENTS', '13 SETTINGS'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#07050e]/95 backdrop-blur-2xl font-cinzel select-text text-[#f3e5ab]">
      {/* EDITORIAL GRAIN OVERLAY */}
      <div className="grain-overlay" />

      {/* COMMAND CENTER FRAME */}
      <div className="relative w-full max-w-[1440px] h-[95vh] bg-[#090612] border-2 border-[#d4af37] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.3)] rounded-2xl">
        
        {/* ==========================================================================
           MINISTRY ADMIN HEADER
           ========================================================================== */}
        <header className="h-16 px-6 bg-[#120a22] border-b border-[#d4af37]/40 flex items-center justify-between flex-shrink-0 z-20">
          
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 border border-[#d4af37] flex items-center justify-center bg-[#140c24] rounded-lg">
              <span className="text-lg">⚖️</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-runes text-[#d4af37] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                <span>MINISTRY OF MAGIC // DEPARTMENT OF MAGICAL LAW ENFORCEMENT</span>
              </div>
              <h2 className="text-base font-magical gold-gradient-text uppercase tracking-widest">
                HEADMASTER & COUNCIL CONTROL DESK
              </h2>
            </div>
          </div>

          {/* GLOBAL SEARCH COMMAND BAR */}
          <div className="relative w-72 sm:w-96 hidden md:block">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="SEARCH (PLAYER ID, BOOKING, NAME, PHONE)..."
              value={globalSearch}
              onChange={e => handleGlobalSearch(e.target.value)}
              className="w-full bg-black/90 border border-white/15 pl-10 pr-4 py-2 rounded-full text-xs text-white placeholder-gray-500 outline-none focus:border-[#e5b96a] transition-all"
            />

            {/* LIVE GLOBAL SEARCH RESULTS POPUP */}
            {searchResults && (
              <div className="absolute top-11 left-0 right-0 glass-panel p-4 rounded-2xl border border-[#e5b96a]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 space-y-3 animate-scale-in">
                <div className="text-[10px] font-mono text-gray-400 border-b border-white/10 pb-1">SEARCH RESULTS</div>
                
                {searchResults.user && (
                  <div 
                    onClick={() => { setSelectedUserModal(searchResults.user); setSearchResults(null); }}
                    className="p-3 bg-black/80 rounded-xl border border-white/10 hover:border-[#00f0ff] cursor-pointer space-y-1"
                  >
                    <div className="text-[10px] text-[#00f0ff] font-bold">PLAYER IDENTITY</div>
                    <div className="text-xs font-bold text-white">{searchResults.user.name} ({searchResults.user.id})</div>
                    <div className="text-[10px] text-gray-400">LVL {searchResults.user.level} • {searchResults.user.xp} XP • {searchResults.user.spend} Total Spend</div>
                  </div>
                )}

                {searchResults.booking && (
                  <div 
                    onClick={() => { setSelectedBookingModal(searchResults.booking); setSearchResults(null); }}
                    className="p-3 bg-black/80 rounded-xl border border-white/10 hover:border-[#e5b96a] cursor-pointer space-y-1"
                  >
                    <div className="text-[10px] text-[#e5b96a] font-bold">BOOKING RECORD</div>
                    <div className="text-xs font-bold text-white">{searchResults.booking.id} — {searchResults.booking.activity}</div>
                    <div className="text-[10px] text-gray-400">{searchResults.booking.player} • {searchResults.booking.date} @ {searchResults.booking.time}</div>
                  </div>
                )}

                {!searchResults.user && !searchResults.booking && (
                  <div className="text-xs text-gray-400 text-center py-2">NO RECORDS MATCHED "{globalSearch}"</div>
                )}
              </div>
            )}
          </div>

          {/* HEADER CONTROLS (NOTIFICATIONS + SETTINGS + CLOSE) */}
          <div className="flex items-center gap-3">
            
            {/* NOTIFICATIONS DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="relative p-2.5 rounded-xl bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:border-[#e5b96a] transition-all"
                title="Admin Notifications"
              >
                <Bell size={16} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e5b96a] rounded-full shadow-[0_0_10px_#e5b96a] animate-pulse" />
                )}
              </button>

              {showNotificationsDropdown && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 glass-panel p-4 rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-white tracking-widest">LIVE COMMAND ALERTS</span>
                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
                      className="text-[10px] text-[#e5b96a] font-mono hover:underline"
                    >
                      MARK ALL READ
                    </button>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                    {notifications.map(n => (
                      <div key={n.id} className="p-3 bg-black/60 rounded-xl border border-white/10 text-xs space-y-1 hover:border-[#00f0ff]/50 transition-all">
                        <div className="flex justify-between font-bold text-white">
                          <span className="text-[#00f0ff]">{n.title}</span>
                          <span className="text-[9px] text-gray-500 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-300 font-['Inter']">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* QUICK SETTINGS BUTTON */}
            <button 
              onClick={() => setActiveTab('12 SETTINGS')}
              className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-gray-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
              title="System Settings"
            >
              <Settings size={16} />
            </button>

            {/* EXIT ADMIN MODAL BUTTON */}
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black transition-all text-xs font-bold flex items-center gap-1.5"
            >
              <X size={15} />
              <span className="hidden sm:inline">EXIT COMMAND</span>
            </button>

          </div>
        </header>

        {/* ==========================================================================
           SIDEBAR HUD & MAIN CONTENT PANELS
           ========================================================================== */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* FIXED SIDEBAR / HUD NAVIGATION */}
          <aside className="w-52 sm:w-60 bg-[#070a12] border-r border-white/10 p-3 space-y-1.5 overflow-y-auto no-scrollbar flex-shrink-0">
            <div className="text-[9px] font-mono text-gray-500 px-3 py-1.5 uppercase tracking-[0.25em]">OPERATIONS HUB</div>
            
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-widest transition-all flex items-center justify-between group ${
                    isActive 
                      ? 'bg-[#e5b96a] text-black shadow-[0_0_20px_rgba(229,185,106,0.4)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">{item}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse flex-shrink-0" />}
                </button>
              );
            })}
          </aside>

          {/* MAIN CONTENT DISPLAY AREA */}
          <main className="flex-1 p-5 sm:p-8 overflow-y-auto bg-[#070910] space-y-8">
            
            {/* TOAST ALERT NOTIFICATION */}
            {copiedToast && (
              <div className="fixed bottom-8 right-8 z-50 glass-panel px-6 py-3 rounded-2xl border border-[#00ff88] text-xs font-mono text-[#00ff88] flex items-center gap-2 shadow-2xl animate-bounce">
                <CheckCheck size={16} />
                <span>{copiedToast}</span>
              </div>
            )}

            {/* ==========================================================================
               01. DASHBOARD OVERVIEW & BALANCED METRICS
               ========================================================================== */}
            {activeTab === '01 DASHBOARD' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* SECTION TITLE & STATUS */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">COMMAND DASHBOARD</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Real-time telemetry and operation overview across 7 H8X experiences</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/60 px-4 py-1.5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>SYSTEM HEALTH 99.98%</span>
                  </div>
                </div>

                {/* 8 BALANCED METRICS HUD GRID (REQUESTED) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">TODAY'S BOOKINGS</div>
                    <div className="text-2xl sm:text-3xl font-black text-[#00f0ff]">{countTodayBookings}</div>
                    <div className="text-[9px] text-green-400 font-mono">+14% vs Yesterday</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">TODAY'S REVENUE</div>
                    <div className="text-2xl sm:text-3xl font-black text-[#e5b96a]">₹{countTodayRevenue.toLocaleString('en-IN')}</div>
                    <div className="text-[9px] text-green-400 font-mono">+18% Growth Pace</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">ACTIVE USERS</div>
                    <div className="text-2xl sm:text-3xl font-black text-white">{countActiveUsers.toLocaleString('en-IN')}</div>
                    <div className="text-[9px] text-gray-400 font-mono">Live On-Site & App</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">TOTAL USERS</div>
                    <div className="text-2xl sm:text-3xl font-black text-purple-400">{countTotalUsers.toLocaleString('en-IN')}</div>
                    <div className="text-[9px] text-green-400 font-mono">+320 This Week</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">POPULAR ACTIVITY</div>
                    <div className="text-xl sm:text-2xl font-black text-[#00ff88]">TURF</div>
                    <div className="text-[9px] text-gray-400 font-mono">Highest Capacity Ratio</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">AVAILABLE SLOTS</div>
                    <div className="text-2xl sm:text-3xl font-black text-[#ff9900]">{countSlots}</div>
                    <div className="text-[9px] text-gray-400 font-mono">Across All 7 Zones</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">CAFÉ ORDERS</div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400">{countCafeOrders}</div>
                    <div className="text-[9px] text-gray-400 font-mono">High-Protein Meals</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">NEW MEMBERS</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">{countNewMembers}</div>
                    <div className="text-[9px] text-green-400 font-mono">H8X Pro Pass Unlocked</div>
                  </div>
                </div>

                {/* 2. ANALYTICS CHARTS SECTION */}
                <div className="grid lg:grid-cols-3 gap-6">
                  
                  {/* CHART 1: BOOKINGS BY ACTIVITY (ALL 7 EXPERIENCES) */}
                  <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-widest">BOOKINGS BY H8X EXPERIENCE</h3>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">Comparative demand across all 7 zones</p>
                      </div>
                      <div className="flex gap-1.5 bg-black/60 p-1 rounded-lg border border-white/10 text-[10px] font-bold">
                        {['DAY', 'WEEK', 'MONTH', 'YEAR'].map(tf => (
                          <button 
                            key={tf} 
                            onClick={() => setAnalyticsTimeframe(tf)} 
                            className={`px-3 py-1 rounded transition-all ${analyticsTimeframe === tf ? 'bg-[#e5b96a] text-black font-extrabold' : 'text-gray-400 hover:text-white'}`}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-3 h-52 items-end pt-4 font-mono">
                      {[
                        { code: 'SWIM', val: 78, color: '#00f0ff', count: '78 SLOTS' },
                        { code: 'SPA', val: 45, color: '#e5b96a', count: '45 SLOTS' },
                        { code: 'CAFÉ', val: 92, color: '#ff9900', count: '92 SLOTS' },
                        { code: 'VR', val: 64, color: '#a855f7', count: '64 SLOTS' },
                        { code: 'BOARD', val: 50, color: '#ff3366', count: '50 SLOTS' },
                        { code: 'TURF', val: 98, color: '#00ff88', count: '98 SLOTS' },
                        { code: 'SAUNA', val: 40, color: '#ff5500', count: '40 SLOTS' }
                      ].map(bar => (
                        <div key={bar.code} className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                          <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">{bar.val}%</span>
                          <div 
                            className="w-full rounded-t-lg transition-all duration-500 group-hover:scale-y-105 group-hover:brightness-125 shadow-lg"
                            style={{ height: `${bar.val}%`, backgroundColor: bar.color }}
                          />
                          <span className="text-[9px] font-bold text-gray-400 truncate w-full text-center">{bar.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CHART 2: USER PROGRESSION DISTRIBUTION */}
                  <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold text-white tracking-widest">PROGRESSION LEVELS</h3>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">Player tier distribution</p>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      {[
                        { tier: 'TIER 1 (LVL 1–5)', pct: 42, count: '3,566 PLAYERS', color: '#00f0ff' },
                        { tier: 'TIER 2 (LVL 6–10)', pct: 33, count: '2,802 PLAYERS', color: '#e5b96a' },
                        { tier: 'TIER 3 (LVL 11–15)', pct: 18, count: '1,528 PLAYERS', color: '#00ff88' },
                        { tier: 'TIER 4 (LVL 16+ TITAN)', pct: 7, count: '596 PLAYERS', color: '#ff3366' }
                      ].map(item => (
                        <div key={item.tier} className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-white font-bold">{item.tier}</span>
                            <span style={{ color: item.color }} className="font-bold">{item.pct}%</span>
                          </div>
                          <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                          </div>
                          <div className="text-[9px] text-gray-500 text-right">{item.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ==========================================================================
               02. USERS MANAGEMENT MODULE
               ========================================================================== */}
            {activeTab === '02 USERS' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">REGISTERED PLAYER BASE</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Search and manage all player accounts, levels, XP, and privileges</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newId = `HX-${Math.floor(100000 + Math.random() * 900000)}`;
                      const newPlayer = {
                        id: newId,
                        name: 'NEW OPERATIVE',
                        email: 'operative@h8x.io',
                        phone: '+91 90000 00000',
                        level: 1,
                        xp: 0,
                        nextLevelXp: 500,
                        visits: 0,
                        bookingsCount: 0,
                        spend: '₹0',
                        status: 'ACTIVE',
                        avatar: '/img/ch1.png',
                        favourite: 'TURF',
                        membership: 'H8X MEMBER',
                        joinedDate: '2026-09-15',
                        achievementsCount: 0,
                        matches: 0,
                        sessions: 0
                      };
                      setUsersList(prev => [newPlayer, ...prev]);
                      setSelectedUserModal(newPlayer);
                    }}
                    className="cyber-btn text-xs px-4 py-2 flex items-center gap-2"
                  >
                    <Plus size={14} /> + REGISTER NEW PLAYER
                  </button>
                </div>

                {/* USER TABLE (WITH ALL SPECIFIED COLUMNS) */}
                <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-black/80 text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="p-4">PLAYER ID</th>
                        <th className="p-4">NAME</th>
                        <th className="p-4">LEVEL</th>
                        <th className="p-4">XP</th>
                        <th className="p-4">TOTAL VISITS</th>
                        <th className="p-4">BOOKINGS</th>
                        <th className="p-4">TOTAL SPEND</th>
                        <th className="p-4">STATUS</th>
                        <th className="p-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {effectiveUsersList.map((usr) => (
                        <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-[#e5b96a]">{usr.id}</td>
                          <td className="p-4 font-bold text-white flex items-center gap-2">
                            <img src={usr.avatar} alt={usr.name} className="w-6 h-6 rounded-full object-cover border border-white/20" />
                            <span>{usr.name}</span>
                          </td>
                          <td className="p-4 text-[#00f0ff] font-bold">LVL {usr.level}</td>
                          <td className="p-4 text-white">{usr.xp} XP</td>
                          <td className="p-4 text-gray-300">{usr.visits}</td>
                          <td className="p-4 text-gray-300">{usr.bookingsCount}</td>
                          <td className="p-4 text-[#00ff88] font-bold">{usr.spend}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${usr.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                              {usr.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button 
                              onClick={() => setSelectedUserModal(usr)}
                              className="p-1.5 bg-black border border-white/20 rounded hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-all"
                              title="View / Edit Profile"
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              onClick={() => handleToggleUserStatus(usr.id)}
                              className="p-1.5 bg-black border border-white/20 rounded hover:border-red-400 text-gray-300 hover:text-red-400 transition-all"
                              title="Toggle User Status"
                            >
                              <Lock size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==========================================================================
               03. BOOKINGS MANAGEMENT MODULE (WITH CALENDAR / FILTERS)
               ========================================================================== */}
            {activeTab === '03 BOOKINGS' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">BOOKING & MISSION PASS LEDGER</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Monitor reservations, slot capacity, and reschedule passes</p>
                  </div>
                  
                  {/* FILTERS: ALL, CONFIRMED, PENDING, COMPLETED, CANCELLED */}
                  <div className="flex gap-2 bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-bold">
                    {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map(flt => (
                      <button 
                        key={flt} 
                        onClick={() => setBookingFilter(flt)} 
                        className={`px-3 py-1.5 rounded-lg transition-all ${bookingFilter === flt ? 'bg-[#e5b96a] text-black font-black' : 'text-gray-400 hover:text-white'}`}
                      >
                        {flt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-black/80 text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="p-4">BOOKING ID</th>
                        <th className="p-4">PLAYER</th>
                        <th className="p-4">ACTIVITY</th>
                        <th className="p-4">DATE & TIME</th>
                        <th className="p-4">SQUAD</th>
                        <th className="p-4">AMOUNT</th>
                        <th className="p-4">PAYMENT</th>
                        <th className="p-4">STATUS</th>
                        <th className="p-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {effectiveBookings.filter(b => bookingFilter === 'ALL' || b.status === bookingFilter).map((bk) => (
                        <tr key={bk.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-[#e5b96a]">{bk.id}</td>
                          <td className="p-4 text-white font-bold">{bk.player}</td>
                          <td className="p-4 text-[#00f0ff] font-bold">{bk.activity}</td>
                          <td className="p-4 text-gray-300">{bk.date} @ {bk.time}</td>
                          <td className="p-4 text-gray-300">{bk.people} PLAYERS</td>
                          <td className="p-4 font-bold text-[#00ff88]">{bk.amount}</td>
                          <td className="p-4">
                            <span className="text-gray-300">{bk.payment}</span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              bk.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                              bk.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                              bk.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                              'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                            }`}>
                              {bk.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button 
                              onClick={() => setSelectedBookingModal(bk)}
                              className="px-2 py-1 bg-black border border-white/20 rounded hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff]"
                            >
                              DETAILS
                            </button>
                            {bk.status === 'PENDING' && (
                              <button 
                                onClick={() => handleToggleBookingStatus(bk.id, 'CONFIRMED')}
                                className="px-2 py-1 bg-green-500 text-black font-bold rounded"
                              >
                                CONFIRM
                              </button>
                            )}
                            {bk.status === 'CONFIRMED' && (
                              <button 
                                onClick={() => handleToggleBookingStatus(bk.id, 'CANCELLED')}
                                className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/40 rounded"
                              >
                                CANCEL
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==========================================================================
               04. ACTIVITIES MANAGEMENT MODULE (7 H8X EXPERIENCES)
               ========================================================================== */}
            {activeTab === '04 ACTIVITIES' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">H8X 7 UNIVERSE EXPERIENCES</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Control pricing, rules, XP rewards, hours, and operational status</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newAct = {
                        id: `0${adminActivities.length + 1}`,
                        code: 'CUSTOM ARENA',
                        title: 'NEW ARENA EXPANSION',
                        subtitle: 'CHALLENGE ZONE',
                        price: '₹1,500 / slot',
                        capacity: '10 Players',
                        hours: '08:00 AM – 10:00 PM',
                        xpReward: 120,
                        status: 'OPERATIONAL',
                        bg: '/img/bg/turf.png',
                        desc: 'Advanced tactical simulation space.'
                      };
                      setAdminActivities(prev => [...prev, newAct]);
                    }}
                    className="cyber-btn text-xs px-4 py-2"
                  >
                    + CREATE ACTIVITY
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adminActivities.map((act) => (
                    <div key={act.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 hover:border-[#e5b96a]/40 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="relative h-36 rounded-xl overflow-hidden border border-white/10">
                          <img src={act.bg} alt={act.title} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/20 text-[10px] text-[#e5b96a] font-bold">
                            ZONE {act.id}
                          </div>
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${act.status === 'OPERATIONAL' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                              {act.status}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold text-white text-base">{act.title}</h3>
                            <span className="text-xs font-bold text-[#e5b96a] font-mono">{act.price}</span>
                          </div>
                          <p className="text-xs text-gray-400 font-['Inter'] mt-1 line-clamp-2">{act.desc}</p>
                        </div>

                        <div className="p-3 bg-black/60 rounded-xl text-[10px] font-mono text-gray-300 space-y-1">
                          <div className="flex justify-between"><span>CAPACITY:</span> <span className="text-white">{act.capacity}</span></div>
                          <div className="flex justify-between"><span>HOURS:</span> <span className="text-white">{act.hours}</span></div>
                          <div className="flex justify-between"><span>XP REWARD:</span> <span className="text-[#00ff88] font-bold">+{act.xpReward} XP</span></div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <button 
                          onClick={() => setSelectedActivityModal(act)}
                          className="flex-1 py-2 rounded bg-black border border-white/20 text-xs font-bold hover:border-[#00f0ff] transition-all"
                        >
                          EDIT
                        </button>
                        <button 
                          onClick={() => handleToggleActivityStatus(act.id)}
                          className={`flex-1 py-2 rounded text-xs font-bold border transition-all ${
                            act.status === 'OPERATIONAL' 
                              ? 'border-yellow-500/40 text-yellow-400 hover:bg-yellow-500 hover:text-black' 
                              : 'border-green-500/40 text-green-400 hover:bg-green-500 hover:text-black'
                          }`}
                        >
                          {act.status === 'OPERATIONAL' ? 'SET MAINT' : 'ENABLE'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================================================
               05. PROGRESSION MANAGEMENT & AUDIT LOGS
               ========================================================================== */}
            {activeTab === '05 PROGRESSION' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-black text-white tracking-wider">PROGRESSION & MANUAL XP CONTROLS</h2>
                  <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Dispatch XP adjustments, level calibrations, and maintain audit logs</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* MANUAL XP DISPATCH CONSOLE */}
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#e5b96a]/30 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#e5b96a] tracking-widest">
                      <Zap size={16} />
                      <span>DISPATCH MANUAL XP ADJUSTMENT</span>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      <div>
                        <label className="text-gray-400 block mb-1">SELECT TARGET PLAYER</label>
                        <select 
                          value={selectedProgressionUser}
                          onChange={e => setSelectedProgressionUser(e.target.value)}
                          className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none focus:border-[#e5b96a]"
                        >
                          {usersList.map(u => (
                            <option key={u.id} value={u.id}>
                              {u.name} ({u.id}) — LVL {u.level} [{u.xp} XP]
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-400 block mb-1">XP AMOUNT TO APPLY</label>
                        <input 
                          type="number" 
                          value={xpAdjustAmount} 
                          onChange={e => setXpAdjustAmount(Number(e.target.value))}
                          className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none focus:border-[#e5b96a]" 
                        />
                      </div>

                      <div>
                        <label className="text-gray-400 block mb-1">REASON / AUDIT RECORD</label>
                        <input 
                          type="text" 
                          value={xpAdjustReason} 
                          onChange={e => setXpAdjustReason(e.target.value)}
                          className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none focus:border-[#e5b96a]" 
                        />
                      </div>

                      <div className="flex gap-4 pt-2">
                        <button 
                          onClick={() => handleAddXPToUser(selectedProgressionUser, xpAdjustAmount)}
                          className="flex-1 cyber-btn bg-[#00ff88] text-black font-black text-xs py-3 rounded-xl"
                        >
                          + ADD XP
                        </button>
                        <button 
                          onClick={() => handleAddXPToUser(selectedProgressionUser, -xpAdjustAmount)}
                          className="flex-1 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-black font-bold text-xs py-3 rounded-xl transition-all"
                        >
                          - REMOVE XP
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AUDIT LOG HISTORY */}
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-widest border-b border-white/10 pb-3">
                        MANUAL XP AUDIT HISTORY
                      </h3>
                      <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar pt-3">
                        {xpAdjustHistory.map(adj => (
                          <div key={adj.id} className="p-3.5 bg-black/60 rounded-xl border border-white/10 text-xs font-mono space-y-1">
                            <div className="flex justify-between font-bold">
                              <span className="text-[#e5b96a]">{adj.playerId}</span>
                              <span className={adj.amount.startsWith('+') ? 'text-[#00ff88]' : 'text-red-400'}>{adj.amount}</span>
                            </div>
                            <div className="text-gray-300 text-[11px]">Reason: "{adj.reason}"</div>
                            <div className="flex justify-between text-[9px] text-gray-500 pt-1 border-t border-white/5">
                              <span>BY: {adj.admin}</span>
                              <span>{adj.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," + xpAdjustHistory.map(e => `${e.id},${e.playerId},${e.amount},"${e.reason}",${e.date}`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "xp_audit_report.csv");
                        document.body.appendChild(link);
                        link.click();
                      }}
                      className="w-full py-2.5 bg-black border border-white/20 rounded-xl text-xs font-bold hover:border-[#00f0ff] flex items-center justify-center gap-2"
                    >
                      <Download size={14} /> EXPORT AUDIT LOG (CSV)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================================
               06. AGENT COMMANDS MODULE
               ========================================================================== */}
            {activeTab === '06 AGENT' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-black text-white tracking-wider">YOUR H8X AGENT CONTROL</h2>
                  <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Manage interactive conversational commands, responses, and recommendations</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {agentCommandsState.map(cmd => (
                    <div key={cmd.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-mono">
                      <div className="flex justify-between items-center">
                        <div className="font-black text-white text-sm tracking-wider">{cmd.name}</div>
                        <button 
                          onClick={() => handleToggleAgentCmd(cmd.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                            cmd.status ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'
                          }`}
                        >
                          {cmd.status ? 'ENABLED ●' : 'DISABLED ○'}
                        </button>
                      </div>

                      <div className="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
                        <span className="text-[10px] text-gray-500">MAPPED RESPONSE:</span>
                        <p className="text-gray-300 font-['Inter']">{cmd.response}</p>
                      </div>

                      <div className="text-[10px] text-[#e5b96a]">PROMOTIONAL HOOK: {cmd.promo}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================================================
               07. PAYMENTS LEDGER & REWARDS CATALOG MODULE (PART 11)
               ========================================================================== */}
            {activeTab === '07 PAYMENTS' && (
              <div className="space-y-6 animate-fade-in font-['Orbitron']">
                {/* SUB-NAVIGATION & VIEW TOGGLE */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">H8X FINANCIAL COMMAND CENTER</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Live transaction auditing, gateway settlement, revenue analytics & rewards catalog</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex bg-black/70 p-1 rounded-xl border border-white/10 text-xs font-mono">
                      <button
                        onClick={() => setAdminPaymentSubTab('TRANSACTIONS')}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${adminPaymentSubTab === 'TRANSACTIONS' ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-gray-400 hover:text-white'}`}
                      >
                        TRANSACTIONS ({paymentTransactions.length})
                      </button>
                      <button
                        onClick={() => setAdminPaymentSubTab('REWARDS_CATALOG')}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${adminPaymentSubTab === 'REWARDS_CATALOG' ? 'bg-[#e5b96a] text-black shadow-[0_0_15px_rgba(229,185,106,0.4)]' : 'text-gray-400 hover:text-white'}`}
                      >
                        REWARDS CATALOG ({rewardsCatalog.length})
                      </button>
                    </div>

                    {adminPaymentSubTab === 'REWARDS_CATALOG' && (
                      <button
                        onClick={() => {
                          setEditingReward({
                            id: '',
                            title: '',
                            pointsRequired: 500,
                            category: 'CAFÉ',
                            description: '',
                            stock: 50,
                            expiryDays: 30,
                            active: true
                          });
                          setIsNewReward(true);
                        }}
                        className="cyber-btn text-xs px-4 py-2 bg-[#e5b96a] text-black border-[#e5b96a]"
                      >
                        + CREATE REWARD
                      </button>
                    )}
                  </div>
                </div>

                {/* TOAST BANNER */}
                {rewardToast && (
                  <div className="p-3.5 bg-green-500/10 border border-green-500/40 rounded-xl text-green-400 text-xs font-mono flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>{rewardToast}</span>
                    </div>
                    <button onClick={() => setRewardToast(null)} className="text-gray-400 hover:text-white">✕</button>
                  </div>
                )}

                {/* ======================================================================
                   VIEW 1: TRANSACTIONS & REVENUE ANALYTICS
                   ====================================================================== */}
                {adminPaymentSubTab === 'TRANSACTIONS' && (
                  <div className="space-y-6">
                    {/* 15. TOP KPI METRICS TILES */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {/* TODAY'S REVENUE */}
                      <div className="p-4 bg-black/60 border border-green-500/40 rounded-2xl relative overflow-hidden group">
                        <div className="text-[9px] font-mono text-gray-400 tracking-wider">TODAY'S REVENUE</div>
                        <div className="text-2xl sm:text-3xl font-black text-green-400 mt-1">₹84,500</div>
                        <div className="text-[9px] font-mono text-green-400/80 mt-1 flex items-center gap-1">
                          <ArrowUpRight size={12} />
                          <span>+14.2% vs yesterday</span>
                        </div>
                      </div>

                      {/* TOTAL TRANSACTIONS */}
                      <div className="p-4 bg-black/60 border border-[#00f0ff]/40 rounded-2xl relative overflow-hidden group">
                        <div className="text-[9px] font-mono text-gray-400 tracking-wider">TOTAL TRANSACTIONS</div>
                        <div className="text-2xl sm:text-3xl font-black text-[#00f0ff] mt-1">382</div>
                        <div className="text-[9px] font-mono text-gray-400 mt-1">
                          Processed today
                        </div>
                      </div>

                      {/* SUCCESSFUL */}
                      <div className="p-4 bg-black/60 border border-white/10 rounded-2xl">
                        <div className="text-[9px] font-mono text-gray-400 tracking-wider">SUCCESSFUL</div>
                        <div className="text-2xl sm:text-3xl font-black text-white mt-1">351</div>
                        <div className="text-[9px] font-mono text-green-400 mt-1">
                          91.8% success rate
                        </div>
                      </div>

                      {/* FAILED */}
                      <div className="p-4 bg-black/60 border border-red-500/30 rounded-2xl">
                        <div className="text-[9px] font-mono text-gray-400 tracking-wider">FAILED / DROPPED</div>
                        <div className="text-2xl sm:text-3xl font-black text-red-400 mt-1">18</div>
                        <div className="text-[9px] font-mono text-red-400/80 mt-1">
                          4.7% failure rate
                        </div>
                      </div>

                      {/* REFUNDS */}
                      <div className="p-4 bg-black/60 border border-purple-500/30 rounded-2xl">
                        <div className="text-[9px] font-mono text-gray-400 tracking-wider">REFUNDS PROCESSED</div>
                        <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-1">13</div>
                        <div className="text-[9px] font-mono text-purple-400/80 mt-1">
                          ₹12,400 total
                        </div>
                      </div>
                    </div>

                    {/* 18. REVENUE ANALYTICS (DAILY / WEEKLY / MONTHLY) */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <BarChart3 size={18} className="text-[#00f0ff]" />
                          <h3 className="text-base font-black text-white tracking-widest">REVENUE ANALYTICS // MULTI-EXPERIENCE BREAKDOWN</h3>
                        </div>

                        {/* Timeframe selector */}
                        <div className="flex bg-black/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
                          {['TODAY', 'WEEKLY', 'MONTHLY'].map(tf => (
                            <button
                              key={tf}
                              onClick={() => setAdminPaymentTimeframe(tf)}
                              className={`px-3 py-1 rounded-lg font-bold transition-all ${adminPaymentTimeframe === tf ? 'bg-[#00f0ff] text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 text-xs font-mono">
                        {/* Experiences Breakdown */}
                        <div className="space-y-3.5">
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest">REVENUE BY EXPERIENCE ZONE</div>
                          
                          {[
                            { name: 'SYNTHETIC TURF', rev: '₹32,000', pct: 38, color: '#00ff88' },
                            { name: 'SPA & WELLNESS', rev: '₹18,500', pct: 22, color: '#e5b96a' },
                            { name: 'SWIMMING POOL', rev: '₹14,200', pct: 17, color: '#00f0ff' },
                            { name: 'VIRTUAL GAMES ARENA', rev: '₹11,800', pct: 14, color: '#a855f7' },
                            { name: 'H8X CAFETERIA', rev: '₹6,200', pct: 7, color: '#ff9900' },
                            { name: 'BOARD GAME CAFÉ', rev: '₹1,800', pct: 2, color: '#ff3366' },
                          ].map(exp => (
                            <div key={exp.name} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-white font-bold">{exp.name}</span>
                                <span className="text-gray-300 font-mono font-bold">{exp.rev} ({exp.pct}%)</span>
                              </div>
                              <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden border border-white/5">
                                <div 
                                  className="h-full rounded-full transition-all duration-500" 
                                  style={{ width: `${exp.pct}%`, backgroundColor: exp.color, boxShadow: `0 0 8px ${exp.color}` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Revenue Category Distribution */}
                        <div className="space-y-4">
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest">REVENUE BY CATEGORY</div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-black/60 rounded-xl border border-white/10 space-y-1">
                              <div className="text-[10px] text-gray-400">ACTIVITY BOOKINGS</div>
                              <div className="text-xl font-black text-white">65%</div>
                              <div className="text-[9px] text-[#00ff88]">₹54,925</div>
                            </div>

                            <div className="p-4 bg-black/60 rounded-xl border border-white/10 space-y-1">
                              <div className="text-[10px] text-gray-400">CAFÉ FOOD & DRINKS</div>
                              <div className="text-xl font-black text-white">18%</div>
                              <div className="text-[9px] text-[#ff9900]">₹15,210</div>
                            </div>

                            <div className="p-4 bg-black/60 rounded-xl border border-white/10 space-y-1">
                              <div className="text-[10px] text-gray-400">PRO MEMBERSHIPS</div>
                              <div className="text-xl font-black text-white">12%</div>
                              <div className="text-[9px] text-[#00f0ff]">₹10,140</div>
                            </div>

                            <div className="p-4 bg-black/60 rounded-xl border border-white/10 space-y-1">
                              <div className="text-[10px] text-gray-400">COMBOS & PASSES</div>
                              <div className="text-xl font-black text-white">5%</div>
                              <div className="text-[9px] text-[#e5b96a]">₹4,225</div>
                            </div>
                          </div>

                          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-[11px] text-gray-300 font-['Inter'] leading-relaxed">
                            <span className="text-[#00f0ff] font-bold font-mono">GATEWAY NOTE:</span> All transactions are reconciled in real-time. Automated GST invoices are archived with TLS 256-bit encryption.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 19. SEARCH & FILTER CONTROLS */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                      {/* Search Bar */}
                      <div className="relative flex-1">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="SEARCH BY TXN ID, PLAYER, BOOKING ID, METHOD..." 
                          value={adminPaymentSearch}
                          onChange={e => setAdminPaymentSearch(e.target.value)}
                          className="w-full bg-black/70 border border-white/20 pl-10 pr-4 py-2.5 rounded-xl text-white text-xs font-mono outline-none focus:border-[#00f0ff]"
                        />
                      </div>

                      {/* Filter Pills */}
                      <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-mono overflow-x-auto no-scrollbar">
                        {['ALL', 'PAID', 'PENDING', 'FAILED', 'REFUNDED'].map(f => (
                          <button
                            key={f}
                            onClick={() => setAdminPaymentFilter(f)}
                            className={`px-3 py-1.5 rounded-lg transition-all font-bold whitespace-nowrap ${
                              adminPaymentFilter === f ? 'bg-[#00f0ff] text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]' : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* TRANSACTIONS AUDIT TABLE */}
                    <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-black/80 text-gray-400 border-b border-white/10">
                          <tr>
                            <th className="p-4">TXN ID</th>
                            <th className="p-4">PLAYER & ID</th>
                            <th className="p-4">DESCRIPTION</th>
                            <th className="p-4">AMOUNT</th>
                            <th className="p-4">METHOD</th>
                            <th className="p-4">REWARDS</th>
                            <th className="p-4">STATUS</th>
                            <th className="p-4 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {paymentTransactions
                            .filter(t => {
                              const matchesSearch = !adminPaymentSearch || 
                                t.id?.toLowerCase().includes(adminPaymentSearch.toLowerCase()) ||
                                t.userName?.toLowerCase().includes(adminPaymentSearch.toLowerCase()) ||
                                t.userId?.toLowerCase().includes(adminPaymentSearch.toLowerCase()) ||
                                t.bookingId?.toLowerCase().includes(adminPaymentSearch.toLowerCase()) ||
                                t.description?.toLowerCase().includes(adminPaymentSearch.toLowerCase());
                              
                              const matchesFilter = adminPaymentFilter === 'ALL' || 
                                t.status === adminPaymentFilter ||
                                (adminPaymentFilter === 'REFUNDED' && (t.status === 'REFUNDED' || t.refundStatus === 'REFUNDED'));
                              
                              return matchesSearch && matchesFilter;
                            })
                            .map((p) => {
                              const isRefunded = p.status === 'REFUNDED' || p.refundStatus === 'REFUNDED';
                              const isPaid = p.status === 'PAID';
                              const isFailed = p.status === 'FAILED';

                              return (
                                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                  <td className="p-4 font-bold text-[#00f0ff]">{p.id}</td>
                                  <td className="p-4">
                                    <div className="text-white font-bold">{p.userName}</div>
                                    <div className="text-[10px] text-gray-400">{p.userId}</div>
                                  </td>
                                  <td className="p-4">
                                    <div className="text-gray-200">{p.description}</div>
                                    <div className="text-[10px] text-gray-400">{p.date} {p.bookingId ? `• ${p.bookingId}` : ''}</div>
                                  </td>
                                  <td className="p-4 font-black text-white">{p.amountFormatted || `₹${p.amount?.toLocaleString()}`}</td>
                                  <td className="p-4 text-gray-300">{p.method}</td>
                                  <td className="p-4">
                                    <div className="text-[#00f0ff] font-bold">+{p.xpEarned} XP</div>
                                    <div className="text-[#e5b96a] font-bold">+{p.rewardPointsEarned} PTS</div>
                                  </td>
                                  <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                      isPaid ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                                      isFailed ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                                      isRefunded ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' :
                                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                                    }`}>
                                      {p.status}
                                    </span>
                                  </td>
                                  <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        onClick={() => setAdminSelectedReceipt(p)}
                                        className="px-2.5 py-1 rounded-lg bg-black border border-white/20 hover:border-[#00f0ff] text-white text-[10px] font-bold flex items-center gap-1"
                                        title="View Receipt"
                                      >
                                        <Printer size={12} />
                                        <span>RECEIPT</span>
                                      </button>

                                      {!isRefunded && isPaid && (
                                        <button
                                          onClick={() => handleProcessRefund(p)}
                                          className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 text-[10px] font-bold transition-all"
                                        >
                                          REFUND
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ======================================================================
                   VIEW 2: REWARDS CATALOG MANAGEMENT (CRUD)
                   ====================================================================== */}
                {adminPaymentSubTab === 'REWARDS_CATALOG' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rewardsCatalog.map((reward) => (
                        <div 
                          key={reward.id}
                          className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#e5b96a]/50 transition-all group"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="px-2.5 py-0.5 rounded bg-[#e5b96a]/20 text-[#e5b96a] text-[10px] font-bold border border-[#e5b96a]/30">
                                {reward.category}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${reward.stock > 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                {reward.stock > 0 ? `${reward.stock} IN STOCK` : 'OUT OF STOCK'}
                              </span>
                            </div>

                            <h4 className="text-base font-black text-white">{reward.title}</h4>
                            <p className="text-xs text-gray-400 font-['Inter'] line-clamp-2">{reward.description}</p>
                          </div>

                          <div className="pt-3 border-t border-white/10 space-y-3 text-xs font-mono">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">POINTS COST:</span>
                              <span className="text-base font-black text-[#e5b96a]">{reward.pointsRequired} PTS</span>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => handleToggleRewardStock(reward.id)}
                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                                  reward.stock > 0 ? 'bg-black border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20' : 'bg-green-500/20 text-green-400 border-green-500/40'
                                }`}
                              >
                                {reward.stock > 0 ? 'SET OUT OF STOCK' : 'RESTOCK (50)'}
                              </button>

                              <button
                                onClick={() => {
                                  setEditingReward(reward);
                                  setIsNewReward(false);
                                }}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-black border border-white/20 text-white hover:border-[#e5b96a]"
                              >
                                EDIT
                              </button>

                              <button
                                onClick={() => handleDeleteReward(reward.id)}
                                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* EDIT / CREATE REWARD MODAL */}
                    {editingReward && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in font-['Orbitron']">
                        <div className="relative w-full max-w-md glass-panel border border-[#e5b96a]/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                          <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <h3 className="text-lg font-black text-white">
                              {isNewReward ? 'CREATE MARKETPLACE REWARD' : `EDIT REWARD: ${editingReward.title}`}
                            </h3>
                            <button onClick={() => setEditingReward(null)} className="text-gray-400 hover:text-white">
                              <X size={18} />
                            </button>
                          </div>

                          <div className="space-y-3 text-xs font-mono">
                            <div>
                              <label className="text-gray-400 block mb-1">REWARD TITLE</label>
                              <input 
                                type="text"
                                value={editingReward.title}
                                onChange={e => setEditingReward({ ...editingReward, title: e.target.value })}
                                className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none focus:border-[#e5b96a]"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-gray-400 block mb-1">CATEGORY</label>
                                <select
                                  value={editingReward.category}
                                  onChange={e => setEditingReward({ ...editingReward, category: e.target.value })}
                                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none focus:border-[#e5b96a]"
                                >
                                  <option value="CAFÉ">CAFÉ</option>
                                  <option value="TURF">TURF</option>
                                  <option value="SPA">SPA</option>
                                  <option value="MERCHANDISE">MERCHANDISE</option>
                                  <option value="VIP PASS">VIP PASS</option>
                                </select>
                              </div>

                              <div>
                                <label className="text-gray-400 block mb-1">POINTS REQUIRED</label>
                                <input 
                                  type="number"
                                  value={editingReward.pointsRequired}
                                  onChange={e => setEditingReward({ ...editingReward, pointsRequired: Number(e.target.value) })}
                                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none focus:border-[#e5b96a]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-gray-400 block mb-1">STOCK COUNT</label>
                                <input 
                                  type="number"
                                  value={editingReward.stock}
                                  onChange={e => setEditingReward({ ...editingReward, stock: Number(e.target.value) })}
                                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none focus:border-[#e5b96a]"
                                />
                              </div>

                              <div>
                                <label className="text-gray-400 block mb-1">EXPIRY (DAYS)</label>
                                <input 
                                  type="number"
                                  value={editingReward.expiryDays || 30}
                                  onChange={e => setEditingReward({ ...editingReward, expiryDays: Number(e.target.value) })}
                                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none focus:border-[#e5b96a]"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-gray-400 block mb-1">DESCRIPTION</label>
                              <textarea 
                                rows={2}
                                value={editingReward.description}
                                onChange={e => setEditingReward({ ...editingReward, description: e.target.value })}
                                className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none focus:border-[#e5b96a] font-['Inter']"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => setEditingReward(null)}
                              className="flex-1 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-gray-400 hover:text-white"
                            >
                              CANCEL
                            </button>
                            <button
                              onClick={() => handleSaveReward(editingReward)}
                              className="flex-1 cyber-btn bg-[#e5b96a] text-black font-black py-2.5 text-xs"
                            >
                              SAVE REWARD
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ==========================================================================
               08. CAFÉ ORDERS & MENU MANAGEMENT (PART 10)
               ========================================================================== */}
            {activeTab === '08 CAFÉ ORDERS' && (
              <div className="space-y-6 animate-fade-in">
                {/* SUB-NAVIGATION & VIEW TOGGLE */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">H8X CAFÉ OPERATIONS</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Kitchen orders queue, package sync & menu management</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex bg-black/70 p-1 rounded-xl border border-white/10 text-xs font-mono">
                      <button
                        onClick={() => setCafeViewMode('ORDERS')}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${cafeViewMode === 'ORDERS' ? 'bg-[#ff9900] text-black shadow-[0_0_15px_rgba(255,153,0,0.4)]' : 'text-gray-400 hover:text-white'}`}
                      >
                        ORDERS QUEUE ({adminCafeOrders.length})
                      </button>
                      <button
                        onClick={() => setCafeViewMode('MENU')}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${cafeViewMode === 'MENU' ? 'bg-[#ff9900] text-black shadow-[0_0_15px_rgba(255,153,0,0.4)]' : 'text-gray-400 hover:text-white'}`}
                      >
                        MENU ITEMS ({adminCafeMenu.length})
                      </button>
                    </div>

                    {cafeViewMode === 'MENU' && (
                      <button
                        onClick={() => {
                          setEditingCafeItem({
                            id: '',
                            name: '',
                            category: 'MEALS',
                            description: '',
                            ingredients: [''],
                            nutrition: { calories: 500, protein: '30g', carbs: '40g', fats: '15g' },
                            price: 250,
                            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
                            xpReward: 20,
                            available: true
                          });
                          setIsNewCafeItem(true);
                        }}
                        className="cyber-btn text-xs px-4 py-2 bg-[#00ff88] text-black border-[#00ff88]"
                      >
                        + CREATE ITEM
                      </button>
                    )}
                  </div>
                </div>

                {/* VIEW 1: LIVE ORDERS QUEUE */}
                {cafeViewMode === 'ORDERS' && (
                  <div className="space-y-4">
                    {/* Category Filter */}
                    <div className="flex gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10 text-xs overflow-x-auto no-scrollbar">
                      {['ALL', 'MEALS', 'SNACKS', 'BEVERAGES', 'DESSERTS'].map(cat => (
                        <button 
                          key={cat} 
                          onClick={() => setCafeCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${cafeCategoryFilter === cat ? 'bg-[#ff9900] text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {adminCafeOrders.filter(o => cafeCategoryFilter === 'ALL' || o.category === cafeCategoryFilter).map(ord => (
                        <div key={ord.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono hover:border-[#ff9900]/40 transition-all">
                          <div className="space-y-1.5 text-left">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-[#ff9900]/20 text-[#ff9900] border border-[#ff9900]/40 text-[9px] font-bold rounded">
                                {ord.combo || 'CAFÉ TICKET'}
                              </span>
                              <span className="text-gray-400 font-bold">{ord.id}</span>
                              <span className="text-gray-500">• {ord.time || 'Recent'}</span>
                            </div>
                            <h3 className="text-sm font-bold text-white">{ord.player} — <span className="text-gray-300">{ord.items}</span></h3>
                            {ord.activityBookingId && (
                              <div className="text-[10px] text-[#00f0ff] font-bold">SYNCHRONIZED PASS: {ord.activityBookingId} ({ord.activityTitle || 'ARENA'})</div>
                            )}
                          </div>

                          <div className="flex items-center gap-4 self-end sm:self-center">
                            <div className="text-right">
                              <div className="font-black text-lg text-[#e5b96a]">{ord.total}</div>
                              <span className={`text-[10px] font-bold ${
                                ord.status === 'COMPLETED' ? 'text-[#00ff88]' :
                                ord.status === 'READY' ? 'text-[#00f0ff]' :
                                ord.status === 'PREPARING' ? 'text-[#ff9900]' :
                                ord.status === 'CANCELLED' ? 'text-red-400' : 'text-yellow-400'
                              }`}>
                                {ord.status}
                              </span>
                            </div>

                            <select 
                              value={ord.status} 
                              onChange={e => handleToggleCafeOrderStatus(ord.id, e.target.value)}
                              className="bg-black border border-white/20 px-3 py-2 rounded-xl text-white outline-none focus:border-[#ff9900] cursor-pointer"
                            >
                              <option value="NEW">NEW / RECEIVED</option>
                              <option value="PREPARING">PREPARING</option>
                              <option value="READY">READY</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VIEW 2: 15. CAFÉ ADMIN MENU MANAGEMENT */}
                {cafeViewMode === 'MENU' && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left font-mono">
                      {adminCafeMenu.map(item => (
                        <div key={item.id} className={`glass-panel p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${item.available ? 'border-white/10 hover:border-[#ff9900]/50' : 'border-red-500/30 opacity-60 bg-red-950/10'}`}>
                          <div className="space-y-2">
                            <div className="relative h-32 rounded-xl overflow-hidden border border-white/10">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              <span className="absolute top-2 left-2 text-[9px] px-2 py-0.5 rounded-full bg-black/80 text-[#ff9900] border border-[#ff9900]/40">
                                {item.category}
                              </span>
                              <span className={`absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-full font-bold ${item.available ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                                {item.available ? 'AVAILABLE' : 'DISABLED'}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                              <div className="flex justify-between items-center text-xs mt-1">
                                <span className="font-black text-[#e5b96a]">₹{item.price}</span>
                                <span className="text-[10px] text-[#00ff88]">+{item.xpReward || 20} XP</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-gray-400 font-['Inter'] line-clamp-2">{item.description}</p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                            <button
                              onClick={() => handleToggleCafeItemAvailability(item.id)}
                              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${item.available ? 'bg-black border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20' : 'bg-green-500/20 text-green-400 border-green-500/40'}`}
                            >
                              {item.available ? 'DISABLE' : 'ENABLE'}
                            </button>
                            <button
                              onClick={() => {
                                setEditingCafeItem(item);
                                setIsNewCafeItem(false);
                              }}
                              className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-black border border-white/20 text-white hover:border-[#ff9900]"
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => handleDeleteCafeItem(item.id)}
                              className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CREATE / EDIT CAFE ITEM MODAL */}
                {editingCafeItem && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="relative w-full max-w-lg bg-[#0a0e17] border border-[#ff9900]/40 rounded-3xl p-6 shadow-2xl space-y-4 text-left font-['Orbitron'] max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <h3 className="text-lg font-black text-white">
                          {isNewCafeItem ? 'CREATE NEW CAFÉ ITEM' : `EDIT: ${editingCafeItem.name}`}
                        </h3>
                        <button onClick={() => setEditingCafeItem(null)} className="text-gray-400 hover:text-white">
                          <X size={18} />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs font-mono">
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">ITEM NAME:</label>
                          <input 
                            type="text" 
                            value={editingCafeItem.name} 
                            onChange={e => setEditingCafeItem({ ...editingCafeItem, name: e.target.value })}
                            className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-white outline-none focus:border-[#ff9900]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-gray-400 block mb-1">CATEGORY:</label>
                            <select
                              value={editingCafeItem.category}
                              onChange={e => setEditingCafeItem({ ...editingCafeItem, category: e.target.value })}
                              className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-white outline-none focus:border-[#ff9900]"
                            >
                              <option value="MEALS">MEALS</option>
                              <option value="SNACKS">SNACKS</option>
                              <option value="BEVERAGES">BEVERAGES</option>
                              <option value="DESSERTS">DESSERTS</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-400 block mb-1">PRICE (₹):</label>
                            <input 
                              type="number" 
                              value={editingCafeItem.price} 
                              onChange={e => setEditingCafeItem({ ...editingCafeItem, price: Number(e.target.value) })}
                              className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-white outline-none focus:border-[#ff9900]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">IMAGE URL:</label>
                          <input 
                            type="text" 
                            value={editingCafeItem.image} 
                            onChange={e => setEditingCafeItem({ ...editingCafeItem, image: e.target.value })}
                            className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-white outline-none focus:border-[#ff9900]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">DESCRIPTION:</label>
                          <textarea 
                            rows={2}
                            value={editingCafeItem.description} 
                            onChange={e => setEditingCafeItem({ ...editingCafeItem, description: e.target.value })}
                            className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-white outline-none focus:border-[#ff9900] font-['Inter']"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">INGREDIENTS (COMMA SEPARATED):</label>
                          <input 
                            type="text" 
                            value={Array.isArray(editingCafeItem.ingredients) ? editingCafeItem.ingredients.join(', ') : ''} 
                            onChange={e => setEditingCafeItem({ ...editingCafeItem, ingredients: e.target.value.split(',').map(s => s.trim()) })}
                            className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-white outline-none focus:border-[#ff9900]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-gray-400 block mb-1">XP REWARD:</label>
                            <input 
                              type="number" 
                              value={editingCafeItem.xpReward || 20} 
                              onChange={e => setEditingCafeItem({ ...editingCafeItem, xpReward: Number(e.target.value) })}
                              className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-white outline-none focus:border-[#ff9900]"
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-5">
                            <input 
                              type="checkbox" 
                              checked={editingCafeItem.available} 
                              onChange={e => setEditingCafeItem({ ...editingCafeItem, available: e.target.checked })}
                              className="w-4 h-4 accent-[#ff9900]"
                            />
                            <span className="text-xs text-white">ACTIVE / AVAILABLE</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                          <button 
                            type="button" 
                            onClick={() => setEditingCafeItem(null)}
                            className="px-4 py-2 rounded-xl border border-white/20 text-gray-400 hover:text-white"
                          >
                            CANCEL
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleSaveCafeItem(editingCafeItem)}
                            className="cyber-btn px-6 py-2 bg-[#ff9900] text-black border-[#ff9900]"
                          >
                            SAVE ITEM
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==========================================================================
               09. GALLERY MANAGEMENT MODULE
               ========================================================================== */}
            {activeTab === '09 GALLERY' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">GALLERY & VISUAL ARCHIVES</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Control featured status, category tagging, and assets</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newG = {
                        id: `gal-${Date.now()}`,
                        title: 'NEW ARCHIVE PHOTO',
                        category: 'EVENTS',
                        img: '/img/bg/turf.png',
                        featured: true,
                        views: '1.2k'
                      };
                      setAdminGalleryItems(prev => [newG, ...prev]);
                    }}
                    className="cyber-btn text-xs px-4 py-2"
                  >
                    + ADD GALLERY ITEM
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  {adminGalleryItems.map(item => (
                    <div key={item.id} className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3 group">
                      <div className="relative h-40 rounded-xl overflow-hidden border border-white/10">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-bold text-[#e5b96a]">
                          {item.category}
                        </div>
                        {item.featured && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88] text-[9px] font-bold border border-[#00ff88]/40">
                            FEATURED ★
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center text-xs font-mono">
                        <h4 className="font-bold text-white truncate">{item.title}</h4>
                        <span className="text-gray-400 text-[10px]">{item.views} VIEWS</span>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <button 
                          onClick={() => {
                            setAdminGalleryItems(prev => prev.map(g => g.id === item.id ? { ...g, featured: !g.featured } : g));
                          }}
                          className="flex-1 py-1.5 bg-black border border-white/20 rounded text-[10px] font-bold hover:border-[#e5b96a]"
                        >
                          {item.featured ? 'UNFEATURE' : 'FEATURE'}
                        </button>
                        <button 
                          onClick={() => {
                            setAdminGalleryItems(prev => prev.filter(g => g.id !== item.id));
                          }}
                          className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded text-[10px] font-bold hover:bg-red-500 hover:text-black"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================================================
               10. OFFERS MANAGEMENT MODULE
               ========================================================================== */}
            {activeTab === '10 OFFERS' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">SPECIAL OFFERS & PROMOTIONAL COMBOS</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Create discount codes, bundles, and seasonal experience passes</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newOff = {
                        id: `OFF-0${offersList.length + 1}`,
                        title: 'FLASH CYBER DISCOUNT',
                        desc: '20% off all sessions after 9 PM',
                        activity: 'ALL ZONES',
                        discount: '20% OFF',
                        startDate: '2026-09-15',
                        endDate: '2026-10-15',
                        usageLimit: 80,
                        usage: 0,
                        status: 'ACTIVE'
                      };
                      setOffersList(prev => [...prev, newOff]);
                    }}
                    className="cyber-btn text-xs px-4 py-2"
                  >
                    + CREATE OFFER
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  {offersList.map(off => (
                    <div key={off.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-[#e5b96a] font-mono">{off.id}</span>
                          <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 border border-green-500/40 text-[9px] font-bold rounded">
                            {off.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base tracking-wide">{off.title}</h3>
                        <p className="text-xs text-gray-400 font-['Inter']">{off.desc}</p>
                      </div>

                      <div className="p-3 bg-black/60 rounded-xl text-[10px] font-mono text-gray-300 space-y-1 border border-white/5">
                        <div className="flex justify-between"><span>TARGET:</span> <span className="text-[#00f0ff]">{off.activity}</span></div>
                        <div className="flex justify-between"><span>DISCOUNT:</span> <span className="text-[#00ff88] font-bold">{off.discount}</span></div>
                        <div className="flex justify-between"><span>CLAIMED:</span> <span className="text-white">{off.usage} / {off.usageLimit}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================================================
               11. REPORTS MODULE (CSV / PDF EXPORT)
               ========================================================================== */}
            {activeTab === '11 REPORTS' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">EXECUTIVE REPORTS & ANALYTICS EXPORT</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Generate compliance, revenue, and usage audits</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        const csv = "REPORT,STATUS,DATE\nBOOKINGS,128 TODAY,2026-09-15\nREVENUE,INR 84500,2026-09-15\nUSERS,8492 TOTAL,2026-09-15";
                        const uri = "data:text/csv;charset=utf-8," + encodeURI(csv);
                        const link = document.createElement("a");
                        link.setAttribute("href", uri);
                        link.setAttribute("download", "h8x_full_audit.csv");
                        document.body.appendChild(link);
                        link.click();
                      }}
                      className="px-4 py-2 rounded-xl bg-black border border-white/20 text-xs font-bold hover:border-[#00f0ff] flex items-center gap-2"
                    >
                      <Download size={14} /> EXPORT CSV
                    </button>
                    <button 
                      onClick={() => {
                        window.print();
                      }}
                      className="cyber-btn text-xs px-4 py-2 flex items-center gap-2"
                    >
                      <Download size={14} /> EXPORT PDF
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  {[
                    { title: 'BOOKING & RESERVATIONS REPORT', desc: 'Detailed log of all 7 zone passes and occupancy rates', items: '1,420 Records' },
                    { title: 'REVENUE & SETTLEMENT REPORT', desc: 'Gateway reconciliation, UPI, card, and café split', items: '₹84,500 Today' },
                    { title: 'PLAYER PROGRESSION & XP AUDIT', desc: 'Milestone completions, achievements, and manual bonuses', items: '8,492 Players' },
                    { title: 'CAFÉ NUTRITION & CULINARY LOG', desc: 'High-protein orders, beverage inventory, and margins', items: '73 Orders Today' }
                  ].map(rep => (
                    <div key={rep.title} className="glass-panel p-5 rounded-2xl border border-white/10 flex justify-between items-center hover:border-[#e5b96a]/50 transition-all">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-sm">{rep.title}</h4>
                        <p className="text-[11px] text-gray-400 font-['Inter']">{rep.desc}</p>
                        <span className="text-[10px] text-[#00ff88] font-bold">{rep.items}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setCopiedToast(`Downloading ${rep.title}...`);
                          setTimeout(() => setCopiedToast(null), 3000);
                        }}
                        className="p-3 bg-black/60 border border-white/20 rounded-xl hover:border-[#e5b96a] text-[#e5b96a]"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================================================
               12. PART 12: EVENTS & TOURNAMENTS MANAGEMENT MODULE
               ========================================================================== */}
            {activeTab === '12 EVENTS' && (
              <div className="space-y-8 animate-fade-in font-mono">
                
                {/* Header & New Event Action */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider font-['Orbitron'] flex items-center gap-2.5">
                      <Trophy className="text-[#00ff88]" size={24} />
                      EVENTS & TOURNAMENTS ARENA CONTROL
                    </h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">
                      Oversee arena championships, publish knockout brackets, manage live match scores & telemetry
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingEvent({
                        id: '',
                        title: '',
                        tagline: '',
                        description: '',
                        category: 'TOURNAMENTS',
                        activityId: 'TURF',
                        date: '20 SEP 2026',
                        startTime: '07:00 PM',
                        endTime: '10:30 PM',
                        location: 'TURF ARENA',
                        capacity: 48,
                        participants: 0,
                        entryFee: 500,
                        entryFeeFormatted: '₹500',
                        xpReward: 500,
                        rewardPoints: 300,
                        duration: '3.5 HOURS',
                        status: 'REGISTRATION OPEN',
                        image: '/img/bg/turf.png',
                        character: '/img/ch6.png',
                        characterName: 'VALKYRIE',
                        hasTournamentBracket: true,
                        tournamentId: 'tour-1'
                      });
                      setIsNewEventModal(true);
                    }}
                    className="cyber-btn px-5 py-2.5 bg-[#00ff88] text-black font-black text-xs tracking-wider flex items-center gap-2 rounded-xl"
                  >
                    <Plus size={16} /> + PUBLISH NEW EVENT
                  </button>
                </div>

                {/* 5 KEY EVENT METRICS */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 tracking-widest">TOTAL EVENTS</div>
                    <div className="text-2xl font-black text-white font-['Orbitron']">{eventsList.length}</div>
                    <div className="text-[9px] text-[#00ff88]">Active in Archive</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 tracking-widest">LIVE TOURNAMENTS</div>
                    <div className="text-2xl font-black text-[#ff3366] font-['Orbitron']">
                      {eventsList.filter(e => e.status === 'LIVE').length || 1}
                    </div>
                    <div className="text-[9px] text-[#ff3366] animate-pulse">● Matches in Progress</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 tracking-widest">ENLISTED PLAYERS</div>
                    <div className="text-2xl font-black text-[#00f0ff] font-['Orbitron']">
                      {eventsList.reduce((acc, e) => acc + (e.participants || 0), 0)}
                    </div>
                    <div className="text-[9px] text-gray-400">Across All Arenas</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 tracking-widest">TOTAL PRIZE POOLS</div>
                    <div className="text-2xl font-black text-[#e5b96a] font-['Orbitron']">₹72,000</div>
                    <div className="text-[9px] text-[#e5b96a]">Cash & Rewards</div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-[9px] text-gray-400 tracking-widest">EST. ARENA REVENUE</div>
                    <div className="text-2xl font-black text-green-400 font-['Orbitron']">
                      ₹{eventsList.reduce((acc, e) => acc + ((e.participants || 0) * (e.entryFee || 0)), 0).toLocaleString()}
                    </div>
                    <div className="text-[9px] text-green-400">+18% vs Last Month</div>
                  </div>
                </div>

                {/* EVENTS CRUD LISTING TABLE */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-widest font-['Orbitron']">EVENT REGISTRY</span>
                      <span className="text-[10px] text-gray-400 font-mono">({eventsList.length} total)</span>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                      {['ALL', 'TOURNAMENTS', 'TURF', 'VIRTUAL GAMES', 'BOARD GAMES', 'SWIMMING'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setEventCategoryFilter(cat)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider transition-all border ${
                            eventCategoryFilter === cat 
                              ? 'bg-[#00ff88] text-black border-[#00ff88]' 
                              : 'bg-black/60 text-gray-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-x-auto no-scrollbar glass-panel rounded-2xl border border-white/10">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase tracking-wider bg-black/40">
                          <th className="py-3.5 px-4"># / TITLE</th>
                          <th className="py-3.5 px-4">CATEGORY</th>
                          <th className="py-3.5 px-4">SCHEDULE</th>
                          <th className="py-3.5 px-4">CAPACITY</th>
                          <th className="py-3.5 px-4">ENTRY FEE</th>
                          <th className="py-3.5 px-4">REWARDS</th>
                          <th className="py-3.5 px-4">STATUS</th>
                          <th className="py-3.5 px-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {eventsList
                          .filter(e => eventCategoryFilter === 'ALL' || e.category === eventCategoryFilter)
                          .map(ev => (
                            <tr key={ev.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-bold text-[#00ff88]">#{ev.number}</span>
                                  <div>
                                    <div className="font-bold text-white font-['Orbitron'] text-xs">{ev.title}</div>
                                    <div className="text-[10px] text-gray-400 truncate max-w-xs">{ev.location}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-bold text-gray-300">
                                  {ev.category}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-gray-300">
                                <div className="text-white font-bold">{ev.date}</div>
                                <div className="text-[10px] text-gray-400">{ev.startTime}</div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="text-white font-bold">{ev.participants} / {ev.capacity}</div>
                                <div className="w-20 h-1 bg-black rounded-full overflow-hidden mt-1 border border-white/10">
                                  <div 
                                    className="h-full bg-[#00ff88]" 
                                    style={{ width: `${Math.min(100, Math.round((ev.participants / ev.capacity) * 100))}%` }} 
                                  />
                                </div>
                              </td>

                              <td className="py-3.5 px-4 text-[#00ff88] font-bold">
                                {ev.entryFeeFormatted}
                              </td>

                              <td className="py-3.5 px-4 text-[#e5b96a]">
                                +{ev.xpReward} XP / +{ev.rewardPoints} PTS
                              </td>

                              <td className="py-3.5 px-4">
                                <select
                                  value={ev.status}
                                  onChange={(e) => handleToggleEventStatus(ev.id, e.target.value)}
                                  className="bg-black border border-white/20 text-xs text-white p-1 rounded-lg outline-none cursor-pointer"
                                >
                                  <option value="REGISTRATION OPEN">REGISTRATION OPEN</option>
                                  <option value="LIVE">LIVE</option>
                                  <option value="UPCOMING">UPCOMING</option>
                                  <option value="ALMOST FULL">ALMOST FULL</option>
                                  <option value="COMPLETED">COMPLETED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                                </select>
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingEvent(ev);
                                      setIsNewEventModal(false);
                                    }}
                                    className="p-1.5 rounded-lg bg-black/60 border border-white/15 text-gray-400 hover:text-white hover:border-white transition-all"
                                    title="Edit Event Parameters"
                                  >
                                    <Edit3 size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEvent(ev.id)}
                                    className="p-1.5 rounded-lg bg-black/60 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                                    title="Delete Event"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* LIVE TOURNAMENT MATCH CONTROLLER & BRACKET UPDATER */}
                <div className="glass-panel p-6 rounded-3xl border border-[#00f0ff]/30 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-widest font-['Orbitron'] flex items-center gap-2">
                        <Swords className="text-[#00f0ff]" size={18} />
                        <span>LIVE TOURNAMENT BRACKET & MATCH CONTROLLER</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">Control live scores, record match results, and advance teams into semifinals & finals</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">SELECT TOURNAMENT:</span>
                      <select
                        value={selectedAdminTournamentId}
                        onChange={e => setSelectedAdminTournamentId(e.target.value)}
                        className="bg-black border border-white/20 px-3 py-1.5 rounded-xl text-xs text-white outline-none"
                      >
                        {tournamentsList.map(t => (
                          <option key={t.id} value={t.id}>{t.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Tournament Match Grid */}
                  {(() => {
                    const currentTourn = tournamentsList.find(t => t.id === selectedAdminTournamentId) || tournamentsList[0];
                    if (!currentTourn) return null;

                    return (
                      <div className="space-y-6">
                        {currentTourn.rounds.map((round, rIdx) => (
                          <div key={round.roundName} className="space-y-3">
                            <div className="text-xs font-bold text-[#00f0ff] tracking-widest flex items-center gap-2">
                              <span>ROUND 0{rIdx + 1} // {round.roundName}</span>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              {round.matches.map(m => (
                                <div key={m.id} className="p-3.5 rounded-2xl bg-black/60 border border-white/15 space-y-3">
                                  <div className="flex justify-between text-[10px] text-gray-400 border-b border-white/10 pb-1.5">
                                    <span className="text-white font-bold">{m.id}</span>
                                    <span className={m.status === 'LIVE' ? 'text-[#ff3366] font-bold animate-pulse' : 'text-gray-400'}>
                                      {m.status}
                                    </span>
                                  </div>

                                  {/* Team 1 Score Row */}
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`text-xs truncate ${m.winner === m.team1 ? 'text-[#00ff88] font-bold' : 'text-gray-200'}`}>
                                      {m.team1}
                                    </span>
                                    <input 
                                      type="number"
                                      value={m.score1}
                                      onChange={e => handleUpdateMatchScore(currentTourn.id, rIdx, m.id, e.target.value, m.score2)}
                                      className="w-12 bg-black border border-white/20 p-1 text-center rounded text-xs text-white font-bold"
                                    />
                                  </div>

                                  {/* Team 2 Score Row */}
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`text-xs truncate ${m.winner === m.team2 ? 'text-[#00ff88] font-bold' : 'text-gray-200'}`}>
                                      {m.team2}
                                    </span>
                                    <input 
                                      type="number"
                                      value={m.score2}
                                      onChange={e => handleUpdateMatchScore(currentTourn.id, rIdx, m.id, m.score1, e.target.value)}
                                      className="w-12 bg-black border border-white/20 p-1 text-center rounded text-xs text-white font-bold"
                                    />
                                  </div>

                                  {/* Advance Winner Quick Buttons */}
                                  <div className="pt-2 border-t border-white/10 flex gap-1.5 text-[9px]">
                                    <button
                                      onClick={() => handleAdvanceWinner(currentTourn.id, rIdx, m.id, m.team1)}
                                      className={`flex-1 py-1 rounded transition-all truncate ${
                                        m.winner === m.team1 ? 'bg-[#00ff88] text-black font-black' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                      }`}
                                    >
                                      WIN: {m.team1}
                                    </button>
                                    <button
                                      onClick={() => handleAdvanceWinner(currentTourn.id, rIdx, m.id, m.team2)}
                                      className={`flex-1 py-1 rounded transition-all truncate ${
                                        m.winner === m.team2 ? 'bg-[#00ff88] text-black font-black' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                      }`}
                                    >
                                      WIN: {m.team2}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

              </div>
            )}

            {/* ==========================================================================
               13. SETTINGS MODULE (XP THRESHOLDS, GATEWAYS, NOTIFICATIONS)
               ========================================================================== */}
            {activeTab === '13 SETTINGS' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wider">COMMAND SYSTEM CONFIGURATION</h2>
                    <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold mt-0.5">Control core game-world parameters, thresholds, and notifications</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                  {/* SETTINGS SUB-NAV */}
                  <div className="space-y-2">
                    {['XP SETTINGS', 'BOOKING SETTINGS', 'ACTIVITY SETTINGS', 'PAYMENT GATEWAY', 'NOTIFICATIONS', 'ADMIN ROLES'].map(sub => (
                      <button 
                        key={sub}
                        onClick={() => setSettingsActiveTab(sub)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-bold tracking-wider transition-all ${
                          settingsActiveTab === sub ? 'bg-[#e5b96a] text-black font-black' : 'glass-panel text-gray-400 hover:text-white'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>

                  {/* SETTINGS CONTENT FORM */}
                  <div className="lg:col-span-3 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-xs font-mono">
                    <h3 className="text-sm font-bold text-[#e5b96a] tracking-widest">{settingsActiveTab}</h3>

                    {settingsActiveTab === 'XP SETTINGS' && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 block mb-1">TURF MATCH XP REWARD</label>
                          <input 
                            type="number" 
                            value={xpSettings.turfXp} 
                            onChange={e => setXpSettings({...xpSettings, turfXp: Number(e.target.value)})}
                            className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none" 
                          />
                        </div>

                        <div>
                          <label className="text-gray-400 block mb-1">SWIMMING SESSION XP</label>
                          <input 
                            type="number" 
                            value={xpSettings.swimXp} 
                            onChange={e => setXpSettings({...xpSettings, swimXp: Number(e.target.value)})}
                            className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none" 
                          />
                        </div>

                        <div>
                          <label className="text-gray-400 block mb-1">VR GAMING XP</label>
                          <input 
                            type="number" 
                            value={xpSettings.vrXp} 
                            onChange={e => setXpSettings({...xpSettings, vrXp: Number(e.target.value)})}
                            className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none" 
                          />
                        </div>

                        <div>
                          <label className="text-gray-400 block mb-1">LEVEL UP THRESHOLD (XP/LEVEL)</label>
                          <input 
                            type="number" 
                            value={xpSettings.levelThreshold} 
                            onChange={e => setXpSettings({...xpSettings, levelThreshold: Number(e.target.value)})}
                            className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none" 
                          />
                        </div>

                        <div className="sm:col-span-2 pt-4">
                          <button 
                            onClick={() => {
                              setCopiedToast('XP parameters committed to core engine.');
                              setTimeout(() => setCopiedToast(null), 3000);
                            }}
                            className="cyber-btn text-xs px-6 py-3"
                          >
                            SAVE XP ENGINE PARAMETERS
                          </button>
                        </div>
                      </div>
                    )}

                    {settingsActiveTab !== 'XP SETTINGS' && (
                      <div className="space-y-4">
                        <p className="text-gray-300 font-['Inter']">Operational parameters for {settingsActiveTab} are online and synchronized with production cluster.</p>
                        <div className="p-4 bg-black/60 rounded-xl border border-white/10 text-[#00ff88]">
                          STATUS: LIVE SYNCHRONIZED
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* ==========================================================================
         CINEMATIC USER DETAIL MODAL (IN-ADMIN FULL VIEW)
         ========================================================================== */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-xl glass-panel border border-[#e5b96a]/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(229,185,106,0.4)] space-y-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedUserModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-white p-2">
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <img src={selectedUserModal.avatar} alt={selectedUserModal.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#e5b96a]" />
              <div>
                <span className="text-xs text-[#e5b96a] font-mono">{selectedUserModal.id}</span>
                <h3 className="text-2xl font-black text-white">{selectedUserModal.name}</h3>
                <p className="text-xs text-gray-400 font-mono">LVL {selectedUserModal.level} • {selectedUserModal.xp} XP • {selectedUserModal.membership}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-black/60 p-4 rounded-2xl border border-white/10">
              <div><span className="text-gray-400">EMAIL:</span> <span className="text-white font-bold">{selectedUserModal.email}</span></div>
              <div><span className="text-gray-400">PHONE:</span> <span className="text-white font-bold">{selectedUserModal.phone}</span></div>
              <div><span className="text-gray-400">TOTAL VISITS:</span> <span className="text-white font-bold">{selectedUserModal.visits}</span></div>
              <div><span className="text-gray-400">BOOKINGS:</span> <span className="text-[#e5b96a] font-bold">{selectedUserModal.bookingsCount || 15} Bookings</span></div>
              <div><span className="text-gray-400">TOTAL SPEND:</span> <span className="text-[#00ff88] font-bold">{selectedUserModal.spend}</span></div>
              <div><span className="text-gray-400">ACHIEVEMENTS:</span> <span className="text-[#00f0ff] font-bold">{selectedUserModal.achievementsCount || 6} Unlocked</span></div>
              <div><span className="text-gray-400">PAYMENTS:</span> <span className="text-purple-400 font-bold">{(paymentTransactions || []).filter(p => p.userId === selectedUserModal.id).length || 5} Records</span></div>
              <div><span className="text-gray-400">FAVOURITE:</span> <span className="text-[#ff3366] font-bold">{selectedUserModal.favourite}</span></div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-gray-400 font-mono">ADMIN ACTIONS:</div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    handleAddXPToUser(selectedUserModal.id, 250);
                    setSelectedUserModal(prev => ({ ...prev, xp: prev.xp + 250 }));
                  }}
                  className="cyber-btn text-xs py-2.5"
                >
                  + ADD 250 XP
                </button>
                <button 
                  onClick={() => {
                    handleAddXPToUser(selectedUserModal.id, -250);
                    setSelectedUserModal(prev => ({ ...prev, xp: Math.max(0, prev.xp - 250) }));
                  }}
                  className="py-2.5 rounded-xl border border-white/20 text-xs font-bold hover:border-red-400 hover:text-red-400"
                >
                  - REMOVE 250 XP
                </button>
                <button 
                  onClick={() => {
                    handleToggleUserStatus(selectedUserModal.id);
                    setSelectedUserModal(prev => ({ ...prev, status: prev.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE' }));
                  }}
                  className="py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-black font-bold text-xs"
                >
                  {selectedUserModal.status === 'ACTIVE' ? 'DISABLE PLAYER' : 'ENABLE PLAYER'}
                </button>
                <button 
                  onClick={() => {
                    setCopiedToast(`Reset progression for ${selectedUserModal.id}`);
                    setTimeout(() => setCopiedToast(null), 3000);
                  }}
                  className="py-2.5 rounded-xl border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold text-xs"
                >
                  RESET PROGRESS
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================================================
         CINEMATIC BOOKING DETAIL MODAL
         ========================================================================== */}
      {selectedBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-md glass-panel border border-[#00f0ff]/60 rounded-3xl p-8 shadow-[0_0_80px_rgba(0,240,255,0.4)] space-y-6">
            <button onClick={() => setSelectedBookingModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-white p-2">
              <X size={20} />
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-[#00f0ff]">MISSION PASS TELEMETRY</span>
              <h3 className="text-xl font-black text-white">{selectedBookingModal.activity}</h3>
              <p className="text-xs text-gray-400 font-mono">{selectedBookingModal.id}</p>
            </div>

            <div className="space-y-2 text-xs font-mono bg-black/60 p-5 rounded-2xl border border-white/10">
              <div className="flex justify-between"><span className="text-gray-400">PLAYER:</span> <span className="text-white font-bold">{selectedBookingModal.player}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">DATE:</span> <span className="text-white font-bold">{selectedBookingModal.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">TIME:</span> <span className="text-white font-bold">{selectedBookingModal.time}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">SQUAD:</span> <span className="text-white font-bold">{selectedBookingModal.people} PLAYERS</span></div>
              <div className="flex justify-between"><span className="text-gray-400">AMOUNT:</span> <span className="text-[#00ff88] font-bold">{selectedBookingModal.amount}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-2"><span className="text-gray-400">STATUS:</span> <span className="text-green-400 font-bold">{selectedBookingModal.status}</span></div>
            </div>

            <button onClick={() => setSelectedBookingModal(null)} className="cyber-btn w-full py-3 text-xs">
              CLOSE PASS
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================================
         CINEMATIC ACTIVITY DETAIL / EDIT MODAL
         ========================================================================== */}
      {selectedActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-lg glass-panel border border-[#e5b96a]/60 rounded-3xl p-8 shadow-2xl space-y-6">
            <button onClick={() => setSelectedActivityModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-white p-2">
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <img src={selectedActivityModal.bg} alt={selectedActivityModal.title} className="w-16 h-16 rounded-xl object-cover border border-[#e5b96a]" />
              <div>
                <span className="text-xs text-[#e5b96a] font-mono">ZONE {selectedActivityModal.id}</span>
                <h3 className="text-xl font-black text-white">{selectedActivityModal.title}</h3>
                <p className="text-xs text-gray-400 font-mono">{selectedActivityModal.price}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-gray-400 block mb-1">CAPACITY</label>
                <input 
                  type="text" 
                  value={selectedActivityModal.capacity} 
                  onChange={e => setSelectedActivityModal({...selectedActivityModal, capacity: e.target.value})}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">OPERATIONAL HOURS</label>
                <input 
                  type="text" 
                  value={selectedActivityModal.hours} 
                  onChange={e => setSelectedActivityModal({...selectedActivityModal, hours: e.target.value})}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => {
                  setAdminActivities(prev => prev.map(a => a.id === selectedActivityModal.id ? selectedActivityModal : a));
                  setSelectedActivityModal(null);
                  setCopiedToast('Zone configuration saved.');
                  setTimeout(() => setCopiedToast(null), 3000);
                }}
                className="flex-1 cyber-btn py-3 text-xs"
              >
                SAVE PARAMETERS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
         CINEMATIC MODAL: EVENT CREATE / EDIT FORM (PART 12)
         ========================================================================== */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-2xl bg-[#090d18] border border-[#00ff88]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(0,255,136,0.3)] space-y-6 max-h-[92vh] overflow-y-auto no-scrollbar font-mono">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] text-[#00ff88] tracking-widest uppercase">ARENA OPERATIONS</span>
                <h3 className="text-xl font-black text-white font-['Orbitron']">
                  {isNewEventModal ? 'PUBLISH NEW ARENA EVENT' : `EDIT: ${editingEvent.title}`}
                </h3>
              </div>
              <button onClick={() => setEditingEvent(null)} className="p-2 text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="text-gray-400 block mb-1">EVENT TITLE</label>
                <input 
                  type="text" 
                  value={editingEvent.title} 
                  onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="e.g. H8X CYBER CLASH 2026"
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none focus:border-[#00ff88]" 
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">CATEGORY</label>
                <select 
                  value={editingEvent.category} 
                  onChange={e => setEditingEvent({ ...editingEvent, category: e.target.value })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none"
                >
                  <option value="TOURNAMENTS">TOURNAMENTS</option>
                  <option value="TURF">TURF</option>
                  <option value="VIRTUAL GAMES">VIRTUAL GAMES</option>
                  <option value="BOARD GAMES">BOARD GAMES</option>
                  <option value="SWIMMING">SWIMMING</option>
                  <option value="COMMUNITY">COMMUNITY</option>
                  <option value="SPECIAL EVENTS">SPECIAL EVENTS</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">STATUS</label>
                <select 
                  value={editingEvent.status} 
                  onChange={e => setEditingEvent({ ...editingEvent, status: e.target.value })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none"
                >
                  <option value="REGISTRATION OPEN">REGISTRATION OPEN</option>
                  <option value="LIVE">LIVE</option>
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="ALMOST FULL">ALMOST FULL</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">DATE</label>
                <input 
                  type="text" 
                  value={editingEvent.date} 
                  onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">START TIME</label>
                <input 
                  type="text" 
                  value={editingEvent.startTime} 
                  onChange={e => setEditingEvent({ ...editingEvent, startTime: e.target.value })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">LOCATION / VENUE</label>
                <input 
                  type="text" 
                  value={editingEvent.location} 
                  onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">PLAYER CAPACITY</label>
                <input 
                  type="number" 
                  value={editingEvent.capacity} 
                  onChange={e => setEditingEvent({ ...editingEvent, capacity: Number(e.target.value) })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">ENTRY FEE (₹)</label>
                <input 
                  type="number" 
                  value={editingEvent.entryFee} 
                  onChange={e => setEditingEvent({ 
                    ...editingEvent, 
                    entryFee: Number(e.target.value),
                    entryFeeFormatted: `₹${Number(e.target.value)}`
                  })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">XP REWARD</label>
                <input 
                  type="number" 
                  value={editingEvent.xpReward} 
                  onChange={e => setEditingEvent({ ...editingEvent, xpReward: Number(e.target.value) })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none" 
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-gray-400 block mb-1">DESCRIPTION & MISSION BRIEFING</label>
                <textarea 
                  rows="3"
                  value={editingEvent.description} 
                  onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full bg-black border border-white/20 p-2.5 rounded-xl text-white outline-none resize-none font-['Inter']" 
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button 
                onClick={() => setEditingEvent(null)}
                className="flex-1 py-3 border border-white/20 rounded-xl text-xs font-bold text-gray-300 hover:text-white"
              >
                CANCEL
              </button>
              <button 
                onClick={() => handleSaveEvent(editingEvent)}
                className="flex-1 cyber-btn py-3 text-xs bg-[#00ff88] text-black font-black"
              >
                {isNewEventModal ? 'PUBLISH EVENT' : 'COMMIT EDITS'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
         CINEMATIC MODAL: PRINTABLE TRANSACTION RECEIPT (ADMIN AUDIT)
         ========================================================================== */}
      <ReceiptModal 
        isOpen={!!adminSelectedReceipt} 
        onClose={() => setAdminSelectedReceipt(null)} 
        transaction={adminSelectedReceipt} 
      />

    </div>
  );
}
