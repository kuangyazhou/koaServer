import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { BlockStyleControls, InlineStyleControls } from './StyleControls';
import ColorEditor from './ColorEditor';
import {Button} from 'antd';
import request from "@/utils/axios";
import '@/style/editors.less';

class Editors extends Component {
	constructor(props) {
		super(props);
		// 默认给一个empty的editorstate
		this.state = {
			editorState: EditorState.createEmpty(),
			logState: null
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
				<ColorEditor
					editorState={editorState}
					onToggle={this.toggleColor}
				/>
				<Button className="" onClick={this.saveArticle}>保存</Button>
				<div className={className} onClick={this.focus}>
					<Editor
						blockStyleFn={this.getBlockStyle}
						customStyleMap={style}
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
		);
	}
}

const style = {
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

export default Editors;
