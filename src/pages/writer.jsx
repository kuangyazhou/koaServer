import '@/style/pages/writer.less';
import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Button, Row, Col, Icon, Form, Input } from "antd";

const FormItem = Form.Item;

class Writer extends Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
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
                        <ul className="_3MbJ4">
                            <li className="_3DM7w _31PCv">
                                <div className="_3P4JX">
                                    <Icon type="setting" />
                                    <span>
                                        <ul className="_2V8zt">
                                            <li className="_2po2r cRfUr">
                                                <Icon type="edit" className="_22XWG" />修改文集
                                            </li>
                                            <li className="_2po2r cRfUr">
                                                <Icon type="delete" className="_22XWG" />删除文集
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                                <span>日记本</span>
                            </li>
                            <li className="_3DM7w">
                                <span>随笔</span>
                            </li>
                        </ul>
                        <Col span={4} className="settings">
                            <span className="ant-dropdown-trigger"><Icon type="setting" />设置</span>
                            <span className="ant-dropdown-question">遇到问题<Icon type="question-circle-o" /></span>
                        </Col>
                    </Col>
                    <Col span={20}>
                        <Row>
                            <Col span={8} className="center-item">
                                <div className="add_art">
                                    <Icon type="plus-circle-o" /> 新建文章
                                </div>
                            </Col>
                            <Col span={16}>
                                <Button onClick={this._onBoldClick.bind(this)}>Bold</Button>
                                <Editor
                                    editorState={this.state.editorState}
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Writer = Form.create({})(Writer)