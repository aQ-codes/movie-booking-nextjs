import React, { useEffect, useState } from 'react';
import { fetchScreenDetailsById } from '@/app/(user)/(modules)/movie/requests/axiosRequests';
import { fetchShowDetailsById } from '../../../../requests/axiosRequest';
import SeatLayout from '../SeatLayout/SeatLayout';
import styles from './SeatSection.module.css';

interface SeatSectionProps {
  showId?: string | string[] | undefined;
  screenId?: string | string[] | undefined;
}

const SeatSection: React.FC<SeatSectionProps> = ({ showId, screenId }) => {
  const [screenDetails, setScreenDetails] = useState<any>(null);
  const [showDetails, setShowDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof screenId === 'string') {
          const screenData = await fetchScreenDetailsById(screenId);
          setScreenDetails(screenData);
        }

        if (typeof showId === 'string') {
          const showData = await fetchShowDetailsById(showId);
          setShowDetails(showData);
        }
      } catch (err) {
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [screenId, showId]);

  console.log(showDetails)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.seatsection}>
      <p>Show ID: {showId ?? 'Not provided'}</p>
      <p>Screen ID: {screenId ?? 'Not provided'}</p>

      <div>
        {screenDetails && showDetails ? (
          <div>
            <p>Screen Number: {screenDetails.screenNumber}</p>
            <p>Screen Type: {screenDetails.screenType}</p>
            <p>Show Time: {showDetails.time}</p>
            <p>Show Language: {showDetails.language}</p>

            {/* Pass both screenDetails and showDetails to SeatLayout */}
            <SeatLayout 
              seatArrangement={screenDetails.seatArrangement} 
              screenDetails={screenDetails}
            />
             <div className={styles.screen}>
              <h3>All Eyes this way</h3>
              <div></div>
            </div>
          </div>
        ) : (
          <p>No screen or show details available.</p>
        )}
      </div>
    </div>
  );
};

export default SeatSection;
