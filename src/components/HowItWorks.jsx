import React from 'react';
import useInView from '../hooks/useInView';

const steps = [
  {
    title: 'Click the button',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m6-6H6" />
      </svg>
    ),
  },
  {
    title: 'Answer questions on WhatsApp',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h6M5 20l4-4h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l2 2z" />
      </svg>
    ),
  },
  {
    title: 'Get weekly job alerts that match you',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView();

  return (
    <section className="bg-black text-white py-16" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className="mb-3 text-white/90">{step.icon}</div>
              <p className="text-sm sm:text-base text-white/80 max-w-[16rem]">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

