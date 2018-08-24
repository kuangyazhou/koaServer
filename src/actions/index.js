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
        request
            .get('https://randomuser.me/api/')
            .then(res => {
                console.log(res)
            })
    }
}