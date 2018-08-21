import "@/style/sign.less";
import React, { Component } from "react";
import request from "@/utils/axios";
import { Form, Icon, Input, Button, Checkbox, Message } from "antd";

const FormItem = Form.Item;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request
                    .post("/api/users/login", values)
                    .then(res => {
                        if (res.status === "0") {
                            console.log(values)
                            localStorage.name = values.name;
                            localStorage.userId = res.token;
                            Message.success("登录成功！");
                            window.location.href = "/";
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="sign">
                <div className="logo">
                    <a href="/">
                        <img src={require("../images/logo.png")} alt="logo" />
                    </a>
                </div>
                <div className="main">
                    <h4 className="title">
                        <div className="normal-title">
                            <a className="active" href="/signin">
                                登录
                            </a>
                            <b> . </b>
                            <a href="/signup">注册</a>
                        </div>
                    </h4>
                    <div className="sign-in-container">
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form"
                        >
                            <FormItem>
                                {getFieldDecorator("name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入用户名!"
                                        }
                                    ],
                                    validateTrigger: "onBlur"
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        type="name"
                                        placeholder="用户名"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入密码!"
                                        }
                                    ],
                                    validateTrigger: "onBlur"
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="密码"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("remember", {
                                    valuePropName: "checked",
                                    initialValue: true
                                })(
                                    <Checkbox className="login-form-remember">
                                        记住我
                                    </Checkbox>
                                )}
                                <a className="login-form-forgot" href="">
                                    忘记密码?
                                </a>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    {" "}
                                    登入
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default (SignIn = Form.create({})(SignIn));
