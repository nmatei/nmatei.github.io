console.debug('inside functions.js');

function getInfo(name) {
  var mess = "Salut " + name + ", bine ai venit!";
  console.warn('inside get info', mess);
  return mess;
}

console.info(getInfo("Nick " + "Matei"));

// var myName = "Nick " + "Matei";
// var wellcome = getInfo(myName);
// console.info(wellcome);

function showHome() {
  document.getElementById('skills').style.display = 'none';
  document.getElementById('projects').style.display = 'none';
  document.getElementById('languages').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

function showSkills() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('projects').style.display = 'none';
  document.getElementById('languages').style.display = 'none';
  document.getElementById('skills').style.display = 'block';
}

function showProjects() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('skills').style.display = 'none';
  document.getElementById('languages').style.display = 'none';
  document.getElementById('projects').style.display = 'block';
}

function showLanguages() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('skills').style.display = 'none';
  document.getElementById('projects').style.display = 'none';
  document.getElementById('languages').style.display = 'block';
}
