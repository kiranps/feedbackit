import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Overlay from './Overlay';
import './App.css';

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
      selectionMode: false,
      startMousePosition: null,
      endMousePosition: null,
    }
    this.selection = false
  }

  handleLauncherClick = () => {
    this.toggleFeedBackBox()
    this.activateInspector()
  }

  toggleFeedBackBox = () => {
    this.setState({isFeedBackBoxOpen: !this.state.isFeedBackBoxOpen})
  }

  activateInspector = () => {
    document.addEventListener("click", this.handleClick, false);
    // document.addEventListener("mousemove", this.mouseMove, false);
  }

  deactivateInspector = () => {
    // document.removeEventListener("mousemove", this.mouseMove, false);
  }

  handleClick = (e) => {
    console.log(e)
    const x = e.clientX
    const y = e.clientY
    if(this.selection) {
      document.removeEventListener("mousemove", this.mouseMove, false);
      this.setState({endMousePosition: {x, y}, selectionMode: false})
      console.log(this.state.startMousePosition)
      console.log(this.state.endMousePosition)
      this.selection = false
    } else {
      this.setState({startMousePosition: {x, y}, endMousePosition: {x, y}, selectionMode: true})
      document.addEventListener("mousemove", this.mouseMove, false);
      this.selection = true
    }
  }

  mouseMove = (e) => {
    const x = e.clientX
    const y = e.clientY
    console.log(e.clientX, e.clientY)
    this.setState({endMousePosition: {x, y}})
    // const hoverElement = e.target
    // const hoverElementLayout = hoverElement.getBoundingClientRect()
    // if(hoverElement.id !== "highlighter") {
    //   this.setState({hoverElementStyle: domRectToStyle(hoverElementLayout)})
    // }
  }

  closeFeedBackBox = () => {
    this.deactivateInspector()
  }
  
  render() {
    const {isFeedBackBoxOpen, selectionMode, startMousePosition, endMousePosition} = this.state
    const style = selectionMode ? {
      x1: startMousePosition.x,
      y1: startMousePosition.y,
      x2: endMousePosition.x,
      y2: endMousePosition.y
    } : {}

    const overlay = selectionMode && <Overlay style={style}/>

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