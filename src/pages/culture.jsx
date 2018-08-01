import React, { Component } from "react";
import { Button } from "antd";
import Header from "@/commponents/header";
import Footer from "@/commponents/footer";

export default class Culture extends Component {
    render() {
        return (
            <div>
                <Header current="culture"/>
                <div className="content">
                    <Button>Culture</Button>
                    <h2>Culture home</h2>
                </div>
                <Footer/>
            </div>
        );
    }
}