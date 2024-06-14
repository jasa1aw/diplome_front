'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "@/app/store/slices/authSlice"
export default function Login(){
    const error = useSelector(state => state.auth.error);
    const dispatch = useDispatch()
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    
    const [logError, setLogError] = useState('');

    const validateEmail = (str) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    }
    const validatePassword = (str) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(str);
    }
        
    const SignIn = () => {
        if(email.length > 0 && password.length > 0){
            if(!validateEmail(email)){
                setLogError("Неверный электронный адрес")
                setEmail('')
                setPassword('')
            }else if(!validatePassword(password)){
                setLogError("Ненадежный пароль")
                setEmail('')
                setPassword('')
            }else{
                setLogError('')
                dispatch(LogIn(email,password));
                router.push('/main')
            }
        }
    }

    return(
        <section className="login-page">
            <div className="leftImg">
                <img className="imgFit" src="/img/bg_login3.jpg" alt="not found" />
            </div>
            <div className="form">
                <h1>Вход</h1>
                <input type="text" className="input inputBox" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="passwordBox">
                    <input type={visible ? 'text' : 'password'} className="input passwordInput" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {visible ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "#6C7275", height: "21px", cursor: "pointer"}} onClick={() => setVisible(false)}/> : <FontAwesomeIcon icon={faEye} style={{color: "#6C7275", height: "21px", cursor: "pointer"}}  onClick={() => setVisible(true)}/> }
                </div>
                {error && <span>{error}</span>}
                {logError && <span>{logError}</span>}
                <button className="button" onClick={SignIn}>Вход</button>
            </div>
        </section>
    )
}