import json
import os
import smtplib
from email.mime.text import MIMEText

def handler(event, context):
    '''
    Business: Тест отправки email
    Args: event - dict с httpMethod, body (email)
    Returns: результат тестирования SMTP
    '''
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
        
        if not email:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email обязателен'})
            }
        
        # Получаем настройки SMTP
        smtp_email = os.environ.get('SMTP_EMAIL')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        print(f"SMTP_EMAIL: {smtp_email}")
        print(f"SMTP_PASSWORD: {'*' * len(smtp_password) if smtp_password else 'None'}")
        
        if not smtp_email or not smtp_password:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'SMTP настройки не найдены',
                    'smtp_email': smtp_email,
                    'has_password': bool(smtp_password)
                })
            }
        
        # Создаем тестовое сообщение
        msg = MIMEText('Тестовое письмо из poehali.dev', 'plain', 'utf-8')
        msg['Subject'] = 'Тест отправки email'
        msg['From'] = smtp_email
        msg['To'] = email
        
        # Пытаемся отправить
        try:
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(smtp_email, smtp_password)
                server.send_message(msg)
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': f'Тестовое письмо отправлено на {email}',
                    'smtp_email': smtp_email
                })
            }
            
        except smtplib.SMTPAuthenticationError as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': f'Ошибка аутентификации SMTP: {str(e)}',
                    'smtp_email': smtp_email
                })
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': f'Ошибка отправки: {str(e)}',
                    'smtp_email': smtp_email
                })
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }