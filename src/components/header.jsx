import '@/style/header.less';
import React, { Component } from "react";
import { Row, Col, Menu, Icon, Input, Button } from "antd";

const Search = Input.Search;

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || 'home',
            hasLogined: false,
            name: '',
            userId: ''
        }
    }
    handleClick = e => {
        this.setState({
            current: e.key
        });
    };
    componentDidMount() {
        if (localStorage.userId === '') {
            this.setState({ hasLogined: false });
        } else {
            this.setState({ name: "localStorage.name", userId: localStorage.userId });
            this.setState({ hasLogined: true });
        }
    }
    logout() {
        this.setState({ hasLogined: false });
        localStorage.userId = '';
    }
    render() {
        const userShow = this.state.hasLogined
            ? <div className="sign-container">
                <a type="primary" href="/mine" target="_blank" className="person-center"><span>{this.state.name}</span> 个人中心</a>
                &nbsp;&nbsp;&nbsp;
				<Button onClick={this.logout.bind(this)} ><Icon type="logout"/>退出</Button>
                <a href="/writer" className="btn write-btn"><Icon type="edit" /> 写文章</a>
            </div>
            : <div className="sign-container">
                <a className="btn log-in" href="/signin">
                    <Icon type="login" /> 登录
                </a>
                <a className="btn sign-up" href="/signup">
                    <Button type="ghost">注册</Button>
                </a>
                <a href="/writer" className="btn write-btn">写文章</a>
            </div>;
        return (
            <header className="header">
                <Row>
                    <Col span={3}>
                        <a href="/" className="logo">
                            <img src={require('../images/logo.png')} alt="logo" />
                        </a>
                    </Col>
                    <Col span={5}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="home">
                                <a href="/">
                                    <Icon type="home" />首页
                                </a>
                            </Menu.Item>
                            <Menu.Item key="wordpress">
                                <a href="/wordpress">
                                    <Icon type="team" />技术交流
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
                    <Col span={7}>
                        <div className="search">
                            <Search
                                placeholder="搜索"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    </Col>
                    <Col span={9}>
                        {userShow}
                    </Col>
                </Row>
            </header>
        );
    }
}
