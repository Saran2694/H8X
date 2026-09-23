import React from 'react';

/**
 * SectionFrame — Reusable AAA Game Section Architecture
 * Wraps content in distinct angular geometric clip paths (clip-path polygon)
 * with technical markers, frame boundaries, and dark/light/accent theme options.
 */

export const FRAME_VARIANTS = {
  // Variant A: Top straight, bottom right cut
  A: 'clip-frame-a', 
  // Variant B: Top left & right diagonal cut, bottom straight
  B: 'clip-frame-b',
  // Variant C: Chamfered all 4 corners
  C: 'clip-frame-c',
  // Variant D: Top right cut, bottom left cut
  D: 'clip-frame-d',
  // Variant E: Deep bottom diagonal arrow notch
  E: 'clip-frame-e'
};

export function SectionFrame({
  children,
  id,
  variant = 'A',
  bgType = 'dark', // 'dark', 'light', 'graphite', 'accent', 'warm'
  sectionNum = '01',
  totalSections = '11',
  label = 'H8X // SYSTEM',
  accentColor = '#C59B27',
  className = ''
}) {
  const variantClass = FRAME_VARIANTS[variant] || FRAME_VARIANTS.A;

  // Background Theme Styles matching editorial & cinematic color system
  const bgStyles = {
    dark: 'bg-[#0A0C10] text-[#F2F3F5] border-y border-white/10',
    light: 'bg-[#F7F5F0] text-[#080808] border-y border-black/10',
    purple: 'bg-[#1a0f2e] text-[#F2F3F5] border-y border-purple-500/20',
    accent: 'bg-[#ff4655] text-white border-y border-white/20',
    graphite: 'bg-[#121620] text-[#F2F3F5] border-y border-white/10',
    warm: 'bg-[#F4EFE6] text-[#080808] border-y border-black/15'
  }[bgType] || 'bg-[#0A0C10] text-[#F2F3F5]';

  return (
    <section 
      id={id}
      className={`relative w-full overflow-visible py-16 lg:py-24 px-0 transition-all ${className}`}
    >
      {/* ANGULAR CONTAINER OUTER SHAPE — FULL WIDTH SPAN */}
      <div className={`relative w-full ${bgStyles} ${variantClass} shadow-2xl overflow-visible py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-20`}>
        
        {/* TECHNICAL CORNER MARKERS */}
        <div className="absolute top-4 left-8 flex items-center gap-3 pointer-events-none z-30 font-mono-tech text-[10px] tracking-widest opacity-75">
          <span className="w-2 h-2 bg-current" style={{ color: accentColor }} />
          <span>[{sectionNum} / {totalSections}]</span>
          <span className="hidden sm:inline">// {label}</span>
        </div>

        <div className="absolute top-4 right-8 flex items-center gap-3 pointer-events-none z-30 font-mono-tech text-[10px] tracking-widest opacity-60">
          <span>H8X FRAME // V-{variant}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
        </div>

        <div className="absolute bottom-4 left-8 flex items-center gap-2 pointer-events-none z-30 font-mono-tech text-[9px] tracking-widest opacity-50">
          <span>+ TARGET MATRICES READY</span>
        </div>

        <div className="absolute bottom-4 right-8 flex items-center gap-2 pointer-events-none z-30 font-mono-tech text-[9px] tracking-widest opacity-70 font-bold" style={{ color: accentColor }}>
          <span>SEC_{sectionNum} // ACTIVE</span>
        </div>

        {/* SECTION INNER CONTENT — CONTROLLED FULL-WIDTH MAX GRID */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * AngularDivider — Continuous Section Connection Bar
 * Visually connects one angular section frame to the next with diagonal geometry,
 * technical lines, and section metadata.
 */
export function AngularDivider({
  prevNum = '01',
  nextNum = '02',
  nextLabel = 'NEXT ZONE',
  accentColor = '#C59B27',
  flip = false
}) {
  return (
    <div className="relative w-full py-6 flex items-center justify-center overflow-hidden z-20 pointer-events-none">
      <div className="w-full max-w-7xl px-6 flex items-center justify-between">
        
        {/* LEFT LINE & MARKER */}
        <div className="flex-1 flex items-center gap-3">
          <span className="w-2 h-2 rotate-45 border border-current" style={{ color: accentColor }} />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-current to-transparent opacity-30" style={{ color: accentColor }} />
        </div>

        {/* CENTER ANGULAR CONNECTOR BADGE */}
        <div className="px-6 py-2 bg-[#080808] border border-[#C59B27]/40 text-[#F2F3F5] font-mono-tech text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 shadow-xl transform -skew-x-12">
          <span className="text-[#C59B27] font-bold">{prevNum}</span>
          <span className="opacity-40">━━━╲━━━</span>
          <span className="text-white font-bold">{nextNum}</span>
          <span className="text-[9px] opacity-70 hidden sm:inline text-[#C59B27]">{nextLabel}</span>
        </div>

        {/* RIGHT LINE & MARKER */}
        <div className="flex-1 flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-gradient-to-l from-current to-transparent opacity-30" style={{ color: accentColor }} />
          <span className="w-2 h-2 rotate-45 border border-current" style={{ color: accentColor }} />
        </div>

      </div>
    </div>
  );
}

export default SectionFrame;
