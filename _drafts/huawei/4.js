const EncodeBook = [
  1, 2, 4
]
function encodeStr (str) {
  let res = ''
  for (let i = 0; i < str.length; i++) {
    const curChar = str[i]
    let offSet = EncodeBook[i]
    if (!offSet) {
      offSet = EncodeBook[i - 1] + EncodeBook[i - 2] + EncodeBook[i - 3]
      EncodeBook[i] = offSet
    }

    const encodeChar = String.fromCharCode((curChar.codePointAt() + offSet))

    res += encodeChar
  }
  return res
}

console.log(encodeStr('abc'))
console.log(encodeStr('abcde'))
