"use client"

import React, { useEffect, useState } from 'react';
import { fetchActiveMovies } from '@/axiosRequests/axiosRequests'; 
import MovieCard from '@/app/(user)/components/MovieCard/MovieCard';
import styles from './ActiveMovies.module.css';

interface Movie {
  _id: string;
  title: string;
  poster: string;
  genres: string[];
}

const ActiveMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const fetchedMovies = await fetchActiveMovies();
        setMovies(fetchedMovies);
      } catch (err) {
        setError('Failed to load active movies');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.moviesContainer}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            title={movie.title}
            poster={movie.poster}
            genres={movie.genres}
            movieId={movie._id}  // Pass the movieId to MovieCard
          />
        ))
      ) : (
        <p>No active movies available</p>
      )}
    </div>
  );
};

export default ActiveMovies;
