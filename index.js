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
  hide("skills");
  hide("projects");
  hide("languages");

  show("home");
}

function showSkills() {
  hide("home");
  hide("projects");
  hide("languages");

  show("skills");
}

function showProjects() {
  hide("home");
  hide("skills");
  hide("languages");

  show("projects");
}

function showLanguages() {
  hide("home");
  hide("skills");
  hide("projects");

  show("languages");
}
