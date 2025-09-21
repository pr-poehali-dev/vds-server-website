import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
  const [usernameCheckStatus, setUsernameCheckStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [usernameCheckDebounce, setUsernameCheckDebounce] = useState<NodeJS.Timeout | null>(null);

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

  // Проверка уникальности логина
  const checkUsernameAvailability = async (username: string) => {
    if (mode !== 'register' || !username || username.length < 3) {
      setUsernameCheckStatus('idle');
      return;
    }

    setUsernameCheckStatus('checking');
    
    try {
      // Временно используем mock проверку до исправления backend функции
      await new Promise(resolve => setTimeout(resolve, 500)); // имитация задержки
      
      // Mock логика: считаем что "admin", "test", "user" заняты
      const takenUsernames = ['admin', 'test', 'user', 'administrator'];
      const available = !takenUsernames.includes(username.toLowerCase());
      
      setUsernameCheckStatus(available ? 'available' : 'taken');
      
      if (!available) {
        setErrors(prev => ({
          ...prev,
          email: 'Этот логин уже занят'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameCheckStatus('idle');
    }
  };

  // Валидация логина
  const validateEmail = (email: string): string => {
    if (!email) return 'Логин обязателен';
    if (email.length < 3) return 'Логин должен содержать минимум 3 символа';
    if (email.length > 20) return 'Логин не должен превышать 20 символов';
    if (!/^[a-zA-Z0-9_]+$/.test(email)) return 'Логин может содержать только буквы, цифры и подчеркивания';
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

  // Обработка регистрации пользователя
  const handleRegistration = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/2c530527-bc67-4b37-949a-334155677b68', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          name: formData.name,
          password: formData.password
        })
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Успешная регистрация
        const user = { 
          email: formData.email, 
          name: formData.name 
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        if (onAuthSuccess) {
          onAuthSuccess(user);
        }
        
        alert('Регистрация выполнена успешно!');
        onClose();
      } else {
        // Ошибка регистрации
        const errorMessage = result.error || 'Ошибка при регистрации';
        setErrors(prev => ({
          ...prev,
          email: errorMessage
        }));
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        email: 'Ошибка сети. Попробуйте позже.'
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Проверяем уникальность логина при регистрации
    if (mode === 'register' && usernameCheckStatus === 'taken') {
      setErrors(prev => ({
        ...prev,
        email: 'Этот логин уже занят'
      }));
      return;
    }
    
    if (mode === 'forgot') {
      // Логика восстановления пароля
      console.log('Reset password for:', formData.email);
      alert('Ссылка для восстановления пароля отправлена на ваш email!');
    } else if (mode === 'register') {
      // Регистрация нового пользователя
      await handleRegistration();
    } else {
      // Авторизация (пока mock)
      const user = { 
        email: formData.email, 
        name: formData.name || 'Пользователь' 
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
      
      console.log('Auth data:', formData);
      alert('Вход выполнен успешно!');
      onClose();
    }
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
    
    // Проверяем уникальность логина с debounce
    if (name === 'email' && mode === 'register') {
      // Очищаем предыдущий таймер
      if (usernameCheckDebounce) {
        clearTimeout(usernameCheckDebounce);
      }
      
      // Устанавливаем новый таймер для проверки
      const newDebounce = setTimeout(() => {
        checkUsernameAvailability(value);
      }, 500);
      
      setUsernameCheckDebounce(newDebounce);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md shadow-2xl" style={{ zIndex: 60 }}>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Вход в систему' : mode === 'register' ? 'Регистрация' : 'Восстановление пароля'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {mode === 'login' 
              ? 'Войдите в свой аккаунт для управления серверами' 
              : mode === 'register' 
                ? 'Создайте аккаунт для заказа VDS серверов'
                : 'Введите логин для восстановления доступа'
            }
          </p>
        </div>
        
        <div>
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
                Логин
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
                }`}
                placeholder="Введите ваш логин"
                autoComplete="username"
                required
              />
              
              {/* Индикатор проверки уникальности логина */}
              {mode === 'register' && formData.email.length >= 3 && (
                <div className="mt-1">
                  {usernameCheckStatus === 'checking' && (
                    <p className="text-blue-500 text-sm flex items-center">
                      <Icon name="Loader" size={14} className="mr-1 animate-spin" />
                      Проверяем доступность логина...
                    </p>
                  )}
                  {usernameCheckStatus === 'available' && (
                    <p className="text-green-500 text-sm flex items-center">
                      <Icon name="CheckCircle" size={14} className="mr-1" />
                      Логин доступен
                    </p>
                  )}
                  {usernameCheckStatus === 'taken' && (
                    <p className="text-red-500 text-sm flex items-center">
                      <Icon name="XCircle" size={14} className="mr-1" />
                      Логин уже занят
                    </p>
                  )}
                </div>
              )}
              
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;