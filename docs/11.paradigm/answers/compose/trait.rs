trait Walkable {
   fn walk(&self);
}

trait Swimmable {
   fn swim(&self);
}

struct Dog {
   name: String,
}

impl Walkable for Dog {
   fn walk(&self) {
       println!("{} is walking.", self.name);
   }
}

impl Swimmable for Dog {
   fn swim(&self) {
       println!("{} is swimming.", self.name);
   }
}

fn main() {
   let dog = Dog { name: String::from("Buddy") };
   dog.walk();   // 输出: Buddy is walking.
   dog.swim();   // 输出: Buddy is swimming.
}