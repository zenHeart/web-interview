function calc (num) {
  let i;
  let result = [];
  for (i = 2; i <= num; i++) {
    if (num % i === 0) {
      result.push (i);
      if (num > i) {
        num = num / i;
        i = 1;
      } else {
        return result;
      }
    }
  }
}
