"use client";
import { useCallback, useEffect, useRef, useState } from 'react';

const items = [
  {
    q: "Isn't this just a tax giveaway to businesses?",
    a: "Taxes can only be collected from businesses that exist and are profitable. A distressed district with vacant storefronts produces no local business-income tax revenue. Removing a barrier that prevents businesses from forming isn't a giveaway — it's clearing the ground so revenue can eventually grow. A business that opens, employs people, and pays property taxes, payroll taxes, and state and federal obligations is already contributing more than an empty storefront.",
  },
  {
    q: "Won't this reduce funding for public services?",
    a: "The district's current contribution to local business-income tax revenue is minimal because business activity is minimal. The question is not whether to tax a thriving district — it's whether a zero-revenue approach is preferable to a low-tax approach that restores activity. As businesses open and grow, property tax revenue, employment tax receipts, and broader economic activity all increase, often exceeding foregone business-income tax revenue within a few years.",
  },
  {
    q: "Why should Old Town get special treatment?",
    a: "Old Town isn't receiving special treatment — it's receiving different treatment in response to different conditions. Standard policy has not reversed the district's decline. A zone designation is a targeted response to a documented failure: decades of investment, outreach, and study have not moved the needle. The question isn't why Old Town deserves this — it's why we'd expect the same approach to finally work.",
  },
  {
    q: "Why not use grants or subsidies instead?",
    a: "Grants require bureaucratic application, approval cycles, compliance documentation, and ongoing reporting. They direct resources toward those skilled at grant-writing rather than those most likely to build a lasting business. Subsidies create dependency and distort market signals. Tax reduction requires no application, favors no single sector, and creates no ongoing obligation from government. It lets entrepreneurs allocate capital to what works rather than to what qualifies.",
  },
  {
    q: "Does this mean less accountability for businesses?",
    a: "No. Every regulation — safety codes, labor law, environmental standards, zoning, licensing — remains fully in effect. Local business-income tax rates are not a mechanism for business accountability; they are a revenue mechanism. This proposal removes a revenue barrier; it changes nothing about the standards businesses must meet to operate.",
  },
  {
    q: "What evidence is there that this would work?",
    a: "Ireland's Celtic Tiger period produced 9.4% annual GDP growth after a decisive cut to a 12.5% corporate rate. Estonia has maintained zero tax on retained profits since 2000 and consistently ranks among the most investment-friendly economies in Europe. Nordic countries reduced corporate rates substantially while maintaining public investment — disproving the assumption that lower taxes require service cuts. The mechanism is straightforward: lower marginal cost of operating a business increases the number of businesses that can survive, which increases employment, property values, and the overall tax base.",
  },
  {
    q: "Does this address homelessness or public safety directly?",
    a: "Not directly. But economic conditions and public safety are correlated. A district with active storefronts, foot traffic at all hours, and economically engaged residents creates an environment hostile to disorder. Decades of urban renewal focused on social services have not restored the district. This proposal addresses the economic disinvestment that underlies many of the conditions residents and workers find difficult. It is one tool — not the only one.",
  },
  {
    q: "What's the core argument in one sentence?",
    a: "Old Town has been taxed like a thriving district while treated like a forgotten one — removing the local tax burden for a defined period is the minimum condition for a fair chance at recovery.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [answerHeights, setAnswerHeights] = useState<number[]>(new Array(items.length).fill(0));

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
                role="button"
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
