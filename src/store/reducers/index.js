import { combineReducers } from 'redux';

import userinfo from './userinfo';
import counter from './counter';
import user from './user';
import editor from './editor';

const rootReducer = combineReducers({
    userinfo,
    counter,
    user,
    editor
})

export default rootReducer;