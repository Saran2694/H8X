import React from 'react';
import { GALLERY_ITEMS } from '../data/h8xData';
import { Frame, Sparkles, ArrowRight } from 'lucide-react';

export default function GalleryScene() {
  return (
    <div className="relative min-h-screen w-full bg-[#F2F3F5] pt-32 pb-24 px-6 lg:px-20 select-none overflow-y-auto">
      {/* Background Editorial Grid */}
      <div className="absolute inset-0 editorial-grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-[10] font-editorial">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between border-b border-black/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C59B27] tracking-[0.25em] uppercase mb-2">
              <Frame size={14} />
              <span>VISUAL ARCHIVE // H8X GALLERY</span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-black text-[#080808] uppercase leading-none tracking-tight">
              EDITORIAL GALLERY
            </h1>
          </div>
          <span className="text-xs font-mono-tech text-[#555A64] tracking-[0.2em] uppercase">
            04 ARCHIVE CATEGORIES // 07 EXHIBITS
          </span>
        </div>

        {/* OVERLAPPING EDITORIAL GALLERY LAYOUT */}
        <div className="space-y-16">
          {GALLERY_ITEMS.map((item, idx) => {
            const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12 relative`}
              >
                {/* LARGE OVERSIZED NUMBER */}
                <div className="absolute -top-10 left-0 lg:left-auto lg:relative text-8xl lg:text-9xl font-black text-[#D9DCE1] select-none pointer-events-none font-editorial z-[1]">
                  {numStr}
                </div>

                {/* IMAGE WITH FLOATING GLASS FRAME */}
                <div className="w-full lg:w-3/5 h-[400px] lg:h-[480px] relative rounded overflow-hidden group shadow-lg z-[10]">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* OVERLAPPING CONTENT CARD */}
                <div className={`w-full lg:w-2/5 editorial-glass p-8 lg:p-10 relative z-[20] ${isEven ? 'lg:-ml-16' : 'lg:-mr-16'} shadow-2xl space-y-4`}>
                  <div className="text-xs font-mono-tech text-[#C59B27] tracking-[0.25em] uppercase font-bold">
                    EXHIBIT // {item.category}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-[#080808] uppercase leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-sm font-body text-[#555A64] leading-relaxed">
                    Art-directed visual composition captured inside the H8X sanctuary environment. Designed for high depth and character alignment.
                  </p>
                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono-tech text-[#888]">
                    <span>ARCHIVE REF: HX-{numStr}</span>
                    <span className="text-[#080808] font-bold cursor-pointer hover:text-[#C59B27] flex items-center gap-1">
                      VIEW FULL <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
