const { expect } = require('chai');

describe('String', function () {
  it('字符串只读特性', function () {
    const str = 'hello';

    str[0] = 'H';

    expect(str).equal('hello');
  });

  it('原始封装类型', function () {
    const str = 'hello';

    // 注意 str.toUpperCase 的操作 类似 new String(str).toUpperCase 的操作
    expect(str.toUpperCase()).equal('HELLO');
  });
});
