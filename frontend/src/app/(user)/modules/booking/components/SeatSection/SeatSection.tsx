import React, { useEffect, useState } from 'react';
import { fetchScreenDetailsById } from '../../../shows/requests/axiosRequests'; 
import { fetchShowDetailsById, getShowPricesWithSections } from '../../requests/axiosRequest'; 
import SeatLayout from '../SeatLayout/SeatLayout';
import styles from './SeatSection.module.css';
import { useRouter } from 'next/navigation'; // Import useRouter
import { convertTo12HourFormat, convertToISTAndFormat } from '@/utils/timeUtils';
import Image from 'next/image';

interface SeatSectionProps {
  showId?: string | string[] | undefined;
  screenId?: string | string[] | undefined;
}

interface Price {
  sectionId: string;
  price: number;
  sectionName: string;
  sectionNumber: number;
}

const SeatSection: React.FC<SeatSectionProps> = ({ showId, screenId }) => {
  const [screenDetails, setScreenDetails] = useState<any>(null);
  const [showDetails, setShowDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<{ [key: string]: { seatId: string, seatName: string, sectionNumber: number, sectionName: string } }>({});
  const [prices, setPrices] = useState<Price[]>([]);  // Define the type for the prices array
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter(); // Initialize useRouter
  const dateDetails = showDetails ? convertToISTAndFormat(showDetails.date) : null;
 

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
          const pricesData = await getShowPricesWithSections(showId);
          setPrices(pricesData);
        }
      } catch (err) {
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [screenId, showId]);

  // console.log(prices)


  // Helper function to extract section number from seat ID
  const getSectionNumberFromSeatId = (seatId: string) => {
    const match = seatId.match(/S(\d+)\+/); // Extract number between 'S' and '+' 
    return match ? parseInt(match[1], 10) : null; // Return section number or null if not found
  };

  const calculateTotalPrice = (selectedSeats: { [key: string]: { seatId: string, seatName: string, sectionNumber: number, sectionName: string } }) => {
    let total = 0;
    Object.values(selectedSeats).forEach((seat) => {
      const sectionNumber = seat.sectionNumber;
      const priceDetail = prices.find((price) => price.sectionNumber === sectionNumber);
      if (priceDetail) {
        total += priceDetail.price;  // Now TypeScript knows price exists on the Price object
      }
    });
    setTotalPrice(total);
  };

  const handleSeatSelect = (seatId: string, seatName: string) => {
    setSelectedSeats((prev) => {
      const newSelectedSeats = { ...prev };
      if (newSelectedSeats[seatId]) {
        // Remove seat if it's already selected
        delete newSelectedSeats[seatId];
      } else {
        // Extract section number from seatId
        const sectionNumber = getSectionNumberFromSeatId(seatId);
        if (sectionNumber !== null) {
          // Find section name for the seat
          const section = prices.find(price => price.sectionNumber === sectionNumber);
          const sectionName = section ? section.sectionName : 'Unknown';
          newSelectedSeats[seatId] = { seatId, seatName, sectionNumber, sectionName };
        }
      }
      calculateTotalPrice(newSelectedSeats);
      return newSelectedSeats;
    });
  };

  const handleProceedToCheckout = () => {
    // Prepare data to store in sessionStorage
    const bookingData = {
      showDetails,
      selectedSeats,
      totalPrice
    };
    // Store data in sessionStorage
    sessionStorage.setItem('booking', JSON.stringify(bookingData));
    // Redirect to checkout page
    router.push('/booking'); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (

     <div className={styles.seatsection}>
      
      <div className={styles.info}>
        <div className={styles.showdetails}>
          <div className={styles.movie}>
            <p>{showDetails.movieId.title ?? 'Not Found'}</p>
            <p>|</p>
            <p>{showDetails.language ?? 'Not Found'}</p>
          </div>
          <div className={styles.cinemasdatetime}>
            <p>{showDetails.screenId.cinemas.name ?? 'Not Found'}</p>
            <p>|</p>
            {dateDetails && (
            <p>
              {dateDetails.specialDay
                ? `${dateDetails.specialDay}, ${dateDetails.date} ${dateDetails.month}, ${dateDetails.day}`
                : `${dateDetails.date} ${dateDetails.month}, ${dateDetails.day}`}
            </p>
            )}
            <p>|</p>
            <p>{convertTo12HourFormat(showDetails.time) ?? 'Not Found'}</p>
          </div>
        </div>
        <div className={styles.cinemas}>
          <h2>{screenDetails.screenNumber} |  {screenDetails.screenType}</h2>
        </div>

      </div>
      

      {screenDetails && showDetails ? (
        <div className={styles.seatlayoutContainer}>
           <div className={styles.indicators}>
              <span className={styles.available}></span><label>Available</label>
              <span className={styles.selected}></span><label>Selected</label>
              <span className={styles.sold}></span><label>Sold</label>
           </div>
         <div className={styles.sectionprices}>
          {prices.map((priceObj, index) => (
            <div key={priceObj.sectionId} className={styles.sectionprice}>
              <strong>{priceObj.sectionName}</strong> : &#8377;{priceObj.price}
            </div>
          ))}
         </div>
          {/* Pass both screenDetails and showDetails to SeatLayout */}
          <SeatLayout 
            seatArrangement={screenDetails.seatArrangement} 
            screenDetails={screenDetails}
            onSeatSelect={handleSeatSelect} // Handle seat selection
          />

        <div className={styles.screenContainer}>
          <div className={styles.screen}>
            <div className={styles.screenicon}>
              <Image
                              src="/assets/icons/screen.png"
                              alt="screen"
                              width={300}
                              height={40}
              />
            </div>
          
          </div>
          <p className={styles.screenText}>All eyes this way</p>
        </div>
        </div>
      ) : (
        <p>No screen or show details available.</p>
      )}

      <div className={styles.totalPrice}>
            <p>Price: &#8377;{totalPrice.toFixed(2)}</p>

            <button
              disabled={Object.keys(selectedSeats).length === 0}
              className={`${styles.checkout} ${Object.keys(selectedSeats).length > 0 ? styles.checkoutactive : ''}`}
              onClick={handleProceedToCheckout} // Handle button click
            >
              Proceed to Checkout
            </button>
      </div>

    {/*below div is the end of seat section  */}
    </div>
   
  );
};

export default SeatSection;
