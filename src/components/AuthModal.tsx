import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

// Импорт компонентов
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFormFields from '@/components/auth/AuthFormFields';
import AuthNavigation from '@/components/auth/AuthNavigation';

// Импорт функций
import { 
  validateForm, 
  checkPasswordStrength, 
  validateEmailField, 
  validateUsername 
} from '@/components/auth/AuthValidation';
import { 
  handleLogin, 
  handleRegistration, 
  checkUsernameAvailability 
} from '@/components/auth/AuthAPI';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: { email: string; name: string }) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({
    email: '',
    username: '',
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
            username: parsedData.username || '',
            name: parsedData.name || '',
            rememberMe: true
            // Пароли НЕ загружаем из соображений безопасности
          }));
        } catch (error) {
          console.log('Ошибка загрузки сохранённых данных:', error);
        }
      }
    }
  }, [isOpen]);

  // Сохранение данных при изменении
  useEffect(() => {
    if (formData.rememberMe && (formData.email || formData.username || formData.name)) {
      const dataToSave = {
        email: formData.email,
        username: formData.username,
        name: formData.name
        // Пароли НЕ сохраняем из соображений безопасности
      };
      localStorage.setItem('authFormData', JSON.stringify(dataToSave));
      localStorage.setItem('rememberMe', 'true');
    } else if (!formData.rememberMe) {
      localStorage.removeItem('authFormData');
      localStorage.removeItem('rememberMe');
    }
  }, [formData.email, formData.username, formData.name, formData.rememberMe]);

  // Функция очистки формы (кроме сохранённых данных)
  const clearForm = () => {
    setFormData(prev => ({
      email: prev.rememberMe ? prev.email : '',
      username: prev.rememberMe ? prev.username : '',
      name: prev.rememberMe ? prev.name : '',
      password: '',
      confirmPassword: '',
      rememberMe: prev.rememberMe
    }));
    setErrors({
      email: '',
      username: '',
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
      username: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(mode, formData);
    setErrors(validationErrors);
    
    const isValid = !Object.values(validationErrors).some(error => error !== '');
    if (!isValid) {
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
      const result = await handleRegistration(formData, setErrors);
      if (result.success) {
        alert('Регистрация выполнена! Проверьте ваш email и перейдите по ссылке для подтверждения аккаунта.');
        setMode('login');
        clearForm();
      }
    } else {
      // Авторизация через API
      const result = await handleLogin(formData, setErrors, onAuthSuccess);
      if (result.success) {
        alert('Вход выполнен успешно!');
        onClose();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Валидация email в реальном времени для поля регистрации
    if (name === 'email' && mode === 'register') {
      const emailError = validateEmailField(value);
      setErrors({
        ...errors,
        [name]: emailError
      });
    } else {
      // Очищаем ошибку при вводе для других полей
      if (errors[name as keyof typeof errors]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
    
    // Проверяем силу пароля в реальном времени
    if (name === 'password' && mode === 'register') {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    // Проверяем уникальность логина с debounce
    if (name === 'username' && mode === 'register') {
      // Очищаем предыдущий таймер
      if (usernameCheckDebounce) {
        clearTimeout(usernameCheckDebounce);
      }
      
      // Устанавливаем новый таймер для проверки
      const newDebounce = setTimeout(() => {
        checkUsernameAvailability(value, mode, setUsernameCheckStatus, setErrors);
      }, 500);
      
      setUsernameCheckDebounce(newDebounce);
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md shadow-2xl" style={{ zIndex: 60 }}>
        <DialogTitle className="sr-only">
          {mode === 'login' ? 'Вход в систему' : mode === 'register' ? 'Регистрация' : 'Восстановление пароля'}
        </DialogTitle>
        
        <AuthHeader mode={mode} />
        
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthFormFields
              mode={mode}
              formData={formData}
              errors={errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              usernameCheckStatus={usernameCheckStatus}
              passwordStrength={passwordStrength}
              onInputChange={handleInputChange}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              onConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onRememberMeChange={handleRememberMeChange}
            />
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Icon name={mode === 'forgot' ? "Mail" : "LogIn"} size={16} className="mr-2" />
              {mode === 'login' ? 'Войти' : mode === 'register' ? 'Зарегистрироваться' : 'Отправить ссылку'}
            </Button>
          </form>
          
          <AuthNavigation mode={mode} onModeChange={handleModeChange} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;