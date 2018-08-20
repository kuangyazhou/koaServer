import '@/style/pages/writer.less';
import React, { Component } from "react";
import { Button, Row, Modal, List, Col, Icon, Form, Input } from "antd";
import Editors from "./editors";
import request from "@/utils/axios";
const FormItem = Form.Item;

class Writer extends Component {
    constructor(props) {
        super(props);
        // 默认给一个empty的editorstate
        this.state = {
            changeWj: false,
            changeSet: false,
            ModalText1: '如果你在使用编辑器的过程中遇到问题，可以尝试以下方案解决：',
            ModalText2: '1. Windows用户尽量将浏览器设置为极速模式，不要使用兼容模式写作',
            ModalText3: '2.推荐使用chrome浏览器，创作体验更加流畅',
            ModalText4: '3.浏览器插件可能与编辑器功能冲突，可以在使用编辑器时禁用插件',
            visible: false,
        };
        this.changeWenji = this._changeWenji.bind(this);
        this.changeSetting = this._changeSetting.bind(this);
        this.newArtical = this._newArtical.bind(this);
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
    _newArtical() {
        request
            .get('/api/article/', localStorage.userId)
            .then(res => {
                if (res.status === '0'){

                }
            })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    componentDidMount() {}
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, ModalText1, ModalText2, ModalText3, ModalText4} = this.state;
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
                            <span className="ant-dropdown-question" onClick={this.showModal}>
                                遇到问题<Icon type="question-circle-o" />
                                <Modal
                                    title={<span>常见问题 绑定遇到问题？<a href="https://www.jianshu.com/p/794b92192f62">点击查看帮助</a></span>}
                                    centered
                                    visible={visible}
                                    onOk={this.hideModal}
                                    onCancel={this.hideModal}
                                >
                                    <p>{ModalText1}</p>
                                    <p>{ModalText2}</p>
                                    <p>{ModalText3}</p>
                                    <p>{ModalText4}</p>
                                </Modal>
                            </span>
                        </Col>
                    </Col>
                    <Col span={20}>
                        <Row>
                            <Col span={6} className="center-item">
                                <div className="add_art" onClick={this.newArtical}>
                                    <Icon type="plus-circle-o" /> 新建文章  
                                </div>
                                <List>

                                </List>
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