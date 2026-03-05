import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram, FiFacebook, FiLinkedin } from 'react-icons/fi';
import styles from './Footer.module.scss';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* fila superior: 4 columnas */}
        <div className={styles.footerGrid}>
          {/* columna 1: Info de la tienda */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>MACLOTHES</h3>
            <p className={styles.footerDescription}>
              Moda contemporánea para hombres y mujeres que buscan estilo y calidad. 
              Descubre las últimas tendencias en nuestra tienda online.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Instagram" className={styles.socialLink} title='Instagram'>
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className={styles.socialLink} title='Facebook'>
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="GitHub" className={styles.socialLink} title='GitHub'>
                <FaGithub size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink} title='LinkedIn'>
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* columna 2: Categorías */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerSubtitle}>Categorías</h4>
            <ul className={styles.footerList}>
              <li><a href="/hombre">Hombre</a></li>
              <li><a href="/mujer">Mujer</a></li>
              <li><a href="/nuevo">Nuevo</a></li>
              <li><a href="/ofertas">Ofertas</a></li>
              <li><a href="/destacados">Destacados</a></li>
            </ul>
          </div>

          {/* columna 3: Ayuda */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerSubtitle}>Ayuda</h4>
            <ul className={styles.footerList}>
              <li><a href="/preguntas-frecuentes">Preguntas frecuentes</a></li>
              <li><a href="/como-comprar">Cómo comprar</a></li>
              <li><a href="/envios">Envíos</a></li>
              <li><a href="/cambios-devoluciones">Cambios y devoluciones</a></li>
              <li><a href="/talles">Guía de talles</a></li>
            </ul>
          </div>

          {/* columna 4: Contacto */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerSubtitle}>Contacto</h4>
            <ul className={styles.footerContact}>
              <li>
                <FiMapPin size={18} />
                <span>Av. Principal 123, Buenos Aires, Argentina</span>
              </li>
              <li>
                <FiPhone size={18} />
                <a href="tel:+5491131097748">+54 9 11 3109-7748</a>
              </li>
              <li>
                <FiMail size={18} />
                <a href="mailto:info@maclothes.com">info@maclothes.com</a>
              </li>
              <li>
                <FiClock size={18} />
                <span>Lun a Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* fila inferior: copyright y links legales */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} MACLOTHES. Todos los derechos reservados.
          </p>
          <div className={styles.legalLinks}>
            <a href="/terminos">Términos y condiciones</a>
            <span className={styles.separator}>|</span>
            <a href="/privacidad">Política de privacidad</a>
            <span className={styles.separator}>|</span>
            <a href="/cookies">Política de cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;