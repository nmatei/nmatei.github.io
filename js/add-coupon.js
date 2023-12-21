const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Get the HTML file path from the command line arguments
const args = process.argv.slice(2);
if (args.length < 3) {
  console.warn("\n");
  console.error("\t    Best price Usage: %o", "yarn coupon best CODE");
  console.error("\t  Custom price Usage: %o", "yarn coupon custom CODE");
  console.warn("\n");
  process.exit(1);
}

const htmlFilePath = path.resolve(args[0]);
const couponType = args[1].toLowerCase();
const couponCode = args[2];

const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
const $ = cheerio.load(htmlContent);

function getCoupon(couponType, couponCode) {
  const url = `https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=${couponCode}`;
  const expire = new Date();
  // Add 5 or 31 days to the current date
  expire.setDate(expire.getDate() + (couponType === "best" ? 5 : 31));

  return {
    expire,
    code: `
      <li data-expire="${expire.toISOString()}" class="${couponType}-price">
        <a target="_blank" href="${url}">
          <span class="coupon-code">${couponCode}</span>
          <div class="coupon-info">
            <span>Valid until:</span>
            <span class="coupon-expire-date">${expire.toDateString()} ${couponType === "best" ? "✨" : ""}</span>
          </div>
        </a>
      </li>
    `
  };
}

const newCoupon = getCoupon(couponType, couponCode);

const now = new Date().getTime();
let preview;
$("#coupons ul li").each(function (i, elem) {
  const li = $(elem);
  const date = new Date(li.attr("data-expire"));
  if (date.getTime() < now) {
    li.addClass("expired");
  } else if (date.getTime() > newCoupon.expire.getTime()) {
    preview = li;
  }
});

if (preview) {
  preview.after(newCoupon.code);
} else {
  $("#coupons ul").prepend(newCoupon.code);
}

fs.writeFileSync(htmlFilePath, $.html());

console.log("Coupon added successfully!");
