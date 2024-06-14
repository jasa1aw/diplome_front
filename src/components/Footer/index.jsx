import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
export default function Footer(){
    const openInstagram = () => {
        window.open('https://www.instagram.com/ferm_zone?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank', 'noopener,noreferrer');
    };
    
    return(
        <footer>
            <div className="leftSection">
                <h4>Ferm Zone</h4>
                <p>Для оформление фотозоны</p>
            </div>
            <div className="contactLink">
                <FontAwesomeIcon icon={faInstagram} style={{color: "#fff", height: "35px", cursor: "pointer"}} onClick={openInstagram}/>
                <FontAwesomeIcon icon={faWhatsapp} style={{color: "#fff", height: "35px", cursor: "pointer"}}/>
            </div>
        </footer>
    )
}