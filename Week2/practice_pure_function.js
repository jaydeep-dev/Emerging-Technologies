const product = (x, y) => x * y;

console.log("Experementing with different values for dot Product func:")
console.log(product(2, 5));
console.log(product(4, 6));
console.log(product(7, 3));
console.log(product(90, 10));
console.log(product(512, 4096));

console.log("\n\nfunct1 example:")
const funct1 = display => {
    display("Passing a function as argument");
};

funct1(console.log);

console.log("\n\nShow Message example:")
const showMessage = function (show) {
    return function (message) {
        show(message.toUpperCase() + "!!!");
    };
};

showMessage(console.log)("Hello! this is a message");

console.log("\n\nArray.map() example:");
const myArr = ["immutability", "pure function", "data transformation", "high order function", "recursion"];

console.log(myArr.map(x => x + " in functional programming"));

console.log("\n\nArray.reduce() example:");
const colors = ["red", "red", "green", "blue", "green"];
const uniqueColors = colors.reduce((unique, color) => unique.indexOf(color) !== -1 ? unique : [...unique, color], []);
console.log(uniqueColors);