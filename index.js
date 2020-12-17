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
printResult(1 + 2); //=> Result: 3

console.log("\n=============================")
console.log("KATA 1: Curry");
console.log("=============================\n")

const simpleAdd = (a, b) => a + b;
const curryAdd = curry(simpleAdd);
const add2 = curryAdd(2);
printResult(add2(1)); // => Result: 3

const add = curry((a, b) => a + b);
const add1 = add(1);
printResult(add1(1)); // => Result: 2
printResult(add(4, 2)); // => Result: 6

const prop = curry((property, object) => object[property]);
const getPronoun = prop('pronoun');
const getName = prop('name');
const getHair = prop('hair');
const getAge = prop('age');
const person = {
  name: 'bob',
  hair: 'green',
  pronoun: 'they/them',
  age: 42
};
printResult(getPronoun(person));
printResult(getName(person));
printResult(getHair(person));
printResult(getAge(person));

console.log("\n=============================")
console.log("KATA 2: Compose / Pipe");
console.log("=============================\n")

const add15 = compose(
  add(1),
  add(2),
  add(3),
  add(4),
  add(5),
);

printResult(add(5, add(4, add(3, add(2, add(1, 5)))))); // => Result: 20
printResult(add15(5)); // => Result: 20

const pipeAdd15 = pipe(
  add(5),
  add(4),
  add(3),
  add(2),
  add(1),
);
printResult(pipeAdd15(5)); // => Result: 20

const add2AndPrint = compose(printResult, add(2));
add2AndPrint(2); // => Result: 4

const add3AndPrint = pipe(add(3), printResult);
add3AndPrint(3); // => Result: 6

const printAge = compose(
  printResult,
  prop('age')
);

printAge(person); // => Result: 42

const printAgePlus3 = compose(
  printResult,
  add(3),
  prop('age'),
);

printAgePlus3(person); // => Result: 45
