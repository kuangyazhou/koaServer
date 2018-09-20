import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, Modifier, AtomicBlockUtils } from 'draft-js';
import { BlockStyleControls, InlineStyleControls } from './styleControls';
import ColorEditor from './colorEditor';
import MediaEditor from './mediaEditor';
import { Button, Input } from 'antd';
import request from "@/utils/axios";
import '@/style/editors.less';

class Editors extends Component {
	constructor(props) {
		super(props);
		// 默认给一个empty的editorstate
		this.state = {
			editorState: EditorState.createEmpty(),
			logState: null,
			showURLInput: false,
			url: '',
			urlType: '',

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
		// 媒体文件添加部分
		this.onURLChange = e => this.setState({ urlValue: e.target.value });
        this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
        this.confirmMedia = this._confirmMedia.bind(this);
		this.addAudio = this._addAudio.bind(this);
        this.addImage = this._addImage.bind(this);
		this.addVideo = this._addVideo.bind(this);
		
		this.saveArticle = () => {
			let values = this.state.editorState.toJS()
			request
				.get('/api/article/add', {values: values, userid: localStorage.userId})
				.then(res => {
					console.log(res)
				})
				.catch(error => {
					console.error();
				})

		};
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
		const nextContentState = Object.keys(style).reduce(
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
	// 媒体文件添加部分
	_onURLInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmMedia(e);
        }
	}
	_confirmMedia(e) {
        e.preventDefault();
        const { urlValue, urlType, editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            'IMMUTABLE',
            { src: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity
        });
        this.setState(
            {
                editorState: AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    ' '
                ),
                showURLInput: false,
                urlValue: ''
            },
            () => {
                setTimeout(() => this.focus(), 0);
            }
        );
	}
	_promptForMedia(type) {
        this.setState(
            {
                showURLInput: true,
                urlValue: '',
                urlType: type
            },
            () => {
                setTimeout(() => this.refs.url.focus(), 0);
            }
        );
    }
    _addAudio() {
        this._promptForMedia('audio');
    }
    _addImage() {
        this._promptForMedia('image');
    }
    _addVideo() {
        this._promptForMedia('video');
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
		const { editorState } = this.state;
		// 如果用户在输入任何字符之前，改变了block类型，我们可以使用改变placeholder的样式，
		// 或者隐藏它。我们现在隐藏它。
		let className = 'RichEditor-editor';
		const contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (
				contentState
					.getBlockMap()
					.first()
					.getType() !== 'unstyled'
			) {
				className += ' RichEditor-hidePlaceholder';
			}
		}
		let urlInput;
        if (this.state.showURLInput) {
            urlInput = (
                <div className="url-container">
                    <Input
                        onChange={this.onURLChange}
                        ref="url"
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onURLInputKeyDown}
                    />
                    <Button onMouseDown={this.confirmMedia}>确认</Button>
                </div>
            );
        }
		return (
			<div className="RichEditor-root">
				<BlockStyleControls
					editorState={editorState}
					onToggle={this.toggleBlockType}
				/>
				<InlineStyleControls
					editorState={editorState}
					onToggle={this.toggleInlineStyle}
				/>
				<MediaEditor
					editorState={editorState}
					addAudio={this.addAudio}
					addImage={this.addImage}
					addVideo={this.addVideo}
				/>
				<ColorEditor
					editorState={editorState}
					onToggle={this.toggleColor}
				/>
                {urlInput}
				<Button onClick={this.saveArticle}>保存</Button>
				<div className={className} onClick={this.focus}>
					<Editor
						blockStyleFn={this.getBlockStyle}
						customStyleMap={style}
						editorState={editorState}
						blockRendererFn={mediaBlockRenderer}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						onTab={this.onTab}
						placeholder="请输入"
						ref="editor"
						spellCheck={true}
					/>
				</div>
			</div>
		);
	}
}

function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
}

const Media = props => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
        media = <Audio src={src} />;
    } else if (type === 'image') {
        media = <Image src={src} />;
    } else if (type === 'video') {
        media = <Video src={src} />;
    }
    return media;
};

const Audio = props => {
    return <audio controls src={props.src} className="media" />;
};
const Image = props => {
    return <img src={props.src} className="media" alt=""/>;
};
const Video = props => {
    return <video controls src={props.src} className="media" />;
};

const style = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2
	},
	BOLD: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#f0f'
	},
	ITALIC: {
		fontStyle: 'italic',
		fontSize: '24',
		color: '#00f'
	}
};

export default Editors;
