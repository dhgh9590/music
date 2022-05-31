import React from 'react';
import { useState } from 'react';
import Nav from '../nav/nav';
import styles from "./main.module.css";
import ReactPlayer from "react-player";
import { useNavigate } from 'react-router-dom';

const Main = (props) => {
    let navigate = useNavigate();
    let uid = localStorage.getItem("uid");

    function formDelete(id){
        fetch(`http://localhost:8080/delete`, {
            method: 'delete',	
            headers: {
            "Content-Type": "application/json; charset=utf-8"	
            },
            body: JSON.stringify({_id : id, uid : uid})
        })
        setTimeout(()=>{
            props.setCount(0)
        },100)
    }

    return (
        <div>
            <Nav setEmailCheck={props.setEmailCheck}></Nav>
            <section className={styles.section1}>
                <div className={styles.container}>
                    <em>총 게시물 갯수 : {props.count}</em>
                    <ul>
                        {
                            props.data && props.data.map((item,index) => {
                                return(
                                    <li key={index}>
                                        <div className={styles.movie}>
                                            <ReactPlayer
                                                className="player"
                                                url={item.url}
                                                width="100%"
                                                height="100%"
                                                playing={false}
                                                muted={false}
                                                controls={true}
                                            />
                                        </div>
                                        <div className={styles.text}>
                                            <em>{item.title}</em>
                                            <p>{item.time}</p>
                                            <div className={styles.user}>
                                                <div>
                                                    <img src={item.photo} alt="" />
                                                    <strong>{item.name}</strong>
                                                </div>
                                                {
                                                    item.uid == uid ?
                                                    <div className={styles.btt}>
                                                        <button onClick={()=>{props.setCorrection(item);navigate('/Correction')}}>수정</button>
                                                        <button onClick={()=>{formDelete(item._id)}}>삭제</button>
                                                    </div>
                                                    :null
                                                }
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
            <div className={styles.add}>
                <button onClick={()=>{navigate('/Edit')}}>글작성</button>
            </div>
        </div>
    );
};

export default Main;