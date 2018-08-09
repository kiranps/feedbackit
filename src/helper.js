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
  // const iframe = document.createElement("iframe");
  // iframe.id = "clone";
  // iframe.src = "about:blank";
  // iframe.frameborder = "0";
  // iframe.style =
  //   "position:fixed;left:0;top:0;height:100%;width:100%;border:0px;vertical-align:bottom";
  // document.body.append(iframe);
  // const doc = document.getElementById("clone");

  // doc.contentWindow.document.open("text/htmlreplace");
  // doc.contentWindow.document.write(newDocument);
  // doc.contentWindow.document.close();
  // unloadScrollBars();
};

const reloadScrollBars = () => {
  document.documentElement.style.overflow = "auto"; // firefox, chrome
  document.body.scroll = "yes"; // ie only
};

const unloadScrollBars = () => {
  document.documentElement.style.overflow = "hidden"; // firefox, chrome
  document.body.scroll = "no"; // ie only
};
