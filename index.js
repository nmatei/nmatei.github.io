function hide(id) {
  console.info("hide", id);
  document.getElementById(id).style.display = "none";
}

function showHome() {
  hide("skills");
  hide("projects");
  hide("languages");

  var page = document.getElementById("home");
  page.style.display = "block";
}

function showSkills() {
  hide("home");
  hide("projects");
  hide("languages");

  var page = document.getElementById("skills");
  page.style.display = "block";
}

function showProjects() {
  hide("home");
  hide("skills");
  hide("languages");

  var page = document.getElementById("projects");
  page.style.display = "block";
}

function showLanguages() {
  hide("home");
  hide("skills");
  hide("projects");

  var page = document.getElementById("languages");
  page.style.display = "block";
}
