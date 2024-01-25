# functional programming

```js
function getSum(n1, n2) {}
```

# OOP

```js
class SumMachine {
  // inputs
  // process the inputs
  // returns some output
}
```

## OOPs

- Class: schema that defines how an object should be

```js
class Animal {
  // methods: eat, walk
  // properties: age, name, color
}
```

- Object: instance of a class

```js
const dog = new Animal();

const cat = new Animal();
```

## Thinking in oop

- data
- what to do with the data
- how to show/render data

## Principles of OOP

- Inheritance
- Encapsulation
- Polymorphism
- Abstraction

### Inheritance

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
}
```

### Encapsulation

It is done to ensure that the data is not directly accessed by the methods in the class. Data is accessed by the methods in the class by using getters and setters.

## Abstraction

Hiding the complexity of the code from the user. The user only needs to know how to use the code and not how the code works.

### Polymorphism

Single class can be used to create multiple objects.
