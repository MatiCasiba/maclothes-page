import { useEffect, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import styles from './OfferSection.module.scss';
import ProductCard from '../../common/productCard/ProductCard';
import { getOfferProducts } from '../../../../data/products';

const OfferSection = () => {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [offerProducts, setOfferProducts] = useState([]);
  const { width } = useWindowSize();
  
  // defino breakpoints
  const isMobile = width < 768;

  // carga de productos en oferta al montar componente
  useEffect(() => {
    const productsOnOffer = getOfferProducts()
    setOfferProducts(productsOnOffer)
    console.log('Productos en oferta:', productsOnOffer.length)

    // verifico que tengan imágenes
    productsOnOffer.forEach(p => {
      console.log(`${p.name}:`, {
        tieneImages: !!p.images,
        cantidad: p.images?.length,
        primeraImgen: p.images?.[0]
      })
    })
  }, [])

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 6);
  };

  const handleShowLess = () => {
    setVisibleProducts(6);
    // scroll suave al inicio de la sección
    const section = document.getElementById('offers-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // en celulares, muestro todos para scroll horizontal
  // en tablet/desktop, muestro según visibleProducts
  const displayedProducts = isMobile ? offerProducts : offerProducts.slice(0, visibleProducts);
  const hasMore = !isMobile && visibleProducts < offerProducts.length;
  const hasLess = !isMobile && visibleProducts > 6;

  // si no hay productos en oferta, no muestro la sección
  if(offerProducts.length === 0){
    return null;
  }

  return (
    <section id="offers-section" className={styles.offersSection}>
      <h2 className={styles.sectionTitle}>Ofertas</h2>
      
      <div className={styles.productGrid}>
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.buttonsContainer}>
        {hasMore && (
          <button className={styles.loadMore} onClick={handleLoadMore}>
            Ver más productos
          </button>
        )}
        {hasLess && (
          <button className={styles.showLess} onClick={handleShowLess}>
            Ver menos
          </button>
        )}
      </div>
    </section>
  );
};

export default OfferSection;