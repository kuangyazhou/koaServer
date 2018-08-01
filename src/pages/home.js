import '../style/pages/home.less';
import React, {Component} from "react";
import { DatePicker } from "antd";
import Header from "@/commponents/header";
import Footer from "@/commponents/footer";

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <Header/>

                <h1>this is the page1</h1>
                <div />
                <div>
                    <DatePicker />
                </div>
                <Footer/>
            </div>
        );
    }
}
