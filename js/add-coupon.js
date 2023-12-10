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

const url = `https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=${couponCode}`;
const newCoupon = $("<li>").html(`<a target="_blank" href="${url}">${couponCode}</a>`);

$("#coupons ul").prepend(newCoupon);

fs.writeFileSync(htmlFilePath, $.html());

console.log("Coupon added successfully!");
