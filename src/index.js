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

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>{routeConfig}</div>
        </Router>
    </Provider>,
    document.getElementById("root")
);
