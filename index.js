function hideAllPages() {
  document.getElementById("home").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("languages").style.display = "none";
  document.getElementById("projects").style.display = "none";
}

function displayHome() {
  hideAllPages();
  var page = document.getElementById("home");
  page.style.display = "block";
}

function displaySkills() {
  hideAllPages();
  var page = document.getElementById("skills");
  page.style.display = "block";
}

function displayLanguages() {
  hideAllPages();
  var page = document.getElementById("languages");
  page.style.display = "block";
}

function displayProjects() {
  hideAllPages();
  var page = document.getElementById("projects");
  page.style.display = "block";
}

displayHome();
