describe('前瞻 / 后顾（lookaround）', () => {
  test('正向前瞻 (?=...) 与 负向前瞻 (?!...)', () => {
    const s = 'file.txt other';
    const m = /\w+(?=\.)/.exec(s);
    expect(m && m[0]).toBe('file');
    expect(/^\d+(?!\.)/.test('123a')).toBe(true);
    expect(/^\d+(?!\.)/.test('123.45')).toBe(false);
  });

  test('正向后顾 (?<=...) 与 负向后顾 (?<!...)', () => {
    const price = 'Pay $100 now';
    const m1 = /(?<=\$)\d+/.exec(price);
    expect(m1 && m1[0]).toBe('100');

    expect(/(?<!\$)\d+/.test('Pay 100')).toBe(true);
    expect(/(?<!\$)\d+/.test('Pay $100')).toBe(false);
  });
});


