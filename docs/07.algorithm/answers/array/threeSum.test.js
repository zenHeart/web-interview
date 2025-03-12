const { threeSum } = require('./threeSum');

describe('threeSum', () => {
  test('find all triplets that sum to zero', () => {
    const s1 = [-1, -2, 1, 2, 0];
    const result = threeSum(s1);
    expect(result).toEqual([[-2, 0, 2], [-1, 0, 1]]);
  });
});
