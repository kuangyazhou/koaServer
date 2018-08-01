import React, { Component } from "react";

import request from "@/utils/axios";

import "../style/pages/page2.less";
import "@/style/pages/test.less";

export default class Page2 extends Component {
    componentDidMount() {
        request
            .get("/api/mysql")
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <h1>this is the page2</h1>
                <span className="cyan">fuck the king</span>
                <div className="color">the test of css modules</div>
            </div>
        );
    }
}
