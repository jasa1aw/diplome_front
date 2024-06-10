'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import { useState,  useEffect} from "react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import {setError, LogIn} from "@/app/store/slices/authSlice"
export default function Login(){
    const currentUser = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.auth.error);

    const dispatch = useDispatch()
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    // useEffect(() => {
    //     if (currentUser) {
    //         router.push('/main');
    //     }
    // }, [currentUser, router]);
        
    const SignIn = () => {
        if(email.length > 0 && password.length > 0){
            dispatch(LogIn(email,password));
            router.push('/')
        }
    }
    return(
        <section className="login-page">
            <div className="leftImg">
                <img className="imgFit" src="/img/bg_login3.jpg" alt="not found" />
            </div>
            <div className="form">
                <h1>Вход</h1>
                <p>У вас еще нет аккаунта? <Link href={'/'} className="regLink">Регистрация</Link></p>
                <input type="text" className="input inputBox" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="passwordBox">
                    <input type={visible ? 'text' : 'password'} className="input passwordInput" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {visible ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "#6C7275", height: "21px", cursor: "pointer"}} onClick={() => setVisible(false)}/> : <FontAwesomeIcon icon={faEye} style={{color: "#6C7275", height: "21px", cursor: "pointer"}}  onClick={() => setVisible(true)}/> }
                </div>
                {error && <span>{error}</span>}
                <button className="button" onClick={SignIn}>Вход</button>
            </div>
        </section>
    )
}