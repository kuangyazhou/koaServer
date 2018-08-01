import React, { Component } from "react";
import { Button } from "antd";
import Header from "@/commponents/header";
import Footer from "@/commponents/footer";

export default class WordPress extends Component {
    render() {
        return (
            <div>
                <Header current="wordpress"/>
                <div className="content">
                    <Button>WordPress</Button>
                    <h2>WordPress home</h2>
                </div>
                <Footer/>
            </div>
        );
    }
}