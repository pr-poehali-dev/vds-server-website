import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
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
              <Button 
                variant="outline"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;