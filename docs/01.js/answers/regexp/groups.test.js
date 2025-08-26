describe('分组 / 命名捕获 / 反向引用', () => {
  test('位置分组提取', () => {
    const m = /(\d{4})-(\d{2})-(\d{2})/.exec('2024-12-31');
    expect(m && m[1]).toBe('2024');
    expect(m && m[2]).toBe('12');
    expect(m && m[3]).toBe('31');
  });

  test('命名捕获组', () => {
    const m = /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/.exec('2024-12-31');
    expect(m && m.groups && m.groups.y).toBe('2024');
    expect(m && m.groups && m.groups.m).toBe('12');
    expect(m && m.groups && m.groups.d).toBe('31');
  });

  test('反向引用与去重字符', () => {
    expect(/(.)\1/.test('book')).toBe(true); // oo
    expect(/(.)\1/.test('abc')).toBe(false);
  });

  test('replace 使用命名捕获重排', () => {
    const s = 'Doe, John'.replace(/(?<last>\w+), (?<first>\w+)/, '$<first> $<last>');
    expect(s).toBe('John Doe');
  });
});


