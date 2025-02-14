/**
丑数是可以被 a 或 b 或 c 整除的 正整数 。

给你四个整数：n 、a 、b 、c ，请你设计一个算法来找出第 n 个丑数。

输入：n = 3, a = 2, b = 3, c = 5
输出：4
解释：丑数序列为 2, 3, 4, 5, 6, 8, 9, 10... 其中第 3 个是 4。

输入：n = 4, a = 2, b = 3, c = 4
输出：6
解释：丑数序列为 2, 3, 4, 6, 8, 9, 10, 12... 其中第 4 个是 6。

输入：n = 5, a = 2, b = 11, c = 13
输出：10
解释：丑数序列为 2, 4, 6, 8, 10, 11, 12, 13... 其中第 5 个是 10。
 
提示：
1 <= n, a, b, c <= 109
1 <= a * b * c <= 1018
 */
 
import { findNthNumber } from './index';

describe('findNthNumber', () => {
  test('示例1：n=3, a=2, b=3, c=5 应该返回 4', () => {
    expect(findNthNumber(3, 2, 3, 5)).toBe(4);
  });

  test('示例2：n=4, a=2, b=3, c=4 应该返回 6', () => {
    expect(findNthNumber(4, 2, 3, 4)).toBe(6);
  });

  test('示例3：n=5, a=2, b=11, c=13 应该返回 10', () => {
    expect(findNthNumber(5, 2, 11, 13)).toBe(10);
  });

  test('边界情况：n=1 应该返回最小的丑数', () => {
    expect(findNthNumber(1, 2, 3, 5)).toBe(2);
  });

  test('当三个数相等时的情况', () => {
    expect(findNthNumber(3, 2, 2, 2)).toBe(6);
  });

  test('较大的n值测试', () => {
    expect(findNthNumber(10, 2, 3, 5)).toBe(14);
  });
});