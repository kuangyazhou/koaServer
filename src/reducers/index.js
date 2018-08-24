import { combineReducers } from 'redux';

import userinfo from './userinfo';
import counter from './counter';
import user from './user';

const rootReducer = combineReducers({
    userinfo,
    counter,
    user
})

export default rootReducer;