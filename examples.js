function variablesExamples() {
  console.info(2 + 3);
  console.warn("Nicolae Matei");

  var employed = true;
  var age = 18;
  console.log("Angajat:", employed);
  employed = false;
  console.log("Angajat:", employed);
  employed = "da";
  console.log("Angajat:", employed);

  var skills = ["html", "css"];
  console.debug("tipul variabilei skills:", typeof skills);
}

function updateTitle(title) {
  var job = document.getElementById("job-title");
  console.warn("job", job, title);
  console.info(typeof job);
  job.innerHTML = title;
}

variablesExamples();
updateTitle("Web Developer @ RWS");
