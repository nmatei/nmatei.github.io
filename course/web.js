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
  var secondsEl = document.querySelector("#redirect-info .seconds");
  var stopEl = document.querySelector("#redirect-info .btn-stop");

  function startTimer() {
    return setInterval(function () {
      secondsEl.innerText = redirectSec--;
      if (redirectSec < 0) {
        clearInterval(redirectTimer);
        redirectToUdemy();
      }
    }, 1000);
  }

  var redirectTimer = startTimer();

  stopEl.addEventListener("click", function () {
    var stop = stopEl.dataset.stop === "0";
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
  });
})();
