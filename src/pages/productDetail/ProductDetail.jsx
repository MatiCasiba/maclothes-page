import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft, FiShoppingBag, FiHeart } from 'react-icons/fi'
import ProductCard from '../../components/common/productCard/ProductCard'
import {products} from '@data/products'
import styles from './ProductDetail.module.scss'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedTalle, setSelectedTalle] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  useEffect(() => {
    // busca el producto por id
    const foundProduct = products.all.find(p => p.id === id)
    setProduct(foundProduct)
    window.scrollTo(0, 0)
  }, [id])

  if(!product){
    return <div className={styles.loading}>Cargando producto...</div>
  }

  const relatedProducts = products.all
    .filter(p => 
      p.category === product.category &&
      p.id !== product.id &&
      p.subcategoria === product.subcategoria
    )
    .slice(0, 4)
  
  const handleAddToCart = () => {
    if(!selectedTalle){
      alert('Por favor seleccioná un talle')
      return
    }
    // acá va la lógica del carrito
    console.log('Agregar al carrito', {
      product,
      talle: selectedTalle,
      color: selectedColor
    })
  }

  return (
    <div className={styles.productDetail}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <FiArrowLeft size={20} />
        Volver
      </button>

      <div className={styles.productContainer}>
        {/* galería de imágenes */}
        <div className={styles.productGallery}>
          <div className={styles.mainImage}>
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
            />
          </div>
          <div className={styles.thumbnailGrid}>
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* información del producto */}
        <div className={styles.productInfo}>
          <span className={styles.productCategory}>
            {product.category} / {product.subcategoria}
          </span>
          <h1 className={styles.productName}>{product.name}</h1>
          
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

          <div className={styles.productDescription}>
            <h3>Descripción</h3>
            <p>{product.description}</p>
          </div>

          {/* selector de talle */}
          <div className={styles.selectorSection}>
            <h3>Talle <span className={styles.required}>*</span></h3>
            <div className={styles.tallesGrid}>
              {product.talles.map(talle => (
                <button
                  key={talle}
                  className={`${styles.talleButton} ${selectedTalle === talle ? styles.selected : ''}`}
                  onClick={() => setSelectedTalle(talle)}
                >
                  {talle}
                </button>
              ))}
            </div>
          </div>

          {/* selector de color */}
          {product.colores && product.colores.length > 0 && (
            <div className={styles.selectorSection}>
              <h3>Color</h3>
              <div className={styles.coloresGrid}>
                {product.colores.map(color => (
                  <button
                    key={color}
                    className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* botones de acción */}
          <div className={styles.actionButtons}>
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              <FiShoppingBag size={20} />
              Agregar al carrito
            </button>
            <button className={styles.favoriteBtn}>
              <FiHeart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedProducts}>
          <h2>Productos relacionados</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail