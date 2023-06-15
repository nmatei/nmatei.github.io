var activePage = "home";

function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  var page = document.getElementById(id);
  page.style.display = "block";
}

function displayPage(id) {
  hide(activePage);
  show(id);
  activePage = id;
}

displayPage(activePage);
