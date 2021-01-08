import React, { Component, memo, useState } from 'react';
import styles from './Thumbnails.module.css';
import Thumbnail from '../thumbnail/Thumbnail';

const Thumnails = memo((props) => {
    const handlePlay = (e) => {
        props.onPlay(e);

    };

    return (
        <>              
            <ul className={styles.list}>
                {props.items.map(item => {
                    return (
                        <Thumbnail onPlay={handlePlay} key={item.id} item={item}/>
                    );
                })}
            </ul>
        </>
    );
    
});

export default Thumnails;