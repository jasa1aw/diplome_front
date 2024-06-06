'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
export default function Header(){
    const [dropdown, setDropdown] = useState(false)
    return(
        <header>
            <Link href={'/main'} className="h4">Ferm Zone</Link>
            <div className="userNavigate">
                <Link href={'/cart'}><FontAwesomeIcon icon={faBagShopping} style={{color: "#141718", height: "35px", cursor: "pointer"}}/></Link>
                <FontAwesomeIcon icon={faCircleUser} style={{color: "#141718", height: "35px", cursor: "pointer"}} onClick={() => setDropdown(!dropdown)}/>
            </div>
            {dropdown && 
                <div className="userLogout">
                    <ul>
                        <li>Корзина</li>
                        <li>Выйти</li>
                    </ul>
                </div>
            }  
        </header>
    )
}