import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '@/services/api/movieService'; 
import Image from 'next/image'; 
import styles from './MovieDetailCard.module.css';

interface MovieDetailProps {
  movieId: string;
  onBookNowClick: () => void; // Accept the prop
}

interface Movie {
  title: string;
  cast: string[];
  synopsis: string;
  runningTime: number;
  poster: string;
  status: string;
  genres: string[];
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId, onBookNowClick }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.movieDetail}>
      <div className={styles.posterSection}>
        {movie?.poster && (
          <Image 
            src={movie.poster}
            alt={`${movie?.title} poster`}
            width={240}
            height={320}
            className={styles.poster}
            layout="intrinsic"
          />
        )}
      </div>
      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{movie?.title}</h1>
        <div className={styles.genresAndTime}>
          <div className={styles.genres}>
            {movie?.genres.map((genre, index) => (
              <span key={index} className={styles.genre}>
                {genre}
              </span>
            ))}
          </div>
          <span className={styles.runningTime}>{movie?.runningTime} minutes</span>
        </div>
        <p className={styles.synopsis}>{movie?.synopsis}</p>
        <div className={styles.castSection}>
          <ul className={styles.castList}>
            {movie?.cast.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
        </div>
        <button onClick={onBookNowClick} className={styles.btn}> {/* Use the passed function */}
          Show Times
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
