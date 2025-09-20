import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

const Hero = ({ setActiveTab }: HeroProps) => {
  return (
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
  );
};

export default Hero;