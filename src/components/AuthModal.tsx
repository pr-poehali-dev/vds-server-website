import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      // Логика восстановления пароля
      console.log('Reset password for:', formData.email);
      alert('Ссылка для восстановления пароля отправлена на ваш email!');
    } else {
      // Логика авторизации/регистрации
      console.log('Auth data:', formData);
    }
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-md mx-4 shadow-2xl animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {mode === 'login' ? 'Вход в систему' : mode === 'register' ? 'Регистрация' : 'Восстановление пароля'}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          <CardDescription>
            {mode === 'login' 
              ? 'Войдите в свой аккаунт для управления серверами' 
              : mode === 'register' 
                ? 'Создайте аккаунт для заказа VDS серверов'
                : 'Введите email для получения ссылки восстановления'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
                required
              />
            </div>
            
            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Введите пароль"
                  required
                />
              </div>
            )}
            
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Подтвердите пароль
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Повторите пароль"
                  required
                />
              </div>
            )}
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Icon name={mode === 'forgot' ? "Mail" : "LogIn"} size={16} className="mr-2" />
              {mode === 'login' ? 'Войти' : mode === 'register' ? 'Зарегистрироваться' : 'Отправить ссылку'}
            </Button>
          </form>
          
          {mode === 'login' && (
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setMode('forgot')}
                className="p-0 text-muted-foreground text-sm"
              >
                Забыли пароль?
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            {mode === 'forgot' ? (
              <Button
                variant="link"
                onClick={() => setMode('login')}
                className="p-0 text-primary"
              >
                ← Вернуться к входу
              </Button>
            ) : (
              <>
                <p className="text-muted-foreground">
                  {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                </p>
                <Button
                  variant="link"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="p-0 text-primary"
                >
                  {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;