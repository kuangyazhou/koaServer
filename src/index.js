import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import { routeConfig } from "./router";

// import "./utils/format";
import "antd/dist/antd.css";

ReactDOM.render(
    <Router>
        <div style={{ height: "100%" }}>{routeConfig}</div>
    </Router>,
    document.getElementById("root")
);

// {
//   "plugins": [
//       [
//           "import",
//           { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }
//       ]
//   ]
// }
