import { useState } from 'react';
import { FiX, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { menuData } from '@data/menuData';
import styles from './Header.module.scss';

const MenuToggle = ({ onClose }) => {
  const [paso, setPaso] = useState('principal');
  const [animacion, setAnimacion] = useState('');

  // convierte camelCase a kebab-case
  const slugify = (str) => str?.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  const irA = (nuevoPaso) => {
    setAnimacion('slideOut');
    setTimeout(() => {
      setPaso(nuevoPaso);
      setAnimacion('slideIn');
    }, 200);
    setTimeout(() => setAnimacion(''), 400);
  };

  const volver = () => {
    setAnimacion('slideOutReverse');
    setTimeout(() => {
      setPaso('principal');
      setAnimacion('slideInReverse');
    }, 200);
    setTimeout(() => setAnimacion(''), 400);
  };

  return (
    <div className={styles.menuOverlay}>
      <nav className={styles.menuToggleNav}>
        <div className={styles.menuHeader}>
          {paso !== 'principal' && (
            <button onClick={volver} className={styles.backButton}>
              <FiChevronLeft size={24} />
            </button>
          )}
          <h3>
            {paso === 'principal' && 'Menú'}
            {paso === 'hombre' && 'Hombre'}
            {paso === 'mujer' && 'Mujer'}
          </h3>
          <button onClick={onClose} className={styles.closeButton}>
            <FiX size={24} />
          </button>
        </div>

        <div className={`${styles.menuContent} ${styles[animacion]}`}>
          {paso === 'principal' && (
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <button 
                  className={styles.menuButton}
                  onClick={() => irA('hombre')}
                >
                  Hombre
                  <FiChevronRight size={20} />
                </button>
              </li>
              <li className={styles.menuItem}>
                <button 
                  className={styles.menuButton}
                  onClick={() => irA('mujer')}
                >
                  Mujer
                  <FiChevronRight size={20} />
                </button>
              </li>
              <li className={styles.menuItem}>
                <a href={menuData.nosotros.path} className={styles.menuLink}>
                  {menuData.nosotros.label}
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href={menuData.contacto.path} className={styles.menuLink}>
                  {menuData.contacto.label}
                </a>
              </li>
            </ul>
          )}

          {paso === 'hombre' && (
            <ul className={styles.menuList}>
              {Object.entries(menuData.productos.hombre).map(([key, categoria]) => (
                <li key={key} className={styles.menuItem}>
                  {categoria.subcategorias ? (
                    <details className={styles.detailsMenu}>
                      <summary className={styles.menuSummary}>
                        {categoria.label}
                        <FiChevronRight size={20} />
                      </summary>
                      <ul className={styles.submenuList}>
                        {Object.entries(categoria.subcategorias).map(([subKey, subCategoria]) => (
                          <li key={subKey}>
                            <a 
                              href={`/hombre?categoria=${slugify(key)}&subcategoria=${slugify(subKey)}`}
                              className={styles.submenuLink}
                            >
                              {subCategoria.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a 
                      href={`/hombre?categoria=${slugify(key)}`}
                      className={styles.menuLink}
                    >
                      {categoria.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}

          {paso === 'mujer' && (
            <ul className={styles.menuList}>
              {Object.entries(menuData.productos.mujer).map(([key, categoria]) => (
                <li key={key} className={styles.menuItem}>
                  {categoria.subcategorias ? (
                    <details className={styles.detailsMenu}>
                      <summary className={styles.menuSummary}>
                        {categoria.label}
                        <FiChevronRight size={20} />
                      </summary>
                      <ul className={styles.submenuList}>
                        {Object.entries(categoria.subcategorias).map(([subKey, subCategoria]) => (
                          <li key={subKey}>
                            <a 
                              href={`/mujer?categoria=${slugify(key)}&subcategoria=${slugify(subKey)}`}
                              className={styles.submenuLink}
                            >
                              {subCategoria.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a 
                      href={`/mujer?categoria=${slugify(key)}`}
                      className={styles.menuLink}
                    >
                      {categoria.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MenuToggle;