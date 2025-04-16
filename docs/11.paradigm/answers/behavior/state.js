/**
 * 状态模式
 *
 * 电商购物车状态管理（待支付、已支付、已发货）。
 * 将状态转换逻辑集中管理，避免条件分支污染业务代码。
 */

// 状态接口
class CartState {
  checkout (cart) {
    console.log('当前操作不可用')
  }

  pay (cart) {
    console.log('当前操作不可用')
  }
}

// 具体状态：待支付
class PendingPaymentState extends CartState {
  pay (cart) {
    cart.setState(new PaidState())
    console.log('支付成功，订单已确认')
  }
}

// 具体状态：已支付
class PaidState extends CartState {
  checkout (cart) {
    cart.setState(new ShippedState())
    console.log('订单已发货')
  }
}

// 具体状态：已发货
class ShippedState extends CartState {
  checkout (cart) {
    console.log('订单已发货，无法重复操作')
  }

  pay (cart) {
    console.log('订单已发货，无法支付')
  }
}

// 购物车类
class ShoppingCart {
  constructor () {
    this.state = new PendingPaymentState()
  }

  setState (state) {
    this.state = state
  }

  pay () {
    this.state.pay(this)
  }

  checkout () {
    this.state.checkout(this)
  }
}

// 使用状态模式
const cart = new ShoppingCart()

// 示例操作
cart.pay() // 输出：支付成功，订单已确认
cart.checkout() // 输出：订单已发货
cart.pay() // 输出：订单已发货，无法支付
cart.checkout() // 输出：订单已发货，无法重复操作
