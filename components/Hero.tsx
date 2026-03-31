"use client";
import { useEffect, useState } from 'react';

export default function Hero() {
  const [arrowVisible, setArrowVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setArrowVisible(window.scrollY <= 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center py-16 md:py-24 max-w-5xl mx-auto px-6">
      <p className="font-mono text-accent uppercase text-[11px] tracking-[0.15em] mb-4">
        Portland Old Town / Chinatown
      </p>
      <h1 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.03em] text-text mb-6 max-w-3xl">
        Old Town Doesn&apos;t Need Another Study. It Needs a Chance.
      </h1>
      <p className="text-xl text-text-muted mb-10 max-w-2xl">
        A proposal to make Portland&apos;s Old Town / Chinatown a zero local business-income-tax
        zone — and give entrepreneurs room to rebuild what bureaucracy couldn&apos;t.
      </p>
      <div className="flex gap-4 flex-wrap">
        <a href="#proposal"
          className="bg-accent text-bg font-bold px-6 py-3 rounded-md hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]">
          Read the Proposal
        </a>
        <a href="#paper"
          className="border border-border text-text px-6 py-3 rounded-md hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]">
          Read the Full Paper
        </a>
      </div>
      <div
        aria-hidden="true"
        className={`mt-16 text-accent text-2xl animate-bounce transition-opacity duration-300 ${arrowVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        ↓
      </div>
    </section>
  );
}
