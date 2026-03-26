import { useEffect, useState } from "react"
import useWindowSize from "../../../hooks/useWindowSize"
import { getFeaturedProducts } from "@data/products"
import ProductCard from "../../common/productCard/ProductCard"
import styles from "./FeaturedSection.module.scss"

const FeaturedSection = () => {
  const [visibleProducts, setVisibleProducts] = useState(6)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const { width } = useWindowSize()

  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  useEffect(() => {
    const productsOnFeatured = getFeaturedProducts()
    setFeaturedProducts(productsOnFeatured)
    console.log('Productos destacados: ', productsOnFeatured.length);
  }, [])

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 6)
  }

  //en mobile, muestro todos para scroll horizontal
  //en tablet/desktop, muestro según visibleProducts
  const displayedProducts = isMobile ? featuredProducts : featuredProducts.slice(0, visibleProducts)
  const hasMore = !isMobile && visibleProducts < featuredProducts.length

  //si no hay productos destacados, no muestro la sección
  if(featuredProducts.length === 0){
    return null
  }

  return (
    <section className={styles.featuredSection}>
      <h2 className={styles.sectionTitle}>Productos destacados</h2>
      
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
  )
}

export default FeaturedSection