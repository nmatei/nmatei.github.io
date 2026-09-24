/**
 * link examples:
 *    https://nmatei.github.io/web
 *    https://nmatei.github.io/web?c=2024-ABC
 *    https://nmatei.github.io/web?couponCode=2024-ABC
 */

var bestDiscountLi;

// texts are injected by js/web-page.js (window.I18N), english fallback
var I18N = window.I18N || {};
function t(key, values, fallback) {
  var text = I18N[key] || fallback;
  return text.replace(/\{(\w+)\}/g, function (m, name) {
    return values && name in values ? values[name] : m;
  });
}

if (typeof URLSearchParams === "undefined") {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/url-search-params-polyfill@8.2.5/index.min.js";
  script.async = false;
  document.head.appendChild(script);
}

function getCouponUrl(coupon) {
  return (
    "https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?referralCode=DCED6F67EFF597AA11CE&couponCode=" +
    coupon
  );
}

// remember auto redirect per coupon, so Back from Udemy does not redirect again
function getRedirectKey(coupon) {
  return "redirected:" + coupon;
}

function isRedirected(coupon) {
  try {
    return sessionStorage.getItem(getRedirectKey(coupon)) === "1";
  } catch (e) {
    return false;
  }
}

function setRedirected(coupon) {
  try {
    sessionStorage.setItem(getRedirectKey(coupon), "1");
  } catch (e) {}
}

function redirectToUdemy(coupon) {
  var best = bestDiscountLi
    ? bestDiscountLi.querySelector(".coupon-code")
    : document.querySelector("#coupons ul .coupon-code");
  coupon = coupon || best.innerText;
  var url = getCouponUrl(coupon);
  setRedirected(coupon);
  window.location.href = url;
}

function checkExpired() {
  // TODO if expired use referal code: DCED6F67EFF597AA11CE
  var now = new Date().getTime();
  var first = 1;
  document.querySelectorAll("#coupons li").forEach(function (li) {
    var date = new Date(li.dataset.expire);
    //console.info("date", date);
    if (date.getTime() < now) {
      li.classList.add("expired");
      li.title = t("expired", null, "Expired:") + " " + date.toLocaleDateString(document.documentElement.lang);
      if (first && (li.classList.contains("custom-price") || li.classList.contains("best-price"))) {
        first = 0;
        li.classList.add("first-expired");
      }
    }
  });
}

function addNotification(message, type) {
  var el = document.querySelector(".msg-container");
  el.innerHTML += `<p class="msg-${type || "warn"}">${message}</p>`;
}

function handleExtendedCoupon(couponData, currentCoupon) {
  // leave this function as is (private, not global), it handles the extended coupon logic
  function decodeCoupon(encoded) {
    try {
      // Reverse the character shift and decode
      var shifted = encoded
        .split("")
        .map(c => String.fromCharCode(c.charCodeAt(0) - 3))
        .join("");
      return atob(shifted);
    } catch (e) {
      console.warn("Failed to decode coupon:", e);
      return null;
    }
  }

  if (couponData.extended) {
    var decodedCoupon = decodeCoupon(couponData.extended);
    if (decodedCoupon && decodedCoupon !== currentCoupon) {
      // Update URL parameter and refresh
      var params = new URLSearchParams(window.location.search);
      params.set("c", decodedCoupon);
      var newUrl = window.location.pathname + "?" + params.toString();
      addNotification(
        t("extended", null, "🎉 Good news! I've extended the time for your expired coupon. Hurry up and grab it! ⏰"),
        "info"
      );
      setTimeout(function () {
        window.location.href = newUrl;
      }, 4000);
      return true;
    }
  }
  return false;
}

function getValidityInfo(li) {
  var expire = new Date(li.dataset.expire);
  if (isNaN(expire.getTime())) {
    return t("expireSoon", null, "⏳ Hurry up, it will expire soon.");
  }
  var hoursLeft = (expire.getTime() - new Date().getTime()) / (60 * 60 * 1000);
  var left;
  if (hoursLeft < 24) {
    left = t("lastDay", null, "it's the last day");
  } else {
    var days = Math.floor(hoursLeft / 24);
    left =
      days === 1
        ? t("dayLeft", { days: days }, "only {days} day left")
        : t("daysLeft", { days: days }, "only {days} days left");
  }
  var date = expire.toLocaleDateString(document.documentElement.lang);
  return t("validity", { date: date, left: left }, "⏳ Valid until {date} - {left}.");
}

function notifyExpiredCoupon(coupon) {
  // Check if this coupon has an extended property
  fetch("/course/coupons.json")
    .then(response => response.json())
    .then(data => {
      var matchingCoupon = data.coupons.find(function (c) {
        var codePattern = c.code.replace(/\*/g, "");
        return coupon.startsWith(codePattern) && c.code.length === coupon.length;
      });

      if (matchingCoupon && !handleExtendedCoupon(matchingCoupon, coupon)) {
        addNotification(t("expiredCoupon", { coupon: coupon }, "Coupon <strong>{coupon}</strong> expired."));
      }
    })
    .catch(function () {
      addNotification(t("expiredCoupon", { coupon: coupon }, "Coupon <strong>{coupon}</strong> expired."));
    });
}

function checkFreeCouponParam(coupon, freeElCoupons) {
  var freeCoupon = freeElCoupons.find(function (free) {
    var couponView = free.querySelector(".coupon-code").innerText;
    var half = couponView.replace(/\*/g, "");
    return coupon.startsWith(half) && couponView.length === coupon.length;
  });

  freeElCoupons.forEach(function (free) {
    if (freeCoupon !== free) {
      free.classList.add("hidden");
    }
  });

  if (!freeCoupon) {
    return null;
  }

  freeCoupon.classList.add("invited-price", "best-price", "matched");
  freeCoupon.querySelector("a").href = getCouponUrl(coupon);
  // invited (free) coupon is shown first in the list
  freeCoupon.parentNode.prepend(freeCoupon);
  var expired = freeCoupon.classList.contains("expired");

  if (expired) {
    notifyExpiredCoupon(coupon);
  } else {
    addNotification(
      t(
        "freeApplied",
        { coupon: coupon },
        "🎯 Coupon <strong>{coupon}</strong> successfully applied! ⚡ Limited spots available - secure yours now! 🚀"
      ),
      "info"
    );
  }
  return {
    coupon: coupon,
    expired: expired
  };
}

function checkListedCouponParam(coupon) {
  // check if coupon is valid and exists in page (public / non free coupons)
  var el = Array.from(document.querySelectorAll("#coupons li .coupon-code")).find(function (code) {
    return code.innerText.trim() === coupon;
  });
  if (!el) {
    addNotification(t("invalid", { coupon: coupon }, "Coupon <strong>{coupon}</strong> is not valid or expired."));
    return null;
  }

  var li = el.closest("li");
  li.classList.add("matched");
  var expired = li.classList.contains("expired");

  if (expired) {
    notifyExpiredCoupon(coupon);
  } else {
    addNotification(
      t(
        "active",
        { coupon: coupon, validity: getValidityInfo(li) },
        "🎁 Coupon <strong>{coupon}</strong> is active and ready to use!<br />{validity}<br />Enroll now and start learning today! 🚀"
      ),
      "info"
    );
  }
  return {
    coupon: coupon,
    expired: expired
  };
}

function checkCouponCodeParam() {
  var params = new URLSearchParams(window.location.search);
  var coupon = params.get("c") || params.get("couponCode");
  var freeElCoupons = Array.from(document.querySelectorAll("li.open-price, li.targeted-price"));

  if (!coupon) {
    freeElCoupons.forEach(function (free) {
      free.classList.add("expired", "hidden");
    });
    return null;
  }

  // a free / targeted (invitation) coupon has priority, it is not visible as full code in page
  if (freeElCoupons.length) {
    var freeInfo = checkFreeCouponParam(coupon, freeElCoupons);
    if (freeInfo) {
      return freeInfo;
    }
  }

  return checkListedCouponParam(coupon);
}

// language links keep url params (coupon), static href is kept for SEO
function keepParamsOnLanguageLinks() {
  if (!window.location.search) {
    return;
  }
  document.querySelectorAll(".lang-switch a").forEach(function (a) {
    a.href = a.getAttribute("href").split("?")[0] + window.location.search;
  });
}

(function () {
  var coupon;

  keepParamsOnLanguageLinks();
  var redirectSec = 15;

  checkExpired();

  var couponInfo = checkCouponCodeParam();
  if (couponInfo && !couponInfo.expired) {
    coupon = couponInfo.coupon;
    //redirectSec = 3;
  }

  bestDiscountLi =
    document.querySelector("#coupons li.matched:not(.expired)") ||
    document.querySelector("#coupons li.best-price:not(.expired)") ||
    document.querySelector("#coupons li:not(.expired)");
  if (bestDiscountLi) {
    bestDiscountLi.classList.add("best-discount");
  }
  var best = bestDiscountLi && bestDiscountLi.querySelector(".coupon-code");
  var cta = document.querySelector(".cta-container");
  if (cta && (coupon || best)) {
    cta.querySelector("a").href = getCouponUrl(coupon || best.innerText.trim());
    cta.classList.remove("hidden");
  }

  // auto redirect only for shared links with a valid coupon (?c=CODE)
  //   without it, search engines would see this page as a redirect to Udemy
  if (!coupon || isRedirected(coupon)) {
    return;
  }
  var redirectInfo = document.querySelector("#redirect-info");
  redirectInfo.classList.remove("hidden");

  // Back from Udemy restored from bfcache: page is not reloaded, just hide the countdown
  window.addEventListener("pageshow", function (e) {
    if (e.persisted && isRedirected(coupon)) {
      clearInterval(redirectTimer);
      redirectInfo.classList.add("hidden");
    }
  });

  var secondsEl = document.querySelector("#redirect-info .seconds");
  var stopEl = document.querySelector("#redirect-info .btn-stop");

  function startTimer() {
    return setInterval(function () {
      secondsEl.innerText = redirectSec--;
      if (redirectSec < 0) {
        clearInterval(redirectTimer);
        redirectToUdemy(coupon);
      }
    }, 1000);
  }

  function toggleTimer(stop) {
    stopEl.innerText = stop ? t("continue", null, "[ Continue ]") : t("stop", null, "[ Stop ]");
    stopEl.dataset.stop = stop ? 1 : 0;
    if (stop) {
      clearInterval(redirectTimer);
    } else {
      if (redirectSec < 1) {
        redirectSec = 1;
      }
      redirectTimer = startTimer();
    }
  }

  var redirectTimer = startTimer();

  stopEl.addEventListener("click", function (e) {
    e.preventDefault();
    var stop = e.target.dataset.stop === "0";
    toggleTimer(stop);
  });

  document.querySelector("#coupons ul").addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      toggleTimer(true);
    }
  });
})();
