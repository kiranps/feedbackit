import React, { Component } from "react";

const styles = {
  canvas: {
    position: "absolute",
    pointerEvents: "none",
    left: 0,
    top: 0,
    zIndex: 99999
  }
};

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRect: null
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount = () => {
    this.clearCanvas();
  };

  clearCanvas = () => {
    const canvas = this.canvasRef.current;
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
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.clearRect(x, y, width, height);
    ctx.save();
  };

  render() {
    const { height, width } = this.props;
    return (
      <canvas
        style={styles.canvas}
        height={height}
        width={width}
        ref={this.canvasRef}
      />
    );
  }
}
