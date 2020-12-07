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

function getHTMLSkills(skills) {
    var skillsLi = skills.map(function(skill){
        return `<li class="${skill.endorsements > 9 ? "favorite" : ""}">
            ${skill.name} <span>&middot; ${skill.endorsements}</span>
        </li>`;
    });
    return skillsLi.join("")*1;
}

function showSkills(skills) {
    var ul = document.querySelector("#skills ul");
    ul.innerHTML = getHTMLSkills(skills);
}

fetch("data/skills.json").then(function(r) {
    return r.json();
}).then(function(allSkills) {
    allSkills.sort(function(s1, s2) {
        return s2.endorsements - s1.endorsements;
        //return s1.name < s2.name ? -1 : 1;
    });

    showSkills(allSkills);
});

// TODO intro in es6