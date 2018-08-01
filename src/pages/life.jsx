import React, { Component } from "react";
import { Button } from "antd";
import Header from "@/commponents/header";
import Footer from "@/commponents/footer";

export default class Life extends Component {
    render() {
        return (
            <div>
                <Header current="life"/>
                <div className="content">
                    <Button>Life</Button>
                    <h2>Life home</h2>
                </div>
                <Footer/>
            </div>
        );
    }
}