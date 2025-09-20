import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Header = ({ activeTab, setActiveTab, isLoggedIn, setIsLoggedIn }: HeaderProps) => {
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
  );
};

export default Header;