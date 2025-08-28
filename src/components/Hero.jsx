import React from 'react';
import { getAccentClasses } from '../utils/accent';

export default function Hero({ accent = 'green', waLink = 'https://wa.me/27820000000?text=Hi+Jobsta' }) {
  const accentClasses = getAccentClasses(accent);

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className={`h-72 w-72 rounded-full blur-3xl opacity-20 animate-pulse ${accentClasses.bg}`}></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-6 py-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span role="img" aria-label="phone">📲</span> Find Jobs on WhatsApp
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl">
            Job alerts sent directly to your phone — no apps, no stress.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-black shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-4 ${accentClasses.bg} ${accentClasses.focusRing}`}
            >
              Get Started on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

