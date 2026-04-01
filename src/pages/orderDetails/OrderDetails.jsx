import { FiArrowLeft, FiCalendar, FiDollarSign, FiPackage, FiTruck } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './OrderDetails.module.scss'

const OrderDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state?.order

    if (!order) {
        navigate('/mis-pedidos')
        return null
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatPrice = (price) => `$${price.toLocaleString('es-AR')}`
    return (
        <div className={styles.orderDetailPage}>
            <button className={styles.backButton} onClick={() => navigate('/mis-pedidos')}>
                <FiArrowLeft size={20} />
                Volver a mis pedidos
            </button>

            <div className={styles.orderHeader}>
                <h1>Detalle del pedido</h1>
                <div className={styles.orderNumber}>
                    <FiPackage size={20} />
                    <span>{order.orderNumber}</span>
                </div>
            </div>

            <div className={styles.orderInfo}>
                <div className={styles.infoCard}>
                    <FiCalendar size={18} />
                    <div>
                        <strong>Fecha</strong>
                        <p>{formatDate(order.date)}</p>
                    </div>
                </div>
                <div className={styles.infoCard}>
                    <FiDollarSign size={18} />
                    <div>
                        <strong>Total</strong>
                        <p>{formatPrice(order.total)}</p>
                    </div>
                </div>
                <div className={styles.infoCard}>
                    <FiTruck size={18} />
                    <div>
                        <strong>Método de envío</strong>
                        <p>{order.shippingMethod === 'standard' ? 'Estándar' : 'Express'}</p>
                    </div>
                </div>
            </div>

            <div className={styles.productsSection}>
                <h3>Productos</h3>
                {order.items.map((item, idx) => (
                    <div key={idx} className={styles.productItem}>
                        <img src={item.image} alt={item.name} />
                        <div className={styles.productInfo}>
                            <h4>{item.name}</h4>
                            <p>Cantidad: {item.quantity}</p>
                            {item.talle && <p>Talle: {item.talle}</p>}
                            {item.color && <p>Color: {item.color}</p>}
                        </div>
                        <div className={styles.productPrice}>
                            {formatPrice(item.price * item.quantity)}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.shippingInfo}>
                <h3>Información de envío</h3>
                <p>{order.direccion}</p>
                <p>{order.ciudad}, {order.provincia} - CP: {order.codigoPostal}</p>
            </div>
        </div>
    )
}

export default OrderDetails