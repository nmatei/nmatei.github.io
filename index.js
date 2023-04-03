var activePage = "skills";

show(activePage);

function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  document.getElementById(id).style.display = "block";
}

function hideAllPages() {
  var pages = document.querySelectorAll("#main .page");
  pages.forEach(function (page) {
    hide(page.id);
  });
}

function showPage(id) {
  hideAllPages();
  show(id);
}

document.querySelector("#top-menu-bar").addEventListener("click", function (e) {
  if (e.target.matches("a")) {
    var id = e.target.dataset.page;
    showPage(id);
  }
});

function showSkills() {
  var skills = [
    {
      name: "HTML",
      endorcements: 5,
    },
    {
      name: "CSS",
      endorcements: 10,
    },
    {
      name: "JS",
      endorcements: 15,
    },
  ];
  var html = skills.map(function (skill) {
    return `<li>${skill.name} - <span class="endorcements">${skill.endorcements}</span></li>`;
  });
  console.warn(html);

  var container = document.querySelector("#skills ul");
  container.innerHTML = html.join("");
}

showSkills();
