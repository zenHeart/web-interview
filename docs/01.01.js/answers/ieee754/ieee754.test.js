/* eslint-disable jest/no-conditional-expect */
// ieee754.test.js
const {
  numberToIEEE754Binary,
  ieee754BinaryToNumber,
  getNumberIEEE754Components
} = require('./ieee754.js')

describe('IEEE 754 浮点数转换与解析', () => {
  describe('numberToIEEE754Binary & ieee754BinaryToNumber 单精度 (single, 32-bit)', () => {
    const cases = [
      { num: 0, bin: '00000000000000000000000000000000' },
      { num: -0, bin: '10000000000000000000000000000000' },
      { num: 1, bin: '00111111100000000000000000000000' },
      { num: -1, bin: '10111111100000000000000000000000' },
      { num: 2, bin: '01000000000000000000000000000000' },
      { num: -2, bin: '11000000000000000000000000000000' },
      { num: 123.456, bin: undefined }, // will check round-trip
      { num: -0.75, bin: undefined },
      { num: Infinity, bin: '01111111100000000000000000000000' },
      { num: -Infinity, bin: '11111111100000000000000000000000' },
      { num: NaN, bin: undefined }, // NaN bit pattern can vary
      { num: Math.pow(2, -126), bin: '00000000100000000000000000000000' }, // 最小正规格化数
      { num: Math.pow(2, -149), bin: '00000000000000000000000000000001' } // 最小正次规格化数
    ]

    cases.forEach(({ num, bin }) => {
      const label = `number: ${String(num)}`
      test(`${label} -> binary -> number`, () => {
        const binary = numberToIEEE754Binary(num, 'single')
        // 验证长度
        expect(binary).toHaveLength(32)
        // 如果有预期二进制，严格比对
        if (bin) {
          expect(binary).toBe(bin)
        }
        // round-trip: 二进制转回数字
        const recovered = ieee754BinaryToNumber(binary, 'single')
        if (Number.isNaN(num)) {
          expect(Number.isNaN(recovered)).toBe(true)
        } else if (Object.is(num, 0) || Object.is(num, -0)) {
          expect(Object.is(recovered, num)).toBe(true)
        } else if (!Number.isFinite(num)) {
          expect(recovered).toBe(num)
        } else {
          // 允许极小误差
          expect(Math.abs(recovered - num)).toBeLessThan(1e-6)
        }
      })
    })
  })

  describe('numberToIEEE754Binary & ieee754BinaryToNumber 双精度 (double, 64-bit)', () => {
    const cases = [
      { num: 0, bin: '0000000000000000000000000000000000000000000000000000000000000000' },
      { num: -0, bin: '1000000000000000000000000000000000000000000000000000000000000000' },
      { num: 1, bin: '0011111111110000000000000000000000000000000000000000000000000000' },
      { num: -1, bin: '1011111111110000000000000000000000000000000000000000000000000000' },
      { num: 2, bin: '0100000000000000000000000000000000000000000000000000000000000000' },
      { num: -2, bin: '1100000000000000000000000000000000000000000000000000000000000000' },
      { num: 9876.54321, bin: undefined },
      { num: -Math.pow(2, -1000), bin: undefined },
      { num: Infinity, bin: '0111111111110000000000000000000000000000000000000000000000000000' },
      { num: -Infinity, bin: '1111111111110000000000000000000000000000000000000000000000000000' },
      { num: NaN, bin: undefined },
      { num: Math.pow(2, -1022), bin: '0000000000010000000000000000000000000000000000000000000000000000' }, // 最小正规格化数
      { num: Math.pow(2, -1074), bin: '0000000000000000000000000000000000000000000000000000000000000001' } // 最小正次规格化数
    ]

    cases.forEach(({ num, bin }) => {
      const label = `number: ${String(num)}`
      test(`${label} -> binary -> number`, () => {
        const binary = numberToIEEE754Binary(num, 'double')
        expect(binary).toHaveLength(64)
        if (bin) {
          expect(binary).toBe(bin)
        }
        const recovered = ieee754BinaryToNumber(binary, 'double')
        if (Number.isNaN(num)) {
          expect(Number.isNaN(recovered)).toBe(true)
        } else if (Object.is(num, 0) || Object.is(num, -0)) {
          expect(Object.is(recovered, num)).toBe(true)
        } else if (!Number.isFinite(num)) {
          expect(recovered).toBe(num)
        } else {
          expect(Math.abs(recovered - num)).toBeLessThan(1e-12)
        }
      })
    })
  })

  describe('getNumberIEEE754Components 结构与解释', () => {
    test('正数 1.5 (single)', () => {
      const comp = getNumberIEEE754Components(1.5, 'single')
      expect(comp.sign.bit).toBe('0')
      expect(comp.exponent.bits).toBe('01111111')
      expect(comp.mantissa.bits.startsWith('100000')).toBe(true)
      expect(comp.binaryString).toBe('00111111110000000000000000000000')
    })

    test('负数 -2.25 (single)', () => {
      const comp = getNumberIEEE754Components(-2.25, 'single')
      expect(comp.sign.bit).toBe('1')
      expect(comp.exponent.bits).toBe('10000000')
      expect(comp.binaryString).toBe('11000000000100000000000000000000')
    })

    test('正无穷大 (double)', () => {
      const comp = getNumberIEEE754Components(Infinity, 'double')
      expect(comp.sign.bit).toBe('0')
      expect(comp.exponent.bits).toBe('11111111111')
      expect(comp.mantissa.bits).toBe('0000000000000000000000000000000000000000000000000000')
      expect(comp.interpretation).toMatch(/Infinity/)
    })

    test('NaN (single)', () => {
      const comp = getNumberIEEE754Components(NaN, 'single')
      expect(comp.exponent.bits).toBe('11111111')
      expect(Number.parseInt(comp.mantissa.bits, 2)).not.toBe(0)
      expect(comp.interpretation).toMatch(/NaN/)
    })
  })

  describe('异常处理', () => {
    test('无效精度参数', () => {
      expect(() => numberToIEEE754Binary(1, 'invalid')).toThrow()
      expect(() => ieee754BinaryToNumber('0'.repeat(32), 'invalid')).toThrow()
    })
    test('二进制长度不符', () => {
      expect(() => ieee754BinaryToNumber('0'.repeat(31), 'single')).toThrow()
      expect(() => ieee754BinaryToNumber('0'.repeat(63), 'double')).toThrow()
    })
    test('二进制包含非法字符', () => {
      expect(() => ieee754BinaryToNumber('0x12345678', 'single')).toThrow()
    })
  })
})
