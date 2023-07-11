const rubikColors = ["#f1efe2", "#07f104", "#FFFF00", "#ffa500", "#ff2c0a", "#0082df"];

const faceNumbers = (function () {
  const numbers = [".", ":", ":.", "::", "::.", ":::"];
  return rubikColors.reduce(function (values, color, i) {
    values[color] = numbers[i];
    return values;
  }, {});
})();

function rubikFaceCls(size, i) {
  if (size % 2 === 1 && (size * size - 1) / 2 === i) {
    return "center";
  }
  if (i === 0 || i === size - 1 || i === size * size - size || i === size * size - 1) {
    return "corner";
  }
  if (i < size - 1) {
    return "top-edge";
  }
  if (i % size === 0) {
    return "left-edge";
  }
  if (i % size === size - 1) {
    return "right-edge";
  }
  if (i > size * size - size) {
    return "bottom-edge";
  }
  return "middle";
}

function scrambleRubikFace(face, newSize) {
  let oldSize = face.getAttribute("data-rubik-size");
  if (oldSize) {
    oldSize *= 1;
  }
  newSize = newSize || oldSize;
  const n = newSize * newSize;
  const pieces = new Array(n).fill(0);
  const colors = pieces.map(() => rubikColors[Math.floor(Math.random() * 6)]);
  htmlPices = face.querySelectorAll("div");
  if (htmlPices.length === n) {
    htmlPices.forEach((piece, i) => {
      piece.style.background = colors[i];
      piece.setAttribute("data-number", faceNumbers[colors[i]]);
    });
  } else {
    const html = pieces.map(
      (p, i) =>
        `<div data-number="${faceNumbers[colors[i]]}" style="background: ${colors[i]}" class="${rubikFaceCls(
          newSize,
          i
        )}"></div>`
    );
    face.style.gridTemplateColumns = new Array(newSize).fill("auto").join(" ");
    // TODO progresive growing
    face.style.maxWidth = `${Math.max(200, newSize * 60)}px`;
    if (oldSize) {
      face.classList.remove(`rubik-size-${oldSize}`);
    }
    face.classList.add(`rubik-size-${newSize}`);
    face.setAttribute("data-rubik-size", newSize);
    face.innerHTML = html.join("");
  }
}

function initRubik(form) {
  const face = form.querySelector(".rubik-face");
  const size = form.querySelector("[name=size]").value * 1;
  scrambleRubikFace(face, size);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const size = form.querySelector("[name=size]").value * 1;
    scrambleRubikFace(face, size);
  });
}
