import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Proposal from '@/components/Proposal';
import WhyItWorks from '@/components/WhyItWorks';

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Proposal />
      <WhyItWorks />
    </main>
  );
}
