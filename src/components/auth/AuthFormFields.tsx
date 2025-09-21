import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FormFieldsProps {
  mode: 'login' | 'register' | 'forgot';
  formData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
  };
  errors: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
  };
  showPassword: boolean;
  showConfirmPassword: boolean;
  usernameCheckStatus: 'idle' | 'checking' | 'available' | 'taken';
  passwordStrength: {
    score: number;
    feedback: string;
    color: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordToggle: () => void;
  onConfirmPasswordToggle: () => void;
  onRememberMeChange: (checked: boolean) => void;
}

const AuthFormFields = ({
  mode,
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  usernameCheckStatus,
  passwordStrength,
  onInputChange,
  onPasswordToggle,
  onConfirmPasswordToggle,
  onRememberMeChange
}: FormFieldsProps) => {
  return (
    <>
      {/* E-mail поле для всех режимов кроме forgot (где оно будет отдельно) */}
      {mode !== 'forgot' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
            }`}
            placeholder="Введите ваш e-mail"
            autoComplete="email"
            required
          />
          
          {/* Индикация валидности email */}
          {formData.email.length > 0 && (
            <div className="mt-1">
              {errors.email ? (
                <p className="text-red-500 text-sm flex items-center">
                  <Icon name="XCircle" size={14} className="mr-1" />
                  {errors.email}
                </p>
              ) : (
                <p className="text-green-500 text-sm flex items-center">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Правильный формат e-mail
                </p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Логин только для регистрации */}
      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Логин
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
            }`}
            placeholder="Введите ваш логин"
            autoComplete="username"
            required
          />
          
          {/* Индикатор проверки уникальности логина */}
          {formData.username.length >= 3 && (
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
          
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.username}
            </p>
          )}
        </div>
      )}
      
      {/* E-mail для режима "забыл пароль" */}
      {mode === 'forgot' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            E-mail для восстановления
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary border-gray-300'
            }`}
            placeholder="Введите ваш e-mail"
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
      )}
      
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
              onChange={onInputChange}
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
              onClick={onPasswordToggle}
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
              onChange={onInputChange}
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
              onClick={onConfirmPasswordToggle}
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
            checked={formData.rememberMe}
            onChange={(e) => onRememberMeChange(e.target.checked)}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-foreground select-none cursor-pointer">
            Запомнить меня
          </label>
        </div>
      )}
    </>
  );
};

export default AuthFormFields;