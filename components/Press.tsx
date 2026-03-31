const keyFacts = [
  'Location: Old Town / Chinatown neighborhood, Portland, Oregon',
  'Proposal type: Local business-income-tax zone designation (zero rate for 10 years)',
  'Status: Community proposal — not yet before city council',
  'What changes: City, County, and Metro local business-income taxes → 0% within the zone',
  'What stays: All state taxes, federal taxes, property taxes, regulations, licensing',
  'Fiscal context: Combined current local rate is 5.6% (City 2.6% + County 2% + Metro SHS 1%)',
  'Success metric: New business formation, employment growth, property value recovery within 5 years',
];

export default function Press() {
  return (
    <section id="press" className="bg-bg py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-accent uppercase text-[11px] tracking-[0.15em] mb-4">For Press</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] text-text mb-12">
          Covering Old Town? Here&apos;s what you need.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="font-display font-bold text-lg text-text mb-4">Key Facts</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              {keyFacts.map((fact) => (
                <li key={fact} className="flex gap-2">
                  <span className="text-accent shrink-0">—</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-surface border border-border rounded-lg p-6">
            <h3 className="font-display font-bold text-lg text-text mb-4">Media Inquiries</h3>
            <a href="mailto:press@oldtownfreedist.org" className="text-accent underline">
              press@oldtownfreedist.org
            </a>
            <p className="text-text-muted text-sm mt-3">
              Available for background briefings and walking tours of the district.
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <a
            href="/portland-old-town.pdf"
            download="portland-old-town-policy-memo.pdf"
            className="border border-border text-text px-6 py-3 rounded-md text-sm hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Download Policy Memo (PDF)
          </a>
          <a
            href="/portland-old-town.pdf"
            download="portland-old-town-one-pager.pdf"
            className="border border-border text-text px-6 py-3 rounded-md text-sm hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Download One-Pager (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
