function hideAllPages() {
  document.getElementById("home").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("languages").style.display = "none";
  document.getElementById("projects").style.display = "none";
}

function showLanguages() {
  showPage("languages");
}

function showProjects() {
  showPage("projects");
}

function showPage(id) {
  hideAllPages();
  var page = document.getElementById(id);
  console.info("show", page);
  page.style.display = "block";
}

showPage("home");
