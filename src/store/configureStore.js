import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialstate) {
    const store = createStore(rootReducer, initialstate,
        applyMiddleware(logger, thunk)
        // 触发redux-devtools
        // window.devToolsExtension?window.devToolsExtension(): undefined
    )
    return store
}