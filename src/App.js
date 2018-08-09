import React, { Component, Fragment } from "react";
import Close from "./Close";
import Canvas from "./Canvas";
import { BugFrontLauncher, Done } from "./Comp";
import { domRectToStyle, isInside } from "./helper";
import { Drag, Select, Hide } from "./Icons";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { cloneDocument } from "./helper";
// import Clone from "./Clone";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: null,
      isFeedBackBoxOpen: false,
      selectionMode: false,
      startMousePosition: null,
      selections: [],
      activeBoxes: []
    };
    this.selection = false;
  }

  componentDidMount = () => {
    document.body.style.cursor = "cross-hair";
  };

  handleSelect = (mode, ele) => {
    console.log(mode);
    switch (mode) {
      case "select":
        ele.addEventListener("mousemove", this.mouseMove, false);
        ele.addEventListener("click", this.handleSelectionMode, false);
        break;
      case "done":
        ele.removeEventListener("mousemove", this.mouseMove, false);
        ele.removeEventListener("click", this.handleSelectionMode, false);
        break;
      default:
        break;
    }
    this.setState({ mode });
  };

  handleSelectionMode = () => {
    const { hoverElementStyle } = this.state;
    console.log(hoverElementStyle);
    if (hoverElementStyle) {
      this.setState({
        selections: [
          ...this.state.selections,
          { key: this.state.selections.length, ...hoverElementStyle }
        ],
        hoverElementStyle: null
      });
    }
  };

  mouseMove = e => {
    const x = e.clientX;
    const y = e.clientY;
    const activeBoxes =
      this.state.selections.filter(box => isInside(box, { x, y })) || [];
    if (activeBoxes.length > 0) {
      document.body.style.cursor = "pointer";
    }
    const hoverElement = e.target;
    const hoverElementLayout = hoverElement.getBoundingClientRect();
    const hoverElementStyle = !["HTML", "BODY", "svg", "path"].includes(
      hoverElement.tagName
    )
      ? domRectToStyle(hoverElementLayout, e.view)
      : null;
    this.setState({ hoverElementStyle, activeBoxes });
  };

  closeFeedBackBox = () => {
    this.deactivateInspector();
  };

  handleDelete = key => {
    this.setState({
      selections: this.state.selections.filter(x => x.key !== key)
    });
  };

  render() {
    const { hoverElementStyle, selections, activeBoxes } = this.state;

    return (
      <Frame
        initialContent={cloneDocument()}
        frameBorder="none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        mountTarget="#root"
      >
        <FrameContextConsumer>
          {// Callback is invoked with iframe's window and document instances
          ({ document, window }) => (
            <Fragment>
              <Canvas selections={selections} hoveredNode={hoverElementStyle} />
              {activeBoxes.map((x, i) => (
                <Close
                  key={i}
                  top={x.y - 12}
                  left={x.x + x.width - 12}
                  onClick={() => this.handleDelete(x.key)}
                />
              ))}
              <BugFrontLauncher>
                <Drag />
                <Select onClick={() => this.handleSelect("select", document)} />
                <Hide onClick={() => this.handleSelect("draw")} />
                <Done onClick={() => this.handleSelect("done", document)} />
              </BugFrontLauncher>
            </Fragment>
          )}
        </FrameContextConsumer>
      </Frame>
    );
  }
}

export default App;
