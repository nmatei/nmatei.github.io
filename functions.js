let activePage = "home";

function $(selector, parent) {
  return (parent || document).querySelector(selector);
}

function initContactForm() {
  let autoSend = false;
  const fields = ["Name", "Email", "Subject", "Message"];
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  fields.forEach(field => {
    const value = searchParams.get(field);
    $("#" + field).value = value;
    if (value) {
      autoSend = true;
    }
  });
  if (autoSend) {
    setTimeout(() => {
      const form = $("#contact-form");
      form.target = "";
      form.submit();
    }, 2000);
  }
}

(function () {
  initContactForm();

  const hash = window.location.hash.substring(1);

  if (hash) {
    const page = $("#" + hash);
    if (page && page.classList.contains("page")) {
      activePage = hash;
    }
  }
})();

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
  const link = $(`a[data-page="${activePage}"]`);
  link.classList.remove("active");
}

function showPage(pageId) {
  hidePreviousPage();
  document.getElementById(pageId).style.display = "block";
  const link = $(`a[data-page="${pageId}"]`);
  link.classList.add("active");
  activePage = pageId;
}

function initLink(e) {
  const link = e.target;
  if (link.matches("a[data-page]")) {
    const id = link.getAttribute("data-page");
    showPage(id);
    if (history.pushState) {
      e.preventDefault();
      history.pushState(null, null, "#" + id);
    }
  }
}

function initMenu() {
  document.querySelector("#top-menu-bar").addEventListener("click", initLink);
  document.querySelectorAll("a.page-actions[data-page]").forEach(link => {
    link.addEventListener("click", initLink);
  });

  document.querySelector("#colorblind").addEventListener("click", () => {
    document.body.classList.toggle("grayscale");
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

fetch("/data/skills.json")
  .then(r => r.json())
  .then(allSkills => {
    allSkills.sort((s1, s2) => s2.endorsements - s1.endorsements);

    showSkills(allSkills);
  });

setTimeout(() => {
  initRubik(document.getElementById("rubikChallenge"));
  initRubik(document.getElementById("rubikChallengePage"));
}, 10);
