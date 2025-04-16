// 不同对象，没有继承关系，但都实现了相同的方法接口
const dog = {
  name: 'Dog',
  speak () {
    return `${this.name} says: Woof!`
  }
}

const cat = {
  name: 'Cat',
  speak () {
    return `${this.name} says: Meow!`
  }
}

const duck = {
  name: 'Duck',
  speak () {
    return `${this.name} says: Quack!`
  }
}

// 多态行为 - 相同的函数可以处理不同的对象
function makeSpeak (animal) {
  console.log(animal.speak())
}

makeSpeak(dog) // Dog says: Woof!
makeSpeak(cat) // Cat says: Meow!
makeSpeak(duck) // Duck says: Quack!
