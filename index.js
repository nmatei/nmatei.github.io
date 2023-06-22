let activePage = "skills";

function hide(id) {
  $("#" + id).style.display = "none";
}
function show(id) {
  const page = $(`#${id}`);
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

function showSkillsList(skills) {
  const ul = $("#skills ul");

  //return a.name.localeCompare(b.name);
  skills.sort((a, b) => b.endorcemements - a.endorcemements);

  const skillsHTML = skills.map((skill, i) => {
    const cls = skill.favorite ? "favorite" : "";
    return `<li class="${cls}">${i + 1}) ${skill.name} <span>· ${
      skill.endorcemements
    }</span></li>`;
  });
  skillsHTML.push("<li>...</li>");
  ul.innerHTML = skillsHTML.join("");
}

function getSkillsRequest() {
  fetch("skills.json")
    .then((r) => r.json())
    .then(showSkillsList);
}

function initEvents() {
  function clickOnMenu(e) {
    if (e.target.matches("a")) {
      const id = e.target.dataset.page;
      if (id) {
        displayPage(id);
      } else {
        console.warn('please use <a data-page="pageid"> ');
      }
    }
  }

  $("#top-menu-bar").addEventListener("click", clickOnMenu);
}

displayPage(activePage);
initEvents();
getSkillsRequest();
