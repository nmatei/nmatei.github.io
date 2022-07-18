// console.info(2);
// console.debug(23 + 2);
// console.warn(6 * 3 - 10);
// console.error("started");

var myName = "Matei";
var age = 29;
// console.info("My name is " + myName + ", I'm " + age + " years old.");
age = 30;
//console.info("My name is " + myName + ", I'm " + age + " years old.");
age = 31;
//console.info("My name is " + myName + ", I'm " + age + " years old.");

var jobTitle = "<span>Trainer</span> @ FastTrackIT";
var mottoElement = document.getElementById("motto");

console.info(mottoElement);
console.warn(mottoElement.innerHTML);

//mottoElement.innerHTML = mottoElement.innerHTML + " & " + jobTitle;
mottoElement.innerHTML += " & " + jobTitle;

function showHomePage() {
  document.getElementById("skills").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("languages").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function showSkillsPage() {
  document.getElementById("home").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("languages").style.display = "none";
  document.getElementById("skills").style.display = "block";
}

function showProjectsPage() {
  document.getElementById("home").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("languages").style.display = "none";
  document.getElementById("projects").style.display = "block";
}

function showLanguagesPage() {
  document.getElementById("home").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("languages").style.display = "block";
}

showHomePage();
