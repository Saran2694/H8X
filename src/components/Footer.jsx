import React from 'react';

export default function Footer({ onNavigate }) {
  const handleScroll = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-[#05060a] border-t border-white/10 pt-16 pb-12 px-6 sm:px-12 lg:px-20 text-gray-400 relative">
      
      {/* RED NEON GLOW LINE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff1e38]/60 to-transparent shadow-[0_0_10px_#ff1e38]" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* TOP ROW: LOGO & TAGLINE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <img 
              src="/img/logo.png" 
              alt="H8X Logo" 
              className="h-16 sm:h-20 md:h-24 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,30,56,0.6)]" 
            />
            <p className="font-mono text-xs sm:text-sm text-[#ff1e38] font-bold tracking-widest uppercase max-w-md">
              PLAY BEYOND REALITY. A PLACE TO PLAY. A PLACE TO BELONG.
            </p>
          </div>

          {/* MAIN NAV LINKS */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-editorial text-xs font-black tracking-widest text-white uppercase">
            <button onClick={() => handleScroll('hero')} className="hover:text-[#ff1e38] transition-colors">HOME</button>
            <button onClick={() => handleScroll('agent')} className="hover:text-[#ff1e38] transition-colors">AGENT</button>
            <button onClick={() => handleScroll('progression')} className="hover:text-[#ff1e38] transition-colors">PROGRESSION</button>
            <button onClick={() => handleScroll('progression')} className="hover:text-[#ff1e38] transition-colors">REWARDS</button>
            <button onClick={() => handleScroll('profile')} className="hover:text-[#ff1e38] transition-colors">PROFILE</button>
            <button onClick={() => handleScroll('cafeteria')} className="hover:text-[#ff1e38] transition-colors">CAFETERIA</button>
            <button onClick={() => handleScroll('about')} className="hover:text-[#ff1e38] transition-colors">ABOUT</button>
          </div>
        </div>

        {/* BOTTOM ROW: LEGAL, SOCIALS & COPYRIGHT */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs font-mono">
          
          {/* LEGAL LINKS */}
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 text-white font-bold">
            <a href="#" className="hover:text-[#ff1e38] transition-colors">INSTAGRAM</a>
            <span>•</span>
            <a href="#" className="hover:text-[#ff1e38] transition-colors">YOUTUBE</a>
            <span>•</span>
            <a href="#" className="hover:text-[#ff1e38] transition-colors">DISCORD</a>
          </div>

          {/* COPYRIGHT */}
          <div className="text-gray-500">
            © 2026 H8X / HORCRUX. All rights reserved.
          </div>

        </div>

      </div>

    </footer>
  );
}
