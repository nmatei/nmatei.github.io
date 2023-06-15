function hideAllPages() {
  document.getElementById("home").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("languages").style.display = "none";
  document.getElementById("projects").style.display = "none";
}

function displayPage(id) {
  hideAllPages();
  var page = document.getElementById(id);
  page.style.display = "block";
}

displayPage("home");
