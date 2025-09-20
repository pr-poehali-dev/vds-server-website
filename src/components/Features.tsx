import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Features = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Преимущества наших серверов</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Мы предоставляем лучшие решения для хостинга с использованием современных технологий
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Server" size={32} className="text-primary" />
            </div>
            <CardTitle>Высокая производительность</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Современные процессоры Intel Xeon и быстрые NVMe диски для максимальной скорости работы
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Cloud" size={32} className="text-primary" />
            </div>
            <CardTitle>Облачное хранилище</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Автоматические бэкапы и масштабируемое хранилище данных с защитой от потерь
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <CardTitle>Безопасность</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Многоуровневая защита, DDoS-фильтрация и регулярные обновления безопасности
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Features;