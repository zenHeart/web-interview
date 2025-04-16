// 定义一个可以充电的混入对象
const canCharge = {
  charge () {
    console.log(`${this.model} is charging.`)
    this.isCharging = true
  },
  stopCharge () {
    console.log(`${this.model} stopped charging.`)
    this.isCharging = false
  }
}

class ElectronicDevice {
  constructor (model) {
    this.model = model
    this.isCharging = false
  }
}

// 将 canCharge 的属性和方法混入到 ElectronicDevice 的原型中
Object.assign(ElectronicDevice.prototype, canCharge)

const phone = new ElectronicDevice('iPhone')
phone.charge() // 输出: iPhone is charging.
console.log(phone.isCharging) // 输出: true
phone.stopCharge() // 输出: iPhone stopped charging.
