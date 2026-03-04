import { FiShoppingBag } from 'react-icons/fi';
import styles from './Header.module.scss';

const CartIcon = () => {
  // temporalmente hardcodeado, luego el contexto
  const itemCount = 0;

  return (
    <div className={styles.cartIcon}>
      <button className={styles.iconButton} aria-label="Carrito">
        <FiShoppingBag size={24} />
        {itemCount > 0 && (
          <span className={styles.cartBadge}>{itemCount}</span>
        )}
      </button>
    </div>
  );
};

export default CartIcon;