import json
import secrets
import os
import smtplib
from email.mime.text import MIMEText

def handler(event, context):
    '''
    Business: Регистрация нового пользователя
    Args: event - dict с httpMethod, body
          context - объект с атрибутами request_id
    Returns: HTTP response
    '''
    print(f"DEBUG: Received event: {json.dumps(event)}")
    print(f"DEBUG: Context: {context}")
    
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        email = body_data.get('email', '').strip()
        password = body_data.get('password', '')
        
        # Простая валидация
        if not email or not password:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email и пароль обязательны'})
            }
        
        if len(password) < 8:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'Пароль должен содержать минимум 8 символов'
                })
            }
        
        # Генерируем токен подтверждения
        verification_token = secrets.token_urlsafe(20)
        
        # Попытка отправки email подтверждения
        email_success = False
        email_error = None
        
        # Логируем для отладки
        print(f"Отправка email подтверждения для {email}")
        print(f"Токен подтверждения: {verification_token}")
        verification_url = f"https://preview--vds-server-website.poehali.dev/verify-email?token={verification_token}&email={email}"
        print(f"Ссылка: {verification_url}")
        
        try:
            # Получаем настройки SMTP из переменных окружения
            smtp_email = os.environ.get('SMTP_EMAIL')
            smtp_password = os.environ.get('SMTP_PASSWORD')
            
            if not smtp_email or not smtp_password:
                email_error = "SMTP настройки не найдены"
                print("SMTP настройки не найдены в переменных окружения")
            else:
                print(f"Отправляем email с {smtp_email} на {email}")
                
                # Создаем простое email сообщение
                subject = 'Подтверждение регистрации'
                body = f"""
Добро пожаловать!

Спасибо за регистрацию на нашем сайте.
Для завершения регистрации перейдите по ссылке:

{verification_url}

Если это письмо попало к вам по ошибке, просто проигнорируйте его.

С уважением,
Команда сайта
                """
                
                msg = MIMEText(body, 'plain', 'utf-8')
                msg['Subject'] = subject
                msg['From'] = smtp_email
                msg['To'] = email
                
                # Отправляем через Gmail SMTP
                with smtplib.SMTP('smtp.gmail.com', 587) as server:
                    server.starttls()
                    server.login(smtp_email, smtp_password)
                    server.send_message(msg)
                
                email_success = True
                print(f"Email успешно отправлен на {email}")
            
        except smtplib.SMTPAuthenticationError:
            email_error = "Ошибка аутентификации SMTP. Проверьте логин и пароль приложения."
            print(f"SMTP Auth Error: {email_error}")
        except smtplib.SMTPException as e:
            email_error = f"SMTP ошибка: {str(e)}"
            print(f"SMTP Error: {email_error}")
        except Exception as e:
            email_error = f"Общая ошибка отправки: {str(e)}"
            print(f"Email Error: {email_error}")
        
        # Успешная регистрация
        response_data = {
            'success': True,
            'message': 'Регистрация прошла успешно! Проверьте вашу почту для подтверждения.',
            'user': {
                'email': email
            },
            'email_sent': email_success,
            'email_error': email_error,
            'debug': {
                'verification_token': verification_token,
                'verification_link': verification_url,
                'note': 'Для отладки: ссылка подтверждения'
            }
        }
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(response_data)
        }
            
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }