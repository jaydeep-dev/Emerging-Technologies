//this line destructures the array by getting the first element
const [firstAnimal] = ["Horse", "Mouse", "Cat"];
console.log(firstAnimal); // Horse
//We can also pass over unnecessary values with list matching using commas:
const [, , thirdAnimal] = ["Horse", "Mouse", "Cat"];
console.log(thirdAnimal); // Cat

