import React, { Component, Fragment } from "react";
import Close from "./Close";
import Canvas from "./Canvas";
import { BugFrontLauncher, Done } from "./Comp";
import { Drag, Select, Hide } from "./Icons";
import {
  domRectToStyle,
  isInside,
  takeScreenShotOfIframe,
  mergeScreenShotWithSelections
} from "./helper";

class ScreenShotToolEditor extends Component {
  constructor(props) {
    super(props);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const documentHeight = document.body.scrollHeight;
    const documentWidth = document.body.scrollWidth;
    this.height = windowHeight > documentHeight ? windowHeight : documentHeight;
    this.width = documentWidth;
    this.screenshot = "";

    this.state = {
      isFeedBackBoxOpen: false,
      selectionMode: false,
      startMousePosition: null,
      selections: [],
      activeBoxes: []
    };

    this.selection = false;
  }

  componentDidMount = () => {
    this.handleSelect(this.props.document);
    this.props.document.body.style.cursor = "crosshair";
  };

  handleSelect = () => {
    const node = this.props.document;
    node.addEventListener("mousemove", this.mouseMove, false);
    node.addEventListener("click", this.handleSelectionMode, false);
  };

  handleHide = () => {};

  handleDone = () => {
    const node = this.props.document;
    node.removeEventListener("mousemove", this.mouseMove, false);
    node.removeEventListener("click", this.handleSelectionMode, false);

    if (this.props.offline) {
      takeScreenShotOfIframe(node.body).then(data => this.props.onSave(data));
    } else {
      mergeScreenShotWithSelections(
        this.props.screenshot,
        this.state.selections
      ).then(data => {
        this.props.onSave(data);
      });
    }
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
          <Select onClick={this.handleSelect} />
          <Hide onClick={this.handleHide} />
          <Done onClick={this.handleDone} />
        </BugFrontLauncher>
      </Fragment>
    );
  }
}

export default ScreenShotToolEditor;

ScreenShotToolEditor.defaultProps = {
  offline: false
};
