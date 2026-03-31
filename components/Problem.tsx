const taxRows = [
  { tax: 'City of Portland Business License Tax', rate: '2.6%', authority: 'City of Portland' },
  { tax: 'Multnomah County Business Income Tax', rate: '2.0%', authority: 'Multnomah County' },
  { tax: 'Metro Supportive Housing Services Tax', rate: '1.0%', authority: 'Metro' },
];

const stats = [
  { value: '5.6%', label: 'combined local business-income tax before state/federal' },
  { value: '3', label: 'overlapping local taxes: municipal + county + regional' },
  { value: '0', label: 'net reversal of decline after years of urban renewal' },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-bg-alt py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-accent uppercase text-[11px] tracking-[0.15em] mb-4">The Problem</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] text-text mb-12">
          The current approach isn&apos;t working.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.value} className="bg-bg-surface border border-border rounded-lg p-6">
              <div className="font-display font-bold text-accent" style={{ fontSize: 'clamp(64px, 10vw, 120px)', lineHeight: 1 }}>
                {s.value}
              </div>
              <p className="text-text-muted mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="border border-border rounded-lg overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-surface text-left">
                <th className="px-4 py-3 font-bold text-text">Tax</th>
                <th className="px-4 py-3 font-bold text-text">Rate</th>
                <th className="px-4 py-3 font-bold text-text">Authority</th>
              </tr>
            </thead>
            <tbody>
              {taxRows.map((row, i) => (
                <tr key={row.tax} className={i % 2 === 0 ? 'bg-bg' : 'bg-bg-surface'}>
                  <td className="px-4 py-3 text-text">{row.tax}</td>
                  <td className="px-4 py-3 text-accent font-bold">{row.rate}</td>
                  <td className="px-4 py-3 text-text-muted">{row.authority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="max-w-3xl space-y-4 text-text-muted">
          <p>
            Old Town / Chinatown is one of Portland&apos;s oldest neighborhoods and among its most
            persistently distressed. Decades of urban renewal programs, public investment, and policy
            interventions have not reversed a pattern of disinvestment, vacancy, and population
            decline. The district&apos;s challenges are real and well-documented — what remains
            untested is a fundamentally different economic approach.
          </p>
          <p>
            Part of the challenge is structural. Portland-area businesses face a layered local tax
            obligation that compounds before state or federal obligations begin: three overlapping
            local taxes — totaling 5.6 percent in combined business-income taxation. For a small
            business operating on thin margins in a high-cost, low-foot-traffic district, this load
            is not abstract. It is the difference between opening and not opening.
          </p>
        </div>
      </div>
    </section>
  );
}
