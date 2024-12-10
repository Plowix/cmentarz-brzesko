import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faChurch } from '@fortawesome/free-solid-svg-icons';

function Footer(){
    return(
        <footer>
            <div className="footer-contact-information">
                <a href="https://jakub.bwi.pl/"><FontAwesomeIcon icon={faChurch} /> Strona parafii</a>
                <a href="tel:+48146863706"><FontAwesomeIcon icon={faPhone} />146 863 706</a>
                <a href="mailto:ksdrab@poczta.onet.pl"><FontAwesomeIcon icon={faEnvelope} /> ksdrab@poczta.onet.pl</a>
            </div>
        </footer>
    )
}

export default Footer;