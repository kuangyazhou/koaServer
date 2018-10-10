import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";

import { routeConfig } from "@/router";
import "antd/dist/antd.css";
import "@/style/common/reset.less";
import configureStore from "@/store/configureStore";

const IO = require("socket.io-client");

const store = configureStore();

// socket.io

// const options = {};
// const socket = new IO("http://localhost:2333", options);

// socket.on("connect", e => {
//   console.log(e);
// });

// socket.on("disconnect", e => {
//   console.log(e);
// });

// socket.on("message", msg => {
//   console.log(msg);
// });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="main-container">{routeConfig}</div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
