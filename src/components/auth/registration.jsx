'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation';
export default function Registration(){
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const SignUp = () => {
        if(phone.length > 0 && fullName.length > 0 && password.length > 0){
            dispatch(SignUp(phone, fullName, password));
            router.push('/login')
        }
    }
    return(
        <section className="login-page">
            <div className="leftImg">
                <img className="imgFit" src="/img/login.svg" alt="not found" />
            </div>
            <div className="form">
                <h1>Регистрация</h1>
                <p>У вас уже есть аккаунт? <Link href={'/login'} className="regLink">Войти</Link></p>
                <input type="text" className="input inputBox" placeholder="Введите ваше ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                <input type="text" className="input inputBox" placeholder="Введите номер" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <div className="passwordBox">
                    <input type={visible ? 'text' : 'password'} className="input passwordInput" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {visible ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "#6C7275", height: "21px", cursor: "pointer"}} onClick={() => setVisible(false)}/> : <FontAwesomeIcon icon={faEye} style={{color: "#6C7275", height: "21px", cursor: "pointer"}}  onClick={() => setVisible(true)}/> }
                </div>
                <button className="button">Регистрация</button>
            </div>
        </section>
    )
}