import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Plans from '@/components/Plans';
import Dashboard from '@/components/Dashboard';
import FAQ from '@/components/FAQ';


import Footer from '@/components/Footer';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main className="container mx-auto px-4 py-8">
        {isLoggedIn && activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <div className="space-y-16">
            <Hero setActiveTab={setActiveTab} />
            <Plans />
            <Features />
            <FAQ />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;