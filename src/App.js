import React, { Component } from "react";
import ScreenShotFrame from "./ScreenShotFrame";
import {
  cloneDocument,
  unloadScrollBars,
  puppeterScreenshot,
  takeScreenShotOfIframe
} from "./helper";
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
    this.editedScreenshot = null;
    this.selections = [];
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

    if (this.props.offline) {
      takeScreenShotOfIframe(document.body).then(data => {
        this.screenshot = data;
        this.setState({ screenshotFlag: true });
      });
    } else {
      puppeterScreenshot(data).then(data => {
        this.screenshot = data;
        this.setState({ screenshotFlag: true });
      });
    }

    unloadScrollBars();
  };

  handleEdit = () => {
    this.setState({ isScreenShotToolOpened: true });
  };

  updateScreenShot = data => {
    this.editedScreenShot = data.screenshot;
    this.selections = data.selections;
    this.setState({ isScreenShotToolOpened: false });
  };

  render() {
    const { isScreenShotToolOpened } = this.state;
    const screenshot = this.editedScreenShot
      ? this.editedScreenShot
      : this.screenshot
        ? this.screenshot.src
        : this.screenshot;

    return isScreenShotToolOpened ? (
      <ScreenShotFrame
        screenshot={this.screenshot}
        selections={this.selections}
        offline={this.props.offline}
        doc={this.doc}
        onSave={this.updateScreenShot}
      />
    ) : (
      <FeedBack
        screenshot={screenshot}
        editScreenShot={this.handleEdit}
        onClose={this.props.onClose}
      />
    );
  }
}

export default App;

App.defaultProps = {
  offline: false
};
