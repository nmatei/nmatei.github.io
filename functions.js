function hidePage(id) {
  console.info('hide page', id);
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
  console.info('show page', id);
  var page = document.getElementById(id);
  console.info('show', page);
  if (page) {
    page.style.display = 'block';
    highlight(page);
  } else {
    console.warn("pagina cu id-ul %o nu exista", id);
  }
}

function hideAllPages() {
  var pageIds = [
    'home', 'skills', 'projects', 'languages'
  ];

  pageIds.forEach(function(pageId){
    hidePage(pageId);
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