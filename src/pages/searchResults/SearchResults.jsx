import { useEffect, useState } from "react"
import { FiArrowLeft, FiSearch } from "react-icons/fi"
import { useNavigate, useSearchParams } from "react-router-dom"
import { products } from '@data/products'
import ProductCard from "../../components/common/productCard/ProductCard"
import styles from './SearchResults.module.scsss'

const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q') || ''
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)

        if (query.trim() === '') {
            setResults([])
            setIsLoading(false)
            return
        }

        const term = query.toLowerCase()
        const filtered = products.all.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            (product.subcategoria && product.subcategoria.toLowerCase().includes(term)) ||
            (product.description && product.description.toLowerCase().includes(term))
        )

        setResults(filtered)
        setIsLoading(false)
        window.scrollTo(0, 0)
    }, [query])

    const handleNewSearch = (e) => {
        e.preventDefault()
        const newQuery = e.target.search.value.trim()
        if (newQuery) {
            navigate(`/buscar?q=${encodeURIComponent(newQuery)}`)
        }
    }

    return (
        <div className={styles.searchResultsPage}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                <FiArrowLeft size={20} />
                Volver
            </button>

            <div className={styles.searchHeader}>
                <h1>Resultados de búsqueda</h1>
                <form onSubmit={handleNewSearch} className={styles.searchForm}>
                    <div className={styles.searchInputWrapper}>
                        <FiSearch size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            name="search"
                            defaultValue={query}
                            placeholder="Buscar productos..."
                            className={styles.searchInput}
                        />
                    </div>
                    <button type="submit" className={styles.searchButton}>
                        Buscar
                    </button>
                </form>
            </div>

            {isLoading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Buscando productos...</p>
                </div>
            ) : (
                <>
                    <div className={styles.resultsInfo}>
                        <p>{results.length} {results.length === 1 ? 'resultado' : 'resultados'} para <strong>"{query}"</strong></p>
                    </div>

                    {results.length === 0 ? (
                        <div className={styles.noResults}>
                            <FiSearch size={64} />
                            <h2>No encontramos resultados</h2>
                            <p>No hay productos que coincidan con "{query}"</p>
                            <p className={styles.suggestions}>Probá con otras palabras o explorá nuestras categorías</p>
                            <div className={styles.suggestionButtons}>
                                <button onClick={() => navigate('/hombre')}>Ver Hombre</button>
                                <button onClick={() => navigate('/mujer')}>Ver Mujer</button>
                                <button onClick={() => navigate('/')}>Ir al inicio</button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.resultsGrid}>
                            {results.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default SearchResults