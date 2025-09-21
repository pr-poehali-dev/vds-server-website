import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-0 shadow-xl animate-fade-in">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Оплата успешна!</CardTitle>
          <CardDescription className="text-base">
            Спасибо за покупку! Ваш сервер будет готов через несколько минут.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Что дальше?</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-start">
                <Icon name="Mail" size={16} className="mr-2 mt-0.5 text-green-600" />
                Данные для доступа отправлены на вашу почту
              </li>
              <li className="flex items-start">
                <Icon name="Server" size={16} className="mr-2 mt-0.5 text-green-600" />
                Сервер будет готов в течение 5-10 минут
              </li>
              <li className="flex items-start">
                <Icon name="Phone" size={16} className="mr-2 mt-0.5 text-green-600" />
                Поддержка 24/7 готова помочь
              </li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button 
              className="flex-1" 
              onClick={() => window.location.href = '/'}
            >
              На главную
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

export default PaymentSuccess;