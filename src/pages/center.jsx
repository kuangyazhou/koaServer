import "@/style/pages/center.less";
import React, { Component } from "react";
import Header from "@/components/header";
import { Row, Col, Tabs, List, Avatar, Icon, Carousel, Spin, message } from "antd";
const TabPane = Tabs.TabPane;
export default class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <div className="mine">
                <Header current="mine"/>
                <div className="content">
                    <Row>
                        <Col span={16}>
                            <div className="center-img"></div>
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab={<span><Icon type="appstore"/>tab1</span>} key="1">Content of Tab Pane 1</TabPane>
                                <TabPane tab={<span><Icon type="plus"/>tab2</span>} key="2">Content of Tab Pane 2</TabPane>
                                <TabPane tab={<span><Icon type="plus"/>tab3</span>} key="3">Content of Tab Pane 3</TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
