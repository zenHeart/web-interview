const engineBehavior = {
  startEngine () {
    console.log('Engine started.')
    this.engineOn = true
  },
  stopEngine () {
    console.log('Engine stopped.')
    this.engineOn = false
  }
}

const carProperties = {
  model: 'Sedan',
  color: 'Red',
  engineOn: false
}

// 将 engineBehavior 混入到 carProperties 对象中
const myCar = Object.assign({}, carProperties, engineBehavior)

console.log(myCar.model) // 输出: Sedan
myCar.startEngine() // 输出: Engine started.
console.log(myCar.engineOn) // 输出: true
