console.log('load a')
// eslint-disable-next-line
const { add } = await import('./b.js')
console.log(add(1, 2))
