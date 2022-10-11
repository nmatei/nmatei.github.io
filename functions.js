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

function rubikFaceCls(size, i) {
  if (size % 2 === 1 && (size * size - 1) / 2 === i) {
    return "center";
  }
  if (i === 0 || i === size - 1 || i === size * size - size || i === size * size - 1) {
    return "corner";
  }
  if (i < size - 1) {
    return "top-edge";
  }
  if (i % size === 0) {
    return "left-edge";
  }
  if (i % size === size - 1) {
    return "right-edge";
  }
  if (i > size * size - size) {
    return "bottom-edge";
  }
  return "middle";
}

function scrambleRubikFace(face, newSize) {
  let oldSize = face.getAttribute("data-rubik-size");
  if (oldSize) {
    oldSize *= 1;
  }
  newSize = newSize || oldSize;
  const n = newSize * newSize;
  const pieces = new Array(n).fill(0);
  const colors = pieces.map(() => rubikColors[Math.floor(Math.random() * 6)]);
  htmlPices = face.querySelectorAll("div");
  if (htmlPices.length === n) {
    htmlPices.forEach((piece, i) => {
      piece.style.background = colors[i];
    });
  } else {
    const html = pieces.map(
      (p, i) => `<div style="background: ${colors[i]}" class="${rubikFaceCls(newSize, i)}"></div>`
    );
    face.style.gridTemplateColumns = new Array(newSize).fill("auto").join(" ");
    // TODO progresive growing
    face.style.maxWidth = `${Math.max(200, newSize * 60)}px`;
    if (oldSize) {
      face.classList.remove(`rubik-size-${oldSize}`);
    }
    face.classList.add(`rubik-size-${newSize}`);
    face.setAttribute("data-rubik-size", newSize);
    face.innerHTML = html.join("");
  }
}

function initRubik(form) {
  const face = form.querySelector(".rubik-face");
  const size = form.querySelector("[name=size]").value * 1;
  scrambleRubikFace(face, size);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const size = form.querySelector("[name=size]").value * 1;
    scrambleRubikFace(face, size);
  });
}

setTimeout(() => {
  initRubik(document.getElementById("rubikChallange"));
  initRubik(document.getElementById("rubikChallangePage"));
}, 10);
