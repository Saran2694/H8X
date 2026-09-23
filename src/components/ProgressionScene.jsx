import React from 'react';

const PROGRESSION_MILESTONES = [
  { visits: 1, label: '01 VISIT', bonus: '+50 CREDITS', unlocked: true },
  { visits: 2, label: '02 VISITS', bonus: '+75 CREDITS', unlocked: true },
  { visits: 3, label: '03 VISITS', bonus: '+100 CREDITS', unlocked: true },
  { visits: 5, label: '05 VISITS', bonus: '+200 CREDITS', unlocked: false },
  { visits: 10, label: '10 VISITS', bonus: '+500 CREDITS', unlocked: false },
];

export default function ProgressionScene({ 
  userProfile = {}, 
  credits = 325, 
  totalVisits = 3,
  level = 4
}) {
  const currentLevel = userProfile.level || level;
  const userCredits = userProfile.credits !== undefined ? userProfile.credits : credits;
  const visitsCount = userProfile.totalVisits || totalVisits;

  // Calculate progress percentage to next level
  const progressPercent = Math.min(100, Math.round((visitsCount / 10) * 100));

  return (
    <section id="progression" className="relative w-full min-h-screen bg-[#07080c] text-white pt-24 pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ff1e38_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        
        {/* HEADER */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-xs text-[#ff1e38] tracking-[0.3em] uppercase font-bold block mb-2">
              SYSTEM MATRIX // PROGRESSION & REWARDS
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              PROGRESSION & REWARDS
            </h2>
          </div>

          {/* STATS HEADERS */}
          <div className="flex items-center gap-6 bg-black/60 border border-white/10 px-6 py-3 rounded-lg backdrop-blur-md">
            <div>
              <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">TOTAL CREDITS</div>
              <div className="font-editorial text-2xl font-black text-[#ff1e38]">{userCredits}</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">CURRENT LEVEL</div>
              <div className="font-editorial text-2xl font-black text-white">LVL {currentLevel}</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">VISITS</div>
              <div className="font-editorial text-2xl font-black text-white">{visitsCount}</div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2 bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md">
          <div className="flex justify-between items-center text-xs font-mono font-bold tracking-widest">
            <span className="text-gray-300">PROGRESS TO LEVEL {currentLevel + 1}</span>
            <span className="text-[#ff1e38]">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-[#ff1e38] to-[#ff6b00] rounded-full transition-all duration-700 shadow-[0_0_12px_#ff1e38]" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* PROGRESSION STEPS GRID */}
        <div>
          <h3 className="font-editorial text-xl font-bold uppercase tracking-wider text-gray-200 mb-6">
            VISIT MILESTONE REWARDS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROGRESSION_MILESTONES.map((step) => {
              const isAchieved = visitsCount >= step.visits;
              return (
                <div 
                  key={step.label}
                  className={`p-6 rounded-xl border flex flex-col justify-between space-y-4 transition-all duration-300 ${
                    isAchieved
                      ? 'bg-[#ff1e38]/10 border-[#ff1e38]/50 shadow-[0_0_20px_rgba(255,30,56,0.2)]'
                      : 'bg-black/40 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold tracking-widest text-gray-400">
                      {step.label}
                    </span>
                    {isAchieved ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e38] shadow-[0_0_8px_#ff1e38]" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    )}
                  </div>

                  <div>
                    <div className="font-editorial text-xl font-black text-white tracking-wide">
                      {step.bonus}
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 tracking-wider uppercase mt-1">
                      {isAchieved ? 'CLAIMED / UNLOCKED' : `REQUIRES ${step.visits} VISITS`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REWARDS CATALOG SUMMARY */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-editorial text-2xl font-black uppercase text-white">REWARDS STORE</h3>
              <p className="font-sans text-xs text-gray-400 mt-1">Use your H8X credits for session discounts, free cafeteria items & VIP slots.</p>
            </div>
            <button className="px-6 py-2.5 text-xs font-extrabold tracking-widest uppercase text-white border border-[#ff1e38] bg-[#ff1e38]/20 rounded hover:bg-[#ff1e38] transition-all shadow-[0_0_15px_rgba(255,30,56,0.4)]">
              REDEEM REWARDS
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
