import '@/style/pages/writer.less';
import React, { Component } from "react";
import { Button, Row, Col, Icon, Form, Input } from "antd";
import {
    Editor,
    EditorState,
    RichUtils,
    // convertFromRaw,
    // convertToRaw,
    // CompositeDecorator,
    // DefaultDraftBlockRenderMap,
    // ContentState,
    // Entity,
    // getDefaultKeyBinding,
    // KeyBindingUtil,
    Modifier
} from 'draft-js';

const FormItem = Form.Item;

class Writer extends Component {
    constructor(props) {
        super(props);
        // 默认给一个empty的editorstate
        this.state = {
            editorState: EditorState.createEmpty()
        };
        // 获取焦点的方法
        this.focus = () => this.refs.editor.focus();
        // 绑定editorstate更新方法
        this.onChange = editorState => this.setState({ editorState });
        // 键盘操作
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        // tab键
        this.onTab = this._onTab.bind(this);
        // block和inline样式按钮的toggle（是否激活）
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.toggleColor = toggledColor => this._toggleColor(toggledColor);
    }
    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
    _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
    }
    _toggleColor(toggledColor) {
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(styles).reduce(
            (contentState, color) => {
            return Modifier.removeInlineStyle(contentState, selection, color);
            },
            editorState.getCurrentContent()
        );
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );
        const currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
            return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }
        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
            nextEditorState,
            toggledColor
            );
        }
        this.onChange(nextEditorState);
    }
    getBlockStyle(block) {
        switch (block.getType()) {
            case 'blockquote':
            return 'RichEditor-blockquote';
            default:
            return null;
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { editorState } = this.state;
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <div className="write">
                <Row className="_1gp6t">
                    <Col span={4} className="left-item">
                        <div className="back-btn">
                            <a href="/">回首页</a>
                        </div>
                        <div className="news_wj_wrapper">
                            <div className="news_wj">
                                <Icon type="plus" />新建文集
                            </div>
                            <div className="_2G97m">
                                <Form layout="inline" onSubmit={this.handleSubmit}>
                                    <FormItem>
                                        {getFieldDecorator('wjName', {
                                            rules: [{ required: true, message: '请输入文集名!' }],
                                        })(
                                            <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入文集名" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button htmlType="submit">
                                            提交
                                        </Button>
                                        &nbsp;&nbsp;<a href="" className="cancel-btn">取消</a>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                        <ul className="_3MbJ4">
                            <li className="_3DM7w _31PCv">
                                <div className="_3P4JX">
                                    <Icon type="setting" />
                                    <span>
                                        <ul className="_2V8zt">
                                            <li className="_2po2r cRfUr">
                                                <Icon type="edit" className="_22XWG" />修改文集
                                            </li>
                                            <li className="_2po2r cRfUr">
                                                <Icon type="delete" className="_22XWG" />删除文集
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                                <span>日记本</span>
                            </li>
                            <li className="_3DM7w">
                                <span>随笔</span>
                            </li>
                        </ul>
                        <Col span={4} className="settings">
                            <span className="ant-dropdown-trigger"><Icon type="setting" />设置</span>
                            <span className="ant-dropdown-question">遇到问题<Icon type="question-circle-o" /></span>
                        </Col>
                    </Col>
                    <Col span={20}>
                        <Row>
                            <Col span={6} className="center-item">
                                <div className="add_art">
                                    <Icon type="plus-circle-o" /> 新建文章
                                </div>
                            </Col>
                            <Col span={18} className="right-item">
                                <p className="artical-save">已保存</p>
                                <div style={style.root}>
                                    <div className="RichEditor-root">
                                        <div>
                                            <InlineStyleControls
                                                editorState={editorState}
                                                onToggle={this.toggleInlineStyle}
                                            />
                                            <BlockStyleControls
                                                editorState={editorState}
                                                onToggle={this.toggleBlockType}
                                            />
                                            <ColorControls
                                                editorState={editorState}
                                                onToggle={this.toggleColor}
                                            />
                                        </div>
                                        <div className={className} onClick={this.focus}>
                                            <Editor
                                                blockStyleFn={this.getBlockStyle}
                                                customStyleMap={styles}
                                                editorState={editorState}
                                                handleKeyCommand={this.handleKeyCommand}
                                                onChange={this.onChange}
                                                onTab={this.onTab}
                                                placeholder="请输入"
                                                ref="editor"
                                                spellCheck={true}
                                            />
                                        </div>
                                    </div>
                                    <Button storehandle={this.storeHandle}>保存</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

const styles = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    },
    red: {
        color: 'rgba(255, 0, 0, 1.0)'
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)'
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)'
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)'
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)'
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)'
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)'
    }
};
const style = {
    root: {
        fontFamily: "'Georgia', serif",
        fontSize: 14,
        padding: 20,
        width: '100%'
    },
    editor: {
        borderTop: '1px solid #ddd',
        cursor: 'text',
        fontSize: 16,
        marginTop: 20,
        minHeight: 400,
        paddingTop: 20
    },
    controls: {
        fontFamily: "'Helvetica', sans-serif",
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none'
    },
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        padding: '2px 0'
    }
};
const BlockStyleControls = props => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
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
const InlineStyleControls = props => {
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
// 富文本上方的按钮
class StyleButton extends Component {
    constructor() {
        super();
        this.onToggle = e => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
        <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
        </span>
        );
    }
}
class StyleColor extends Component {
    constructor(props) {
      super(props);
      this.onToggle = e => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }
    render() {
      let style;
      if (this.props.active) {
        style = { ...styles.styleButton, ...styles[this.props.style] };
      } else {
        style = styles.styleButton;
      }
      return (
        <span style={style} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
}
const ColorControls = props => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
      <span style={styles.controls}>
        {COLORS.map(type => (
          <StyleColor
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
const COLORS = [
    { label: '红', style: 'red' },
    { label: '橙', style: 'orange' },
    { label: '黄', style: 'yellow' },
    { label: '绿', style: 'green' },
    { label: '蓝', style: 'blue' },
    { label: '靛', style: 'indigo' },
    { label: '紫', style: 'violet' }
];
const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: '""', style: 'blockquote' },
    { label: '无序列表', style: 'unordered-list-item' },
    { label: '有序列表', style: 'ordered-list-item' },
    { label: '代码块', style: 'code-block' }
];

const INLINE_STYLES = [
    { label: 'B', style: 'BOLD' },
    { label: 'I', style: 'ITALIC' },
    { label: 'U', style: 'UNDERLINE' },
    { label: 'C', style: 'CODE' }
];

export default Writer = Form.create({})(Writer)