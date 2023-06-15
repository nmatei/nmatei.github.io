function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  var page = document.getElementById(id);
  page.style.display = "block";
}

function hideAllPages() {
  hide("home");
  hide("skills");
  hide("languages");
  hide("projects");
}

function displayPage(id) {
  hideAllPages();
  show(id);
}

displayPage("home");
