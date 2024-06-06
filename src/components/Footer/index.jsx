import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
export default function Footer(){
    return(
        <footer>
            <div className="leftSection">
                <h4>Ferm Zone</h4>
                <p>Для оформление фотозоны</p>
            </div>
            <div className="contactLink">
                <FontAwesomeIcon icon={faInstagram} style={{color: "#fff", height: "35px", cursor: "pointer"}}/>
                <FontAwesomeIcon icon={faWhatsapp} style={{color: "#fff", height: "35px", cursor: "pointer"}}/>
            </div>
        </footer>
    )
}