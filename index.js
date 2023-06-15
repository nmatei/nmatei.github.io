var activePage = "home";

function hide(id) {
  $("#" + id).style.display = "none";
}
function show(id) {
  var page = $(`#${id}`);
  page.style.display = "block";
}

function $(selector) {
  return document.querySelector(selector);
}

function displayPage(id) {
  hide(activePage);
  $(`#top-menu-bar a[data-page="${activePage}"]`).classList.remove("active");
  activePage = id;
  show(id);
  $(`#top-menu-bar a[data-page="${id}"]`).classList.add("active");
}

displayPage(activePage);

function clickOnMenu(e) {
  if (e.target.matches("a")) {
    var id = e.target.dataset.page;
    if (id) {
      displayPage(id);
    } else {
      console.warn('please use <a data-page="pageid"> ');
    }
  }
}

$("#top-menu-bar").addEventListener("click", clickOnMenu);
