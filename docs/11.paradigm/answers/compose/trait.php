trait Walkable {
    public function walk() {
        echo "I am walking.\n";
    }
}

trait Swimmable {
    public function swim() {
        echo "I am swimming.\n";
    }
}

class Animal {
    public $name;
    public function __construct($name) {
        $this->name = $name;
    }
}

class Dog extends Animal {
    use Walkable, Swimmable;
}

$dog = new Dog("Buddy");
$dog->walk();   // 输出: I am walking.
$dog->swim();   // 输出: I am swimming.