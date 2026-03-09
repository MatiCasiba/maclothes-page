import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi"
import { testimonials } from '@data/testimonials'
import styles from './Testimonials.module.scss'
import { useRef } from "react"

const Testimonials = () => {
  const sliderRef = useRef(null)

  const scrollLeft = () => {
    if(sliderRef.current){
      sliderRef.current.scrollBy({left: -400, behavior: 'smooth'})
    }
  }

  const scrollRight = () => {
    if(sliderRef.current){
      sliderRef.current.scrollBy({left: 400, behavior: 'smooth'})
    }
  }

  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
      
      <div className={styles.testimonialsContainer}>
        {/* botones de navegación (solo desktop) */}
        <button className={styles.arrowLeft} onClick={scrollLeft}>
          <FiChevronLeft size={24} />
        </button>
        <button className={styles.arrowRight} onClick={scrollRight}>
          <FiChevronRight size={24} />
        </button>

        {/* slider */}
        <div className={styles.testimonialsGrid} ref={sliderRef}>
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

        {/* indicadores de scroll (solo mobile) */}
        <div className={styles.scrollIndicators}>
          {testimonials.map((_, index) => (
            <span 
              key={index} 
              className={styles.indicator}
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.scrollTo({ 
                    left: index * 380, 
                    behavior: 'smooth' 
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials