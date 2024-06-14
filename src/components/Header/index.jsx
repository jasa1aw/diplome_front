'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { logOut } from "@/app/store/slices/authSlice";
export default function Header(){
    const currentUser = useSelector(state => state.auth.currentUser);
    const router = useRouter()
    const dispatch = useDispatch()
    
    const [dropdown, setDropdown] = useState(false)
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const routeToAdmin = () =>{
        router.push('/admin')
    }
    const LogOut = () =>{
        dispatch(logOut())
        router.push('/login')
    }

    if(!isClient) return null;

    return(
        <header>
            <Link href={'/'} className="h4">Ferm Zone</Link>
            <div className="userNavigate">
                    {/* <Link href={'/cart'}><FontAwesomeIcon icon={faBagShopping} style={{color: "#141718", height: "40px", cursor: "pointer"}}/></Link>
                    <FontAwesomeIcon icon={faCircleUser} style={{color: "#141718", height: "35px", cursor: "pointer"}} onClick={() => setDropdown(!dropdown)}/>   */}
                    {(!currentUser || (currentUser && !currentUser.isAdmin)) &&
                        <div className="userNavigate">
                            <Link href={'/cart'}><FontAwesomeIcon icon={faBagShopping} style={{color: "#141718", height: "40px", cursor: "pointer"}}/></Link>
                            <FontAwesomeIcon icon={faCircleUser} style={{color: "#141718", height: "35px", cursor: "pointer"}} onClick={() => setDropdown(!dropdown)}/>  
                        </div>
                    }
                    {currentUser && currentUser.isAdmin &&
                        <div className="userNavigate">
                            <button className="button" onClick={routeToAdmin}>Добавить товар</button>
                            <FontAwesomeIcon icon={faCircleUser} style={{color: "#141718", height: "40px", cursor: "pointer"}} onClick={() => setDropdown(!dropdown)}/>  
                        </div>
                    } 
                    {dropdown && 
                        <div className="userLogout">
                            <ul>
                                {/* <li onClick={() => router.push('/cart')}>Корзина</li>
                                <li onClick={LogOut}>Выйти</li> */}
                                {(!currentUser || (currentUser && !currentUser.isAdmin)) && <li onClick={() => router.push('/cart')}>Корзина</li>}
                                {currentUser && currentUser.isAdmin && <li onClick={() => router.push('/admin')}>Добавить товар</li>}
                                {currentUser && <li onClick={LogOut}>Выйти</li>}
                                {!currentUser && <li onClick={() => router.push('/login')} style={{ color: 'green' }}>Войти</li>}
                            </ul>
                        </div>
                    }  
            </div>  
        </header>
    )
}