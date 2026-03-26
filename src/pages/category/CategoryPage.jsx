import { useParams, useSearchParams } from 'react-router-dom'
import { products } from '@data/products'
import styles from './CategoryPage.module.scss'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/common/productCard/ProductCard'
import { FiFilter, FiX } from 'react-icons/fi'

const CategoryPage = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const [categoryProducts, setCategoryProducts] = useState([])
  const [filters, setFilters] = useState({
    subcategoria: '',
    talle: '',
    color: '',
    precioMin: '',
    precioMax: '',
  })
  const [showFilters, setShowFilters] = useState(false) // estado para mobile

  useEffect(() => {
    let filtered = products.all.filter(p => {
      const match = p.category === category
      if(match) console.log('MATCH encontrado:', p.id, p.category)
      return match
    })

    const slugify = (str) => {
      if (!str) return str;
      return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase();
    };

    let subcategoriaParam = searchParams.get('categoria');
    subcategoriaParam = slugify(subcategoriaParam);
    if(subcategoriaParam) {
      filtered = filtered.filter(p => p.subcategoria === subcategoriaParam)
      console.log('Después filtro subcategoriaParam, count =', filtered.length)
      setFilters(prev => ({ ...prev, subcategoria: subcategoriaParam}))
    }

    let tipoParam = searchParams.get('subcategoria');
    tipoParam = slugify(tipoParam);
    if(tipoParam){
      filtered = filtered.filter(p => p.tipo === tipoParam)
      console.log('Después filtro tipoParam, count =', filtered.length)
    }

    setCategoryProducts(filtered)
    window.scrollTo(0,0)
  }, [category, searchParams])

  const subcategorias = [...new Set(categoryProducts.map(p => p.subcategoria))]
  const talles = [...new Set(categoryProducts.flatMap(p => p.talles))]
  const colores = [...new Set(categoryProducts.flatMap(p => p.colores))]

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

  const handleCloseFilters = () => {
    setShowFilters(false)
  }

  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryHeader}>
        <h1>{category === 'hombre' ? 'Hombre' : 'Mujer'}</h1>
        <div className={styles.headerInfo}>
          <p className={styles.resultsCount}>{filteredProducts.length} productos</p>
          {/* botón de filtros solo en mobile */}
          <button 
            className={styles.filterButtonMobile}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter size={20} />
            {showFilters ? 'Ocultar filtros' : 'Filtros'}
          </button>
        </div>
      </div>

      <div className={styles.categoryContent}>
        {/* sidebar de filtros - con clase condicional para mobile */}
        <aside className={`${styles.filtersSidebar} ${showFilters ? styles.filtersOpen : ''}`}>
          <div className={styles.filtersHeader}>
            <h3>Filtros</h3>
            <button 
              className={styles.closeFiltersMobile}
              onClick={() => setShowFilters(false)}
            >
              <FiX size={20} />
            </button>
          </div>
          
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
          
          {/* botón para ver productos en mobile */}
          <button 
            className={styles.seeProductsButton}
            onClick={handleCloseFilters}
          >
            Ver {filteredProducts.length} productos
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