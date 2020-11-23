var activePage = "skills";

function hide(id) {
    var el = document.getElementById(id);
    if (el) {
        el.style.display = "none";
    } else {
        console.error("elementul nu exista");
    }
}

function hidePreviousPage () {
    hide(activePage);
    var link = document.querySelector(`#top-menu-bar a[data-page="${activePage}"]`);
    link.classList.remove("active");
}

function showPage(pageId) {
    hidePreviousPage();
    document.getElementById(pageId).style.display = "";
    var link = document.querySelector(`#top-menu-bar a[data-page="${pageId}"]`);
    link.classList.add("active");
    activePage = pageId;
}

function initMenu() {
    document.addEventListener("click", function(e){
        var link = e.target;
        if (link.matches("#top-menu-bar a")) {
            var id = link.getAttribute("data-page");
            showPage(id);
        }
    })
}

initMenu();

showPage(activePage);

var skills = [
    "HTML (15)",
    "CSS (5)", 
    "JS (20)"
];
var skillsLi = skills.map(function(skill){
    return "<li>" + skill + "</li>";
});

// TODO add "favorite" skill
var ul = document.querySelector("#skills ul");
ul.innerHTML = skillsLi.join("");