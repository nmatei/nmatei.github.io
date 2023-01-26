const r1 = fetch("skills.json");
r1.then((raspuns) => {
  const r2 = raspuns.json();
  r2.then((skills) => {
    displaySkills(skills);
  });
});

function displaySkills(skills) {
  const skillsHTML = skills.map(
    (skill) => `<li>${skill.name} - <span>${skill.endorcements}</span></li>`
  );
  console.warn(skillsHTML);
  const skillsEl = document.getElementById("skills-list");
  skillsEl.innerHTML = skillsHTML.join("");
}

function hideAllPages() {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    hide(page.id);
  });
}

function show(id) {
  document.getElementById(id).style.display = "block";
}
function hide(id) {
  document.getElementById(id).style.display = "none";
}

function displayPage(id) {
  hideAllPages();
  show(id);
}

function initMenu() {
  document.getElementById("top-menu-bar").addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      // var id = e.target.getAttribute("data-page");
      const id = e.target.dataset.page;
      displayPage(id);
    }
  });
}

displayPage("skills");
initMenu();

const f1 = function () {
  return "arrow";
};
const f2 = () => {
  return "arrow";
};
const f3 = () => "raspuns";
