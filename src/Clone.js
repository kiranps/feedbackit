import React, { Component } from "react";
import Frame from "react-frame-component";
import { cloneDocument } from "./helper";

export default class Clone extends Component {
  render() {
    return <Frame initialContent={cloneDocument()} />;
  }
}
