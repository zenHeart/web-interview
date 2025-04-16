// 父类
class Animal {
  speak () {
    return 'Some sound'
  }
}

// 子类重写父类方法
class Dog extends Animal {
  speak () {
    return 'Woof!'
  }
}

class Cat extends Animal {
  speak () {
    return 'Meow!'
  }
}

// 多态行为
const animals = [new Animal(), new Dog(), new Cat()]
animals.forEach(animal => {
  console.log(animal.speak())
})
