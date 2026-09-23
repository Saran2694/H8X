import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Swords, Users, Calendar, Clock, MapPin, Award, Zap, 
  Shield, CheckCircle2, X, ChevronRight, ChevronLeft, Plus, 
  Search, Filter, Sparkles, Flame, ArrowRight, QrCode, Printer, 
  ExternalLink, AlertCircle, CreditCard, Wallet, Star, Check, 
  Share2, Play, Activity, ChevronDown
} from 'lucide-react';
import { gsap } from 'gsap';
import { 
  INITIAL_EVENTS, 
  INITIAL_TOURNAMENTS, 
  INITIAL_TEAMS, 
  INITIAL_EVENT_LEADERBOARDS 
} from '../data/eventsData.js';

export default function EventsScene({
  eventsList = INITIAL_EVENTS,
  setEventsList,
  tournamentsList = INITIAL_TOURNAMENTS,
  setTournamentsList,
  teamsList = INITIAL_TEAMS,
  setTeamsList,
  userEventRegistrations = [],
  setUserEventRegistrations,
  userProfile,
  setUserProfile,
  progressionData,
  setProgressionData,
  playerWallet,
  setPlayerWallet,
  paymentTransactions = [],
  setPaymentTransactions,
  onOpenReceiptModal,
  notifications = [],
  setNotifications,
  onUnlockAchievements
}) {
  // Navigation & Filter States
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeViewMode, setActiveViewMode] = useState('GRID'); // 'GRID', 'CALENDAR', 'LEADERBOARD'

  // Modals & Interactive States
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [activeBracketTournament, setActiveBracketTournament] = useState(null);
  const [registrationEvent, setRegistrationEvent] = useState(null);
  const [registrationStep, setRegistrationStep] = useState(1); // 1: Identity & Squad, 2: Payment, 3: Pass Confirmation
  const [registrationMode, setRegistrationMode] = useState('SOLO'); // 'SOLO', 'CREATE_TEAM', 'JOIN_TEAM'
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(teamsList[0]?.id || '');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('H8X WALLET');
  const [confirmedPassData, setConfirmedPassData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [walletError, setWalletError] = useState(null);

  // Calendar View States
  const [calendarViewType, setCalendarViewType] = useState('MONTH'); // 'MONTH', 'WEEK', 'DAY'
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState('SEPTEMBER 2026');

  // Leaderboard Filter State
  const [leaderboardCategory, setLeaderboardCategory] = useState('ALL');

  // Glitch animation ref
  const heroCharRef = useRef(null);

  const CATEGORIES = [
    'ALL',
    'TOURNAMENTS',
    'TURF',
    'VIRTUAL GAMES',
    'BOARD GAMES',
    'SWIMMING',
    'COMMUNITY',
    'SPECIAL EVENTS'
  ];

  const STATUS_FILTERS = [
    'ALL',
    'REGISTRATION OPEN',
    'LIVE',
    'UPCOMING',
    'ALMOST FULL',
    'COMPLETED'
  ];

  // User identity fallback
  const user = progressionData?.user || {
    id: userProfile?.id || 'HX-000184',
    name: userProfile?.name || 'SRI SARAN',
    email: userProfile?.email || 'sri.saran@h8x-universe.io',
    avatar: userProfile?.avatar || '/img/ch1.png',
    level: userProfile?.level || 12,
    xp: userProfile?.xp || 2850,
    favouriteActivity: 'TURF'
  };

  const currentBalance = playerWallet?.availableBalance ?? 2450;

  // Hero glitch effect on load or hover
  const triggerGlitch = () => {
    if (heroCharRef.current) {
      gsap.fromTo(heroCharRef.current, 
        { skewX: 12, filter: 'drop-shadow(0 0 35px #00ff88) hue-rotate(90deg)' },
        { skewX: 0, filter: 'none', duration: 0.35, ease: 'power2.out' }
      );
    }
  };

  // Filtered Events
  const filteredEvents = eventsList.filter(ev => {
    const matchesCategory = selectedCategory === 'ALL' || ev.category === selectedCategory;
    const matchesStatus = selectedStatusFilter === 'ALL' || ev.status === selectedStatusFilter;
    const matchesSearch = !searchQuery.trim() || 
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Featured Hero Event
  const featuredEvent = eventsList.find(e => e.featured) || eventsList[0];

  // Smart Discovery Recommendations
  const liveEvents = eventsList.filter(e => e.status === 'LIVE');
  const nearCapacityEvents = eventsList.filter(e => e.status === 'ALMOST FULL');
  const recommendedEvents = eventsList.filter(e => e.activityId === user.favouriteActivity);

  // Open Registration Flow
  const startRegistration = (event) => {
    setRegistrationEvent(event);
    setRegistrationStep(1);
    setRegistrationMode('SOLO');
    setNewTeamName('');
    setSelectedPaymentMethod('H8X WALLET');
    setWalletError(null);
    setConfirmedPassData(null);
  };

  // Handle Event Payment & Registration Execution
  const handleExecuteRegistration = () => {
    if (!registrationEvent) return;

    // Check Wallet balance if wallet chosen
    if (selectedPaymentMethod === 'H8X WALLET' && currentBalance < registrationEvent.entryFee) {
      setWalletError(`Insufficient H8X Wallet balance (₹${currentBalance.toLocaleString()}). Please top up or choose another payment method.`);
      return;
    }

    const regId = `HXEV-${Math.floor(10000 + Math.random() * 90000)}`;
    const payTxnId = `HXPAY-${Math.floor(100000 + Math.random() * 900000)}`;
    const assignedTeamName = registrationMode === 'CREATE_TEAM' 
      ? (newTeamName.trim() || 'TEAM ALPHA') 
      : registrationMode === 'JOIN_TEAM'
        ? (teamsList.find(t => t.id === selectedTeamId)?.name || 'TEAM ALPHA')
        : 'SOLO ENTRY';

    // 1. Deduct wallet or process mock transaction
    if (selectedPaymentMethod === 'H8X WALLET' && setPlayerWallet) {
      setPlayerWallet(prev => ({
        ...prev,
        availableBalance: prev.availableBalance - registrationEvent.entryFee,
        totalSpent: prev.totalSpent + registrationEvent.entryFee,
        rewardPoints: prev.rewardPoints + registrationEvent.rewardPoints
      }));
    }

    // 2. Append Payment Transaction
    const newTxn = {
      id: payTxnId,
      userId: user.id,
      userName: user.name,
      bookingId: null,
      eventId: registrationEvent.id,
      cafeOrderId: null,
      description: `Event Entry: ${registrationEvent.title}`,
      subtotal: registrationEvent.entryFee,
      discount: 0,
      amount: registrationEvent.entryFee,
      amountFormatted: registrationEvent.entryFeeFormatted,
      method: selectedPaymentMethod,
      status: 'PAID',
      refundAmount: 0,
      refundStatus: null,
      createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'EVENTS'
    };

    if (setPaymentTransactions) {
      setPaymentTransactions(prev => [newTxn, ...prev]);
    }

    // 3. Award XP to User Progression
    if (setProgressionData) {
      setProgressionData(prev => {
        const addedXp = registrationEvent.xpReward;
        const newXp = prev.user.xp + addedXp;
        const newLevel = Math.floor(newXp / 250) + 1;
        return {
          ...prev,
          user: {
            ...prev.user,
            xp: newXp,
            level: newLevel
          }
        };
      });
    }

    // 4. Update Event Participants count
    if (setEventsList) {
      setEventsList(prev => prev.map(ev => {
        if (ev.id === registrationEvent.id) {
          const nextParticipants = Math.min(ev.capacity, ev.participants + 1);
          const nextStatus = nextParticipants >= ev.capacity ? 'ALMOST FULL' : ev.status;
          return {
            ...ev,
            participants: nextParticipants,
            status: nextStatus
          };
        }
        return ev;
      }));
    }

    // 5. Append Registration Record
    const registrationRecord = {
      id: regId,
      eventId: registrationEvent.id,
      eventNumber: registrationEvent.number,
      eventTitle: registrationEvent.title,
      category: registrationEvent.category,
      date: registrationEvent.date,
      time: registrationEvent.startTime,
      location: registrationEvent.location,
      participantName: user.name,
      participantId: user.id,
      teamName: assignedTeamName,
      status: 'CONFIRMED',
      paymentTxnId: payTxnId,
      amountPaid: registrationEvent.entryFeeFormatted,
      xpAwarded: registrationEvent.xpReward,
      pointsAwarded: registrationEvent.rewardPoints,
      registeredAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (setUserEventRegistrations) {
      setUserEventRegistrations(prev => [registrationRecord, ...prev]);
    }

    // 6. Dispatch Real-time Event Notification
    if (setNotifications) {
      setNotifications(prev => [
        {
          id: `notif-ev-${Date.now()}`,
          type: 'EVENT',
          title: `ENLISTED: ${registrationEvent.title}`,
          desc: `Pass ${regId} confirmed for ${registrationEvent.date} @ ${registrationEvent.startTime}. Team: ${assignedTeamName}. +${registrationEvent.xpReward} XP awarded!`,
          time: 'Just Now',
          timestamp: new Date().toISOString(),
          read: false,
          link: 'events',
          badgeColor: '#00ff88'
        },
        ...prev
      ]);
    }

    // 7. Check & Unlock First Tournament Achievement (ach7)
    if (onUnlockAchievements && progressionData) {
      onUnlockAchievements({
        ...progressionData,
        achievements: progressionData.achievements.map(ach => {
          if (ach.id === 'ach7') {
            return { ...ach, unlocked: true, unlockedAt: 'Today' };
          }
          return ach;
        })
      });
    }

    setConfirmedPassData(registrationRecord);
    setRegistrationStep(3);

    setToastMessage(`Mission Enlistment Confirmed! +${registrationEvent.xpReward} XP & +${registrationEvent.rewardPoints} Reward Points credited.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper for Status Badge styling
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'LIVE':
        return 'bg-[#ff3366]/20 text-[#ff3366] border-[#ff3366]/60 shadow-[0_0_12px_rgba(255,51,102,0.4)] animate-pulse';
      case 'REGISTRATION OPEN':
        return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/50 shadow-[0_0_10px_rgba(0,255,136,0.3)]';
      case 'ALMOST FULL':
        return 'bg-[#ffaa00]/20 text-[#ffaa00] border-[#ffaa00]/50';
      case 'UPCOMING':
        return 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50';
      case 'COMPLETED':
        return 'bg-gray-700/40 text-gray-400 border-gray-600/40';
      case 'CANCELLED':
        return 'bg-red-900/30 text-red-400 border-red-700/50';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  // Open Tournament Bracket Modal
  const openBracketForEvent = (event) => {
    const tournament = tournamentsList.find(t => t.id === event.tournamentId) || tournamentsList[0];
    setActiveBracketTournament(tournament);
  };

  return (
    <div id="events" className="w-full min-h-screen bg-[#04060c] text-white font-['Orbitron'] relative select-text overflow-hidden py-16">
      
      {/* BACKGROUND PARTICLES & ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00ff88]/10 via-[#04060c] to-[#020306] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f0ff]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#e5b96a]/5 blur-[100px] pointer-events-none" />

      {/* TOAST POPUP NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-10 right-10 z-50 glass-panel px-6 py-4 rounded-2xl border border-[#00ff88] text-xs font-mono text-[#00ff88] flex items-center gap-3 shadow-[0_0_30px_rgba(0,255,136,0.4)] animate-bounce">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-16">

        {/* ==========================================================================
           1. EVENTS HERO SECTION (CINEMATIC ARENA VISUAL + GLITCH CHARACTER LAYER)
           ========================================================================== */}
        <section className="relative rounded-3xl overflow-hidden border border-[#00ff88]/30 shadow-[0_0_80px_rgba(0,0,0,0.9)] bg-[#070b14]">
          {/* Background Arena Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={featuredEvent?.image || '/img/bg/turf.png'} 
              alt="H8X Arena" 
              className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content Column */}
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-ping" />
                <span className="text-xs text-[#00ff88] tracking-[0.4em] font-extrabold uppercase">
                  EVENTS // H8X
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/40 text-[#00ff88] text-[9px] font-mono tracking-widest">
                  ARENA CHAMPIONSHIPS
                </span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
                  ENTER THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00f0ff] to-[#e5b96a]">
                    COMPETITION.
                  </span>
                </h1>
                <p className="text-sm sm:text-base font-['Rajdhani'] font-bold text-[#e5b96a] tracking-[0.35em] uppercase mt-3">
                  PLAY. COMPETE. CONNECT.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-['Inter'] leading-relaxed max-w-xl">
                Step onto the illuminated turf, strap into 4K haptic VR suits, or dominate the tabletop strategy arena. Compete for real cash prize pools, unlock exclusive championship badges, and cement your squad on the H8X Hall of Fame.
              </p>

              {/* Featured Event Card HUD */}
              <div className="p-5 rounded-2xl bg-black/70 border border-[#00ff88]/40 backdrop-blur-xl space-y-3 max-w-lg shadow-[0_0_30px_rgba(0,255,136,0.15)]">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#00ff88] tracking-widest">FEATURED ARENA SHOWDOWN</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border ${getStatusBadgeStyle(featuredEvent.status)}`}>
                    {featuredEvent.status}
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-black text-white">{featuredEvent.title}</div>
                <div className="text-xs font-mono text-[#e5b96a] tracking-wider">{featuredEvent.tagline}</div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono border-t border-white/10">
                  <div>
                    <div className="text-[9px] text-gray-400">DATE</div>
                    <div className="text-white font-bold">{featuredEvent.date}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400">TIME</div>
                    <div className="text-white font-bold">{featuredEvent.startTime}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400">ENTRY FEE</div>
                    <div className="text-[#00ff88] font-bold">{featuredEvent.entryFeeFormatted}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400">REWARDS</div>
                    <div className="text-[#e5b96a] font-bold">+{featuredEvent.xpReward} XP</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => startRegistration(featuredEvent)}
                    className="cyber-btn flex-1 py-3 px-6 bg-[#00ff88] text-black font-black text-xs tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] flex items-center justify-center gap-2"
                  >
                    <Trophy size={16} /> [ ENTER EVENT ]
                  </button>
                  {featuredEvent.hasTournamentBracket && (
                    <button
                      onClick={() => openBracketForEvent(featuredEvent)}
                      className="py-3 px-4 bg-white/5 border border-white/20 text-white font-bold text-xs tracking-widest rounded-xl hover:bg-white/10 hover:border-[#00f0ff] transition-all flex items-center gap-1.5"
                    >
                      <Swords size={16} className="text-[#00f0ff]" /> BRACKET
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Right Character Layer with Glitch Micro-interaction */}
            <div 
              className="relative flex-shrink-0 flex items-center justify-center cursor-pointer group"
              onMouseEnter={triggerGlitch}
              onClick={triggerGlitch}
            >
              {/* Backlight Aura Glow */}
              <div className="w-64 h-80 sm:w-80 sm:h-96 rounded-full bg-[#00ff88]/20 blur-3xl group-hover:bg-[#00ff88]/30 transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                <img 
                  ref={heroCharRef}
                  src={featuredEvent?.character || '/img/ch6.png'} 
                  alt={featuredEvent?.characterName || 'Valkyrie'} 
                  className="w-64 sm:w-80 h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-2 bg-black/80 border border-[#00ff88]/50 px-4 py-1 rounded-full text-[10px] font-mono text-[#00ff88] tracking-widest backdrop-blur-md">
                  {featuredEvent?.characterName || 'VALKYRIE — ARENA AMBASSADOR'}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================================================
           12. LIVE EVENT REAL-TIME TELEMETRY TICKER
           ========================================================================== */}
        <div className="w-full bg-[#080d1a] border border-[#ff3366]/40 rounded-2xl px-5 py-3 flex items-center justify-between gap-4 overflow-hidden shadow-[0_0_25px_rgba(255,51,102,0.15)]">
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3366] animate-ping" />
            <span className="text-[11px] font-black text-[#ff3366] tracking-[0.25em] whitespace-nowrap">
              ● LIVE ARENA TELEMETRY
            </span>
          </div>

          <div className="text-xs font-mono text-gray-300 truncate tracking-wider">
            {liveEvents.length > 0 ? (
              <span>
                <span className="text-[#00ff88] font-bold">{liveEvents[0].title}</span>: SEMI-FINAL 1 // TEAM ALPHA [3] - [2] TEAM NOVA // 68' (Turf Pitch A) • Live Stream Available
              </span>
            ) : (
              <span>
                UPCOMING ARENA ROUND: H8X TURF CUP (18 SEP 19:00) • 32/48 PLAYERS REGISTERED • SQUAD REGISTRATION OPEN
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#00f0ff] flex-shrink-0">
            <span>ONLINE SQUADS: 14</span>
            <span>•</span>
            <span>PING 8ms</span>
          </div>
        </div>

        {/* ==========================================================================
           17. EVENT DISCOVERY & SMART RECOMMENDATIONS BANNER
           ========================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Recommendation 1: Personal Match */}
          <div className="p-4 rounded-2xl bg-black/60 border border-[#00ff88]/30 flex items-center justify-between gap-4 hover:border-[#00ff88] transition-all">
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-[#00ff88] tracking-widest flex items-center gap-1.5">
                <Sparkles size={12} /> RECOMMENDED FOR YOU
              </div>
              <div className="text-xs font-black text-white">{recommendedEvents[0]?.title || 'H8X TURF CUP'}</div>
              <div className="text-[10px] text-gray-400 font-mono">Based on your activity preference ({user.favouriteActivity})</div>
            </div>
            <button 
              onClick={() => setSelectedEventDetails(recommendedEvents[0] || eventsList[0])}
              className="p-2 rounded-xl bg-white/5 hover:bg-[#00ff88] hover:text-black transition-all text-xs font-bold"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Recommendation 2: Near Capacity */}
          <div className="p-4 rounded-2xl bg-black/60 border border-[#ffaa00]/30 flex items-center justify-between gap-4 hover:border-[#ffaa00] transition-all">
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-[#ffaa00] tracking-widest flex items-center gap-1.5">
                <Flame size={12} /> NEAR CAPACITY
              </div>
              <div className="text-xs font-black text-white">{nearCapacityEvents[0]?.title || 'AQUA SURGE SPRINT'}</div>
              <div className="text-[10px] text-gray-400 font-mono">Only 4 slots left • Closing soon</div>
            </div>
            <button 
              onClick={() => setSelectedEventDetails(nearCapacityEvents[0] || eventsList[3])}
              className="p-2 rounded-xl bg-white/5 hover:bg-[#ffaa00] hover:text-black transition-all text-xs font-bold"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Recommendation 3: Live Knockout Arena */}
          <div className="p-4 rounded-2xl bg-black/60 border border-[#00f0ff]/30 flex items-center justify-between gap-4 hover:border-[#00f0ff] transition-all">
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-[#00f0ff] tracking-widest flex items-center gap-1.5">
                <Swords size={12} /> LIVE BRACKET ARENA
              </div>
              <div className="text-xs font-black text-white">8-SQUAD CHAMPIONSHIPS</div>
              <div className="text-[10px] text-gray-400 font-mono">Quarterfinals in progress • Spectate matches</div>
            </div>
            <button 
              onClick={() => setActiveBracketTournament(tournamentsList[0])}
              className="p-2 rounded-xl bg-white/5 hover:bg-[#00f0ff] hover:text-black transition-all text-xs font-bold"
            >
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* ==========================================================================
           2. EVENT CATEGORIES & VIEW MODE NAVIGATION BAR
           ========================================================================== */}
        <div className="space-y-4 border-b border-white/10 pb-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* View Switcher: GRID vs CALENDAR vs LEADERBOARD */}
            <div className="flex items-center gap-2 bg-black/60 border border-white/15 p-1 rounded-xl">
              <button
                onClick={() => setActiveViewMode('GRID')}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                  activeViewMode === 'GRID' 
                    ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EVENT ARENA
              </button>
              <button
                onClick={() => setActiveViewMode('CALENDAR')}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                  activeViewMode === 'CALENDAR' 
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                CALENDAR
              </button>
              <button
                onClick={() => setActiveViewMode('LEADERBOARD')}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                  activeViewMode === 'LEADERBOARD' 
                    ? 'bg-[#e5b96a] text-black shadow-[0_0_15px_rgba(229,185,106,0.4)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                LEADERBOARD
              </button>
            </div>

            {/* Search Input and Status Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search events, arenas..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 pl-9 pr-3 py-2 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#00ff88] transition-all font-mono"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 px-3 py-1.5 rounded-xl text-xs font-mono text-gray-400">
                <Filter size={12} className="text-[#00ff88]" />
                <select 
                  value={selectedStatusFilter}
                  onChange={e => setSelectedStatusFilter(e.target.value)}
                  className="bg-transparent text-white text-xs outline-none cursor-pointer"
                >
                  {STATUS_FILTERS.map(st => (
                    <option key={st} value={st} className="bg-[#0b0f19] text-white">{st}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Categories Pill Scroller */}
          {activeViewMode === 'GRID' && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
              {CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat;
                const count = cat === 'ALL' 
                  ? eventsList.length 
                  : eventsList.filter(e => e.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap border flex items-center gap-2 ${
                      isActive 
                        ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.3)]' 
                        : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#00ff88] text-black font-black' : 'bg-white/10 text-gray-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* ==========================================================================
           3. FEATURED EVENTS GRID (PANEL VIEW)
           ========================================================================== */}
        {activeViewMode === 'GRID' && (
          <div className="space-y-6">
            
            {filteredEvents.length === 0 ? (
              <div className="p-16 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
                <AlertCircle size={40} className="mx-auto text-gray-500" />
                <div className="text-lg font-bold text-white">NO EVENTS FOUND</div>
                <p className="text-xs text-gray-400 font-mono">No tournaments or arena events matched your search query or filter.</p>
                <button 
                  onClick={() => { setSelectedCategory('ALL'); setSelectedStatusFilter('ALL'); setSearchQuery(''); }}
                  className="px-5 py-2 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => {
                  const capacityPercent = Math.min(100, Math.round((event.participants / event.capacity) * 100));
                  const isUserRegistered = userEventRegistrations.some(r => r.eventId === event.id);

                  return (
                    <div 
                      key={event.id}
                      className="group relative rounded-2xl bg-[#090d18] border border-white/10 overflow-hidden hover:border-[#00ff88]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,255,136,0.15)]"
                    >
                      {/* Image Backdrop Area */}
                      <div className="relative h-48 w-full overflow-hidden bg-black">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-black/60" />

                        {/* Top HUD Badges */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                          <span className="text-[10px] font-mono font-bold text-[#00ff88] bg-black/80 px-2.5 py-1 rounded-md border border-[#00ff88]/40">
                            #{event.number} // {event.category}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold tracking-widest border ${getStatusBadgeStyle(event.status)}`}>
                            {event.status}
                          </span>
                        </div>

                        {/* User Enlisted Indicator */}
                        {isUserRegistered && (
                          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-md bg-[#00ff88] text-black text-[9px] font-black tracking-widest flex items-center gap-1 shadow-lg">
                            <Check size={12} /> ENLISTED
                          </div>
                        )}
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        
                        <div className="space-y-2">
                          <h3 className="text-xl font-black text-white group-hover:text-[#00ff88] transition-colors leading-tight">
                            {event.title}
                          </h3>
                          <p className="text-xs text-gray-400 font-['Inter'] line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        {/* Telemetry Specs */}
                        <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs font-mono">
                          <div className="space-y-1">
                            <div className="text-[9px] text-gray-500 flex items-center gap-1">
                              <Calendar size={10} /> DATE & TIME
                            </div>
                            <div className="text-white font-bold text-[11px] truncate">
                              {event.date} @ {event.startTime}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-[9px] text-gray-500 flex items-center gap-1">
                              <MapPin size={10} /> VENUE
                            </div>
                            <div className="text-[#00f0ff] font-bold text-[11px] truncate">
                              {event.location}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-[9px] text-gray-500 flex items-center gap-1">
                              <CreditCard size={10} /> ENTRY FEE
                            </div>
                            <div className="text-white font-bold text-[11px]">
                              {event.entryFeeFormatted}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-[9px] text-gray-500 flex items-center gap-1">
                              <Award size={10} /> REWARDS
                            </div>
                            <div className="text-[#e5b96a] font-bold text-[11px]">
                              +{event.xpReward} XP / +{event.rewardPoints} PTS
                            </div>
                          </div>
                        </div>

                        {/* Capacity Progress Bar */}
                        <div className="space-y-1.5 font-mono">
                          <div className="flex justify-between text-[10px] text-gray-400">
                            <span>CAPACITY</span>
                            <span className="text-white font-bold">{event.participants} / {event.capacity} PLAYERS</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                capacityPercent >= 90 ? 'bg-[#ff3366]' : capacityPercent >= 70 ? 'bg-[#ffaa00]' : 'bg-[#00ff88]'
                              }`}
                              style={{ width: `${capacityPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Card Action Buttons */}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => setSelectedEventDetails(event)}
                            className="flex-1 py-2.5 px-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold tracking-wider border border-white/15 hover:border-white/30 transition-all text-center"
                          >
                            DETAILS
                          </button>

                          {event.hasTournamentBracket && (
                            <button
                              onClick={() => openBracketForEvent(event)}
                              className="py-2.5 px-3 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] rounded-xl text-xs font-bold tracking-wider border border-[#00f0ff]/40 transition-all flex items-center gap-1"
                              title="View Tournament Bracket"
                            >
                              <Swords size={14} />
                            </button>
                          )}

                          <button
                            onClick={() => startRegistration(event)}
                            disabled={event.status === 'COMPLETED' || event.status === 'CANCELLED'}
                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                              event.status === 'COMPLETED' || event.status === 'CANCELLED'
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                : 'bg-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] font-black'
                            }`}
                          >
                            {isUserRegistered ? 'VIEW PASS' : 'JOIN NOW'}
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ==========================================================================
           18. EVENT CALENDAR VIEW (MONTH / WEEK / DAY)
           ========================================================================== */}
        {activeViewMode === 'CALENDAR' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#070b14] border border-[#00f0ff]/30 space-y-6 shadow-2xl">
            
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black text-white tracking-wider flex items-center gap-2">
                  <Calendar className="text-[#00f0ff]" size={20} />
                  ARENA TIMELINE SCHEDULE
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Filter match slots across September 2026</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-black/60 border border-white/15 p-1 rounded-xl text-xs font-mono">
                  {['MONTH', 'WEEK', 'DAY'].map(v => (
                    <button
                      key={v}
                      onClick={() => setCalendarViewType(v)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                        calendarViewType === v ? 'bg-[#00f0ff] text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-gray-300 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                  <button className="hover:text-[#00f0ff]"><ChevronLeft size={16} /></button>
                  <span className="font-bold text-white">{currentCalendarMonth}</span>
                  <button className="hover:text-[#00f0ff]"><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            {/* Calendar Grid Representation */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-gray-400">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="py-2 text-[11px] font-bold text-gray-400 border-b border-white/10">
                  {day}
                </div>
              ))}

              {/* Sample Month Grid for September 2026 */}
              {Array.from({ length: 30 }).map((_, idx) => {
                const dayNum = idx + 1;
                const dateString = `${dayNum < 10 ? '0' : ''}${dayNum} SEP 2026`;
                const dayEvents = eventsList.filter(e => e.date.includes(`${dayNum < 10 ? '0' : ''}${dayNum} SEP`));
                const isSelectedDay = dayNum === 18; // Featured tournament day

                return (
                  <div 
                    key={dayNum}
                    className={`min-h-[90px] p-2 rounded-xl border flex flex-col justify-between text-left transition-all ${
                      isSelectedDay 
                        ? 'bg-[#00ff88]/10 border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.2)]' 
                        : dayEvents.length > 0 
                          ? 'bg-black/60 border-white/15 hover:border-white/40' 
                          : 'bg-black/30 border-white/5 text-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className={`font-bold ${isSelectedDay ? 'text-[#00ff88]' : 'text-gray-300'}`}>{dayNum}</span>
                      {dayEvents.length > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                      )}
                    </div>

                    <div className="space-y-1 mt-1">
                      {dayEvents.map(dev => (
                        <div 
                          key={dev.id}
                          onClick={() => setSelectedEventDetails(dev)}
                          className="p-1 rounded bg-[#00ff88]/15 border border-[#00ff88]/30 text-[9px] font-bold text-[#00ff88] truncate hover:bg-[#00ff88] hover:text-black cursor-pointer transition-all"
                          title={dev.title}
                        >
                          {dev.startTime} - {dev.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ==========================================================================
           13. EVENT LEADERBOARD SECTION
           ========================================================================== */}
        {activeViewMode === 'LEADERBOARD' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#070b14] border border-[#e5b96a]/30 space-y-6 shadow-2xl">
            
            {/* Leaderboard Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black text-white tracking-wider flex items-center gap-2">
                  <Trophy className="text-[#e5b96a]" size={20} />
                  H8X HALL OF CHAMPIONS // LEADERBOARD
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Top ranked tournament squads and solo operatives across H8X arenas</p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                {['ALL', 'TURF', 'VIRTUAL GAMES', 'BOARD GAMES'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setLeaderboardCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                      leaderboardCategory === cat 
                        ? 'bg-[#e5b96a] text-black border-[#e5b96a]' 
                        : 'bg-black/50 text-gray-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase tracking-widest">
                    <th className="py-3 px-4">RANK</th>
                    <th className="py-3 px-4">SQUAD / OPERATIVE</th>
                    <th className="py-3 px-4">DISCIPLINE</th>
                    <th className="py-3 px-4">LEVEL</th>
                    <th className="py-3 px-4">XP EARNED</th>
                    <th className="py-3 px-4">W / L RECORD</th>
                    <th className="py-3 px-4 text-right">SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {INITIAL_EVENT_LEADERBOARDS
                    .filter(lb => leaderboardCategory === 'ALL' || lb.category === leaderboardCategory)
                    .map((item, i) => {
                      const isTop3 = i < 3;
                      const rankColor = i === 0 ? 'text-[#e5b96a]' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-[#cd7f32]' : 'text-gray-500';

                      return (
                        <tr key={item.rank} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-black">
                            <span className={`text-sm ${rankColor}`}>#{item.rank}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-white font-['Orbitron'] text-xs">{item.name}</span>
                              <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] text-gray-300 font-bold">{item.badge}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-gray-400">{item.category}</td>
                          <td className="py-3.5 px-4 text-white font-bold">LVL {item.level}</td>
                          <td className="py-3.5 px-4 text-[#00ff88] font-bold">{item.xp}</td>
                          <td className="py-3.5 px-4 text-gray-300">{item.wins}W - {item.losses}L</td>
                          <td className="py-3.5 px-4 text-right font-black text-white text-sm">{item.score} PTS</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* ==========================================================================
         5. EVENT DETAILS MODAL
         ========================================================================== */}
      {selectedEventDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#080c16] border border-[#00ff88]/40 rounded-3xl overflow-y-auto no-scrollbar shadow-[0_0_100px_rgba(0,0,0,0.95)] flex flex-col">
            
            {/* Hero Banner with Close */}
            <div className="relative h-60 sm:h-72 w-full flex-shrink-0">
              <img 
                src={selectedEventDetails.image} 
                alt={selectedEventDetails.title} 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c16] via-[#080c16]/50 to-transparent" />

              <button
                onClick={() => setSelectedEventDetails(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 border border-white/20 text-gray-300 hover:text-white hover:border-white transition-all z-20"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-black tracking-widest border ${getStatusBadgeStyle(selectedEventDetails.status)}`}>
                    {selectedEventDetails.status}
                  </span>
                  <span className="text-xs font-mono text-[#00ff88]">
                    ARENA #{selectedEventDetails.number} // {selectedEventDetails.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {selectedEventDetails.title}
                </h2>
                <div className="text-xs sm:text-sm font-mono text-[#e5b96a]">
                  {selectedEventDetails.tagline}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              
              {/* Event Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-gray-500">SCHEDULE</div>
                  <div className="text-white font-bold mt-0.5">{selectedEventDetails.date}</div>
                  <div className="text-gray-400 text-[10px]">{selectedEventDetails.startTime} - {selectedEventDetails.endTime}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">LOCATION & DURATION</div>
                  <div className="text-[#00f0ff] font-bold mt-0.5">{selectedEventDetails.location}</div>
                  <div className="text-gray-400 text-[10px]">{selectedEventDetails.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">ENLISTMENT FEE</div>
                  <div className="text-[#00ff88] font-bold mt-0.5 text-sm">{selectedEventDetails.entryFeeFormatted}</div>
                  <div className="text-gray-400 text-[10px]">Per Player / Squad</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">REWARD ALLOCATION</div>
                  <div className="text-[#e5b96a] font-bold mt-0.5">+{selectedEventDetails.xpReward} XP</div>
                  <div className="text-gray-400 text-[10px]">+{selectedEventDetails.rewardPoints} Reward Points</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#00ff88] tracking-widest uppercase">MISSION BRIEFING</h4>
                <p className="text-xs sm:text-sm text-gray-300 font-['Inter'] leading-relaxed">
                  {selectedEventDetails.description}
                </p>
              </div>

              {/* Rules */}
              {selectedEventDetails.rules && selectedEventDetails.rules.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-[#00f0ff] tracking-widest uppercase">ENGAGEMENT PROTOCOLS & RULES</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedEventDetails.rules.map((rule, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-gray-300 flex items-start gap-2.5">
                        <span className="text-[#00f0ff] font-bold">0{idx + 1}.</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prize Pool Breakdown */}
              {selectedEventDetails.prizes && selectedEventDetails.prizes.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-[#e5b96a] tracking-widest uppercase">PRIZE POOL & CHAMPION REWARDS</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedEventDetails.prizes.map((pz, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-black/60 border border-[#e5b96a]/30 space-y-1.5">
                        <div className="text-[10px] font-black text-[#e5b96a] tracking-widest flex items-center gap-1.5">
                          <Trophy size={14} /> {pz.place}
                        </div>
                        <div className="text-xs font-bold text-white font-mono">{pz.prize}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                {selectedEventDetails.hasTournamentBracket && (
                  <button
                    onClick={() => {
                      const t = tournamentsList.find(t => t.id === selectedEventDetails.tournamentId) || tournamentsList[0];
                      setSelectedEventDetails(null);
                      setActiveBracketTournament(t);
                    }}
                    className="py-3.5 px-6 bg-white/5 border border-white/20 text-white font-bold text-xs tracking-widest rounded-xl hover:bg-white/10 hover:border-[#00f0ff] transition-all flex items-center gap-2"
                  >
                    <Swords size={16} className="text-[#00f0ff]" /> VIEW LIVE BRACKET
                  </button>
                )}

                <button
                  onClick={() => {
                    const ev = selectedEventDetails;
                    setSelectedEventDetails(null);
                    startRegistration(ev);
                  }}
                  className="cyber-btn flex-1 py-3.5 px-8 bg-[#00ff88] text-black font-black text-xs tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] flex items-center justify-center gap-2"
                >
                  <Trophy size={16} /> [ ENLIST NOW — {selectedEventDetails.entryFeeFormatted} ]
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==========================================================================
         6. TOURNAMENT BRACKET MODAL (8-SQUAD KNOCKOUT SINGLE ELIMINATION)
         ========================================================================== */}
      {activeBracketTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#070912] border border-[#00f0ff]/40 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.98)] flex flex-col">
            
            {/* Bracket Header */}
            <div className="p-6 bg-[#0a0f1d] border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-[#00f0ff] tracking-[0.3em]">
                    LIVE ARENA BRACKET // H8X HORCRUX
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30">
                    {activeBracketTournament.format}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider">
                  {activeBracketTournament.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveBracketTournament(null)}
                className="p-2.5 rounded-full bg-black/60 border border-white/15 text-gray-400 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Bracket Tree Area (Mobile-Optimized without page overflow) */}
            <div className="p-6 sm:p-10 flex-1 overflow-x-auto no-scrollbar space-y-6">
              
              <div className="min-w-[850px] grid grid-cols-3 gap-8 relative items-center">
                
                {/* Round 1: Quarter Finals */}
                <div className="space-y-6">
                  <div className="text-xs font-mono font-black text-gray-400 tracking-widest border-b border-white/10 pb-2 text-center">
                    QUARTER FINALS (BEST OF 1)
                  </div>

                  <div className="space-y-4">
                    {activeBracketTournament.rounds[0]?.matches.map(m => (
                      <div 
                        key={m.id}
                        className={`p-3.5 rounded-2xl border text-xs font-mono transition-all ${
                          m.status === 'LIVE'
                            ? 'bg-[#ff3366]/10 border-[#ff3366] shadow-[0_0_20px_rgba(255,51,102,0.2)]'
                            : 'bg-black/60 border-white/15 hover:border-white/40'
                        }`}
                      >
                        <div className="flex justify-between text-[9px] text-gray-400 mb-2 border-b border-white/5 pb-1">
                          <span>{m.id}</span>
                          <span className={m.status === 'LIVE' ? 'text-[#ff3366] font-bold' : ''}>{m.status}</span>
                        </div>

                        {/* Team 1 */}
                        <div className={`flex justify-between items-center py-1 px-2 rounded ${m.winner === m.team1 ? 'bg-[#00ff88]/20 text-[#00ff88] font-bold' : 'text-gray-300'}`}>
                          <span className="font-['Orbitron'] truncate">{m.team1}</span>
                          <span className="font-black text-sm">{m.score1}</span>
                        </div>

                        {/* Team 2 */}
                        <div className={`flex justify-between items-center py-1 px-2 rounded mt-1 ${m.winner === m.team2 ? 'bg-[#00ff88]/20 text-[#00ff88] font-bold' : 'text-gray-300'}`}>
                          <span className="font-['Orbitron'] truncate">{m.team2}</span>
                          <span className="font-black text-sm">{m.score2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Round 2: Semi Finals */}
                <div className="space-y-6">
                  <div className="text-xs font-mono font-black text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-2 text-center">
                    SEMI FINALS (BEST OF 3)
                  </div>

                  <div className="space-y-16 pt-6">
                    {activeBracketTournament.rounds[1]?.matches.map(m => (
                      <div 
                        key={m.id}
                        className={`p-4 rounded-2xl border text-xs font-mono transition-all ${
                          m.status === 'LIVE'
                            ? 'bg-[#ff3366]/15 border-[#ff3366] shadow-[0_0_25px_rgba(255,51,102,0.3)]'
                            : 'bg-black/80 border-white/20 hover:border-[#00f0ff]'
                        }`}
                      >
                        <div className="flex justify-between text-[10px] text-gray-400 mb-2 border-b border-white/10 pb-1">
                          <span className="text-[#00f0ff] font-bold">{m.id}</span>
                          <span className={m.status === 'LIVE' ? 'text-[#ff3366] font-black animate-pulse' : ''}>{m.status}</span>
                        </div>

                        {/* Team 1 */}
                        <div className={`flex justify-between items-center py-1.5 px-2.5 rounded ${m.winner === m.team1 ? 'bg-[#00ff88]/20 text-[#00ff88] font-bold' : 'text-gray-200'}`}>
                          <span className="font-['Orbitron'] font-bold truncate">{m.team1}</span>
                          <span className="font-black text-base">{m.score1}</span>
                        </div>

                        {/* Team 2 */}
                        <div className={`flex justify-between items-center py-1.5 px-2.5 rounded mt-1.5 ${m.winner === m.team2 ? 'bg-[#00ff88]/20 text-[#00ff88] font-bold' : 'text-gray-200'}`}>
                          <span className="font-['Orbitron'] font-bold truncate">{m.team2}</span>
                          <span className="font-black text-base">{m.score2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Round 3: Grand Finals & Champion Trophy */}
                <div className="space-y-6">
                  <div className="text-xs font-mono font-black text-[#e5b96a] tracking-widest border-b border-[#e5b96a]/30 pb-2 text-center">
                    CHAMPIONSHIP GRAND FINAL
                  </div>

                  <div className="pt-12 space-y-6">
                    {activeBracketTournament.rounds[2]?.matches.map(m => (
                      <div 
                        key={m.id}
                        className="p-5 rounded-3xl bg-gradient-to-b from-[#0f172a] to-black border-2 border-[#e5b96a] shadow-[0_0_40px_rgba(229,185,106,0.3)] text-xs font-mono space-y-4"
                      >
                        <div className="flex justify-between items-center text-[10px] text-gray-400 border-b border-white/10 pb-2">
                          <span className="text-[#e5b96a] font-bold">TROPHY MATCH</span>
                          <span className="px-2 py-0.5 rounded bg-[#e5b96a]/20 text-[#e5b96a] font-bold">
                            {m.status}
                          </span>
                        </div>

                        {/* Team 1 */}
                        <div className={`flex justify-between items-center py-2 px-3 rounded-xl ${m.winner === m.team1 ? 'bg-[#e5b96a] text-black font-black' : 'text-gray-200'}`}>
                          <span className="font-['Orbitron'] font-bold text-sm truncate">{m.team1}</span>
                          <span className="font-black text-lg">{m.score1}</span>
                        </div>

                        {/* Team 2 */}
                        <div className={`flex justify-between items-center py-2 px-3 rounded-xl ${m.winner === m.team2 ? 'bg-[#e5b96a] text-black font-black' : 'text-gray-200'}`}>
                          <span className="font-['Orbitron'] font-bold text-sm truncate">{m.team2}</span>
                          <span className="font-black text-lg">{m.score2}</span>
                        </div>

                        {/* Current Tournament Leader */}
                        <div className="p-3 rounded-2xl bg-black/60 border border-[#e5b96a]/40 text-center space-y-1">
                          <Trophy size={20} className="mx-auto text-[#e5b96a]" />
                          <div className="text-[10px] text-[#e5b96a] font-bold tracking-widest">GRAND PRIZE</div>
                          <div className="text-xs font-black text-white">₹15,000 + CHAMPION BADGE</div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==========================================================================
         7, 8, 9. PLAYER & TEAM REGISTRATION MODAL WITH PAYMENT CHECKOUT
         ========================================================================== */}
      {registrationEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in font-['Orbitron']">
          <div className="relative w-full max-w-2xl bg-[#080c16] border border-[#00ff88]/40 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.98)] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#0a0f1d] border-b border-white/10 flex justify-between items-center">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[#00ff88] tracking-widest">
                  STEP 0{registrationStep} // 03 — ENLISTMENT PROTOCOL
                </div>
                <h3 className="text-xl font-black text-white">
                  {registrationStep === 1 && 'SQUAD & OPERATIVE VERIFICATION'}
                  {registrationStep === 2 && 'MISSION FEE PAYMENT CHECKOUT'}
                  {registrationStep === 3 && 'MISSION PASS CONFIRMED'}
                </h3>
              </div>

              <button
                onClick={() => setRegistrationEvent(null)}
                className="p-2.5 rounded-full bg-black/60 border border-white/15 text-gray-400 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Step 1: Verification & Squad Selection */}
            {registrationStep === 1 && (
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Operative Identity Badge */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/15 flex items-center gap-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-14 h-14 rounded-xl object-cover border border-[#00ff88]/60 bg-[#00ff88]/10"
                  />
                  <div className="flex-1 space-y-0.5">
                    <div className="text-[10px] font-mono text-[#00ff88]">VERIFIED PLAYER IDENTITY</div>
                    <div className="text-base font-black text-white">{user.name} ({user.id})</div>
                    <div className="text-xs font-mono text-gray-400">LVL {user.level} OPERATIVE • {user.xp} XP</div>
                  </div>
                  <CheckCircle2 size={22} className="text-[#00ff88]" />
                </div>

                {/* Enlistment Mode Toggle */}
                <div className="space-y-3">
                  <label className="text-xs font-mono text-gray-400">SELECT REGISTRATION STRUCTURE</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'SOLO', label: 'SOLO ENTRY', desc: 'Auto-match with squad' },
                      { id: 'CREATE_TEAM', label: 'CREATE SQUAD', desc: 'Form new tournament team' },
                      { id: 'JOIN_TEAM', label: 'JOIN SQUAD', desc: 'Enlist under existing squad' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setRegistrationMode(mode.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          registrationMode === mode.id
                            ? 'bg-[#00ff88]/15 border-[#00ff88] text-white shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                            : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        <div className="text-xs font-black">{mode.label}</div>
                        <div className="text-[9px] font-mono text-gray-400 mt-1">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Create Team Input */}
                {registrationMode === 'CREATE_TEAM' && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="text-xs font-mono text-[#00ff88]">ENTER NEW TEAM / SQUAD NAME</label>
                    <input 
                      type="text"
                      placeholder="e.g. CYBER VANGUARD"
                      value={newTeamName}
                      onChange={e => setNewTeamName(e.target.value)}
                      className="w-full bg-black/80 border border-white/20 p-3.5 rounded-xl text-xs font-mono text-white outline-none focus:border-[#00ff88]"
                    />
                    <p className="text-[10px] text-gray-400 font-mono">You will be designated as SQUAD CAPTAIN for this tournament.</p>
                  </div>
                )}

                {/* Join Existing Team Dropdown */}
                {registrationMode === 'JOIN_TEAM' && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="text-xs font-mono text-[#00ff88]">CHOOSE EXISTING SQUAD</label>
                    <select
                      value={selectedTeamId}
                      onChange={e => setSelectedTeamId(e.target.value)}
                      className="w-full bg-black/80 border border-white/20 p-3.5 rounded-xl text-xs font-mono text-white outline-none focus:border-[#00ff88]"
                    >
                      {teamsList.map(t => (
                        <option key={t.id} value={t.id} className="bg-[#080c16] text-white">
                          {t.name} (Captain: {t.captain}) • {t.members.length} Members
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 flex justify-between items-center border-t border-white/10">
                  <button
                    onClick={() => setRegistrationEvent(null)}
                    className="px-5 py-3 text-xs font-bold text-gray-400 hover:text-white"
                  >
                    CANCEL
                  </button>

                  <button
                    onClick={() => setRegistrationStep(2)}
                    className="cyber-btn py-3.5 px-8 bg-[#00ff88] text-black font-black text-xs tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] flex items-center gap-2"
                  >
                    PROCEED TO PAYMENT <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            )}

            {/* Step 2: Payment Checkout */}
            {registrationStep === 2 && (
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Event Summary Fee */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400">TOURNAMENT</span>
                    <span className="text-xs font-bold text-white font-mono">{registrationEvent.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400">TOTAL ENTRY CHARGE</span>
                    <span className="text-lg font-black text-[#00ff88]">{registrationEvent.entryFeeFormatted}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[10px] font-mono text-[#e5b96a]">
                    <span>REWARD ON REGISTRATION</span>
                    <span>+{registrationEvent.xpReward} XP & +{registrationEvent.rewardPoints} PTS</span>
                  </div>
                </div>

                {/* Error Banner */}
                {walletError && (
                  <div className="p-3.5 rounded-xl bg-red-900/30 border border-red-500/50 text-xs font-mono text-red-300 flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                    <span>{walletError}</span>
                  </div>
                )}

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-mono text-gray-400">CHOOSE PAYMENT PROTOCOL</label>
                  
                  <div className="space-y-2">
                    {/* H8X Wallet Option */}
                    <button
                      type="button"
                      onClick={() => { setSelectedPaymentMethod('H8X WALLET'); setWalletError(null); }}
                      className={`w-full p-4 rounded-2xl border flex justify-between items-center transition-all ${
                        selectedPaymentMethod === 'H8X WALLET'
                          ? 'bg-[#e5b96a]/15 border-[#e5b96a] shadow-[0_0_20px_rgba(229,185,106,0.3)]'
                          : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet size={20} className="text-[#e5b96a]" />
                        <div className="text-left">
                          <div className="text-xs font-black text-white">H8X WALLET (RECOMMENDED)</div>
                          <div className="text-[10px] font-mono text-gray-400">Available Balance: ₹{currentBalance.toLocaleString()}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#e5b96a]">INSTANT DEBIT</span>
                    </button>

                    {/* UPI Option */}
                    <button
                      type="button"
                      onClick={() => { setSelectedPaymentMethod('UPI'); setWalletError(null); }}
                      className={`w-full p-4 rounded-2xl border flex justify-between items-center transition-all ${
                        selectedPaymentMethod === 'UPI'
                          ? 'bg-[#00ff88]/15 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                          : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Zap size={20} className="text-[#00ff88]" />
                        <div className="text-left">
                          <div className="text-xs font-black text-white">UPI (GPAY / PHONEPE / PAYTM)</div>
                          <div className="text-[10px] font-mono text-gray-400">Instant UPI gateway authorization</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#00ff88]">FAST</span>
                    </button>

                    {/* Card Option */}
                    <button
                      type="button"
                      onClick={() => { setSelectedPaymentMethod('CREDIT / DEBIT CARD'); setWalletError(null); }}
                      className={`w-full p-4 rounded-2xl border flex justify-between items-center transition-all ${
                        selectedPaymentMethod === 'CREDIT / DEBIT CARD'
                          ? 'bg-[#00f0ff]/15 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                          : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard size={20} className="text-[#00f0ff]" />
                        <div className="text-left">
                          <div className="text-xs font-black text-white">CREDIT / DEBIT CARD</div>
                          <div className="text-[10px] font-mono text-gray-400">Visa, Mastercard, RuPay</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-400">SECURE</span>
                    </button>
                  </div>
                </div>

                {/* Checkout Actions */}
                <div className="pt-4 flex justify-between items-center border-t border-white/10">
                  <button
                    onClick={() => setRegistrationStep(1)}
                    className="px-5 py-3 text-xs font-bold text-gray-400 hover:text-white"
                  >
                    BACK
                  </button>

                  <button
                    onClick={handleExecuteRegistration}
                    className="cyber-btn py-3.5 px-8 bg-[#00ff88] text-black font-black text-xs tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] flex items-center gap-2"
                  >
                    CONFIRM & PAY {registrationEvent.entryFeeFormatted}
                  </button>
                </div>

              </div>
            )}

            {/* Step 3: Mission Pass Confirmation */}
            {registrationStep === 3 && confirmedPassData && (
              <div className="p-6 sm:p-8 space-y-6 animate-scale-in">
                
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-[#00ff88]/20 border border-[#00ff88] flex items-center justify-center mx-auto text-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-black text-white">ARENA ENLISTMENT COMPLETE</h4>
                  <p className="text-xs text-gray-300 font-mono">Present your Mission Pass at Arena Entrance HUD desk</p>
                </div>

                {/* Digital Mission Pass Voucher */}
                <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0d1424] to-black border-2 border-[#00ff88]/60 space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/10 blur-2xl pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#00ff88] font-bold">H8X MISSION PASS</div>
                      <div className="text-lg font-black text-white">{confirmedPassData.eventTitle}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-mono text-gray-400">PASS CODE</div>
                      <div className="text-xs font-mono font-black text-[#00ff88]">{confirmedPassData.id}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <div className="text-[9px] text-gray-500">OPERATIVE</div>
                      <div className="text-white font-bold">{confirmedPassData.participantName}</div>
                      <div className="text-[10px] text-gray-400">{confirmedPassData.participantId}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500">SQUAD BANNER</div>
                      <div className="text-[#00f0ff] font-bold">{confirmedPassData.teamName}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500">ARENA VENUE</div>
                      <div className="text-gray-300 font-bold">{confirmedPassData.location}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500">DATE & TIME</div>
                      <div className="text-white font-bold">{confirmedPassData.date} @ {confirmedPassData.time}</div>
                    </div>
                  </div>

                  {/* QR Code & Barcode Layer */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <QrCode size={40} className="text-black" />
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">
                        STATUS: CONFIRMED <br />
                        PAID: {confirmedPassData.amountPaid}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-[#e5b96a] font-bold">
                        +{confirmedPassData.xpAwarded} XP AWARDED
                      </div>
                      <div className="text-[9px] font-mono text-gray-400">
                        +{confirmedPassData.pointsAwarded} REWARD POINTS
                      </div>
                    </div>
                  </div>

                </div>

                {/* Print & Close Actions */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      if (onOpenReceiptModal) {
                        onOpenReceiptModal({
                          id: confirmedPassData.paymentTxnId,
                          description: `Event Entry: ${confirmedPassData.eventTitle}`,
                          amountFormatted: confirmedPassData.amountPaid,
                          amount: registrationEvent.entryFee,
                          createdAt: confirmedPassData.registeredAt,
                          method: selectedPaymentMethod,
                          status: 'PAID'
                        });
                      }
                    }}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <Printer size={16} /> VIEW / PRINT RECEIPT
                  </button>

                  <button
                    onClick={() => setRegistrationEvent(null)}
                    className="cyber-btn flex-1 py-3 bg-[#00ff88] text-black font-black text-xs tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]"
                  >
                    RETURN TO ARENA
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
