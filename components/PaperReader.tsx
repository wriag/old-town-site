"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const TAB_RANGES = {
  paper:     { start: 2,  end: 14, label: 'Full Paper' },
  abstract:  { start: 15, end: 17, label: 'Academic Abstract' },
  lawreview: { start: 29, end: 32, label: 'Law Review Version' },
} as const;

type TabId = keyof typeof TAB_RANGES;
const tabIds: TabId[] = ['paper', 'abstract', 'lawreview'];

export default function PaperReader() {
  const [activeTab, setActiveTab] = useState<TabId>('paper');
  const [pageByTab, setPageByTab] = useState<Record<TabId, number>>({
    paper: TAB_RANGES.paper.start,
    abstract: TAB_RANGES.abstract.start,
    lawreview: TAB_RANGES.lawreview.start,
  });
  const [loadError, setLoadError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    setContainerWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  const handleTabKey = useCallback((e: React.KeyboardEvent, id: TabId) => {
    const idx = tabIds.indexOf(id);
    if (e.key === 'ArrowRight') { e.preventDefault(); setActiveTab(tabIds[(idx + 1) % tabIds.length]); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); setActiveTab(tabIds[(idx - 1 + tabIds.length) % tabIds.length]); }
    if (e.key === 'Home')       { e.preventDefault(); setActiveTab(tabIds[0]); }
    if (e.key === 'End')        { e.preventDefault(); setActiveTab(tabIds[tabIds.length - 1]); }
  }, []);

  const range = TAB_RANGES[activeTab];
  const currentPage = pageByTab[activeTab];
  const pageInRange = currentPage - range.start + 1;
  const totalInRange = range.end - range.start + 1;

  const prevPage = useCallback(() =>
    setPageByTab(p => ({ ...p, [activeTab]: p[activeTab] - 1 })), [activeTab]);
  const nextPage = useCallback(() =>
    setPageByTab(p => ({ ...p, [activeTab]: p[activeTab] + 1 })), [activeTab]);

  return (
    <>
      {/* Mobile fallback — rendered first in DOM so a[download].first() resolves to this visible link on mobile */}
      <div className="block md:hidden text-center py-8">
        <p className="text-text-muted mb-6">Download the full proposal to read on your device.</p>
        <a
          href="/portland-old-town.pdf"
          download
          className="bg-accent text-bg font-bold px-6 py-3 rounded-md inline-block hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        >
          Download Full Proposal (PDF)
        </a>
      </div>

      {/* Desktop viewer */}
      <div className="hidden md:block">
        {/* Tabs */}
        <div role="tablist" className="flex gap-1 border-b border-border mb-4">
          {tabIds.map((id) => (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              tabIndex={activeTab === id ? 0 : -1}
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              onClick={() => setActiveTab(id)}
              onKeyDown={(e) => handleTabKey(e, id)}
              className={`px-4 py-2 text-sm border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 -mb-px ${
                activeTab === id
                  ? 'font-bold text-text border-accent'
                  : 'text-text-muted hover:text-text border-transparent'
              }`}
            >
              {TAB_RANGES[id].label}
            </button>
          ))}
        </div>

        {/* Tab panels — all three always in DOM so aria-controls resolves */}
        {tabIds.map((id) => (
          <div
            key={id}
            role="tabpanel"
            id={`panel-${id}`}
            aria-labelledby={`tab-${id}`}
            hidden={id !== activeTab}
            ref={id === activeTab ? containerRef : undefined}
            className="h-[700px] overflow-y-auto rounded-lg border border-border"
          >
            {id === activeTab && (
              !loadError ? (
                <Document
                  file="/portland-old-town.pdf"
                  onLoadError={() => setLoadError(true)}
                >
                  <Page
                    pageNumber={currentPage}
                    width={containerWidth || undefined}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border border-accent rounded-lg p-8 text-center">
                  <p className="text-text-muted mb-4">Unable to load PDF.</p>
                  <a href="/portland-old-town.pdf" download className="text-accent underline">
                    Download instead →
                  </a>
                </div>
              )
            )}
          </div>
        ))}

        {/* Page controls */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage <= range.start}
            aria-label="Previous page"
            className="border border-border text-text px-4 py-2 rounded-md text-sm hover:border-accent hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            ← Previous
          </button>
          <span className="text-text-muted text-sm">Page {pageInRange} of {totalInRange}</span>
          <button
            onClick={nextPage}
            disabled={currentPage >= range.end}
            aria-label="Next page"
            className="border border-border text-text px-4 py-2 rounded-md text-sm hover:border-accent hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Next →
          </button>
          <a href="/portland-old-town.pdf" download className="ml-auto text-accent underline text-sm">
            Download PDF
          </a>
        </div>
      </div>

    </>
  );
}
