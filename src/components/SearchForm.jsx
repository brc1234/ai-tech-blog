import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchForm({ searchquery, setSearchQuery }) {
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    if (searchquery && searchquery.trim() !== '') {
      navigate(`/alle-eintraege?search=${searchquery}`);
    }
  };

  return (
    <form className="d-flex mb-2 mb-lg-0 ms-auto" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control me-1 o-arama-input" 
        value={searchquery}
        onChange={handleChange}
        placeholder="Suchen..."
        aria-label="Search"
      />
      <button className="btn btn-outline-light d-none" type="submit">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}