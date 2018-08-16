import React, { Component } from "react";
import { List, Avatar, Icon } from "antd";

import IconText from "@/components/iconText";

// const IconText = ({ type, text }) => (
//     <span onClick={this.props.onClick}>
//         <Icon type={type} style={{ marginRight: 8 }} />
//         {text}
//     </span>
// );

export default class ArtComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    star() {
        console.log(1);
    }
    // star = e => {
    //     console.log(e);
    //     console.log("fuck the king!!!");
    // };

    render() {
        const { data } = this.props;
        // return <div>fuck the king!!!</div>;
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3
                }}
                dataSource={data}
                // dataSource={listData}
                // footer={<div><b>ant design</b> footer part</div>}
                renderItem={item => (
                    // console.log(item);
                    <List.Item
                        key={item.title}
                        actions={[
                            <span>{item.author}</span>,
                            <IconText
                                type="star-o"
                                onClick={() => {
                                    console.log(1111);
                                }}
                                text="156"
                            />,
                            <IconText type="like-o" text="156" />,
                            <IconText type="message" text="2" />
                            // <Icon
                            //     type="star-o"
                            //     onClick={() => {
                            //         console.log(111);
                            //     }}
                            // />
                        ]}
                        extra={
                            <img
                                width={125}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.desc}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        );
    }
}
