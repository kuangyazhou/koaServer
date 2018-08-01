import '../style/header.less';
import React, { Component } from "react";
import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends Component {
    state = {
        current: "home"
    };
    handleClick = e => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    };
    render() {
        return (
            <header className="header">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="home">
                        <Icon type="home"/>首页
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="calendar" />技术交流
                    </Menu.Item>
                    <Menu.Item key="life">
                        <Icon type="instagram" />生活
                    </Menu.Item>
                    <Menu.Item key="culture">
                        <Icon type="appstore" />文化
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
                    <Menu.Item key="alipay">
                        <a
                            href="https://ant.design"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Navigation Four - Link
                        </a>
                    </Menu.Item>
                </Menu>
            </header>
        );
    }
}
