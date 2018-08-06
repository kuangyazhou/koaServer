import '@/style/pages/writer.less';
import React, { Component } from "react";
import { Button, Row, Col, Icon, Form, Input} from "antd";

const FormItem = Form.Item;
class Writer extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="write">
                <Row>
                    <Col span={4} style={{'backgroundColor':'#404040','color':'#f2f2f2'}}>
                        <div className="back-btn">
                            <a href="/">回首页</a>
                        </div>
                        <div className="_1iZMb">
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
                                    <Button htmlType="submit" className="login-form-button">
                                        提交
                                    </Button>
                                    Or <a href="" className="cancel-btn">取消</a>
                                </FormItem>
                                </Form>
                            </div>
                        </div>
                        <ul className="_3MbJ4 _3t059">
                            <li className="_3DM7w _31PCv">
                                <div className="_3P4JX _2VLy-">
                                    <Icon type="setting" />
                                    <span>
                                        <ul className="_2V8zt _3FcHm _2w9pn">
                                            <li className="_2po2r cRfUr">
                                                <Icon type="edit" className="fa fa-pencil-square-o _22XWG"/>修改文集
                                            </li>
                                            <li className="_2po2r cRfUr">
                                                <Icon type="delete" className="fa fa-trash-o _22XWG"/>删除文集
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
                    </Col>
                    <Col span={4}>

                    </Col>
                    <Col span={16}>

                    </Col>
                </Row>
            </div>
        );
    }
}
export default  Writer = Form.create({})(Writer)