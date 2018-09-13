import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FeedbackLauncher } from "./Styled";

class FeedbackLib {
  mountFeebackLauncher = () => {
    this.launcher = document.createElement("div");
    document.body.appendChild(this.launcher);
    ReactDOM.render(
      <FeedbackLauncher
        onClick={this.mountScreenShotTool}
        data-html2canvas-ignore
      />,
      this.launcher
    );
  };

  mountScreenShotTool = () => {
    this.screenshotTool = document.createElement("div");
    this.screenshotTool.id = "screenshotlib";
    this.screenshotTool.setAttribute("data-html2canvas-ignore", "true");
    document.body.appendChild(this.screenshotTool);
    ReactDOM.render(
      <App offline={this.offline} onClose={this.close} />,
      this.screenshotTool
    );
  };

  close = () => {
    ReactDOM.unmountComponentAtNode(this.screenshotTool);
  };

  init(props) {
    const { offline, launcher } = props || { offline: true, launcher: true };
    this.offline = offline || false;
    if (launcher) {
      this.mountFeebackLauncher();
    }
  }
}

window.screenCapture = new FeedbackLib();
