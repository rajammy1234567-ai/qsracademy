import React from 'react';
import { Link } from 'react-router-dom';
import BrandMarquee, { PARTNER_BRANDS } from '../components/BrandMarquee';
import {
  Sparkles,
  Building2,
  Handshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function Partners() {
  const brandDescriptions = [
    { name: 'Rasna Buzz', category: 'Beverage & Mocktail QSR', desc: 'National beverage kiosks known for instant refreshment drinks, shakes, and desserts.' },
    { name: 'Millies Cookies', category: 'Bakery & Confectionery', desc: 'World-famous gourmet freshly-baked cookies, muffins, and premium hot beverages.' },
    { name: 'Ritaza', category: 'Café & Casual Dining', desc: 'Artisanal beverages, specialty sandwiches, and warm hospitality spaces.' },
    { name: 'Roll Express', category: 'Fast Casual Rolls & Wraps', desc: 'High-volume street roll concepts delivering consistent flavor and rapid prep times.' },
    { name: 'Nothing Before Coffee', category: 'Speciality Coffee Chain', desc: 'One of India’s fastest-scaling coffee chains bringing third-wave brews to high-street retail.' },
    { name: 'Kings of Rolls', category: 'Street Food & Quick Bites', desc: 'Authentic kathi rolls, quick snacks, and efficient kitchen line execution.' },
    { name: 'Pizzeria', category: 'Italian Quick Service', desc: 'Wood-fired & stone-baked pizza formats focusing on speed and temperature preservation.' },
    { name: 'Doner Shack', category: 'Fast Casual Kebabs', desc: 'European-style doner kebabs, fresh pita, and automated rotisserie operations.' },
    { name: 'Suto', category: 'Asian Quick Gourmet', desc: 'Wok-tossed noodles, dim sums, and express oriental dining.' },
    { name: 'Zorko', category: 'Fast Food Franchise', desc: 'Value-for-money burgers, pizzas, and shakes with extensive tier-2/3 franchise footprints.' },
    { name: 'Chai Factory', category: 'Tea & Quick Refreshments', desc: 'Traditional kulhad chai, buns, and high-frequency tea lounge outlets.' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 md:py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Handshake className="w-3.5 h-3.5" />
            <span>Placement & Brand Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Our Industry Partners
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed font-normal">
            “We are proud to collaborate with some of the most exciting and fast-growing brands in India's QSR, Food & Beverage, Café and Retail Food industry.”
          </p>
        </div>
      </section>

      {/* Infinite Marquee */}
      <BrandMarquee title="Actively hiring our certified candidates and providing practical exposure" />

      {/* Grid of Partners */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-heading font-extrabold text-slate-900">
              Featured Food & Beverage Brands
            </h2>
            <p className="text-sm text-slate-600">
              Our students receive priority interview placements across these prominent culinary innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandDescriptions.map((brand) => (
              <div
                key={brand.name}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                      {brand.category}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-xl">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {brand.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Hiring & Placement Partner</span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>

          {/* Become a partner banner */}
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-heading font-bold">
                Are you a QSR or Café Brand looking to partner?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Partner with QSR Academy to access trained manpower, conduct campus interviews, or set up customized menu training modules.
              </p>
            </div>
            <Link
              to="/hire-talent"
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex-shrink-0 transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
