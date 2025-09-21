import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import OrderModal from './OrderModal';

const Plans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const plans = [
    {
      name: 'Basic',
      price: '499₽',
      period: '/мес',
      description: 'Идеально для личных проектов',
      features: ['1 vCPU', '1 GB RAM', '20 GB NVMe', '1 Гбит/с', '24/7 поддержка'],
      popular: false
    },
    {
      name: 'Pro',
      price: '999₽',
      period: '/мес',
      description: 'Для малого и среднего бизнеса',
      features: ['2 vCPU', '4 GB RAM', '80 GB NVMe', '1 Гбит/с', '24/7 поддержка', 'Бесплатные бэкапы'],
      popular: true
    },
    {
      name: 'Business',
      price: '1699₽',
      period: '/мес',
      description: 'Для растущего бизнеса',
      features: ['4 vCPU', '8 GB RAM', '120 GB NVMe', '1 Гбит/с', '24/7 поддержка', 'Бесплатные бэкапы', 'SSL сертификат'],
      popular: false
    },
    {
      name: 'Enterprise',
      price: '2499₽',
      period: '/мес',
      description: 'Для крупных проектов',
      features: ['8 vCPU', '16 GB RAM', '240 GB NVMe', '1 Гбит/с', '24/7 поддержка', 'Бесплатные бэкапы', 'Dedicated IP', 'Managed сервис'],
      popular: false
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Выберите тарифный план</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Гибкие тарифы для проектов любого масштаба. Все планы включают SSD диски и круглосуточную поддержку
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={plan.name} 
            className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in ${
              plan.popular ? 'ring-2 ring-primary scale-105' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Популярный
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Icon name="Check" size={16} className="text-primary mr-3" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleSelectPlan(plan)}
              >
                Выбрать план
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <OrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
};

export default Plans;