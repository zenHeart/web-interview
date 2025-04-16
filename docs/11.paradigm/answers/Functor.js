class Functor {
  constructor (value) {
    this.value = value
  }

  map (fn) {
    return new Functor(fn(this.value))
  }
}
// 只是一个概念，用来实现将一个值包装成一个 Functor
const Pointer = {
  of: (value) => new Functor(value)
}

class Maybe {
  constructor (value) {
    this.value = value
  }

  map (fn) {
    // 兜底输入值为空的情况
    if (this.value === null || this.value === undefined) {
      return this
    }
    return new Maybe(fn(this.value))
  }
}

// Left 构造函数，表示失败
class Left {
  constructor (value) {
    this.value = value
  }

  // map 方法对 Left 不进行任何操作，直接返回自身
  map (_) {
    return this
  }

  // chain 方法对 Left 不进行任何操作，直接返回自身
  chain (_) {
    return this
  }

  // getOrElse 方法返回默认值
  getOrElse (defaultValue) {
    return defaultValue
  }

  // toString 方法用于调试
  toString () {
    return `Left(${this.value})`
  }
}

// Right 构造函数，表示成功
class Right {
  constructor (value) {
    this.value = value
  }

  // map 方法对值应用函数，并返回新的 Right
  map (fn) {
    return new Right(fn(this.value))
  }

  // chain 方法对值应用函数，函数应返回一个 Either
  chain (fn) {
    return fn(this.value)
  }

  // getOrElse 方法返回内部的值
  getOrElse (_) {
    return this.value
  }

  // toString 方法用于调试
  toString () {
    return `Right(${this.value})`
  }
}

// Either 工厂函数，根据条件返回 Left 或 Right
const Either = {
  of: (value) => new Right(value),
  left: (value) => new Left(value),
  right: (value) => new Right(value)
}

exports.Functor = Functor
exports.Pointer = Pointer
exports.Maybe = Maybe
exports.Either = Either
