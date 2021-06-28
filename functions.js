function hidePage(id) {
  document.getElementById(id).style.display = 'none';
}

function highlight(el) {
  el.style.borderColor = '#00df00';
  setTimeout(function () {
    el.style.borderColor = '#55df44';
  }, 100);
  setTimeout(function () {
    el.style.borderColor = '#99df88';
  }, 200);
  setTimeout(function () {
    el.style.borderColor = '#e0dfdc';
  }, 300);
}

function showPage(id) {
  var page = document.getElementById(id);
  if (page) {
    page.style.display = 'block';
    highlight(page);
  } else {
    console.warn("pagina cu id-ul %o nu exista", id);
  }
}

function hideAllPages() {
  var pages = Array.from(document.getElementsByClassName('page'));
  pages.forEach(function(page){
    hidePage(page.id);
  });
}

function showHome() {
  hideAllPages();
  showPage('home');
}

function showSkills() {
  hideAllPages();
  showPage('skills');
}

function showProjects() {
  hideAllPages();
  showPage('projects');
}

function showLanguages() {
  hideAllPages();
  showPage('languages');
}

showSkills();