import React, { Component } from "react";
import { List, Avatar } from "antd";

import IconText from "@/components/iconText";

import request from "@/utils/axios";

export default class ArtComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    star(e, num) {
        // console.log(e);
        request
            .get("/api/article/like", { params: { id: e, num: num } })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // unstar(e, num) {
    //     request
    //         .get("/api/article/like", { params: { id: e, num: num } })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });

    //     // request.get()
    // }

    render() {
        const { data } = this.props;
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
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <span>{item.author}</span>,
                            item.likeUser.indexOf("5b6d5bccd7d48e6144059899") >
                            -1 ? (
                                <IconText
                                    type="dislike-o"
                                    onClick={() => this.star(item._id, -1)}
                                    text="156"
                                />
                            ) : (
                                <IconText
                                    type="star-o"
                                    onClick={() => this.star(item._id, 1)}
                                    text="156"
                                />
                            ),
                            <IconText type="like-o" text="156" />,
                            <IconText type="message" text="2" />
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
