var activePage = "home";

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

function showHomePage() {
  hide(activePage);
  show("home");
  activePage = "home";
}

function showSkillsPage() {
  hide(activePage);
  show("skills");
  activePage = "skills";
}

function showProjectsPage() {
  hide(activePage);
  show("projects");
  activePage = "projects";
}

function showLanguagesPage() {
  hide(activePage);
  show("languages");
  activePage = "languages";
}

showHomePage();

var homeLink = document.querySelectorAll("#top-menu-bar a")[0];
homeLink.addEventListener("click", showHomePage);

var skillsLink = document.querySelectorAll("#top-menu-bar a")[1];
skillsLink.addEventListener("click", showSkillsPage);

var projectsLink = document.querySelectorAll("#top-menu-bar a")[2];
projectsLink.addEventListener("click", showProjectsPage);

var languagesLink = document.querySelectorAll("#top-menu-bar a")[3];
languagesLink.addEventListener("click", showLanguagesPage);
