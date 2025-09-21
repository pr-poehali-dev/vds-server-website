import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
  } | null;
}

const OrderModal = ({ isOpen, onClose, plan }: OrderModalProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("3");
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!plan) return null;
  
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

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const paymentData = {
        amount: totalPrice,
        planName: plan.name,
        quantity: quantity,
        period: selectedPeriod
      };

      const response = await fetch('https://functions.poehali.dev/4d04c70a-4ea3-4f73-a267-f1c35a8e3b47', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      
      if (response.ok && result.payment_url) {
        // Redirect to payment gateway
        window.open(result.payment_url, '_blank');
      } else {
        alert('Ошибка при создании платежа. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ошибка при создании платежа. Попробуйте еще раз.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <span>Заказ сервера</span>
        </DialogHeader>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Plan Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Server" size={24} className="text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{plan.name}</h1>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-300 flex flex-col">
                      <div className="h-1/3 bg-white"></div>
                      <div className="h-1/3 bg-blue-600"></div>
                      <div className="h-1/3 bg-red-600"></div>
                    </div>
                    <span className="text-gray-600">Смоленск</span>
                  </div>
                </div>
                <div className="ml-auto text-right text-gray-500 text-sm">
                  <div>{plan.features[0]}, {plan.features[1]}, {plan.features[2]}</div>
                </div>

              </div>

              {/* Payment Period */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Clock" size={16} />
                  <span className="font-medium">Пополнить баланс:</span>
                </div>
                
                <div className="relative inline-block">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-full max-w-xs focus:ring-0 focus:ring-offset-0 focus:outline-none border-gray-300">
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
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Итого</span>
                    <div className="text-3xl font-bold">{totalPrice}₽</div>
                  </div>
                  
                  <hr className="mb-4" />
                  
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



                  {/* Pay Button */}
                  <Button 
                    className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white text-lg py-6"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Обработка...' : 'Оплатить'}
                  </Button>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;