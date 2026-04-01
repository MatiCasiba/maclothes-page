import { useEffect, useState } from "react"
import { FiArrowRight, FiCheckCircle, FiHome, FiShoppingBag } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './ThankYou.module.scss'


const ThankYou = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    //obtengo los datos del pedido del state de navegación
    const state = location.state
    if(state && state.orderDetails){
        setOrderDetails(state.orderDetails)
    } else {
        // si no hay datos, redirigir al home (evito acceso directo)
        navigate('/', {replace: true})
    }
  }, [location, navigate])

  if(!orderDetails){
    return null
  }

  const orderNumber = orderDetails.orderNumber || `#${Math.floor(Math.random() * 1000000)}`
  const orderDate = new Date().toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  
  return (
    <div className={styles.thankYouPage}>
      <div className={styles.thankYouCard}>
        <div className={styles.iconContainer}>
          <FiCheckCircle size={80} className={styles.checkIcon} />
        </div>

        <h1>¡Gracias por tu compra!</h1>
        <p className={styles.subtitle}>Tu pedido ha sido confirmado correctamente</p>

        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span>Número de pedido:</span>
            <strong>{orderNumber}</strong>
          </div>
          <div className={styles.infoRow}>
            <span>Fecha:</span>
            <strong>{orderDate}</strong>
          </div>
          <div className={styles.infoRow}>
            <span>Total:</span>
            <strong>${orderDetails.total?.toLocaleString('es-AR') || 0}</strong>
          </div>
          <div className={styles.infoRow}>
            <span>Método de pago:</span>
            <strong>{orderDetails.paymentMethod || 'Efectivo'}</strong>
          </div>
        </div>

        <div className={styles.emailMessage}>
          <p>
            Te hemos enviado un correo electrónico con los detalles de tu pedido a{' '}
            <strong>{orderDetails.email}</strong>
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.continueButton} onClick={() => navigate('/')}>
            <FiHome size={18} />
            Volver al inicio
          </button>
          <button className={styles.ordersButton} onClick={() => navigate('/mis-pedidos')}>
            <FiShoppingBag size={18} />
            Ver mis pedidos
            <FiArrowRight size={14} />
          </button>
        </div>

        <div className={styles.supportInfo}>
          <p>¿Tenés alguna duda? <a href="/contacto">Contactanos</a></p>
        </div>
      </div>
    </div>
  )
}

export default ThankYou