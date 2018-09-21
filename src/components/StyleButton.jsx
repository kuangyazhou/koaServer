import React, { Component } from 'react';

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
    let cls = this.props.class? this.props.class: '';
    return (
      <span className={`${className} ${cls}`} onMouseDown={this.onToggle}>
        {this.props.label?this.props.label: ' '}
      </span>
    );
  }
}

export default StyleButton
