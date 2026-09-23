import React from 'react';
import { Star, Crown, Gift, ArrowRight } from 'lucide-react';

export default function GamificationHud({ onOpenProgression }) {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-3">
      
      {/* 3-COLUMN GAMIFICATION HUD CONTAINER */}
      <div className="rounded-2xl bg-[#090c14]/90 border border-white/10 p-4 lg:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-xl shadow-xl">
        
        {/* ITEM 1: MISSION */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ff1e38]/10 border border-[#ff1e38]/40 flex items-center justify-center flex-shrink-0 text-[#ff1e38] shadow-[0_0_15px_rgba(255,30,56,0.3)]">
            <Star size={22} className="fill-[#ff1e38]" />
          </div>
          <div className="flex-1">
            <h4 className="font-editorial text-xs font-black tracking-widest text-white uppercase">
              MISSION
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
              Complete 3 visits to unlock Special Rewards.
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] font-mono text-gray-500 font-semibold">PROGRESS</span>
              <span className="text-xs font-mono font-bold text-[#ff1e38]">1 / 3</span>
            </div>
          </div>
        </div>

        {/* ITEM 2: LEVEL & XP */}
        <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
          <div className="w-12 h-12 rounded-full bg-[#ff1e38]/10 border border-[#ff1e38]/40 flex items-center justify-center flex-shrink-0 text-[#ff1e38] shadow-[0_0_15px_rgba(255,30,56,0.3)]">
            <Crown size={22} />
          </div>
          <div className="flex-1">
            <h4 className="font-editorial text-xs font-black tracking-widest text-white uppercase">
              LEVEL 12
            </h4>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-300 mt-0.5">
              <span>2850 / 5000 XP</span>
            </div>
            {/* RED PROGRESS BAR */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2 border border-white/5">
              <div className="w-[57%] h-full bg-gradient-to-r from-[#ff1e38] to-[#ff4d63] rounded-full shadow-[0_0_10px_#ff1e38]" />
            </div>
          </div>
        </div>

        {/* ITEM 3: REWARDS */}
        <div className="flex items-center justify-between gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ff1e38]/10 border border-[#ff1e38]/40 flex items-center justify-center flex-shrink-0 text-[#ff1e38] shadow-[0_0_15px_rgba(255,30,56,0.3)]">
              <Gift size={22} />
            </div>
            <div>
              <h4 className="font-editorial text-xs font-black tracking-widest text-white uppercase">
                REWARDS
              </h4>
              <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                Next Reward
              </span>
              <span className="text-xs font-mono font-extrabold text-white">
                500 Points
              </span>
            </div>
          </div>

          <button
            onClick={onOpenProgression}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/15 hover:border-[#ff1e38] text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 transition-all hover:bg-[#ff1e38]/20"
          >
            <span>VIEW ALL</span>
            <ArrowRight size={12} />
          </button>
        </div>

      </div>

    </div>
  );
}
