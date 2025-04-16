/**
 * 类似于Axios的拦截器系统，可以使用职责链模式处理HTTP请求和响应：
 */
class RequestHandler {
  constructor () {
    this.nextHandler = null
  }

  setNext (handler) {
    this.nextHandler = handler
    return handler
  }

  handle (request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }
    return request
  }
}

// 添加认证令牌
class AuthTokenHandler extends RequestHandler {
  handle (request) {
    console.log('添加认证令牌')
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return super.handle(request)
  }
}

// 添加默认内容类型
class ContentTypeHandler extends RequestHandler {
  handle (request) {
    console.log('添加内容类型')
    if (!request.headers['Content-Type']) {
      request.headers = {
        ...request.headers,
        'Content-Type': 'application/json'
      }
    }
    return super.handle(request)
  }
}

// 添加CSRF令牌
class CSRFTokenHandler extends RequestHandler {
  handle (request) {
    console.log('添加CSRF令牌')
    if (request.method !== 'GET') {
      request.headers = {
        ...request.headers,
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content
      }
    }
    return super.handle(request)
  }
}

// 使用拦截器
class HttpClient {
  constructor () {
    // 创建请求处理链
    this.requestChain = new AuthTokenHandler()
    this.requestChain
      .setNext(new ContentTypeHandler())
      .setNext(new CSRFTokenHandler())
  }

  async fetch (url, options = {}) {
    // 处理请求
    const processedOptions = this.requestChain.handle({
      ...options,
      headers: options.headers || {}
    })

    // 发送请求
    try {
      const response = await fetch(url, processedOptions)
      return response.json()
    } catch (error) {
      console.error('Request failed:', error)
      throw error
    }
  }
}

// 使用示例
const client = new HttpClient()
client.fetch('https://api.example.com/data', { method: 'POST', body: JSON.stringify({ key: 'value' }) })
