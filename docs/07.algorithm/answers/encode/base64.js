/**
 * Base64编码实现
 */
class Base64 {
  constructor() {
    // Base64字符表
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    this.charMap = {};
    
    // 构建字符映射表
    for (let i = 0; i < this.chars.length; i++) {
      this.charMap[this.chars[i]] = i;
    }
  }

  /**
   * 编码字符串为Base64
   * @param {string} str - 输入字符串
   * @returns {string} Base64编码结果
   */
  encode(str) {
    let result = '';
    let i = 0;
    
    // 将字符串转换为字节数组
    const bytes = new TextEncoder().encode(str);
    
    // 每3个字节一组进行处理
    while (i < bytes.length) {
      const a = bytes[i];
      const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
      const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
      
      // 合并为24位
      const bitmap = (a << 16) | (b << 8) | c;
      
      // 分割为4个6位，转换为Base64字符
      result += this.chars[(bitmap >> 18) & 63];
      result += this.chars[(bitmap >> 12) & 63];
      result += i + 1 < bytes.length ? this.chars[(bitmap >> 6) & 63] : '=';
      result += i + 2 < bytes.length ? this.chars[bitmap & 63] : '=';
      
      i += 3;
    }
    
    return result;
  }

  /**
   * 解码Base64字符串
   * @param {string} base64 - Base64编码字符串
   * @returns {string} 解码后的字符串
   */
  decode(base64) {
    // 移除填充字符
    const cleanBase64 = base64.replace(/=/g, '');
    let result = '';
    let i = 0;
    
    const bytes = [];
    
    // 每4个字符一组进行处理
    while (i < cleanBase64.length) {
      const a = this.charMap[cleanBase64[i]] || 0;
      const b = this.charMap[cleanBase64[i + 1]] || 0;
      const c = this.charMap[cleanBase64[i + 2]] || 0;
      const d = this.charMap[cleanBase64[i + 3]] || 0;
      
      // 合并为24位
      const bitmap = (a << 18) | (b << 12) | (c << 6) | d;
      
      // 分割为3个8位字节
      bytes.push((bitmap >> 16) & 255);
      if (i + 2 < cleanBase64.length) bytes.push((bitmap >> 8) & 255);
      if (i + 3 < cleanBase64.length) bytes.push(bitmap & 255);
      
      i += 4;
    }
    
    // 将字节数组转换回字符串
    return new TextDecoder().decode(new Uint8Array(bytes));
  }

  /**
   * 编码二进制数据为Base64
   * @param {Uint8Array} bytes - 二进制数据
   * @returns {string} Base64编码结果
   */
  encodeBytes(bytes) {
    let result = '';
    let i = 0;
    
    while (i < bytes.length) {
      const a = bytes[i];
      const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
      const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
      
      const bitmap = (a << 16) | (b << 8) | c;
      
      result += this.chars[(bitmap >> 18) & 63];
      result += this.chars[(bitmap >> 12) & 63];
      result += i + 1 < bytes.length ? this.chars[(bitmap >> 6) & 63] : '=';
      result += i + 2 < bytes.length ? this.chars[bitmap & 63] : '=';
      
      i += 3;
    }
    
    return result;
  }
}

// 创建Base64实例
const base64 = new Base64();

module.exports = { Base64, base64 };
