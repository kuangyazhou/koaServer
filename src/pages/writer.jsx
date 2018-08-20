import '@/style/pages/writer.less';
import React, { Component } from "react";
import { Button, Row, Col, Icon, Form, Input } from "antd";
import Editors from "./editors";

const FormItem = Form.Item;

class Writer extends Component {
    constructor(props) {
        super(props);
        // 默认给一个empty的editorstate
        this.state = {
            changeWj: false,
            changeSet: false,
        };
        this.changeWenji = this._changeWenji.bind(this);
        this.changeSetting = this._changeSetting.bind(this);
    }
    _changeWenji() {
        this.setState(prevState => ({
            changeWj: !prevState.changeWj
        }));
    }
    _changeSetting() {
        this.setState(prevState => ({
            changeSet: !prevState.changeSet
        }));
    }
    componentDidMount() {}
    
    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className="write">
                <Row className="_1gp6t">
                    <Col span={4} className="left-item">
                        <div className="back-btn">
                            <a href="/">回首页</a>
                        </div>
                        <div className="news_wj_wrapper">
                            <div className="news_wj">
                                <Icon type="plus" />新建文集
                            </div>
                            <div className="_2G97m">
                                <Form layout="inline" onSubmit={this.handleSubmit}>
                                    <FormItem>
                                        {getFieldDecorator('wjName', {
                                            rules: [{ required: true, message: '请输入文集名!' }],
                                        })(
                                            <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入文集名" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button htmlType="submit">
                                            提交
                                        </Button>
                                        &nbsp;&nbsp;<a href="" className="cancel-btn">取消</a>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                        <ul className="write_ul">
                            <li className="write_list _31PCv" alt="日记本">
                                <div className="write_list_set">
                                    <Icon type="setting" onClick={this.changeWenji}/>
                                    <span>
                                        <ul className={this.state.changeWj?'write_list_change active': 'write_list_change'}>
                                            <li className="_2po2r cRfUr">
                                                <Icon type="edit" />修改文集
                                            </li>
                                            <li className="_2po2r cRfUr">
                                                <Icon type="delete" />删除文集
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                                <span>日记本</span>
                            </li>
                            <li className="write_list" alt="随笔">
                                <span>随笔</span>
                            </li>
                        </ul>
                        <Col span={4} className="settings">
                            <span className="ant-dropdown-trigger" onClick={this.changeSetting}>
                                <Icon type="setting"/>设置
                                <span>
                                    <ul className={this.state.changeSet?'set_list_change active': 'set_list_change'}>
                                        <li className="_2po2r">
                                            <Icon type="edit" />默认编辑器
                                        </li>
                                        <li className="_2po2r">
                                            <Icon type="delete" />设置显示模式
                                        </li>
                                        <li className="_2po2r">
                                            <Icon type="delete" />回收站
                                        </li>
                                        <li className="_2po2r">
                                            <Icon type="question-circle-o" />帮助与反馈
                                        </li>
                                    </ul>
                                </span>
                            </span>
                            <span className="ant-dropdown-question">遇到问题<Icon type="question-circle-o" /></span>
                        </Col>
                    </Col>
                    <Col span={20}>
                        <Row>
                            <Col span={6} className="center-item">
                                <div className="add_art" onClick={this.newArtical}>
                                    <Icon type="plus-circle-o" /> 新建文章  
                                </div>
                            </Col>
                            <Col span={18} className="right-item">
                                <Editors />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}



export default Writer = Form.create({})(Writer)