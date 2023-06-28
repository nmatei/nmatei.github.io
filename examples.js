var employed = false; // boolean
var age = 24; // number
var name = "First Last"; // string

age = 30;

// object (array)
var skills = ["html", "css", "js"];
// object (json)
var person = {
  employed: true,
  age: 29,
};

// object (DOM, other)
var el = document.getElementById("el");

name = "Matei";

function printInfo() {
  console.log(typeof skills, skills, age);
  console.info("my name", name);
  console.warn("person type", typeof person, person);
}

var fVariable = function () {
  console.info("functie ca variabila");
};

var f1Variable = () => {
  console.info("functie ca variabila");
};

printInfo();
fVariable();

console.info("t1", typeof printInfo);
console.info("t2", typeof fVariable);
console.info("t4", typeof f1Variable);
