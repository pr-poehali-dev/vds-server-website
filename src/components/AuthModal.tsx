import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: { email: string; name: string }) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
    color: 'text-red-500'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Загрузка сохранённых данных при открытии модалки
  useEffect(() => {
    if (isOpen) {
      const savedData = localStorage.getItem('authFormData');
      const savedRemember = localStorage.getItem('rememberMe');
      
      if (savedData && savedRemember === 'true') {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(prev => ({
            ...prev,
            email: parsedData.email || '',
            name: parsedData.name || ''
            // Пароли НЕ загружаем из соображений безопасности
          }));
          setRememberMe(true);
        } catch (error) {
          console.log('Ошибка загрузки сохранённых данных:', error);
        }
      }
    }
  }, [isOpen]);

  // Сохранение данных при изменении
  useEffect(() => {
    if (rememberMe && (formData.email || formData.name)) {
      const dataToSave = {
        email: formData.email,
        name: formData.name
        // Пароли НЕ сохраняем из соображений безопасности
      };
      localStorage.setItem('authFormData', JSON.stringify(dataToSave));
      localStorage.setItem('rememberMe', 'true');
    } else if (!rememberMe) {
      localStorage.removeItem('authFormData');
      localStorage.removeItem('rememberMe');
    }
  }, [formData.email, formData.name, rememberMe]);

  // Функция очистки формы (кроме сохранённых данных)
  const clearForm = () => {
    setFormData(prev => ({
      email: rememberMe ? prev.email : '',
      name: rememberMe ? prev.name : '',
      password: '',
      confirmPassword: ''
    }));
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setPasswordStrength({
      score: 0,
      feedback: '',
      color: 'text-red-500'
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Очистка при смене режима
  const handleModeChange = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    // Очищаем только пароли, email и имя сохраняем если включено "запомнить"
    setFormData(prev => ({
      ...prev,
      password: '',
      confirmPassword: ''
    }));
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  // Валидация email
  const validateEmail = (email: string): string => {
    if (!email) return 'Email обязателен';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Неверный формат email';
    return '';
  };
  
  // Валидация имени
  const validateName = (name: string): string => {
    if (!name.trim()) return 'Имя обязательно';
    if (name.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
    return '';
  };
  
  // Проверка силы пароля
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let feedback = '';
    let color = 'text-red-500';
    
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    switch (score) {
      case 0:
      case 1:
        feedback = 'Слабый пароль';
        color = 'text-red-500';
        break;
      case 2:
      case 3:
        feedback = 'Средний пароль';
        color = 'text-yellow-500';
        break;
      case 4:
        feedback = 'Хороший пароль';
        color = 'text-blue-500';
        break;
      case 5:
        feedback = 'Отличный пароль';
        color = 'text-green-500';
        break;
    }
    
    setPasswordStrength({ score, feedback, color });
  };
  
  // Валидация пароля
  const validatePassword = (password: string): string => {
    if (!password) return 'Пароль обязателен';
    if (password.length < 8) return 'Пароль должен содержать минимум 8 символов';
    if (!/[a-z]/.test(password)) return 'Пароль должен содержать строчные буквы';
    if (!/[A-Z]/.test(password)) return 'Пароль должен содержать заглавные буквы';
    if (!/[0-9]/.test(password)) return 'Пароль должен содержать цифры';
    return '';
  };
  
  // Валидация подтверждения пароля
  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword) return 'Подтверждение пароля обязательно';
    if (confirmPassword !== password) return 'Пароли не совпадают';
    return '';
  };
  
  // Валидация всей формы
  const validateForm = (): boolean => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: mode !== 'forgot' ? validatePassword(formData.password) : '',
      confirmPassword: mode === 'register' ? validateConfirmPassword(formData.confirmPassword, formData.password) : '',
      name: mode === 'register' ? validateName(formData.name) : ''
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (mode === 'forgot') {
      // Логика восстановления пароля
      console.log('Reset password for:', formData.email);
      alert('Ссылка для восстановления пароля отправлена на ваш email!');
    } else {
      // Логика авторизации/регистрации
      const user = { 
        email: formData.email, 
        name: formData.name || 'Пользователь' 
      };
      localStorage.setItem('user', JSON.stringify(user));
      
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
      
      console.log('Auth data:', formData);
      alert(`${mode === 'login' ? 'Вход' : 'Регистрация'} выполнен успешно!`);
    }
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Очищаем ошибку при вводе
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Проверяем силу пароля в реальном времени
    if (name === 'password' && mode === 'register') {
      checkPasswordStrength(value);
    }
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
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
                  }`}
                  placeholder="Введите ваше имя"
                  autoComplete="given-name"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors.name}
                  </p>
                )}
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
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
                }`}
                placeholder="your@email.com"
                autoComplete="email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            
            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
                    }`}
                    placeholder="Введите пароль"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-gray-500" />
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors.password}
                  </p>
                )}
                {mode === 'register' && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.score <= 2 ? 'bg-red-500' : 
                            passwordStrength.score === 3 ? 'bg-yellow-500' : 
                            passwordStrength.score === 4 ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${passwordStrength.color}`}>
                        {passwordStrength.feedback}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Используйте: строчные и заглавные буквы, цифры, спецсимволы
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Подтвердите пароль
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
                    }`}
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} className="text-gray-500" />
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <Icon name="CheckCircle" size={14} className="mr-1" />
                    Пароли совпадают
                  </p>
                )}
              </div>
            )}
            
            {/* Чекбокс "Запомнить меня" для входа и регистрации */}
            {mode !== 'forgot' && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-foreground select-none cursor-pointer">
                  Запомнить меня
                </label>
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
                onClick={() => handleModeChange('forgot')}
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
                onClick={() => handleModeChange('login')}
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
                  onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')}
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