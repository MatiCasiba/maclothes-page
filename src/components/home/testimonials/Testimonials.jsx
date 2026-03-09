import { FiStar } from "react-icons/fi"
import { testimonials } from '@data/testimonials'
import styles from './Testimonials.module.scss'

const Testimonials = () => {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
      
      <div className={styles.testimonialsGrid}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            <div className={styles.testimonialHeader}>
              <img 
                src={testimonial.photo} 
                alt={testimonial.name}
                className={styles.clientPhoto}
              />
              <div className={styles.clientInfo}>
                <h4>{testimonial.name}</h4>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < testimonial.rating ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className={styles.testimonialComment}>"{testimonial.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials