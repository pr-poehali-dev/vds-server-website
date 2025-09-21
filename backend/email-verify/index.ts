/**
 * Business: Отправка email для подтверждения регистрации и обработка подтверждения
 * Args: event с httpMethod, body, queryStringParameters; context с requestId
 * Returns: HTTP response с statusCode, headers, body
 */

interface CloudFunctionEvent {
  httpMethod: string;
  headers: Record<string, string>;
  queryStringParameters?: Record<string, string>;
  body?: string;
  isBase64Encoded: boolean;
}

interface CloudFunctionContext {
  requestId: string;
  functionName: string;
  functionVersion: string;
  memoryLimitInMB: number;
}

export const handler = async (event: CloudFunctionEvent, context: CloudFunctionContext): Promise<any> => {
  const { httpMethod, body, queryStringParameters } = event;
  
  // Handle CORS OPTIONS request
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      },
      isBase64Encoded: false,
      body: ''
    };
  }
  
  if (httpMethod === 'POST') {
    // Отправка письма для подтверждения
    let bodyData: any = {};
    try {
      bodyData = body ? JSON.parse(body) : {};
    } catch (e) {
      bodyData = {};
    }
    
    const email = bodyData.email || '';
    const name = bodyData.name || '';
    
    if (!email || !name) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        isBase64Encoded: false,
        body: JSON.stringify({ error: 'Email и имя обязательны' })
      };
    }
    
    // Генерируем токен подтверждения
    const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Создаем ссылку подтверждения
    const verificationUrl = `http://localhost:8080/verify-email?token=${verificationToken}&email=${email}`;
    
    // Логируем (в реальности отправляем email)
    console.log(`Отправка письма для ${email}`);
    console.log(`Ссылка подтверждения: ${verificationUrl}`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      isBase64Encoded: false,
      body: JSON.stringify({
        success: true,
        message: 'Письмо с подтверждением отправлено',
        verification_token: verificationToken
      })
    };
  }
  
  if (httpMethod === 'GET') {
    // Подтверждение email по токену
    const params = queryStringParameters || {};
    const token = params.token || '';
    const email = params.email || '';
    
    if (!token || !email) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        isBase64Encoded: false,
        body: JSON.stringify({ error: 'Токен и email обязательны' })
      };
    }
    
    // В реальном приложении здесь проверка токена в БД
    console.log(`Подтверждение email ${email} с токеном ${token}`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      isBase64Encoded: false,
      body: JSON.stringify({
        success: true,
        message: 'Email успешно подтвержден',
        email: email
      })
    };
  }
  
  return {
    statusCode: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    isBase64Encoded: false,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};