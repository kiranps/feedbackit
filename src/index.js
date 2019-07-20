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
  let handleSave = () => console.log("hi");

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
      <App offline={isOffline} onClose={close} onSave={handleSave} />,
      screenshotTool
    );
  }

  function close() {
    ReactDOM.unmountComponentAtNode(screenshotTool);
  }

  function init({ offline, launcher, onSave }) {
    const showLauncher = launcher === undefined ? true : launcher;
    handleSave =
      onSave === undefined
        ? close
        : function() {
            close();
            onSave.apply(this, arguments);
          };
    isOffline = offline === undefined ? true : offline;

    if (showLauncher) {
      mountFeebackLauncher();
    }
  }

  return init;
})();

feedback.init = init;

export default feedback;
