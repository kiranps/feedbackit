import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

window.screenCapture = (function() {
  const div = document.createElement("div");
  div.setAttribute("data-html2canvas-ignore", "true");
  document.body.appendChild(div);
  return {
    launch: ({ offline }) => ReactDOM.render(<App offline={offline} />, div),
    close: () => ReactDOM.unmountComponentAtNode(div)
  };
})();

window.screenCapture.launch({ offline: true });
