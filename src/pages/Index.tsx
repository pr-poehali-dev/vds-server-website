
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Plans from '@/components/Plans';

import FAQ from '@/components/FAQ';


import Footer from '@/components/Footer';

const Index = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-16">
          <Hero />
          <Plans />
          <Features />
          <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;