import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
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
  );
};

export default Footer;