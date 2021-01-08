import React, { createRef, memo, useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = memo(({ onSearch }) => {
    const inputRef = React.createRef();

    const handleSearch = (e) => {
        e.preventDefault();
        const keyword = inputRef.current.value;
        onSearch(keyword);

    };
    const handleLogoClick = () => {
        window.location = '/';
    };
    
    return (
        <nav className={styles.nav}> 
            <div 
                className={styles.logoContainer}
                onClick={handleLogoClick}>
                <img className={styles.icon} src="/images/youtube_icon.png" alt="youtube icon"/>
                <span className={styles.logo}>YouTube</span>
            </div>
            <form className={styles.searchContainer} onSubmit={handleSearch}>
                <input ref={inputRef} className={styles.searchInput} type="text" placeholder="검색" />
                <button className={styles.searchBtn}><i className="fas fa-search"></i></button>
            </form>
            <div className={styles.user}>
                <i className="fas fa-user"></i>
            </div>   
        </nav>
    );
    
});

export default Navbar;