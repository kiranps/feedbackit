import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { inherits } from "util";

window.screenCapture = (function() {
  function attachFeebackLauncher() {
    const feedback = document.createElement("div");
    feedback.innerHTML = "Send Feedback";
    feedback.setAttribute("data-html2canvas-ignore", "true");
    feedback.style = `
    position: fixed;
    height: 30px;
    bottom: 0;
    right: 5px;
    font-size: 13px;
    user-select: none;
    font-family: sans-serif;
    padding: 5px;
    cursor: pointer;
    background-color: #f3f3f2;
    border-radius: 2px 2px 0 0;
    border: 1px solid rgba(27,31,35,0.2);
    color: rgba(0,0,0,.54); 
  `;
    console.log(feedback);
    feedback.addEventListener("click", window.screenCapture.launch, false);
    document.body.appendChild(feedback);
  }

  function renderApp({ offline }) {
    const div = document.createElement("div");
    div.id = "screenshotlib";
    div.setAttribute("data-html2canvas-ignore", "true");
    document.body.appendChild(div);
    ReactDOM.render(<App offline={offline} />, div);
  }

  function init({ launcher }) {
    if (launcher) {
      attachFeebackLauncher();
    }
  }

  return {
    mount: props => init(props),
    launch: props => renderApp(props),
    close: () =>
      ReactDOM.unmountComponentAtNode(document.getElementById("screenshotlib"))
  };
})();
