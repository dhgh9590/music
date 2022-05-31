import React from 'react';
import styles from "./login.module.css";
import AuthService from '../../service/auth_service';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const authService = new AuthService();

    /* onLogin은 로그인 버튼이 있는곳에서 작성 / authService도 같이 복사 */
    function onLogin(event){
      authService.login()//클릭한 녀석의 텍스트를 가지고와서 매개변수로 넘겨줌
        .then((data)=>{props.goToHome(data.user)})//로그인시 goToHome 실행
        
    };

    return (
        <div>
            <section className={styles.section1}>
                <div className={styles.login_box}>
                    <div className={styles.wrap}>
                        <h2>LOGIN</h2>
                        <p>Enter your credentials to acces your account.</p>
                        <button className={styles.loginBtt} onClick={()=>{onLogin()}}><img src={`${process.env.PUBLIC_URL}/img/google_icon.png`} alt="" /><em>Log In with Google</em></button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;