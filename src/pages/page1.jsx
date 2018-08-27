import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as types from '../actions';
import PropTypes from 'prop-types';

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
        actions({
            userid: '123',
            city: 'guangzhou'
        })
    }
}

class User extends Component {
    
    render() {
        console.log(this.props)
        const {user, getUser} = this.props;
        return (
            <div>
                <p>{user.email}</p>
                <button onClick={() => getUser()}>get user</button>
            </div>
        )
    }
}

class Hello extends Component{
    static propTypes = {
        counter: PropTypes.number.isRequired,
        login: PropTypes.func.isRequired,
        updateCityName: PropTypes.func.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        // user: PropTypes.object.isRequired
    }
    componentDidMount() {
        this.props.login({
            userid: 'abc',
            city: 'shenzhen'
        })
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <p>{this.props.counter}</p>
                <button onClick={this.props.increment}>increment </button>
                <button onClick={this.props.decrement}>decrement</button>
                <A userinfo={this.props.userinfo}/>
                <B userinfo={this.props.userinfo}/>
                <C actions={this.props.login}/>
                <User getUser={this.props.getUser} user={this.props.user.user}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        counter: state.counter,
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(types, dispatch);
        // login: bindActionCreators(login, dispatch),
        // updateCityName: bindActionCreators(updateCityName, dispatch),
        // increment: bindActionCreators(increment, dispatch),
        // decrement: bindActionCreators(decrement, dispatch),
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello)