describe('RegExp 与 String 常用方法差异', () => {
  test('test vs exec', () => {
    const re = /a/;
    expect(re.test('cat')).toBe(true);
    const m = re.exec('cat');
    expect(m && m[0]).toBe('a');
    expect(m && m.index).toBe(1);
  });

  test('String.match 与 全局标志', () => {
    expect('a1b2c3'.match(/\d/g)).toEqual(['1', '2', '3']);
    // 无 g 标志返回包含捕获组的第一个匹配
    const m = '2024-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/);
    expect(m && m[0]).toBe('2024-12-31');
    expect(m && m[1]).toBe('2024');
  });

  test('String.matchAll 返回迭代器（需 g）', () => {
    const iter = 'a1b2c3'.matchAll(/(\d)/g);
    const arr = Array.from(iter, m => m[1]);
    expect(arr).toEqual(['1', '2', '3']);
  });

  test('replace 与 replaceAll', () => {
    expect('foo foo'.replace('foo', 'bar')).toBe('bar foo');
    expect('foo foo'.replaceAll('foo', 'bar')).toBe('bar bar');
    // 使用捕获组重排
    const s = '2024-12-31'.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
    expect(s).toBe('12/31/2024');
  });

  test('split 支持正则与捕获组（保留分隔符）', () => {
    // 捕获组会出现在结果中
    const parts = 'a1b2'.split(/(\d)/);
    expect(parts).toEqual(['a', '1', 'b', '2', '']);
  });
});


