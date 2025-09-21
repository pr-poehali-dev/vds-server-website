interface AuthHeaderProps {
  mode: 'login' | 'register' | 'forgot';
}

const AuthHeader = ({ mode }: AuthHeaderProps) => {
  return (
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
  );
};

export default AuthHeader;