import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Overlay from './Overlay';
import './App.css';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const domRectToStyle = (rect) => {
  return ({
    top: rect.top-2+"px",
    right: rect.right+"px",
    bottom: rect.bottom+"px",
    left: rect.left-2+"px",
    width: rect.width+4+"px",
    height: rect.height+4+"px",
    x: rect.x+"px",
    y: rect.y+"px"
  })
}

const BugFrontLancher = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  height: 60px;
  width: 60px;
  background-color: red;
  cursor: pointer;
`

const FeedBackBox = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  margin: 20px;
  height: 225px;
  width: 320px;
  background-color: red;
`

const HighlightBorder = styled.div.attrs({
  id: "highlighter"
})`
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  border: 2px solid blue;
  z-index: -1;
`

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isFeedBackBoxOpen: false,
      hoverElementStyle: null
    }
  }

  handleLauncherClick = () => {
    this.toggleFeedBackBox()
    this.activateInspector()
  }

  toggleFeedBackBox = () => {
    this.setState({isFeedBackBoxOpen: !this.state.isFeedBackBoxOpen})
  }

  activateInspector = () => {
    document.addEventListener("mousemove", this.mouseMove, false);
  }

  deactivateInspector = () => {
    document.removeEventListener("mousemove", this.mouseMove, false);
  }

  mouseMove = (e) => {
    const hoverElement = e.target
    console.log(hoverElement)
    const hoverElementLayout = hoverElement.getBoundingClientRect()
    if(hoverElement.id !== "highlighter") {
      this.setState({hoverElementStyle: domRectToStyle(hoverElementLayout)})
    }
  }

  closeFeedBackBox = () => {
    this.deactivateInspector()
  }
  
  render() {
    const {isFeedBackBoxOpen, hoverElementStyle} = this.state
    const overlay = hoverElementStyle && <Overlay><HighlightBorder style={hoverElementStyle}/></Overlay>
    // console.log(hoverElementStyle)
    return (
      <Fragment>
        {overlay}
        {
          isFeedBackBoxOpen ?
        <BugFrontLancher onClick={this.closeFeedBackBox}/>
        :
        <BugFrontLancher onClick={this.handleLauncherClick}/>
        }
        {
          isFeedBackBoxOpen &&
            <FeedBackBox>
           </FeedBackBox>
        }
      </Fragment>
    );
  }
}

export default App;