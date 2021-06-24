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

function showSkills() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('skills').style.display = 'block';
}