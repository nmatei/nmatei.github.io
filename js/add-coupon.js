const fs = require("fs");
const path = require("path");
const { renderPage } = require("./web-page");

const COUPONS_PATH = "course/coupons.json";
const COURSE_PATH = "course/course.json";
// first language is the default one (x-default)
const PAGES = [
  { lang: "en", file: "web.html" },
  { lang: "ro", file: "ro/web.html" }
];

// Get the HTML file path from the command line arguments
const args = process.argv.slice(2);
if (args.length < 3) {
  console.warn("\n");
  // Udemy coupon types (price / redemptions / validity)
  console.error("\t           Best price (€9.99, unlimited, 5 days): %o", "yarn coupon best     CODE [EXISTING_CODE]");
  console.error("\tCustom price (€12.99-€19.99, unlimited, 31 days): %o", "yarn coupon custom   CODE [EXISTING_CODE]");
  console.error("\t              Free Open (10 redemptions, 5 days): %o", "yarn coupon open     CODE [EXISTING_CODE]");
  console.error("\t        Free Targeted (100 redemptions, 31 days): %o", "yarn coupon targeted CODE [EXISTING_CODE]");
  console.error("\t                         Refresh pages (EN + RO): %o", "npm run build");
  console.warn("\n");
  console.warn("Note: When [EXISTING_CODE] is provided, it finds that coupon and extends it");
  console.warn("      with the new CODE as an encoded extended value for future use.");
  console.warn("\n");
  process.exit(1);
}

// args[0] (web.html) is kept for compatibility, all PAGES are generated
const couponType = args[1].toLowerCase();
const couponCode = args[2];
const existingCode = args[3]; // When provided, find this existing code and add couponCode as extended

function getCouponExpire(couponType) {
  const expire = new Date();
  // Add 5 or 31 days to the current date
  let addDays = couponType === "best" || couponType === "open" ? 5 : 31;
  expire.setDate(expire.getDate() + addDays);
  // Subtract 5 minutes from the current date
  expire.setMinutes(expire.getMinutes() - 5);
  return expire;
}

function getCoupons() {
  const content = fs.readFileSync(COUPONS_PATH);
  return JSON.parse(content);
}

// Find a stored coupon by code, same rule as the page uses (see course/web.js)
// Searches from the most recent one, exact match first, then half hidden (open / targeted) codes
function findCouponIndex(coupons, existingCode) {
  for (let i = coupons.length - 1; i >= 0; i--) {
    if (coupons[i].code === existingCode) {
      return i;
    }
  }
  for (let i = coupons.length - 1; i >= 0; i--) {
    const stored = coupons[i].code;
    if (!stored.includes("*")) {
      continue;
    }
    const prefix = stored.replace(/\*/g, "");
    if (stored.length === existingCode.length && existingCode.startsWith(prefix)) {
      return i;
    }
  }
  return -1;
}

function storeJsonCoupon(type, code, expire, existingCode) {
  const store = getCoupons();

  // If existingCode is provided, find existing coupon and update it (any coupon type)
  if (existingCode) {
    const existingCouponIndex = findCouponIndex(store.coupons, existingCode);

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
  if (["open", "targeted"].includes(type)) {
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

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function setHtmlCoupons(coupons) {
  const limit = new Date().getTime() - 90 * 24 * 60 * 60 * 1000; // 90 days back
  coupons = coupons
    .filter(c => new Date(c.expire).getTime() > limit)
    .sort((a, b) => new Date(b.expire).getTime() - new Date(a.expire).getTime());

  const course = readJson(COURSE_PATH);
  const translations = PAGES.map(page => readJson(`course/i18n/${page.lang}.json`));
  const locales = translations.map(t => ({ lang: t.lang, locale: t.locale, path: t.path }));

  PAGES.forEach((page, i) => {
    const html = renderPage({ t: translations[i], course, coupons, locales });
    fs.mkdirSync(path.dirname(page.file), { recursive: true });
    fs.writeFileSync(page.file, html);
    console.log("generated: %o", page.file);
  });
}

if (["best", "custom", "open", "targeted"].includes(couponType)) {
  console.info("adding coupon : %o", couponType);
  const newCouponExpire = getCouponExpire(couponType, couponCode);
  storeJsonCoupon(couponType, couponCode, newCouponExpire, existingCode);
  console.log("\nShare link (EN): %o", `https://nmatei.github.io/web?c=${couponCode}`);
  console.log("Share link (RO): %o", `https://nmatei.github.io/ro/web?c=${couponCode}`);
} else if (couponType !== "clean") {
  console.warn("Invalid coupon type: %o", couponType);
}

setHtmlCoupons(getCoupons().coupons);
console.log("Coupons page refreshed successfully!");
