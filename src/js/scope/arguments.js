/**
 * 验证形参的作用域范围,不会延伸
 * 作用域在申明时就确定了
 */

const a = function (arg1) {
  arg1 = { a: 1 }
  console.log(b)
  // eslint-disable-next-line
  const c = { a: 1 }

  b({})
}

function b (arg) {
  console.log('arg:', arg)
  // eslint-disable-next-line
  console.log('arg1:', c);
}

a({ b: 1 })
