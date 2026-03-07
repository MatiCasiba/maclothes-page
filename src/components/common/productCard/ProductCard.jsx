import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import styles from './ProductCard.module.scss';

const ProductCard = ({ product }) => {
  const { name, price, offerPrice, image, category } = product;
  const hasOffer = offerPrice && offerPrice < price;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={image} alt={name} />
        {hasOffer && <span className={styles.offerBadge}>Oferta</span>}
        <button className={styles.favoriteButton} aria-label="Agregar a favoritos">
          <FiHeart size={18} />
        </button>
      </div>

      <div className={styles.productInfo}>
        <span className={styles.productCategory}>{category}</span>
        <h3 className={styles.productName}>{name}</h3>
        
        <div className={styles.productPrice}>
          {hasOffer ? (
            <>
              <span className={styles.originalPrice}>${price}</span>
              <span className={styles.offerPrice}>${offerPrice}</span>
            </>
          ) : (
            <span className={styles.price}>${price}</span>
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