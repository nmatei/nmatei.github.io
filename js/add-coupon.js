const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Get the HTML file path from the command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: yarn coupon CODE");
  process.exit(1);
}
const htmlFilePath = path.resolve(args[0]);
const couponCode = args[1];

const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
const $ = cheerio.load(htmlContent);

function getCoupon(couponCode) {
  var url = `https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=${couponCode}`;

  var link = `<a target="_blank" href="${url}">
    <span class="coupon-code">${couponCode}</span>
    <div class="coupon-info">
      <span>Valid until:</span>
      <span class="coupon-expire-date">Tue Oct 17 2023</span>
    </div>
  </a>`;

  return $('<li data-expire="2023-10-17T20:16:02.052Z">').html(link);
}

const newCoupon = getCoupon(couponCode);

$("#coupons ul").prepend(newCoupon);

fs.writeFileSync(htmlFilePath, $.html());

console.log("Coupon added successfully!");
