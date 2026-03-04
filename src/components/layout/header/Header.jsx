import { useState } from 'react';
import { FiMenu, FiSearch, FiShoppingBag, FiX, FiChevronDown } from 'react-icons/fi';
import MenuToggle from './MenuToggle';
import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import { menuData } from '@data/menuData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoriaDesktop, setCategoriaDesktop] = useState(null);
  const [subcategoriaDesktop, setSubcategoriaDesktop] = useState(null);

  return (
    <header className={styles.header}>
      {/* Fila superior: Logo, buscador, íconos */}
      <div className={styles.headerContainer}>
        {/* Menú Hamburguesa (solo mobile) */}
        <button 
          className={`${styles.iconButton} ${styles.mobileOnly}`}
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

        {/* Buscador desktop */}
        <div className={styles.searchDesktop}>
          <SearchBar />
        </div>

        {/* Íconos de acción (derecha) */}
        <div className={styles.actionIcons}>
          {/* Buscador mobile */}
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

      {/* Barra de navegación desktop (solo visible en desktop) */}
      <nav className={styles.desktopNav}>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            {/* Productos con submenú */}
            <li 
              className={styles.navItem}
              onMouseEnter={() => setCategoriaDesktop('productos')}
              onMouseLeave={() => {
                setCategoriaDesktop(null);
                setSubcategoriaDesktop(null);
              }}
            >
              <button className={styles.navButton}>
                Productos <FiChevronDown size={16} />
              </button>
              
              {categoriaDesktop === 'productos' && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaMenuContainer}>
                    {/* Columna Hombre */}
                    <div className={styles.megaMenuColumn}>
                      <h4>Hombre</h4>
                      <ul>
                        {Object.entries(menuData.productos.hombre).map(([key, categoria]) => (
                          <li key={key}>
                            <a href={categoria.path}>{categoria.label}</a>
                            {categoria.subcategorias && (
                              <ul className={styles.megaSubmenu}>
                                {Object.entries(categoria.subcategorias).map(([subKey, subCategoria]) => (
                                  <li key={subKey}>
                                    <a href={subCategoria.path}>{subCategoria.label}</a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Columna Mujer */}
                    <div className={styles.megaMenuColumn}>
                      <h4>Mujer</h4>
                      <ul>
                        {Object.entries(menuData.productos.mujer).map(([key, categoria]) => (
                          <li key={key}>
                            <a href={categoria.path}>{categoria.label}</a>
                            {categoria.subcategorias && (
                              <ul className={styles.megaSubmenu}>
                                {Object.entries(categoria.subcategorias).map(([subKey, subCategoria]) => (
                                  <li key={subKey}>
                                    <a href={subCategoria.path}>{subCategoria.label}</a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Nosotros */}
            <li className={styles.navItem}>
              <a href={menuData.nosotros.path} className={styles.navLink}>
                {menuData.nosotros.label}
              </a>
            </li>

            {/* Contacto */}
            <li className={styles.navItem}>
              <a href={menuData.contacto.path} className={styles.navLink}>
                {menuData.contacto.label}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Barra de búsqueda mobile overlay */}
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

      {/* Menú móvil overlay */}
      {isMenuOpen && (
        <MenuToggle onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;