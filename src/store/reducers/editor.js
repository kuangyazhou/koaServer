import * as types from '../constants';

const initialState = {
    editorState: null
};

export default function editor(state = initialState, action) {
    switch (action.type) {
        case types.SETEDITORSTATE:
            return {
                editorState: action.editorState
            }
        default:
            return state
    }
}