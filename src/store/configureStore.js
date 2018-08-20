import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialstate) {
    const store = createStore(rootReducer, initialstate,
        // 触发redux-devtools
        window.devToolsExtension?window.devToolsExtension(): undefined
    )
    return store
}