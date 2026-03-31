const cards = [
  {
    flag: '🇮🇪',
    country: 'Ireland',
    stats: [
      '9.4% average annual GDP growth, 1995–2000',
      'Corporate rate cut to 12.5% from ~40%',
      'Unemployment: 18% → under 4% within a decade',
    ],
    takeaway: 'A credible, time-consistent low-tax commitment attracted multinational investment and transformed a stagnant economy into the fastest-growing in Europe.',
  },
  {
    flag: '🇸🇪',
    country: 'Nordic Countries',
    stats: [
      'Sweden reduced corporate rate: ~60% (1980s) → 22% (2013)',
      'Finland reducing rate to 18% in 2025',
      'Lower rates paired with strong public institutions',
    ],
    takeaway: 'Scandinavian countries maintained social investment while reducing corporate rates, demonstrating that the trade-off between tax cuts and public services is a policy choice, not a physical law.',
  },
  {
    flag: '🇪🇪',
    country: 'Estonia',
    stats: [
      'Zero tax on retained and reinvested profits since 2000',
      'Tax triggered only on distributed dividends',
      'Consistently top-ranked for business investment climate',
    ],
    takeaway: "Taxing accumulation rather than activity removes the disincentive to grow — this model rewards reinvestment and has produced durable economic dynamism.",
  },
];

export default function WhyItWorks() {
  return (
    <section id="why" className="bg-bg-alt py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-accent uppercase text-[11px] tracking-[0.15em] mb-4">International Evidence</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] text-text mb-12">
          Places that welcome businesses grow.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card) => (
            <div key={card.country}
              className="bg-bg-surface border border-border rounded-lg p-6 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all duration-150 ease-out">
              <h3 className="font-display font-bold text-xl text-text">
                {card.flag} {card.country}
              </h3>
              <ul className="space-y-1 text-sm text-text-muted list-disc list-inside">
                {card.stats.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <p className="text-sm text-text-muted italic border-t border-border pt-4">
                {card.takeaway}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center font-bold text-lg text-text">
          Places that respect capital formation prosper. Those that punish it stagnate.
        </p>
      </div>
    </section>
  );
}
