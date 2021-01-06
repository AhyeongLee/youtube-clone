import React from 'react';
import styles from './Player.module.css';

const Player = (props) => {
    return (
        <div className={props.isPlayerOpened ? styles.container.open : styles.container}>   
            <div className={styles.video}>
                <iframe
                    className={styles.iframe}
                    src={props.player.url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen> 
                </iframe>
            </div>
            
            <div className={styles.title}>{props.player.title}</div>
            <div className={styles.contour}></div>
            <div className={styles.description}>{props.player.description}</div>
        </div>

    );
}

export default Player;