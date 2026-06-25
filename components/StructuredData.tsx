import { faqItems } from '@/lib/faq';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

// JSON-LD structured data. Helps both classic search engines (rich results)
// and AI/LLM answer engines parse the proposal: what it is, who is behind it,
// the FAQ, and the formal policy paper.
export default function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#org`,
        name: SITE_NAME,
        url: SITE_URL,
        email: 'info@oldtownfreedistpdx.org',
        description: SITE_DESCRIPTION,
        areaServed: {
          '@type': 'Place',
          name: 'Old Town / Chinatown, Portland, Oregon',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#org` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/#policy-paper`,
        headline:
          'Old Town Free Enterprise District: A Zero Business-Income-Tax Zone for Portland',
        description:
          "A formal policy proposal to designate Portland's Old Town / Chinatown a zero local business-income-tax zone for ten years to reverse economic disinvestment.",
        about: [
          'Portland economic policy',
          'business tax policy',
          'Old Town Chinatown revitalization',
          'homelessness and public safety',
          'business diaspora in Portland',
        ],
        url: `${SITE_URL}/#paper`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: { '@id': `${SITE_URL}/#org` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
