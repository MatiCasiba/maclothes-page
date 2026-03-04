import { useState } from "react"
import SearchBar from "./SearchBar"
import CartIcon from "./CartIcon"
import MenuToggle from "./MenuToggle"
import styles from './Header.module.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* menú Hamburguesa */}
        <div className={styles.menuToggle}>
          <button 
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* logo */}
        <div className={styles.logo}>
          <a href="/">
            <img src="/logo/logo.png" alt="Maclothes" />
            {/* <p>Maclothes</p> */}
          </a>
        </div>

        {/* buscador (visible en desktop, toggle en mobile) */}
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>

        {/* carrito */}
        <div className={styles.cartContainer}>
          <CartIcon />
        </div>
      </div>

      {/* menú desplegable (solo visible cuando isMenuOpen es true) */}
      {isMenuOpen && (
        <div className={styles.menuOverlay}>
          <MenuToggle onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}

export default Header