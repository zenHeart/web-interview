function sum () {
  const args = Array.prototype.slice.call(arguments)
  if (args.length === 2) {
    return args[0] + args[1]
  } else if (args.length === 1) {
    return function (b) {
      return args[0] + b
    }
  } else {
    return sum
  }
}

console.log(sum()()()(1)(2))
console.log(sum()(1)(2))
console.log(sum(1, 2))
