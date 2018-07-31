import React from "react";
import { DatePicker } from "antd";

export default class Page1 extends React.Component {
    render() {
        return (
            <div>
                <h1>this is the page1</h1>
                <div>
                    <DatePicker />
                </div>
            </div>
        );
    }
}
