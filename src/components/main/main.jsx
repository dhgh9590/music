import React from 'react';
import { useState } from 'react';
import Nav from '../nav/nav';
import styles from "./main.module.css";
import ReactPlayer from "react-player";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faCaretUp} from '@fortawesome/free-solid-svg-icons'

const Main = (props) => {
    let navigate = useNavigate();
    let uid = localStorage.getItem("uid");
    let userName = localStorage.getItem("userName");
    let [search,setSearch] = useState();
    let [heart,setHeart] = useState(0);
    let {heartState,setHeartState} = useState(true);
    let [heartEdit,setHeartEdit] = useState();

    //하트 정렬
    function heartNum(){
        let newData = props.data.sort(function(a,b){
            return b.heart - a.heart
          });
          props.setData(newData)
          setHeartEdit(newData)
    }

    //데이터 삭제 함수
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

    //데이터 검색 함수
    function onSearch(url,search){
        fetch(`http://localhost:8080/${url}`,{
            method: 'post',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({search : search})
        })
        .then(res => res.json())
        .then(data => {
            props.setData(data.posts)
        })
    }

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
        fetch('http://localhost:8080/heartEdit', {
            method: 'put',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({_id:id,heart:heart,heartUser:edit})
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
                    <div className={styles.search}>
                        <em>총 게시물 갯수 : {props.count}</em>
                        <form>
                            <input type="text" onChange={(e)=>{setSearch(e.target.value)}}/>
                            <button onClick={(e)=>{e.preventDefault();onSearch("search",search)}}>검색</button>
                            <button onClick={(e)=>{e.preventDefault();props.onData()}}>초기화</button>
                            <button onClick={(e)=>{e.preventDefault();heartNum();}}>좋아요<FontAwesomeIcon className={styles.upIcon} icon={faCaretUp} /></button>
                            <button onClick={(e)=>{e.preventDefault();onSearch("nameSearch",userName);}}>내 게시물 찾기</button>
                        </form>
                    </div>
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
                                            <div>
                                                <p>{item.time}</p>
                                                {
                                                    item.heartUser.includes(uid)?
                                                    <p><FontAwesomeIcon className={`${styles.heartIcon} ${styles.active}`} icon={faHeart} onClick={()=>{setHeart(item.heart -= 1);formBtt2(item._id,item.heart,item.heartUser)}}/>{item.heart}</p>
                                                    :<p><FontAwesomeIcon className={styles.heartIcon} icon={faHeart} onClick={()=>{setHeart(item.heart += 1);formBtt(item._id,item.heart,item.heartUser)}}/>{item.heart}</p>
                                                }
                                            </div>
                                            <div className={styles.user}>
                                                <div>
                                                    <img src={item.photo} alt="" />
                                                    <strong>{item.name}</strong>
                                                </div>
                                                {
                                                    item.uid == uid?
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