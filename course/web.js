var bestDiscountLi;

if (typeof URLSearchParams === "undefined") {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/url-search-params-polyfill@8.2.5/index.min.js";
  script.async = false;
  document.head.appendChild(script);
}

function redirectToUdemy(coupon) {
  var best = bestDiscountLi
    ? bestDiscountLi.querySelector(".coupon-code")
    : document.querySelector("#coupons ul .coupon-code");
  coupon = coupon || best.innerText;
  var url = "https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=" + coupon;
  if (window.location.hostname === "localhost") {
    console.warn("redirect %o", url);
  } else {
    window.location.href = url;
  }
}

function getHTMLCoupon(type, code, expire, cls) {
  var url = `https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=${code}`;
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

function checkExpired() {
  // TODO if expired use referal code: DCED6F67EFF597AA11CE

  // var now = new Date("2024-01-08T20:16:02.052Z").getTime();
  var now = new Date().getTime();
  var first = 1;
  document.querySelectorAll("#coupons li").forEach(function (li) {
    var date = new Date(li.dataset.expire);
    //console.info("date", date);
    if (date.getTime() < now) {
      li.classList.add("expired");
      li.title = "Expired: " + date.toDateString();
      if (first) {
        first = 0;
        li.classList.add("first-expired");
      }
    }
  });
}

/**
 * get date in iso format
 * 202407231029 => "2024-07-23T10:29:00.000Z"
 * @param expire
 * @returns {string}
 */
function remapExpire(expire) {
  var expireObj = Array.from(expire);
  expireObj.push(":00.000Z");
  expireObj.splice(10, 0, ":");
  expireObj.splice(8, 0, "T");
  expireObj.splice(6, 0, "-");
  expireObj.splice(4, 0, "-");
  return expireObj.join("");
}

(function () {
  var redirectSec = 5;

  let params = new URLSearchParams(window.location.search);
  var coupon = params.get("c") || params.get("couponCode");
  if (coupon) {
    redirectSec = 1;
    var expire = new Date(remapExpire(params.get("e")));
    var html = getHTMLCoupon(params.get("t") || "targeted", coupon, expire, "best-price invited-price");
    var list = document.querySelector("#coupons ul");
    list.innerHTML = html + list.innerHTML;
  }

  checkExpired();

  bestDiscountLi = document.querySelector("li.best-price:not(.expired)") || document.querySelector("li:not(.expired)");
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
