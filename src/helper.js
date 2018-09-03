import html2canvas from "html2canvas";

export const isInside = (rect, mouse) => {
  const { top, right, bottom, left } = rect;
  const { x, y } = mouse;
  return x > left && x < right + 12 && y > top - 12 && y < bottom;
};

export const domRectToStyle = (rect, ele) => {
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x + ele.scrollX,
    y: rect.y + ele.scrollY
  };
};

const removeScripts = node => {
  const r = node.getElementsByTagName("script");
  for (var i = r.length - 1; i >= 0; i--) {
    r[i].parentNode.removeChild(r[i]);
  }
  return node;
};

const removeHref = node => {
  const r = node.getElementsByTagName("a");
  for (var i = r.length - 1; i >= 0; i--) {
    r[i].removeAttribute("href");
  }
  return node;
};

export const cloneDocument = () => {
  const newDocument = removeHref(removeScripts(document.cloneNode(true)))
    .documentElement.innerHTML;
  return newDocument;
};

const reloadScrollBars = () => {
  document.documentElement.style.overflow = "auto"; // firefox, chrome
  document.body.scroll = "yes"; // ie only
};

export const unloadScrollBars = () => {
  document.documentElement.style.overflow = "hidden"; // firefox, chrome
  document.body.scroll = "no"; // ie only
};

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function drawImageOnCanvas(image) {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  return canvas;
}

function drawSelectionsOnCanvas(width, height, selections) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(102, 102, 102, 0.5)";
  ctx.fillRect(0, 0, width, height);
  selections.forEach(x => {
    drawRect(x, ctx);
  });
  return canvas;
}

function combineCanvas(image, selections) {
  const ctx = image.getContext("2d");
  ctx.drawImage(selections, 0, 0);
  return ctx.canvas;
}

function drawRect(rect, ctx) {
  const { x, y, width, height } = rect;
  ctx.beginPath();
  ctx.lineWidth = "4";
  ctx.rect(x, y, width, height);
  ctx.strokeStyle = "yellow";
  ctx.stroke();
  ctx.clearRect(x, y, width, height);
  ctx.save();
}

export const mergeScreenShotWithSelections = (img, selections) => {
  const finalCanvas = combineCanvas(
    drawImageOnCanvas(img),
    drawSelectionsOnCanvas(img.width, img.height, selections)
  );
  return finalCanvas.toDataURL();
};

export function convertBlobtoImage(file) {
  return new Promise(function(resolved, rejected) {
    var img = new Image();
    img.onload = function() {
      resolved(img);
    };
    img.src = URL.createObjectURL(file);
  });
}

export function canvasToImage(canvas) {
  const imageType = "image/png";
  const imageData = canvas.toDataURL(imageType);
  return new Promise(function(resolved, rejected) {
    var img = new Image();
    img.onload = function() {
      resolved(img);
    };
    img.src = imageData;
  });
}

function downloadImage(canvas) {
  const imageType = "image/png";
  const imageData = canvas.toDataURL(imageType);
  document.location.href = imageData.replace(imageType, "image/octet-stream");
}

export const puppeterScreenshot = data =>
  fetch("http://localhost:3009/", {
    method: "POST",
    mode: "cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.blob();
    })
    .then(convertBlobtoImage);

export const takeScreenShotOfIframe = ele =>
  html2canvas(ele).then(canvasToImage);
