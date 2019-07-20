import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { FeedbackLauncher } from "./Styled";

const feedback = (function() {
  let launcher;
  let screenshotTool;
  let isOffline = true;
  let handleSave = () => {
    console.log("handle save method before calling launch");
    close;
  };

  function mountFeebackLauncher() {
    launcher = document.createElement("div");
    document.body.appendChild(launcher);
    ReactDOM.render(
      <FeedbackLauncher onClick={launch} data-html2canvas-ignore>
        Send Feedback
      </FeedbackLauncher>,
      launcher
    );
  }

  function launch() {
    screenshotTool = document.createElement("div");
    screenshotTool.id = "screenshotit";
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

  function init(props) {
    const feedbackProps = { launcher: false, offline: true, ...props };
    isOffline = feedbackProps.offline;

    if (feedbackProps.launcher) {
      mountFeebackLauncher();
    }
  }

  function save(cb) {
    handleSave = function() {
      cb.apply(this, arguments);
      close();
    };
  }

  return { init, launch, save };
})();

export default feedback;
