import json

def handler(event, context):
    '''
    Business: Проверяет уникальность логина пользователя
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с результатом проверки
    '''
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Получаем логин из параметров запроса
    params = event.get('queryStringParameters') or {}
    username = params.get('username', '').strip()
    
    # Простая проверка без БД для начала
    if not username:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'available': False,
                'error': 'Логин не указан'
            })
        }
    
    # Валидация логина
    if len(username) < 3:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'available': False,
                'error': 'Логин должен содержать минимум 3 символа'
            })
        }
    
    if len(username) > 20:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'available': False,
                'error': 'Логин не должен превышать 20 символов'
            })
        }
    
    # Проверяем формат логина
    import re
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'available': False,
                'error': 'Логин может содержать только буквы, цифры и подчеркивания'
            })
        }
    
    # Пока возвращаем что логин доступен (без проверки БД)
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'available': True,
            'username': username,
            'message': 'Логин доступен'
        })
    }