import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setVerificationStatus('error');
      setMessage('Неверная ссылка подтверждения');
      return;
    }

    // Проверяем токен
    verifyEmail(token, email);
  }, [searchParams]);

  const verifyEmail = async (token: string, email: string) => {
    try {
      // Получаем список ожидающих подтверждения пользователей
      const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
      const userIndex = pendingUsers.findIndex((user: any) => 
        user.email === email && user.token === token
      );

      if (userIndex === -1) {
        setVerificationStatus('error');
        setMessage('Неверный токен подтверждения или email уже подтвержден');
        return;
      }

      const user = pendingUsers[userIndex];

      // Проверяем срок действия токена (24 часа)
      const tokenAge = Date.now() - user.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 часа

      if (tokenAge > maxAge) {
        setVerificationStatus('expired');
        setMessage('Ссылка подтверждения истекла. Зарегистрируйтесь заново.');
        
        // Удаляем просроченного пользователя
        pendingUsers.splice(userIndex, 1);
        localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));
        return;
      }

      // Подтверждаем email
      const confirmedUsers = JSON.parse(localStorage.getItem('confirmedUsers') || '[]');
      confirmedUsers.push({
        email: user.email,
        name: user.name,
        password: user.password,
        confirmedAt: Date.now()
      });
      localStorage.setItem('confirmedUsers', JSON.stringify(confirmedUsers));

      // Удаляем из ожидающих
      pendingUsers.splice(userIndex, 1);
      localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));

      setVerificationStatus('success');
      setMessage('Email успешно подтвержден! Теперь вы можете войти в систему.');

      // В реальности здесь был бы запрос к backend API:
      /*
      const response = await fetch(`https://functions.poehali.dev/email-verify-url?token=${token}&email=${email}`);
      const result = await response.json();
      if (result.success) {
        setVerificationStatus('success');
        setMessage('Email успешно подтвержден!');
      }
      */

    } catch (error) {
      console.error('Ошибка подтверждения email:', error);
      setVerificationStatus('error');
      setMessage('Произошла ошибка при подтверждении email');
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const handleResendEmail = () => {
    // В реальности здесь отправка нового письма
    alert('Новое письмо с подтверждением отправлено на ваш email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          {verificationStatus === 'loading' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Loader" size={32} className="text-blue-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Подтверждение Email</h1>
              <p className="text-gray-600">Обрабатываем ваш запрос...</p>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={32} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email подтвержден!</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <Button 
                onClick={handleBackToLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти в систему
              </Button>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="XCircle" size={32} className="text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Ошибка подтверждения</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Button 
                  onClick={handleBackToLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Вернуться на главную
                </Button>
              </div>
            </>
          )}

          {verificationStatus === 'expired' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={32} className="text-yellow-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Ссылка истекла</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Button 
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Отправить новое письмо
                </Button>
                <Button 
                  onClick={handleBackToLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Вернуться на главную
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;