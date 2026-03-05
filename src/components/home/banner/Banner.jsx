import styles from './Banner.module.scss'

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>NUEVA COLECCIÓN</h1>
        <p className={styles.bannerSubtitle}>Descubre las últimas tendencias</p>
        <button className={styles.bannerButton}>Ver colección</button>
      </div>
    </section>
  )
}

export default Banner