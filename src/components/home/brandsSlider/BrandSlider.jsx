import {brands} from '@data//brands'
import styles from './BrandSlider.module.scss'

const BrandSlider = () => {
  const allBrands = [...brands, ...brands]; // Para efecto infinito

  return (
    <section className={styles.brandsSection}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          {allBrands.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className={styles.brandItem}>
              <img 
                src={brand.logo}  // la ruta viene de brands.js: "/logo/marca.png"
                alt={brand.name}
                onError={(e) => {
                  e.target.src = '/logo/placeholder.png'; // imagen por si falla
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandSlider