import React, { Component, Fragment } from "react";
import Close from "./Close";
import Canvas from "./Canvas";
import { BugFrontLauncher, Select, Hide, Done } from "./Styled";
import { domRectToStyle, isInside } from "./helper";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: null,
      isFeedBackBoxOpen: false,
      selectionMode: false,
      startMousePosition: null,
      endMousePosition: null,
      selections: [],
      activeBoxes: []
    };
    this.selection = false;
  }

  handleLauncherClick = () => {
    this.activateInspector();
  };

  toggleFeedBackBox = () => {
    this.setState({ isFeedBackBoxOpen: !this.state.isFeedBackBoxOpen });
  };

  activateInspector = () => {
    document.addEventListener("mousemove", this.mouseMove, false);
  };

  handleSelect = mode => {
    switch (mode) {
      case "select":
        document.addEventListener("mousemove", this.mouseMove, false);
        document.addEventListener("click", this.handleSelectionMode, false);
        break;
      case "done":
        document.removeEventListener("mousemove", this.mouseMove, false);
        document.removeEventListener("click", this.handleSelectionMode, false);
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
    this.setState({ endMousePosition: { x, y } });
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
    console.log(selections);

    return (
      <Fragment>
        {activeBoxes.map((x, i) => (
          <Close
            key={i}
            top={x.top - 12}
            left={x.left + x.width - 12}
            onClick={() => this.handleDelete(x.key)}
          />
        ))}
        <Canvas selections={selections} hoveredNode={hoverElementStyle} />
        {
          <BugFrontLauncher>
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
