let activePage = "skills";

function $(selector) {
  return document.querySelector(selector);
}

function hide(id) {
  $("#" + id).style.display = "none";
}

function show(id) {
  $(`#${id}`).style.display = "block";
}

function showPage(id) {
  hide(activePage);
  $(`#top-menu-bar a[data-page="${activePage}"]`).classList.remove("active");
  show(id);
  $(`#top-menu-bar a[data-page="${id}"]`).classList.add("active");
  activePage = id;
}

function initEvents() {
  $("#top-menu-bar").addEventListener("click", (e) => {
    const id = e.target.dataset.page;
    console.info("click on menu-bar", id);
    if (id) {
      showPage(id);
    }
  });
}

function loadSkills() {
  fetch("skills.json")
    .then((response) => response.json())
    .then((skills) => {
      printSkills(skills);
    });
}

function printSkills(skills) {
  skills = sortSkillsByEndorcements(skills);
  const skillsMapResult = skills.map((skill) => {
    const cls = skill.favorite ? "favorite" : "";
    return `<li class="${cls}">${skill.name} <span>- ${skill.endorcements}</span></li>`;
  });
  $("#skills ul").innerHTML = skillsMapResult.join("");
}

function sortSkillsByEndorcements(skills) {
  return skills.sort((a, b) => b.endorcements - a.endorcements);
}

function sortSkillsByName(skills) {
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

showPage(activePage);
initEvents();
loadSkills();
