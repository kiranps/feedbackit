import React, { Component } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import ScreenShotEditor from "./ScreenShotEditor";

class ScreenShotFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { doc, screenshot, offline, selections, onSave } = this.props;

    return (
      <Frame
        initialContent={doc}
        frameBorder="none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: "99999999999999"
        }}
        mountTarget="#screenshotlib"
      >
        <FrameContextConsumer>
          {({ document }) => (
            <ScreenShotEditor
              document={document}
              screenshot={screenshot}
              offline={offline}
              selections={selections}
              onSave={onSave}
            />
          )}
        </FrameContextConsumer>
      </Frame>
    );
  }
}

export default ScreenShotFrame;
