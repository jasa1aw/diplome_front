'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { logOut } from "@/app/store/slices/authSlice";
export default function Header(){
    const currentUser = useSelector(state => state.auth.currentUser);
    const router = useRouter()
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = useState(false)
    const routeToAdmin = () =>{
        router.push('/admin')
    }
    const LogOut = () =>{
        dispatch(logOut())
        router.push('/login')
    }
    return(
        <header>
            <Link href={'/main'} className="h4">Ferm Zone</Link>
            {currentUser && !currentUser.isAdmin &&
                <div className="userNavigate">
                    <Link href={'/cart'}><FontAwesomeIcon icon={faBagShopping} style={{color: "#141718", height: "35px", cursor: "pointer"}}/></Link>
                    <FontAwesomeIcon icon={faCircleUser} style={{color: "#141718", height: "35px", cursor: "pointer"}} onClick={() => setDropdown(!dropdown)}/>  
                </div>
            }
            {currentUser && currentUser.isAdmin &&
                <div className="userNavigate">
                    <button className="button" onClick={routeToAdmin}>Добавить товар</button>
                    <FontAwesomeIcon icon={faCircleUser} style={{color: "#141718", height: "35px", cursor: "pointer"}} onClick={() => setDropdown(!dropdown)}/>  
                </div>
            }    
            {dropdown && 
                <div className="userLogout">
                    <ul>
                        {currentUser && !currentUser.isAdmin && <li onClick={() => router.push('/cart')}>Корзина</li>}
                        {currentUser && currentUser.isAdmin && <li onClick={() => router.push('/admin')}>Добавить товар</li>}
                        {currentUser && <li onClick={LogOut}>Выйти</li>}
                        {!currentUser && <li onClick={LogOut}>Выйти</li>}
                    </ul>
                </div>
            }  
        </header>
    )
}