import React from 'react';
import type { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onAdd: (movie: Movie) => void;
  isInWatchlist: boolean;
}

const MovieCard: React.FC<Props> = ({ movie, onAdd, isInWatchlist }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title} ({movie.Year})</h3>
      {!isInWatchlist && <button onClick={() => onAdd(movie)}>+ Watchlist</button>}
    </div>
  );
};

export default MovieCard;
