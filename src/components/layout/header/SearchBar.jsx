import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './Header.module.scss';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de búsqueda
    console.log('Buscando:', searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBarDesktop}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <FiSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;