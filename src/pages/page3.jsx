import '@/style/pages/writer.less';
import React, { Component } from "react";
import { Button, Row, Col, Icon, Form, Input } from "antd";
import {
    Editor,
    EditorState,
    RichUtils,
    Entity,
    convertToRaw,
    CompositeDecorator,
    // ContentState,
    // convertFromRaw,
    // DefaultDraftBlockRenderMap,
    // getDefaultKeyBinding,
    // KeyBindingUtil,
    // Modifier
} from 'draft-js';

const FormItem = Form.Item;

class Page3 extends Component {
    constructor(props) {
        super(props);
        // 创建新的decorator
        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
            {
                strategy: findFirstABC,
                component: ABCSpan,
            },
        ]);
        this.state = {
            editorState: EditorState.createEmpty(decorator),
            showURLInput: false,
            urlValue: '',
        };
        this.focus = () => this.refs.editor.focus();
        this.promptForLink = this._promptForLink.bind(this);
        //  输入url改变
        this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
        // 确认URL的输入完成
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);
        // 输出日志
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };

        // 双向绑定
        this.onChange = (editorState) => this.setState({ editorState });

        // 监听键盘事件
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
    // 添加链接
    _promptForLink(e) {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        // 如果开始和结尾不是相同的(意味着选中的东西)
        debugger;
        if (!selection.isCollapsed()) {
            this.setState({
                showURLInput: true,
                urlValue: '',
            }, () => {
                // 设置焦点
                setTimeout(() => this.refs.url.focus(), 0);
            });
        }
    }
    // 确认输入
    _confirmLink(e) {
        // 取消默认事件
        e.preventDefault();

        const { editorState, urlValue } = this.state;
        // 创建一个LINK 实体,可变,值是url 地址
        const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
        // setState 是异步的,第二个参数是回调函数
        this.setState({
            // 借助 RichUtils 添加链接
            editorState: RichUtils.toggleLink(
                editorState,
                editorState.getSelection(),
                entityKey
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }
    // 监听回车
    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }
    // 删除链接 仅仅会删除选中部分的链接
    _removeLink(e) {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        // 疑问:如果选中的是部分链接内容会怎样?
        if (!selection.isCollapsed()) {
            this.setState({
                // 借助 RichUtils 删除链接
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    _onBoldClick() {
        //RichUtils.toggleInlineStyle 将现有state  ,转换为新的state,
        // toggle 如果已经加粗了则取消加粗,如果没有则加粗
        let newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
        this.onChange(newState);
    }
    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    render() {
        let urlInput;
        // 如果需要选择url 输入框
        if (this.state.showURLInput) {
            urlInput =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                    />
                    <button onMouseDown={this.confirmLink}>
                        Confirm
                    </button>
                </div>;
        }
        const { getFieldDecorator } = this.props.form;

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
                            <Col span={18}>
                                <div style={styles.root}>
                                    <div style={{ marginBottom: 10 }}>
                                    选择一些文本，然后用按钮在被选择的文本上添加和移除链接
                                    </div>
                                    <div style={styles.buttons}>
                                        <button onMouseDown={this.promptForLink}
                                            style={{ marginRight: 10 }}
                                        >
                                            添加链接
                                        </button>
                                        <button onMouseDown={this.removeLink}>
                                            移除链接
                                        </button>
                                    </div>
                                    {urlInput}
                                    <div style={styles.editor} onClick={this.focus}>
                                        <Editor
                                            ref="editor"
                                            editorState={this.state.editorState}
                                            onChange={this.onChange}
                                            placeholder="Enter some text..."
                                            spellCheck={true}
                                        />
                                    </div>
                                    <input
                                        onClick={this.logState}
                                        style={styles.button}
                                        type="button"
                                        value="Log State"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
// 修饰器的查找方法 通过实体类型的名称进行查找
function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

// 链接的component
const Link = (props) => {
    // 取得Link 实体的数据(url) 进行绘制
    const { url } = Entity.get(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};

function findFirstABC(contentBlock, callback) {
    const text = contentBlock.getText();
    if (text.indexOf("abc") > 0) {
        callback(text.indexOf("abc"), text.indexOf("abc") + 3);
    }
}
// 标红色
const ABCSpan = (props) => {
    return <span style={{color:"red"}}>{props.children}</span>;
};

// 样式
const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    // 输入框样式
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};

export default Page3 = Form.create({})(Page3)