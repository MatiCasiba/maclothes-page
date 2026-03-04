import { useState } from 'react';
import { FiX, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { menuData } from '@data/menuData';
import styles from './Header.module.scss';

const MenuToggle = ({ onClose }) => {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState(null);

  const toggleCategoria = (categoria) => {
    setCategoriaActiva(categoriaActiva === categoria ? null : categoria);
    setSubcategoriaActiva(null); // cierra subcategorías al cambiar
  };

  return (
    <div className={styles.menuOverlay}>
      <nav className={styles.menuToggleNav}>
        <div className={styles.menuHeader}>
          <h3>Menú</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <FiX size={24} />
          </button>
        </div>

        <ul className={styles.menuList}>
          {/* Productos */}
          <li className={styles.menuItem}>
            <button 
              className={styles.menuButton}
              onClick={() => toggleCategoria('productos')}
            >
              Productos
              {categoriaActiva === 'productos' ? 
                <FiChevronDown size={20} /> : 
                <FiChevronRight size={20} />
              }
            </button>
            
            {categoriaActiva === 'productos' && (
              <ul className={styles.submenu}>
                {/* Hombre */}
                <li className={styles.submenuItem}>
                  <button 
                    className={styles.submenuButton}
                    onClick={() => setSubcategoriaActiva(
                      subcategoriaActiva === 'hombre' ? null : 'hombre'
                    )}
                  >
                    Hombre
                    {subcategoriaActiva === 'hombre' ? 
                      <FiChevronDown size={18} /> : 
                      <FiChevronRight size={18} />
                    }
                  </button>
                  
                  {subcategoriaActiva === 'hombre' && (
                    <ul className={styles.submenu2}>
                      {Object.entries(menuData.productos.hombre).map(([key, categoria]) => (
                        <li key={key} className={styles.submenu2Item}>
                          <a href={categoria.path}>{categoria.label}</a>
                          {categoria.subcategorias && (
                            <ul className={styles.submenu3}>
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
                  )}
                </li>
                
                {/* Mujer */}
                <li className={styles.submenuItem}>
                  <button 
                    className={styles.submenuButton}
                    onClick={() => setSubcategoriaActiva(
                      subcategoriaActiva === 'mujer' ? null : 'mujer'
                    )}
                  >
                    Mujer
                    {subcategoriaActiva === 'mujer' ? 
                      <FiChevronDown size={18} /> : 
                      <FiChevronRight size={18} />
                    }
                  </button>
                  
                  {subcategoriaActiva === 'mujer' && (
                    <ul className={styles.submenu2}>
                      {Object.entries(menuData.productos.mujer).map(([key, categoria]) => (
                        <li key={key} className={styles.submenu2Item}>
                          <a href={categoria.path}>{categoria.label}</a>
                          {categoria.subcategorias && (
                            <ul className={styles.submenu3}>
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
                  )}
                </li>
              </ul>
            )}
          </li>
          
          {/* nosotros */}
          <li className={styles.menuItem}>
            <a href={menuData.nosotros.path} className={styles.menuLink}>
              {menuData.nosotros.label}
            </a>
          </li>
          
          {/* contacto */}
          <li className={styles.menuItem}>
            <a href={menuData.contacto.path} className={styles.menuLink}>
              {menuData.contacto.label}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuToggle;