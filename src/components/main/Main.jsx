import React from 'react';
import Player from '../player/Player';
import Thumnails from '../thumbnails/Thumbnails';
import styles from './Main.module.css';

const Main = (props) => {
    const handlePlay = (e) => {
        props.onPlay(e);
    };

    return (
        <div className={styles.main}>
            {props.isPlayerOpened ? <Player player={props.player}/> : null}
            
            <Thumnails 
                player={props.player} 
                onPlay={handlePlay} 
                items={props.items} />
        </div>
    );
}

export default Main;