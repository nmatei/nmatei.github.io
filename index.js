var skillsEl = document.getElementById("skills-list");
//skillsEl.style.color = "red";
//skillsEl.style.fontSize = "25px";

// document.getElementById("skills-list").style.display = "none";

// var oldText = skillsEl.innerHTML;
// skillsEl.innerHTML = oldText + "<li>JS</li>";

//skillsEl.innerHTML = skillsEl.innerHTML + "<li>JS</li>";

// skillsEl.innerHTML += '<li class="favorite">HTML</li>';
// skillsEl.innerHTML += '<li class="favorite">CSS</li>';
// skillsEl.innerHTML += "<li>JS</li>";

var skills = ["HTML", "CSS", "JS", "Drive"];

// skillsEl.innerHTML += "<li>" + skills[0] + "</li>";
// skillsEl.innerHTML += "<li>" + skills[1] + "</li>";
// skillsEl.innerHTML += "<li>" + skills[2] + "</li>";

var skillsHTML = "";
// var i = 0;

// skillsHTML += "<li>" + skills[i] + "</li>";
// i++;
// skillsHTML += "<li>" + skills[i] + "</li>";
// i++;
// skillsHTML += "<li>" + skills[i] + "</li>";
// i++;
// skillsHTML += "<li>" + skills[i] + "</li>";
// i++;

for (var i = 1; i < skills.length; i = i + 2) {
  skillsHTML += "<li>" + skills[i] + "</li>";
}

skillsEl.innerHTML = skillsHTML;
