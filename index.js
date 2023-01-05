var skillsEl = document.getElementById("skills-list");

var skills = ["HTML", "CSS", "JS", "Drive"];

var skillsHTML = "";

for (var i = 0; i < skills.length; i++) {
  skillsHTML += "<li>" + skills[i] + "</li>";
}

skillsEl.innerHTML = skillsHTML;

function hideAllPages() {
  document.getElementById("home").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("languages").style.display = "none";
  document.getElementById("projects").style.display = "none";
}

function displayHome() {
  hideAllPages();
  document.getElementById("home").style.display = "block";
}
function displaySkills() {
  hideAllPages();
  document.getElementById("skills").style.display = "block";
}
function displayLanguages() {
  hideAllPages();
  document.getElementById("languages").style.display = "block";
}
function displayProjects() {
  hideAllPages();
  document.getElementById("projects").style.display = "block";
}

displayHome();
