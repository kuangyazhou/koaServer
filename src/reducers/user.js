import * as actionTypes from '../constants';

const initialState = {
    isFetching: false,
    error: null,
    user: {}
};

export default function user(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case actionTypes.USER:
            return {
                isFetching: false,
                error: null,
                user: action.user
            }
        case actionTypes.FETCHLOADING:
            return {
                isFetching: true,
                error: null,
                user: {}
            }
        case actionTypes.FETCHUSERFAILURE:
            return {
                isFetching: false,
                error: action.error,
                user: {}
            }
        default:
            return state
    }
}