import React from 'react';

export default function CafeteriaIntroSection({ onExploreCafeteria }) {
  return (
    <section id="cafeteria" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#07080c] text-white border-t border-b border-white/10 overflow-hidden">
      
      {/* BACKGROUND GRAPHIC */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ff1e38_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        
        {/* SUBTITLE */}
        <span className="font-mono text-xs text-[#ff1e38] tracking-[0.35em] uppercase font-extrabold block">
          CULINARY SOCIAL HUB // H8X CAFETERIA
        </span>

        {/* TITLE */}
        <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight">
          CAFETERIA
        </h2>

        {/* 2-3 SHORT LINES */}
        <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
          Fuel up with gourmet artisanal coffee, high-protein culinary creations, fresh juices, and energy drinks designed for the H8X community. Experience seamless dining delivered right to your activity zone.
        </p>

        {/* EXPLORE CAFETERIA BUTTON */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onExploreCafeteria}
            className="px-8 py-4 text-xs font-black tracking-widest uppercase text-white bg-gradient-to-r from-[#ff1e38] to-[#b30018] rounded border border-[#ff4d63]/50 shadow-[0_0_25px_rgba(255,30,56,0.6)] hover:scale-105 transition-all flex items-center gap-3"
          >
            <span>EXPLORE CAFETERIA</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
