'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from "react-redux";
// import { logOut, SignUp, authorize } from "@/app/store/slices/authSlice";

export default function Registration(){
    // const isAuth = useSelector((state) => state.auth.isAuth)
    // const dispatch = useDispatch()
    const router = useRouter()
    // w664Lod-
    const [email, setEmail] = useState("");
    const [full_name, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (str) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    }
    const validatePassword = (str) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(str);
    }
    
    // const Register = () => {
    //     if(email.length > 0 && full_name.length > 0 && password.length > 0){
    //         if(!validateEmail(email)){
    //             setError("Неверный электронный адрес")
    //             setEmail('')
    //             setPassword('')
    //         }else if(!validatePassword(password)){
    //             setError("Ненадежный пароль")
    //             setEmail('')
    //             setPassword('')
    //         }else{
    //             setError('')
    //             dispatch(SignUp(email, full_name, password));
    //             router.push('/login')
    //         }
    //     }
    // }
    const Register = () => {
        router.push('/login')
    }


    // useEffect(() => {
    //     if(isAuth) router.push('/main')
    //     // else dispatch(logOut());    
    // }, [isAuth])
    
    return(
        <section className="login-page">
            <div className="leftImg">
                <img className="imgFit" src="/img/login.svg" alt="not found" />
            </div>
            <div className="form">
                <h1>Регистрация</h1>
                <p>У вас уже есть аккаунт? <Link href={'/login'} className="regLink">Войти</Link></p>
                <input type="text" className="input inputBox" placeholder="Введите ФИО" value={full_name} onChange={(e) => setFullName(e.target.value)}/>
                <input type="text" className="input inputBox" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="passwordBox">
                    <input type={visible ? 'text' : 'password'} className="input passwordInput" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {visible ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "#6C7275", height: "21px", cursor: "pointer"}} onClick={() => setVisible(false)}/> : <FontAwesomeIcon icon={faEye} style={{color: "#6C7275", height: "21px", cursor: "pointer"}}  onClick={() => setVisible(true)}/> }
                </div>
                {error && <span>{error}</span>}
                <button className="button" onClick={Register}>Регистрация</button>
            </div>
        </section>
    )
}