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

function showHome() {
  hidePage('skills');
  hidePage('projects');
  hidePage('languages');
  showPage('home');
}

function showSkills() {
  hidePage('home');
  hidePage('projects');
  hidePage('languages');
  showPage('skills');
}

function showProjects() {
  hidePage('home');
  hidePage('skills');
  hidePage('languages');
  showPage('projects');
}

function showLanguages() {
  hidePage('home');
  hidePage('skills');
  hidePage('projects');
  showPage('languages');
}
