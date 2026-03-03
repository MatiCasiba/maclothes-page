import { useState } from 'react';
import { menuData } from '../../../../data/menuData';
import styles from './Header.module.scss';

const MenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState(null);

  return (
    <nav className={styles.menuToggle}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.hamburger}>
        ☰
      </button>
      
      {isOpen && (
        <ul className={styles.menu}>
          {/* productos (menú principal) */}
          <li 
            onMouseEnter={() => setCategoriaActiva('productos')}
            onMouseLeave={() => setCategoriaActiva(null)}
          >
            Productos
            {categoriaActiva === 'productos' && (
              <ul className={styles.submenu}>
                {/* hombre */}
                <li onMouseEnter={() => setSubcategoriaActiva('hombre')}>
                  Hombre
                  {subcategoriaActiva === 'hombre' && (
                    <ul className={styles.submenu2}>
                      {Object.entries(menuData.productos.hombre).map(([key, value]) => (
                        <li key={key}>
                          <a href={value.path}>{value.label}</a>
                          {value.subcategorias && (
                            <ul className={styles.submenu3}>
                              {Object.entries(value.subcategorias).map(([subKey, subValue]) => (
                                <li key={subKey}>
                                  <a href={subValue.path}>{subValue.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                
                {/* mujer */}
                <li onMouseEnter={() => setSubcategoriaActiva('mujer')}>
                  Mujer
                  {subcategoriaActiva === 'mujer' && (
                    <ul className={styles.submenu2}>
                      {Object.entries(menuData.productos.mujer).map(([key, value]) => (
                        <li key={key}>
                          <a href={value.path}>{value.label}</a>
                          {value.subcategorias && (
                            <ul className={styles.submenu3}>
                              {Object.entries(value.subcategorias).map(([subKey, subValue]) => (
                                <li key={subKey}>
                                  <a href={subValue.path}>{subValue.label}</a>
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
          <li>
            <a href={menuData.nosotros.path}>{menuData.nosotros.label}</a>
          </li>
          
          {/* contacto */}
          <li>
            <a href={menuData.contacto.path}>{menuData.contacto.label}</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default MenuToggle;