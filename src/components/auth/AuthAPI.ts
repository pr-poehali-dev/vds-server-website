// Функция отправки email для подтверждения
export const sendVerificationEmail = async (email: string, name: string, formData: any) => {
  try {
    // Mock отправка email - в реальности здесь будет вызов backend функции
    console.log(`Отправка email подтверждения для ${email}`);
    
    // Генерируем токен (в реальности это делается на backend)
    const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Сохраняем информацию о неподтвержденном пользователе
    const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
    pendingUsers.push({
      email: formData.email,
      name: formData.name,
      password: formData.password, // В реальности пароль хешируется на backend
      token: verificationToken,
      timestamp: Date.now()
    });
    localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));
    
    // В реальности здесь отправка через backend API
    /*
    const response = await fetch('https://functions.poehali.dev/email-verify-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });
    */
    
    console.log(`Токен подтверждения: ${verificationToken}`);
    console.log(`Ссылка: ${window.location.origin}/verify-email?token=${verificationToken}&email=${email}`);
    
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    throw error;
  }
};

// Обработка регистрации пользователя
export const handleLogin = async (formData: any, setErrors: any, onAuthSuccess?: (user: { email: string; name: string }) => void) => {
  try {
    // Инициализация подтвержденных тестовых пользователей (только при первом запуске)
    const confirmedUsers = JSON.parse(localStorage.getItem('confirmedUsers') || '[]');
    if (confirmedUsers.length === 0) {
      const initialUsers = [
        { email: 'test@example.com', password: 'testpassword', name: 'Тестовый пользователь', confirmedAt: Date.now() },
        { email: 'admin@example.com', password: 'admin123', name: 'Администратор', confirmedAt: Date.now() }
      ];
      localStorage.setItem('confirmedUsers', JSON.stringify(initialUsers));
    }

    // Временная mock-авторизация с тестовыми пользователями
    const testUsers = JSON.parse(localStorage.getItem('confirmedUsers') || '[]');

    // Ищем пользователя
    const foundUser = testUsers.find((user: any) => 
      user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      // Проверяем подтверждение email
      const confirmedUsers = JSON.parse(localStorage.getItem('confirmedUsers') || '[]');
      const isEmailConfirmed = confirmedUsers.some((user: any) => user.email === foundUser.email);
      
      if (!isEmailConfirmed) {
        setErrors((prev: any) => ({
          ...prev,
          email: 'Email не подтвержден. Проверьте почту и перейдите по ссылке из письма.'
        }));
        return { success: false };
      }
      
      // Авторизация успешна
      const user = {
        email: foundUser.email,
        name: foundUser.name
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
      
      return { success: true, user };
    } else {
      // Неверные данные
      setErrors((prev: any) => ({
        ...prev,
        email: 'Неверный логин или пароль'
      }));
      return { success: false };
    }
  } catch (error) {
    console.error('Login error:', error);
    setErrors((prev: any) => ({
      ...prev,
      email: 'Ошибка сети. Попробуйте позже.'
    }));
    return { success: false };
  }
};

export const handleRegistration = async (formData: any, setErrors: any) => {
  try {
    const response = await fetch('https://functions.poehali.dev/2c530527-bc67-4b37-949a-334155677b68', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      // Успешная регистрация - отправляем email для подтверждения
      await sendVerificationEmail(formData.email, formData.name, formData);
      return { success: true };
    } else {
      // Ошибка регистрации
      const errorMessage = result.error || 'Ошибка при регистрации';
      setErrors((prev: any) => ({
        ...prev,
        email: errorMessage
      }));
      return { success: false };
    }
  } catch (error) {
    console.error('Registration error:', error);
    setErrors((prev: any) => ({
      ...prev,
      email: 'Ошибка сети. Попробуйте позже.'
    }));
    return { success: false };
  }
};

// Проверка уникальности логина
export const checkUsernameAvailability = async (username: string, mode: string, setUsernameCheckStatus: any, setErrors: any) => {
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
      setErrors((prev: any) => ({
        ...prev,
        username: 'Этот логин уже занят'
      }));
    } else {
      setErrors((prev: any) => ({
        ...prev,
        username: ''
      }));
    }
  } catch (error) {
    console.error('Error checking username:', error);
    setUsernameCheckStatus('idle');
  }
};