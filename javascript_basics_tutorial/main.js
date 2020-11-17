console.log('Hello world');
// console.error('Hey, this is an error.')
// console.warn('Warnings are yellow.')

// ASSIGNING VARIABLES
// var - not used so much anymore (?)
// const - constant variables; cannot be reassigned
// let - variables that can be updated

let score = 10;
score = 11;

console.log(score)

// This does not work: It needs a value.
// const another_score;

const another_score = 12;

// Does not work because it can't be reassigned
// another_score = 13;

console.log(another_score)

// DATA TYPES
const name = 'John'; // string
const age = 30; // number
const rating = 4.5 // number; no distinction between decimals floats
const isCool = true; // boolean
const x = null; // null
const y = undefined; // undefined
let z; // undefined

console.log(typeof age)

// Here we get an object, which is a bit weird.
console.log(typeof x)

// STRINGS
// Concatenation
// "The old way of doing it"
console.log('My name is ' + name + ' and I am ' + age);

// Template string
console.log(`My name is also ${name} and I am ${age}`);

// Or even:
const hello = `My name is ${name} as well and I am ${age}`
console.log(hello);

const hey = 'Hello World!';
// This is a property; it doesn't need parentheses
console.log(hey.length);
// This is a method = a function associated with an object
console.log(hey.toUpperCase());
// Substring: start and end (stops BEFORE) five
console.log(hey.substring(0, 5));
// You can chain this
console.log(hey.substring(0, 5).toUpperCase());

console.log(hey.split(''));
// Makes more sense for something like:
let shopping_list = 'apples, chocolate, tea, more tea';
// Don't forget the space!
console.log(shopping_list.split(', ')); 

// ARRAYS
// Variables that hold multiple values

// new means this is a constructor (we're constructing an array)
const numbers = new Array(1, 2, 3, 4, 5);
console.log(numbers);

// more common
// multiple types are possible
const fruits = ['apples', 'oranges', 'pears', 10, true];
console.log(fruits);

// indexing
console.log(fruits[3]);
// This works even though we used const.
fruits[3] = 'grapes';
console.log(fruits[3]);
// The only thing we can't do with const is something like this:
// fruits = ['another', 'array'];

// Add values to the end when we don't know the length
fruits.push('mangos');
console.log(fruits);

// add to beginning
fruits.unshift('strawberries');
console.log(fruits);

// delete the last one
fruits.pop();
console.log(fruits);

// Check whether something is an array
console.log(Array.isArray('hello'));
console.log(Array.isArray(fruits));

// Get index of something
console.log(fruits.indexOf('oranges'));

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    hobbies: ['music', 'movies', 'sports'],
    address: {
        street: '50 main st',
        city: 'Boston',
        state: 'MA'
    }
}

console.log(person);
console.log(person.firstName, person.lastName);

console.log(person.hobbies[1]);
console.log(person.address.city);

// pulling things out
const { firstName, lastName, address: { city } } = person;
console.log(firstName);
console.log(city);

// add stuff
person.email = 'john@gmail.com'
console.log(person);

const todos = [
    {
        id: 1,
        text: 'Take out trash',
        isCompleted: true
    },
    {
        id: 2,
        text: 'Meeting with boss',
        isCompleted: true
    },
    {
        id: 3,
        text: 'Dentist',
        isCompleted: false
    }
]

console.log(todos[1].text);

// How we would send data to a server (JSON format)
const todoJSON = JSON.stringify(todos);
console.log(todoJSON);

// LOOPS
// Second argument is the condition; stuff runs until it is true.
// Once it gets to 9, the condition is no longer fulfilled
// (9 is the last one printed)
for(let i = 0; i < 10; i++) {
    console.log(`for loop number: ${i}`);
}

let i = 0;
while(i < 10) {
    console.log(`while loop number: ${i}`);
    i++;
}

// Not the best way to loop throught an array
for(let i = 0; i < todos.length; i++) {
    console.log(todos[i].text);
}

// For of loop:
// The second one is the name of the array,
// the first one can be anything
for(let todo of todos) {
    console.log(todo.id);
}

// High order array methods
// forEach
todos.forEach(function(todo) {
    console.log(todo.text);
});

// map - returns an array
const todoText = todos.map(function(todo) {
    return(todo.text);
})

console.log(todoText);

// filter
const todoCompleted = todos.filter(function(todo) {
    return todo.isCompleted === true;
})

console.log(todoCompleted);

// combined
const todoCompleted2 = todos.filter(function(todo) {
    return todo.isCompleted === true;
}).map(function(todo) {
    return todo.text;
})

console.log(todoCompleted2);

// CONDITIONALS
const xx = 10;

// Doesn't care about type of the variable
if(xx == 10) {
    console.log('x is 10');
}

// So this works as well
if(xx == '10') {
    console.log('x is 10');
}

// But this doesn't, because it also matches the data types
if(xx === '10') {
    console.log('x is 10');
}

const xxx = 20;

if(xxx == 10) {
    console.log('x is 10');
} else if(xxx > 10) {
    console.log('x is greater than 10')
} else {
    console.log('x is less than 10')
}

let a = 10;
let b = 20;

if(a > 10 || b > 19) {
    console.log('This is an or')
}

if(a > 10 && b > 19) {
    console.log('This is an and')
}

// ternary operator
// Shorthand if-statement - e.g. assign values to a variable based on a condition
// The questionmark is a "then"
// The colon is an "else"
a = 9;
let colour = a > 10 ? 'red' : 'blue'

console.log(colour);

// switches
switch(colour) {
    case 'red':
        console.log('colour is red');
        break;
    case 'blue':
        console.log('colour is blue');
        break;
    default:
        console.log('colour is NOT red or blue');
        break;
}

// FUNCTIONS
function addNums(num1, num2) {
    console.log(num1 + num2);
}

addNums(5, 4);

function addNums2(num1 = 1, num2 = 2) {
    let result = num1 + num2;
    return result;
}

console.log(addNums2(undefined, 4));

const addNums3 = (num1, num2) => {
    console.log(num1 + num2);
}

addNums3(1, 3);

const addNums4 = (num1, num2) => console.log(num1 + num2);

addNums4(1, 7);

var addNums5 = function(num1, num2) {
  console.log(num1 + num2);
}

addNums5(7, 7);

const addNums6 = num1 => num1 + 5;
console.log(addNums6(12));

// OBJECTS
// When using a constructor function, always start with a capital letter
function Person(firstName, lastName, dob) {
    // Pass them in as properties of the object
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
    // Add methods to object
    this.getBirthYear = function() {
        return this.dob.getFullYear();
    }
    this.getFullName = function() {
        return `${this.firstName} ${this.lastName}`;
    }
}

// Instantiate
const person1 = new Person('John', 'Doe', '4-3-1980');
const person2 = new Person('Mary', 'Smith', '4-6-1970');

console.log(person1);
console.log(person2.dob.getFullYear());

console.log(person1.getBirthYear());

console.log(person1.getFullName());

// But: If we log the object in the console, the functions are shown as well, which we don't want
function Person2(firstName, lastName, dob) {
    // Pass them in as properties of the object
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
}

Person2.prototype.getBirthYear = function() {
    return this.dob.getFullYear();
}

Person2.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
}

const person1_1 = new Person2('John', 'Doe', '4-3-1980');
console.log(person1_1.getFullName());
console.log(person1_1);

// Even better: CLASS with methods
class Person_class {
    // A method is a function inside a class
    constructor(firstName, lastName, dob) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = new Date(dob);
    }

    getBirthYear() {
        return this.dob.getFullYear();
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

const person_class = new Person_class('John', 'Doe', '4-3-1980');
console.log(person_class.getFullName());
