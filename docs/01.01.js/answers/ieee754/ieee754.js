// IEEE 754 浮点数标准是现代计算机中用于表示浮点数（包括小数和非常大或非常小的数）的通用标准。
// 它定义了数字的二进制表示格式，通常包括三个主要部分:
// 1. 符号位 (Sign bit): 1位。0表示正数，1表示负数。
// 2. 指数位 (Exponent bits): 用于表示数字的数量级（小数点的位置）。它存储的是一个偏置指数（biased exponent），
//    实际指数需要通过存储值减去一个固定的偏移量（bias）来得到。
//    - 单精度 (32位, float): 8位指数，偏移量 (bias) 为 127。
//    - 双精度 (64位, double): 11位指数，偏移量 (bias) 为 1023。
// 3. 尾数位 (Mantissa/Fraction bits): 用于表示数字的精度（有效数字）。
//    - 对于规格化数 (normalized numbers)，尾数部分表示实际小数部分，并隐含一个前导的 '1' (即 1.fraction)。
//    - 对于非规格化数 (subnormal/denormalized numbers)，尾数部分表示实际小数部分，并隐含一个前导的 '0' (即 0.fraction)，此时指数为允许的最小固定值。
//
// 特殊值的表示:
// - 零 (Zero): 指数位和尾数位都为全0。符号位可以是0 (+0) 或 1 (-0)。
// - 无穷大 (Infinity): 指数位为全1，尾数位为全0。符号位决定是正无穷大还是负无穷大。
// - NaN (Not a Number): 指数位为全1，且尾数位非0。表示一个无效的或未定义的操作结果。
// - 非规格化数 (Subnormal/Denormalized): 指数位为全0，且尾数位非0。用于表示非常接近于零的数，提供了比规格化数更平滑的下溢（gradual underflow）。

/**
 * 将数字转换为其 IEEE 754 标准的二进制字符串表示。
 * 使用 DataView 和 ArrayBuffer 来获取数字的底层二进制表示。
 * @param {number} num 要转换的数字。
 * @param {string} precision 精度，可以是 'single' (32位) 或 'double' (64位)。默认为 'single'。
 * @returns {string} 数字的 IEEE 754 二进制字符串。
 * @throws {Error} 如果精度无效或不支持 BigInt 而尝试转换双精度。
 */
function numberToIEEE754Binary (num, precision = 'single') {
  let buffer, view, bits
  const bitsInByte = 8

  if (precision === 'single') {
    const bytes = 4 // 32位 = 4字节
    buffer = new ArrayBuffer(bytes)
    view = new DataView(buffer)
    // 使用大端字节序写入浮点数。setFloat32本身处理数字到IEEE754格式的转换。
    view.setFloat32(0, num, false) // false 表示大端 (Big-Endian)
    // 将这4个字节作为一个32位无符号整数读出，同样使用大端字节序。
    // 这确保了得到的整数的位模式与IEEE 754的符号-指数-尾数顺序一致。
    bits = view.getUint32(0, false)
    return bits.toString(2).padStart(bytes * bitsInByte, '0')
  } else if (precision === 'double') {
    const bytes = 8 // 64位 = 8字节
    buffer = new ArrayBuffer(bytes)
    view = new DataView(buffer)
    view.setFloat64(0, num, false) // false 表示大端 (Big-Endian)

    // 对于64位，需要使用BigInt来完整表示，因为普通Number可能无法精确表示这么大的整数。
    if (typeof view.getBigUint64 === 'function') {
      bits = view.getBigUint64(0, false)
    } else {
      // 兼容没有 getBigUint64 的环境 (例如较旧的浏览器或Node.js版本)
      // 分别读取高32位和低32位，然后合并
      const high = view.getUint32(0, false) // 前4字节 (大端)
      const low = view.getUint32(4, false) // 后4字节 (大端)
      // 需要 BigInt 来进行位移操作以避免精度损失
      if (typeof BigInt === 'undefined') {
        throw new Error('BigInt is required for double precision in this environment.')
      }
      bits = (BigInt(high) << BigInt(32)) + BigInt(low)
    }
    return bits.toString(2).padStart(bytes * bitsInByte, '0')
  } else {
    throw new Error("无效的精度参数。请使用 'single' 或 'double'。")
  }
}

/**
 * 解析 IEEE 754 各个组成部分并提供详细解释。
 * @param {number} num 要分析的数字。
 * @param {string} precision 精度，可以是 'single' (32位) 或 'double' (64位)。默认为 'single'。
 * @returns {object} 包含数字的 IEEE 754 各组成部分及其解释的对象。
 *                   例如: { originalNumber, precision, binaryString, sign, exponent, mantissa, interpretation }
 */
function getNumberIEEE754Components (num, precision = 'single') {
  const binaryRepresentation = numberToIEEE754Binary(num, precision)
  let exponentBitsCount, mantissaBitsCount, bias

  if (precision === 'single') {
    exponentBitsCount = 8
    mantissaBitsCount = 23
    bias = 127
  } else { // double
    exponentBitsCount = 11
    mantissaBitsCount = 52
    bias = 1023
  }

  const signBit = binaryRepresentation.substring(0, 1)
  const exponentStr = binaryRepresentation.substring(1, 1 + exponentBitsCount)
  const mantissaStr = binaryRepresentation.substring(1 + exponentBitsCount)

  const exponentValStored = parseInt(exponentStr, 2) // 指数部分存储的十进制值

  const interpretation = interpretIEEE754Parts(signBit, exponentStr, mantissaStr, bias, exponentBitsCount, mantissaBitsCount, num)

  return {
    originalNumber: num,
    precision: `${precision} (${precision === 'single' ? 32 : 64}-bit)`,
    binaryString: binaryRepresentation,
    sign: {
      bit: signBit,
      description: `符号位 (Sign): ${signBit} (${signBit === '0' ? '正 (+)' : '负 (-)'})`
    },
    exponent: {
      bits: exponentStr,
      storedValue: exponentValStored,
      description: `指数部分 (Exponent): ${exponentStr} (二进制存储值)。十进制存储值为 ${exponentValStored}。真实指数的计算方式取决于数字类型 (规格化数: 存储值 - ${bias}, 非规格化数: 1 - ${bias})。`
    },
    mantissa: {
      bits: mantissaStr,
      description: `尾数部分 (Mantissa/Fraction): ${mantissaStr} (二进制)。对于规格化数，它代表小数部分，并隐含前导 '1.'；对于非规格化数，隐含前导 '0.'。`
    },
    interpretation
  }
}

/**
 * 辅助函数：根据解析出的符号、指数、尾数部分，结合IEEE 754规则生成详细的文字解释。
 * @param {string} signBit 符号位 ('0' 或 '1')。
 * @param {string} exponentBitsStr 指数部分的二进制字符串。
 * @param {string} mantissaBitsStr 尾数部分的二进制字符串。
 * @param {number} bias 指数偏移量。
 * @param {number} totalExponentBits 指数部分的总位数。
 * @param {number} totalMantissaBits 尾数部分的总位数。
 * @param {number} originalNumber 原始输入的数字 (用于在解释中显示，以供参考)。
 * @returns {string} 对该 IEEE 754 表示的详细文字解释。
 */
function interpretIEEE754Parts (signBit, exponentBitsStr, mantissaBitsStr, bias, totalExponentBits, totalMantissaBits, originalNumber) {
  const exponentValueStored = parseInt(exponentBitsStr, 2) // 指数部分存储的十进制值
  const signChar = (signBit === '1') ? '-' : '+'

  // 检查特殊值
  // 1. 指数位全为1
  if (exponentBitsStr === '1'.repeat(totalExponentBits)) {
    if (mantissaBitsStr === '0'.repeat(totalMantissaBits)) {
      return `类型: 无穷大 (Infinity)。
  符号: ${signChar}
  指数位: ${exponentBitsStr} (全1)
  尾数位: ${mantissaBitsStr} (全0)
  值: ${signChar}Infinity`
    } else {
      return `类型: NaN (Not a Number)。
  符号: ${signChar} (通常被忽略，但可以是任意值)
  指数位: ${exponentBitsStr} (全1)
  尾数位: ${mantissaBitsStr} (非0)
  值: NaN`
    }
  }

  // 2. 指数位全为0
  if (exponentBitsStr === '0'.repeat(totalExponentBits)) {
    if (mantissaBitsStr === '0'.repeat(totalMantissaBits)) {
      return `类型: 零 (Zero)。
  符号: ${signChar}
  指数位: ${exponentBitsStr} (全0)
  尾数位: ${mantissaBitsStr} (全0)
  值: ${signChar}0`
    } else {
      // 非规格化数 (Subnormal/Denormalized number)
      const trueExponent = 1 - bias
      return `类型: 非规格化数 (Subnormal/Denormalized Number)。
  符号: ${signChar}
  指数位: ${exponentBitsStr} (全0, 表示特殊情况)
   有效指数 (Effective exponent) = 1 - Bias = 1 - ${bias} = ${trueExponent}.
  尾数位: ${mantissaBitsStr} (非全0)
   实际尾数 (Actual Mantissa with implicit bit '0.') = 0.${mantissaBitsStr} (二进制)
  计算公式: V = (-1)^S * (0 + Fraction) * 2^(1 - Bias)
  表示的值 (Value represented) = ${signChar}(0.${mantissaBitsStr})_2 * 2^(${trueExponent})
                     约等于 ${originalNumber} (原始输入值)`
    }
  }

  // 3. 规格化数 (Normalized number)
  const trueExponent = exponentValueStored - bias
  return `类型: 规格化数 (Normalized Number)。
  符号: ${signChar}
  指数位: ${exponentBitsStr} (十进制存储值: ${exponentValueStored})
   真实指数 (True exponent) = 存储值 - Bias = ${exponentValueStored} - ${bias} = ${trueExponent}.
  尾数位: ${mantissaBitsStr}
   实际尾数 (Actual Mantissa with implicit bit '1.') = 1.${mantissaBitsStr} (二进制)
  计算公式: V = (-1)^S * (1 + Fraction) * 2^(Exponent_stored - Bias)
  表示的值 (Value represented) = ${signChar}(1.${mantissaBitsStr})_2 * 2^(${trueExponent})
                     约等于 ${originalNumber} (原始输入值)`
}

/**
 * 将 IEEE 754 标准的二进制字符串转换回数字。
 * @param {string} binaryString IEEE 754 标准的二进制字符串。
 * @param {string} precision 精度，可以是 'single' (32位) 或 'double' (64位)。默认为 'single'。
 * @returns {number} 从二进制字符串转换得到的数字。
 * @throws {Error} 如果二进制字符串长度不正确、包含无效字符、精度无效，或不支持BigInt而尝试转换双精度。
 */
function ieee754BinaryToNumber (binaryString, precision = 'single') {
  let buffer, view, expectedLength
  const bitsInByte = 8

  if (!/^[01]+$/.test(binaryString)) {
    throw new Error("二进制字符串包含无效字符 (只允许 '0' 和 '1')。")
  }

  if (precision === 'single') {
    expectedLength = 32
    if (binaryString.length !== expectedLength) {
      throw new Error(`单精度二进制字符串必须是 ${expectedLength} 位长。`)
    }
    buffer = new ArrayBuffer(4) // 4 bytes for 32-bit float
    view = new DataView(buffer)
    const intVal = parseInt(binaryString, 2)
    // 将整数值以大端字节序写入buffer
    view.setUint32(0, intVal, false) // false for Big-Endian
    // 以大端字节序从buffer中读取为浮点数
    return view.getFloat32(0, false)
  } else if (precision === 'double') {
    expectedLength = 64
    if (binaryString.length !== expectedLength) {
      throw new Error(`双精度二进制字符串必须是 ${expectedLength} 位长。`)
    }
    buffer = new ArrayBuffer(8) // 8 bytes for 64-bit float
    view = new DataView(buffer)

    if (typeof BigInt === 'undefined') {
      throw new Error('BigInt is required for double precision in this environment.')
    }
    const bigIntVal = BigInt('0b' + binaryString)

    if (typeof view.setBigUint64 === 'function') {
      view.setBigUint64(0, bigIntVal, false) // false for Big-Endian
    } else {
      // 兼容没有 setBigUint64 的环境
      const MASK_32_BIT = BigInt(0xFFFFFFFF)
      const high = Number((bigIntVal >> BigInt(32)) & MASK_32_BIT)
      const low = Number(bigIntVal & MASK_32_BIT)
      view.setUint32(0, high, false) // MSB part
      view.setUint32(4, low, false) // LSB part
    }
    return view.getFloat64(0, false) // false for Big-Endian
  } else {
    throw new Error("无效的精度参数。请使用 'single' 或 'double'。")
  }
}

// 示例用法 (可以取消注释下面的代码块在 Node.js 或浏览器控制台中进行测试):
/*
function runExamples() {
   console.log("--- IEEE 754 转换与解析示例 ---");

   const testCases = [
      { label: "正数 (单精度)", number: 123.456, precision: 'single' },
      { label: "负数 (单精度)", number: -0.75, precision: 'single' },
      { label: "零 (单精度)", number: 0.0, precision: 'single' },
      { label: "负零 (单精度)", number: -0.0, precision: 'single' },
      { label: "正无穷大 (单精度)", number: Infinity, precision: 'single' },
      { label: "负无穷大 (单精度)", number: -Infinity, precision: 'single' },
      { label: "NaN (单精度)", number: NaN, precision: 'single' },
      { label: "最小正规格化数 (单精度)", number: Math.pow(2, -126), precision: 'single' },
      { label: "最大次规格化数 (单精度)", number: Math.pow(2, -127) * (1 - Math.pow(2,-23)), precision: 'single'},
      { label: "最小正次规格化数 (单精度)", number: Math.pow(2, -149), precision: 'single' }, // 2^-(126+23)

      { label: "正数 (双精度)", number: 9876.54321, precision: 'double' },
      { label: "非常小的负数 (双精度)", number: -Math.pow(2, -1000), precision: 'double' },
      { label: "最小正规格化数 (双精度)", number: Math.pow(2, -1022), precision: 'double' },
      { label: "最小正次规格化数 (双精度)", number: Math.pow(2, -1074), precision: 'double' }, // 2^-(1022+52)
   ];

   testCases.forEach(tc => {
      console.log(`\n--- ${tc.label} ---`);
      try {
         const components = getNumberIEEE754Components(tc.number, tc.precision);
         console.log(`原始数字: ${tc.number}`);
         console.log(`精度: ${components.precision}`);
         console.log(`完整二进制: ${components.binaryString}`);
         console.log(components.sign.description);
         console.log(components.exponent.description);
         console.log(components.mantissa.description);
         console.log(`解释详情:\n  ${components.interpretation.replace(/\n/g, '\n  ')}`);

         const recoveredNumber = ieee754BinaryToNumber(components.binaryString, tc.precision);
         console.log(`从二进制恢复的数字: ${recoveredNumber}`);
         if (Object.is(tc.number, recoveredNumber) || Math.abs(tc.number - recoveredNumber) < 1e-9 ) { // Check for NaN and +/-0 equality
             console.log("恢复成功!");
         } else {
             console.warn(`恢复可能存在微小差异或失败 (原始: ${tc.number}, 恢复: ${recoveredNumber})`);
         }
      } catch (e) {
         console.error(`处理 ${tc.label} 时出错: ${e.message}`);
         if (e.stack) console.error(e.stack);
      }
   });

   // 测试直接从二进制字符串转换
   console.log("\n--- 从已知二进制串转换 (单精度 1.0) ---");
   const binaryForOneSingle = "00111111100000000000000000000000"; // 1.0f
   try {
      const one = ieee754BinaryToNumber(binaryForOneSingle, 'single');
      console.log(`二进制 ${binaryForOneSingle} (${binaryForOneSingle.length}位) 代表数字: ${one}`);
      const componentsOne = getNumberIEEE754Components(one, 'single');
      console.log(`解释详情:\n  ${componentsOne.interpretation.replace(/\n/g, '\n  ')}`);
   } catch (e) {
      console.error(`转换二进制串时出错: ${e.message}`);
   }
}

runExamples();
*/
