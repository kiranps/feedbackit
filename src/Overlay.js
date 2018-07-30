import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const modalRoot = document.body

const Background = styled.div`
    left: 0;
    top: 0;
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    background-color: none;
    background-color: rgba(0, 0, 0, 0.25) ;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`

const Highlight = styled.div`
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    background-color: none;
    border: 2px solid yellow;
`

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    const windowHeight = window.innerHeight
    const windowWidth = window.innerHeight
    const documentHeight = document.body.offsetHeight
    const documentWidth = document.body.offsetWidth
    this.height = windowHeight > documentHeight ? windowHeight : documentHeight
    this.width = windowWidth > documentWidth ? windowWidth : documentWidth

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const overlay = <Background height={this.height} width={this.width}>
    {
      this.props.selections.map((x, i) => <Highlight key={i} style={x}/>)
    }
    </Background>

    return ReactDOM.createPortal(
      overlay,
      this.el,
    );
  }
}

Overlay.defaultProps = {
  color: "none"
}
