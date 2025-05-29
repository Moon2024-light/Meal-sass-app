'use client';

import React, { useState, useEffect } from 'react';
import MealList from '@/components/MealList.tsx'
import { Meal } from '@/types/Meal';

const PAGE_SIZE = 6; 
const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const fetchMeals = async (searchTerm: string) => {
    if (!searchTerm) {
      setMeals([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
        setPage(1); 
      } else {
        setMeals([]);
      }
    } catch (err) {
      setError('Failed to fetch meals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMeals(query.trim());
  };

  const paginatedMeals = meals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(meals.length / PAGE_SIZE);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Meal Search</h1>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search meals by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          aria-label="Search meals"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <MealList meals={paginatedMeals} />

      {meals.length > PAGE_SIZE && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {!loading && meals.length === 0 && query && (
        <p>No meals found for "{query}". Try another search.</p>
      )}
    </div>
  );
};

export default Home;
