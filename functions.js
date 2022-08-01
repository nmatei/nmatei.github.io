let activePage = "home";

function hide(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "none";
  } else {
    console.error("element you are searching does not exist... check your selector");
  }
}

function hidePreviousPage() {
  hide(activePage);
  const link = document.querySelector(`#top-menu-bar a[data-page="${activePage}"]`);
  link.classList.remove("active");
}

function showPage(pageId) {
  hidePreviousPage();
  document.getElementById(pageId).style.display = "";
  const link = document.querySelector(`#top-menu-bar a[data-page="${pageId}"]`);
  link.classList.add("active");
  activePage = pageId;
}

function initMenu() {
  document.addEventListener("click", e => {
    const link = e.target;
    if (link.matches("#top-menu-bar a")) {
      const id = link.getAttribute("data-page");
      showPage(id);
    }
  });
}

initMenu();

showPage(activePage);

function getHTMLSkills(skills) {
  return skills
    .map(
      skill =>
        `<li class="${skill.endorsements > 9 ? "favorite" : ""}">
            ${skill.name} <span>&middot; ${skill.endorsements}</span>
        </li>`
    )
    .join("");
}

function showSkills(skills) {
  const ul = document.querySelector("#skills ul");
  ul.innerHTML = getHTMLSkills(skills);
}

fetch("data/skills.json")
  .then(r => r.json())
  .then(allSkills => {
    allSkills.sort((s1, s2) => s2.endorsements - s1.endorsements);

    showSkills(allSkills);
  });

const rubikColors = ["#f1efe2", "#07f104", "#FFFF00", "#ffa500", "#ff2c0a", "#0082df"];
function scrambleRubikFace() {
  // const colors = new Array(9).fill(0).map((z, i) => rubikColors[i]); // show all 6 colors
  const colors = new Array(9).fill(0).map(() => rubikColors[Math.floor(Math.random() * 6)]);
  document.querySelectorAll("#rubik-face div").forEach((piece, i) => {
    piece.style.background = colors[i];
  });
}
scrambleRubikFace();
