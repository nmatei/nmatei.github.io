// variable publice
let activePage = "skills";

// functii publice
function $(selector) {
  const el = document.querySelector(selector);
  // console.info("%o found:", selector, el);
  return el;
}

function hide(id) {
  // console.info("hide", id);
  $("#" + id).style.display = "none";
}

function show(id) {
  // console.info("show", id);
  const page = $(`#${id}`);
  // console.debug("show page", page);
  page.style.display = "block";
}

function showPage(id) {
  // console.info("show page", id);
  const prevLink = $("a[data-page=" + activePage + "]");
  prevLink.classList.remove("active");
  hide(activePage);

  const nextLink = $(`a[data-page=${id}]`);
  nextLink.classList.add("active");
  show(id);
  activePage = id;
}

function initEvents() {
  const toolbar = $("#top-menu-bar");
  toolbar.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      const page = e.target.dataset.page;
      console.warn("click %o", page);
      showPage(page);
    }
  });
}

function sortSkillsByEndorcements(a, b) {
  console.info("sort", a, b);
  return b.endorcements - a.endorcements;
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

function showSkills(skills) {
  //skills.sort(sortSkillsByEndorcements);
  skills.sort(sortByName);
  const ul = $("#skills ul");

  const text = skills.map((skill) => {
    let cls = "";
    if (skill.favorite == true) {
      cls = "favorite";
    }

    console.info("%o (%o)", skill.name, cls);
    return `<li class="${cls}">${skill.name} <span> - ${skill.endorcements}</span></li>`;
  });
  console.warn(text);

  ul.innerHTML = text.join("");
}

function loadSkills() {
  fetch("skills.json").then((r) => {
    r.json().then((skills) => {
      showSkills(skills);
    });
  });
}

// excutii
showPage(activePage);
initEvents();
loadSkills();
