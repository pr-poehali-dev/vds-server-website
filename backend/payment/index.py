import json
import uuid
from datetime import datetime

def handler(event, context):
    '''
    Business: Process payment requests for hosting plans
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name, function_version, memory_limit_in_mb
    Returns: HTTP response dict with payment URL or confirmation
    '''
    try:
        method = event.get('httpMethod', 'GET')
        
        # Handle CORS OPTIONS request
        if method == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Max-Age': '86400'
                },
                'body': ''
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            # Extract payment details
            amount = body_data.get('amount', 0)
            plan_name = body_data.get('planName', '')
            quantity = body_data.get('quantity', 1)
            period = body_data.get('period', '1')
            
            # Generate unique payment ID
            payment_id = str(uuid.uuid4())
            
            # Create payment session (mock implementation)
            payment_data = {
                'payment_id': payment_id,
                'amount': amount,
                'plan_name': plan_name,
                'quantity': quantity,
                'period': period,
                'status': 'pending',
                'created_at': datetime.now().isoformat(),
                'payment_url': f'https://payment-gateway.example.com/pay/{payment_id}',
                'redirect_url': f'https://your-domain.com/payment/success?id={payment_id}'
            }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(payment_data)
            }
        
        if method == 'GET':
            # Check payment status
            params = event.get('queryStringParameters') or {}
            payment_id = params.get('payment_id', '')
            
            if not payment_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Payment ID required'})
                }
            
            # Mock payment status check
            status_data = {
                'payment_id': payment_id,
                'status': 'completed',
                'amount': 1999,
                'plan_name': 'Pro',
                'confirmed_at': datetime.now().isoformat()
            }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(status_data)
            }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }