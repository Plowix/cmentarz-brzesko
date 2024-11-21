import AccessibilitySettings from "./AccessibilitySettings";

import './Header.css';

function Header(){
    return(
        <div className="top-bar">
          <h1>Zabytkowy Cmentarz Parafialny <br />w Brzesku</h1>
          <AccessibilitySettings/>
        </div>
    )
}

export default Header;