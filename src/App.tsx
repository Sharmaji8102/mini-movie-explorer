import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Watchlist from './components/Watchlist';
import type { Movie } from './types/movie';

const App: React.FC = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ stable function using useCallback
  const searchMovies = useCallback(async (query: string) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=867e57fb`);
      const data = await response.json();
      if (data.Response === 'True') {
        setResults(data.Search.slice(0, 10));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, []);

  const addToWatchlist = (movie: Movie) => {
    if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
      const updated = [...watchlist, movie];
      setWatchlist(updated);
      localStorage.setItem('watchlist', JSON.stringify(updated));
    }
  };

  return (
    <div className="app">
      <h1>🎬 Mini Movie Explorer</h1>
      <SearchBar onDebouncedSearch={searchMovies} />
      <div className="results">
        {results.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAdd={addToWatchlist}
            isInWatchlist={watchlist.some(m => m.imdbID === movie.imdbID)}
          />
        ))}
      </div>
      <Watchlist watchlist={watchlist} />
    </div>
  );
};

export default App;
