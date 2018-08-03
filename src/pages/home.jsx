import '@/style/pages/home.less';
import React, {Component} from "react";
import { Row, Col, List, Avatar, Icon } from "antd";

import Header from "@/commponents/header";
import Footer from "@/commponents/footer";
import Sider from "@/commponents/sider";

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

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
export default class Home extends Component {
    
    render() {
        return (
            <div className="home">
                <Header current="home"/>
                <div className="content">
                    <Row>
                        <Col span={4}>
                            <Sider/>
                        </Col>
                        <Col span={20}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                                }}
                                dataSource={listData}
                                footer={<div><b>ant design</b> footer part</div>}
                                renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                    />
                                    {item.content}
                                </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        );
    }
}
