const { compose, curry, pipe } = require('ramda');

// trace :: msg -> thing -> thing
const trace = curry((msg, thing) => {
  console.log(msg, thing);
  return thing;
});

console.log("\n=============================")
console.log('There is no try... only do...');
console.log("=============================\n")

// printResult :: thing -> thing
const printResult = trace('Result:');
// printResult(1 + 2); //=> Result: 3

console.log("\n=============================")
console.log("KATA 1: Curry");
console.log("=============================\n")

const simpleAdd = (a, b) => a + b;
const curryAdd = curry(simpleAdd);
const add2 = curryAdd(2);
// printResult(add2(1)); // => Result: 3

const add = curry((a, b) => a + b);
const add1 = add(1);
// printResult(add1(1)); // => Result: 2
// printResult(add(4, 2)); // => Result: 6

const prop = curry((property, object) => object[property]);
const getPronoun = prop('pronoun');
const getName = prop('name');
const getHair = prop('hair');
const getAge = prop('age');
const person = {
  name: 'bob ross',
  hair: 'green',
  pronoun: 'they/them',
  age: 42
};
// printResult(getPronoun(person));
// printResult(getName(person));
// printResult(getHair(person));
// printResult(getAge(person));

console.log("\n=============================")
console.log("KATA 2: Compose / Pipe");
console.log("=============================\n")

const add15 = compose(
  trace('Add 1 output: '),
  add(1),
  trace('Add 2 output: '),
  add(2),
  trace('Add 3 output: '),
  add(3),
  trace('Add 4 output: '),
  add(4),
  trace('Add 5 output: '),
  add(5),
  trace('Argument: '),
);
// add15(5);

// printResult(add(5, add(4, add(3, add(2, add(1, 5)))))); // => Result: 20
// printResult(add15(5)); // => Result: 20

const pipeAdd15 = pipe(
  add(5),
  add(4),
  add(3),
  add(2),
  add(1),
);
// printResult(pipeAdd15(5)); // => Result: 20

const add2AndPrint = compose(printResult, add(2));
// add2AndPrint(2); // => Result: 4

const add3AndPrint = pipe(add(3), printResult);
// add3AndPrint(3); // => Result: 6

const printAge = compose(
  printResult,
  prop('age')
);
// printAge(person); // => Result: 42

const printAgePlus3 = compose(
  printResult,
  add(3),
  prop('age'),
);
// printAgePlus3(person); // => Result: 45



console.log("\n=============================")
console.log("KATA 3: Map");
console.log("=============================\n")

const users = [
  {
    name: "Bob Ross",
    age: 42,
    email: "bob@gmail.com"
  },
  {
    name: "Delightful Dingo",
    age: 24,
    email: ""
  },
  {
    name: "Flippant Flamingo",
    age: 17,
    email: "pink@gmail.com"
  },
  {
    name: "Furry Dinosaur",
    age: 82,
    email: "hasfeathers@gmail.com"
  },
];

const map = curry((f, list) => list.map(f));
const split = curry((sep, str) => str.split(sep));
const head = list => list[0];

const getFirstName = compose(
  head,
  split(' '),
  prop('name')
);

const displayUserNames = compose(
  printResult,
  map(prop('name')),
);
// displayUserNames(users);

const displayUserFirstNames = compose(
  printResult,
  map(getFirstName)
);

// displayUserFirstNames(users);

const length = list => list.length;
const greaterThan = curry((x, number) => number > x);

const emailIsValid = compose (
  greaterThan(0),
  length,
  prop('email'),
);

const validEmails = compose(
  printResult,
  map(emailIsValid)
);
// validEmails(users);
