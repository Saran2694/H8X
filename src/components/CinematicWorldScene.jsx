import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function CinematicWorldScene({ 
  world, 
  onNext, 
  onPrev, 
  onOpenBooking,
  mousePos 
}) {
  const containerRef = useRef(null);

  // Parallax offsets based on cursor position
  const mouseX = mousePos.x;
  const mouseY = mousePos.y;

  const bgParallax = {
    transform: `translate3d(${mouseX * -15}px, ${mouseY * -15}px, 0px) scale(1.05)`
  };

  const midgroundParallax = {
    transform: `translate3d(${mouseX * -30}px, ${mouseY * -30}px, 0px)`
  };

  const characterParallax = {
    transform: `translate3d(${mouseX * 45}px, ${mouseY * 45}px, 0px) scale(1.02)`
  };

  const foregroundParallax = {
    transform: `translate3d(${mouseX * 80}px, ${mouseY * 80}px, 0px)`
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none bg-black"
    >
      {/* LAYER 01 — ATMOSPHERE (Gradient Vignette & Fog) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/80 pointer-events-none" />
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${world.glowColor} 0%, transparent 60%)`
        }}
      />

      {/* LAYER 01 — BACKGROUND ENVIRONMENT ARTWORK */}
      <div 
        className="absolute inset-0 z-10 transition-transform duration-500 ease-out pointer-events-none"
        style={bgParallax}
      >
        <img 
          src={world.bg} 
          alt={world.title} 
          className="w-full h-full object-cover filter brightness-[0.7] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/80" />
      </div>

      {/* LAYER 02 — ATMOSPHERE (FOG, LIGHT PARTICLES, DUST & AMBIENT RAYS) */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none transition-transform duration-400 ease-out overflow-hidden"
        style={midgroundParallax}
      >
        {/* Dynamic Ray Glow */}
        <div 
          className="absolute top-0 right-1/3 w-[650px] h-[950px] filter blur-[90px] opacity-35 animate-light-flow"
          style={{ background: `linear-gradient(to bottom, ${world.accentColor}, transparent)` }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full filter blur-[100px] opacity-30 animate-pulse"
          style={{ backgroundColor: world.accentColor }}
        />
        {/* Floating atmospheric dust particle circles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-white/40 filter blur-xs animate-ping" />
        <div className="absolute bottom-32 right-1/3 w-3 h-3 rounded-full bg-amber-300/30 filter blur-xs animate-pulse" />
      </div>

      {/* LAYER 03 — HERO CHARACTER (ESTABLISHED OUTSIDE CARDS IN 3D SPACE) */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none flex items-end justify-center lg:justify-end lg:pr-28 transition-transform duration-200 ease-out"
        style={characterParallax}
      >
        <div className="relative h-[88vh] max-h-[920px] w-auto">
          {/* Character Rim Light Ambient Glow */}
          <div 
            className="absolute inset-0 filter blur-3xl opacity-35 rounded-full transform scale-90"
            style={{ backgroundColor: world.accentColor }}
          />

          {/* Cutout PNG Character */}
          <img 
            src={world.character} 
            alt={world.characterName} 
            className="relative h-full w-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-700"
          />

          {/* Anti-Gravity Floating Character Badge */}
          <div className="absolute bottom-16 left-0 lg:-left-16 glass-panel px-4 py-2.5 rounded-xl border border-[#e5b96a]/40 flex items-center gap-3 backdrop-blur-xl animate-float pointer-events-auto shadow-[0_0_25px_rgba(229,185,106,0.2)]">
            <Sparkles size={18} style={{ color: world.accentColor }} />
            <div>
              <div className="text-[10px] font-['Rajdhani'] font-bold text-gray-400 tracking-wider">H8X AGENT CHAPERONE</div>
              <div className="text-xs font-['Orbitron'] font-extrabold text-white tracking-widest">{world.characterName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 04 — FLOATING HUD UI & CONTENT PANEL */}
      {/* LAYER 05 — FOREGROUND DEPTH OBJECTS & SCREEN SCANLINES */}
      <div 
        className="absolute inset-0 z-35 pointer-events-none transition-transform duration-100 ease-out"
        style={foregroundParallax}
      >
        {/* Subtle blurred foreground depth circles */}
        <div className="absolute top-12 left-12 w-36 h-36 rounded-full border border-white/5 bg-white/5 backdrop-blur-3xl" />
        <div className="absolute bottom-24 right-12 w-52 h-52 rounded-full border border-white/5 bg-white/5 backdrop-blur-3xl" />
      </div>

      <div className="absolute inset-0 z-40 scanlines opacity-25 pointer-events-none" />
      <div className="absolute inset-0 z-40 vignette pointer-events-none" />

      {/* LAYER 07 — EDITORIAL TYPOGRAPHY & CONTENT (Left Aligned Split Layout) */}
      <div className="absolute inset-0 z-40 flex items-center justify-between px-8 lg:px-20 pointer-events-none">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={onPrev}
          className="pointer-events-auto p-3 rounded-full border border-white/20 bg-black/60 text-white hover:border-[#e5b96a] hover:text-[#e5b96a] hover:shadow-[0_0_20px_rgba(229,185,106,0.4)] transition-all group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* EDITORIAL CONTENT BOX */}
        <div className="max-w-xl text-left pointer-events-auto flex flex-col gap-4 py-8">
          
          {/* Section Indicator */}
          <div className="flex items-center gap-3 font-['Orbitron']">
            <span className="text-sm font-black text-[#e5b96a] tracking-widest">{world.id} / 07</span>
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#e5b96a] to-transparent" />
          </div>

          {/* HUGE TITLE */}
          <h1 className="text-6xl lg:text-8xl font-black font-['Orbitron'] tracking-tighter text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-none">
            {world.title}
          </h1>

          {/* SECONDARY SUBTITLE */}
          <div className="text-xl lg:text-2xl font-bold font-['Rajdhani'] tracking-[0.3em] text-[#e5b96a] uppercase">
            {world.subtitle}
          </div>

          {/* DESCRIPTION */}
          <p className="text-base text-gray-300 font-['Inter'] font-light leading-relaxed max-w-md backdrop-blur-sm bg-black/20 p-3 rounded-lg border-l-2 border-[#e5b96a]/50">
            {world.description}
          </p>

          {/* ENVIRONMENT STATS FLOATING UI */}
          <div className="flex items-center gap-6 py-2">
            {Object.entries(world.stats).map(([key, val]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[10px] font-['Rajdhani'] font-semibold text-gray-400 uppercase tracking-widest">{key}</span>
                <span className="text-sm font-['Orbitron'] font-bold text-white">{val}</span>
              </div>
            ))}
          </div>

          {/* CTA BUTTON: ENTER ZONE */}
          <div className="pt-2 flex items-center gap-4">
            <button 
              onClick={() => onOpenBooking(world.id)}
              className="cyber-btn flex items-center gap-3 group"
              style={{ borderColor: world.accentColor, color: world.accentColor }}
            >
              <span>ENTER ZONE</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>

            {/* Handwritten script element matching reference image */}
            <span className="hidden sm:inline-block font-['Cinzel'] italic text-amber-200/70 text-lg tracking-wider">
              Relax. Rejuvenate. Yourself.
            </span>
          </div>
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={onNext}
          className="pointer-events-auto p-3 rounded-full border border-white/20 bg-black/60 text-white hover:border-[#e5b96a] hover:text-[#e5b96a] hover:shadow-[0_0_20px_rgba(229,185,106,0.4)] transition-all group"
        >
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
