import React from "react";

const styles = {
  done: {
    height: "40px",
    display: "inline-block",
    verticalAlign: "top",
    color: "rgb(66, 133, 244)",
    marginLeft: "12px",
    fontSize: "14px",
    cursor: "pointer",
    boxSizing: "border-box",
    padding: "11px 8px 0 8px"
  },
  canvas: {
    position: "absolute",
    pointerEvents: "none",
    left: 0,
    top: 0,
    zIndex: 99999
  },
  launcher: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: "20px",
    height: "50px",
    width: "194px",
    margin: "0 auto",
    boxSizing: "border-box",
    padding: "5px 10px",
    borderRadius: "2px",
    backgroundColor: "#ffffff",
    boxShadow:
      "rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px, rgba(0, 0, 0, 0.2) 0px 11px 15px -7px",
    zIndex: 999999
  }
};

export const BugFrontLauncher = ({ children }) => (
  <div
    data-html2canvas-ignore
    data-highlight-ignore
    style={styles.launcher}
    children={children}
  />
);

export const Done = ({ height, width, onClick }) => (
  <div data-highlight-ignore style={styles.done} onClick={onClick}>
    DONE
  </div>
);

export const Canvas = ({ height, width, canvasRef }) => (
  <canvas style={styles.canvas} height={height} width={width} ref={canvasRef} />
);
