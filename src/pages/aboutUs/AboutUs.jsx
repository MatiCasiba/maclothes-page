import { FiUsers, FiTruck, FiAward, FiShield } from 'react-icons/fi'
import styles from './AboutUs.module.scss'

const AboutUs = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutContainer}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1>Sobre Maclothes</h1>
          <p>Moda contemporánea para hombres y mujeres que buscan estilo y calidad</p>
        </div>

        {/* Nuestra historia */}
        <div className={styles.section}>
          <h2>Nuestra historia</h2>
          <div className={styles.historyContent}>
            <p>
              Maclothes nació en 2025 con la visión de revolucionar la moda en Argentina. 
              Lo que comenzó como un pequeño emprendimiento entre amigos, hoy se ha convertido 
              en una marca reconocida por su calidad, estilo y compromiso con el cliente.
            </p>
            <p>
              Desde nuestros inicios, nos propusimos crear prendas que combinen las últimas 
              tendencias con la comodidad y durabilidad que nuestros clientes merecen. 
              Cada colección es cuidadosamente diseñada para ofrecer piezas únicas que 
              se adaptan a diferentes estilos y ocasiones.
            </p>
            <p>
              Hoy, gracias a la confianza de miles de clientes, seguimos creciendo y 
              expandiendo nuestra presencia, siempre manteniendo el mismo compromiso con 
              la calidad y la excelencia que nos caracteriza desde el primer día.
            </p>
          </div>
        </div>

        {/* Nuestros valores */}
        <div className={styles.section}>
          <h2>Nuestros valores</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <FiAward size={32} />
              <h3>Calidad</h3>
              <p>Seleccionamos los mejores materiales y procesos para garantizar prendas duraderas.</p>
            </div>
            <div className={styles.valueCard}>
              <FiUsers size={32} />
              <h3>Compromiso</h3>
              <p>Nos dedicamos a superar las expectativas de nuestros clientes día a día.</p>
            </div>
            <div className={styles.valueCard}>
              <FiTruck size={32} />
              <h3>Innovación</h3>
              <p>Buscamos constantemente nuevas tendencias y formas de mejorar nuestra oferta.</p>
            </div>
            <div className={styles.valueCard}>
              <FiShield size={32} />
              <h3>Confianza</h3>
              <p>Construimos relaciones duraderas basadas en transparencia y honestidad.</p>
            </div>
          </div>
        </div>

        {/* Nuestro equipo */}
        <div className={styles.section}>
          <h2>Nuestro equipo</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>JD</div>
              <h3>Matias</h3>
              <p>Fundador & CEO</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>MP</div>
              <h3>Fleur Pérez</h3>
              <p>Directora de Diseño</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>CG</div>
              <h3>Carlos Benítez</h3>
              <p>Jefe de Producto</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>LR</div>
              <h3>Lucía Rodríguez</h3>
              <p>Atención al Cliente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs