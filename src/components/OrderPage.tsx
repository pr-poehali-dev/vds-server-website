import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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
  const [selectedPeriod, setSelectedPeriod] = useState("3");
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  
  const basePrice = parseInt(plan.price.replace('₽', ''));
  
  const periods = [
    { value: "1", label: "1 месяц", price: basePrice, discount: 0 },
    { value: "3", label: "3 месяца", price: Math.round(basePrice * 0.95), discount: 20 },
    { value: "6", label: "6 месяцев", price: Math.round(basePrice * 0.9), discount: 25 },
    { value: "12", label: "12 месяцев", price: Math.round(basePrice * 0.85), discount: 30 }
  ];

  const selectedPeriodData = periods.find(p => p.value === selectedPeriod);
  const monthlyPrice = selectedPeriodData?.price || basePrice;
  const totalPrice = monthlyPrice * parseInt(selectedPeriod) * quantity;
  const originalPrice = basePrice * parseInt(selectedPeriod) * quantity;
  const savings = originalPrice - totalPrice;

  const specs = {
    cores: plan.features[0]?.split(' ')[0] || '1',
    ram: plan.features[1]?.split(' ')[0] || '1',
    nvme: plan.features[2]?.split(' ')[0] || '20'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Plan Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="Server" size={24} className="text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">VDS {plan.name} 10.0</h1>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇷🇺</span>
                  <span className="text-gray-600">Москва</span>
                </div>
              </div>
              <div className="ml-auto text-right text-gray-500 text-sm">
                <div>CPU: {specs.cores}ядер RAM: {specs.ram}ГБ SSD: {specs.nvme}ГБ</div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="Trash2" size={16} />
              </Button>
            </div>

            {/* Payment Period */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Clock" size={16} />
                <span className="font-medium">Пополнить баланс:</span>
              </div>
              
              <div className="relative inline-block">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label} {period.price * parseInt(period.value)}₽
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPeriodData?.discount! > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    -{selectedPeriodData.discount}%
                  </div>
                )}
              </div>
              
              <button className="text-green-600 text-sm mt-2 underline">
                Как списываются деньги за услуги?
              </button>
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <span className="font-medium">Кол-во:</span>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="text-xl font-bold">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
                <span className="text-2xl font-bold ml-8">{totalPrice}₽</span>
              </div>
            </div>

            {/* Configure Tariff */}
            <Button variant="outline" className="w-full justify-center">
              Настроить тариф
              <Icon name="ChevronDown" size={16} className="ml-2" />
            </Button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            
            {/* Price Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="text-right mb-4">
                  <div className="text-3xl font-bold">{totalPrice}₽</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Услуги (1 шт.)</span>
                    <span className="text-gray-400">+{originalPrice}₽</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка</span>
                      <span>-{savings}₽</span>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">ПРОМОКОД</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="XXXXXXXX"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" className="bg-green-500 text-white border-green-500 hover:bg-green-600">
                      Применить
                    </Button>
                  </div>
                </div>

                {/* Pay Button */}
                <Button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white text-lg py-6">
                  Оплатить
                </Button>
              </CardContent>
            </Card>

            {/* Итого Label */}
            <div className="text-right">
              <span className="text-lg font-medium">Итого</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;