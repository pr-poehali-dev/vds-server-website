import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderPage from '@/components/OrderPage';

const Order = () => {
  const [searchParams] = useSearchParams();
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    const planName = searchParams.get('plan');
    
    const plans = [
      {
        name: 'Basic',
        price: '499₽',
        period: '/мес',
        description: 'Идеально для личных проектов',
        features: ['1 vCPU', '1 GB RAM', '20 GB SSD', '100 Мбит/с', '24/7 поддержка'],
        popular: false
      },
      {
        name: 'Pro',
        price: '999₽',
        period: '/мес',
        description: 'Для малого и среднего бизнеса',
        features: ['2 vCPU', '4 GB RAM', '80 GB SSD', '200 Мбит/с', '24/7 поддержка', 'Бесплатные бэкапы'],
        popular: true
      },
      {
        name: 'Business',
        price: '1699₽',
        period: '/мес',
        description: 'Для растущего бизнеса',
        features: ['4 vCPU', '8 GB RAM', '120 GB SSD', '500 Мбит/с', '24/7 поддержка', 'Бесплатные бэкапы', 'SSL сертификат'],
        popular: false
      },
      {
        name: 'Enterprise',
        price: '2499₽',
        period: '/мес',
        description: 'Для крупных проектов',
        features: ['8 vCPU', '16 GB RAM', '240 GB SSD', '1 Гбит/с', '24/7 поддержка', 'Бесплатные бэкапы', 'Dedicated IP', 'Managed сервис'],
        popular: false
      }
    ];

    const selectedPlan = plans.find(plan => plan.name === planName);
    
    if (selectedPlan) {
      setPlanData(selectedPlan);
    } else {
      // Если план не найден, перенаправляем на главную
      window.location.href = '/';
    }
  }, [searchParams]);

  if (!planData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return <OrderPage plan={planData} />;
};

export default Order;