import json
import os
import psycopg2
from psycopg2 import sql

def handler(event, context):
    '''
    Business: Подтверждение email пользователя по токену
    Args: event - dict с httpMethod, queryStringParameters (token, email)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с результатом подтверждения
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
    
    try:
        # Получаем параметры из URL
        params = event.get('queryStringParameters', {}) or {}
        token = params.get('token', '').strip()
        email = params.get('email', '').strip()
        
        # Валидация входных данных
        if not token or not email:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'Токен и email обязательны'
                })
            }
        
        # В реальном приложении здесь была бы проверка токена в базе данных
        # Пока используем mock-логику для демонстрации
        
        # Имитируем проверку токена
        if len(token) < 10:  # Простая валидация токена
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'Неверный токен подтверждения'
                })
            }
        
        # Проверяем формат email
        if '@' not in email or '.' not in email:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'Неверный формат email'
                })
            }
        
        # Mock: успешное подтверждение
        # В реальности здесь:
        # 1. Проверка токена в БД
        # 2. Проверка срока действия токена
        # 3. Обновление статуса пользователя
        # 4. Удаление токена из БД
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Email успешно подтвержден',
                'email': email,
                'verified_at': 'now'  # В реальности - текущая метка времени
            })
        }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }