import React, { Component } from 'react';
import styles from './Thumbnail.module.css';
import VideoInfo from './VideoInfo';


const Tumbnail = (props) => {

    const handlePlay = (e) => {
        props.onPlay(e);
    };
    
    return (
        <>
            <li id={props.item ? props.item.id : ''} onClick={handlePlay}>
            
                <img 
                src={props.item ? props.item.thumbnails.maxres ? props.item.thumbnails.maxres.url : props.item.thumbnails.medium.url : ''} 
                alt=""
                className={styles.thumbnails}
                />
                <VideoInfo item={props.item}/>
            </li>
        </>
    );
    
}

export default Tumbnail;