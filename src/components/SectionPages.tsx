import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const Support = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Поддержка</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Наша команда готова помочь вам 24/7. Выберите удобный способ связи
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="MessageCircle" size={24} className="mr-3 text-primary" />
              Онлайн-чат
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Получите мгновенную помощь от наших специалистов
            </p>
            <Button className="w-full">Начать чат</Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Mail" size={24} className="mr-3 text-primary" />
              Email поддержка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Отправьте детальное описание проблемы
            </p>
            <Button variant="outline" className="w-full">support@vdsservers.ru</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">О компании</h1>
        <p className="text-xl text-muted-foreground">
          Лидер в сфере облачных технологий и виртуального хостинга
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              VDS SERVERS — это современная IT-компания, специализирующаяся на предоставлении 
              высококачественных услуг виртуального хостинга. Мы работаем с 2015 года и за это 
              время стали одним из ведущих провайдеров в России.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">8</div>
                <div className="text-sm text-muted-foreground">Лет опыта</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Contacts = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Контакты</h1>
        <p className="text-muted-foreground">
          Свяжитесь с нами удобным для вас способом
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Контактная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={20} className="text-primary" />
              <span>+7 (495) 123-45-67</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} className="text-primary" />
              <span>info@vdsservers.ru</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={20} className="text-primary" />
              <span>г. Москва, ул. Тверская, д. 1</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Напишите нам</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input 
              type="text" 
              placeholder="Ваше имя" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea 
              placeholder="Сообщение" 
              rows={4}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="w-full">Отправить сообщение</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};