import { findNthOddNumber } from './index';

describe('findNthOddNumber', () => {
  test('should return correct sequence numbers', () => {
    // 测试前几个数字是否正确
    expect(findNthOddNumber(1)).toBe(1);  // 初始数字
    expect(findNthOddNumber(2)).toBe(3);  // 1*2+1
    expect(findNthOddNumber(3)).toBe(4);  // 1*3+1
    expect(findNthOddNumber(4)).toBe(7);  // 3*2+1
    expect(findNthOddNumber(5)).toBe(9);  // 4*2+1
    expect(findNthOddNumber(6)).toBe(10); // 3*3+1
    expect(findNthOddNumber(7)).toBe(13); // 4*3+1
  });

  test('should maintain sorted order', () => {
    // 获取前20个数，确保它们是有序的
    const numbers = Array.from({ length: 20 }, (_, i) => findNthOddNumber(i + 1));
    
    // 检查数组是否有序
    for (let i = 1; i < numbers.length; i++) {
      expect(numbers[i]).toBeGreaterThan(numbers[i - 1]);
    }
  });

  test('should not have duplicates', () => {
    // 获取前20个数，确保没有重复
    const numbers = Array.from({ length: 20 }, (_, i) => findNthOddNumber(i + 1));
    const uniqueNumbers = new Set(numbers);
    
    expect(uniqueNumbers.size).toBe(numbers.length);
  });

  test('should follow the generation rules', () => {
    const numbers = Array.from({ length: 10 }, (_, i) => findNthOddNumber(i + 1));
    
    // 验证每个数都是通过规则生成的（除了第一个数1）
    for (let i = 1; i < numbers.length; i++) {
      const current = numbers[i];
      
      // 检查当前数是否可以由之前的某个数通过规则生成
      const isValidNumber = numbers.slice(0, i).some(prev => 
        current === prev * 2 + 1 || current === prev * 3 + 1
      );
      
      expect(isValidNumber).toBeTruthy();
    }
  });

  test('should handle performance for larger N', () => {
    // 测试较大的N值的性能
    const start = Date.now();
    const result = findNthOddNumber(1000);
    const end = Date.now();
    
    expect(end - start).toBeLessThan(1000); // 应该在1秒内完成
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });

  test('should generate correct sequence for consecutive numbers', () => {
    // 验证连续生成的数字都是正确的
    const sequence = [1, 3, 4, 7, 9, 10, 13];
    
    for (let i = 0; i < sequence.length; i++) {
      expect(findNthOddNumber(i + 1)).toBe(sequence[i]);
    }
  });
}); 