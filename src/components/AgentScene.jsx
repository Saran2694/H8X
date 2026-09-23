import React, { useState, useEffect } from 'react';

const ACTIVITIES = [
  {
    num: '01',
    name: 'SWIMMING POOL',
    image: '/img/ch1.png',
    desc: 'Dive into our luxury temperature-controlled aquatic arena. Features dynamic underwater lighting, hydrotherapy pools, and private poolside cabanas.',
    id: '01'
  },
  {
    num: '02',
    name: 'SPA',
    image: '/img/ch2.png',
    desc: 'Rejuvenate your body and mind with premium wellness spa therapies, modern steam amenities, cedar saunas, and holistic recovery sessions.',
    id: '02'
  },
  {
    num: '03',
    name: 'CAFETERIA',
    image: '/img/ch3.png',
    desc: 'Fuel up with gourmet artisanal coffee, high-protein culinary creations, fresh juices, and a social atmosphere designed for the H8X community.',
    id: '03'
  },
  {
    num: '04',
    name: 'VIRTUAL GAMES',
    image: '/img/ch4.png',
    desc: 'Step into the matrix with full-body haptic VR setups, 4K 240Hz esports rigs, racing simulators, and competitive tactical arenas.',
    id: '04'
  },
  {
    num: '05',
    name: 'BOARD GAME CAFÉ',
    image: '/img/ch5.png',
    desc: 'Challenge your allies to over 200 premium tabletop games, custom campaigns, strategy lounges, and master tournament tables.',
    id: '05'
  },
  {
    num: '06',
    name: 'TURF',
    image: '/img/ch6.png',
    desc: 'Dominate the multi-sport FIFA-certified 4G synthetic turf arena. Engineered for high-intensity football, cricket, and combat training.',
    id: '06'
  },
  {
    num: '07',
    name: 'SAUNA',
    image: '/img/ch7.png',
    desc: 'Purify your system in Finnish cedar wood dry heat and infrared thermal chambers. Designed for deep cellular muscle recovery.',
    id: '07'
  }
];

const HORCRUX_LETTERS = [
  { char: 'H', index: 0, num: '01', name: 'SWIMMING POOL' },
  { char: 'O', index: 1, num: '02', name: 'SPA' },
  { char: 'R', index: 2, num: '03', name: 'CAFETERIA' },
  { char: 'C', index: 3, num: '04', name: 'VIRTUAL GAMES' },
  { char: 'R', index: 4, num: '05', name: 'BOARD GAME CAFÉ' },
  { char: 'U', index: 5, num: '06', name: 'TURF' },
  { char: 'X', index: 6, num: '07', name: 'SAUNA' }
];

export default function AgentScene({ onBookActivity }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const selectedActivity = ACTIVITIES[displayIndex];

  const handleSelectActivity = (index) => {
    if (index === selectedIndex || isGlitching) return;
    setSelectedIndex(index);
    setIsGlitching(true);
    
    // AAA Game glitch switch sequence (600ms)
    setTimeout(() => {
      setDisplayIndex(index);
    }, 250);

    setTimeout(() => {
      setIsGlitching(false);
    }, 600);
  };

  return (
    <section id="agent" className="relative w-full min-h-screen bg-[#07080c] text-white pt-24 pb-16 px-4 md:px-12 lg:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* BACKGROUND GRAPHIC LINES */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ff1e38_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* TOP AGENT LABEL */}
      <div className="relative z-30 flex justify-between items-center border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-pulse" />
          <span className="font-mono text-xs text-gray-400 tracking-[0.3em] uppercase font-bold">
            AGENT INTERFACE
          </span>
        </div>

        {/* AGENT LABEL / COUNTER */}
        <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-gray-400">
          <span className="text-white">AGENTS</span>
          <span className="text-[#ff1e38]">{selectedActivity.num} / 07</span>
        </div>
      </div>

      {/* MAIN 3-COLUMN LAYOUT: LEFT LIST, CENTER LOGO & CHARACTER, RIGHT INFO */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto min-h-[550px]">
        
        {/* LEFT COLUMN: VERTICAL LIST OF 7 ACTIVITIES (4 COLS) */}
        <div className="lg:col-span-4 space-y-3 z-30">
          <div className="space-y-1">
            {ACTIVITIES.map((act, index) => {
              const isActive = index === selectedIndex;
              return (
                <div
                  key={act.num}
                  onClick={() => handleSelectActivity(index)}
                  className="group relative cursor-pointer py-2.5 px-3 flex items-center gap-4 transition-all duration-300"
                >
                  {/* ACCENT LINE FOR ACTIVE ITEM */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 rounded-r ${
                      isActive 
                        ? 'bg-[#ff1e38] shadow-[0_0_12px_#ff1e38]' 
                        : 'bg-transparent group-hover:bg-white/30'
                    }`} 
                  />

                  {/* ACTIVITY NUMBER */}
                  <span className={`font-mono text-xs font-bold tracking-widest transition-colors ${
                    isActive ? 'text-[#ff1e38]' : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                    {act.num}
                  </span>

                  {/* ACTIVITY NAME */}
                  <span className={`font-editorial text-base sm:text-lg font-black tracking-wider uppercase transition-colors ${
                    isActive 
                      ? 'text-white text-shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                      : 'text-gray-400 group-hover:text-gray-200'
                  }`}>
                    {act.name}
                  </span>

                  {/* Subtle Glow active indicator */}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff1e38] shadow-[0_0_8px_#ff1e38]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER COLUMN: HORCRUX 7-LETTER GLOW MATRIX + SELECTED CHARACTER (4 COLS) */}
        <div className="lg:col-span-4 relative flex items-center justify-center min-h-[450px] lg:min-h-[550px]">
          
          {/* LAYER 1: LARGE LOGO.PNG WATERMARK + 7-LETTER HORCRUX GLOW WATERMARK IN BACKGROUND */}
          <div className="absolute inset-0 flex items-center justify-center z-0 select-none overflow-visible">
            
            {/* BIG WATERMARK LOGO BEHIND CHARACTER */}
            <img 
              src="/img/logo.png" 
              alt="H8X Horcrux Logo" 
              className="absolute w-[360px] sm:w-[480px] md:w-[560px] lg:w-[620px] max-w-none h-auto object-contain opacity-25 filter drop-shadow-[0_0_50px_rgba(255,30,56,0.45)] pointer-events-none select-none transition-all duration-700" 
            />

            {/* 7-LETTER HORCRUX GLOW WORDMARK */}
            <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 px-2">
              {HORCRUX_LETTERS.map((item, idx) => {
                const isActive = idx === displayIndex;
                return (
                  <button
                    key={`${item.char}-${idx}`}
                    onClick={() => handleSelectActivity(idx)}
                    title={`${item.num}: ${item.name} (${item.char})`}
                    className={`font-editorial font-black transition-all duration-500 cursor-pointer select-none leading-none relative group ${
                      isActive
                        ? 'text-[#ff1e38] text-6xl sm:text-7xl lg:text-8xl scale-125 z-10 horcrux-letter-active'
                        : 'text-white/[0.12] hover:text-white/40 text-5xl sm:text-6xl lg:text-7xl scale-100 hover:scale-105'
                    }`}
                  >
                    <span>{item.char}</span>
                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff1e38] shadow-[0_0_10px_#ff1e38] animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* LAYER 2: FOREGROUND CHARACTER WITH AAA GAME GLITCH EFFECT */}
          <div className={`relative z-10 w-full max-w-xs sm:max-w-md h-[400px] sm:h-[500px] flex items-center justify-center transition-all duration-300 pointer-events-none ${
            isGlitching ? 'glitch-switch-active opacity-60 scale-95 filter blur-[2px]' : 'opacity-100 scale-100'
          }`}>
            <img
              src={selectedActivity.image}
              alt={selectedActivity.name}
              className="w-full h-full object-contain filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] select-none"
              onError={(e) => {
                e.target.src = '/img/secchar.png';
              }}
            />
          </div>

          {/* LAYER 3: 7-LETTER HORCRUX INTERACTIVE RUNESTONE DOCK */}
          <div className="absolute -bottom-2 z-20 flex items-center justify-center gap-1 sm:gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-2xl">
            {HORCRUX_LETTERS.map((item, idx) => {
              const isActive = idx === displayIndex;
              return (
                <button
                  key={`dock-${item.char}-${idx}`}
                  onClick={() => handleSelectActivity(idx)}
                  className={`w-7 h-8 sm:w-8 sm:h-9 rounded-lg flex flex-col items-center justify-center transition-all duration-300 font-mono ${
                    isActive
                      ? 'bg-gradient-to-b from-[#ff1e38] to-[#990014] text-white border border-[#ff4d63] shadow-[0_0_15px_#ff1e38] scale-110'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/15 border border-white/5'
                  }`}
                >
                  <span className="text-xs font-black leading-none">{item.char}</span>
                  <span className="text-[7px] font-bold opacity-75 mt-0.5 leading-none">{item.num}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: SELECTED ACTIVITY INFORMATION (4 COLS) */}
        <div className="lg:col-span-4 space-y-6 z-30 lg:pl-6 text-left">
          
          {/* ACTIVITY NUMBER */}
          <div className="font-mono text-xs font-extrabold tracking-[0.25em] text-[#ff1e38] uppercase">
            {selectedActivity.num} / 07
          </div>

          {/* ACTIVITY NAME */}
          <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            {selectedActivity.name}
          </h3>

          {/* 2-3 LINES DESCRIPTION */}
          <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            {selectedActivity.desc}
          </p>

          {/* BOOK NOW BUTTON */}
          <div className="pt-2">
            <button
              onClick={() => onBookActivity && onBookActivity(selectedActivity)}
              className="px-8 py-3.5 text-xs font-black tracking-widest uppercase text-white bg-gradient-to-r from-[#ff1e38] to-[#b30018] rounded border border-[#ff4d63]/50 shadow-[0_0_20px_rgba(255,30,56,0.6)] hover:scale-105 transition-all flex items-center gap-3"
            >
              <span>BOOK NOW</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>

      {/* GLITCH SWITCH CSS ANIMATION INJECTOR */}
      <style>{`
        @keyframes glitchSlice {
          0% { clip-path: inset(10% 0 80% 0); transform: translate(-4px, 2px); filter: hue-rotate(90deg); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); filter: hue-rotate(180deg); }
          40% { clip-path: inset(30% 0 50% 0); transform: translate(-3px, -3px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(3px, 3px); }
          80% { clip-path: inset(20% 0 70% 0); transform: translate(-2px, 1px); }
          100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); }
        }
        @keyframes letterNeonPulse {
          0%, 100% {
            filter: drop-shadow(0 0 15px #ff1e38) drop-shadow(0 0 35px rgba(255,30,56,0.9)) drop-shadow(0 0 60px rgba(255,30,56,0.6));
            text-shadow: 0 0 20px #ff1e38, 0 0 40px #ff1e38, 0 0 70px #b30018;
          }
          50% {
            filter: drop-shadow(0 0 25px #ff4d63) drop-shadow(0 0 50px rgba(255,77,99,1)) drop-shadow(0 0 90px rgba(255,30,56,0.8));
            text-shadow: 0 0 30px #ff4d63, 0 0 60px #ff1e38, 0 0 100px #ff1e38;
          }
        }
        .horcrux-letter-active {
          animation: letterNeonPulse 1.8s ease-in-out infinite;
        }
        .glitch-switch-active {
          animation: glitchSlice 0.5s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
