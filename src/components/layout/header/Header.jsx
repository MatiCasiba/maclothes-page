import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiShoppingBag, FiX, FiChevronDown, FiChevronRight, FiHeart, FiUser, FiLogOut } from 'react-icons/fi';
import MenuToggle from './MenuToggle';
import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import { menuData } from '@data/menuData';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useAuth } from '../../../context/AuthContext';

// convierte camelCase a kebab-case para parámetros de URL
const slugify = (str) => str?.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categoriaDesktop, setCategoriaDesktop] = useState(null);
  const [subcategoriaDesktop, setSubcategoriaDesktop] = useState('hombre');
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isUserMenuOpen]);
  const { cart } = useCart()
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)
  const { getTotalItems: getWishlistTotal } = useWishlist()
  const wishlistItemsCount = getWishlistTotal()
  const { user, logout } = useAuth()

  console.log('🛒 Header - carrito:', cart);
  console.log('🛒 Header - cantidad:', cartItemsCount);

  return (
    <header className={styles.header}>
      {/* Fila superior */}
      <div className={styles.headerContainer}>
        <button
          className={`${styles.iconButton} ${styles.mobileOnly}`}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <FiMenu size={24} />
        </button>

        <div className={styles.logo}>
          <a href="/" className={styles.logoText}>
            MACLOTHES
          </a>
        </div>

        <div className={styles.searchDesktop}>
          <SearchBar />
        </div>

        <div className={styles.actionIcons}>
          <button
            className={`${styles.iconButton} ${styles.mobileSearch}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Buscar"
          >
            <FiSearch size={24} />
          </button>

          <button
            className={styles.iconButton}
            aria-label="Favoritos"
            onClick={() => navigate('/wishlist')}
          >
            <FiHeart size={24} />
            {wishlistItemsCount > 0 && (
              <span className={styles.cartBadge}>{wishlistItemsCount}</span>
            )}
          </button>

          <button
            className={styles.iconButton}
            aria-label="Carrito"
            onClick={() => navigate('/carrito')}
          >
            <FiShoppingBag size={24} />
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </button>

          {user ? (
            <div className={styles.userMenu} ref={userMenuRef}>
              <button
                className={`${styles.iconButton} ${styles.userAvatarButton}`}
                aria-label="Abrir menú de usuario"
                onClick={() => setIsUserMenuOpen(prev => !prev)}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className={styles.userAvatar} />
                ) : (
                  <span className={styles.userInitials}>
                    {user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US'}
                  </span>
                )}
              </button>

              {isUserMenuOpen && (
                <div className={styles.userDropdown}>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      navigate('/profile')
                    }}
                  >
                    <FiUser size={16} /> Perfil
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      logout()
                    }}
                  >
                    <FiLogOut size={16} /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className={styles.iconButton}
              aria-label="Iniciar sesión"
              onClick={() => navigate('/login')}
            >
              <FiUser size={24} />
            </button>
          )}

        </div>
      </div>

      {/* Navegación Desktop */}
      <nav className={styles.desktopNav}>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li
              className={styles.navItem}
              onMouseEnter={() => setCategoriaDesktop('productos')}
              onMouseLeave={() => setCategoriaDesktop(null)}
            >
              <button className={styles.navButton}>
                Productos <FiChevronDown size={16} />
              </button>

              {categoriaDesktop === 'productos' && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaMenuContainer}>
                    {/* Columna izquierda: Hombre / Mujer */}
                    <div className={styles.megaMenuSidebar}>
                      <button
                        className={`${styles.megaMenuTab} ${subcategoriaDesktop === 'hombre' ? styles.active : ''}`}
                        onMouseEnter={() => setSubcategoriaDesktop('hombre')}
                      >
                        Hombre <FiChevronRight size={16} />
                      </button>
                      <button
                        className={`${styles.megaMenuTab} ${subcategoriaDesktop === 'mujer' ? styles.active : ''}`}
                        onMouseEnter={() => setSubcategoriaDesktop('mujer')}
                      >
                        Mujer <FiChevronRight size={16} />
                      </button>
                    </div>

                    {/* Columna derecha: Categorías según selección */}
                    <div className={styles.megaMenuContent}>
                      {subcategoriaDesktop === 'hombre' && (
                        <div className={styles.categoriaGrid}>
                          {Object.entries(menuData.productos.hombre).map(([key, categoria]) => (
                            <div key={key} className={styles.categoriaItem}>
                              <a
                                href={`/hombre?categoria=${slugify(key)}`}
                                className={styles.categoriaTitulo}
                              >
                                {categoria.label}
                              </a>
                              {categoria.subcategorias && (
                                <ul className={styles.subcategoriaList}>
                                  {Object.entries(categoria.subcategorias).map(([subKey, subCategoria]) => (
                                    <li key={subKey}>
                                      <a href={`/hombre?categoria=${slugify(key)}&subcategoria=${slugify(subKey)}`}>
                                        {subCategoria.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {subcategoriaDesktop === 'mujer' && (
                        <div className={styles.categoriaGrid}>
                          {Object.entries(menuData.productos.mujer).map(([key, categoria]) => (
                            <div key={key} className={styles.categoriaItem}>
                              <a
                                href={`/mujer?categoria=${slugify(key)}`}
                                className={styles.categoriaTitulo}
                              >
                                {categoria.label}
                              </a>
                              {categoria.subcategorias && (
                                <ul className={styles.subcategoriaList}>
                                  {Object.entries(categoria.subcategorias).map(([subKey, subCategoria]) => (
                                    <li key={subKey}>
                                      <a href={`/mujer?categoria=${slugify(key)}&subcategoria=${slugify(subKey)}`}>
                                        {subCategoria.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li className={styles.navItem}>
              <a href={menuData.nosotros.path} className={styles.navLink}>
                {menuData.nosotros.label}
              </a>
            </li>

            <li className={styles.navItem}>
              <a href={menuData.contacto.path} className={styles.navLink}>
                {menuData.contacto.label}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Búsqueda mobile */}
      {isSearchOpen && (
        <div className={styles.searchOverlay}>
          <SearchBar />
        </div>
      )}

      {/* Menú móvil */}
      {isMenuOpen && (
        <MenuToggle onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;