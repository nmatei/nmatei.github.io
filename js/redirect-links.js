function check404Redirects() {
  var path = window.location.pathname.substring(1);

  fetch("/data/redirect-linksx.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (redirects) {
      var redirect = redirects[path];
      while (redirects[redirect]) {
        redirect = redirects[redirect];
      }
      if (redirect) {
        window.location.href = redirect;
      }
    })
    .catch(function () {
      console.error("create %o file in the root folder", "/data/redirect-links.json");
      console.warn("/data/redirect-links.json content example %o", {
        "old-path": "/new-path",
        youtube: "https://www.youtube.com/c/mateinick"
      });
    });
}

window.addEventListener("load", function () {
  setTimeout(function () {
    check404Redirects();
  }, 10);
});
