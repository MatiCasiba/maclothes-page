import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  console.log('ProductCard recibió:', product)
  const navigate = useNavigate()
  const { id, name, price, offerPrice, images, category } = product;
  const hasOffer = offerPrice && offerPrice < price;
  const [imgError, setImgError] = useState(false)

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
          className={styles.favoriteButton} 
          aria-label="Agregar a favoritos"
          onClick={(e) => e.stopPropagation()} // evita que el click llega a la card
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

        <button className={styles.addToCartButton}>
          <FiShoppingBag size={18} />
          <span>Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;