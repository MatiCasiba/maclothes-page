import { useState } from 'react';
import { FiMenu, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi';
import MenuToggle from './MenuToggle';
import styles from './Header.module.scss';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Menú Hamburguesa */}
        <button 
          className={styles.iconButton}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <FiMenu size={24} />
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <a href="/">
            <img src="/logo/logo.png" alt="Maclothes" />
          </a>
        </div>

        {/* buscador desktop */}
        <div className={styles.searchDesktop}>
          <SearchBar />
        </div>

        {/* Íconos de acción (derecha) */}
        <div className={styles.actionIcons}>
          {/* Buscador (mobile) */}
          <button 
            className={`${styles.iconButton} ${styles.mobileSearch}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Buscar"
          >
            <FiSearch size={24} />
          </button>

          {/* Carrito */}
          <button className={styles.iconButton} aria-label="Carrito">
            <FiShoppingBag size={24} />
          </button>
        </div>
      </div>

      {/* Barra de búsqueda (se despliega en mobile) */}
      {isSearchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchBar}>
            <FiSearch size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Buscar productos..."
              autoFocus
            />
            <button 
              className={styles.closeSearch}
              onClick={() => setIsSearchOpen(false)}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Menú desplegable */}
      {isMenuOpen && (
        <MenuToggle onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;