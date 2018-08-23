import React, { Component } from 'react';
import {Button} from 'antd';

import {
    // Editor,
    // RichUtils,
    // AtomicBlockUtils,
    // EditorState,
    convertToRaw
} from 'draft-js';

class MediaEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            urlType: ''
        };
        this.logState = () => {
            const content = this.props.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };
    }
    
    render() {
        const {addAudio, addImage, addVideo} =this.props;
        return (
            <div className="media-container">
                <div>
                    <Button onMouseDown={addAudio} style={{ marginRight: 10 }}>
                        添加音频
                    </Button>
                    <Button onMouseDown={addImage} style={{ marginRight: 10 }}>
                        添加图片
                    </Button>
                    <Button onMouseDown={addVideo} style={{ marginRight: 10 }}>
                        添加视频
                    </Button>
                </div>
            </div>
        );
    }
}
// function mediaBlockRenderer(block) {
//     if (block.getType() === 'atomic') {
//         return {
//             component: Media,
//             editable: false
//         };
//     }
//     return null;
// }
// const Audio = props => {
//     return <audio controls src={props.src} style={styles.media} />;
// };
// const Image = props => {
//     return <img src={props.src} style={styles.media} alt={props.src}/>;
// };
// const Video = props => {
//     return <video controls src={props.src} style={styles.media} />;
// };
// const Media = props => {
//     const entity = props.contentState.getEntity(props.block.getEntityAt(0));
//     const { src } = entity.getData();
//     const type = entity.getType();
//     let media;
//     if (type === 'audio') {
//         media = <Audio src={src} />;
//     } else if (type === 'image') {
//         media = <Image src={src} />;
//     } else if (type === 'video') {
//         media = <Video src={src} />;
//     }
//     return media;
// };

export default MediaEditor;
