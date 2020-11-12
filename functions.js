function hide(id) {
    //document.getElementById(id).style.display = "none";
    var el = document.getElementById(id);
    console.info("hide:" + id, el);
    if (el) {
        el.style.display = "none";
    } else {
        console.error("elementul nu exista");
    }
}

function showHome() {
    hide("skills");
    hide("projects");
    hide("languages");
    document.getElementById('home').style.display = '';
}

function showSkills() {
    hide("home");
    hide("projects");
    hide("languages");
    document.getElementById('skills').style.display = '';
}

function showProjects() {
    document.getElementById("home").style.display = "none";
    document.getElementById("skills").style.display = "none";
    document.getElementById("languages").style.display = "none";
    document.getElementById("projects").style.display = "";
}

function showLanguages() {
    document.getElementById("home").style.display = "none";
    document.getElementById("skills").style.display = "none";
    document.getElementById("projects").style.display = "none";
    document.getElementById("languages").style.display = "";
}