import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { routeConfig } from "./router";

import "./utils/format";
import "antd/dist/antd.css";

ReactDOM.render(
  <Router>
      <div style={{ height: "100%" }}>{routeConfig}</div>
  </Router>,
  document.getElementById("root")
);
