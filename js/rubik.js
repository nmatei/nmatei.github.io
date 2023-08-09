let memoryPiece;

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

function scrambleRubikFace(face, newSize, colors) {
  let oldSize = face.getAttribute("data-rubik-size");
  if (oldSize) {
    oldSize *= 1;
  }
  newSize = newSize || oldSize;
  const n = newSize * newSize;
  const pieces = new Array(n).fill(0);
  colors = colors || pieces.map(() => rubikColors[Math.floor(Math.random() * 6)]);
  console.info('colors', JSON.stringify(colors));
  const htmlPieces = face.querySelectorAll("div");
  if (htmlPieces.length === n) {
    htmlPieces.forEach((piece, i) => {
      piece.style.background = colors[i];
      piece.setAttribute("data-number", faceNumbers[colors[i]]);
    });
  } else {
    const html = pieces.map(
      (p, i) =>
        `<div draggable="true" data-number="${faceNumbers[colors[i]]}" style="background: ${colors[i]}" class="rubik-piece ${rubikFaceCls(
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

function initRubik(form, colors) {
  const face = form.querySelector(".rubik-face");
  const size = form.querySelector("[name=size]").value * 1;
  scrambleRubikFace(face, size);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const size = form.querySelector("[name=size]").value * 1;
    scrambleRubikFace(face, size, colors);
  });
  form.addEventListener('click', e => {
    const piece = e.target.closest('[data-number]');
    if (piece) {
      if (e.ctrlKey) {
        const { number } = piece.dataset;
        memoryPiece = {
          number,
          color: piece.style.background
        }
        console.info('copy', piece, memoryPiece, e);
      } else {
        if (memoryPiece) {
          console.info('paste', piece);
          piece.style.background = memoryPiece.color;
          piece.setAttribute("data-number", memoryPiece.number)
        }
      }
    }
  })
  // TODO
  form.addEventListener("dragstart", e => {
    e.dataTransfer.effectAllowed = "copy";
  });
  form.addEventListener("dragend", e => {
    console.warn('end', e);
  });
}
