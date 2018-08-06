import '@/style/pages/wordpress.less'
import React, { Component } from "react";
import { Row, Col, Carousel, List } from "antd";
import Header from "@/commponents/header";
import Footer from "@/commponents/footer";

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
export default class WordPress extends Component {
    render() {
        return (
            <div>
                <Header current="wordpress"/>
                <div className="content">
                    <Row>
                        <Col span={16}>
                            <Carousel autoplay>
                                <div><img src="http://upload.jianshu.io/admin_banners/web_images/4358/a52cb0d0ef97a08087a234f4e25702b2471d49a4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/></div>
                                <div><img src="http://upload.jianshu.io/admin_banners/web_images/4374/0dd104568362dc168b15565132597b10134d9a1a.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/></div>
                                <div><img src="http://upload.jianshu.io/admin_banners/web_images/4368/c19f9350ef08c469f8fd461d25db7e8d8780f334.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/></div>
                            </Carousel>
                        </Col>
                        <Col span={8}>
                            <List
                                header={<div>Header</div>}
                                footer={<div>Footer</div>}
                                bordered
                                dataSource={data}
                                renderItem={item => (<List.Item>{item}</List.Item>)}
                            />
                        </Col>
                    </Row>
                    <h2>WordPress home</h2>
                </div>
                <Footer/>
            </div>
        );
    }
}