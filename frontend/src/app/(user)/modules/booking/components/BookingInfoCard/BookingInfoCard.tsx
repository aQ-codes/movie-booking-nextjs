import React, { useEffect, useState } from 'react';
import styles from './BookingInfoCard.module.css'; // Import the CSS file
import Image from 'next/image';

interface Seat {
  seatId: string;
  seatName: string;
  sectionNumber: number;
  sectionName: string;
}

interface BookingInfo {
  showDetails: {
    movieId: {
      title: string;
      poster: string;
    };
    screenId: {
      screenNumber: number;
      screenType: string;
      cinemas: {
        name: string;
        location: string;
      };
    };
    date: string;
    time: string;
    language: string;
  };
  selectedSeats: Record<string, Seat>;
  totalPrice: number;
}

const BookingInfoCard: React.FC<{ setTotalPrice: (price: number) => void }> = ({ setTotalPrice }) => {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('booking');
    if (storedData) {
      const parsedData: BookingInfo = JSON.parse(storedData);
      setBookingInfo(parsedData);
      setTotalPrice(parsedData.totalPrice); // Set the totalPrice for the parent component
      
      // Extract show details
      const { showDetails } = parsedData;

      // Gather selected seats
      const selectedSeats = Object.values(parsedData.selectedSeats).map((seat) => ({
        seatName: seat.seatName,
        sectionName: seat.sectionName,
      }));

      // Create an object to store in sessionStorage
      const bookingDetails = {
        movieTitle: showDetails.movieId.title || 'N/A',
        screenNumber: showDetails.screenId.screenNumber || 'N/A',
        screenType: showDetails.screenId.screenType || 'N/A',
        cinemaName: showDetails.screenId.cinemas.name || 'N/A',
        cinemaLocation: showDetails.screenId.cinemas.location || 'N/A',
        formattedDate: formatDate(showDetails.date),  // Format the date
        formattedTime: formatTime(showDetails.time),   // Format the time
        language: showDetails.language,
        totalPrice: parsedData.totalPrice,
        seats: selectedSeats, // Add selected seats
      };

      // Store the booking details object in sessionStorage
      sessionStorage.setItem('bookingInfo', JSON.stringify(bookingDetails));
    }
  }, [setTotalPrice]);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const renderSeatsBySection = () => {
    const sections: { [key: string]: string[] } = {};

    if (bookingInfo) {
      Object.values(bookingInfo.selectedSeats).forEach((seat) => {
        const sectionName = seat.sectionName;
        if (!sections[sectionName]) {
          sections[sectionName] = [];
        }
        sections[sectionName].push(seat.seatName);
      });
    }
    
    return Object.entries(sections).map(([sectionName, seatNames]) => (
      <div key={sectionName} className={styles.section}>
        <h4>{sectionName}</h4>
        <ul>
          {seatNames.map((seatName, index) => (
            <li key={index}>{seatName}</li>
          ))}
        </ul>
      </div>
    ));
  };

  if (!bookingInfo) {
    return <p>Loading booking info...</p>;
  }

  const { showDetails } = bookingInfo;

  return (
    <div className={styles.bookingInfoCard}>
      <div className={styles.posterContainer}>
        {showDetails.movieId.poster && (
          <Image 
            src={showDetails.movieId.poster} 
            alt={`${showDetails.movieId.title} poster`} 
            className={styles.poster}
            width={80}
            height={80}
          />
        )}
      </div>
      <div className={styles.info}>
        <h2>{showDetails.movieId.title || 'N/A'}</h2>
        <div className={styles.details}>
          <p><strong>Screen Number:</strong> {showDetails.screenId.screenNumber || 'N/A'}</p>
          <p><strong>Screen Type:</strong> {showDetails.screenId.screenType || 'N/A'}</p>
          <p><strong>Cinema:</strong> {showDetails.screenId.cinemas.name || 'N/A'}</p>
          <p><strong>Location:</strong> {showDetails.screenId.cinemas.location || 'N/A'}</p>
          <p><strong>Date:</strong> {formatDate(showDetails.date)}</p>
          <p><strong>Time:</strong> {formatTime(showDetails.time)}</p>
          <p><strong>Language:</strong> {showDetails.language}</p>
        </div>
        <div className={styles.seats}>
          <div>{renderSeatsBySection()}</div>
        </div>
        <div className={styles.totalPrice}>
          <strong>Total Price</strong> ₹{bookingInfo.totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default BookingInfoCard;
