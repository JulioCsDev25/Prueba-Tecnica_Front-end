import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchForm({ setSearchResults, setError }) {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (searchText.length >= 4 && searchText !== 'iseijasunow') {
        const response = await axios.get(`https://api.github.com/search/users?q=${searchText}&per_page=10`);
        const usersData = response.data.items;
        setSearchResults(usersData);
        navigate('/user-list');
      } else {
        const errorMessage =
          searchText.length < 4
            ? 'La búsqueda debe contener al menos 4 caracteres.'
            : 'No se permite la búsqueda de "iseijasunow".';
        setError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setError('Error al realizar la búsqueda.');
    }
  };

  return (
    <div className='container'>
      <div className='search-bar'>
        <input
          type="text"
          className='form-control search-form-control'
          placeholder="Buscar usuario"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        
        <button onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="feather feather-search toggle-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
