import request from '@/utils/axios';
import * as actionTypes from '../constants';

export function login(data) {
    return {
        type: actionTypes.USERINFO_LOGIN,
        data
    }
}

export function updateCityName(data) {
    return {
        type: actionTypes.UPDATE_CITYNAME,
        data
    }
}

export function increment(data) {
    return {
        type: actionTypes.INCREMENT,
        data
    }
}

export function decrement(data) {
    return {
        type: actionTypes.DECREMENT,
        data
    }
}

export function getUser() {
    return dispatch => {
        dispatch(fetchUserRequest())
        request
            .get('https://randomuser.me/api/')
            .then(res => {
                dispatch(fetchUser(res.results[0]));
            })
            .catch(error => {
                dispatch(fetchUserFailure(error))
            })
    }
}

export function fetchUserFailure(error) {
    return {
        type: actionTypes.FETCHUSERFAILURE,
        error
    }
}

export function fetchUser(user) {
    return {
        type: actionTypes.USER,
        user
    }
}

export function fetchUserRequest() {
    return {
        type: actionTypes.FETCHLOADING,
    }
}