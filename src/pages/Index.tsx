import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      name: 'Enterprise',
      price: '2499₽',
      period: '/мес',
      description: 'Для крупных проектов',
      features: ['4 vCPU', '8 GB RAM', '160 GB SSD', '1 Гбит/с', '24/7 поддержка', 'Бесплатные бэкапы', 'Dedicated IP'],
      popular: false
    }
  ];

  const servers = [
    { 
      id: 'srv-001', 
      name: 'Web Server', 
      status: 'running', 
      cpu: 45, 
      memory: 68, 
      disk: 32,
      plan: 'Pro'
    },
    { 
      id: 'srv-002', 
      name: 'Database Server', 
      status: 'running', 
      cpu: 78, 
      memory: 89, 
      disk: 56,
      plan: 'Enterprise'
    },
    { 
      id: 'srv-003', 
      name: 'Test Server', 
      status: 'stopped', 
      cpu: 0, 
      memory: 0, 
      disk: 12,
      plan: 'Basic'
    }
  ];

  const NavButton = ({ tab, children }: { tab: string; children: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        activeTab === tab
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Server" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-foreground">VDS SERVERS</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-2">
              <NavButton tab="home">Главная</NavButton>
              <NavButton tab="plans">Тарифы</NavButton>
              <NavButton tab="support">Поддержка</NavButton>
              <NavButton tab="about">О компании</NavButton>
              <NavButton tab="contacts">Контакты</NavButton>
            </nav>

            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsLoggedIn(true)}>
                    Войти
                  </Button>
                  <Button onClick={() => setIsLoggedIn(true)}>
                    Регистрация
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setActiveTab('dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Панель управления
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-16 animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  Надёжные <span className="text-primary">VDS серверы</span>
                  <br />для вашего бизнеса
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Высокопроизводительные виртуальные серверы с гарантией uptime 99.9%. 
                  Современные технологии и круглосуточная поддержка.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    onClick={() => setActiveTab('plans')}
                  >
                    <Icon name="Rocket" size={20} className="mr-2" />
                    Выбрать тариф
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="Play" size={20} className="mr-2" />
                    Смотреть демо
                  </Button>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="mt-12 relative">
                <img 
                  src="/img/8d97d4ef-2df0-4bb0-bade-c1e184bea474.jpg" 
                  alt="VDS Servers Technology"
                  className="mx-auto max-w-4xl w-full rounded-2xl shadow-2xl animate-scale-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              </div>
            </section>

            {/* Features */}
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
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Выберите тарифный план</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Гибкие тарифы для проектов любого масштаба. Все планы включают SSD диски и круглосуточную поддержку
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                    >
                      Выбрать план
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && isLoggedIn && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Панель управления</h1>
                <p className="text-muted-foreground">Управляйте вашими серверами</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать сервер
              </Button>
            </div>

            <div className="grid gap-6">
              {servers.map((server, index) => (
                <Card 
                  key={server.id} 
                  className="border-0 shadow-lg animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          server.status === 'running' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <h3 className="text-lg font-semibold">{server.name}</h3>
                          <p className="text-sm text-muted-foreground">{server.id} • {server.plan}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={server.status === 'running' ? 'default' : 'secondary'}>
                          {server.status === 'running' ? 'Работает' : 'Остановлен'}
                        </Badge>
                        <Switch 
                          checked={server.status === 'running'} 
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU</span>
                          <span>{server.cpu}%</span>
                        </div>
                        <Progress value={server.cpu} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Память</span>
                          <span>{server.memory}%</span>
                        </div>
                        <Progress value={server.memory} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Диск</span>
                          <span>{server.disk}%</span>
                        </div>
                        <Progress value={server.disk} className="h-2" />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                      <Button variant="outline" size="sm">
                        <Icon name="Settings" size={14} className="mr-2" />
                        Настройки
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Terminal" size={14} className="mr-2" />
                        Консоль
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="BarChart3" size={14} className="mr-2" />
                        Статистика
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'support' && (
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
        )}

        {activeTab === 'about' && (
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
        )}

        {activeTab === 'contacts' && (
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
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Server" size={24} className="text-primary" />
                <span className="text-xl font-bold">VDS SERVERS</span>
              </div>
              <p className="text-slate-400">
                Надёжные VDS серверы для вашего бизнеса
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">VDS серверы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dedicated серверы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Облачное хранилище</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">База знаний</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Статус сервисов</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-slate-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@vdsservers.ru</li>
                <li>г. Москва, ул. Тверская, д. 1</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 VDS SERVERS. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;