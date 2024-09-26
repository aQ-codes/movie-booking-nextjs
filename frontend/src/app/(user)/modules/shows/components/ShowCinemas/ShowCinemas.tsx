"use client"

import React, { useEffect, useState, forwardRef } from 'react';
import { fetchCinemasForMovieAndDate } from '../../requests/axiosRequests'; 
import styles from './ShowCinemas.module.css'; 
import ShowTimes from '../ShowTimes/ShowTimes';

interface Cinemas {
  _id: string;
  name: string;
  location: string;
}

interface CinemasProps {
  movieId: string;
  selectedDate: string;
}

// Use forwardRef to allow the parent component to access the ref
const ShowCinemas = forwardRef<HTMLDivElement, CinemasProps>(({ movieId, selectedDate }, ref) => {
  const [cinemas, setCinemas] = useState<Cinemas[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const cinemaData = await fetchCinemasForMovieAndDate(movieId, selectedDate);
        setCinemas(cinemaData);
      } catch (err) {
        setError('Failed to fetch cinemas');
      }
    };

    fetchCinemas();
  }, [movieId, selectedDate]);
   
  if (error) {
    return <p>{error}</p>;
  }

  if (cinemas.length === 0) {
    return <p>No cinemas available for this date.</p>;
  }

  return (
    <div ref={ref} className={styles.cinemaContainer}>
      {cinemas.map((cinema) => (
        <div key={cinema._id} className={styles.cinemaCard}>
          <div className={styles.details}>
            <h3>{cinema.name},</h3>
            <p>{cinema.location}</p>
          </div>
          <ShowTimes movieId={movieId} cinemaId={cinema._id} selectedDate={selectedDate} />
        </div>
      ))}
    </div>
  );
});

// Display a default name for the component in React DevTools
ShowCinemas.displayName = 'ShowCinemas';

export default ShowCinemas;
