// Renders the course page (web.html / ro/web.html) from course/course.json + course/i18n/{lang}.json
const SITE = "https://nmatei.github.io";

const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";

function format(text, values) {
  return text.replace(/\{(\w+)\}/g, (m, key) => (key in values ? values[key] : m));
}

function getCouponUrl(course, code) {
  return `${course.url}?referralCode=${course.referralCode}&couponCode=${code}`;
}

// Udemy style: rating rounded to half star (4.7 => 4 full + 1 half)
function getStarsHtml(rating) {
  const halves = Math.round(rating * 2);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = halves >= i * 2 ? "full" : halves === i * 2 - 1 ? "half" : "empty";
    stars.push(
      `<svg class="star star-${fill}" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">` +
        `<path d="${STAR_PATH}" />${fill === "half" ? `<path class="half" d="${STAR_PATH}" />` : ""}</svg>`
    );
  }
  return stars.join("");
}

function getRatingHtml(t, course) {
  const badge = course.badge ? `<span class="badge">${t.badges[course.badge] || course.badge}</span>` : "";
  const rating = course.rating
    ? `<span class="rating" aria-label="${format(t.ratingLabel, { rating: course.rating })}">
        <span class="rating-value">${course.rating}</span>
        <span class="stars">${getStarsHtml(course.rating)}</span>
      </span>`
    : "";
  const numberFormat = new Intl.NumberFormat(t.lang);
  const stats = [
    course.ratingsCount ? `(${numberFormat.format(course.ratingsCount)} ${t.ratings})` : "",
    course.students ? `${numberFormat.format(course.students)} ${t.students}` : "",
    course.hours ? `${course.hours} ${t.totalHours}` : "",
    course.updated ? `${t.lastUpdated} ${course.updated}` : ""
  ].filter(Boolean);

  return `
    <div class="course-rating">
      ${badge}
      ${rating}
      ${stats.map(s => `<span class="rating-stat">${s}</span>`).join("")}
    </div>`;
}

function getCouponHtml(t, course, coupon, now) {
  const expire = new Date(coupon.expire);
  const cls = expire.getTime() < now ? "expired" : "";
  const date = expire.toLocaleDateString(t.lang, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  return `
    <li data-expire="${expire.toISOString()}" class="${coupon.type}-price ${cls}">
      <a target="_blank" href="${getCouponUrl(course, coupon.code)}">
        <span class="coupon-code">${coupon.code}</span>
        <div class="coupon-info">
          <span>${t.js.validUntil}</span>
          <span class="coupon-expire-date">${date} ${coupon.type === "best" ? "✨" : ""}</span>
        </div>
      </a>
    </li>`;
}

function getJsonLd(t, course, locales) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: t.name,
    description: t.description,
    url: SITE + t.path,
    image: course.image,
    inLanguage: "en",
    availableLanguage: locales.map(l => l.lang),
    provider: { "@type": "Organization", name: "Udemy", sameAs: "https://www.udemy.com" },
    author: { "@type": "Person", name: "Nicolae Matei", url: SITE + "/" },
    offers: { "@type": "Offer", category: "Paid", url: course.url },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: "PT" + (course.hours || 1) + "H" }
  };
  // Google requires ratingCount for aggregateRating
  if (course.rating && course.ratingsCount) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      bestRating: 5,
      ratingCount: course.ratingsCount
    };
  }
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function renderPage({ t, course, coupons, locales }) {
  const now = Date.now();
  const url = SITE + t.path;
  const alternates = locales
    .map(l => `<link rel="alternate" hreflang="${l.lang}" href="${SITE + l.path}" />`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${SITE + locales[0].path}" />`)
    .join("\n    ");
  const ogAlternates = locales
    .filter(l => l.lang !== t.lang)
    .map(l => `<meta property="og:locale:alternate" content="${l.locale}" />`)
    .join("\n    ");
  const langSwitch = locales
    .map(l =>
      l.lang === t.lang
        ? `<strong class="lang-current" lang="${l.lang}">${l.lang.toUpperCase()}</strong>`
        : `<a href="${l.path}" hreflang="${l.lang}" lang="${l.lang}">${l.lang.toUpperCase()}</a>`
    )
    .join(" | ");

  return `<!doctype html>
<html lang="${t.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${t.title}</title>
    <meta name="description" content="${t.description}" />
    <link rel="canonical" href="${url}" />
    ${alternates}

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="nmatei.github.io" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${t.name}" />
    <meta property="og:description" content="${t.description}" />
    <meta property="og:image" content="${course.image}" />
    <meta property="og:locale" content="${t.locale}" />
    ${ogAlternates}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t.name}" />
    <meta name="twitter:description" content="${t.description}" />
    <meta name="twitter:image" content="${course.image}" />

    <link rel="preconnect" href="https://img-c.udemycdn.com" />
    <link rel="stylesheet" href="/course/web.css" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

    <script type="application/ld+json">
${getJsonLd(t, course, locales)}
    </script>
  </head>
  <body>
    <header>
      <div id="header-wrapper">
        <div class="top-container">
          <h1>${t.name}</h1>
          <p class="subtitle">
            ${t.subtitle}${t.courseLanguage ? ` <span class="course-language">(${t.courseLanguage})</span>` : ""}
          </p>
          ${getRatingHtml(t, course)}
          <p>${t.createdBy} <a href="${SITE}/">Nicolae Matei</a> [ nmatei.github.io ]</p>
        </div>
        <div class="sidebar-container">
          <nav class="lang-switch" aria-label="Language">${langSwitch}</nav>
          <img
            src="${course.image}"
            width="400"
            height="225"
            alt="${t.imageAlt}"
            fetchpriority="high"
          />
        </div>
      </div>
    </header>

    <main id="main">
      <section id="coupons">
        <h2>${t.couponsTitle}</h2>
        <div class="msg-container"></div>
        <p id="redirect-info" class="hidden">
          ${t.redirectInfo} <a class="btn btn-stop" href="#" data-stop="0">${t.js.stop}</a>
        </p>
        <ul>${coupons.map(c => getCouponHtml(t, course, c, now)).join("")}
        </ul>
        <p class="cta-container hidden">
          <a class="cta" target="_blank" href="${course.url}?referralCode=${course.referralCode}">${t.cta} →</a>
        </p>
      </section>

      <section id="what-you-will-learn">
        <h2>${t.learnTitle}</h2>
        <ul>
          ${t.learn.map(item => `<li>✔ ${item}</li>`).join("\n          ")}
        </ul>
      </section>

      <section class="sections">
        <h2>${t.requirementsTitle}</h2>
        <p>${t.requirements}</p>
      </section>

      <section class="sections">
        <h2>${t.descriptionTitle}</h2>
        ${t.descriptionHtml.map(p => `<p>${p}</p>`).join("\n        ")}
        <p>${t.keywordsTitle}</p>
        <ul>
          <li>${t.keywords}</li>
        </ul>
      </section>

      <section class="sections">
        <h2>${t.whoTitle}</h2>
        <ul>
          ${t.who.map(item => `<li>${item}</li>`).join("\n          ")}
        </ul>
      </section>

      <section id="instructor" class="sections">
        <h2>${t.instructorTitle}</h2>
        <div class="instructor">
          <img src="/images/matei-nicolae.jpg" width="100" height="100" alt="Nicolae Matei" loading="lazy" />
          <div>
            <p><a href="${SITE}/"><strong>Nicolae Matei</strong></a></p>
            <p>${t.instructorBio}</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <a class="item" href="${SITE}/">nmatei.github.io</a>
      <span class="item">|</span>
      <a class="item" href="https://www.linkedin.com/in/nicolaematei" target="_blank">
        <svg
          style="vertical-align: top"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="17"
          height="17"
          focusable="false"
          aria-hidden="true"
        >
          <path
            d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
          ></path>
        </svg>
        <span>LinkedIn</span>
      </a>
      <span class="item">|</span>
      <a class="item" target="_blank" href="${course.url}?referralCode=${course.referralCode}">${t.referralLink}</a>
      <span class="item">|</span>
      <span class="item lang-switch">${langSwitch}</span>
    </footer>
    <script>
      window.I18N = ${JSON.stringify(t.js)};
    </script>
    <script src="/course/web.js"></script>
  </body>
</html>
`;
}

module.exports = { renderPage, getCouponUrl };
