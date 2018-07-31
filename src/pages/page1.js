import React from "react";
import { DatePicker } from "antd";
import Header from "../commponents/header";


export default class Page1 extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <h1>this is the page1</h1>
                <div />
                <div>
                    <DatePicker />
                </div>
            </div>
        );
    }
}
