import React, { Component } from 'react';

import {
    convertToRaw
} from 'draft-js';

class MediaEditor extends Component {
    constructor(props) {
        super(props);
        this.logState = () => {
            const content = this.props.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };
    }
    
    render() {
        let className = 'RichEditor-styleButton';
        const {addAudio, addImage, addVideo} =this.props;
        return (
            <span className="media-container">
                {MEDIA_STYLES.map(type => {
                    return(
                        <span 
                            key={type.label}
                            className={`${className} ${type.style}`}
                            onMouseDown={type.event}
                            style={{ marginRight: 10 }}>
                        </span>
                    )
                })}
            </span>
        );
    }
}

const MEDIA_STYLES = [
    { label: '添加音频', style: 'iconfont icon-music', event: 'addAudio' },
    { label: '添加图片', style: 'iconfont icon-pictureo', event: 'addImage' },
    { label: '添加视频', style: 'iconfont icon-youtubeplay', event: 'addVideo' }
];

export default MediaEditor;
