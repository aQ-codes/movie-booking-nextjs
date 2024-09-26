"use client"

import React, { useEffect, useState } from 'react';
import { fetchActiveMovies } from '@/services/api/movieService'; 
import MovieCard from '@/app/(user)/components/MovieCard/MovieCard';
import styles from './ActiveMovies.module.css';

interface Movie {
  _id: string;
  title: string;
  poster: string;
  genres: string[]; // Array of genres
}

const ActiveMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [uniqueGenres, setUniqueGenres] = useState<string[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const fetchedMovies: Movie[] = await fetchActiveMovies();
        setMovies(fetchedMovies);

        // Extract unique genres from movies
        const genresSet = new Set<string>();
        fetchedMovies.forEach((movie: Movie) => {
          movie.genres.forEach((genre: string) => genresSet.add(genre.trim()));
        });
        setUniqueGenres(Array.from(genresSet));

      } catch (err) {
        setError('Failed to load active movies');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const handleGenreClick = (genre: string) => {
    if (genre === selectedGenre) {
      setSelectedGenre(null);  // Deselect genre if already selected
    } else {
      setSelectedGenre(genre); // Set clicked genre as selected
    }
  };

  // Filter movies by the selected genre
  const filteredMovies = selectedGenre
    ? movies.filter((movie: Movie) => movie.genres.includes(selectedGenre))
    : movies;

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.nowshowing}>
      <div className={styles.header}>
        <h1>Now Showing </h1>
      </div>

      {/* Genre Filter */}
      <div className={styles.genreFilter}>
        <div className={styles.genreCards}>
          <div
            className={`${styles.genreCard} ${!selectedGenre ? styles.selected : ''}`}
            onClick={() => setSelectedGenre(null)}
          >
            All
          </div>
          {uniqueGenres.map((genre: string) => (
            <div
              key={genre}
              className={`${styles.genreCard} ${selectedGenre === genre ? styles.selected : ''}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>

      {/* Movie List */}
      <div className={styles.moviesContainer}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie: Movie) => (
            <MovieCard
              key={movie._id}
              title={movie.title}
              poster={movie.poster}
              genres={movie.genres}
              movieId={movie._id}  // Pass the movieId to MovieCard
            />
          ))
        ) : (
          <p>No movies available for the selected genre</p>
        )}
      </div>
    </div>
  );
};

export default ActiveMovies;
