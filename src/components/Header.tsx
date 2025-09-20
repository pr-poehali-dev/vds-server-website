import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Server" size={32} className="text-primary" />
            <span className="text-2xl font-bold text-foreground">VDS SERVERS</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            {/* Навигация убрана по запросу */}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Кнопки авторизации убраны вместе с панелью управления */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;