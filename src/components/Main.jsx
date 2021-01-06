import React from 'react';
import Player from './Player';
import Thumnails from './Thumbnails';
import styles from './Main.module.css';

const Main = (props) => {
    const handlePlay = (e) => {
        props.onPlay(e);
    };

    return (
        <div className={styles.main}>
            <Player 
                player={props.player}
                isPlayerOpened={props.isPlayerOpened}
                />
            <Thumnails 
                player={props.player} 
                onPlay={handlePlay} 
                items={props.items} />
        </div>
    );
}

export default Main;