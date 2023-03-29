console.info("start");
var age = 18;
var myName = "Matei";

function learning() {
  return "I'm learning...";
}
function playGame(game) {
  //console.log(this);
  return `I'm playing ${game}. My age is ${this.name}`;
}

var matei = {
  age: 25,
  name: myName,
  skills: ["html", "css", `js`],
  learn: learning,
  play: playGame,
};

var ion = {
  age: 30,
  name: "Ion",
  skills: ["html", "css"],
  learn: learning,
  play: playGame,
};

console.log(ion.name);
var l = ion.learn();
console.warn(l);

console.warn(ion.play("chess"));
console.warn(matei.play("rubik"));

console.info(playGame.call(ion, "HIDE & SEEK"));
console.info(playGame.apply(matei, ["HIDE & SEEK"]));
console.info(playGame("HIDE & SEEK"));
