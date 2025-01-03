import AccessibilitySettings from "./AccessibilitySettings";

import './Header.css';
import BurgerMenuButton from "./BurgerMenuButton";

function Header({toggleMenu, navigate}){
    return(
        <div className="top-bar">
          <h1 onClick={(e) => navigate('/')}>Zabytkowy Cmentarz Parafialny <br />w Brzesku</h1>
          <AccessibilitySettings/>
          <BurgerMenuButton
            toggleMenu={toggleMenu}
            />
          
        </div>
    )
}

export default Header;