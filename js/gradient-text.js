function createGradientTextSlider(options) {
  var min = 200;
  var width = Math.max(document.body.clientWidth, 1500) - min;
  var minMarginLeft = -3500;

  function createLine(text) {
    var slides = text.split(/\s*\.\s*/i);
    var step = 10 / slides.length;
    return slides
      .map(function (e, i) {
        return `<span style="opacity: ${(10 - i * step) / 10}">${e}. </span>`;
      })
      .join("");
  }

  function animate(carousel) {
    Array.from(carousel.querySelectorAll(".text-carousel-line")).forEach(function (e) {
      var left = parseInt(e.style.marginLeft.replace("px", ""));
      var dir = Math.random() < 0.5 ? -1 : 1;
      var add = min + Math.floor(Math.random() * width);
      var marginLeft = left - add * dir;
      if (marginLeft > 5) {
        marginLeft = 5;
      } else if (marginLeft < minMarginLeft) {
        marginLeft = minMarginLeft;
      }
      e.style.marginLeft = marginLeft + "px";
    });
  }

  var carousel = document.querySelector(options.renderTo);

  if (carousel) {
    var line = createLine(options.text || carousel.innerText);
    carousel.innerHTML = "";
    var carouselWrap = document.createElement("div");
    carouselWrap.className = "text-carousel-wrap";
    [line, line, line].forEach(function (line) {
      var text = document.createElement("div");
      text.className = "carousel-gradient text-carousel-line";
      text.innerHTML = line + line + line + line;
      text.style.marginLeft = -(carousel.clientWidth + 200) + "px";
      carouselWrap.appendChild(text);
    });
    carousel.appendChild(carouselWrap);
    // start animation
    setTimeout(function () {
      animate(carousel);
    }, 10);

    if (options.animateInterval) {
      setInterval(
        function () {
          animate(carousel);
        },
        Math.max(options.animateInterval, 3000)
      );
    }
  }
}

createGradientTextSlider({
  renderTo: "#text-carousel",
  animateInterval: 15000
  // text: `#AI PERFORMS BEST WHEN PAIRED WITH #STRONG #KNOWLEDGE.
  // #INVEST IN #LEARNING TO UNLOCK ITS FULL POTENTIAL.
  // #AI IS #NOT A #REPLACEMENT FOR #HUMANS.
  // IT IS A #TOOL TO #ENHANCE #HUMAN #CAPABILITIES`
});
