import { useState } from "react"
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi"
import styles from './Contact.module.scss'

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })
  const [isSent, setisSent] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.taget.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // lógica para enviar el mesnaje (email, backend, etc)
    console.log('Mensaje enviado: ', formData);
    setisSent(true)
    setTimeout(() => setisSent(false), 5000)
    setFormData({nombre: '', email: '', telefono: '', mensaje: ''})
  }
  return (
    <div className={styles.contactPage}>
      <div className={styles.contactContainer}>
        <h1>Contacto</h1>
        
        <div className={styles.contactGrid}>
          {/* información de contacto */}
          <div className={styles.contactInfo}>
            <h2>¿Cómo podemos ayudarte?</h2>
            <p>Estamos aquí para responder tus preguntas y escuchar tus sugerencias.</p>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <FiMapPin className={styles.icon} />
                <div>
                  <strong>Dirección</strong>
                  <span>Av. Principal 123, Buenos Aires, Argentina</span>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <FiPhone className={styles.icon} />
                <div>
                  <strong>Teléfono</strong>
                  <a href="tel:+541112345678">+54 11 1234-5678</a>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <FiMail className={styles.icon} />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@maclothes.com">info@maclothes.com</a>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <FiClock className={styles.icon} />
                <div>
                  <strong>Horario de atención</strong>
                  <span>Lunes a Viernes: 9:00 - 18:00</span>
                  <span>Sábados: 10:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Opcional"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Mensaje *</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={5}
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              <FiSend size={18} />
              Enviar mensaje
            </button>
            
            {isSent && (
              <div className={styles.successMessage}>
                ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact