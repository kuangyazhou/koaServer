import style from '@/style/editors.less'
import React, { Component } from 'react';
import {Button, Icon} from 'antd';
import {
    Editor,
    EditorState,
    // convertFromRaw,
    // convertToRaw,
    // CompositeDecorator,
    // DefaultDraftBlockRenderMap,
    // ContentState,
    // Entity,
    // RichUtils,
    // getDefaultKeyBinding,
    // KeyBindingUtil,
    // Modifier
} from 'draft-js';

export default class Editors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.focus = () => this.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});

    }
    render () {
        const { editorState } = this.state;
        return (
            <div className={style.init}>
                <div className={style.operate}>
                    <InlineStyle/>
                    <BlockStyle/>
                    <ColorStyle/>
                </div>
                <div className={style.editorRoot} onClick={this.focus}>
                    <Editor
                        editorState = { editorState }
                        onChange = {this.onChange}
                        ref = { (ref) => this.editor = ref }
                    />
                </div>
                <Button storehandle={this.storeHandle}>保存</Button>
            </div>
        );
    }
}

const INLINE_TYPES = [
    {
        label: 'B',
        style: ''
    },
    {
        label: 'I',
        style: ''
    },
    {
        label: 'H',
        style: ''
    },
    {
        label: '""',
        style: ''
    },

];

const InlineStyle = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <span>
            {INLINE_TYPES.map((type) =>
                <span 
                    key = { type.label }
                    active = { currentStyle.has(type.style) }
                    label = { type.label }
                    onToggle = { props.onToggle }
                    style = { type.style }
                >
                    <Icon type={type.label} />
                </span>
            )}
        </span>
    )
};

const BLOCK_TYPES = [
    {
        label: '</>',
        style: ''
    },
    {
        label: 'I',
        style: ''
    },
    {
        label: 'H',
        style: ''
    },
    {
        label: '""',
        style: ''
    },

];

const BlockStyle = (props) => {
    
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return (
        <span>
            {BLOCK_TYPES.map((type) =>
                <span 
                    key = { type.label }
                    active = { type.style === blockType }
                    label = { type.label }
                    onToggle = { props.onToggle }
                    style = { type.style }
                >
                <Icon type={type.label} />
            </span>
            )}
        </span>
    )
};

const COLOR_TYPES = [
    {
        label: '',
        style: 'black'
    },
    {
        label: '',
        style: 'blue'
    },
    {
        label: '',
        style: 'purple'
    },
];

const ColorStyle = (props) => {
    
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return (
        <span>
            {COLOR_TYPES.map((type) =>
                <span 
                    key = { type.label }
                    active = { type.style === blockType }
                    label = { type.label }
                    onToggle = { props.onToggle }
                    style = { type.style }
                >
            </span>
            )}
        </span>
    )
};
