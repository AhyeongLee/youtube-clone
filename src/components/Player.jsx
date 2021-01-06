import React from 'react';
import styles from './Player.module.css';

const Player = (props) => {
    const descriptionRef = React.createRef();
    const shortRef = React.createRef();
    const moreRef = React.createRef();
    const lessRef = React.createRef();

    const handleMore = () => {
        descriptionRef.current.style.display = 'block';
        lessRef.current.style.display = 'block';
        shortRef.current.style.display = 'none';
        moreRef.current.style.display = 'none';
        
    };

    const handleLess = () => {
        descriptionRef.current.style.display = 'none';
        lessRef.current.style.display = 'none';
        shortRef.current.style.display = 'block';
        moreRef.current.style.display = 'block';
    }

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
            <div 
                className={styles.short}
                ref={shortRef}>{props.player.description.slice(0,100)+'...'}
            </div>
            <div
                ref={moreRef} 
                className={styles.more} 
                onClick={handleMore}>더보기
            </div>
            <div 
                ref={descriptionRef}
                className={styles.description}>{props.player.description}
            </div>
            <div
                ref={lessRef} 
                className={styles.less} 
                onClick={handleLess}>접기
            </div>
        </div>

    );
}

export default Player;