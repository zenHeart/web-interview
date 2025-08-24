// JSBridge 通信机制演示
// 模拟 WebView 与原生应用之间的双向通信

/**
 * 模拟 WebView 环境
 * 提供 JavaScript 端的 Bridge 接口
 */
class WebViewJSBridge {
  constructor() {
    this.callbacks = new Map();
    this.callbackId = 0;
    this.messageQueue = [];
    this.isReady = false;
  }
  
  // 初始化 Bridge
  init() {
    console.log('🌐 WebView: JSBridge 初始化');
    this.isReady = true;
    this.flushQueue();
  }
  
  // JavaScript 调用原生方法
  callNative(method, params, callback) {
    const callbackId = this.generateCallbackId();
    
    if (callback) {
      this.callbacks.set(callbackId, callback);
    }
    
    const message = {
      method,
      params,
      callbackId,
      timestamp: Date.now()
    };
    
    console.log('🌐 WebView: 调用原生方法', message);
    
    if (this.isReady) {
      this.sendToNative(message);
    } else {
      this.messageQueue.push(message);
    }
  }
  
  // 发送消息到原生端（模拟）
  sendToNative(message) {
    // 在真实环境中，这里会调用原生注入的方法
    // 比如 window.webkit.messageHandlers.bridge.postMessage(message)
    if (window.NativeBridge) {
      window.NativeBridge.handleMessage(JSON.stringify(message));
    }
  }
  
  // 接收来自原生的回调
  receiveFromNative(callbackId, result, error) {
    console.log('🌐 WebView: 收到原生回调', { callbackId, result, error });
    
    const callback = this.callbacks.get(callbackId);
    if (callback) {
      this.callbacks.delete(callbackId);
      
      if (error) {
        callback(new Error(error), null);
      } else {
        callback(null, result);
      }
    }
  }
  
  // 处理原生主动调用
  handleNativeCall(method, params) {
    console.log('🌐 WebView: 原生调用 JS 方法', { method, params });
    
    const handlers = {
      'updateUI': (data) => {
        console.log('🌐 WebView: 更新 UI', data);
        return { success: true, message: 'UI updated' };
      },
      'showAlert': (data) => {
        console.log('🌐 WebView: 显示警告', data.message);
        return { success: true };
      }
    };
    
    const handler = handlers[method];
    if (handler) {
      return handler(params);
    } else {
      throw new Error(`Unknown method: ${method}`);
    }
  }
  
  generateCallbackId() {
    return `cb_${++this.callbackId}_${Date.now()}`;
  }
  
  flushQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.sendToNative(message);
    }
  }
}

/**
 * 模拟原生应用端
 * 提供原生端的 Bridge 接口
 */
class NativeAppBridge {
  constructor() {
    this.webView = null;
    this.nativeModules = new Map();
    this.initNativeModules();
  }
  
  setWebView(webView) {
    this.webView = webView;
  }
  
  // 初始化原生模块
  initNativeModules() {
    // 设备信息模块
    this.nativeModules.set('DeviceInfo', {
      getDeviceInfo: () => ({
        platform: 'iOS',
        version: '15.0',
        model: 'iPhone 13',
        screenWidth: 375,
        screenHeight: 812
      })
    });
    
    // 存储模块
    this.nativeModules.set('Storage', {
      setItem: (key, value) => {
        console.log('📱 Native: 存储数据', { key, value });
        // 模拟异步存储
        return new Promise(resolve => {
          setTimeout(() => resolve({ success: true }), 100);
        });
      },
      getItem: (key) => {
        console.log('📱 Native: 获取数据', key);
        return new Promise(resolve => {
          setTimeout(() => resolve(`stored_value_for_${key}`), 100);
        });
      }
    });
    
    // 相机模块
    this.nativeModules.set('Camera', {
      openCamera: (options) => {
        console.log('📱 Native: 打开相机', options);
        return new Promise(resolve => {
          setTimeout(() => resolve({
            success: true,
            imagePath: '/tmp/captured_image.jpg',
            timestamp: Date.now()
          }), 1000);
        });
      }
    });
    
    // 地理位置模块
    this.nativeModules.set('Location', {
      getCurrentPosition: () => {
        console.log('📱 Native: 获取地理位置');
        return new Promise(resolve => {
          setTimeout(() => resolve({
            latitude: 40.7128,
            longitude: -74.0060,
            accuracy: 10,
            timestamp: Date.now()
          }), 500);
        });
      }
    });
  }
  
  // 处理来自 WebView 的消息
  async handleMessage(messageStr) {
    try {
      const message = JSON.parse(messageStr);
      console.log('📱 Native: 处理 WebView 消息', message);
      
      const { method, params, callbackId } = message;
      
      // 解析模块和方法名
      const [moduleName, methodName] = method.split('.');
      const module = this.nativeModules.get(moduleName);
      
      if (!module || !module[methodName]) {
        throw new Error(`Method not found: ${method}`);
      }
      
      // 调用原生方法
      const result = await module[methodName](params);
      
      // 回调给 WebView
      if (callbackId) {
        this.callWebViewCallback(callbackId, result, null);
      }
      
    } catch (error) {
      console.error('📱 Native: 处理消息错误', error.message);
      if (message.callbackId) {
        this.callWebViewCallback(message.callbackId, null, error.message);
      }
    }
  }
  
  // 调用 WebView 回调
  callWebViewCallback(callbackId, result, error) {
    if (this.webView) {
      // 在真实环境中，这里会执行 WebView 中的 JavaScript
      // 比如 webView.evaluateJavaScript(`window.JSBridge.receiveFromNative(...)`)
      this.webView.receiveFromNative(callbackId, result, error);
    }
  }
  
  // 原生主动调用 WebView 方法
  callWebView(method, params) {
    console.log('📱 Native: 调用 WebView 方法', { method, params });
    
    if (this.webView) {
      try {
        const result = this.webView.handleNativeCall(method, params);
        console.log('📱 Native: WebView 方法执行结果', result);
        return result;
      } catch (error) {
        console.error('📱 Native: WebView 方法执行失败', error.message);
        throw error;
      }
    }
  }
}

/**
 * JSBridge 使用示例
 */
class BridgeExample {
  constructor() {
    this.jsBridge = new WebViewJSBridge();
    this.nativeBridge = new NativeAppBridge();
    
    // 建立连接
    this.nativeBridge.setWebView(this.jsBridge);
    
    // 模拟原生注入
    window.NativeBridge = this.nativeBridge;
    
    this.jsBridge.init();
  }
  
  // 演示设备信息获取
  async demonstrateDeviceInfo() {
    console.log('\n--- 演示: 获取设备信息 ---');
    
    return new Promise((resolve) => {
      this.jsBridge.callNative('DeviceInfo.getDeviceInfo', {}, (error, result) => {
        if (error) {
          console.error('获取设备信息失败:', error.message);
        } else {
          console.log('设备信息:', result);
        }
        resolve();
      });
    });
  }
  
  // 演示数据存储
  async demonstrateStorage() {
    console.log('\n--- 演示: 数据存储 ---');
    
    // 存储数据
    await new Promise((resolve) => {
      this.jsBridge.callNative('Storage.setItem', 
        { key: 'user_id', value: '12345' }, 
        (error, result) => {
          if (error) {
            console.error('存储失败:', error.message);
          } else {
            console.log('存储成功:', result);
          }
          resolve();
        }
      );
    });
    
    // 获取数据
    await new Promise((resolve) => {
      this.jsBridge.callNative('Storage.getItem', 
        { key: 'user_id' }, 
        (error, result) => {
          if (error) {
            console.error('获取失败:', error.message);
          } else {
            console.log('获取到数据:', result);
          }
          resolve();
        }
      );
    });
  }
  
  // 演示相机功能
  async demonstrateCamera() {
    console.log('\n--- 演示: 相机功能 ---');
    
    return new Promise((resolve) => {
      this.jsBridge.callNative('Camera.openCamera', 
        { quality: 0.8, allowEdit: true }, 
        (error, result) => {
          if (error) {
            console.error('打开相机失败:', error.message);
          } else {
            console.log('拍照成功:', result);
          }
          resolve();
        }
      );
    });
  }
  
  // 演示原生主动调用
  demonstrateNativeToJS() {
    console.log('\n--- 演示: 原生主动调用 JS ---');
    
    // 模拟原生推送通知
    setTimeout(() => {
      this.nativeBridge.callWebView('showAlert', {
        message: '您有新消息',
        type: 'info'
      });
    }, 2000);
    
    // 模拟原生更新UI
    setTimeout(() => {
      this.nativeBridge.callWebView('updateUI', {
        type: 'badge',
        count: 5
      });
    }, 3000);
  }
  
  // 运行所有演示
  async runAllDemos() {
    console.log('=== JSBridge 通信演示 ===');
    
    await this.demonstrateDeviceInfo();
    await this.demonstrateStorage();
    await this.demonstrateCamera();
    this.demonstrateNativeToJS();
    
    console.log('\n=== 演示完成 ===');
  }
}

/**
 * JSBridge 安全性和性能考虑
 */
function analyzeBridgeConsiderations() {
  console.log('\n=== JSBridge 技术考量 ===');
  
  const considerations = {
    security: [
      '输入验证: 防止恶意 JavaScript 调用',
      '权限控制: 限制可调用的原生方法',
      '数据加密: 敏感数据传输加密',
      'CSP策略: 内容安全策略防护'
    ],
    performance: [
      '异步调用: 避免阻塞主线程',
      '批量处理: 合并多个小请求',
      '缓存机制: 缓存频繁访问的数据',
      '超时处理: 设置合理的超时时间'
    ],
    reliability: [
      '错误处理: 完善的错误回调机制',
      '重试机制: 关键操作支持重试',
      '降级策略: Bridge 失败时的备用方案',
      '版本兼容: 处理不同版本的兼容性'
    ]
  };
  
  Object.entries(considerations).forEach(([category, items]) => {
    console.log(`\n${category.toUpperCase()} 考虑:`);
    items.forEach(item => console.log(`  • ${item}`));
  });
}

// 运行演示
if (typeof window !== 'undefined') {
  // 浏览器环境
  window.BridgeExample = BridgeExample;
  window.runBridgeDemo = () => {
    const example = new BridgeExample();
    example.runAllDemos().then(() => {
      analyzeBridgeConsiderations();
    });
  };
  
  console.log('在浏览器控制台运行: runBridgeDemo()');
} else {
  // Node.js 环境
  const example = new BridgeExample();
  example.runAllDemos().then(() => {
    analyzeBridgeConsiderations();
  });
}

module.exports = {
  WebViewJSBridge,
  NativeAppBridge,
  BridgeExample
};
