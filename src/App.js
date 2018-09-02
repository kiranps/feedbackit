import React, { Component, Fragment } from "react";
import ScreenShotTool from "./ScreenShotTool";
import { cloneDocument, unloadScrollBars, puppeterScreenshot } from "./helper";
import FeedBack from "./FeedBack";
import absolutify from "absolutify";

class App extends Component {
  constructor(props) {
    super(props);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const documentHeight = document.body.scrollHeight;
    const documentWidth = document.body.scrollWidth;
    this.height = windowHeight > documentHeight ? windowHeight : documentHeight;
    this.width = documentWidth;
    this.screenshot = null;
    this.state = { isScreenShotToolOpened: false, screenshotFlag: false };
    this.doc = cloneDocument();
  }

  componentDidMount = () => {
    const origin = window.location.origin;
    const page = absolutify(this.doc, origin);
    const data = {
      html: page,
      height: this.height,
      width: this.width
    };

    puppeterScreenshot(data).then(data => {
      this.screenshot = data;
      this.setState({ screenshotFlag: true });
    });

    unloadScrollBars();
  };

  handleEdit = () => {
    this.setState({ isScreenShotToolOpened: true });
  };

  updateScreenShot = () => {
    this.setState({ isScreenShotToolOpened: false });
  };

  render() {
    const { isScreenShotToolOpened } = this.state;

    return isScreenShotToolOpened ? (
      <ScreenShotTool doc={this.doc} onSave={this.updateScreenShot} />
    ) : (
      <FeedBack screenshot={this.screenshot} editScreenShot={this.handleEdit} />
    );
  }
}

export default App;

App.defaultProps = {
  offline: false
};
