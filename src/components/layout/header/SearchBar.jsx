import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null)
  const navigate = useNavigate()

  //filtra productos según el término de búsqueda
  useEffect(() => {
    if(searchTerm.trim() === ''){
      setSuggestions([])
      return
    }

    const term = searchTerm.toLocaleLowerCase()
    const filtered = products.all
      .filter(product => product.name.toLoweCase().includes(term))
      .slice(0, 8) // limite de sugerencias
    setSuggestions(filtered)
  }, [searchTerm])

  // cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim() === '') return
    // redirigo a una ppágina de resultados
    navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`)
    setSearchTerm('')
    setShowSuggestions(false)
    console.log('Buscando:', searchTerm);
  };

  const handleSuggestionClick = (product) => {
    navigate(`/producto/${product.id}`)
    setSearchTerm('')
    setShowSuggestions(false)
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    setShowSuggestions(true)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setShowSuggestions(false)
  }

  return (
    <div ref={wrapperRef} className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={styles.searchBarDesktop}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button type="button" className={styles.clearButton} onClick={clearSearch}>
            <FiX size={16} />
          </button>
        )}
        <button type="submit" className={styles.searchButton}>
          <FiSearch size={20} />
        </button>
      </form>

      {/* dropdown de sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsDropdown}>
          {suggestions.map(product => (
            <li key={product.id} onClick={() => handleSuggestionClick(product)}>
              <img src={product.images[0]} alt={product.name} />
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;