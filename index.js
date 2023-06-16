function hide(id) {
  console.info("hide %o element", id);
  document.getElementById(id).style.display = "none";
}

function hideAllPages() {
  hide("home");
  hide("skills");
  hide("languages");
  hide("projects");
}

function showPage(id) {
  hideAllPages();
  var page = document.getElementById(id);
  console.info("show", id, page);
  page.style.display = "block";
}

showPage("home");
