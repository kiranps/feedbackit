import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const computeLeft = (x1, x2) => x1 < x2 ? x1 : x2

const computeTop = (y1, y2) => y1 < y2 ? y1 : y2

const computeWidth = (x, y) => Math.abs(x-y)

const computeHeight = (x, y) => Math.abs(x-y) + 2

const Background = styled.div`
    background-color: none;
`

const TopOverlay = styled.div`
  position: fixed;
  top: 0;
  height: ${props => props.height}px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  border-bottom: 2px solid brown;
`

const BottomOverlay = styled.div`
  position: fixed;
  bottom: 0;
  top: ${props => props.top}px;
  width: ${props => props.width}px;
  left: ${props => props.left}px;
  border-top: 2px solid brown;
`

const LeftOverlay = styled.div`
  position: fixed;
  left: 0;
  top: ${props => props.top}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-right: 2px solid brown;
`

const RightOverlay = styled.div`
  position: fixed;
  right: 0;
  top: ${props => props.top}px;
  height: ${props => props.height}px;
  left: ${props => props.left}px;
  border-left: 2px solid brown;
`

const TopLeftOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

const TopRightOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: ${props => props.height}px;
  left: ${props => props.width}px;
`

const BottomLeftOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  top: ${props => props.top}px;
  width: ${props => props.width}px;
`

const BottomRightOverlay = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
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
    const {x1, x2, y1, y2} = this.props.style;

    const left = computeLeft(x1, x2)
    const top = computeTop(y1, y2)
    const width = computeWidth(x1, x2)
    const height = computeHeight(y1, y2)

    const overlay = <Background>
      <TopOverlay left={left} width={width} height={y1} />
      <BottomOverlay left={left} width={width} top={y2} />
      <LeftOverlay top={top} height={height} width={x1}/>
      <RightOverlay top={top} left={x2} height={height}/>
      <TopLeftOverlay width={x1} height={y1}/>
      <TopRightOverlay width={x2} height={y1}/>
      <BottomLeftOverlay top={y2} width={x1}/>
      <BottomRightOverlay top={y2} left={x2}/>
      {this.props.children}
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
