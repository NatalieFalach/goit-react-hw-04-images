import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { useState } from "react";



export function Searchbar({onSubmit}) {
  const [search, setSearch] = useState('');
  
  const handleInputChange = e => {
    setSearch(e.target.value.toLowerCase());
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(search.trim() === '') {
      toast.error ('Enter a search term.') 
      return
    }
    onSubmit(search);
  }
  return (
     <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>
          <input
            className={styles['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleInputChange}
            value={search}
            placeholder="Search images and photos"
          />
        </form>
        <Toaster position="top-right" />
      </header>
   )
}


Searchbar.propTypes = {
    onSubmit:PropTypes.func.isRequired
};
  