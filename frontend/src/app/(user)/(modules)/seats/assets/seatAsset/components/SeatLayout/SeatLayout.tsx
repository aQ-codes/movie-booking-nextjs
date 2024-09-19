import React from 'react';
import SeatCell from '../SeatCell/SeatCell';
import styles from './SeatLayout.module.css';

interface SeatLayoutProps {
  seatArrangement: string;
  screenDetails: {
    screenNumber: number;
    screenType: string;
    sections: {
      sectionNumber: number;
      sectionName: string;
    }[];
    // Add other properties from screenDetails as needed
  };
}

const SeatLayout: React.FC<SeatLayoutProps> = ({ seatArrangement, screenDetails }) => {
  const sections = seatArrangement.split('\\').filter(section => section.trim() !== '');

  // Helper function to convert index to row letter (e.g., 0 -> A, 1 -> B, etc.)
  const getRowLetter = (index: number) => String.fromCharCode(65 + index); // 65 is 'A'

  return (
    <div className={styles.seatLayout}>
      <h2>Screen Number: {screenDetails.screenNumber}</h2>
      <h3>Screen Type: {screenDetails.screenType}</h3>
      
      {sections.map((section, index) => {
        const [sectionNumber, ...seats] = section.split(':');
        const sectionDetail = screenDetails.sections.find(s => s.sectionNumber.toString() === sectionNumber);

        let rowIndex = 0; // Row index for current section
        let seatIndex = 0; // Seat index for current row

        return (
          <div key={`section-${sectionNumber}`} className={styles.sectioncontainer}>
            <h3>{sectionDetail?.sectionName || sectionNumber}</h3>
            <div className={styles.section}>
              {seats.map((seat, seatIndex) => {
                
                if (seat === ',') {
                  // End of the current row, reset seat index and move to next row
                  rowIndex++;
                  seatIndex = 0;
                  return <br key={`break-${index}-${seatIndex}`} />; // New row
                }

                // Generate seat name based on row index and seat index
                const rowLetter = getRowLetter(rowIndex);
                let seatName = '';
                
                if (seat !== 'n') {
                  seatName = `${rowLetter}${seatIndex}`;
                  seatIndex++; // Increment seat index for next seat in the same row
                }

                return (
                  <SeatCell
                    key={`seat-${index}-${seatIndex}`}
                    seatId={seat}
                    seatName={seatName}
                    isNonSeat={seat === 'n'} // Pass if it's a non-seat cell
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeatLayout;
