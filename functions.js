/**
 * @global
 * @var {Object} CircleSlices
 */

window.onerror = function (message, source, lineno, colno, error) {
  alert(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${JSON.stringify(error)}`
  );
  return false; // Returning false will suppress the default browser error message
};

var activePage = "home";

var dark = localStorage.getItem("dark-mode");
if (dark === "true") {
  document.body.classList.add("dark-mode");
}

if (typeof URLSearchParams === "undefined") {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/url-search-params-polyfill@8.2.5/index.min.js";
  script.async = false;
  document.head.appendChild(script);
}
if (typeof fetch === "undefined") {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/fetch-polyfill@0.8.2/fetch.min.js";
  script.async = false;
  document.head.appendChild(script);
}

function $(selector, parent) {
  return (parent || document).querySelector(selector);
}

function initContactForm() {
  var autoSend = false;
  const fields = ["Name", "Email", "Subject", "Message"];
  const searchParams = new URLSearchParams(window.location.search);
  fields.forEach(function (field) {
    var value = searchParams.get(field);
    $("#" + field).value = value;
    if (value) {
      autoSend = true;
    }
  });
  if (autoSend) {
    setTimeout(function () {
      const form = $("#contact-form");
      form.target = "";
      form.submit();
    }, 2000);
  }
}

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
  var link = $(`a[data-page="${activePage}"]`);
  link.classList.remove("active");
}

function showPage(pageId, rotate) {
  hidePreviousPage();
  document.getElementById(pageId).style.display = "block";
  var link = $(`a[data-page="${pageId}"]`);
  link.classList.add("active");
  if (rotate !== false) {
    setTimeout(() => {
      rotateCircleMenu(pageId);
    }, 10);
  }
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
  $("#top-menu-bar").addEventListener("click", initLink);
  Array.from(document.querySelectorAll("a.page-actions[data-page]")).forEach(function (link) {
    link.addEventListener("click", initLink);
  });

  $("#colorblind").addEventListener("click", function () {
    document.body.classList.toggle("grayscale");
  });

  $("#toggle-dark-mode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
  });
}

var circleMenu = {
  home: { icon: "🏡", text: "Home" },
  skills: { icon: "👌", text: "Skills" },
  projects: { icon: "🔥", text: "Projects" },
  languages: { icon: "🌎", text: "Languages" },
  rubik: { icon: "💠", text: "Rubik" }
};

function initCircleMenu(pageId) {
  const renderTo = "#circle-menu";
  CircleSlices.render({
    renderTo: renderTo,
    groupSize: 200,
    slicesSize: 120,
    centerSize: 25,
    default: circleMenu[pageId].icon,
    text: Object.keys(circleMenu)
      .map(function (hash) {
        return `#${circleMenu[hash].text} \n ${circleMenu[hash].icon}`;
      })
      .join("\n"),
    centerText: ``
  });

  document.querySelector(renderTo).addEventListener("rotate", event => {
    const { index } = event.detail;
    const id = Object.keys(circleMenu)[index];
    showPage(id, false);
    if (history.pushState) {
      history.pushState(null, null, "#" + id);
    }
  });
}

function rotateCircleMenu(pageId) {
  const i = Object.keys(circleMenu).findIndex(function (hash) {
    return hash === pageId;
  });
  const slice = $(`.slice-text[data-index="${i + 1}"]`);
  if (slice) {
    const angle = parseFloat(slice.style.getPropertyValue("--angle").replace("deg", ""));
    CircleSlices.rotate("#circle-menu", -angle);
  }
}

function getHTMLSkills(skills) {
  return skills
    .map(function (skill) {
      return `<li class="${skill.endorsements > 9 ? "favorite" : ""}">
            ${skill.name} <span>&middot; ${skill.endorsements}</span>
        </li>`;
    })
    .join("");
}

function showSkills(skills) {
  const ul = $("#skills ul");
  ul.innerHTML = getHTMLSkills(skills);
}

function loadSkills() {
  fetch("/data/skills.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (allSkills) {
      allSkills.sort(function (s1, s2) {
        return s2.endorsements - s1.endorsements;
      });

      showSkills(allSkills);
    });
}

window.addEventListener("load", function () {
  initContactForm();

  var hash = window.location.hash.substring(1);

  if (hash) {
    var page = $("#" + hash);
    if (page && page.classList.contains("page")) {
      activePage = hash;
    }
  }

  showPage(activePage);

  initMenu();

  initCircleMenu(activePage);

  setTimeout(function () {
    initRubik($("#rubikChallenge"));
    initRubik($("#rubikChallengePage"));

    loadSkills();
  }, 10);
});
