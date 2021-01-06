import React from 'react';
import styles from './VideoInfo.module.css';


const VideoInfo = (props) => {
    return (
        <div className={styles.info}>
            <img 
                src={props.item ? props.item.channelThumbnails : ''}
                alt=""
                className={styles.channelThumbnails}
            />

            <div>
                <div className={styles.title}>
                    {props.item ? props.item.title : ''}
                </div>
                <div className={styles.channel}>
                    {props.item ? props.item.channelTitle : ''}
                </div>
            </div>
        </div>
    );
}

export default VideoInfo;