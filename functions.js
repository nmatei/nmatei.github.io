function hide(id) {
    var el = document.getElementById(id);
    if (el) {
        el.style.display = "none";
    } else {
        console.error("elementul nu exista");
    }
}

function hideAllPages() {
    var pages = document.querySelectorAll(".page");
    for(var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var id = page.id;
        hide(id);
    }
}

function showPage(pageId) {
    hideAllPages();
    document.getElementById(pageId).style.display = "";
}

function showHome() {
    showPage('home');
}

function showSkills() {
    showPage('skills');
}

function showProjects() {
    showPage("projects");
}

function showLanguages() {
    showPage("languages");
}