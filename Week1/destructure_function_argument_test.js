//this function is destructuring the function argument
const lordify = ({ firstname }) => {
console.log(`${firstname} of Canterbury`);
};
const regularPerson = {
firstname: "Bill",
lastname: "Wilson"
};
lordify(regularPerson); // Bill of Canterbury
