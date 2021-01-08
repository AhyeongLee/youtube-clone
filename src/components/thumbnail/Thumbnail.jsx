import React, { Component, memo } from 'react';
import styles from './Thumbnail.module.css';
import VideoInfo from '../video_info/VideoInfo';


const Tumbnail = memo(({ item, onPlay }) => {

    const handlePlay = (e) => {
        onPlay(e);
    };
    
    return (
        <>
            <li id={item ? item.id : ''} onClick={handlePlay}>
            
                <img 
                src={item ? item.thumbnails.maxres ? item.thumbnails.maxres.url : item.thumbnails.medium.url : ''} 
                alt=""
                className={styles.thumbnails}
                />
                <VideoInfo item={item}/>
            </li>
        </>
    );
    
});

export default Tumbnail;