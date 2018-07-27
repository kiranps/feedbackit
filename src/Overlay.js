import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Background = styled.div`
    background-color: none;
    overflow: hidden;
`

const modalRoot = document.body

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const overlay = <Background color={this.props.color}>{this.props.children}</Background>
      return ReactDOM.createPortal(
        overlay,
        this.el,
      );
  }
}

Overlay.defaultProps = {
  //color: "rgba(0, 23, 41, 0.8)"
  color: "none"
}
