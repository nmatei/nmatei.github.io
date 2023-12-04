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

function showPage(id) {
  console.info("show page", id);
  hide(activePage);
  show(id);
  activePage = id;
}
