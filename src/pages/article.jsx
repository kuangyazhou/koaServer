import "@/style/pages/article.less";
import React, { Component } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Avatar, Row, Col, Icon } from "antd";
import request from "@/utils/axios";

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }
    viewNum(){
        request.get('/api/view')
            .then(res => {
                console.log(res)
            })
    }
    render() {
        return (
            <div className="article">
                <Header current="article" />
                <div className="content">
                    <Row>
                        <Col span={2} />
                        <Col span={20}>
                            <div className="article-main">
                                <h1 className="article-title">
                                    都说自律很难，但你知道做到自律后有多爽吗
                                </h1>
                                <div className="article-author">
                                    <Avatar src={require("@/images/1151.jpg")} />
                                    <div className="article-info">
                                        <span className="name">
                                            <a href="">{this.state.name}</a>
                                        </span>
                                        <img
                                            className="badge-icon"
                                            src="//upload.jianshu.io/user_badge/94d76265-aab1-4559-8d12-1da9f6be21ce"
                                            alt="94d76265"
                                        />
                                        <a className="btn btn-success follow">
                                            <Icon type="plus" /> 关注
                                        </a>
                                        <div className="meta">
                                            <span className="publish-time">
                                                2018.07.05 10:04
                                            </span>
                                            <span className="wordage">
                                                字数 2501
                                            </span>
                                            <span className="views-count">
                                                阅读 6788
                                            </span>
                                            <span className="comments-count">
                                                评论 27
                                            </span>
                                            <span className="likes-count">
                                                喜欢 201
                                            </span>
                                            <span className="rewards-count ">
                                                赞赏 1
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="show-content">
                                    <div className="show-content-free">
                                        <p>所以，真正能给你带来幸福感和快乐的事情，唯有自律。</p>
                                    </div>
                                </div>
                                <div className="support-author">
                                    <p>因为有你，我会努力!</p>
                                    <div className="btn btn-pay">赞赏支持</div>
                                    <div className="supporter">
                                        <ul className="support-list">
                                            <li>
                                                <Avatar src={require("@/images/1151.jpg")} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="show-foot">
                                    <a className="notebook" href="/nb/26427609">
                                        <Icon type="copy" /> 杂论
                                    </a>
                                    <div className="copyright">
                                        © 著作权归作者所有
                                    </div>
                                    <div className="modal-wrap">
                                        <a id="report-modal">举报文章</a>
                                    </div>
                                </div>
                                <div className="follow-detail">
                                    <div className="info">
                                        <Avatar src={require("@/images/1151.jpg")} />
                                        <a className="btn btn-success follow">
                                            <Icon type="plus" /> 关注
                                        </a>
                                        <a className="title" href="/u/64b88ecc71b6">
                                            西风漂流David
                                        </a>
                                        <img className="badge-icon" src="//upload.jianshu.io/user_badge/94d76265-aab1-4559-8d12-1da9f6be21ce" alt="94d76265" />
                                        <p>
                                            写了 454502 字，被 41699
                                            人关注，获得了 16630 个喜欢
                                        </p>
                                    </div>
                                    <div className="signature">
                                        90后，一日四餐，一餐是书。
                                        全国CDA网络辩论赛最佳辩手。
                                        简书推荐作者，京东阅读专栏作者。
                                        直面真相，针砭时弊，激浊扬清。
                                        微信公众号：xfpldavid。
                                        我已委托“维权骑士”（rightknights.com）为我的文章进行维权行动。
                                        如需转载前往https://rightknights.com/material/author?id=4794
                                        获取合法授权
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={2} />
                    </Row>
                </div>
                <Footer />
            </div>
        );
    }
}
