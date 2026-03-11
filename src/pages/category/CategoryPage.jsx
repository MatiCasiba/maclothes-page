import { useParams } from 'react-router-dom'
import { products } from '@data/products'
import styles from './CategoryPage.module.scss'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/common/productCard/ProductCard'

const CategoryPage = () => {
  const { category } = useParams() // hombre o mujer
  const [categoryProducts, setCategoryProducts] = useState([])
  const [filters, setFilters] = useState({
    subcategoria: '',
    talle: '',
    color: '',
    precioMin: '',
    precioMax: '',
  })

  useEffect(() => {
    //filtro productos por categoría (hombre/mujer)
    const filtered = products.all.filter(p => p.category === category)
    setCategoryProducts(filtered)
    window.scrollTo(0,0) //scroll al inicio al cambiar de categoría
  }, [category])

  //obtengo valores únicos para filtros
  const subcategorias = [...new Set(categoryProducts.map(p => p.subcategoria))]
  const talles = [...new Set(categoryProducts.flatMap(p => p.talles))]
  const colores = [...new Set(categoryProducts.flatMap(p => p.colores))]

  // aplico filtros
  const filteredProducts = categoryProducts.filter(product => {
    if (filters.subcategoria && product.subcategoria !== filters.subcategoria) return false;
    if (filters.talle && !product.talles.includes(filters.talle)) return false;
    if (filters.color && !product.colores.includes(filters.color)) return false;
    if (filters.precioMin && product.price < Number(filters.precioMin)) return false;
    if (filters.precioMax && product.price > Number(filters.precioMax)) return false;
    return true;
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value}))
  }

  const clearFilters = () => {
    setFilters({
      subcategoria: '',
      talle: '',
      color: '',
      precioMin: '',
      precioMax: ''
    })
  }
  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryHeader}>
        <h1>{category === 'hombre' ? 'Hombre' : 'Mujer'}</h1>
        <p className={styles.resultsCount}>{filteredProducts.length} productos</p>
      </div>

      <div className={styles.categoryContent}>
        {/* sidebar de filtros */}
        <aside className={styles.filtersSidebar}>
          <h3>Filtros</h3>
          
          {/* filtro por subcategoría */}
          <div className={styles.filterGroup}>
            <label>Categoría</label>
            <select name="subcategoria" value={filters.subcategoria} onChange={handleFilterChange}>
              <option value="">Todas</option>
              {subcategorias.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* filtro por talle */}
          <div className={styles.filterGroup}>
            <label>Talle</label>
            <select name="talle" value={filters.talle} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {talles.sort((a, b) => a - b).map(talle => (
                <option key={talle} value={talle}>{talle}</option>
              ))}
            </select>
          </div>

          {/* filtro por color */}
          <div className={styles.filterGroup}>
            <label>Color</label>
            <select name="color" value={filters.color} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {colores.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* filtro por precio */}
          <div className={styles.filterGroup}>
            <label>Precio mínimo</label>
            <input
              type="number"
              name="precioMin"
              value={filters.precioMin}
              onChange={handleFilterChange}
              placeholder="Ej: 10000"
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Precio máximo</label>
            <input
              type="number"
              name="precioMax"
              value={filters.precioMax}
              onChange={handleFilterChange}
              placeholder="Ej: 50000"
            />
          </div>

          <button className={styles.clearFilters} onClick={clearFilters}>
            Limpiar filtros
          </button>
        </aside>

        {/* grid de productos */}
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage