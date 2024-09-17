import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '@/axiosRequests/axiosRequests';
import Image from 'next/image'; // Import Next.js Image component
import styles from './MovieDetailCard.module.css';

interface MovieDetailProps {
  movieId: string;
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

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId }) => {
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
            width={300} // Set the desired width
            height={450} // Set the desired height
            className={styles.poster}
            layout="intrinsic" // Use 'intrinsic' for maintaining aspect ratio
          />
        )}
      </div>
      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{movie?.title}</h1>
        <div className={styles.genresAndTime}>
          <span className={styles.genres}>{movie?.genres.join(', ')}</span>
          <span className={styles.runningTime}>{movie?.runningTime} mins</span>
        </div>
        <p className={styles.synopsis}>{movie?.synopsis}</p>
        <div className={styles.castSection}>
          <h3>Cast:</h3>
          <ul className={styles.castList}>
            {movie?.cast.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
