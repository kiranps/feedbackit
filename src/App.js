import React, { Component, Fragment } from "react";
import Close from "./Close";
import Canvas from "./Canvas";
import { BugFrontLauncher, Done } from "./Comp";
import { domRectToStyle, isInside } from "./helper";
import { Drag, Select, Hide } from "./Icons";
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

  handleLauncherClick = () => {
    this.activateInspector();
  };

  toggleFeedBackBox = () => {
    this.setState({ isFeedBackBoxOpen: !this.state.isFeedBackBoxOpen });
  };

  activateInspector = () => {
    document
      .getElementById("clone")
      .contentDocument.addEventListener("mousemove", this.mouseMove, false);
  };

  handleSelect = mode => {
    switch (mode) {
      case "select":
        document
          .getElementById("clone")
          .contentDocument.addEventListener("mousemove", this.mouseMove, false);
        document
          .getElementById("clone")
          .contentDocument.addEventListener(
            "click",
            this.handleSelectionMode,
            false
          );
        break;
      case "done":
        document
          .getElementById("clone")
          .contentDocument.removeEventListener(
            "mousemove",
            this.mouseMove,
            false
          );
        document
          .getElementById("clone")
          .contentDocument.removeEventListener(
            "click",
            this.handleSelectionMode,
            false
          );
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
    console.log(e);
    const x = e.clientX;
    const y = e.clientY;
    // console.log(x, y);
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
      ? domRectToStyle(hoverElementLayout)
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
      <Fragment>
        {activeBoxes.map((x, i) => (
          <Close
            key={i}
            top={x.y - 12}
            left={x.x + x.width - 12}
            onClick={() => this.handleDelete(x.key)}
          />
        ))}
        <Canvas selections={selections} hoveredNode={hoverElementStyle} />
        {
          <BugFrontLauncher>
            <Drag />
            <Select onClick={() => this.handleSelect("select")} />
            <Hide onClick={() => this.handleSelect("draw")} />
            <Done onClick={() => this.handleSelect("done")} />
          </BugFrontLauncher>
        }
      </Fragment>
    );
  }
}

export default App;
