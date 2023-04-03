var activePage = "home";

var homePage = document.getElementById(activePage);
homePage.style.display = "block";

function hidePage(id) {
  document.getElementById(id).style.display = "none";
}
function showPage(id) {
  document.getElementById(id).style.display = "block";
}

function showSkills() {
  hidePage("home");
  hidePage("projects");
  hidePage("languages");
  showPage("skills");
}

function showHome() {
  hidePage("skills");
  hidePage("projects");
  hidePage("languages");
  showPage("home");
}

function showProjects() {
  hidePage("home");
  hidePage("skills");
  hidePage("languages");
  showPage("projects");
}

function showLanguages() {
  hidePage("home");
  hidePage("skills");
  hidePage("projects");
  showPage("languages");
}
