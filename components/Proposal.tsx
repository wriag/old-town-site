export default function Proposal() {
  return (
    <section id="proposal" className="bg-bg py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-accent uppercase text-[11px] tracking-[0.15em] mb-4">The Proposal</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] text-text mb-12">
          Zero local business-income taxes. One district. Ten years.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-bg-surface border border-border rounded-lg p-6">
            <h3 className="font-display font-bold text-lg text-text mb-4">What Changes</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'City Business License Tax', from: '2.6%' },
                { label: 'County Business Income Tax', from: '2.0%' },
                { label: 'Metro SHS Tax', from: '1.0%' },
              ].map((item) => (
                <li key={item.label} className="flex items-center justify-between">
                  <span className="text-text-muted">{item.label}</span>
                  <span>
                    <s className="text-text-muted">{item.from}</s>
                    {' → '}
                    <strong className="text-accent">0%</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-surface border border-border rounded-lg p-6">
            <h3 className="font-display font-bold text-lg text-text mb-4">What Stays</h3>
            <ul className="space-y-2 text-sm text-text-muted list-disc list-inside">
              <li>Oregon state income tax (unchanged)</li>
              <li>Federal income tax (unchanged)</li>
              <li>Property taxes (unchanged)</li>
              <li>All business regulations and licensing requirements</li>
              <li>All safety, labor, and environmental standards</li>
            </ul>
          </div>
        </div>

        <div className="border-l-4 border-accent bg-bg-surface rounded-lg p-6 mb-12">
          <p className="font-bold text-text mb-2">10-year commitment.</p>
          <p className="text-text-muted text-sm">
            Any reintroduction of local business income taxes within the zone requires a supermajority
            vote of the relevant governing body. Duration matters because investment decisions are not
            made year-to-year. A business deciding whether to sign a 5-year lease, hire staff, or
            renovate a space needs confidence that the tax environment will hold. A decade-long
            legislative commitment — with a supermajority requirement to reverse — converts a policy
            gesture into a credible economic signal.
          </p>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <span className="text-6xl text-accent leading-none select-none">&ldquo;</span>
          <p className="font-display font-bold text-2xl md:text-3xl text-text tracking-[-0.02em] -mt-4">
            This is not a giveaway. It&apos;s removing barriers so people can build again.
          </p>
          <span className="text-6xl text-accent leading-none select-none">&rdquo;</span>
        </div>
      </div>
    </section>
  );
}
