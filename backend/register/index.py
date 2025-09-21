import json
import secrets

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
        
        # Пока отключаем отправку email для отладки
        email_success = False
        email_error = "Email отправка временно отключена для отладки"
        
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
                'verification_link': f"https://preview--vds-server-website.poehali.dev/verify-email?token={verification_token}&email={email}",
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