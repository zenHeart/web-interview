function fractionCalc (expression) {
  const operations = []
  let left = {
    numerator: '',
    denominator: '1'
  }
  for (let i = 0; i < expression.length; i++) {
    const c = expression[i]
    // 如果是一个操作符号，推入前面的数字到操作栈中，并清空 left
    if (c === '+' || c === '-') {
      operations.push(left)
      operations.push(c)
      left = {
        numerator: '',
        denominator: '1'
      }
    } else if (c === '/') { // 如果是分数
      left.denominator = ''
    } else { // 如果是数字
      if (left.denominator === '1') {
        left.numerator += c
      } else {
        left.denominator += c
      }
    }
  }
  if (left.numerator) {
    operations.push(left)
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i]
    // 非操作数则直接推入
    if (op !== '+' && op !== '-') {
      // if (!res) {}
    }
  }
}

fractionCalc('1/3-1/2+1/4-1/5+1/6')
