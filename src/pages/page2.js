import React, { Component } from "react";

import request from "@/utils/axios";

// import axios from "axios";

import "../style/pages/page2.less";
import "@/style/pages/test.less";

export default class Page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fuck: [
                {
                    name: "fuck the king1"
                },
                {
                    name: "fuck the king2"
                },
                {
                    name: "fuck the king3"
                }
            ]
        };
    }
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
                {/* {this.state.fuck.map((e, i) => {
                    return <h2 key={`h1+${i}`}>{e.name}</h2>;
                })} */}
                <span className="cyan">fuck the king</span>
                <div className="color">the test of css modules</div>
            </div>
        );
    }
}
