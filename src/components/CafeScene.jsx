import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, Filter, Sparkles, Flame, Plus, Minus, X, Check, 
  Clock, ArrowRight, Shield, CreditCard, ChevronRight, Zap, RefreshCw, 
  Award, Heart, AlertCircle, Eye, CheckCircle2, Coffee, Utensils, Printer, Wallet
} from 'lucide-react';
import { gsap } from 'gsap';
import ReceiptModal from './ReceiptModal.jsx';

export const INITIAL_CAFE_MENU = [
  {
    id: 'cf-1',
    name: 'H8X CLASSIC BURGER',
    category: 'MEALS',
    description: 'Artisanal grilled Angus patty, aged smoked cheddar, fresh hydro-lettuce, house relish on brioche bun.',
    ingredients: ['Angus Beef', 'Smoked Cheddar', 'Hydro Lettuce', 'Tomato', 'Brioche Bun', 'Truffle Aioli'],
    nutrition: { calories: 620, protein: '38g', carbs: '44g', fats: '28g' },
    price: 280,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    xpReward: 20,
    available: true,
    featured: true,
    tags: ['POPULAR', 'HIGH PROTEIN']
  },
  {
    id: 'cf-2',
    name: 'DOUBLE CYBER BURGER',
    category: 'MEALS',
    description: 'Double smashed patties, caramelized shallots, molten pepper jack cheese, smoky chipotle barbecue drizzle.',
    ingredients: ['Double Angus Patty', 'Molten Pepper Jack', 'Caramelized Onion', 'Chipotle BBQ', 'Brioche'],
    nutrition: { calories: 840, protein: '56g', carbs: '48g', fats: '42g' },
    price: 340,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    xpReward: 25,
    available: true,
    featured: true,
    tags: ['POPULAR', 'NEW', 'HIGH PROTEIN']
  },
  {
    id: 'cf-3',
    name: 'HIGH-PROTEIN SALMON BOWL',
    category: 'MEALS',
    description: 'Pan-seared Atlantic salmon, tricolor organic quinoa, hass avocado, edamame, roasted sesame citrus glaze.',
    ingredients: ['Atlantic Salmon', 'Organic Quinoa', 'Hass Avocado', 'Edamame', 'Pickled Ginger', 'Sesame Glaze'],
    nutrition: { calories: 510, protein: '42g', carbs: '36g', fats: '22g' },
    price: 420,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    xpReward: 30,
    available: true,
    featured: true,
    tags: ['HIGH PROTEIN', 'NEW']
  },
  {
    id: 'cf-4',
    name: 'GRILLED CHICKEN POWER BOWL',
    category: 'MEALS',
    description: 'Herbed grilled chicken breast, roasted sweet potatoes, charred broccoli, pumpkin seeds, tahini green dressing.',
    ingredients: ['Grilled Chicken Breast', 'Sweet Potato', 'Charred Broccoli', 'Pumpkin Seeds', 'Herbed Tahini'],
    nutrition: { calories: 480, protein: '45g', carbs: '38g', fats: '16g' },
    price: 380,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    xpReward: 25,
    available: true,
    featured: false,
    tags: ['HIGH PROTEIN']
  },
  {
    id: 'cf-5',
    name: 'LOADED TACTICAL FRIES',
    category: 'SNACKS',
    description: 'Double-cooked crispy Idaho potato wedges topped with smoked gouda sauce, crispy jalapeño chips, and chives.',
    ingredients: ['Idaho Potatoes', 'Smoked Gouda Cheese Sauce', 'Pickled Jalapeños', 'Chives', 'Smoked Paprika'],
    nutrition: { calories: 420, protein: '12g', carbs: '52g', fats: '20g' },
    price: 180,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    xpReward: 15,
    available: true,
    featured: true,
    tags: ['POPULAR', 'QUICK BITES', 'VEGETARIAN']
  },
  {
    id: 'cf-6',
    name: 'TACTICAL WAFFLE NACHOS',
    category: 'SNACKS',
    description: 'Crispy criss-cut waffle fries layered with black bean chili, molten cheddar, sour cream, and fresh pico de gallo.',
    ingredients: ['Waffle Potato Fries', 'Black Bean Chili', 'Melted Cheddar', 'Guacamole', 'Sour Cream', 'Pico'],
    nutrition: { calories: 490, protein: '16g', carbs: '58g', fats: '24g' },
    price: 240,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    xpReward: 15,
    available: true,
    featured: false,
    tags: ['QUICK BITES', 'VEGETARIAN']
  },
  {
    id: 'cf-7',
    name: 'CRISPY PROTEIN POPPERS',
    category: 'SNACKS',
    description: 'Bite-sized spiced chicken poppers coated in crunchy almond crust, served with sriracha yogurt dip.',
    ingredients: ['Tender Chicken Bites', 'Almond Panko Crust', 'Sea Salt', 'Sriracha Greek Yogurt'],
    nutrition: { calories: 360, protein: '32g', carbs: '18g', fats: '14g' },
    price: 210,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    xpReward: 15,
    available: true,
    featured: false,
    tags: ['QUICK BITES', 'HIGH PROTEIN']
  },
  {
    id: 'cf-8',
    name: 'FRESH COLD-PRESSED JUICE',
    category: 'BEVERAGES',
    description: 'Valencia oranges, passion fruit, raw ginger, Himalayan pink salt and electrolyte hydration minerals.',
    ingredients: ['Valencia Oranges', 'Passion Fruit', 'Fresh Ginger', 'Electrolytes', 'Filtered Alkaline Water'],
    nutrition: { calories: 140, protein: '2g', carbs: '32g', fats: '0g' },
    price: 120,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    xpReward: 10,
    available: true,
    featured: true,
    tags: ['POPULAR', 'DRINKS', 'VEGETARIAN']
  },
  {
    id: 'cf-9',
    name: 'CHOCOLATE WHEY SHAKE',
    category: 'BEVERAGES',
    description: 'Belgian dark cacao blended with isolated whey protein, frozen bananas, almond butter, and oat milk.',
    ingredients: ['Pure Whey Isolate (30g)', 'Belgian Dark Cacao', 'Oat Milk', 'Almond Butter', 'Banana'],
    nutrition: { calories: 340, protein: '34g', carbs: '28g', fats: '8g' },
    price: 180,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    xpReward: 15,
    available: true,
    featured: true,
    tags: ['POPULAR', 'HIGH PROTEIN', 'DRINKS', 'VEGETARIAN']
  },
  {
    id: 'cf-10',
    name: 'H8X NITRO COLD BREW',
    category: 'BEVERAGES',
    description: '24-hour steep Ethiopian Yirgacheffe coffee infused with nitrogen for a silky, micro-foamed crema finish.',
    ingredients: ['Ethiopian Single Origin Beans', 'Filtered Nitrogen Infusion', 'Natural Vanilla Essence'],
    nutrition: { calories: 15, protein: '1g', carbs: '2g', fats: '0g' },
    price: 160,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    xpReward: 15,
    available: true,
    featured: false,
    tags: ['DRINKS', 'NEW']
  },
  {
    id: 'cf-11',
    name: 'ELECTRO-HYDRATE SMOOTHIE',
    category: 'BEVERAGES',
    description: 'Raw coconut water, blue spirulina, pineapple chunks, lime zest, and mineral hydration matrix.',
    ingredients: ['Organic Coconut Water', 'Blue Spirulina Extract', 'Pineapple', 'Chia Seeds', 'Lime'],
    nutrition: { calories: 160, protein: '4g', carbs: '36g', fats: '1g' },
    price: 220,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    xpReward: 20,
    available: true,
    featured: true,
    tags: ['DRINKS', 'VEGETARIAN']
  },
  {
    id: 'cf-12',
    name: 'DARK TRUFFLE LAVA CAKE',
    category: 'DESSERTS',
    description: '72% single-estate Ecuadorian dark chocolate lava cake with warm molten center and Madagascar vanilla gelato.',
    ingredients: ['Ecuadorian Dark Chocolate', 'Grass-Fed Butter', 'Organic Eggs', 'Madagascar Vanilla Bean', 'Sea Salt'],
    nutrition: { calories: 420, protein: '8g', carbs: '46g', fats: '24g' },
    price: 220,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    xpReward: 20,
    available: true,
    featured: true,
    tags: ['POPULAR', 'VEGETARIAN']
  },
  {
    id: 'cf-13',
    name: 'AÇAI POWER BOWL',
    category: 'DESSERTS',
    description: 'Organic Amazonian açai purée topped with wild blueberries, roasted coconut chips, chia seeds, and raw honey.',
    ingredients: ['Organic Açai', 'Wild Blueberries', 'Toasted Coconut Flakes', 'Chia Seeds', 'Forest Honey'],
    nutrition: { calories: 290, protein: '6g', carbs: '44g', fats: '9g' },
    price: 240,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    xpReward: 20,
    available: true,
    featured: false,
    tags: ['VEGETARIAN', 'NEW']
  }
];

export const H8X_COMBOS_DATA = [
  {
    id: 'combo-1',
    code: 'PLAY + FUEL',
    title: 'TURF CHAMPION REFUEL',
    activityId: '06',
    activityName: 'SYNTHETIC TURF',
    activityPrice: 1200,
    foodItems: [
      { name: 'H8X CLASSIC BURGER', qty: 2, price: 280 },
      { name: 'FRESH COLD-PRESSED JUICE', qty: 2, price: 120 }
    ],
    originalTotal: 2000,
    comboPrice: 1650,
    savings: 350,
    xpBonus: 80,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    badge: 'BESTSELLER',
    accent: '#00ff88'
  },
  {
    id: 'combo-2',
    code: 'RECOVER + REFUEL',
    title: 'SPA & VITALITY RECHARGE',
    activityId: '02',
    activityName: 'SPA & WELLNESS',
    activityPrice: 900,
    foodItems: [
      { name: 'FRESH COLD-PRESSED JUICE', qty: 1, price: 120 },
      { name: 'AÇAI POWER BOWL', qty: 1, price: 240 },
      { name: 'GRILLED CHICKEN POWER BOWL', qty: 1, price: 380 }
    ],
    originalTotal: 1640,
    comboPrice: 1200,
    savings: 440,
    xpBonus: 70,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    badge: 'WELLNESS',
    accent: '#e5b96a'
  },
  {
    id: 'combo-3',
    code: 'NIGHT PLAY',
    title: 'VR MATRIX FUEL COMBO',
    activityId: '04',
    activityName: 'VIRTUAL GAMES ARENA',
    activityPrice: 650,
    foodItems: [
      { name: 'LOADED TACTICAL FRIES', qty: 1, price: 180 },
      { name: 'CHOCOLATE WHEY SHAKE', qty: 1, price: 180 },
      { name: 'H8X NITRO COLD BREW', qty: 1, price: 160 }
    ],
    originalTotal: 1170,
    comboPrice: 950,
    savings: 220,
    xpBonus: 60,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    badge: 'ESPORTS',
    accent: '#a855f7'
  }
];

export default function CafeScene({
  userProfile,
  setUserProfile,
  progressionData,
  setProgressionData,
  cartItems = [],
  setCartItems,
  onOpenBookingWithCombo,
  cafeOrders = [],
  setCafeOrders,
  WORLDS_DATA = [],
  playerWallet,
  setPlayerWallet,
  paymentTransactions,
  setPaymentTransactions,
  notifications = [],
  setNotifications
}) {
  // Navigation & Category states
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCafeReceipt, setSelectedCafeReceipt] = useState(null);

  // Combined Activity Booking in Café Checkout
  const [includeActivityBooking, setIncludeActivityBooking] = useState(false);
  const [selectedComboActivity, setSelectedComboActivity] = useState(WORLDS_DATA[5] || WORLDS_DATA[0]); // Default Turf
  const [activityTimeSlot, setActivityTimeSlot] = useState('07:30 PM');
  const [activityPlayerCount, setActivityPlayerCount] = useState(4);

  // Order Flow & Tracking States
  const [activeOrderTracking, setActiveOrderTracking] = useState(null); // When an order is placed
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [earnedXpToast, setEarnedXpToast] = useState(null);

  // GSAP Ref for character glitch & floating cart
  const charImageRef = useRef(null);
  const [isGlitchingChar, setIsGlitchingChar] = useState(false);
  const cartBounceRef = useRef(null);

  const categories = ['ALL', 'MEALS', 'SNACKS', 'BEVERAGES', 'DESSERTS'];
  const filterOptions = ['ALL', 'POPULAR', 'NEW', 'VEGETARIAN', 'HIGH PROTEIN', 'QUICK BITES', 'DRINKS'];

  // Trigger subtle GSAP entrance on mount
  useEffect(() => {
    gsap.fromTo(
      '.cafe-item-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
    );
  }, [selectedCategory, activeFilter, searchQuery]);

  // Character Glitch on Hover or Interaction
  const triggerCharGlitch = () => {
    setIsGlitchingChar(true);
    setTimeout(() => setIsGlitchingChar(false), 500);
  };

  // Filtered Food Menu
  const filteredMenu = INITIAL_CAFE_MENU.filter(item => {
    const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchFilter = activeFilter === 'ALL' || item.tags.includes(activeFilter);
    const matchSearch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchFilter && matchSearch;
  });

  // Cart Calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const activityCost = includeActivityBooking ? 1200 : 0;
  const grandTotal = cartSubtotal + activityCost;
  const totalEarnedXp = cartItems.reduce((acc, item) => acc + ((item.xpReward || 15) * item.quantity), 0) + (includeActivityBooking ? 100 : 0);

  // Add Item to Cart with micro-animation
  const handleAddToCart = (item, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...item, quantity: qty }];
    });

    // Bounce cart drawer indicator
    if (cartBounceRef.current) {
      gsap.fromTo(cartBounceRef.current, { scale: 1.25 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }
  };

  // Update Item Quantity in Cart
  const handleUpdateCartQty = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Add a Pre-Built Combo to Order
  const handleAddCombo = (combo) => {
    // Add combo food items to cart
    combo.foodItems.forEach(food => {
      const found = INITIAL_CAFE_MENU.find(m => m.name.toLowerCase() === food.name.toLowerCase()) || {
        id: `custom-${food.name}`,
        name: food.name,
        price: food.price,
        image: combo.image,
        xpReward: 20
      };
      handleAddToCart(found, food.qty);
    });

    // Auto-select corresponding activity and open checkout
    const matchedWorld = WORLDS_DATA.find(w => w.id === combo.activityId) || WORLDS_DATA[5];
    setSelectedComboActivity(matchedWorld);
    setIncludeActivityBooking(true);
    setIsCartOpen(true);
  };

  // Place Order & Checkout Flow
  const handleConfirmOrder = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const newOrderId = `HXFO-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder = {
        id: newOrderId,
        userId: userProfile?.id || 'HX-000184',
        player: userProfile?.name || 'SRI SARAN',
        playerId: userProfile?.id || 'HX-000184',
        activityBookingId: includeActivityBooking ? `HXBK-${Math.floor(1000 + Math.random() * 9000)}` : null,
        activityTitle: includeActivityBooking ? selectedComboActivity?.title : null,
        items: cartItems.map(i => `${i.name} × ${i.quantity}`).join(' + '),
        cartItemsDetailed: [...cartItems],
        subtotal: cartSubtotal,
        activityCost: activityCost,
        total: `₹${grandTotal.toLocaleString()}`,
        totalNum: grandTotal,
        xpEarned: totalEarnedXp,
        status: 'RECEIVED',
        paymentStatus: 'PAID',
        paymentMethod: paymentMethod,
        time: 'Just now',
        createdAt: new Date().toISOString()
      };

      // 1. Sync with Admin Café Orders
      if (setCafeOrders) {
        setCafeOrders(prev => [newOrder, ...prev]);
      }

      // 2. Sync with User Profile & XP Progression
      if (setProgressionData) {
        setProgressionData(prev => {
          const currentXp = (prev?.user?.xp || 2850) + totalEarnedXp;
          const nextLevelXp = prev?.user?.nextLevelXp || 5000;
          return {
            ...prev,
            user: {
              ...prev.user,
              xp: currentXp,
              totalVisits: (prev.user?.totalVisits || 68) + 1
            },
            history: [
              {
                id: `h-${Date.now()}`,
                activity: includeActivityBooking ? `${selectedComboActivity?.title} + CAFÉ` : 'H8X CAFETERIA',
                xp: totalEarnedXp,
                date: 'Just Now',
                visits: 20,
                ref: newOrderId,
                accent: '#ff9900'
              },
              ...(prev.history || [])
            ]
          };
        });
      }

      if (setUserProfile) {
        setUserProfile(prev => ({
          ...prev,
          points: (prev?.points || 2850) + totalEarnedXp,
          bookings: [
            {
              id: newOrderId,
              activity: includeActivityBooking ? `${selectedComboActivity?.title} + CAFÉ FUEL` : 'CAFÉ FUEL ORDER',
              date: new Date().toISOString().split('T')[0],
              time: includeActivityBooking ? activityTimeSlot : 'Immediate Prep',
              players: includeActivityBooking ? activityPlayerCount : 1,
              total: `₹${grandTotal.toLocaleString()}`,
              status: 'CONFIRMED'
            },
            ...(prev?.bookings || [])
          ]
        }));
      }

      // Part 11: Payments Ledger & Dual Rewards Sync
      const rewardPointsToEarn = Math.round(grandTotal * 0.1);
      const newPaymentTxn = {
        id: `HXPAY-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: userProfile?.id || 'HX-000184',
        userName: userProfile?.name || 'SRI SARAN',
        bookingId: includeActivityBooking ? `HXBK-${Math.floor(10000 + Math.random() * 90000)}` : null,
        cafeOrderId: newOrderId,
        description: includeActivityBooking ? `${selectedComboActivity?.title} + Café Fuel Package` : `H8X Cafeteria (${cartItems.length} items)`,
        subtotal: cartSubtotal + (includeActivityBooking ? (selectedComboActivity?.priceVal || 0) : 0),
        discount: appliedDiscount,
        amount: grandTotal,
        amountFormatted: `₹${grandTotal.toLocaleString()}`,
        method: paymentMethod,
        status: 'PAID',
        refundAmount: 0,
        refundStatus: 'NONE',
        xpEarned: totalEarnedXp,
        rewardPointsEarned: rewardPointsToEarn,
        date: 'Today',
        createdAt: new Date().toISOString()
      };
      newOrder.paymentTxn = newPaymentTxn;

      if (setPaymentTransactions) {
        setPaymentTransactions(prev => [newPaymentTxn, ...prev]);
      }

      if (setPlayerWallet) {
        setPlayerWallet(prev => ({
          ...prev,
          availableBalance: paymentMethod === 'H8X WALLET' ? Math.max(0, prev.availableBalance - grandTotal) : prev.availableBalance,
          rewardPoints: prev.rewardPoints + rewardPointsToEarn,
          totalSpent: prev.totalSpent + grandTotal
        }));
      }

      // 3. Trigger Active Order Tracking
      setActiveOrderTracking(newOrder);

      // 4. Trigger XP Notification
      setEarnedXpToast(totalEarnedXp);
      setTimeout(() => setEarnedXpToast(null), 4500);

      // 5. Dispatch Real-time Notification for Order Placement
      if (setNotifications) {
        setNotifications(prev => [
          {
            id: `notif-cafe-${Date.now()}`,
            type: 'CAFE',
            title: `CAFÉ ORDER RECEIVED: ${newOrderId}`,
            desc: `${cartItems.length} fuel item(s) routed to kitchen. Total: ₹${grandTotal.toLocaleString()}`,
            time: 'Just Now',
            timestamp: new Date().toISOString(),
            read: false,
            link: 'cafeteria',
            badgeColor: '#ff9900'
          },
          ...prev
        ]);
      }

      // Clear cart and close checkout
      setCartItems([]);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);

      // Live 4-Stage Simulation from RECEIVED -> PREPARING -> READY
      setTimeout(() => {
        setActiveOrderTracking(prev => prev && prev.id === newOrderId ? { ...prev, status: 'PREPARING' } : prev);
      }, 5000);

      setTimeout(() => {
        setActiveOrderTracking(prev => prev && prev.id === newOrderId ? { ...prev, status: 'READY' } : prev);
        if (setNotifications) {
          setNotifications(prev => [
            {
              id: `notif-ready-${Date.now()}`,
              type: 'CAFE',
              title: `ORDER READY FOR PICKUP: ${newOrderId}`,
              desc: 'Your tactical nutrition fuel package is freshly prepared at Counter 2.',
              time: 'Just Now',
              timestamp: new Date().toISOString(),
              read: false,
              link: 'cafeteria',
              badgeColor: '#00ff88'
            },
            ...prev
          ]);
        }
      }, 12000);
    }, 1200);
  };

  // Personalized Recommendation based on user favorite activity
  const favActivity = userProfile?.favouriteActivity || 'TURF';
  const isTurfUser = favActivity === 'TURF';

  return (
    <div className="relative font-['Orbitron'] text-white overflow-hidden selection:bg-[#ff9900] selection:text-black">
      
      {/* ==========================================================================
         1. CAFÉ HERO (Cinematic AAA Dark Environment & Standalone Maya Character)
         ========================================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-14 py-20 overflow-hidden">
        {/* Cinematic Dark Environment Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/bg/cafitaria.png" 
            alt="H8X Cafeteria Environment" 
            className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.15] scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-[#07090e]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,153,0,0.15),transparent_60%)]" />
        </div>

        {/* Foreground Depth Particles & Vignette */}
        <div className="vignette absolute inset-0 z-10 pointer-events-none" />
        <div className="scanlines absolute inset-0 z-10 opacity-30 pointer-events-none" />

        <div className="relative z-20 max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: HERO TYPOGRAPHY & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* HUD Meta & Status */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#ff9900]/10 border border-[#ff9900]/40 text-[#ff9900] text-xs font-mono tracking-[0.3em] rounded-full">
                03 / 07
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff9900] animate-ping" />
                <span className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                  SOCIAL REFUEL ARENA // ACTIVE
                </span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight uppercase text-white drop-shadow-[0_0_35px_rgba(255,153,0,0.4)]">
                CAFETERIA
              </h1>
              <div className="text-2xl sm:text-3xl font-black text-[#ff9900] tracking-wider uppercase mt-2 font-['Rajdhani']">
                FUEL YOUR NEXT MOVE.
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-gray-300 font-['Inter'] leading-relaxed max-w-xl">
              "From quick energy to post-match meals, refuel inside the H8X world." High-protein culinary creations, artisanal cyber-espresso, and performance hydration crafted for athletes.
            </p>

            {/* Hero Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-md pt-2">
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md">
                <span className="text-[10px] text-gray-400 font-mono block">PROTEIN BARS</span>
                <span className="text-base font-bold text-white">45g+ / Bowl</span>
              </div>
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md">
                <span className="text-[10px] text-gray-400 font-mono block">BARISTA BOT</span>
                <span className="text-base font-bold text-[#ff9900]">MAYA MK-III</span>
              </div>
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md">
                <span className="text-[10px] text-gray-400 font-mono block">XP PER ORDER</span>
                <span className="text-base font-bold text-[#00ff88]">+20 – 80 XP</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#cafe-menu"
                className="cyber-btn bg-[#ff9900] text-black border-[#ff9900] hover:bg-[#ff9900]/90 px-8 py-4 text-xs font-black tracking-widest flex items-center gap-3 shadow-[0_0_25px_rgba(255,153,0,0.5)]"
              >
                <span>EXPLORE MENU</span>
                <ChevronRight size={16} />
              </a>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-4 rounded-xl border border-white/20 bg-black/60 hover:border-[#ff9900] text-white hover:text-[#ff9900] text-xs font-bold transition-all flex items-center gap-3 backdrop-blur-md"
              >
                <ShoppingBag size={16} className="text-[#ff9900]" />
                <span>VIEW ORDER ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
              </button>
            </div>

          </div>

          {/* RIGHT: STANDALONE FOREGROUND CHARACTER LAYER (MAYA ch3.png) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Glow Behind Character */}
            <div className="absolute w-72 h-72 rounded-full bg-[#ff9900]/25 blur-[90px] pointer-events-none" />

            {/* Maya Character Asset — Standalone foreground layer extending out */}
            <div 
              className="relative z-20 cursor-pointer group"
              onMouseEnter={triggerCharGlitch}
            >
              <img 
                ref={charImageRef}
                src="/img/ch3.png" 
                alt="Barista Bot Maya" 
                className={`h-[420px] sm:h-[520px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105 ${
                  isGlitchingChar ? 'char-glitch' : 'animate-character-idle'
                }`}
              />

              {/* Character Floating HUD Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/90 border border-[#ff9900]/50 backdrop-blur-xl px-5 py-2 rounded-2xl flex items-center gap-3 shadow-2xl whitespace-nowrap">
                <div className="w-3 h-3 rounded-full bg-[#ff9900] animate-pulse" />
                <div className="text-left">
                  <div className="text-[11px] font-black text-white">MAYA // BARISTA BOT</div>
                  <div className="text-[9px] font-mono text-[#ff9900]">CULINARY MIXOLOGIST</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
         8. PERSONALIZED RECOMMENDATIONS (Uses User Activity Profile)
         ========================================================================== */}
      <section className="px-6 md:px-14 max-w-7xl mx-auto -mt-6 mb-12 relative z-30">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#ff9900]/30 bg-gradient-to-r from-black/80 via-[#181109] to-black/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#ff9900]/10 border border-[#ff9900]/40 flex items-center justify-center text-[#ff9900] flex-shrink-0 shadow-[0_0_20px_rgba(255,153,0,0.2)]">
              <Sparkles size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#ff9900] tracking-widest uppercase">
                  PERSONALIZED ATHLETE FUEL
                </span>
                <span className="text-[10px] text-gray-400 font-mono">• BASED ON YOUR {favActivity} SESSIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {isTurfUser ? 'YOUR USUAL POST-MATCH COMBO' : 'LIGHT REFUEL & HYDRATION MATRIX'}
              </h3>
              <p className="text-xs text-gray-300 font-['Inter'] mt-1">
                {isTurfUser 
                  ? 'High-protein smash burger + cold-pressed citrus juice tailored for muscle glycogen recovery.'
                  : 'Electrolyte fresh juice + açai berry power parfait for lean aquatic & thermal recovery.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center">
            <div className="text-right">
              <div className="text-xs text-gray-400 font-mono line-through">₹400</div>
              <div className="text-2xl font-black text-[#ff9900]">₹380</div>
            </div>
            <button 
              onClick={() => {
                const burger = INITIAL_CAFE_MENU[0];
                const juice = INITIAL_CAFE_MENU[7];
                handleAddToCart(burger, 1);
                handleAddToCart(juice, 1);
                setIsCartOpen(true);
              }}
              className="cyber-btn bg-[#ff9900] text-black border-[#ff9900] hover:bg-[#ff9900]/90 px-6 py-3 text-xs font-black tracking-wider flex items-center gap-2"
            >
              <Plus size={15} />
              <span>ADD COMBO</span>
            </button>
          </div>

        </div>
      </section>

      {/* ==========================================================================
         9. DEDICATED H8X COMBOS (PLAY + FUEL, RECOVER + REFUEL, NIGHT PLAY)
         ========================================================================== */}
      <section className="px-6 md:px-14 max-w-7xl mx-auto py-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] text-[#00ff88] font-mono tracking-[0.3em] font-extrabold uppercase">
              SYNCED EXPERIENCE PACKS
            </span>
            <h2 className="text-3xl font-black text-white mt-1">H8X COMBOS</h2>
          </div>
          <p className="text-xs text-gray-400 font-['Rajdhani'] font-semibold">
            Book your arena activity and player fuel together with instant savings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {H8X_COMBOS_DATA.map(combo => (
            <div 
              key={combo.id}
              className="glass-panel rounded-3xl border border-white/10 hover:border-[#ff9900]/50 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl relative overflow-hidden"
            >
              {/* Card Header & Badge */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-white font-bold">
                    {combo.code}
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md text-black" style={{ backgroundColor: combo.accent }}>
                    {combo.badge}
                  </span>
                </div>

                <div className="h-36 rounded-2xl overflow-hidden relative border border-white/10">
                  <img src={combo.image} alt={combo.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 text-left">
                    <span className="text-[9px] font-mono text-gray-300 block">ARENA ZONE</span>
                    <span className="text-xs font-black text-white">{combo.activityName}</span>
                  </div>
                </div>

                <div className="text-left">
                  <h3 className="text-lg font-black text-white group-hover:text-[#ff9900] transition-colors">
                    {combo.title}
                  </h3>
                  <div className="space-y-1 mt-3 font-['Inter'] text-xs text-gray-300">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">INCLUDES:</div>
                    <div className="flex items-center gap-2 text-white">
                      <Check size={12} className="text-[#00ff88]" />
                      <span>{combo.activityName} Booking Slot</span>
                    </div>
                    {combo.foodItems.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check size={12} className="text-[#ff9900]" />
                        <span>{f.qty}× {f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Price & Add */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-xs text-gray-400 line-through">₹{combo.originalTotal}</div>
                  <div className="text-2xl font-black text-[#ff9900]">₹{combo.comboPrice}</div>
                  <span className="text-[10px] text-[#00ff88] font-bold">+{combo.xpBonus} XP BONUS</span>
                </div>

                <button 
                  onClick={() => handleAddCombo(combo)}
                  className="cyber-btn px-5 py-2.5 text-xs font-black tracking-wider flex items-center gap-1.5"
                >
                  <span>BOOK COMBO</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
         2. MENU CATEGORIES & 16. SEARCH & 17. FILTERS
         ========================================================================== */}
      <section id="cafe-menu" className="px-6 md:px-14 max-w-7xl mx-auto pt-14 pb-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
          <div className="text-left">
            <span className="text-xs text-[#ff9900] font-mono tracking-[0.3em] font-extrabold uppercase">
              ARTISANAL PLAYER FUEL
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-1">
              FOOD MENU
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search food, ingredients, burgers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/15 focus:border-[#ff9900] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* 2. Horizontal Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-6 py-3 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#ff9900] text-black shadow-[0_0_20px_rgba(255,153,0,0.5)] scale-105' 
                    : 'bg-black/50 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                <span>{cat}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                )}
              </button>
            );
          })}
        </div>

        {/* 17. Compact Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] text-gray-500 font-mono uppercase flex items-center gap-1 mr-2 flex-shrink-0">
            <Filter size={12} /> FILTERS:
          </span>
          {filterOptions.map(flt => (
            <button
              key={flt}
              onClick={() => setActiveFilter(flt)}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all whitespace-nowrap ${
                activeFilter === flt 
                  ? 'bg-white/20 text-white font-bold border border-white/40 shadow-sm' 
                  : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'
              }`}
            >
              {flt}
            </button>
          ))}
        </div>

      </section>

      {/* ==========================================================================
         3. FOOD MENU GRID & 4. FOOD ITEM INTERACTION
         ========================================================================== */}
      <section className="px-6 md:px-14 max-w-7xl mx-auto pb-24">
        {filteredMenu.length === 0 ? (
          <div className="p-16 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
            <Coffee size={40} className="mx-auto text-gray-500" />
            <h3 className="text-xl font-bold text-white">NO REFUEL ITEMS FOUND</h3>
            <p className="text-xs text-gray-400 font-['Inter']">Try clearing your search query or selecting another category.</p>
            <button 
              onClick={() => { setSelectedCategory('ALL'); setActiveFilter('ALL'); setSearchQuery(''); }}
              className="cyber-btn text-xs px-6 py-2.5"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenu.map(item => {
              const inCartItem = cartItems.find(i => i.id === item.id);

              return (
                <div
                  key={item.id}
                  className="cafe-item-card glass-panel rounded-3xl border border-white/10 hover:border-[#ff9900]/60 p-5 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-2 group shadow-xl relative cursor-pointer"
                  onClick={() => {
                    setSelectedItemDetail(item);
                    setDetailQuantity(1);
                  }}
                >
                  {/* Top Badges & Food Image */}
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Category Tag */}
                      <span className="absolute top-2.5 left-2.5 text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/80 text-[#ff9900] border border-[#ff9900]/40">
                        {item.category}
                      </span>

                      {/* XP Reward Badge */}
                      <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 flex items-center gap-1">
                        <Zap size={10} /> +{item.xpReward} XP
                      </span>

                      {/* Quick Macro Pills */}
                      <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-[9px] font-mono text-gray-300">
                        <span className="bg-black/80 px-2 py-0.5 rounded text-white font-bold">{item.nutrition.protein} PRO</span>
                        <span className="bg-black/80 px-2 py-0.5 rounded text-gray-300">{item.nutrition.calories} KCAL</span>
                      </div>
                    </div>

                    {/* Food Info */}
                    <div className="text-left space-y-1">
                      <h4 className="text-base font-black text-white group-hover:text-[#ff9900] transition-colors leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-['Inter'] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Price & Add Button */}
                  <div 
                    className="pt-3 border-t border-white/10 flex items-center justify-between"
                    onClick={(e) => e.stopPropagation()} // Prevent opening details when clicking cart buttons
                  >
                    <div>
                      <span className="text-[9px] font-mono text-gray-400 block">PRICE</span>
                      <span className="text-xl font-black text-[#e5b96a] group-hover:text-[#ff9900] transition-colors">
                        ₹{item.price}
                      </span>
                    </div>

                    {inCartItem ? (
                      <div className="flex items-center gap-2 bg-black/80 border border-[#ff9900]/50 px-2.5 py-1 rounded-xl">
                        <button 
                          onClick={() => handleUpdateCartQty(item.id, -1)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-black text-[#ff9900] px-1">{inCartItem.quantity}</span>
                        <button 
                          onClick={() => handleUpdateCartQty(item.id, 1)}
                          className="text-[#ff9900] hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAddToCart(item, 1)}
                        className="cyber-btn px-4 py-2 text-[11px] font-bold tracking-wider flex items-center gap-1 group-hover:bg-[#ff9900] group-hover:text-black group-hover:border-[#ff9900]"
                      >
                        <Plus size={13} />
                        <span>ADD</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ==========================================================================
         4. ITEM DETAILS MODAL (Nutrition, Ingredients, Quantity Selector)
         ========================================================================== */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0a0e17] border border-[#ff9900]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,153,0,0.3)] space-y-6 max-h-[90vh] overflow-y-auto font-['Orbitron']">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItemDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X size={18} />
            </button>

            {/* Large Image Header */}
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10">
              <img src={selectedItemDetail.image} alt={selectedItemDetail.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-black/80 text-[#ff9900] border border-[#ff9900]/40">
                  {selectedItemDetail.category}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40">
                  +{selectedItemDetail.xpReward} XP PER ITEM
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-left space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedItemDetail.name}</h3>
              <p className="text-xs sm:text-sm text-gray-300 font-['Inter'] leading-relaxed">
                {selectedItemDetail.description}
              </p>
            </div>

            {/* Nutrition Breakdown Grid */}
            <div className="text-left space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">ATHLETE MACROS</span>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-gray-400 block">CALORIES</span>
                  <span className="text-sm font-bold text-white">{selectedItemDetail.nutrition.calories} kcal</span>
                </div>
                <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-[#00ff88] block">PROTEIN</span>
                  <span className="text-sm font-bold text-[#00ff88]">{selectedItemDetail.nutrition.protein}</span>
                </div>
                <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-gray-400 block">CARBS</span>
                  <span className="text-sm font-bold text-white">{selectedItemDetail.nutrition.carbs}</span>
                </div>
                <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-gray-400 block">FATS</span>
                  <span className="text-sm font-bold text-white">{selectedItemDetail.nutrition.fats}</span>
                </div>
              </div>
            </div>

            {/* Ingredients Tags */}
            <div className="text-left space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">INGREDIENTS MATRIX</span>
              <div className="flex flex-wrap gap-2">
                {selectedItemDetail.ingredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1 bg-black/60 border border-white/10 rounded-full text-xs font-mono text-gray-300">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Price, Quantity Selector and Add CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] font-mono text-gray-400">TOTAL PRICE</span>
                <div className="text-3xl font-black text-[#ff9900]">
                  ₹{selectedItemDetail.price * detailQuantity}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* − 1 + Quantity */}
                <div className="flex items-center gap-3 bg-black/80 border border-white/20 px-3 py-2 rounded-2xl">
                  <button 
                    onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                    className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 text-white font-bold"
                  >
                    −
                  </button>
                  <span className="text-sm font-black text-white px-2">{detailQuantity}</span>
                  <button 
                    onClick={() => setDetailQuantity(detailQuantity + 1)}
                    className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => {
                    handleAddToCart(selectedItemDetail, detailQuantity);
                    setSelectedItemDetail(null);
                  }}
                  className="cyber-btn bg-[#ff9900] text-black border-[#ff9900] px-7 py-3 text-xs font-black tracking-widest flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO ORDER</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================================================
         5. FLOATING CART DRAWER & 21. MOBILE STICKY BAR
         ========================================================================== */}
      {/* Floating Cart Trigger Pill */}
      {cartItems.length > 0 && !isCartOpen && !isCheckoutOpen && (
        <div 
          ref={cartBounceRef}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#ff9900] text-black px-6 py-3.5 rounded-full font-black text-xs tracking-wider shadow-[0_0_30px_rgba(255,153,0,0.6)] cursor-pointer flex items-center gap-3 hover:scale-105 transition-all"
        >
          <ShoppingBag size={18} />
          <span>ORDER ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
          <span className="bg-black text-[#ff9900] px-2.5 py-1 rounded-full text-[11px]">
            ₹{cartSubtotal}
          </span>
        </div>
      )}

      {/* Slide-in Order Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#080c14] border-l border-[#ff9900]/30 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto font-['Orbitron']">
            
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff9900]/20 border border-[#ff9900]/40 flex items-center justify-center text-[#ff9900]">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-black text-white tracking-wider">YOUR ORDER</h3>
                    <span className="text-[10px] font-mono text-gray-400">CAFÉ FUEL TICKET</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <ShoppingBag size={48} className="mx-auto text-gray-600" />
                  <p className="text-xs text-gray-400">Your order tray is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center justify-between gap-3 text-left">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                        <div className="text-[11px] font-mono text-[#e5b96a]">
                          ₹{item.price} <span className="text-gray-400 font-normal">× {item.quantity}</span>
                        </div>
                      </div>

                      {/* Minus / Plus */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleUpdateCartQty(item.id, -1)}
                          className="w-6 h-6 rounded bg-white/5 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold text-white">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateCartQty(item.id, 1)}
                          className="w-6 h-6 rounded bg-white/5 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-xs font-black text-white text-right w-14">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. CAFÉ + ACTIVITY COMBO INTEGRATION CHECKBOX */}
              <div className="p-4 bg-gradient-to-r from-black/80 to-[#121927] border border-[#00f0ff]/30 rounded-2xl text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[#00f0ff]" />
                    <span className="text-xs font-black text-white">COMBINE H8X EXPERIENCE?</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={includeActivityBooking}
                    onChange={(e) => setIncludeActivityBooking(e.target.checked)}
                    className="w-5 h-5 accent-[#00f0ff] cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-gray-300 font-['Inter']">
                  Add an arena booking to this order for a single synchronized checkout transaction.
                </p>

                {includeActivityBooking && (
                  <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs">
                    <label className="text-[10px] text-gray-400">SELECT ACTIVITY:</label>
                    <select 
                      value={selectedComboActivity?.id} 
                      onChange={(e) => {
                        const act = WORLDS_DATA.find(w => w.id === e.target.value);
                        setSelectedComboActivity(act);
                      }}
                      className="w-full bg-black border border-white/20 rounded p-2 text-xs text-white outline-none"
                    >
                      {WORLDS_DATA.map(w => (
                        <option key={w.id} value={w.id}>{w.id} — {w.title} ({w.price})</option>
                      ))}
                    </select>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[9px] text-gray-400">SLOT:</span>
                        <div className="text-white font-bold text-xs">{activityTimeSlot}</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400">SLOT COST:</span>
                        <div className="text-[#00f0ff] font-bold text-xs">₹1,200</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Totals & Checkout Button */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="space-y-1.5 font-mono text-xs text-left">
                <div className="flex justify-between text-gray-400">
                  <span>CAFÉ SUB-TOTAL:</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {includeActivityBooking && (
                  <div className="flex justify-between text-[#00f0ff]">
                    <span>H8X EXPERIENCE ({selectedComboActivity?.code}):</span>
                    <span>₹1,200</span>
                  </div>
                )}
                <div className="flex justify-between text-[#00ff88]">
                  <span>ESTIMATED XP:</span>
                  <span>+{totalEarnedXp} XP</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>TOTAL PAYABLE:</span>
                  <span className="text-[#ff9900]">₹{grandTotal}</span>
                </div>
              </div>

              <button 
                disabled={cartItems.length === 0}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className={`w-full py-4 rounded-xl font-black text-xs tracking-widest uppercase transition-all shadow-xl ${
                  cartItems.length > 0 
                    ? 'bg-[#ff9900] text-black hover:bg-[#ff9900]/90 shadow-[0_0_25px_rgba(255,153,0,0.5)]' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================================================
         6. UNIFIED CHECKOUT MODAL (Experience + Café Single Payment)
         ========================================================================== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#080c14] border border-[#ff9900]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto font-['Orbitron']">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="text-left">
                <span className="text-[10px] text-[#ff9900] font-mono tracking-widest">STEP 02 // CONFIRMATION</span>
                <h3 className="text-2xl font-black text-white">UNIFIED CHECKOUT</h3>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Single Combined Summary Breakdown */}
            <div className="bg-black/60 border border-white/10 rounded-2xl p-5 space-y-3 text-left">
              <span className="text-[10px] font-mono text-gray-400 uppercase">ORDER SPECIFICATION</span>
              
              {includeActivityBooking && (
                <div className="p-3 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">H8X EXPERIENCE — {selectedComboActivity?.title}</div>
                    <div className="text-[10px] text-gray-400 font-mono">Slot: {activityTimeSlot} • 4 Players</div>
                  </div>
                  <div className="text-sm font-black text-[#00f0ff]">₹1,200</div>
                </div>
              )}

              <div className="p-3 bg-[#ff9900]/10 border border-[#ff9900]/30 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-white">CAFÉ FOOD & DRINKS ({cartItems.length} items)</div>
                  <div className="text-[10px] text-gray-400 font-mono truncate max-w-xs">
                    {cartItems.map(i => `${i.name} (${i.quantity})`).join(', ')}
                  </div>
                </div>
                <div className="text-sm font-black text-[#ff9900]">₹{cartSubtotal}</div>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center font-mono">
                <span className="text-xs text-gray-300">TOTAL COMBINED AMOUNT:</span>
                <span className="text-2xl font-black text-[#e5b96a]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="text-left space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase">SELECT PAYMENT MODE</span>
              <div className="grid grid-cols-3 gap-3">
                {['UPI', 'H8X WALLET', 'CARD'].map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-xl border text-xs font-black transition-all ${
                      paymentMethod === method 
                        ? 'border-[#ff9900] bg-[#ff9900]/20 text-[#ff9900]' 
                        : 'border-white/10 bg-black/50 text-gray-400'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Processing CTA */}
            <button
              disabled={isProcessingPayment}
              onClick={handleConfirmOrder}
              className="cyber-btn w-full py-4 text-xs font-black tracking-widest bg-[#ff9900] text-black border-[#ff9900] hover:bg-[#ff9900]/90 shadow-[0_0_25px_rgba(255,153,0,0.5)] flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>AUTHORIZING TRANSACTION...</span>
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  <span>PAY ₹{grandTotal} & CONFIRM</span>
                </>
              )}
            </button>

          </div>
        </div>
      )}

      {/* ==========================================================================
         10. ORDER CONFIRMED & 11. CINEMATIC 4-STAGE ORDER TRACKING
         ========================================================================== */}
      {activeOrderTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#0a0e17] border border-[#00ff88]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,136,0.3)] space-y-6 text-left font-['Orbitron']">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-[#00ff88] text-xs font-bold font-mono">
                  <CheckCircle2 size={16} />
                  <span>ORDER CONFIRMED & ACTIVE</span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1">ORDER ID: {activeOrderTracking.id}</h3>
                <span className="text-[10px] text-gray-400 font-mono">PAYMENT: {activeOrderTracking.paymentStatus} via {activeOrderTracking.paymentMethod}</span>
              </div>

              <button 
                onClick={() => setActiveOrderTracking(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* 11. Cinematic 4-Stage Status Indicator (Not a delivery clone) */}
            <div className="p-6 bg-black/60 border border-white/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-400">PREPARATION HUD</span>
                <span className="text-[#00ff88] animate-pulse">● LIVE STATUS: {activeOrderTracking.status}</span>
              </div>

              {/* Progress Line */}
              <div className="relative flex items-center justify-between">
                {/* Connecting Bar */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 z-0">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00ff88] to-[#ff9900] transition-all duration-700" 
                    style={{
                      width: activeOrderTracking.status === 'RECEIVED' ? '15%' :
                             activeOrderTracking.status === 'PREPARING' ? '50%' :
                             activeOrderTracking.status === 'READY' ? '85%' : '100%'
                    }}
                  />
                </div>

                {['RECEIVED', 'PREPARING', 'READY', 'COMPLETED'].map((st, i) => {
                  const stages = ['RECEIVED', 'PREPARING', 'READY', 'COMPLETED'];
                  const currentIndex = stages.indexOf(activeOrderTracking.status);
                  const isDone = currentIndex >= i;
                  const isCurrent = activeOrderTracking.status === st;

                  return (
                    <div key={st} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isCurrent 
                          ? 'bg-[#ff9900] text-black shadow-[0_0_15px_#ff9900] scale-110 ring-4 ring-[#ff9900]/30' 
                          : isDone 
                            ? 'bg-[#00ff88] text-black shadow-[0_0_10px_#00ff88]' 
                            : 'bg-black border border-white/20 text-gray-500'
                      }`}>
                        {i + 1}
                      </div>
                      <span className={`text-[9px] font-mono tracking-wider ${isCurrent ? 'text-[#ff9900] font-bold' : isDone ? 'text-[#00ff88]' : 'text-gray-500'}`}>
                        {st}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-center text-xs text-gray-300 font-['Inter']">
                {activeOrderTracking.status === 'RECEIVED' && 'Order token verified. Dispatched to Chef & Barista Bot Maya.'}
                {activeOrderTracking.status === 'PREPARING' && 'Maya is formulating your order with artisanal ingredients.'}
                {activeOrderTracking.status === 'READY' && 'Your refuel tray is ready for collection at the Cafeteria counter!'}
                {activeOrderTracking.status === 'COMPLETED' && 'Order delivered. Fuel your body & conquer the arena!'}
              </div>
            </div>

            {/* Order Items & Total */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2 text-xs font-mono">
              <div className="flex justify-between text-gray-300">
                <span>ITEMS:</span>
                <span className="text-white font-bold text-right">{activeOrderTracking.items}</span>
              </div>
              <div className="flex justify-between text-[#00ff88]">
                <span>XP AWARDED:</span>
                <span className="font-bold">+{activeOrderTracking.xpEarned} XP</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                <span>TOTAL PAID:</span>
                <span className="text-[#ff9900]">{activeOrderTracking.total}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button 
                onClick={() => setSelectedCafeReceipt(activeOrderTracking.paymentTxn)}
                className="py-3 px-5 rounded-xl bg-black border border-[#e5b96a] text-[#e5b96a] hover:bg-[#e5b96a] hover:text-black font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Printer size={14} />
                <span>RECEIPT</span>
              </button>
              <button 
                onClick={() => setActiveOrderTracking(null)}
                className="cyber-btn flex-1 py-3 text-xs bg-[#00ff88] text-black border-[#00ff88] font-black"
              >
                CONTINUE PLAYING
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================================================
         12. FLOATING XP TOAST NOTIFICATION
         ========================================================================== */}
      {earnedXpToast && (
        <div className="fixed bottom-8 left-8 z-50 glass-panel px-6 py-4 rounded-2xl border border-[#00ff88] flex items-center gap-4 animate-bounce font-['Orbitron'] shadow-[0_0_30px_rgba(0,255,136,0.5)]">
          <div className="w-12 h-12 rounded-xl bg-[#00ff88]/20 border border-[#00ff88]/40 flex items-center justify-center font-black text-[#00ff88] text-lg">
            +{earnedXpToast}
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white">CAFÉ FUEL XP GRANTED!</div>
            <div className="text-[10px] text-gray-300 font-['Inter']">Profile & Progression updated in real time.</div>
          </div>
        </div>
      )}

      {/* ==========================================================================
         CINEMATIC MODAL: PRINTABLE CAFÉ RECEIPT (PART 11)
         ========================================================================== */}
      <ReceiptModal 
        isOpen={!!selectedCafeReceipt} 
        onClose={() => setSelectedCafeReceipt(null)} 
        transaction={selectedCafeReceipt} 
      />

    </div>
  );
}
