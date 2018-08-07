import React, { Component } from "react";
import { Canvas } from "./Comp";

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const documentHeight = document.body.scrollHeight;
    const documentWidth = document.body.scrollWidth;
    this.height = windowHeight > documentHeight ? windowHeight : documentHeight;
    this.width = windowWidth > documentWidth ? windowWidth : documentWidth;
    this.state = {
      activeRect: null
    };
  }

  componentDidMount = () => {
    this.clearCanvas();
  };

  clearCanvas = () => {
    const canvas = this.canvasRef;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(102, 102, 102, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  componentDidUpdate = () => {
    this.clearCanvas();
    if (this.props.hoveredNode) {
      this.drawRect(this.props.hoveredNode);
    }

    this.props.selections.forEach(x => {
      this.drawRect(x);
    });
  };

  drawRect = rect => {
    const { x, y, width, height } = rect;
    const canvas = this.canvasRef;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.clearRect(x, y, width, height);
  };

  render() {
    return (
      <Canvas
        height={this.height}
        width={this.width}
        canvasRef={el => (this.canvasRef = el)}
      />
    );
  }
}
