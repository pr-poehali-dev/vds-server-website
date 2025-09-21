import { Button } from '@/components/ui/button';

interface AuthNavigationProps {
  mode: 'login' | 'register' | 'forgot';
  onModeChange: (mode: 'login' | 'register' | 'forgot') => void;
}

const AuthNavigation = ({ mode, onModeChange }: AuthNavigationProps) => {
  return (
    <>
      {mode === 'login' && (
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => onModeChange('forgot')}
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
            onClick={() => onModeChange('login')}
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
              onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
              className="p-0 text-primary"
            >
              {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default AuthNavigation;