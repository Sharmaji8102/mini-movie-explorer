import React from 'react';
import type { Movie } from '../types/movie';

interface Props {
  watchlist: Movie[];
}

const Watchlist: React.FC<Props> = ({ watchlist }) => {
  return (
    <div className="watchlist">
      <h2>My Watchlist</h2>
      {watchlist.map(movie => (
        <div key={movie.imdbID}>{movie.Title} ({movie.Year})</div>
      ))}
    </div>
  );
};

export default Watchlist;
