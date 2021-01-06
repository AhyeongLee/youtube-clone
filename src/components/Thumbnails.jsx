import React, { Component, useState } from 'react';
import styles from './Thumbnails.module.css';
import Thumbnail from './Thumbnail';

const Thumnails = (props) => {
    const handlePlay = (e) => {
        props.onPlay(e);

    };

    return (
        <>              
            <ul className={styles.list}>
                {props.items.map(item => {
                    return (
                        <Thumbnail onPlay={handlePlay} item={item}/>
                    );
                })}
            </ul>
        </>
    );
    
}

export default Thumnails;