const sandwich = {
    bread: "dutch crunch",
    meat: "tuna",
    cheese: "swiss",
    toppings: ["lettuce", "tomato", "mustard"]
};
//We can scope bread and meat to be used locally:
const { bread, meat } = sandwich;
console.log(bread, meat); // dutch crunch tuna
