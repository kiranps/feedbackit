import React, { Component } from "react";
import { render } from "react-dom";

import feedbacklib from "../../src/";

class Demo extends Component {
  handleClick = () => {
    feedbacklib.init({ offline: true, launcher: true });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>feedback</button>
        <h1>react-loading-button Demo</h1>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
