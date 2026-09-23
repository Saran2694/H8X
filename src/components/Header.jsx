import React from 'react';

export default function Header({ 
  activeNav, 
  setActiveNav, 
  credits = 0,
  onSignIn,
  isSignedIn = false,
  userName = 'PLAYER 01'
}) {
  const scrollToSection = (id) => {
    setActiveNav(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3 bg-black/75 backdrop-blur-md border-b border-white/10 shadow-2xl flex items-center justify-between">
      
      {/* LEFT CORNER: H8X / HORCRUX COMPANY LOGO */}
      <div 
        onClick={() => scrollToSection('hero')}
        className="flex items-center cursor-pointer group"
      >
        <img 
          src="/img/logo.png" 
          alt="H8X Logo" 
          className="h-12 sm:h-14 md:h-16 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,30,56,0.6)] group-hover:scale-105 transition-transform" 
        />
      </div>

      {/* CENTER NAVIGATION - EXACT ORDER: HOME, AGENT, PROGRESSION, PLAY, REWARDS, PROFILE */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-4 bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
        
        {/* HOME */}
        <button
          onClick={() => scrollToSection('hero')}
          className={`px-3 py-1 text-xs font-bold tracking-wider uppercase transition-colors ${
            activeNav === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          HOME
        </button>

        {/* AGENT */}
        <button
          onClick={() => scrollToSection('agent')}
          className={`px-3 py-1 text-xs font-bold tracking-wider uppercase transition-colors ${
            activeNav === 'agent' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          AGENT
        </button>

        {/* PROGRESSION */}
        <button
          onClick={() => scrollToSection('progression')}
          className={`px-3 py-1 text-xs font-bold tracking-wider uppercase transition-colors ${
            activeNav === 'progression' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          PROGRESSION
        </button>

        {/* PLAY - VISUALLY ACTIVE NAVIGATION ITEM */}
        <button
          onClick={() => scrollToSection('agent')}
          className="relative px-6 py-1.5 text-xs font-black tracking-widest text-white uppercase transition-transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff1e38] to-[#b30018] rounded border border-[#ff4d63]/50 shadow-[0_0_15px_rgba(255,30,56,0.6)]" />
          <span className="relative z-10 font-editorial tracking-widest">PLAY</span>
        </button>

        {/* REWARDS */}
        <button
          onClick={() => scrollToSection('progression')}
          className={`px-3 py-1 text-xs font-bold tracking-wider uppercase transition-colors ${
            activeNav === 'rewards' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          REWARDS
        </button>

        {/* PROFILE */}
        <button
          onClick={() => scrollToSection('profile')}
          className={`px-3 py-1 text-xs font-bold tracking-wider uppercase transition-colors ${
            activeNav === 'profile' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          PROFILE
        </button>

      </nav>

      {/* RIGHT SIDE: CREDIT 0 & SIGN IN (WITH NOTICEABLE GAP FROM NAV) */}
      <div className="flex items-center gap-6 md:ml-8">
        
        {/* CREDIT DISPLAY */}
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-gray-200 tracking-wider">
          <span className="text-gray-400">CREDIT</span>
          <span className="text-[#ff1e38] font-extrabold">{credits}</span>
        </div>

        {/* SIGN IN BUTTON */}
        <button
          onClick={onSignIn}
          className="px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase text-white bg-transparent border border-white/20 rounded hover:border-[#ff1e38] hover:bg-[#ff1e38]/10 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]"
        >
          {isSignedIn ? userName : 'SIGN IN'}
        </button>

      </div>
    </header>
  );
}
