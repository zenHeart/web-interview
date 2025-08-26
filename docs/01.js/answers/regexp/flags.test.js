describe('RegExp flags 基础能力', () => {
  test('i - 忽略大小写', () => {
    expect(/abc/i.test('AbC')).toBe(true);
  });

  test('g - 全局匹配影响 lastIndex 与 exec 行为', () => {
    const re = /a/g;
    const input = 'a a';
    const m1 = re.exec(input);
    expect(m1 && m1.index).toBe(0);
    expect(re.lastIndex).toBe(1);

    const m2 = re.exec(input);
    expect(m2 && m2.index).toBe(2);
    expect(re.lastIndex).toBe(3);
  });

  test('m - 多行模式使 ^/$ 匹配行首/行尾', () => {
    const str = 'hello\nworld';
    expect(/^world$/m.test(str)).toBe(true);
  });

  test('s - dotAll 让 . 可匹配换行符', () => {
    expect(/a.b/s.test('a\nb')).toBe(true);
  });

  test('u - 正确解析 Unicode 转义与码点', () => {
    // U+1F680 ROCKET
    expect(/\u{1F680}/u.test('🚀')).toBe(true);
  });

  test('y - 黏连（sticky）从 lastIndex 位置开始匹配', () => {
    const re = /\d/y;
    const s = 'a1b2';

    re.lastIndex = 1; // 指向 '1'
    const m1 = re.exec(s);
    expect(m1 && m1[0]).toBe('1');
    expect(re.lastIndex).toBe(2);

    re.lastIndex = 2; // 指向 'b'，不是数字，无法从此处黏连匹配
    const m2 = re.exec(s);
    expect(m2).toBeNull();
  });
});


