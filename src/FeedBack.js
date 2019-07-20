import React, { Component } from "react";
import {
  FeedBackBox,
  Header,
  TextArea,
  AttachScreenShot,
  ScreenShotPreview,
  LegalMessage,
  Footer,
  Save,
  Cancel
} from "./Styled";

import { reloadScrollBars } from "./helper";

export default class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = { include_screenshot: true, feedback: null };
  }

  componentDidMount = () => {
    document.body.style.cursor = "default";
  };

  handleAttachScreenShot = () => {
    this.setState({ include_screenshot: !this.state.include_screenshot });
  };

  handleCancel = () => {
    this.props.onClose();
    reloadScrollBars();
  };

  handleTextResponse = e => {
    this.setState({ feedback: e.target.value });
  };

  handleSubmit = () => {
    this.props.onSave({
      message: this.state.feedback,
      screenshot: this.props.screenshot
    });
  };

  render() {
    const { include_screenshot } = this.state;
    const { screenshot, editScreenShot, visible } = this.props;

    return (
      <FeedBackBox visible={visible}>
        <Header>Send Feedback</Header>
        <TextArea
          placeholder="Describe you issues or share ideas"
          onChange={this.handleTextResponse}
        />
        <AttachScreenShot
          value={include_screenshot}
          onChange={this.handleAttachScreenShot}
        />
        {include_screenshot && (
          <ScreenShotPreview image={screenshot} onClick={editScreenShot} />
        )}
        <LegalMessage>
          Go to the Legal Help page to request content changes for legal
          reasons. Some account and system information may be sent to Google. We
          will use the information you give us to help address technical issues
          and to improve our services, subject to our Privacy Policy and Terms
          of Service.
        </LegalMessage>
        <Footer>
          <Save onClick={this.handleSubmit} />
          <Cancel onClick={this.handleCancel} />
        </Footer>
      </FeedBackBox>
    );
  }
}
