import React, { useEffect, useState } from 'react';
import { fetchShowsForCinemasAndDate } from '../../../../requests/axiosRequests'; 
import { convertTo12HourFormat } from '@/utils/helpers/timeUtils'; 
import styles from './ShowTimes.module.css'; 
import { useRouter } from 'next/navigation';

interface Show {
  showId: string;
  time: string;
  screenId: string;
  screenType: string;
}

interface ShowTimesProps {
  movieId: string;
  cinemaId: string;
  selectedDate: string;
}

const ShowTimes: React.FC<ShowTimesProps> = ({ movieId, cinemaId, selectedDate }) => {
  const router = useRouter();
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<{ showId: string; screenId: string } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const showsData = await fetchShowsForCinemasAndDate(movieId, cinemaId, selectedDate);
        setShows(showsData);
      } catch (err) {
        setError('Failed to fetch shows');
      }
    };
    
    fetchShows();
  }, [movieId, cinemaId, selectedDate]);

    const handleShowSelect = (showId: string, screenId: string) => {
    setSelectedShow({ showId, screenId });
    
    const url = `/seats/${showId}/${screenId}`;
    router.push(url);

    };


  if (error) {
    return <p>{error}</p>;
  }

  if (shows.length === 0) {
    return <p>No shows available for this cinema.</p>;
  }

  return (
    <div className={styles.showTimesContainer}>
      {shows.map((show) => (
        <div
          key={show.showId}
          className={`${styles.showCard} ${selectedShow?.showId === show.showId ? styles.selected : ''}`}
          onClick={() => handleShowSelect(show.showId, show.screenId)}
        >
          <p>{convertTo12HourFormat(show.time)}</p>
          <p>{show.screenType}</p>
        </div>
      ))}
    </div>
  );  
};

export default ShowTimes;
