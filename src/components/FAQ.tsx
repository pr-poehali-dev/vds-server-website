import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "Что такое VDS сервер?",
      answer: "VDS (Virtual Dedicated Server) — это виртуальный выделенный сервер с гарантированными ресурсами. Вы получаете полный root-доступ и можете устанавливать любое ПО, как на физическом сервере."
    },
    {
      question: "Какая гарантия uptime?",
      answer: "Мы гарантируем 99.9% времени работы ваших серверов. Это означает не более 8.76 часов простоя в год. При нарушении SLA мы компенсируем время простоя."
    },
    {
      question: "Можно ли изменить тарифный план?",
      answer: "Да, вы можете увеличить ресурсы сервера в любое время через панель управления. Изменения применяются мгновенно без перезагрузки."
    },
    {
      question: "Какие операционные системы поддерживаются?",
      answer: "Мы поддерживаем все популярные ОС: Ubuntu, CentOS, Debian, Windows Server, FreeBSD. Также доступны готовые образы с предустановленным ПО."
    },
    {
      question: "Включены ли бэкапы?",
      answer: "Автоматические ежедневные бэкапы включены в тарифы Pro и Enterprise. Для тарифа Basic бэкапы доступны за дополнительную плату."
    },
    {
      question: "Как быстро активируется сервер?",
      answer: "Новый VDS сервер активируется автоматически в течение 5-10 минут после оплаты. Вы сразу получите данные для доступа на email."
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Часто задаваемые вопросы</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ответы на популярные вопросы о наших VDS серверах
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <Card 
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              <CardTitle className="flex items-center justify-between text-left">
                <span>{item.question}</span>
                <Icon 
                  name={openItems.includes(index) ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-primary transition-transform duration-200"
                />
              </CardTitle>
            </CardHeader>
            
            {openItems.includes(index) && (
              <CardContent className="pt-0 animate-fade-in">
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      
      {/* Support Contact */}
      <div className="text-center mt-12">
        <Card className="border-0 shadow-lg max-w-2xl mx-auto">
          <CardContent className="p-8">
            <Icon name="Headphones" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-muted-foreground mb-6">
              Наша команда поддержки готова помочь вам 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Онлайн-чат
              </Button>
              <Button variant="outline">
                <Icon name="Mail" size={16} className="mr-2" />
                support@vdsservers.ru
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;