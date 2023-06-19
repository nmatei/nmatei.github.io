var employed = false; // boolean
var age = 24; // number
var name = "First Last"; // string

console.info(typeof employed);
console.info(typeof age);
console.info(typeof name);

employed = `Yes working @ "RWS"!, I'll still work there.`;
console.info(typeof employed, employed);

var skills = [1, "html", `css`, true];
console.info(typeof skills, skills[1], skills.length);

var person = {
  name: "Matei",
  age: 18,
  employed: true,
  skills: ["html", "css", "js"],
};
console.warn(typeof person, person);

function h() {
  return "h";
}

const f = function () {
  return "f";
};

const a = () => {
  return "a";
};

console.info(h());
console.info(f(), a());
