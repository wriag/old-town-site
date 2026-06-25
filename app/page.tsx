import dynamic from 'next/dynamic';
import StructuredData from '@/components/StructuredData';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Proposal from '@/components/Proposal';
import WhyItWorks from '@/components/WhyItWorks';
import FAQ from '@/components/FAQ';
import Press from '@/components/Press';
import Footer from '@/components/Footer';

const PaperReader = dynamic(() => import('@/components/PaperReader'), { ssr: false });

export default function Page() {
  return (
    <main>
      <StructuredData />
      <Nav />
      <Hero />
      <Problem />
      <Proposal />
      <WhyItWorks />
      <FAQ />
      <section id="paper" className="bg-bg-alt py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-mono text-accent uppercase text-[11px] tracking-[0.15em] mb-4">The Full Proposal</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] text-text mb-8">
            Read the formal policy paper.
          </h2>
          <PaperReader />
        </div>
      </section>
      <Press />
      <Footer />
    </main>
  );
}
