import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

window.screenCapture = (function() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  return {
    launch: () => ReactDOM.render(<App />, div),
    close: () => ReactDOM.unmountComponentAtNode(div)
  };
})();
