function redirectToUdemy() {
  var coupon = document.querySelector("#coupons ul a").innerText;
  var url = "https://www.udemy.com/course/become-a-web-developer-from-scratch-step-by-step-guide/?couponCode=" + coupon;
  if (window.location.hostname === "localhost") {
    console.warn("redirect %o", url);
  } else {
    window.location.href = url;
  }
}

function checkExpired() {
  // TODO if expired use referal code: DCED6F67EFF597AA11CE

  // var now = new Date("2024-01-08T20:16:02.052Z").getTime();
  var now = new Date("2024-01-07T20:16:02.052Z").getTime();
  var first = 1;
  document.querySelectorAll("#coupons li").forEach(function (li) {
    var date = new Date(li.dataset.expire);
    console.info("date", date);
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

(function () {
  checkExpired();

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
