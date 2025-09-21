// Валидация логина
export const validateUsername = (username: string): string => {
  if (!username) return 'Логин обязателен';
  if (username.length < 3) return 'Логин должен содержать минимум 3 символа';
  if (username.length > 20) return 'Логин не должен превышать 20 символов';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Логин может содержать только буквы, цифры и подчеркивания';
  return '';
};

// Валидация email в поле регистрации
export const validateEmailField = (email: string): string => {
  if (!email.trim()) return 'E-mail обязателен';
  
  // Проверка формата email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Неверный формат e-mail (example@mail.com)';
  
  // Дополнительные проверки
  if (email.length > 50) return 'E-mail не должен превышать 50 символов';
  
  return '';
};

// Валидация пароля
export const validatePassword = (password: string): string => {
  if (!password) return 'Пароль обязателен';
  if (password.length < 8) return 'Пароль должен содержать минимум 8 символов';
  if (!/[a-z]/.test(password)) return 'Пароль должен содержать строчные буквы';
  if (!/[A-Z]/.test(password)) return 'Пароль должен содержать заглавные буквы';
  if (!/[0-9]/.test(password)) return 'Пароль должен содержать цифры';
  return '';
};

// Валидация подтверждения пароля
export const validateConfirmPassword = (confirmPassword: string, password: string): string => {
  if (!confirmPassword) return 'Подтверждение пароля обязательно';
  if (confirmPassword !== password) return 'Пароли не совпадают';
  return '';
};

// Проверка силы пароля
export const checkPasswordStrength = (password: string) => {
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
  
  return { score, feedback, color };
};

// Валидация всей формы
export const validateForm = (
  mode: 'login' | 'register' | 'forgot',
  formData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }
): { email: string; username: string; password: string; confirmPassword: string; name: string } => {
  const newErrors = {
    email: validateEmailField(formData.email),
    username: (mode === 'register' || mode === 'login') ? validateUsername(formData.username) : '',
    password: mode === 'register' ? validatePassword(formData.password) : 
              mode === 'login' ? (formData.password ? '' : 'Пароль обязателен') : '',
    confirmPassword: mode === 'register' ? validateConfirmPassword(formData.confirmPassword, formData.password) : '',
    name: ''
  };
  
  return newErrors;
};