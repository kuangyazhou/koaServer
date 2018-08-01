import React from "react";
import { DatePicker } from "antd";
import Header from "../commponents/header";
import Footer from "@/commponents/footer";

export default class Page1 extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <h1>this is the page1</h1>
                <div />
                <div>
                    <DatePicker />
                </div>
                <Footer />
            </div>
        );
    }
}
