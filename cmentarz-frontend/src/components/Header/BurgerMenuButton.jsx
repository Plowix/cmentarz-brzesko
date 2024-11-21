function BurgerMenuButton({toggleMenu}){
    return(
        <button className="burger-menu" onClick={toggleMenu}>
          ☰
        </button>
    )
}

export default BurgerMenuButton;