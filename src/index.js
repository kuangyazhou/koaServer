import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import { routeConfig } from "@/router";
import "antd/dist/antd.css";
import "@/style/common/reset.less";

ReactDOM.render(
    <Router>
        <div style={{ height: "100%" }}>{routeConfig}</div>
    </Router>,
    document.getElementById("root")
);
