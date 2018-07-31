import React, { Component, Fragment } from "react";
import styled from "styled-components";
import DrawTool from "./Draw";
import Overlay from "./Overlay";
import SelectTool from "./Select";
import Close from "./Close";
import Canvas from "./Canvas";
import "./App.css";

const isInside = (rect, mouse) => {
  const { top, right, bottom, left } = rect;
  const { x, y } = mouse;
  return x > left && x < right + 12 && y > top - 12 && y < bottom;
};

const domRectToStyle = rect => {
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  };
};

const BugFrontLauncher = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  height: 50px;
  width: 260px;
  margin: 0 auto;
  background-color: red;
  box-sizing: border-box;
  padding: 5px;

  > div {
    display: inline-block;
  }
`;

const Select = styled.div`
  height: 40px;
  width: 40px;
  background-color: yellow;
  cursor: pointer;
  margin-left: 20px;
`;

const Draw = styled.div`
  height: 40px;
  width: 40px;
  background-color: green;
  cursor: pointer;
  margin-left: 20px;
`;

const Done = styled.div`
  height: 40px;
  width: 40px;
  background-color: blue;
  cursor: pointer;
  margin-left: 20px;
`;

const HighlightBorder = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  border: 2px solid yellow;
  z-index: -1;
`;

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
    // document.addEventListener("click", this.handleClick, false);
    document.addEventListener("mousemove", this.mouseMove, false);
  };

  deactivateInspector = () => {};

  handleClick = e => {
    const x = e.clientX;
    const y = e.clientY;
    if (this.selection) {
      document.removeEventListener("mousemove", this.mouseMove, false);
      this.setState({ endMousePosition: { x, y }, selectionMode: false });
      this.selection = false;
    } else {
      this.setState({
        startMousePosition: { x, y },
        endMousePosition: { x, y },
        selectionMode: true
      });
      document.addEventListener("mousemove", this.mouseMove, false);
      this.selection = true;
    }
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
    const {
      isFeedBackBoxOpen,
      selectionMode,
      startMousePosition,
      endMousePosition,
      hoverElementStyle,
      selections,
      activeBoxes
    } = this.state;
    console.log(selections);
    // const style = selectionMode
    //   ? {
    //       x1: startMousePosition.x,
    //       y1: startMousePosition.y,
    //       x2: endMousePosition.x,
    //       y2: endMousePosition.y
    //     }
    //   : {};

    // // const overlay = selectionMode && <DrawTool style={style} />;

    // const select = hoverElementStyle && (
    //   <SelectTool style={hoverElementStyle} />
    // );

    return (
      <Fragment>
        {/* <Overlay selections={selections} /> */}
        {activeBoxes.map((x, i) => (
          <Close
            key={i}
            top={x.top - 12}
            left={x.left + x.width - 12}
            onClick={() => this.handleDelete(x.key)}
          />
        ))}
        <Canvas selections={selections} hoveredNode={hoverElementStyle} />
        {/* {overlay} */}
        {/* {select} */}
        {
          <BugFrontLauncher>
            <Select onClick={() => this.handleSelect("select")} />
            <Draw onClick={() => this.handleSelect("draw")} />
            <Done onClick={() => this.handleSelect("done")} />
          </BugFrontLauncher>
        }
      </Fragment>
    );
  }
}

export default App;
