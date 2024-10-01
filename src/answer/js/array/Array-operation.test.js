const { expect } = require('chai');
describe.skip('Array 修改数组', function () {
  it('数组开头插入元素', function () {
    const testData = {
      input: [1, 2],
      expect: [0, 1, 2]
    };
    // 返回新数组长度
    expect(testData.input.unshift(0)).toBe(testData.expect.length);
    expect(testData.input).toEqual(testData.expect);
  });
  it('数组开头删除元素', function () {
    const testData = {
      input: [1, 2],
      expect: [2]
    };
    // 返回新数组长度
    expect(testData.input.shift()).toBe(testData.expect.length);
    expect(testData.input).toEqual(testData.expect);
  });

  it('数组中间插入数据', function () {
    const testData = {
      input: [1, 2, 4, 5],
      expect: [1, 2, 3, 4, 5]
    };
    // 若未删除元素返回空数组
    expect(testData.input.splice(2, 0, 3)).toEqual([]);
    expect(testData.input).toEqual(testData.expect);
  });

  it('往数组中间删除元素', function () {
    const testData = {
      input: [1, 2, 3],
      expect: [1, 3]
    };
    // 返回删除元素组成的数组
    expect(testData.input.splice(1, 1)).toEqual([2]);
    expect(testData.input).toEqual(testData.expect);
  });

  it('数组末尾插入数据', function () {
    const testData = {
      input: [1, 2],
      expect: [1, 2, 3]
    };
    // 返回新数组长度
    expect(testData.input.push(3)).toEqual(testData.expect.length);
    expect(testData.input).toEqual(testData.expect);
  });

  it('往数组末尾删除元素', function () {
    const testData = {
      input: [1, 2, 3],
      expect: [1, 2]
    };
    // 返回删除的元素,不存在为 undefined
    expect(testData.input.pop()).toEqual(3);
    expect(testData.input).toEqual(testData.expect);
  });

  it('任意位置替换元素', function () {
    const testData = {
      input: [1, 4, 3],
      expect: [1, 2, 3]
    };
    // 返回删除的元素,不存在为 undefined
    expect(testData.input.splice(1, 1, 2)).toEqual([4]);
    expect(testData.input).toEqual(testData.expect);
  });
});
