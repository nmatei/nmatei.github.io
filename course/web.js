function redirectToUdemy() {
  var coupon = document.querySelector("#coupons ul a").innerText;
  var url = "https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=" + coupon;
  if (window.location.hostname === "localhost") {
    console.warn("redirect %o", url);
  } else {
    window.location.href = url;
  }
}

(function () {
  var redirectSec = 30;
  var secondsEl = document.querySelector("#redirect-info span");
  var redirectTimer = setInterval(function () {
    secondsEl.innerText = redirectSec--;
    if (redirectSec < 0) {
      clearInterval(redirectTimer);
      redirectToUdemy();
    }
  }, 1000);
})();
