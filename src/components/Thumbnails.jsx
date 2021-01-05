import React, { Component } from 'react';
import styles from './Thumbnails.module.css';
import Thumbnail from './Thumbnail';




const Thumnails = (props) => {
    return (
        <ul className={styles.list}>
            {props.items.map(item => {
                return (
                    <Thumbnail item={item}/>
                );
            })}
        </ul>
    );
    
}

export default Thumnails;