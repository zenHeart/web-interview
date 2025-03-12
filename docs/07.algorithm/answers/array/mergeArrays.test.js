const { mergeArrays } = require('./mergeArrays');

describe('mergeArrays', () => {
  test('merge two sorted arrays', () => {
    const s1 = [1, 3, 5, 6, undefined, undefined, undefined];
    const s2 = [3, 10];
    const result = mergeArrays(s1, s2);
    expect(result).toEqual([1, 3, 3, 5, 6, 10]);
  });
});
