import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userinfoActions from '../actions/userinfo';

class A extends Component {
    render() {
        return (
            <div>
                <p>{this.props.userinfo.userid}</p>
            </div>
        )
    }
}
class B extends Component {
    render() {
        return (
            <div>{this.props.userinfo.city}</div>
        )
    }
}
class C extends Component {
    render() {
        return (
            <div>
                <button onClick={this.changeUserInfo.bind(this)}>修改</button>
            </div>
        )
    }
    changeUserInfo() {
        const actions = this.props.actions
        actions.login({
            userid: '123',
            city: 'guangzhou'
        })
    }
}

class Hello extends Component{
    componentDidMount() {
        this.props.userinfoActions.login({
            userid: 'abc',
            city: 'shenzhen'
        })
    }
    render() {
        return (
            <div>
                <A userinfo={this.props.userinfo}/>
                <B userinfo={this.props.userinfo}/>
                <C actions={this.props.userinfoActions}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello)