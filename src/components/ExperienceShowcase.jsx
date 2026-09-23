import React, { useState } from 'react';
import { 
  Waves, Sparkles, Coffee, Gamepad2, Dices, Trophy, Flame, 
  ChevronRight, Users, Award, Shield, CheckCircle2, ArrowRight 
} from 'lucide-react';

export default function ExperienceShowcase({ worldsData, onSelectWorld, onBookWorld }) {
  const [activeCode, setActiveCode] = useState('SWIMMING');

  const experienceList = [
    { code: 'SWIMMING', name: 'SWIMMING', icon: Waves },
    { code: 'SPA', name: 'SPA', icon: Sparkles },
    { code: 'CAFETERIA', name: 'CAFETERIA', icon: Coffee },
    { code: 'VIRTUAL GAMES', name: 'VIRTUAL GAMES', icon: Gamepad2 },
    { code: 'BOARD GAMES', name: 'BOARD GAMES', icon: Dices },
    { code: 'TURF', name: 'TURF', icon: Trophy },
    { code: 'SAUNA', name: 'SAUNA', icon: Flame },
  ];

  // Find active world data or fallback to first
  const activeWorld = worldsData.find(
    w => w.code.toUpperCase().includes(activeCode) || activeCode.includes(w.code.toUpperCase())
  ) || worldsData[0];

  const handleSelect = (code) => {
    setActiveCode(code);
    const found = worldsData.find(
      w => w.code.toUpperCase().includes(code) || code.includes(w.code.toUpperCase())
    );
    if (found && onSelectWorld) {
      onSelectWorld(found);
    }
  };

  return (
    <div className="w-full relative py-6 px-4 md:px-8 lg:px-16">
      
      {/* FUTURISTIC CYBER CONTAINER WITH ANGLED CORNERS AND RED GLOW */}
      <div className="relative rounded-2xl bg-[#090c14]/90 border border-[#ff1e38]/30 shadow-[0_0_50px_rgba(255,30,56,0.15)] overflow-hidden backdrop-blur-2xl">
        
        {/* TOP ACCENT LINE */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff1e38] to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* LEFT COLUMN: EXPERIENCE SELECTOR LIST (3 COLS) */}
          <div className="lg:col-span-3 p-4 lg:p-6 border-r border-white/10 flex flex-col justify-center gap-2 bg-black/40">
            {experienceList.map((item) => {
              const Icon = item.icon;
              const isActive = activeCode === item.code;

              return (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 font-editorial text-xs font-extrabold tracking-widest ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff1e38]/90 to-[#b30018]/90 text-white shadow-[0_0_20px_rgba(255,30,56,0.5)] border border-[#ff4d63]/50'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-[#ff1e38]'} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                </button>
              );
            })}
          </div>

          {/* CENTER COLUMN: FEATURED CHARACTER / SCENE VISUAL (5 COLS) */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-b from-transparent via-black/40 to-black/80">
            
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 z-0">
              <img 
                src={activeWorld?.character || '/img/ch1.png'} 
                alt={activeWorld?.title} 
                className="w-full h-full object-cover object-center filter brightness-90 contrast-110 transform hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.src = '/img/ch1.png'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090c14] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090c14]/80 via-transparent to-[#090c14]/80" />
            </div>

            {/* SLOGAN OVERLAY TEXT */}
            <div className="relative z-10">
              <span className="font-editorial text-xs tracking-[0.3em] text-[#ff1e38] uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-pulse" />
                H8X EXPERIENCE
              </span>
              <h3 className="font-editorial text-xl lg:text-2xl font-black text-white tracking-wide uppercase leading-tight mt-1">
                DIVE INTO<br />A STRONGER YOU
              </h3>
            </div>

            {/* BRANDING BACK TEXT ON CHARACTER */}
            <div className="relative z-10 self-center text-center py-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-gray-300">
                PLAY BEYOND REALITY
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIVE EXPERIENCE DETAILS & BOOKING CARD (4 COLS) */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-black/60 border-l border-white/10">
            
            {/* TOP USER STATUS HUD PILL */}
            <div className="bg-black/70 border border-white/10 rounded-xl p-3 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/img/ch1.png" 
                  alt="User Avatar" 
                  className="w-9 h-9 rounded-full object-cover border border-[#ff1e38]"
                />
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wider uppercase">SRI SARAN</h4>
                  <span className="text-[10px] font-mono text-[#ff1e38] font-bold">LV 12</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-gray-400">2850 / 5000 XP</div>
                <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-1">
                  <div className="w-[57%] h-full bg-[#ff1e38] rounded-full shadow-[0_0_8px_#ff1e38]" />
                </div>
              </div>
            </div>

            {/* EXPERIENCE TITLE & DESCRIPTION */}
            <div className="space-y-3">
              <div>
                <h2 className="font-editorial text-2xl lg:text-3xl font-black text-white tracking-tight uppercase">
                  {activeWorld?.code || 'SWIMMING'}
                </h2>
                <p className="text-xs font-bold tracking-widest text-[#ff1e38] uppercase mt-0.5">
                  DIVE INTO A NEW YOU
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-body">
                {activeWorld?.description || 'A premium swimming experience with world-class facilities and thermal water management.'}
              </p>

              {/* FEATURES CHECKLIST WITH ICONS */}
              <div className="space-y-2 pt-2">
                {(activeWorld?.features || ['INDOOR HEATED POOL', 'PROFESSIONAL TRAINERS', 'ALL EXPERIENCE LEVELS']).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-200">
                    <CheckCircle2 size={14} className="text-[#ff1e38] flex-shrink-0" />
                    <span className="font-mono tracking-wide text-[11px] uppercase">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* THUMBNAIL PREVIEW & BOOK NOW CTA */}
            <div className="pt-4 space-y-3">
              <div className="relative h-24 rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={activeWorld?.bg || '/img/bg/swimmingpool.png'} 
                  alt="Feature Preview" 
                  className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-300"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop&q=80'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
                    {activeWorld?.price || '₹750 / session'}
                  </span>
                </div>
              </div>

              {/* Glowing Red CTA Button */}
              <button
                onClick={() => onBookWorld ? onBookWorld(activeWorld) : null}
                className="w-full py-3.5 cyber-btn-red text-xs font-black flex items-center justify-center gap-2 tracking-widest"
              >
                <span>BOOK NOW</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
