/* ==========================================================================
   H8X HORCRUX — NOTIFICATIONS SYSTEM DATA ARCHITECTURE (PART 14)
   ========================================================================== */

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-01',
    type: 'EVENT',
    title: 'H8X NIGHT ARENA TOURNAMENT IS LIVE',
    desc: 'Registration open for the 8-Squad Knockout Championship on Turf & VR. Prize pool ₹25,000.',
    time: '12m ago',
    timestamp: '2026-09-18T18:48:00Z',
    read: false,
    link: 'events',
    badgeColor: '#00ff88'
  },
  {
    id: 'notif-02',
    type: 'BOOKING',
    title: 'BOOKING CONFIRMED — SYNTHETIC TURF',
    desc: 'Session BK-8821 confirmed for Today at 18:00 (Pitch A). Show digital Mission Pass at Arena gate.',
    time: '45m ago',
    timestamp: '2026-09-18T18:15:00Z',
    read: false,
    link: 'profile',
    badgeColor: '#e5b96a'
  },
  {
    id: 'notif-03',
    type: 'XP',
    title: 'PROGRESSION XP AWARDED: +150 XP',
    desc: 'Earned from Turf Arena Session. You are 2,150 XP away from Level 13 Arena Titan.',
    time: '2h ago',
    timestamp: '2026-09-18T16:00:00Z',
    read: true,
    link: 'membership',
    badgeColor: '#00f0ff'
  },
  {
    id: 'notif-04',
    type: 'REWARD',
    title: 'REWARD POINTS MILESTONE: 1,850 PTS',
    desc: 'You reached 1,850 Reward Points. 4 new catalog vouchers ready to unlock in the Player Hub.',
    time: '5h ago',
    timestamp: '2026-09-18T13:00:00Z',
    read: true,
    link: 'profile',
    badgeColor: '#a855f7'
  },
  {
    id: 'notif-05',
    type: 'OFFER',
    title: 'SPECIAL OFFER ACTIVE: CODE H8XFIRST',
    desc: 'Get 50% discount up to ₹500 on any activity booking or combined cafeteria order.',
    time: '1d ago',
    timestamp: '2026-09-17T10:00:00Z',
    read: true,
    link: 'activities',
    badgeColor: '#ff9900'
  },
  {
    id: 'notif-06',
    type: 'CAFE',
    title: 'CAFÉ ORDER PREPARED — HXFO-02931',
    desc: 'H8X Classic Burger × 2 + Fresh Cold-Pressed Juice × 2 are ready for pickup at Barista Station.',
    time: '1d ago',
    timestamp: '2026-09-17T09:45:00Z',
    read: true,
    link: 'cafeteria',
    badgeColor: '#ff3366'
  }
];
