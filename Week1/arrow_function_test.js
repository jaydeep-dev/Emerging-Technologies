let numbers = [1,2,3,4,5]
const squares = numbers.map(n => n * n); 
console.log('squares:',squares)
//
let evens = []
numbers.forEach(n => {
    //anonymous function code
    if (n % 2 === 0) evens.push(n);
  });
console.log('even numbers', evens) 
// lexical scoping
const author = {
    fullName: "Bob Alice",
    books: [],
    printBooks() {
       this.books.forEach(book => console.log(book + ' by ' + this.fullName));
    }
  };
author.books = ["JavaScript", "Python", "Kotlin"]
author.printBooks()

const nameFunc = (firstname, lastname) => {
  return firstname  + " " + lastname;
}

console.log(nameFunc("Jaydeep", "Modha"))