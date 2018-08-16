import React, { Component } from "react";
import { Row, Col, Tabs, Icon } from "antd";

import request from "@/utils/axios";
import Header from "@/components/header";
import ArtComponent from "@/components/artList";
import "@/style/pages/center.less";

const TabPane = Tabs.TabPane;
const ICON = ({ text, type = "bars" }) => (
    <span>
        <Icon type={type} />
        {text}
    </span>
);
export default class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ArtList: [],
            nums: {
                fans: "",
                art: "",
                words: "",
                like: ""
            }
        };
    }

    componentDidMount() {
        request
            .get("/api/article")
            .then(res => {
                // callback(res);
                if (res.status === "0") {
                    this.setState({
                        ArtList: res.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        request
            .get("/api/article/nums", { id: "5b6cfaaf3632f75a3b59164a" })
            .then(res => {
                if (res.status === "0") {
                    this.setState({ nums: res.data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // const CList = () => {
        //     return (
        //         <List
        //             itemLayout="vertical"
        //             size="large"
        //             pagination={{
        //                 onChange: page => {
        //                     console.log(page);
        //                 },
        //                 pageSize: 3
        //             }}
        //             dataSource={this.state.ArtList}
        //             // dataSource={listData}
        //             // footer={<div><b>ant design</b> footer part</div>}
        //             renderItem={item => (
        //                 <List.Item
        //                     key={item.title}
        //                     actions={[
        //                         <span>{item.author}</span>,
        //                         <IconText type="star-o" text="156" />,
        //                         <IconText type="like-o" text="156" />,
        //                         <IconText type="message" text="2" />
        //                     ]}
        //                     extra={
        //                         <img
        //                             width={125}
        //                             alt="logo"
        //                             src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        //                         />
        //                     }
        //                 >
        //                     <List.Item.Meta
        //                         avatar={
        //                             <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        //                         }
        //                         title={<a href={item.href}>{item.title}</a>}
        //                         description={item.desc}
        //                     />
        //                     {item.content}
        //                 </List.Item>
        //             )}
        //         />
        //     );
        // };
        return (
            <div className="center-content">
                <Header />
                <Row type="flex">
                    <Col span={12} offset={4}>
                        <Row>
                            <Col>
                                <Row
                                    type="flex"
                                    justify="center"
                                    align="middle"
                                >
                                    <Col span={4}>
                                        <div className="center-img">
                                            <img
                                                alt=""
                                                src={require("@/assets/img/head.jpeg")}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Col>Tom</Col>
                                        <Row>
                                            <Col span={4} className="info-item">
                                                <div className="item-num">
                                                    0
                                                </div>
                                                <div className="item-name">
                                                    关注>
                                                </div>
                                            </Col>
                                            <Col
                                                span={4}
                                                offset={1}
                                                className="info-item"
                                            >
                                                <div className="item-num">
                                                    {this.state.nums.fans || 0}
                                                </div>
                                                <div className="item-name">
                                                    粉丝>
                                                </div>
                                            </Col>
                                            <Col
                                                span={4}
                                                offset={1}
                                                className="info-item"
                                            >
                                                <div className="item-num">
                                                    {this.state.nums.art || 0}
                                                </div>
                                                <div className="item-name">
                                                    文章>
                                                </div>
                                            </Col>
                                            <Col
                                                span={4}
                                                offset={1}
                                                className="info-item"
                                            >
                                                <div className="item-num">
                                                    {this.state.nums.words || 0}
                                                </div>
                                                <div className="item-name">
                                                    字数>
                                                </div>
                                            </Col>
                                            <Col
                                                span={4}
                                                offset={1}
                                                className="info-item"
                                            >
                                                <div className="item-num">
                                                    {this.state.nums.like || 0}
                                                </div>
                                                <div className="item-name">
                                                    收获喜欢>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={16}>
                                <Tabs
                                    defaultActiveKey="1"
                                    onChange={this.callback}
                                >
                                    <TabPane
                                        tab={<ICON text="文章" type="copy" />}
                                        key="1"
                                    >
                                        {/* <CList /> */}
                                        <ArtComponent
                                            data={this.state.ArtList}
                                        />
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <ICON text="动态" type="appstore" />
                                        }
                                        key="2"
                                    >
                                        <ArtComponent
                                            data={this.state.ArtList}
                                        />
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <ICON
                                                text="最新评论"
                                                type="apple"
                                            />
                                        }
                                        key="3"
                                    >
                                        <ArtComponent
                                            data={this.state.ArtList}
                                        />
                                    </TabPane>
                                    <TabPane
                                        tab={<ICON text="热门" type="github" />}
                                        key="4"
                                    >
                                        <ArtComponent
                                            data={this.state.ArtList}
                                        />
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} offset={2}>
                        <Col>暂无个人介绍</Col>
                        <Col> 他关注的专题/文集/连载</Col>
                        <Col>他喜欢的文章</Col>
                        <Col>他的文集</Col>
                        <Col>日记本</Col>
                    </Col>
                </Row>
            </div>
        );
    }

    callback() {}
}
