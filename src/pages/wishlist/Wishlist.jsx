import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"
import styles from './Wishlist.module.scss'
import { FiArrowLeft, FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi"

const Wishlist = () => {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
    const { addToCart } = useCart()
    const navigate = useNavigate()

    const handleAddToCart = (product) => {
        addToCart(product, 1, '', '')
        removeFromWishlist(product.id) //saco de favoritos al agregar al carrito
    }

    if (wishlist.length === 0) {
        return (
            <div className={styles.emptyWishlist}>
                <FiHeart size={48} />
                <h2>Tu wishlist está vacía</h2>
                <p>Guardá tus productos favoritos y volvé a ellos cuando quieras.</p>
                <button className={styles.continueShopping} onClick={() => navigate('/')}>
                    <FiArrowLeft size={18} />
                    Descubrir productos
                </button>
            </div>
        )
    }

    return (
        <div className={styles.wishlistPage}>
            <div className={styles.wishlistHeader}>
                <h1>Mis favoritos</h1>
                <button className={styles.clearButton} onClick={clearWishlist}>
                    Vaciar wishlist
                </button>
            </div>

            <div className={styles.wishlistGrid}>
                {wishlist.map(product => (
                    <div key={product.id} className={styles.wishlistItem}>
                        <div className={styles.productImage} onClick={() => navigate(`/producto/${product.id}`)}>
                            <img src={product.image} alt={product.name} />
                        </div>

                        <div className={styles.productInfo}>
                            <h3>{product.name}</h3>
                            <span className={styles.productCategory}>{product.category}</span>

                            <div className={styles.productPrice}>
                                {product.offerPrice ? (
                                    <>
                                        <span className={styles.originalPrice}>${product.price.toLocaleString('es-AR')}</span>
                                        <span className={styles.offerPrice}>${product.offerPrice.toLocaleString('es-AR')}</span>
                                    </>
                                ) : (
                                    <span className={styles.price}>${product.price.toLocaleString('es-AR')}</span>
                                )}
                            </div>

                            <div className={styles.productActions}>
                                <button
                                    className={styles.addToCartBtn}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <FiShoppingBag size={16} />
                                    Agregar al carrito
                                </button>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => removeFromWishlist(product.id)}
                                    aria-label="Eliminar de favoritos"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist