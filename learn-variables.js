console.warn("Age:", age);

console.info("Salut 1");
console.debug(131 * 2);
var name = "Nicolae";
console.info("Name: " + name);

var age = 12 + 7;
console.info("Age:");
console.info(age);

console.warn("Age:", age);

var skills = ['html', "css", `js`];
console.info("skills:", skills);

name = "Nick";
console.info("Name: " + name);

var m = document.getElementById("motto");
console.info('my motto', m);

m.onclick = function () {
  console.info('click pe motto', m.innerText);

  if (m.innerText == 'WebDeveloper @ RWS') {
    m.innerHTML = "<strong>Trainer</strong> @ <i>FastTrackIT</i>";
    m.style.color = '#1144dd';
  } else {
    m.innerHTML = "<strong>WebDeveloper</strong> @ <i>RWS</i>";
    m.style.color = '';
  }
}