import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const modalRoot = document.body

const Background = styled.div.attrs({
  id: "highlighter"
})`
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    background-color: none;
    border: 2px solid yellow;
`

export default class Select extends React.Component {
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
    const overlay = <Background style={this.props.style}>
      {this.props.children}
    </Background>

      return ReactDOM.createPortal(
        overlay,
        this.el,
      );
  }
}

Select.defaultProps = {
  color: "none"
}
