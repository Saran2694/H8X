import React from 'react';

export default function AboutSection({ onExploreStory }) {
  return (
    <section id="about" className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-[#07080c] text-white border-t border-white/10 overflow-hidden">
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ff1e38_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: ABOUT H8X TYPOGRAPHY & BUTTON (5 COLS) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          <span className="font-mono text-xs text-[#ff1e38] tracking-[0.3em] uppercase font-bold block">
            ABOUT H8X // OUR VISION
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight">
            ABOUT H8X
          </h2>

          <p className="font-sans text-base text-gray-300 leading-relaxed font-light">
            H8X brings sports, wellness, gaming, food and community together in one immersive experience. Engineered for modern high-performance players, innovators, and lifestyle enthusiasts.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreStory}
              className="px-8 py-3.5 text-xs font-black tracking-widest uppercase text-white border border-[#ff1e38] bg-[#ff1e38]/10 rounded hover:bg-[#ff1e38] transition-all flex items-center gap-3 shadow-[0_0_15px_rgba(255,30,56,0.3)]"
            >
              <span>EXPLORE OUR STORY</span>
              <span>→</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: 2-3 LARGE VISUAL EDITORIAL IMAGES (7 COLS) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* IMAGE 1 */}
          <div className="relative h-80 rounded-xl overflow-hidden border border-white/10 group shadow-2xl">
            <img
              src="/img/bg/turf.png"
              alt="H8X Arena"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute bottom-4 left-4 z-20 font-editorial text-sm font-black uppercase text-white tracking-wider">
              MULTI-SPORT ARENAS
            </div>
          </div>

          {/* IMAGE 2 */}
          <div className="relative h-80 rounded-xl overflow-hidden border border-white/10 group shadow-2xl sm:translate-y-6">
            <img
              src="/img/bg/virtuvalgame.png"
              alt="H8X VR Rigs"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute bottom-4 left-4 z-20 font-editorial text-sm font-black uppercase text-white tracking-wider">
              FULL-BODY VR SIMULATORS
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
