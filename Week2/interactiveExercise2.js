const student = {
    studentNumber: "",
    firstName: "",
    lastName: "",
    programName: ""
};

// The function to change the program
const changeProgramName = function (student, newProgramName, isImmutable) {
    if (isImmutable) {
      return Object.assign({}, student, { programName: newProgramName })
    }
    student.programName = newProgramName;
    return student;
  }

  
/// Changing various values that may or may not change the original object
console.log("======Exercise 1======");

console.log("Original Object");
console.log(student);
console.log("\n\nchanging immutable value and creating new object");
console.log(changeProgramName(student, "Comp308", true));
console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

console.log("Original Object");
console.log(student);

console.log("\n\nchanging original object with immutable set as false");
console.log(changeProgramName(student, "Comp308", false));

console.log("\n\n Original object After changing its value");
console.log(student);

console.log("======");

console.log("======Exercise 2======");

const arr = [ "SET", "G-P", "AI", "HIT" ];

const newArr = arr.map(x => x);

console.log(newArr);
