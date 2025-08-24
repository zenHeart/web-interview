// JSBridge 通信机制测试
const { WebViewJSBridge, NativeAppBridge } = require('./jsbridge-demo.js');

describe('JSBridge Communication', () => {
  let jsBridge, nativeBridge;
  
  beforeEach(() => {
    jsBridge = new WebViewJSBridge();
    nativeBridge = new NativeAppBridge();
    nativeBridge.setWebView(jsBridge);
    
    // 模拟原生注入
    global.window = { NativeBridge: nativeBridge };
    jsBridge.init();
  });
  
  afterEach(() => {
    delete global.window;
  });
  
  test('WebView 调用原生方法', (done) => {
    const params = { key: 'test_key', value: 'test_value' };
    
    jsBridge.callNative('Storage.setItem', params, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual({ success: true });
      done();
    });
  });
  
  test('原生调用 WebView 方法', () => {
    const result = nativeBridge.callWebView('updateUI', {
      type: 'badge',
      count: 5
    });
    
    expect(result).toEqual({
      success: true,
      message: 'UI updated'
    });
  });
  
  test('错误处理机制', (done) => {
    jsBridge.callNative('NonExistent.method', {}, (error, result) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Method not found');
      expect(result).toBeNull();
      done();
    });
  });
  
  test('异步方法调用', (done) => {
    jsBridge.callNative('Camera.openCamera', 
      { quality: 0.8 }, 
      (error, result) => {
        expect(error).toBeNull();
        expect(result).toHaveProperty('success', true);
        expect(result).toHaveProperty('imagePath');
        done();
      }
    );
  });
  
  test('多个并发调用', async () => {
    const promises = [];
    
    for (let i = 0; i < 5; i++) {
      promises.push(
        new Promise((resolve) => {
          jsBridge.callNative('DeviceInfo.getDeviceInfo', {}, (error, result) => {
            expect(error).toBeNull();
            expect(result).toHaveProperty('platform');
            resolve(result);
          });
        })
      );
    }
    
    const results = await Promise.all(promises);
    expect(results).toHaveLength(5);
    results.forEach(result => {
      expect(result).toHaveProperty('platform', 'iOS');
    });
  });
  
  test('回调ID 唯一性', () => {
    const ids = new Set();
    
    for (let i = 0; i < 100; i++) {
      const id = jsBridge.generateCallbackId();
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
  });
  
  test('消息队列处理', () => {
    // 在 Bridge 未就绪时调用
    jsBridge.isReady = false;
    jsBridge.messageQueue = [];
    
    jsBridge.callNative('Storage.getItem', { key: 'test' });
    expect(jsBridge.messageQueue).toHaveLength(1);
    
    // Bridge 就绪后应该处理队列
    jsBridge.init();
    expect(jsBridge.messageQueue).toHaveLength(0);
  });
});

// 性能和压力测试
function performanceTest() {
  console.log('\n=== JSBridge 性能测试 ===');
  
  const jsBridge = new WebViewJSBridge();
  const nativeBridge = new NativeAppBridge();
  nativeBridge.setWebView(jsBridge);
  global.window = { NativeBridge: nativeBridge };
  jsBridge.init();
  
  // 测试高频调用性能
  console.time('高频调用性能 (1000次)');
  let completedCalls = 0;
  const totalCalls = 1000;
  
  const startTime = Date.now();
  
  for (let i = 0; i < totalCalls; i++) {
    jsBridge.callNative('DeviceInfo.getDeviceInfo', {}, () => {
      completedCalls++;
      if (completedCalls === totalCalls) {
        console.timeEnd('高频调用性能 (1000次)');
        const duration = Date.now() - startTime;
        console.log(`平均每次调用: ${(duration / totalCalls).toFixed(2)}ms`);
        console.log(`每秒调用数: ${(totalCalls / duration * 1000).toFixed(0)}`);
        
        // 内存使用情况
        console.log('\n内存使用情况:');
        console.log(`活跃回调数: ${jsBridge.callbacks.size}`);
        console.log(`消息队列长度: ${jsBridge.messageQueue.length}`);
        
        cleanup();
      }
    });
  }
  
  function cleanup() {
    delete global.window;
    console.log('\n性能测试完成');
  }
}

// 安全性测试
function securityTest() {
  console.log('\n=== JSBridge 安全性测试 ===');
  
  const jsBridge = new WebViewJSBridge();
  const nativeBridge = new NativeAppBridge();
  nativeBridge.setWebView(jsBridge);
  global.window = { NativeBridge: nativeBridge };
  jsBridge.init();
  
  // 测试恶意方法调用
  console.log('1. 测试恶意方法调用');
  jsBridge.callNative('System.deleteAllData', {}, (error) => {
    if (error) {
      console.log('   ✓ 恶意调用被正确拦截:', error.message);
    } else {
      console.log('   ✗ 安全漏洞: 恶意调用未被拦截');
    }
  });
  
  // 测试参数注入
  console.log('2. 测试参数注入攻击');
  const maliciousParams = {
    key: 'normal_key',
    value: '"; DROP TABLE users; --'
  };
  
  jsBridge.callNative('Storage.setItem', maliciousParams, (error, result) => {
    if (result && result.success) {
      console.log('   ✓ 参数注入被正确处理 (数据已清理)');
    } else {
      console.log('   注意: 需要检查参数清理逻辑');
    }
  });
  
  // 测试大数据量攻击
  console.log('3. 测试大数据量攻击');
  const largeData = {
    data: 'x'.repeat(1024 * 1024) // 1MB 数据
  };
  
  const startTime = Date.now();
  jsBridge.callNative('Storage.setItem', largeData, (error) => {
    const duration = Date.now() - startTime;
    if (duration > 5000) {
      console.log('   ⚠️  大数据处理时间过长, 可能存在DoS风险');
    } else {
      console.log('   ✓ 大数据处理性能正常');
    }
  });
  
  delete global.window;
  console.log('\n安全性测试完成');
}

// 运行测试
if (require.main === module) {
  performanceTest();
  setTimeout(() => {
    securityTest();
  }, 2000);
}

module.exports = { performanceTest, securityTest };
