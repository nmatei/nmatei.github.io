function check404Redirects() {
  var path = window.location.pathname.substring(1);

  fetch("/data/redirect-links.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (redirects) {
      var redirect = redirects[path];
      while (redirects[redirect]) {
        redirect = redirects[redirect];
      }
      if (redirect) {
        // Prepare the final URL with preserved parameters
        var url = redirect;

        // Check if there are URL parameters to preserve
        var search = window.location.search;
        if (search && search.length > 1) {
          // Append parameters appropriately based on whether the redirect URL already has parameters
          url += (redirect.indexOf("?") !== -1 ? "&" : "?") + search.substring(1);
        }

        // Perform the single redirect
        window.location.href = url;
      }
    })
    .catch(function () {
      console.error("create %o file in the root folder", "/data/redirect-links.json");
      console.warn("/data/redirect-links.json content example %o", {
        "old-path": "/new-path",
        youtube: "https://www.youtube.com/c/mateinick"
      });
      console.info("real example", "https://nmatei.github.io/data/redirect-links.json");
    });
}

window.addEventListener("load", function () {
  setTimeout(function () {
    check404Redirects();
  }, 10);
});
