import React, { Component } from 'react';
import {Button} from 'antd';

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
        const {addAudio, addImage, addVideo} =this.props;
        return (
            <span className="media-container">
                <Button onMouseDown={addAudio} style={{ marginRight: 10 }}>
                    添加音频
                </Button>
                <Button onMouseDown={addImage} style={{ marginRight: 10 }}>
                    添加图片
                </Button>
                <Button onMouseDown={addVideo} style={{ marginRight: 10 }}>
                    添加视频
                </Button>
            </span>
        );
    }
}

export default MediaEditor;
