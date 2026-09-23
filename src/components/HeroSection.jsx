import React from 'react';

export default function HeroSection({ onEnter }) {
  const handleScrollToAgent = () => {
    if (onEnter) {
      onEnter();
    } else {
      const agentElem = document.getElementById('agent');
      if (agentElem) {
        agentElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-black flex items-center">
      
      {/* FULLSCREEN VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90 contrast-110"
        src="/img/vidhero.mp4"
      />

      {/* SUBTLE CINEMATIC DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* HERO TEXT — MINIMAL CONTENT ON THE LEFT */}
      <div className="relative z-20 px-6 sm:px-12 md:px-20 lg:px-24 max-w-2xl text-left space-y-6 pt-16">
        
        {/* SUBTITLE */}
        <h2 className="font-editorial text-xl sm:text-2xl font-extrabold text-[#ff1e38] tracking-widest uppercase text-shadow-[0_0_15px_rgba(255,30,56,0.6)]">
          PLAY BEYOND REALITY
        </h2>

        {/* MAIN SLOGAN */}
        <div className="space-y-1">
          <p className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            A PLACE TO PLAY.
          </p>
          <p className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            A PLACE TO BELONG.
          </p>
        </div>

        {/* PLAY / ENTER H8X BUTTON */}
        <div className="pt-4">
          <button
            onClick={handleScrollToAgent}
            className="px-8 py-4 text-sm font-black tracking-widest text-white uppercase bg-gradient-to-r from-[#ff1e38] to-[#b30018] rounded border border-[#ff4d63]/50 shadow-[0_0_25px_rgba(255,30,56,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
          >
            <span>PLAY / ENTER H8X</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

      </div>

    </section>
  );
}
