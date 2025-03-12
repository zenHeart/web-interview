const { twoSum } = require('./twoSum');

describe('twoSum', () => {
  test('find two numbers that sum to target', () => {
    const s1 = [1, 3, 5, 6];
    const target = 9;
    const result = twoSum(s1, target);
    expect(result).toEqual([3, 6]);
  });

  test('return empty array if no solution', () => {
    const s2 = [1, 3, 5, 6, 7];
    const target1 = 8;
    const result = twoSum(s2, target1);
    expect(result).toEqual([3, 5]);
  });
});
