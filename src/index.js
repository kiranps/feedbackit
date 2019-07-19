import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { FeedbackLauncher } from "./Styled";

const feedback = {};

export const init = (function() {
  let launcher;
  let screenshotTool;
  let isOffline = true;

  function mountFeebackLauncher() {
    launcher = document.createElement("div");
    document.body.appendChild(launcher);
    ReactDOM.render(
      <FeedbackLauncher onClick={mountScreenShotTool} data-html2canvas-ignore>
        Send Feedback
      </FeedbackLauncher>,
      launcher
    );
  }

  function mountScreenShotTool() {
    screenshotTool = document.createElement("div");
    screenshotTool.id = "screenshotlib";
    screenshotTool.setAttribute("data-html2canvas-ignore", "true");
    document.body.appendChild(screenshotTool);
    ReactDOM.render(
      <App offline={isOffline} onClose={close} />,
      screenshotTool
    );
  }

  function close() {
    ReactDOM.unmountComponentAtNode(screenshotTool);
  }

  function init(props) {
    const { offline, launcher } = props || { offline: true, launcher: true };
    isOffline = offline || false;
    if (launcher) {
      mountFeebackLauncher();
    }
  }

  return init;
})();

feedback.init = init;

export default feedback;
