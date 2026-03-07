import { useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import styles from './OfferSection.module.scss';
import ProductCard from '../../common/productCard/ProductCard';

// datos mock de productos en oferta
const mockOffers = Array(12).fill().map((_, i) => ({
  id: i + 1,
  name: `Producto de ejemplo ${i + 1}`,
  price: 100 + i * 10,
  offerPrice: i % 2 === 0 ? 80 + i * 8 : null, // algunos en oferta, otros no
  image: `/productos/product-${(i % 5) + 1}.jpg`, // cicla entre 5 imágenes
  category: i % 3 === 0 ? 'Hombre' : i % 3 === 1 ? 'Mujer' : 'Accesorios'
}));

const OfferSection = () => {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [products] = useState(mockOffers);
  const { width } = useWindowSize();
  
  // defino breakpoints
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 6);
  };

  // en celulares, muestro todos para scroll horizontal
  // en tablet/desktop, muestro según visibleProducts
  const displayedProducts = isMobile ? products : products.slice(0, visibleProducts);
  const hasMore = !isMobile && visibleProducts < products.length;

  return (
    <section className={styles.offersSection}>
      <h2 className={styles.sectionTitle}>Ofertas</h2>
      
      <div className={styles.productGrid}>
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Ver más productos
        </button>
      )}
    </section>
  );
};

export default OfferSection;