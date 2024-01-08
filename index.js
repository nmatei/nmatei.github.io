// variable publice
var activePage = "skills";

// functii publice
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
  var prevLink = document.querySelector("a[data-page=" + activePage + "]");
  prevLink.classList.remove("active");
  hide(activePage);

  var nextLink = document.querySelector(`a[data-page=${id}]`);
  nextLink.classList.add("active");
  show(id);
  activePage = id;
}

function initEvents() {
  var toolbar = document.querySelector("#top-menu-bar");
  toolbar.addEventListener("click", function (e) {
    if (e.target.matches("a")) {
      var page = e.target.dataset.page;
      console.warn("click", page);
      showPage(page);
    }
  });
}

function showSkills() {
  var ul = document.querySelector("#skills ul");

  var skills = ["HTML", "CSS", "JS"];

  var text = skills.map(function (skill) {
    console.info("inside %o map", skill);
    return `<li>${skill}</li>`;
  });
  console.warn(text);

  ul.innerHTML = text.join("");
}

// excutii
showSkills();
showPage(activePage);
initEvents();
