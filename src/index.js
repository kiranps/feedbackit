import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { cloneDocument } from "./helper";

setTimeout(() => {
  cloneDocument();
  const appRoot = document.createElement("div");
  appRoot.id = "app";
  appRoot.style = "position: absolute; left: 0; top: 0";
  document
    .getElementById("clone")
    .contentWindow.document.body.appendChild(appRoot);

  ReactDOM.render(
    <App />,
    document
      .getElementById("clone")
      .contentWindow.document.getElementById("app")
  );
}, 2000);
