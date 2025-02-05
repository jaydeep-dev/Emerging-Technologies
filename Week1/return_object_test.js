// to return an object from a function:
//Wrap the object you’re returning with parentheses:
const person = (firstName, lastName) => ({
first: firstName,
last: lastName
});
console.log(person("Flad", "Hanson"));
