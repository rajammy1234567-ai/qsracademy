import React from 'react';
import { Sparkles } from 'lucide-react';

export const PARTNER_BRANDS = [
  { name: 'Rasna Buzz', tag: 'Beverage & Dessert' },
  { name: 'Millies Cookies', tag: 'Bakery & Confectionery' },
  { name: 'Ritaza', tag: 'Café & Dining' },
  { name: 'Roll Express', tag: 'Quick Bites & Rolls' },
  { name: 'Nothing Before Coffee', tag: 'Speciality Coffee' },
  { name: 'Kings of Rolls', tag: 'Street Food & QSR' },
  { name: 'Pizzeria', tag: 'Italian Quick Service' },
  { name: 'Doner Shack', tag: 'Fast-Casual Kebabs' },
  { name: 'Suto', tag: 'Asian Quick Gourmet' },
  { name: 'Zorko', tag: 'Fast Food Franchise' },
  { name: 'Chai Factory', tag: 'Tea & Quick Refreshment' },
];

export default function BrandMarquee({ title = 'Trusted by India\'s Leading QSR & Hospitality Brands' }) {
  // Duplicate for seamless infinite loop
  const brandsList = [...PARTNER_BRANDS, ...PARTNER_BRANDS];

  return (
    <div className="w-full py-8 md:py-12 bg-slate-900 text-white overflow-hidden relative border-y border-slate-800">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 pointer-events-none" />

      {/* Header badge */}
      {title && (
        <div className="max-w-7xl mx-auto px-4 text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Industry Connections & Placement Alliances</span>
          </div>
          <h3 className="text-sm md:text-base font-medium text-slate-300 mt-2">
            {title}
          </h3>
        </div>
      )}

      {/* Left/Right gradient fade masks for smooth transition */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-4 md:gap-6 py-2">
          {brandsList.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex-shrink-0 group cursor-pointer transition-all duration-300"
            >
              <div className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-amber-500/50 shadow-sm transition-all duration-300 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-slate-100 text-sm md:text-base tracking-wide group-hover:text-amber-400 transition-colors whitespace-nowrap">
                    {brand.name}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                    {brand.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
