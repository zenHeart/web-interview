function checkSubSequence (s, t) {
  let sIndex = 0
  for (let tIndex = 0; tIndex < t.length; tIndex++) {
    const curT = t[tIndex]
    const curS = s[sIndex]

    if (curT === curS) {
      sIndex++
    }
  }
  if (sIndex === s.length) {
    return true
  }
  return false
}

console.log(checkSubSequence('abc', 'ahbgdc'))
console.log(checkSubSequence('agc', 'ahbgdc'))
console.log(checkSubSequence('aqc', 'ahbgdc'))
