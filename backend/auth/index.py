import json

def handler(event, context):
    '''
    Business: Авторизация пользователей с проверкой логина и пароля
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name, function_version, memory_limit_in_mb
    Returns: HTTP response dict с токеном авторизации или ошибкой
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
        
        # Временная mock-авторизация (тестовые пользователи)
        test_users = [
            {'email': 'test@example.com', 'password': 'testpassword', 'name': 'Тестовый пользователь'},
            {'email': 'admin@example.com', 'password': 'admin123', 'name': 'Администратор'},
            {'email': 'user@test.com', 'password': 'password123', 'name': 'Пользователь'}
        ]
        
        # Ищем пользователя
        found_user = None
        for user in test_users:
            if user['email'] == email and user['password'] == password:
                found_user = user
                break
        
        if found_user:
            # Пользователь найден - авторизация успешна
            user_data = {
                'id': 1,
                'email': found_user['email'],
                'name': found_user['name']
            }
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user': user_data,
                    'message': 'Авторизация успешна'
                })
            }
        else:
            # Неверные данные
            return {
                'statusCode': 401,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Неверный логин или пароль'
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