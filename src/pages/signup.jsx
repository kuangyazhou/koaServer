import '@/style/sign.less'
import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import request from '@/utils/axios';

const FormItem = Form.Item;

class SignUp extends Component{
    constructor() {
        super();
        this.state = {
            token: null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request.get("api/users/register", {params: values})
                    .then(res => {
                        if (res.status === 0) {
                            window.location.href = '/signin';
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
    }
    checkName = (rule, value, callback) => {
        const nameReg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{5,}$/;
        if (value) {
            if (!nameReg.test(value)){
                callback("请输入汉字，字母，数字或下划线至少5个");
            } else {
                callback();
            } 
        } else {
           callback("请输入用户名");
        }
    }
    checkTel = (rule, value, callback) => {
        const telReg = /^1[0-9]{10}$/;
        if (value) {
            if (!telReg.test(value)){
                callback("请输入11位手机号码");
            } else {
                callback();
            } 
        } else {
           callback("请输入手机号");
        }
    }
    checkPassword = (rule, value, callback) => {
        const passwordReg = /^[a-zA-Z0-9_]{5,}$/;
        if (value) {
            if ( !passwordReg.test(value)){
                callback("请输入字母，数字或下划线至少5位的密码");
            } else {
                callback();
            }
        } else {
           callback("请输入密码");
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="sign">
                <div className="logo">
                    <a href="/">
                        <img src={require('../images/logo.png')} alt="logo"/>
                    </a>
                </div>
                <div className="main">
                    <h4 className="title">
                        <div className="normal-title">
                            <a href="/signin">登录</a>
                            <b>.</b>
                            <a  className="active" href="/signup">注册</a>
                        </div>
                    </h4>
                    <div className="sign-in-container">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, whitespace: true, validator: this.checkName},],
                                validateTrigger: 'onBlur',
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="用户名" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('tel', {
                                rules: [{ required: true, whitespace: true, validator: this.checkTel},],
                                validateTrigger: 'onBlur',
                            })(
                                <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }}/>}placeholder="手机号" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, whitespace: true, validator: this.checkPassword},],
                                validateTrigger: 'onBlur',
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="设置密码" />
                            )}
                            </FormItem>
                            <FormItem>
                            
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                注册
                            </Button>
                            <p>
                                点击"注册"即表示愿意遵守Blog<br/>
                                <a href="">用户协议 </a>和<a href=""> 隐私政策</a>
                            </p>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default SignUp = Form.create({})(SignUp)