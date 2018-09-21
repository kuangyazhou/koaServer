import React, { Component } from 'react';

class ColorEditor extends Component {
	
	render() {
		const { editorState, onToggle } = this.props;
		return (
			<span>
				{COLORS.map(type => (
					<StyleButton
						key={type.label}
						editorState={editorState}
						label={type.label}
						onToggle={onToggle}
						style={type.style}
					/>
				))}
			</span>
    	);
	}
}
class StyleButton extends Component {
	constructor(props) {
		super(props);
		this.onToggle = (e) => {
		  e.preventDefault();
		  this.props.onToggle(this.props.style);
		};
	}
	render() {
		let style = 'color-block ' + this.props.style;
		return (
			<span className={style} onMouseDown={this.onToggle}></span>
		);
	}
}
var COLORS = [
	{ label: '红', style: 'red' },
	{ label: '橙', style: 'orange' },
	{ label: '黄', style: 'yellow' },
	{ label: '绿', style: 'green' },
	{ label: '蓝', style: 'blue' },
	{ label: '靛', style: 'indigo' },
	{ label: '紫', style: 'violet' }
];

export default ColorEditor;
