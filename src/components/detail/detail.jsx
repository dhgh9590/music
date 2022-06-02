import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./detail.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faCaretUp} from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from "react-player";
import { useEffect } from 'react';

const Detail = (props) => {

    let [data,setData] = useState(props.itemData);
    let uid = localStorage.getItem("uid");
    let name = localStorage.getItem("userName");
    let photo = localStorage.getItem("photoURL");
    let [heart,setHeart] = useState(0);
    let {heartState,setHeartState} = useState(true);
    let [heartEdit,setHeartEdit] = useState();
    let [inputComment,setInputComment] = useState();
    let [time,setTime] = useState(``);
    let [comment,setComment] = useState();
    let [commentNum,setCommentNum] = useState(0);
    let [commentValue,setCommentValue] = useState(inputComment);

    console.log(comment)

    //시간 저장
    function timer(){
        let date = new Date();
        let getYear = date.getFullYear();
        let month = date.getMonth() + 1;
        let getDate = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        setTime(`${getYear}년${month}월${getDate}일 - ${hours}:${minutes}:${seconds}`);
    }

    //댓글 서버에 저장
    function onComment(){
        fetch('https://music-352019.du.r.appspot.com/comment', {	
            method: 'post',
            headers: {
            "Content-Type": "application/json; charset=utf-8"	
            },
            body: JSON.stringify({id:data._id,uid:uid,name:name,photo:photo,comment:inputComment,time:time})
        });
        setTimeout(()=>{
            setCommentNum(-0)
        },200)
    }

    //서버에 있는 댓글 가지고 오기
    function commentAdd(){
        fetch('https://music-352019.du.r.appspot.com/commentData', {	
            method: 'post',
            headers: {
            "Content-Type": "application/json; charset=utf-8"	
            },
            body: JSON.stringify({id:data._id})
        })
        .then(res => res.json())
        .then(data =>{
            setComment(data.comment)
            setCommentNum(data.comment.length)
        })
    }
    //서버에 있는 댓글 삭제
    function commentDelete(id){
        fetch(`https://music-352019.du.r.appspot.com/commentDelete`, {
            method: 'delete',	
            headers: {
            "Content-Type": "application/json; charset=utf-8"	
            },
            body: JSON.stringify({_id:id,uid : uid})
        });
        setTimeout(()=>{
            setCommentNum(-0)
        },200)
    }

    useEffect(()=>{
        timer();
        commentAdd();
    },[commentNum]);

    //하트 숫자 더하기 수정 함수
    function formBtt(id,heart,heartUser){
        let copy = [...heartUser]
        copy.push(uid)
        copy = new Set(copy)
        copy= Array.from(copy)
        editHeart(id,heart,heartUser,copy)
    }
    //하트 숫자 빼기 수정 함수
    function formBtt2(id,heart,heartUser){
        let copy = [...heartUser]
        let newCopy = copy.filter((item)=>{ return item !== uid})
        editHeart(id,heart,heartUser,newCopy)
    }
    //하트 ajax 요청
    function editHeart(id,heart,heartUser,edit){
        fetch('https://music-352019.du.r.appspot.com/heartEdit', {
            method: 'put',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({_id:id,heart:heart,heartUser:edit})
        });

    }

    return (
        <div>
            <section className={styles.section1}>
                <div className={styles.container}>
                    <div className={styles.text_box}>
                        <h2>{data.title}</h2>
                        <div className={styles.sub_title}>
                            <ul>
                                <li>
                                    <div className={styles.user_img}>
                                        <img src={data.photo} alt="" />
                                    </div>
                                </li>
                                <li><em>{data.name}</em></li>
                                <li><strong>{data.time}</strong></li>
                            </ul>
                            <span>
                                {
                                    data.heartUser.includes(uid)?
                                    <p><FontAwesomeIcon className={`${styles.heartIcon} ${styles.active}`} icon={faHeart} onClick={()=>{setHeart(data.heart -= 1);formBtt2(data._id,data.heart,data.heartUser)}}/>{data.heart}</p>
                                    :<p><FontAwesomeIcon className={styles.heartIcon} icon={faHeart} onClick={()=>{setHeart(data.heart += 1);formBtt(data._id,data.heart,data.heartUser)}}/>{data.heart}</p>
                                }
                            </span>
                        </div>
                        <span className={styles.line}></span>
                        <div className={styles.movie}>
                            <ReactPlayer
                                className="player"
                                url={data.url}
                                width="100%"
                                height="100%"
                                playing={false}
                                muted={false}
                                controls={true}
                            />
                        </div>
                        <span className={styles.line}></span>
                        <div className={styles.input_box}>
                            <textarea rows="3" value={commentValue} onClick={(e)=>{setCommentValue()}} onChange={(e)=>{setInputComment(e.target.value)}}></textarea>
                            <button onClick={()=>{onComment(); setCommentValue(``);}}>댓글 작성</button>
                        </div>
                        <span className={styles.line}></span>
                        <div className={styles.comment_wrap}>
                            <em>댓글 갯수 : {commentNum}</em>
                            <ul>
                                {
                                    comment && comment.map((item,index)=>{
                                        return(
                                            <li>
                                                <div className={styles.comment}>
                                                    <div className={styles.comment_user}>
                                                        <div className={styles.img}>
                                                            <img src={item.photo} alt="" />
                                                        </div>
                                                        <em>{item.name}</em>
                                                        <p>{item.time}</p>
                                                    </div>
                                                    {
                                                        item.uid == uid?
                                                        <div className={styles.comment_delete}>
                                                            <button onClick={()=>{commentDelete(item._id)}}>삭제</button>
                                                        </div>
                                                        :null
                                                    }
                                                </div>
                                                <div className={styles.comment_content}>
                                                    <p>{item.comment}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Detail;