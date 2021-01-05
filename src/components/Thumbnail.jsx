import React, { Component } from 'react';
import styles from './Thumbnail.module.css';

const Tumbnail = (props) => {
    
    return (
        <>
            <li>
                <img 
                src={props.item ? props.item.snippet.thumbnails.medium.url : ''} 
                alt=""
                className={styles.img}
                />
                <span className={styles.title}>
                    {props.item ? props.item.snippet.title : ''}
                </span>
            </li>
        </>
    );
    
}

export default Tumbnail;