
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Plans from '@/components/Plans';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Проверяем URL-параметры для автоматического открытия модального окна
    const login = searchParams.get('login');
    const register = searchParams.get('register');
    
    if (login === 'true') {
      // Отправляем событие для открытия модального окна входа
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'login' } }));
    } else if (register === 'true') {
      // Отправляем событие для открытия модального окна регистрации
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'register' } }));
    }
  }, [searchParams]);

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