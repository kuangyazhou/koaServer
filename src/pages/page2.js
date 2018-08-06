import React, { Component } from "react";

import request from "@/utils/axios";

import "../style/pages/page2.less";
import "@/style/pages/test.less";

export default class Page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: []
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
        const data = {
            name: "admin11111",
            password: "admin"
        };
        // axios
        // axios
        // request
        //     .post("/api/users/login", data)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        request
            .post("/api/users/login", data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
        // request
        //     .get("/api/users/login", { params: data })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
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
