import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface OrderPageProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
  };
}

const OrderPage = ({ plan }: OrderPageProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  
  const basePrice = parseInt(plan.price.replace('₽', ''));
  
  const periods = [
    { months: 1, discount: 0, label: '1 месяц' },
    { months: 3, discount: 5, label: '3 месяца' },
    { months: 6, discount: 10, label: '6 месяцев' },
    { months: 12, discount: 15, label: '12 месяцев' }
  ];

  const calculatePrice = (months: number, discount: number) => {
    const discountedPrice = basePrice * (1 - discount / 100);
    return Math.round(discountedPrice * months);
  };

  const specs = {
    cores: plan.features[0]?.split(' ')[0] || '1',
    ram: plan.features[1]?.split(' ')[0] || '1',
    nvme: plan.features[2]?.split(' ')[0] || '20'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          
          {/* Specs in top right */}
          <Card className="w-64 border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Характеристики</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ядра CPU:</span>
                <Badge variant="secondary">{specs.cores}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">RAM:</span>
                <Badge variant="secondary">{specs.ram} GB</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">NVMe:</span>
                <Badge variant="secondary">{specs.nvme} GB</Badge>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between items-center font-semibold">
                <span>Итого:</span>
                <span className="text-lg text-primary">
                  {calculatePrice(selectedPeriod, periods.find(p => p.months === selectedPeriod)?.discount || 0)}₽
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Selected Plan */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CardTitle className="text-3xl">{plan.name}</CardTitle>
                {plan.popular && (
                  <Badge className="bg-primary">Популярный</Badge>
                )}
              </div>
              <CardDescription className="text-lg">{plan.description}</CardDescription>
              
              {/* Location */}
              <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">🇷🇺</span>
                <span className="font-semibold text-blue-800">Смоленск</span>
              </div>
            </CardHeader>
          </Card>

          {/* Period Selection */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Пополнить баланс</CardTitle>
              <CardDescription>Выберите период оплаты</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {periods.map((period) => {
                  const totalPrice = calculatePrice(period.months, period.discount);
                  const isSelected = selectedPeriod === period.months;
                  
                  return (
                    <Card 
                      key={period.months}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'ring-2 ring-primary scale-105 shadow-lg' 
                          : 'hover:shadow-md hover:scale-102'
                      }`}
                      onClick={() => setSelectedPeriod(period.months)}
                    >
                      <CardContent className="p-4 text-center">
                        {period.discount > 0 && (
                          <Badge className="mb-2 bg-green-100 text-green-800">
                            -{period.discount}%
                          </Badge>
                        )}
                        <div className="text-lg font-semibold mb-1">{period.label}</div>
                        <div className="text-2xl font-bold text-primary">
                          {totalPrice}₽
                        </div>
                        {period.months > 1 && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {Math.round(totalPrice / period.months)}₽/мес
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Итого к оплате</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>План {plan.name}</span>
                  <span>{plan.price}/мес</span>
                </div>
                <div className="flex justify-between">
                  <span>Период</span>
                  <span>{periods.find(p => p.months === selectedPeriod)?.label}</span>
                </div>
                {periods.find(p => p.months === selectedPeriod)?.discount! > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка</span>
                    <span>-{periods.find(p => p.months === selectedPeriod)?.discount}%</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>К оплате:</span>
                  <span className="text-primary">
                    {calculatePrice(selectedPeriod, periods.find(p => p.months === selectedPeriod)?.discount || 0)}₽
                  </span>
                </div>
              </div>
              
              <Button className="w-full mt-6 text-lg py-6">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оплатить
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;