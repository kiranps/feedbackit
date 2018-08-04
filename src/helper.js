export const isInside = (rect, mouse) => {
  const { top, right, bottom, left } = rect;
  const { x, y } = mouse;
  return x > left && x < right + 12 && y > top - 12 && y < bottom;
};

export const domRectToStyle = rect => {
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x + window.scrollX,
    y: rect.y + window.scrollY
  };
};
