import * as actionTypes from '../constants';

export default function couter(state = 0, action) {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return state + 1;
        case actionTypes.DECREMENT:
            return state - 1;
        default:
            return state
    }
}