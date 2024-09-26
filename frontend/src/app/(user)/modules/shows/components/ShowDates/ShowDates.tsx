import React, { useEffect, useState } from 'react';
import { fetchActiveDatesForMovie } from '../../requests/axiosRequests'; 
import styles from './ShowDates.module.css'; // CSS module for styling

interface ShowDatesProps {
  movieId: string;
  onDateSelect: (date: string) => void;  // Callback function to handle the date click
}

const ShowDates: React.FC<ShowDatesProps> = ({ movieId, onDateSelect }) => {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to track the selected date
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const activeDates = await fetchActiveDatesForMovie(movieId);
        setDates(activeDates);

        // Automatically select the first date when dates are fetched, if no date is already selected
        if (activeDates.length > 0 && !selectedDate) {
          setSelectedDate(activeDates[0]);
          onDateSelect(activeDates[0]); // Pass the first date to the parent component
        }
      } catch (err) {
        setError('Failed to fetch active dates');
      }
    };

    fetchDates();
  }, [movieId, selectedDate, onDateSelect]); // Add selectedDate to the dependency array

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString); // Set the selected date
    onDateSelect(dateString);    // Pass the selected date to the parent component
  };

  const formatDate = (dateString: string): { dayName: string; day: string; month: string } => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short', // Tue
      day: 'numeric',   // 17
      month: 'short',   // Sep
    };

    const date = new Date(dateString + 'T00:00:00'); // Convert string to date
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset for IST
    const istDate = new Date(date.getTime() + istOffset);

    const formatted = new Intl.DateTimeFormat('en-US', options).format(istDate);
    const [dayName, day, month] = formatted.split(' ');

    return { dayName, day, month };
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.showDatesContainer}>
        {dates.length === 0 ? (
        <p>No active dates available.</p>
        ) : (
        dates.map((dateString) => {
            const { dayName, day, month } = formatDate(dateString);
            return (
            <div
                key={dateString}
                className={`${styles.card} ${selectedDate === dateString ? styles.selected : ''}`} // Add selected style if the date is selected
                onClick={() => handleDateSelect(dateString)} // Pass the original date when clicked
            >
                <p className={styles.dayName}>{dayName}</p>
                <p className={styles.day}>{day}</p>
                <p className={styles.month}>{month}</p>
            </div>
            );
        })
        )}
    </div>
  );
};

export default ShowDates;
