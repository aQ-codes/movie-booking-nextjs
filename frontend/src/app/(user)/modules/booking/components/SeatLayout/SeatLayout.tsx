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
      price: number;  // Added price information for each section
    }[];
  };
  onSeatSelect: (seatId: string, seatName: string) => void; // Callback for seat selection
}

const SeatLayout: React.FC<SeatLayoutProps> = ({ seatArrangement, screenDetails, onSeatSelect }) => {
  const sections = seatArrangement.split('\\').filter(section => section.trim() !== '');

  // Helper function to convert index to row letter (e.g., 0 -> A, 1 -> B, etc.)
  const getRowLetter = (index: number) => String.fromCharCode(65 + index); // 65 is 'A'

  return (
    <div className={styles.seatLayout}>
      {sections.map((section, index) => {
        const [sectionNumber, ...seats] = section.split(':');
        const sectionDetail = screenDetails.sections.find(s => s.sectionNumber.toString() === sectionNumber);

        let rowIndex = 0; // Row index for current section
        let seatIndex = 0; // Seat index for current row

        return (
          <div key={`section-${sectionNumber}`} className={styles.sectioncontainer}>
            <h3>{sectionDetail?.sectionName}</h3>
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
                    onSelect={(id, name) => onSeatSelect(id, name)} // Pass seat data and section number
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
