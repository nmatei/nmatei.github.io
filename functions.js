function hide(id) {
    //document.getElementById(id).style.display = "none";
    var el = document.getElementById(id);
    //console.info("hide:" + id, el);
    if (el) {
        el.style.display = "none";
    } else {
        console.error("elementul nu exista");
    }
}

function hideAllPages() {
    var pages = document.querySelectorAll(".page");
    //for(initializare; conditie; post execute)
    for(var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var id = page.id;
        console.info("i=", i, id, page);
        hide(id);
    }
}

function showHome() {
    hideAllPages();
    document.getElementById('home').style.display = '';
}

function showSkills() {
    hideAllPages();
    document.getElementById('skills').style.display = '';
}

function showProjects() {
    hideAllPages();
    document.getElementById("projects").style.display = "";
}

function showLanguages() {
    hideAllPages();
    document.getElementById("languages").style.display = "";
}