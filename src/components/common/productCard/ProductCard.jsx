import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';

const ProductCard = ({ product }) => {
  console.log('ProductCard recibió:', product)
  const navigate = useNavigate()
  const { id, name, price, offerPrice, images, category } = product;
  const hasOffer = offerPrice && offerPrice < price;
  const [imgError, setImgError] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishList = isInWishlist(id) // verifico si está en favorito

  // tomo la primera imagen del array, o una imagen por defecto
  const productImage = !imgError && images && images.length > 0
    ? images[0]
    : '/placeholder.jpg'
  
  const handleImageError = () => {
    setImgError(true)
  }

  const handleClick = () => {
    navigate(`/producto/${id}`) // navega al detalle
  }

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    if(inWishList){
      removeFromWishlist(id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCartClick = (e) => {
    e.stopPropagation()
    addToCart(product, 1, '', '') // sin talle/color por defecto
  }

  return (
    <div className={styles.productCard} onClick={handleClick}>
      <div className={styles.productImage}>
        <img 
          src={productImage} 
          alt={name}
          onError={(e) => {
            e.target.src = '/placeholder.jpg'; // si falla, muestra placeholder
          }}
        />
        {hasOffer && <span className={styles.offerBadge}>Oferta</span>}
        <button 
          className={`${styles.favoriteButton} ${inWishList ? styles.active : ''}`} 
          onClick={handleWishlistClick}
          aria-label={inWishList ? "Quitar de favoritos" : "Agregar a favoritos"}
        > 
          <FiHeart size={18} />
        </button>
      </div>

      <div className={styles.productInfo}>
        <span className={styles.productCategory}>{category}</span>
        <h3 className={styles.productName}>{name}</h3>
        
        <div className={styles.productPrice}>
          {hasOffer ? (
            <>
              <span className={styles.originalPrice}>${price.toLocaleString('es-AR')}</span>
              <span className={styles.offerPrice}>${offerPrice.toLocaleString('es-AR')}</span>
            </>
          ) : (
            <span className={styles.price}>${price.toLocaleString('es-AR')}</span>
          )}
        </div>

        <button 
          className={styles.addToCartButton}
          onClick={handleAddToCartClick}
        >
          <FiShoppingBag size={18} />
          <span>Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;