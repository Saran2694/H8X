import React from 'react';
import { WORLDS_DATA } from '../data/h8xData';

export default function ExperienceSelector({ activeWorldIndex, onSelectWorld }) {
  return (
    <div className="flex flex-col gap-3 font-editorial">
      <div className="text-[10px] font-mono-tech tracking-[0.25em] text-[#555A64] uppercase font-bold mb-1">
        EXPERIENCES // CATALOGUE
      </div>

      <div className="flex flex-col gap-2">
        {WORLDS_DATA.map((world, idx) => {
          const isSelected = activeWorldIndex === idx;
          const numStr = `0${idx + 1}`;

          return (
            <button
              key={world.id}
              onClick={() => onSelectWorld(idx)}
              className={`group flex items-center justify-between px-4 py-2.5 rounded transition-all duration-300 text-left border ${
                isSelected
                  ? 'bg-[#080808] text-[#F2F3F5] border-[#080808] shadow-lg translate-x-2'
                  : 'bg-white/40 border-black/10 text-[#555A64] hover:bg-white hover:text-[#080808] hover:border-black/25'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono-tech text-xs tracking-widest ${isSelected ? 'text-[#C59B27]' : 'text-[#888]'}`}>
                  {numStr}
                </span>
                <span className="font-bold text-xs tracking-wider uppercase font-editorial">
                  {world.title}
                </span>
              </div>

              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
