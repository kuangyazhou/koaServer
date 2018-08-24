import { combineReducers } from 'redux';

import userinfo from './userinfo';
import counter from './counter';

const rootReducer = combineReducers({
    userinfo,
    counter
})

export default rootReducer;