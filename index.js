var activePage = "projects";

function hide(id) {
  console.info("hide", id);
  document.getElementById(id).style.display = "none";
}

function show(id) {
  console.info("show", id);
  var page = document.getElementById(id);
  console.debug("show page", page);
  page.style.display = "block";
}

function showHome() {
  hide(activePage);
  show("home");
  activePage = "home";
}

function showSkills() {
  hide(activePage);
  show("skills");
  activePage = "skills";
}

function showProjects() {
  hide(activePage);
  show("projects");
  activePage = "projects";
}

function showLanguages() {
  hide(activePage);
  show("languages");
  activePage = "languages";
}
