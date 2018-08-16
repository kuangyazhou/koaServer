import React, { Component } from "react";
import { Icon } from "antd";

export default class IconText extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { type, text } = this.props;
        return (
            <span onClick={this.props.onClick}>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
    }
}
