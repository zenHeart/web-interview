// 按照流程做就好了
function spiltStr (k, str) {
  let strList = str.split('-')
  strList = strList.length > 2 ? [strList[0], strList.slice(1).join('')] : strList
  const res = []

  for (let i = 0; i < strList.length; i++) {
    const curStr = strList[i]
    if (i === 0) {
      res.push(curStr)
    } else {
      const subList = []
      let subStr = ''
      let lowerCount = 0
      let biggerCount = 0
      for (let j = 0; j < curStr.length; j++) {
        const c = curStr[j]
        subStr += c

        const code = c.codePointAt()
        if (code >= 97 && code <= 122) {
          lowerCount++
        }
        if (code >= 65 && code <= 90) {
          biggerCount++
        }

        if ((j + 1) % k === 0 || ((j + 1 === curStr.length) && subStr.length > 0)) {
          if (lowerCount > biggerCount) {
            subList.push(subStr.toLowerCase())
          } else if (biggerCount > lowerCount) {
            subList.push(subStr.toUpperCase())
          } else {
            subList.push(subStr)
          }
          lowerCount = 0
          biggerCount = 0
          subStr = ''
        }
      }
      res.push(...subList)
    }
  }
  return res.join('-')
}

console.log(spiltStr(3, '12abc-abCABc-4aB@'))
console.log(spiltStr(12, '1'))
console.log(spiltStr(12, ''))
console.log(spiltStr(12, '1234567891233-1'))
console.log(spiltStr(1, '1234567891233-1-2-3'))
console.log(spiltStr(12, '12abc-abCABc-4aB@'))
