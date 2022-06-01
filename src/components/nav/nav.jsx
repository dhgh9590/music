import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './nav.module.css';

const Nav = (props) => {
    let navigate = useNavigate();
    let userPhoto = localStorage.getItem("photoURL");
    let userName = localStorage.getItem("userName");

    return (
        <div>
            <div className={styles.nav_wrap}>
                <nav className={styles.nav}>
                    <ul>
                        <li onClick={()=>{navigate('/')}}><em>Home</em></li>
                        <li>
                            <div className={styles.user_photo}>
                                <img src={userPhoto} alt="" />
                            </div>
                            <div className={styles.user}>
                                <strong>{userName} 님</strong>
                                <em onClick={()=>{localStorage.removeItem("emailCheck");props.setEmailCheck(false);navigate('/')}}>LOGOUT</em>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Nav;