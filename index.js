var activePage = "home";

// utilities functions

function $(selector) {
  return document.querySelector(selector);
}

function hide(id) {
  console.info("hide %o element", id);
  $(`#${id}`).style.display = "none";
}

function show(id) {
  var page = $("#" + id);
  console.info("show %o", id, page);
  page.style.display = "block";
}

function showPage(id) {
  var oldLink = $(`#top-menu-bar a[data-page=${activePage}]`);
  oldLink.classList.remove("active");

  hide(activePage);

  var link = $(`#top-menu-bar a[data-page=${id}]`);
  link.classList.add("active");

  show(id);

  activePage = id;
}

function clickOnMenu(e) {
  var link = e.target.closest("a");
  //console.warn("click", link, e.target);
  if (link) {
    var id = link.dataset.page;
    //console.warn("click %o menu", e.target.getAttribute("data-page"));
    //console.warn("click %o menu", id);
    if (id) {
      showPage(id);
    }
  }
}

// start our code

showPage("home");
$("#top-menu-bar").addEventListener("click", clickOnMenu);
