import '@/style/sign.less'
import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            token: null
        }
    }
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
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('telNum', {
                                rules: [{ required: true, message: '请输入手机号!' }],
                            })(
                                <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="手机号" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请设置密码!' }],
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