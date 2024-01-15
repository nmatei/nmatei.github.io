// variable publice
var activePage = "skills";

// functii publice
function $(selector) {
  var el = document.querySelector(selector);
  // console.info("%o found:", selector, el);
  return el;
}

function hide(id) {
  console.info("hide", id);
  $("#" + id).style.display = "none";
}

function show(id) {
  console.info("show", id);
  var page = $(`#${id}`);
  console.debug("show page", page);
  page.style.display = "block";
}

function showPage(id) {
  console.info("show page", id);
  var prevLink = $("a[data-page=" + activePage + "]");
  prevLink.classList.remove("active");
  hide(activePage);

  var nextLink = $(`a[data-page=${id}]`);
  nextLink.classList.add("active");
  show(id);
  activePage = id;
}

function initEvents() {
  var toolbar = $("#top-menu-bar");
  toolbar.addEventListener("click", function (e) {
    if (e.target.matches("a")) {
      var page = e.target.dataset.page;
      console.warn("click", page);
      showPage(page);
    }
  });
}

function showSkills() {
  var ul = $("#skills ul");

  var skills = [
    {
      name: "HTML",
      endorcements: 6,
      favorite: true,
    },
    {
      name: "CSS",
      endorcements: 5,
    },
    {
      name: "JS",
      endorcements: 7,
      favorite: true,
    },
    {
      name: "Word",
      endorcements: 1,
      favorite: false,
    },
  ];

  var text = skills.map(function (skill) {
    var cls = "";
    if (skill.favorite == true) {
      cls = "favorite";
    }

    console.info("%o (%o)", skill.name, cls);
    return `<li class="${cls}">${skill.name} <span> - ${skill.endorcements}</span></li>`;
  });
  console.warn(text);

  ul.innerHTML = text.join("");
}

// excutii
showSkills();
showPage(activePage);
initEvents();
