var activePage = "home";

var homePage = document.getElementById(activePage);
homePage.style.display = "block";

function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  document.getElementById(id).style.display = "block";
}

function hideAllPages() {
  var pages = ["home", "skills", "projects", "languages"];
  pages.forEach(function (page) {
    hide(page);
  });
}

function showPage(id) {
  hideAllPages();
  show(id);
}
