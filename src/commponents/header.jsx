import '@/style/header.less';
import React, { Component } from "react";
import { Row, Col, Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
                <Col span={16}>
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
                        <Menu.Item key="life">
                            <a href="/life">
                                <Icon type="instagram"/>生活
                            </a>
                        </Menu.Item>
                        <Menu.Item key="culture">
                            <a href="/culture">
                                <Icon type="book"/>文化
                            </a>
                        </Menu.Item>
                        <SubMenu
                            title={
                                <span>
                                    <Icon type="setting" />Navigation Three -Submenu
                                </span>
                            }
                        >
                            <MenuItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                </Col>
                <Col span={2}></Col>
                <Col span={2}></Col>
            </Row>
                
                
            </header>
        );
    }
}
