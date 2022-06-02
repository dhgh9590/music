import './reset.css';
import './App.css';
import {Route, Routes,useNavigate,Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import Login from './components/login/login';
import Main from './components/main/main';
import Edit from './components/edit/edit';
import Correction from './components/correction/correction';
import Detail from './components/detail/detail';
import Nav from './components/nav/nav';

function App() {
  let navigate = useNavigate();
  let [emailCheck,setEmailCheck] = useState(false);
  let [data,setData] = useState();
  let [count,setCount] = useState();
  let [correction,setCorrection] = useState();
  let [itemData,setItemData] = useState();


  function onData(){
    fetch(`https://music-352019.du.r.appspot.com/data`)
      .then(res => res.json())
      .then(data => {
        setData(data.posts.sort(function(a,b){
          return b._id - a._id
        }));
        setCount(data.posts.length);
      })
  }


  useEffect(()=>{
    onData();
  },[count])

  /* 로그인 기능 */
  function goToHome(user){
    navigate('/');
    //console.log(user);
    localStorage.setItem("emailCheck",user.emailVerified);
    localStorage.setItem("photoURL",user.photoURL);
    localStorage.setItem("userName",user.displayName);
    localStorage.setItem("uid",user.uid);
    loginCheck();
  };

  /* 로컬스토리지 체크 */
  function loginCheck(){
    let getLocalEmail = localStorage.getItem("emailCheck");

    //로컬 스토리지에 emailCheck 있다면 setEmailCheck을 true / 없다면 false
    if(getLocalEmail){
      setEmailCheck(true)
    }else{
      setEmailCheck(false)
    }
  }

  return (
    <div className="App">
      {
        localStorage.getItem("emailCheck") ? <Nav setEmailCheck={setEmailCheck}></Nav> : null
      }
      <Routes>
        <Route path='/' element={localStorage.getItem("emailCheck") ? <Main data={data} setData={setData} onData={onData} count={count} setCount={setCount} setCorrection={setCorrection} setItemData={setItemData}></Main> : <Login goToHome={goToHome}></Login>}></Route>
        <Route path='/edit' element={<Edit setEmailCheck={setEmailCheck} setCount={setCount}></Edit>}></Route>
        <Route path='/correction' element={<Correction setEmailCheck={setEmailCheck} setCount={setCount} correction={correction}></Correction>}></Route>
        <Route path='/detail/:id' element={<Detail itemData={itemData}></Detail>}></Route>
      </Routes>
    </div>
  );
}

export default App;
