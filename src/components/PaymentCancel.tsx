import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-0 shadow-xl animate-fade-in">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center animate-scale-in">
            <Icon name="XCircle" size={32} className="text-orange-600" />
          </div>
          <CardTitle className="text-2xl text-orange-600">Оплата отменена</CardTitle>
          <CardDescription className="text-base">
            Не беспокойтесь, никакие средства не были списаны с вашего счета.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Возможные причины:</h3>
            <ul className="space-y-2 text-sm text-orange-700">
              <li className="flex items-start">
                <Icon name="CreditCard" size={16} className="mr-2 mt-0.5 text-orange-600" />
                Недостаточно средств на карте
              </li>
              <li className="flex items-start">
                <Icon name="Clock" size={16} className="mr-2 mt-0.5 text-orange-600" />
                Истекло время сессии
              </li>
              <li className="flex items-start">
                <Icon name="Shield" size={16} className="mr-2 mt-0.5 text-orange-600" />
                Блокировка банком
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-3">
              Попробуйте еще раз или свяжитесь с поддержкой для помощи
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              className="flex-1" 
              onClick={() => window.location.href = '/'}
            >
              Попробовать снова
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('mailto:support@vdsservers.ru', '_blank')}
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Поддержка
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancel;