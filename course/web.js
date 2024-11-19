/**
 * link examples:
 *    https://nmatei.github.io/web
 *    https://nmatei.github.io/web?c=2024-ABC
 *    https://nmatei.github.io/web?couponCode=2024-ABC
 */

var bestDiscountLi;

if (typeof URLSearchParams === "undefined") {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/url-search-params-polyfill@8.2.5/index.min.js";
  script.async = false;
  document.head.appendChild(script);
}

function getCouponUrl(coupon) {
  return "https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=" + coupon;
}

function redirectToUdemy(coupon) {
  var best = bestDiscountLi
    ? bestDiscountLi.querySelector(".coupon-code")
    : document.querySelector("#coupons ul .coupon-code");
  coupon = coupon || best.innerText;
  var url = getCouponUrl(coupon);
  if (window.location.hostname === "localhost") {
    console.warn("redirect %o", url);
  } else {
    window.location.href = url;
  }
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
      li.title = "Expired: " + date.toDateString();
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

function checkCouponCodeParam() {
  var params = new URLSearchParams(window.location.search);
  var coupon = params.get("c") || params.get("couponCode");
  var free = document.querySelector("li.open-price") || document.querySelector("li.targeted-price");
  if (free) {
    if (coupon) {
      var couponView = free.querySelector(".coupon-code").innerText;
      var half = couponView.replace(/\*/g, "");
      if (coupon.startsWith(half) && couponView.length === coupon.length) {
        free.classList.add("invited-price", "best-price");
        free.querySelector("a").href = getCouponUrl(coupon);
        free.classList.add("matched");
        var expired = free.classList.contains("expired");
        if (expired) {
          addNotification(`Coupon <strong>${coupon}</strong> expired.`);
        } else {
          addNotification(
            `Coupon <strong>${coupon}</strong> applied, but has limited redemptions so hurry up!`,
            "info"
          );
        }
        return {
          coupon: coupon,
          expired: expired
        };
      } else {
        free.classList.add("expired");
        addNotification(`Coupon <strong>${coupon}</strong> is not valid or expired.`);
      }
    } else {
      free.classList.add("expired", "hidden");
    }
  } else if (coupon) {
    // check if coupon is valid and exists in page
    const el = Array.from(document.querySelectorAll("#coupons li .coupon-code")).find(function (li) {
      return li.innerText.trim() === coupon;
    });
    if (!el || el.closest("li").classList.contains("expired")) {
      addNotification(`Coupon <strong>${coupon}</strong> is not valid or expired.`);
    }
  }
}

(function () {
  var coupon;
  var redirectSec = 15;

  checkExpired();

  var couponInfo = checkCouponCodeParam();
  if (couponInfo && !couponInfo.expired) {
    coupon = couponInfo.coupon;
    //redirectSec = 3;
  }

  bestDiscountLi =
    document.querySelector("#coupons li.best-price:not(.expired)") ||
    document.querySelector("#coupons li:not(.expired)");
  if (bestDiscountLi) {
    bestDiscountLi.classList.add("best-discount");
  }
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
    stopEl.innerText = stop ? "[ Continue ]" : "[ Stop ]";
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
