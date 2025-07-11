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
  console.error("\t             Best price (5 days): %o", "yarn coupon best CODE");
  console.error("\t          Custom price (31 days): %o", "yarn coupon custom CODE");
  console.error("\t      Free Open (5 days, 1000 c): %o", "yarn coupon open CODE [EXISTING_CODE]");
  console.error("\t  Free Targeted (31 days, 100 c): %o", "yarn coupon targeted CODE [EXISTING_CODE]");
  console.error("\t                    Refresh page: %o", "yarn coupon clean old");
  console.warn("\n");
  console.warn("Note: When [EXISTING_CODE] is provided, it finds that coupon and extends it");
  console.warn("      with the new CODE as an encoded extended value for future use.");
  console.warn("\n");
  process.exit(1);
}

const htmlFilePath = path.resolve(args[0]);
const couponType = args[1].toLowerCase();
const couponCode = args[2];
const existingCode = args[3]; // When provided, find this existing code and add couponCode as extended

const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
const $ = cheerio.load(htmlContent);

function getCouponExpire(couponType) {
  const expire = new Date();
  // Add 5 or 31 days to the current date
  let addDays = couponType === "best" || couponType === "open" ? 5 : 31;
  expire.setDate(expire.getDate() + addDays);
  // Subtract 5 minutes from the current date
  expire.setMinutes(expire.getMinutes() - 5);
  return expire;
}

function getHTMLCoupon(type, code, expire, cls = "") {
  const url = `https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?referralCode=DCED6F67EFF597AA11CE&couponCode=${code}`;
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

function storeJsonCoupon(type, code, expire, existingCode) {
  const store = getCoupons();

  // If existingCode is provided, find existing coupon and update it
  if (existingCode && ["open", "targeted"].includes(type)) {
    const existingCouponIndex = store.coupons.findIndex(c => {
      // Match by code pattern (handling both full codes and masked codes)
      const cleanExisting = existingCode.replace(/\*/g, "");
      const cleanStored = c.code.replace(/\*/g, "");

      // Check if the stored code starts with the existing code pattern
      return cleanStored.startsWith(cleanExisting) || cleanExisting.startsWith(cleanStored) || c.code === existingCode;
    });

    if (existingCouponIndex !== -1) {
      // Update existing coupon with new extended code
      store.coupons[existingCouponIndex].extended = encodeCoupon(code);
      console.log(`Extended existing coupon ${existingCode} with new code for future use`);
      // Continue to create new coupon as well
    } else {
      console.warn(`Coupon ${existingCode} not found for extending`);
      // Continue to create new coupon anyway
    }
  }

  // Create new coupon (original logic)
  let displayCode = code;
  if (["open", "targeted"].includes(couponType)) {
    // half hidden
    displayCode = code.substring(0, code.length / 2) + code.substring(code.length / 2).replace(/./g, "*");
  }

  const couponData = {
    type,
    code: displayCode,
    expire: expire.toISOString()
  };

  store.coupons.push(couponData);
  const content = JSON.stringify(store, null, 2);
  fs.writeFileSync(COUPONS_PATH, content);
}

// Simple encoding function for extended coupon codes
function encodeCoupon(code) {
  // Simple base64-like encoding with character shift
  return Buffer.from(code)
    .toString("base64")
    .split("")
    .map(c => String.fromCharCode(c.charCodeAt(0) + 3))
    .join("");
}

function setHtmlCoupons(coupons) {
  const limit = new Date().getTime() - 90 * 24 * 60 * 60 * 1000; // 90 days back
  coupons = coupons
    .filter(c => new Date(c.expire).getTime() > limit)
    .sort((a, b) => new Date(b.expire).getTime() - new Date(a.expire).getTime());
  const now = new Date().getTime();

  const list = coupons
    .map(coupon => {
      let expire = new Date(coupon.expire);
      const expired = expire.getTime() < now;
      if (expired && (coupon.type === "open" || coupon.type === "targeted")) {
        //return false;
      }
      const cls = expired ? "expired" : "";
      return getHTMLCoupon(coupon.type, coupon.code, expire, cls);
    })
    .filter(Boolean);

  $("#coupons ul").html(list.join(""));

  fs.writeFileSync(htmlFilePath, $.html());
}

if (["best", "custom", "open", "targeted"].includes(couponType)) {
  console.info("adding coupon : %o", couponType);
  const newCouponExpire = getCouponExpire(couponType, couponCode);
  storeJsonCoupon(couponType, couponCode, newCouponExpire, existingCode);
} else {
  console.warn("Invalid coupon type: %o", couponType);
}

setHtmlCoupons(getCoupons().coupons);
console.log("Coupons page refreshed successfully!");
