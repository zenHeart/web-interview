const brackets = {
  '(': ')',
  '{': '}',
  '[': ']'
}
function isValid (str) {
  const stack = []
  for (let i = 0; i < str.length; i++) {
    const cur = str[i]
    if (cur === '(' || cur === '{' || cur === '[') {
      stack.push(brackets[str[i]])
    } else {
      if (stack.pop() !== cur) {
        return false
      }
    }
  }
  return stack.length === 0
}

module.exports = isValid
