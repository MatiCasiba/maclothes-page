import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { FiArrowLeft, FiTrash2 } from "react-icons/fi"
import styles from './Cart.module.scss'

const Cart = () => {
  const {cart, removeFromCart, updateQuantity, getSubtotal, clearCart} = useCart()
  const navigate = useNavigate()

  if(cart.lengt === 0){
    return (
        <div className={StyleSheet.emptyCart}>
            <h2>Tu carrito está vacío</h2>
            <p>Explorá nuestros productos y encontrá lo que buscás</p>
            <button className={StyleSheet.continueShoppiong} onClick={() => navigate('/')}>
                <FiArrowLeft size={18} />
                Seguir comprando
            </button>
        </div>
    )
  }

  return (
    <div className={styles.cartPage}>
      <h1>Carrito de compras</h1>
      
      <div className={styles.cartContainer}>
        {/* Lista de productos */}
        <div className={styles.cartItems}>
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.talle}-${item.color}-${index}`} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p className={styles.itemCategory}>{item.category}</p>
                {item.talle && <p className={styles.itemDetail}>Talle: {item.talle}</p>}
                {item.color && <p className={styles.itemDetail}>Color: {item.color}</p>}
              </div>

              <div className={styles.itemPrice}>
                <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                {item.originalPrice > item.price && (
                  <span className={styles.originalPrice}>
                    ${item.originalPrice.toLocaleString('es-AR')} c/u
                  </span>
                )}
              </div>

              <div className={styles.itemQuantity}>
                <button 
                  onClick={() => updateQuantity(item.id, item.talle, item.color, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.talle, item.color, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button 
                className={styles.removeItem}
                onClick={() => removeFromCart(item.id, item.talle, item.color)}
                aria-label="Eliminar producto"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumen de compra */}
        <div className={styles.cartSummary}>
          <h2>Resumen de compra</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${getSubtotal().toLocaleString('es-AR')}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Envío</span>
            <span>A calcular</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>${getSubtotal().toLocaleString('es-AR')}</span>
          </div>

          <button className={styles.checkoutButton}>
            Finalizar compra
          </button>

          <button className={styles.clearCartButton} onClick={clearCart}>
            Vaciar carrito
          </button>

          <button className={styles.continueShopping} onClick={() => navigate('/')}>
            <FiArrowLeft size={16} />
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart