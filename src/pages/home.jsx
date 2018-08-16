import '@/style/pages/home.less';
import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { Row, Col, List, Avatar, Icon, Carousel, Spin, message } from "antd";
import request from '@/utils/axios'

import Header from "@/components/header";
import Footer from "@/components/footer";
import Sider from "@/components/sider";

const listData = [];
for (let i = 0; i < 13; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

class IconText extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {type, text, clickBtn} = this.props;
        return (
            <span onClick={clickBtn}>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        )
    }
}
 
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            ArtList: [],
            loading: false,
            hasMore: true,
            imgList: [
                "http://upload.jianshu.io/admin_banners/web_images/4358/a52cb0d0ef97a08087a234f4e25702b2471d49a4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540",
                "http://upload.jianshu.io/admin_banners/web_images/4374/0dd104568362dc168b15565132597b10134d9a1a.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540",
                "http://upload.jianshu.io/admin_banners/web_images/4361/599ae85090db0f4a4cb3cca4d7aeb645f6cc91f0.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540",
                "http://upload.jianshu.io/admin_banners/web_images/4368/c19f9350ef08c469f8fd461d25db7e8d8780f334.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
            ],
            view: 0, // 查看人数
            like: 0, // 喜欢人数
            message: 0, // 评论条数
        }
        this.clickBtn = this._clickBtn.bind(this);
    }
    
    _clickBtn() {
        this.setState(prevState => ({
                view: ++prevState.view,
        }));
    }
    getData = (callback) => {
        request.get("https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo")
            .then(res => {
                callback(res);
            })
            .catch(error => {
                console.log(error);
            });
    }
    getArt = (callback) => {
        request.get("/api/article")
            .then(res => {
                callback(res);
            })
            .catch(error => {
                console.log(error);
            });
    }
    componentDidMount() {
        this.getData((res) => {
            this.setState({
                data: res.results,
            });
        });
        this.getArt((res) => {
            if (res.status === '0') {
                this.setState({
                    ArtList: res.data
                })
            }
        });
        // this.addLike((res) => {
        //     if (res.data.name) {
        //         console.log(res);
        //         this.setState({
        //             like: this.state.like++
        //         })
        //     }
        // })
    }
    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('循环列表已全部加载完');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.getData((res) => {
            data = data.concat(res.results);
            this.setState({
                data: data,
                loading: false,
            });
        });
    }
    render() {
        return (
            <div className="home">
                <Header current="home" />
                <div className="content">
                    <Row>
                        <Col span={16}>
                            <Carousel autoplay>
                                {this.state.imgList.map((item, index) => {
                                        return <div key={index} ><img src={item} alt="img" /></div>
                                })}
                            </Carousel>
                            <div className="demo-infinite-container">
                                <InfiniteScroll
                                    initialLoad={false}
                                    pageStart={0}
                                    loadMore={this.handleInfiniteOnLoad}
                                    hasMore={!this.state.loading && this.state.hasMore}
                                    useWindow={false}
                                >
                                    <List
                                        dataSource={this.state.data}
                                        renderItem={item => (
                                            <List.Item key={item.id}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                                    description={item.email}
                                                />
                                                <div>Content</div>
                                            </List.Item>
                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container">
                                                <Spin />
                                            </div>
                                        )}
                                    </List>
                                </InfiniteScroll>
                            </div>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 3
                                }}
                                dataSource={this.state.ArtList}
                                renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        actions={[<IconText text={item.author}/>, <IconText type="eye-o" text={this.state.view} clickBtn={this.clickBtn}/>, <IconText type="like-o" text={this.state.like}/>, <IconText type="message" text={this.state.message} />]}
                                        extra={<img width={125} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                    >
                                        <List.Item.Meta
                                            title={<a href={item.href}>{item.title}</a>}
                                            description={item.desc}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={7}>
                            <div className="list-container">
                                <a href="">
                                    <img src={require("@/images/banner-s-3-7123fd94750759acf7eca05b871e9d17.png")} alt="Banner s 3" />
                                </a>
                                <a href="">
                                    <img src={require("@/images/banner-s-4-b70da70d679593510ac93a172dfbaeaa.png")} alt="Banner s 4" />
                                </a>
                                <a href="">
                                    <img src={require("@/images/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png")} alt="Banner s 5" />
                                </a>
                                <a href="">
                                    <img src={require("@/images/banner-s-6-c4d6335bfd688f2ca1115b42b04c28a7.png")} alt="Banner s 6" />
                                </a>
                                <a href="">
                                    <img src={require("@/images/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png")} alt="Banner s 7" />
                                </a>
                            </div>
                            <Sider />

                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        );
    }
}

