import json

def handler(event, context):
    '''
    Business: Регистрирует нового пользователя и отправляет токен подтверждения
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
        
        # Успешная регистрация
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Регистрация прошла успешно! Проверьте email для подтверждения.',
                'user': {
                    'email': email
                },
                'debug': {
                    'verification_link': f"/verify?token=test-token&email={email}",
                    'note': 'Email не отправлен (демо режим). Используйте ссылку выше для тестирования.'
                }
            })
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