import React from 'react';
import styles from "./edit.module.css";
import Nav from '../nav/nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Edit = (props) => {

    let navigate = useNavigate();
    let [title,setTitle] = useState();
    let [url,setUrl] = useState();
    let uid = localStorage.getItem("uid");
    let userName = localStorage.getItem("userName");
    let userPhoto = localStorage.getItem("photoURL");
    let [time,setTime] = useState(``);

    function timer(){
        let date = new Date();
        let getYear = date.getFullYear();
        let month = date.getMonth() + 1;
        let getDate = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        setTime(`${getYear}년${month}월${getDate}일`);
    }

    function onFormSend(){
        fetch('http://localhost:8080/add', {	
            method: 'post',
            headers: {
            "Content-Type": "application/json; charset=utf-8"	
            },
            body: JSON.stringify({title:title,url:url,uid:uid,time:time,name:userName,photo:userPhoto,heart:0,heartUser:[]})
        })
        setTimeout(()=>{
            props.setCount(0)
        },0)
        navigate('/') 
    }

    useEffect(()=>{
        timer();
    },[])

    return (
        <div>
            <Nav setEmailCheck={props.setEmailCheck}></Nav>
            <section className={styles.section1}>
                <div className={styles.container}>
                    <form className={styles.form}>
                        <div>
                            <input className={styles.title} type="text" placeholder='노래 제목을 입력 해주세요' onChange={(e)=>{setTitle(e.target.value)}}/>
                        </div>
                        <div>
                            <input className={styles.url} type="text" placeholder='유튜브 URL을 입력 해주세요' onChange={(e)=>{setUrl(e.target.value)}}/>
                        </div>
                        <button onClick={(e)=>{e.preventDefault(); title == undefined || url == undefined ? alert("값을 입력해주세요") : onFormSend();}}>글작성</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Edit;