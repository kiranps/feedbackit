import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const modalRoot = document.body;

const Background = styled.div`
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
  background-color: none;
  border: 2px solid yellow;
  top: ${props => props.top}px;
  right: ${props => props.right}px;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  x: ${props => props.x}px;
  y: ${props => props.y}px;
`;

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const overlay = (
      <Background {...this.props.style}>{this.props.children}</Background>
    );

    return ReactDOM.createPortal(overlay, this.el);
  }
}

Select.defaultProps = {
  color: "none"
};
