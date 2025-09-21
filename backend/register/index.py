import json

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
        
        # Успешная регистрация (упрощенная версия)
        response_data = {
            'success': True,
            'message': 'Регистрация прошла успешно!',
            'user': {
                'email': email
            },
            'debug': {
                'verification_link': f"/verify-email?token=test123&email={email}",
                'note': 'Используйте эту ссылку для тестирования подтверждения email'
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