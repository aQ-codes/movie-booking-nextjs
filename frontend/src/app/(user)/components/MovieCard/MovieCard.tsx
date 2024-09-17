import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  title: string;
  poster: string;
  genres: string[];
  movieId: string;  // Add movieId as a prop
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster, genres, movieId }) => {
  const router = useRouter();

  // Handle click event
  const handleCardClick = () => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <Image src={poster} alt={title} width={300} height={450} className={styles.poster} />
      <div className={styles.details}>
        <h3>{title}</h3>
        <p>{genres.join(', ')}</p>
      </div>
    </div>
  );
};

export default MovieCard;
