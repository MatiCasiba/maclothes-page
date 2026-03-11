import { useParams, useSearchParams } from 'react-router-dom'
import { products } from '@data/products'
import styles from './CategoryPage.module.scss'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/common/productCard/ProductCard'

const CategoryPage = () => {
  const { category } = useParams() // hombre o mujer
  const [searchParams] = useSearchParams()
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
    // categoría viene de la ruta dinámica
    // productos ya cargados en products.all

    let filtered = products.all.filter(p => {
      const match = p.category === category
      if(match) console.log('MATCH encontrado:', p.id, p.category)
      return match
    })
    // número tras filtro categoría

    // convertidor camelCase -> kebab-case (slug)
    const slugify = (str) => {
      if (!str) return str;
      return str
        .replace(/([a-z])([A-Z])/g, '$1-$2') //agrego guion entre camelCase
        .replace(/_/g, '-') // guiones bajos para poner guiones si los hay
        .toLowerCase();
    };

    // aplico filtro por subcategoría sii viene en la url
    let subcategoriaParam = searchParams.get('categoria');
    subcategoriaParam = slugify(subcategoriaParam);
    // valor normalizado de subcategoriaParam
    if(subcategoriaParam) {
      filtered = filtered.filter(p => p.subcategoria === subcategoriaParam)
      console.log('Después filtro subcategoriaParam, count =', filtered.length)

      // actualizo el filtro para que se vea en el select (usar valor real)
      setFilters(prev => ({ ...prev, subcategoria: subcategoriaParam}))
    }

    // aplico filtro por tipo (sub-subcategoria)
    let tipoParam = searchParams.get('subcategoria');
    tipoParam = slugify(tipoParam);
    // valor normalizado de tipoParam
    if(tipoParam){
      filtered = filtered.filter(p => p.tipo === tipoParam)
      console.log('Después filtro tipoParam, count =', filtered.length)
    }

    // mostrar resultados finales

    setCategoryProducts(filtered)
    window.scrollTo(0,0) //scroll al inicio al cambiar de categoría
  }, [category, searchParams])

  //obtengo valores únicos para filtros
  const subcategorias = [...new Set(categoryProducts.map(p => p.subcategoria))]
  const talles = [...new Set(categoryProducts.flatMap(p => p.talles))]
  const colores = [...new Set(categoryProducts.flatMap(p => p.colores))]
  
  // logs de depuración opcionales (comentar si no hace falta)

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