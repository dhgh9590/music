import './reset.css';
import './App.css';
import {Route, Routes,useNavigate,Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import Login from './components/login/login';
import Main from './components/main/main';
import Edit from './components/edit/edit';
import Correction from './components/correction/correction';

function App() {
  let navigate = useNavigate();
  let [emailCheck,setEmailCheck] = useState(false);
  let [data,setData] = useState();
  let [count,setCount] = useState();
  let [correction,setCorrection] = useState();

  useEffect(()=>{
    fetch(`http://localhost:8080/data`)
      .then(res => res.json())
      .then(data => {
        setData(data.posts.sort(function(a,b){
          return b._id - a._id
        }));
        setCount(data.posts.length);
      })
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
      <Routes>
        <Route path='/' element={localStorage.getItem("emailCheck") ? <Main setEmailCheck={setEmailCheck} data={data} count={count} setCount={setCount} setCorrection={setCorrection}></Main> : <Login goToHome={goToHome}></Login>}></Route>
        <Route path='/edit' element={<Edit setEmailCheck={setEmailCheck} setCount={setCount}></Edit>}></Route>
        <Route path='/correction' element={<Correction setEmailCheck={setEmailCheck} setCount={setCount} correction={correction}></Correction>}></Route>
      </Routes>
    </div>
  );
}

export default App;
