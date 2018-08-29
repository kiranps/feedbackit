import React, { Component, Fragment } from "react";
import Close from "./Close";
import Canvas from "./Canvas";
import { BugFrontLauncher, Done } from "./Comp";
import { domRectToStyle, isInside } from "./helper";
import { Drag, Select, Hide } from "./Icons";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { cloneDocument, unloadScrollBars, screenCapture } from "./helper";
import html2canvas from "html2canvas";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const documentHeight = document.body.scrollHeight;
    const documentWidth = document.body.scrollWidth;
    this.height = windowHeight > documentHeight ? windowHeight : documentHeight;
    this.width = documentWidth;

    console.log(this.height);
    console.log(this.width);

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
    unloadScrollBars();
  };

  handleSelect = (mode, ele) => {
    switch (mode) {
      case "select":
        ele.addEventListener("mousemove", this.mouseMove, false);
        ele.addEventListener("click", this.handleSelectionMode, false);
        break;
      case "done":
        ele.removeEventListener("mousemove", this.mouseMove, false);
        ele.removeEventListener("click", this.handleSelectionMode, false);
        screenCapture(ele.body);
        break;
      case "hide":
        break;
      default:
        break;
    }
    this.setState({ mode });
  };

  handleSelectionMode = () => {
    const { hoverElementStyle } = this.state;
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
    const { highlightIgnore } = hoverElement.dataset;
    const hoverElementLayout = hoverElement.getBoundingClientRect();
    const hoverElementStyle =
      highlightIgnore !== "true" &&
      !["HTML", "BODY", "path"].includes(hoverElement.tagName)
        ? domRectToStyle(hoverElementLayout, e.view)
        : null;
    this.setState({ hoverElementStyle, activeBoxes });
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
          ({ document }) => (
            <Fragment>
              <Canvas
                selections={selections}
                hoveredNode={hoverElementStyle}
                height={this.height}
                width={this.width}
              />
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
                <Hide onClick={() => this.handleSelect("hide")} />
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
