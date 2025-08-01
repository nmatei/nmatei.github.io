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
  return (
    "https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?referralCode=DCED6F67EFF597AA11CE&couponCode=" +
    coupon
  );
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
      addNotification(`🎉 Good news! I've extended the time for your expired coupon. Hurry up and grab it! ⏰`, "info");
      setTimeout(function () {
        window.location.href = newUrl;
      }, 4000);
      return true;
    }
  }
  return false;
}

function checkCouponCodeParam() {
  var params = new URLSearchParams(window.location.search);
  var coupon = params.get("c") || params.get("couponCode");
  var freeElCoupons = Array.from(document.querySelectorAll("li.open-price, li.targeted-price"));
  if (freeElCoupons.length) {
    if (coupon) {
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

      if (freeCoupon) {
        freeCoupon.classList.add("invited-price", "best-price");
        freeCoupon.querySelector("a").href = getCouponUrl(coupon);
        freeCoupon.classList.add("matched");
        var expired = freeCoupon.classList.contains("expired");

        if (expired) {
          // Check if this coupon has an extended property
          fetch("course/coupons.json")
            .then(response => response.json())
            .then(data => {
              var matchingCoupon = data.coupons.find(function (c) {
                var codePattern = c.code.replace(/\*/g, "");
                return coupon.startsWith(codePattern) && c.code.length === coupon.length;
              });

              if (matchingCoupon && !handleExtendedCoupon(matchingCoupon, coupon)) {
                addNotification(`Coupon <strong>${coupon}</strong> expired.`);
              }
            })
            .catch(function () {
              addNotification(`Coupon <strong>${coupon}</strong> expired.`);
            });
        } else {
          addNotification(
            `🎯 Coupon <strong>${coupon}</strong> successfully applied! ⚡ Limited spots available - secure yours now! 🚀`,
            "info"
          );
        }
        return {
          coupon: coupon,
          expired: expired
        };
      } else {
        addNotification(`Coupon <strong>${coupon}</strong> is not valid or expired.`);
      }
    } else {
      freeElCoupons.forEach(function (free) {
        free.classList.add("expired", "hidden");
      });
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
