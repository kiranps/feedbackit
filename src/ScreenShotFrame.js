import React from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import ScreenShotEditor from "./ScreenShotEditor";

class ScreenShotFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      doc,
      screenshot,
      offline,
      selections,
      onSave,
      visible
    } = this.props;

    return (
      <Frame
        initialContent={doc}
        frameBorder="none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: visible ? "100%" : "0",
          height: visible ? "100%" : "0",
          zIndex: "99999999999999"
        }}
        mountTarget="#screenshotit"
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
