import AccessibilitySettings from "./AccessibilitySettings";

import './Header.css';
import BurgerMenuButton from "./BurgerMenuButton";

function Header({toggleMenu}){
    return(
        <div className="top-bar">
          <h1>Zabytkowy Cmentarz Parafialny <br />w Brzesku</h1>
          <AccessibilitySettings/>
          <BurgerMenuButton
            toggleMenu={toggleMenu}
            />
          
        </div>
    )
}

export default Header;