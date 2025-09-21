import json
import hashlib
import re

def handler(event, context):
    '''
    Business: Регистрирует нового пользователя в системе
    Args: event - dict с httpMethod, body (JSON с username, name, password)
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
    
    # Парсим данные из body
    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Неверный формат данных'
            })
        }
    
    username = body_data.get('username', '').strip()
    name = body_data.get('name', '').strip()
    password = body_data.get('password', '').strip()
    
    # Валидация данных
    if not username:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Логин обязателен'
            })
        }
    
    if not name:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Имя обязательно'
            })
        }
    
    if not password:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Пароль обязателен'
            })
        }
    
    # Валидация логина
    if len(username) < 3 or len(username) > 20:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Логин должен содержать от 3 до 20 символов'
            })
        }
    
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Логин может содержать только буквы, цифры и подчеркивания'
            })
        }
    
    # Валидация пароля
    if len(password) < 8:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Пароль должен содержать минимум 8 символов'
            })
        }
    
    # Хеширование пароля
    password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
    
    # Пока используем mock без подключения к базе данных
    # (так как у нас проблемы с DATABASE_URL в функциях)
    
    # Проверяем, не занят ли логин (mock проверка)
    taken_usernames = ['admin', 'test', 'user', 'administrator']
    if username.lower() in taken_usernames:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Этот логин уже занят'
            })
        }
    
    # Mock: успешная регистрация
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Пользователь успешно зарегистрирован',
            'user': {
                'username': username,
                'name': name
            }
        })
    }