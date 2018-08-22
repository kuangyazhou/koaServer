import React, { Component } from 'react';

class ColorEditor extends Component {
	
	render() {
		const { editorState, onToggle } = this.props;
		return (
			<span style={styles.controls}>
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
		this.onToggle = e => {
		  e.preventDefault();
		  this.props.onToggle(this.props.style);
		};
	}
	render() {
		let style = { ...styles.styleButton, ...styles[this.props.style] };
		return (
			<span style={style} onMouseDown={this.onToggle}></span>
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

const styles = {
	controls: {
		fontFamily: "'Helvetica', sans-serif",
		fontSize: 14,
		marginBottom: 10,
		userSelect: 'none'
	},
	styleButton: {
		width: 15,
		height: 15,
		display: 'inline-block',
		color: '#999',
		cursor: 'pointer',
		marginRight: 10,
	},
	red: {
		backgroundColor: 'rgba(255, 0, 0, 1.0)'
	},
	orange: {
		backgroundColor: 'rgba(255, 127, 0, 1.0)'
	},
	yellow: {
		backgroundColor: 'rgba(180, 180, 0, 1.0)'
	},
	green: {
		backgroundColor: 'rgba(0, 180, 0, 1.0)'
	},
	blue: {
		backgroundColor: 'rgba(0, 0, 255, 1.0)'
	},
	indigo: {
		backgroundColor: 'rgba(75, 0, 130, 1.0)'
	},
	violet: {
		backgroundColor: 'rgba(127, 0, 255, 1.0)'
	}
};

export default ColorEditor;
