function check404Redirects() {
  var path = window.location.pathname.substring(1);

  fetch("/data/redirect-links.json", { cache: 'reload' })
    .then(function (r) {
      return r.json();
    })
    .then(function (redirects) {
      var redirect = redirects[path];
      while (redirects[redirect]) {
        redirect = redirects[redirect];
      }
      if (redirect) {
        // Parse the target URL
        var url = new URL(redirect.startsWith("http") ? redirect : window.location.origin + "/" + redirect);

        // Check if there are URL parameters to preserve from the original URL
        var search = window.location.search;
        if (search && search.length > 1) {
          // Parse the original search parameters
          var originalParams = new URLSearchParams(search);

          // Create a new URLSearchParams object from the target URL's search params
          var targetParams = url.searchParams;

          // Iterate through original parameters and add them to the target URL
          // This ensures the original parameters take precedence over any existing ones
          originalParams.forEach(function (value, key) {
            // Remove any existing parameters with the same name first
            targetParams.delete(key);
            // Add the parameter from the original URL
            targetParams.append(key, value);
          });

          // No need to manually construct the URL as it's handled by the URL object
        }

        // Perform the redirect with the properly merged parameters
        window.location.href = url.toString();
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
