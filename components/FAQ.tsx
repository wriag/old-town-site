"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { faqItems as items } from '@/lib/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [answerHeights, setAnswerHeights] = useState<(number | string)[]>(
    new Array(items.length).fill(0).map((_, i) => (i === 0 ? 'auto' : 0))
  );

  useEffect(() => {
    setAnswerHeights(answerRefs.current.map((ref) => ref?.scrollHeight ?? 0));
  }, []);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }, []);

  return (
    <section id="faq" className="bg-bg py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-accent uppercase text-[11px] tracking-[0.15em] mb-4">Common Questions</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] text-text mb-12">
          We&apos;ve heard the objections.
        </h2>

        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i}
              className={`rounded-md border-l-4 bg-bg-surface ${openIndex === i ? 'border-accent' : 'border-transparent'}`}>
              <button
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                onClick={() => toggle(i)}
                className="w-full text-left flex justify-between items-center py-4 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <span className="font-bold text-text pr-4">{item.q}</span>
                <svg
                  aria-hidden="true"
                  className={`shrink-0 w-5 h-5 text-text-muted transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                ref={(el) => { answerRefs.current[i] = el; }}
                style={{ height: openIndex === i ? answerHeights[i] : 0 }}
                className="overflow-hidden transition-[height] duration-200 ease-out"
              >
                <p className="px-4 pb-4 text-text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
