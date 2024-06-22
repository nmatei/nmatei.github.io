const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// TODO use this file to generate entire content
//   filter out old Coupons
const COUPONS_PATH = "course/coupons.json";

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

function getCouponExpire(couponType) {
  const expire = new Date();
  // Add 5 or 31 days to the current date
  expire.setDate(expire.getDate() + (couponType === "best" ? 5 : 31));
  // Subtract 5 minutes from the current date
  expire.setMinutes(expire.getMinutes() - 5);
  return expire;
}

function getHTMLCoupon(type, code, expire, cls = "") {
  const url = `https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=${code}`;
  return `
    <li data-expire="${expire.toISOString()}" class="${type}-price ${cls}">
      <a target="_blank" href="${url}">
        <span class="coupon-code">${code}</span>
        <div class="coupon-info">
          <span>Valid until:</span>
          <span class="coupon-expire-date">${expire.toDateString()} ${type === "best" ? "✨" : ""}</span>
        </div>
      </a>
    </li>
  `;
}

function getCoupons() {
  const content = fs.readFileSync(COUPONS_PATH);
  return JSON.parse(content);
}

function storeJsonCoupon(type, code, expire) {
  const store = getCoupons();
  store.coupons.push({
    type,
    code,
    expire: expire.toISOString()
  });
  const content = JSON.stringify(store, null, 2);
  fs.writeFileSync(COUPONS_PATH, content);
}

function setHtmlCoupons(coupons) {
  const limit = new Date().getTime() - 90 * 24 * 60 * 60 * 1000; // 90 days back
  coupons = coupons
    .filter(c => new Date(c.expire).getTime() > limit)
    .sort((a, b) => new Date(b.expire).getTime() - new Date(a.expire).getTime());
  const now = new Date().getTime();

  const list = coupons.map(coupon => {
    let expire = new Date(coupon.expire);
    const cls = expire.getTime() < now ? "expired" : "";
    return getHTMLCoupon(coupon.type, coupon.code, expire, cls);
  });

  $("#coupons ul").html(list.join(""));

  fs.writeFileSync(htmlFilePath, $.html());
}

if (["best", "custom"].includes(couponType)) {
  console.info("adding coupon : %o", couponType);
  const newCouponExpire = getCouponExpire(couponType, couponCode);
  storeJsonCoupon(couponType, couponCode, newCouponExpire);
} else {
  console.warn("Invalid coupon type: %o", couponType);
}

setHtmlCoupons(getCoupons().coupons);

console.log("Coupons page refreshed successfully!");
