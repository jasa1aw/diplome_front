'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation';
export default function Login(){
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    return(
        <section className="login-page">
            <div className="leftImg">
                <img className="imgFit" src="/img/login.svg" alt="not found" />
            </div>
            <div className="form">
                <h1>Вход</h1>
                <p>У вас еще нет аккаунта? <Link href={'/'} className="regLink">Регистрация</Link></p>
                <input type="text" className="input inputBox" placeholder="Введите номер" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <div className="passwordBox">
                    <input type={visible ? 'text' : 'password'} className="input passwordInput" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {visible ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "#6C7275", height: "21px", cursor: "pointer"}} onClick={() => setVisible(false)}/> : <FontAwesomeIcon icon={faEye} style={{color: "#6C7275", height: "21px", cursor: "pointer"}}  onClick={() => setVisible(true)}/> }
                </div>
                <button className="button">Вход</button>
            </div>
        </section>
    )
}