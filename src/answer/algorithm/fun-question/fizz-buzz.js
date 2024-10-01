function logFizzBuzz (n) {
  if (Number.isInteger(n) && n < 1) {
    throw new TypeError('输入必须为整数!');
  }

  const res = [];
  for (let i = 1; i <= n; i++) {
    let val = i + '';
    if (i % 3 === 0 && i % 5 === 0) {
      val = 'FizzBuzz';
    } else if (i % 3 === 0) {
      val = 'Fizz';
    } else if (i % 5 === 0) {
      val = 'Buzz';
    } else {
      // none
    }
    res.push(val);
  }
  return res;
}

// console.log(logFizzBuzz(15).join(','));
