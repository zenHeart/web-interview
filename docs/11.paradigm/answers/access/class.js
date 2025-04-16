class Person {
  // ===== ES2015 (ES6) =====
  static species = 'Human' // Static properties

  constructor (name) {
    this.name = name
    Person.#count++
  }

  greet () { // Public methods
    console.log(`Hello, my name is ${this.name}`)
  }

  get profile () { // Getter
    return `${this.name}, age: ${this.age}`
  }

  set profile (value) { // Setter
    [this.name, this.age] = value.split(',')
  }

  static getCount () { // Static methods
    return this.#count
  }

  // ===== ES2019 =====
  #privateField = 'private value' // Private fields
  static #count = 0 // Static private fields

  // ===== ES2020 =====
  #privateMethod () { // Private methods
    return `${this.name}'s private data: ${this.#privateField}`
  }

  // ===== ES2022 =====
  name // Public class fields
  age = 0

  // Static initialization block
  static {
    console.log('Class initialization')
  }
}
const person = new Person('Alice')
console.log(person.name) // Alice
