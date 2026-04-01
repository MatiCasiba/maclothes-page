import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useState } from "react"
import { FiArrowLeft, FiTruck, FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import styles from './Checkout.module.scss'


const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getSubtotal, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1:datos, 2:envio, 3:pago, 4:confirmación
  const [formData, setFormData] = useState({
    //datos personales
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    //datos de envío
    direccion: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    //método de envío
    metodoEnvio: 'standard',
    //método de pago
    metodoPago: 'efectivo'
  })
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmitDatos = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleSubmitEnvio = () => {
    setStep(3)
    window.scrollTo(0, 0)
  }

  const handleSubmitPago = () => {
    setStep(4)
    window.scrollTo(0, 0)
  }

  const handleFinalizar = () => {
    // creo  objeto con  los datos del pedido
    const orderDetails = {
      orderNumber: `MAC-${Date.now()}`,
      email: formData.email,
      total: totalConEnvio,
      paymentMethod: formData.metodoPago === 'efectivo' ? 'Efectivo' : 'Transferencia bancaria',
      shippingMethod: formData.metodoEnvio === 'standard' ? 'Estándar' : 'Express',
      items: cart,
      date: new Date().toISOString(),

      //datos de envío
      direccion: formData.direccion,
      ciudad: formData.ciudad,
      provincia: formData.provincia,
      codigoPostal: formData.codigoPostal,
      status: 'pending'
    }

    // guardo en localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(orderDetails)
    localStorage.setItem('orders', JSON.stringify(orders))

    console.log('Pedido finalziado: ', {formData, cart, total: getSubtotal()});
    //limpio carrito
    clearCart()

    // navego a la página de gracias con los datos
    navigate('/gracias', {state: {orderDetails}})
  }

  const total = getSubtotal()
  const envio = formData.metodoEnvio === 'express' ? 1500 : 800
  const totalConEnvio = total + envio

  return (
    <div className={styles.checkoutPage}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <FiArrowLeft size={20} />
        Volver al carrito
      </button>

      <h1>Finalizar compra</h1>

      {/* barra de progreso */}
      <div className={styles.progressBar}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
          <span className={styles.stepNumber}>1</span>
          <span className={styles.stepLabel}>Datos</span>
        </div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
          <span className={styles.stepNumber}>2</span>
          <span className={styles.stepLabel}>Envío</span>
        </div>
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
          <span className={styles.stepNumber}>3</span>
          <span className={styles.stepLabel}>Pago</span>
        </div>
        <div className={`${styles.step} ${step >= 4 ? styles.active : ''}`}>
          <span className={styles.stepNumber}>4</span>
          <span className={styles.stepLabel}>Confirmar</span>
        </div>
      </div>

      <div className={styles.checkoutContainer}>
        {/* columna izquierda: formulario */}
        <div className={styles.checkoutForm}>
          {step === 1 && (
            <form onSubmit={handleSubmitDatos} className={styles.form}>
              <h2>Datos personales</h2>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <h2>Dirección de envío</h2>

              <div className={styles.formGroup}>
                <label>Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Ciudad *</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Provincia *</label>
                  <input
                    type="text"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Código postal *</label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className={styles.continueButton}>
                Continuar con envío
              </button>
            </form>
          )}

          {step === 2 && (
            <div className={styles.shippingStep}>
              <h2>Método de envío</h2>
              
              <div className={styles.shippingOptions}>
                <label className={`${styles.shippingOption} ${formData.metodoEnvio === 'standard' ? styles.selected : ''}`}>
                  <input
                    type="radio"
                    name="metodoEnvio"
                    value="standard"
                    checked={formData.metodoEnvio === 'standard'}
                    onChange={handleInputChange}
                  />
                  <FiTruck size={24} />
                  <div className={styles.optionContent}>
                    <strong>Envío estándar</strong>
                    <span>Entrega en 5-7 días hábiles</span>
                  </div>
                  <span className={styles.optionPrice}>$800</span>
                </label>

                <label className={`${styles.shippingOption} ${formData.metodoEnvio === 'express' ? styles.selected : ''}`}>
                  <input
                    type="radio"
                    name="metodoEnvio"
                    value="express"
                    checked={formData.metodoEnvio === 'express'}
                    onChange={handleInputChange}
                  />
                  <FiTruck size={24} />
                  <div className={styles.optionContent}>
                    <strong>Envío express</strong>
                    <span>Entrega en 2-3 días hábiles</span>
                  </div>
                  <span className={styles.optionPrice}>$1,500</span>
                </label>
              </div>

              <button onClick={handleSubmitEnvio} className={styles.continueButton}>
                Continuar con pago
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.paymentStep}>
              <h2>Método de pago</h2>
              
              <div className={styles.paymentOptions}>
                <label className={`${styles.paymentOption} ${formData.metodoPago === 'efectivo' ? styles.selected : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="efectivo"
                    checked={formData.metodoPago === 'efectivo'}
                    onChange={handleInputChange}
                  />
                  <FiCreditCard size={24} />
                  <div className={styles.optionContent}>
                    <strong>Efectivo</strong>
                    <span>Pagás al recibir el pedido</span>
                  </div>
                </label>

                <label className={`${styles.paymentOption} ${formData.metodoPago === 'transferencia' ? styles.selected : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="transferencia"
                    checked={formData.metodoPago === 'transferencia'}
                    onChange={handleInputChange}
                  />
                  <FiCreditCard size={24} />
                  <div className={styles.optionContent}>
                    <strong>Transferencia bancaria</strong>
                    <span>10% de descuento</span>
                  </div>
                </label>
              </div>

              <button onClick={handleSubmitPago} className={styles.continueButton}>
                Revisar pedido
              </button>
            </div>
          )}

          {step === 4 && (
            <div className={styles.confirmStep}>
              <FiCheckCircle size={48} className={styles.confirmIcon} />
              <h2>¡Todo listo para finalizar!</h2>
              
              <div className={styles.confirmSection}>
                <h3>Datos personales</h3>
                <p>{formData.nombre} {formData.apellido}</p>
                <p>{formData.email} | {formData.telefono}</p>
              </div>

              <div className={styles.confirmSection}>
                <h3>Dirección de envío</h3>
                <p>{formData.direccion}</p>
                <p>{formData.ciudad}, {formData.provincia} - CP: {formData.codigoPostal}</p>
              </div>

              <div className={styles.confirmSection}>
                <h3>Método de envío</h3>
                <p>{formData.metodoEnvio === 'standard' ? 'Estándar' : 'Express'}</p>
              </div>

              <div className={styles.confirmSection}>
                <h3>Método de pago</h3>
                <p>{formData.metodoPago === 'efectivo' ? 'Efectivo' : 'Transferencia'}</p>
              </div>

              <button onClick={handleFinalizar} className={styles.finalizeButton}>
                Confirmar pedido
              </button>
            </div>
          )}
        </div>

        {/* columna derecha: resumen */}
        <div className={styles.orderSummary}>
          <h2>Resumen del pedido</h2>
          
          <div className={styles.summaryItems}>
            {cart.map((item, index) => (
              <div key={index} className={styles.summaryItem}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemInfo}>
                  <h4>{item.name}</h4>
                  <p>Cantidad: {item.quantity}</p>
                </div>
                <span className={styles.itemPrice}>
                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.summaryTotals}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Envío</span>
              <span>${envio.toLocaleString('es-AR')}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>${totalConEnvio.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout