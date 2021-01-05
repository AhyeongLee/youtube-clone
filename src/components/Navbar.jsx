import React, { Component } from 'react';
import styles from './Navbar.module.css';

class Navbar extends Component {
    render() {
        return (
            <nav className={styles.nav}> 
                <div className={styles.logoContainer}>
                    <img className={styles.icon} src="/images/youtube_icon.png" alt="youtube icon"/>
                    <span className={styles.logo}>YouTube</span>
                </div>
                <div className={styles.searchContainer}>
                    <input className={styles.searchInput} type="text" placeholder="검색" />
                    <div className={styles.searchBtn}><i className="fas fa-search"></i></div>
                </div>
                <div className={styles.user}>
                    <i className="fas fa-user"></i>
                </div>   
            </nav>
        );
    }
}

export default Navbar;