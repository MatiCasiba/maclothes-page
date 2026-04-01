import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import { FiArrowLeft, FiCalendar, FiDollarSign, FiEye } from "react-icons/fi"

const MyOrders = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //carga pedidos del localStorage
        const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')

        //filtra pedidos del usuario actual
        const userOrders = allOrders.filter(order => order.email === user?.email)

        //ordenar por fecha (más reciente primero)
        userOrders.sort((a, b) => new Date(b.date) - new Date(a.date))

        setOrders(userOrders)
        setIsLoading(false)
    }, [user])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-AR', {
            day: 'numeric',
            moth: 'long',
            year: 'numeric'
        })
    }

    const formatPrice = (price) => {
            return `$${price.toLocaleDateString('es-AR')}`
        }

        const getStatusBadge = (status) => {
            switch (status) {
                case 'pending':
                    return <span className={`${styles.status} ${styles.pending}`}>Pendiente</span>;
                case 'processing':
                    return <span className={`${styles.status} ${styles.processing}`}>En proceso</span>;
                case 'shipped':
                    return <span className={`${styles.status} ${styles.shipped}`}>Enviado</span>;
                case 'delivered':
                    return <span className={`${styles.status} ${styles.delivered}`}>Entregado</span>;
                default:
                    return <span className={`${styles.status} ${styles.pending}`}>Confirmado</span>;
            }
        }

        if (isLoading) {
            return (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Cargando tus pedidos...</p>
                </div>
            )
        }

        if (orders.length === 0) {
            return (
                <div className={styles.emptyOrders}>
                    <FiPackage size={64} className={styles.emptyIcon} />
                    <h2>No tenés pedidos aún</h2>
                    <p>¡Realizá tu primera compra y aparecerá aquí!</p>
                    <button className={styles.shopButton} onClick={() => navigate('/')}>
                        Comenzar a comprar
                    </button>
                </div>
            )
        }

    return (
        <div className={styles.myOrdersPage}>
            <div className={styles.pageHeader}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <FiArrowLeft size={20} />
                    Volver
                </button>
                <h1>Mis pedidos</h1>
            </div>

            <div className={styles.ordersList}>
                {orders.map((order, index) => (
                    <div key={index} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                            <div className={styles.orderInfo}>
                                <span className={styles.orderNumber}>{order.orderNumber}</span>
                                <div className={styles.orderDate}>
                                    <FiCalendar size={14} />
                                    {formatDate(order.date)}
                                </div>
                            </div>
                            <div className={styles.orderStatus}>
                                {getStatusBadge(order.status || 'pending')}
                            </div>
                        </div>

                        <div className={styles.orderItems}>
                            <h4>Productos</h4>
                            {order.items.slice(0, 3).map((item, idx) => (
                                <div key={idx} className={styles.orderItem}>
                                    <img src={item.image} alt={item.name} />
                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemName}>{item.name}</p>
                                        <p className={styles.itemDetail}>
                                            Cantidad: {item.quantity} | {item.talle && `Talle: ${item.talle} | `}
                                            {item.color && `Color: ${item.color}`}
                                        </p>
                                    </div>
                                    <span className={styles.itemPrice}>
                                        {formatPrice(item.price * item.quantity)}
                                    </span>
                                </div>
                            ))}
                            {order.items.length > 3 && (
                                <p className={styles.moreItems}>
                                    +{order.items.length - 3} productos más
                                </p>
                            )}
                        </div>

                        <div className={styles.orderFooter}>
                            <div className={styles.orderTotal}>
                                <FiDollarSign size={16} />
                                <span>Total: </span>
                                <strong>{formatPrice(order.total)}</strong>
                            </div>
                            <button
                                className={styles.detailButton}
                                onClick={() => navigate(`/pedido/${order.orderNumber}`, { state: { order } })}
                            >
                                <FiEye size={16} />
                                Ver detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders