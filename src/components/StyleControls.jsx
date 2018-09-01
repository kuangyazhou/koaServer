import React from 'react';
import StyleButton from './StyleButton';

export const BlockStyleControls = props => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <span className="RichEditor-controls">
            {BLOCK_TYPES.map(type => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </span>
    );
};

export const InlineStyleControls = props => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <span className="RichEditor-controls">
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </span>
    );
};

const INLINE_STYLES = [
    { label: '加粗', style: 'iconfont icon-bold' },
    { label: '斜体', style: 'iconfont icon-italic' },
    { label: '下划线', style: 'iconfont icon-underline' },
    { label: '代码片段', style: 'iconfont icon-code' },
    { label: '引用', style: 'iconfont icon-quoteleft' }
];

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' }
];
