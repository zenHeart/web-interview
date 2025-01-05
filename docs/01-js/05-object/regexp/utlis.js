function splitNum (number) {
  const numStr = number + ''
  const thousandthPos = /(?<!^)(?=(\d{3})+$)/g

  return numStr.replace(thousandthPos, ',')
}

console.log(splitNum(1232))
console.log(splitNum(12))
console.log(splitNum(122332))
console.log(splitNum(22332))
