const semver = require('semver')

// ~1.2.3 允许升级到 <1.3.0
console.log(semver.satisfies('1.2.5', '~1.2.3')) // true
console.log(semver.satisfies('1.3.0', '~1.2.3')) // false

// ^1.2.3 允许升级到 <2.0.0
console.log(semver.satisfies('1.4.0', '^1.2.3')) // true
console.log(semver.satisfies('2.0.0', '^1.2.3')) // false

// ^0.2.3 仅允许升级修订号
console.log(semver.satisfies('0.2.5', '^0.2.3')) // true
console.log(semver.satisfies('0.3.0', '^0.2.3')) // false
