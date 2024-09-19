import React from 'react';
import styles from './SeatCell.module.css';

interface SeatCellProps {
  seatId: string;       // Updated to seatId for clarity
  seatName: string;
  isNonSeat: boolean;
  onSelect?: (seatId: string, seatName: string) => void; // Updated callback signature
}

const SeatCell: React.FC<SeatCellProps> = ({ seatId, seatName, isNonSeat, onSelect }) => {
  const handleSelect = () => {
    if (!isNonSeat && onSelect) {
      // Pass both seat ID and generated seat name
      onSelect(seatId, seatName);
    }
  };

  return (
    <button
      className={`${styles.seatCell} ${isNonSeat ? styles.nonSeat : ''}`}
      onClick={handleSelect}
      disabled={isNonSeat} // Disable non-seats
    >
      {seatName} {/* Display the generated seat name (e.g., A0, B1, etc.) */}
    </button>
  );
};

export default SeatCell;
