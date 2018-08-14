import "@/style/pages/center.less";
import React, { Component } from "react";
import Header from "@/components/header";
import { Row, Col, List, Avatar, Icon, Carousel, Spin, message } from "antd";

export default class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className="center-content">
                <Header />
                <Row>
                    <Col span={16}>
                        <div className="center-img">
                            <img src={require("@/assets/img/head.jpeg")} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
