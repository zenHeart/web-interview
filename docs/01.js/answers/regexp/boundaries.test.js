describe('边界与锚点：^ $ \\b，以及多行 m', () => {
  test('^ 和 $ 匹配整个字符串的开头与结尾', () => {
    expect(/^hello$/.test('hello')).toBe(true);
    expect(/^hello$/.test('hello\n')).toBe(false);
  });

  test('m 使 ^/$ 匹配每一行', () => {
    const s = 'foo\nbar';
    expect(/^bar$/m.test(s)).toBe(true);
  });

  test('\\b 单词边界', () => {
    expect(/\bcat\b/.test('black cat ')).toBe(true);
    expect(/\bcat\b/.test('concatenate')).toBe(false);
  });
});


