import json
import hashlib
import re
import os
import smtplib
import uuid
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart

def handler(event, context):
    '''
    Business: Регистрирует нового пользователя и отправляет письмо подтверждения
    Args: event - dict с httpMethod, body (JSON с email, password)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с результатом регистрации
    '''
    method = event.get('httpMethod', 'POST')
    
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
        
        # Валидация входных данных
        if not email or not password:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email и пароль обязательны'})
            }
        
        # Валидация email
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'Неверный формат email'
                })
            }
        
        # Валидация пароля
        if len(password) < 8:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'Пароль должен содержать минимум 8 символов'
                })
            }
        
        # Проверяем, не занят ли email (mock проверка)
        taken_emails = ['admin@example.com', 'test@example.com', 'user@test.com']
        if email.lower() in taken_emails:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'Пользователь с таким email уже существует'
                })
            }
        
        # Генерируем токен подтверждения
        verification_token = str(uuid.uuid4())
        
        # Получаем настройки SMTP из секретов
        smtp_email = os.environ.get('SMTP_EMAIL')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        email_sent = False
        debug_info = {}
        
        # Отправляем email подтверждения (если настроен SMTP)
        if smtp_email and smtp_password:
            try:
                # Создаем HTML сообщение
                msg = MimeMultipart('alternative')
                msg['From'] = smtp_email
                msg['To'] = email
                msg['Subject'] = 'Подтверждение регистрации'
                
                # HTML версия письма
                html_body = f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        .container {{ max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }}
                        .header {{ background: #4F46E5; color: white; padding: 20px; text-align: center; }}
                        .content {{ padding: 30px; background: #f9f9f9; }}
                        .button {{ 
                            display: inline-block; 
                            background: #4F46E5; 
                            color: white; 
                            padding: 12px 30px; 
                            text-decoration: none; 
                            border-radius: 5px; 
                            margin: 20px 0;
                        }}
                        .footer {{ padding: 20px; text-align: center; color: #666; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Подтверждение регистрации</h1>
                        </div>
                        <div class="content">
                            <h2>Добро пожаловать!</h2>
                            <p>Спасибо за регистрацию в нашем сервисе.</p>
                            <p>Для завершения регистрации нажмите на кнопку ниже:</p>
                            <a href="{window.location.origin if 'window' in globals() else 'https://your-site.com'}/verify?token={verification_token}&email={email}" class="button">
                                Подтвердить Email
                            </a>
                            <p>Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:</p>
                            <p style="word-break: break-all; color: #4F46E5;">
                                {window.location.origin if 'window' in globals() else 'https://your-site.com'}/verify?token={verification_token}&email={email}
                            </p>
                            <p>Если вы не регистрировались у нас, просто проигнорируйте это письмо.</p>
                        </div>
                        <div class="footer">
                            <p>Это автоматическое письмо, не отвечайте на него.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                # Текстовая версия письма
                text_body = f"""
                Добро пожаловать!
                
                Спасибо за регистрацию в нашем сервисе.
                
                Для завершения регистрации перейдите по ссылке:
                https://your-site.com/verify?token={verification_token}&email={email}
                
                Если вы не регистрировались у нас, просто проигнорируйте это письмо.
                """
                
                # Прикрепляем обе версии
                part1 = MimeText(text_body, 'plain', 'utf-8')
                part2 = MimeText(html_body, 'html', 'utf-8')
                
                msg.attach(part1)
                msg.attach(part2)
                
                # Отправляем письмо через Gmail SMTP
                server = smtplib.SMTP('smtp.gmail.com', 587)
                server.starttls()
                server.login(smtp_email, smtp_password)
                text = msg.as_string()
                server.sendmail(smtp_email, email, text)
                server.quit()
                
                email_sent = True
                
            except Exception as e:
                # Если не удалось отправить email, все равно регистрируем пользователя
                debug_info['email_error'] = f"Ошибка отправки email: {str(e)}"
                email_sent = False
        
        # Если SMTP не настроен или отправка не удалась
        if not email_sent:
            debug_info.update({
                'verification_link': f"/verify?token={verification_token}&email={email}",
                'note': 'Email не отправлен. Проверьте настройки SMTP или используйте ссылку выше для тестирования.'
            })
        
        # Хеширование пароля для безопасности
        password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        
        # Успешная регистрация
        response_data = {
            'success': True,
            'message': 'Регистрация прошла успешно!' + (' Проверьте email для подтверждения.' if email_sent else ''),
            'user': {
                'email': email
            },
            'email_sent': email_sent
        }
        
        # Добавляем debug информацию если есть
        if debug_info:
            response_data['debug'] = debug_info
        
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