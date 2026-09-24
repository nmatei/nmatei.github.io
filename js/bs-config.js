const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

module.exports = {
  server: { baseDir: root },
  files: "**/*",
  notify: false,
  middleware: [
    function (req, res, next) {
      const url = req.url.split("?")[0];
      // If the URL has no file extension and doesn't end with "/", try serving the .html version
      if (!path.extname(url) && !url.endsWith("/")) {
        const htmlFile = path.join(root, url + ".html");
        if (fs.existsSync(htmlFile)) {
          req.url = url + ".html";
        }
      }
      next();
    }
  ]
};
