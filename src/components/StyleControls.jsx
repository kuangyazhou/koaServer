import React from 'react';
import StyleButton from './styleButton';

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
                    class={type.class}
                />
            ))}
        </span>
    );
};

const INLINE_STYLES = [
    { label: '加粗', class: 'iconfont icon-bold', style: 'BOLD' },
    { label: '斜体', class: 'iconfont icon-italic', style: 'ITALIC' },
    { label: '下划线', class: 'iconfont icon-underline', style: 'UNDERLINE' },
    { label: '代码片段', class: 'iconfont icon-code', style: 'CODE' },
];

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: '引用', class: 'iconfont icon-quoteleft', style: 'blockquote' }
];
