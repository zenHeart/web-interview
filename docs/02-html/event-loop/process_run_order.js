new Promise((resolve, reject) => {
  console.log(2)
  setTimeout(function () {
    console.log('internal timeout')
    resolve('resolve')
  }, 0)
}).then((res) => console.log(res))
setTimeout(() => {
  console.log('timeout')
}, 0)
process.nextTick(() => {
  console.log('next tick')
})
