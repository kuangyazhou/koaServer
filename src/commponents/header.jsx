import '@/style/header.less';
import React, { Component } from "react";
import { Row, Col, Menu, Icon, Input, Button } from "antd";

const Search = Input.Search;

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || 'home'
        }
    }
    handleClick = e => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    };
    render() {
        return (
            <header className="header">
                <Row>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src={require('../images/logo.png')} alt="logo"/>
                            <span>新闻首页</span>
                        </a>
                    </Col>
                    <Col span={4}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="home">
                                <a href="/">
                                    <Icon type="home"/>首页
                                </a>
                            </Menu.Item>
                            <Menu.Item key="wordpress">
                                <a href="/wordpress">
                                    <Icon type="team"/>技术交流
                                </a>
                            </Menu.Item>
                            {/* <Menu.Item key="life">
                                <a href="/life">
                                    <Icon type="instagram"/>生活
                                </a>
                            </Menu.Item>
                            <Menu.Item key="culture">
                                <a href="/culture">
                                    <Icon type="book"/>文化
                                </a>
                            </Menu.Item> */}
                        </Menu>
                        
                    </Col>
                    <Col span={12}>
                        <div className="search">
                            <Search
                                placeholder="搜索"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className="sign-container">
                            <a className="btn log-in" href="/signin">
                                登录
                            </a>
                            <a  className="btn sign-up" href="/signup">
                                <Button type="primary">注册</Button>
                            </a>
                        </div>
                    </Col>
                </Row>
            </header>
        );
    }
}
