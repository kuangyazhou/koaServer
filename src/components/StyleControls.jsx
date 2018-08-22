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
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map(type => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </div>
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
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </span>
    );
};

const INLINE_STYLES = [
    { label: '加粗', style: 'BOLD' },
    { label: '斜体', style: 'ITALIC' },
    { label: '下划线', style: 'UNDERLINE' },
    { label: '代码片段', style: 'CODE' }
];

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: '引用', style: 'blockquote' },
    { label: '无序列表', style: 'unordered-list-item' },
    { label: '有序列表', style: 'ordered-list-item' },
    { label: '代码块', style: 'code-block' }
];
