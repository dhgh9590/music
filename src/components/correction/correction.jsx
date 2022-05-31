import React from 'react';
import styles from './correction.module.css';
import Nav from '../nav/nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Correction = (props) => {
    let navigate = useNavigate();
    let [title,setTitle] = useState();
    let [url,setUrl] = useState();
    let uid = localStorage.getItem("uid");
    let userName = localStorage.getItem("userName");
    let userPhoto = localStorage.getItem("photoURL");
    let [titleValue,setTitleValue] = useState(props.correction.title);
    let [urlValue,setUrlValueValue] = useState(props.correction.url);

    //데이터 수정 함수
    function formBtt(){
        fetch('http://localhost:8080/edit', {
            method: 'put',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({_id:props.correction._id,title:title,url:url})
        });
        setTimeout(()=>{
            navigate('/');
            props.setCount(0);
        },100)
    }

    return (
        <div>
            <Nav setEmailCheck={props.setEmailCheck}></Nav>
            <section className={styles.section1}>
                <div className={styles.container}>
                    <form className={styles.form}>
                        <div>
                            <input className={styles.title} type="text" placeholder='노래 제목을 입력 해주세요' value={titleValue}  onChange={(e)=>{setTitleValue(e.target.value);setTitle(e.target.value)}}/>
                        </div>
                        <div>
                            <input className={styles.url} type="text" placeholder='유튜브 URL을 입력 해주세요' value={urlValue} onChange={(e)=>{setUrlValueValue(e.target.value);setUrl(e.target.value)}}/>
                        </div>
                        <button onClick={(e)=>{e.preventDefault(); title == undefined || url == undefined ? alert("값을 입력해주세요") : formBtt();}}>글작성</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Correction;