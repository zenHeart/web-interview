/**
 * 大数字符串相加
 * @param {string} num1 - 第一个大数字符串
 * @param {string} num2 - 第二个大数字符串
 * @returns {string} 相加结果
 */
function addStrings(num1, num2) {
  const result = [];
  let carry = 0;
  let i = num1.length - 1;
  let j = num2.length - 1;
  
  while (i >= 0 || j >= 0 || carry) {
    const digit1 = i >= 0 ? Number(num1[i]) : 0;
    const digit2 = j >= 0 ? Number(num2[j]) : 0;
    const sum = digit1 + digit2 + carry;
    
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    
    i--;
    j--;
  }
  
  return result.join('');
}

/**
 * 大数字符串相乘
 * @param {string} num1 - 第一个大数字符串
 * @param {string} num2 - 第二个大数字符串
 * @returns {string} 相乘结果
 */
function multiplyStrings(num1, num2) {
  // 处理特殊情况
  if (num1 === '0' || num2 === '0') {
    return '0';
  }
  
  let result = '0';
  
  // num2的每一位与num1相乘
  for (let i = num2.length - 1; i >= 0; i--) {
    let tempResult = multiplyByDigit(num1, num2[i]);
    
    // 添加对应的0（位数偏移）
    for (let j = 0; j < num2.length - 1 - i; j++) {
      tempResult += '0';
    }
    
    result = addStrings(result, tempResult);
  }
  
  return result;
}

/**
 * 大数字符串与单个数字相乘
 * @param {string} num - 大数字符串
 * @param {string} digit - 单个数字字符
 * @returns {string} 相乘结果
 */
function multiplyByDigit(num, digit) {
  if (digit === '0') return '0';
  
  const result = [];
  let carry = 0;
  const d = Number(digit);
  
  for (let i = num.length - 1; i >= 0; i--) {
    const product = Number(num[i]) * d + carry;
    result.unshift(product % 10);
    carry = Math.floor(product / 10);
  }
  
  if (carry) {
    result.unshift(carry);
  }
  
  return result.join('');
}

/**
 * 大数字符串减法
 * @param {string} num1 - 被减数（应该大于等于减数）
 * @param {string} num2 - 减数
 * @returns {string} 相减结果
 */
function subtractStrings(num1, num2) {
  // 确保num1 >= num2
  if (compareStrings(num1, num2) < 0) {
    throw new Error('被减数应该大于等于减数');
  }
  
  const result = [];
  let borrow = 0;
  let i = num1.length - 1;
  let j = num2.length - 1;
  
  while (i >= 0) {
    let digit1 = Number(num1[i]) - borrow;
    const digit2 = j >= 0 ? Number(num2[j]) : 0;
    
    if (digit1 < digit2) {
      digit1 += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    
    result.unshift(digit1 - digit2);
    i--;
    j--;
  }
  
  // 移除前导零
  while (result.length > 1 && result[0] === 0) {
    result.shift();
  }
  
  return result.join('');
}

/**
 * 比较两个大数字符串
 * @param {string} num1 - 第一个数
 * @param {string} num2 - 第二个数
 * @returns {number} 1表示num1>num2，-1表示num1<num2，0表示相等
 */
function compareStrings(num1, num2) {
  // 移除前导零
  num1 = num1.replace(/^0+/, '') || '0';
  num2 = num2.replace(/^0+/, '') || '0';
  
  if (num1.length > num2.length) return 1;
  if (num1.length < num2.length) return -1;
  
  return num1.localeCompare(num2);
}

/**
 * 大数字符串除法（整数除法）
 * @param {string} dividend - 被除数
 * @param {string} divisor - 除数
 * @returns {Object} {quotient: 商, remainder: 余数}
 */
function divideStrings(dividend, divisor) {
  if (divisor === '0') {
    throw new Error('除数不能为0');
  }
  
  if (compareStrings(dividend, divisor) < 0) {
    return { quotient: '0', remainder: dividend };
  }
  
  let quotient = '';
  let remainder = '';
  
  for (let i = 0; i < dividend.length; i++) {
    remainder += dividend[i];
    remainder = remainder.replace(/^0+/, '') || '0';
    
    let count = 0;
    while (compareStrings(remainder, divisor) >= 0) {
      remainder = subtractStrings(remainder, divisor);
      count++;
    }
    
    quotient += count.toString();
  }
  
  quotient = quotient.replace(/^0+/, '') || '0';
  return { quotient, remainder };
}

module.exports = {
  addStrings,
  multiplyStrings,
  multiplyByDigit,
  subtractStrings,
  compareStrings,
  divideStrings
};
