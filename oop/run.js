class Animal {
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }

  walk() {
    console.log(`${this.name} is walking`);
  }
}

const dog = new Animal("dog", 3);
dog.eat();
console.log(dog.age);

class DomesticAnimal extends Animal {
  owner;

  constructor(name, age, owner) {
    super(name, age);
    this.owner = owner;
  }
}

const cat = new DomesticAnimal("cat", 2, "ram");

console.log("cat owner:", cat.owner);

class WildAnimal extends Animal {
  isCarnivorous;

  constructor(name, age, isCarnivorous) {
    super(name, age);
    this.isCarnivorous = isCarnivorous;
  }
}

const lion = new WildAnimal("lion", 5, true);
console.log("lion:", lion);

const deer = new WildAnimal("deer", 2, false);
console.log("deer:", deer);

// shape

class Shape {
  type;

  constructor(type) {
    this.type = type;
  }

  getArea() {
    return 0;
  }
}

class Circle extends Shape {
  radius;

  constructor(radius) {
    super("circle");
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  side;

  constructor(side) {
    super("square");
    this.side = side;
  }

  getArea() {
    return this.side ** 2;
  }
}

const square = new Square(5);
console.log("square:", square, "area:", square.getArea());

const circle = new Circle(5);
console.log("circle:", circle, "area:", circle.getArea());
