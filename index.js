var activePage = "skills";

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

showPage(activePage);

$("#top-menu-bar").addEventListener("click", function (e) {
  var id = e.target.dataset.page;
  console.info("click on menu-bar", id);
  if (id) {
    showPage(id);
  }
});

var skills = ["HTML - 3", "CSS - 1", "JavaScript - 4"];
var skillsMapResult = skills.map(function (skill) {
  console.info("inside map", skill);
  return `<li>${skill}</li>`;
});
//console.warn("result", skillsMapResult);
$("#skills ul").innerHTML = skillsMapResult.join("");
