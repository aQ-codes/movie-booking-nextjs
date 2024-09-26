import React, { useState } from 'react';
import styles from './SeatCell.module.css';

interface SeatCellProps {
  seatId: string;       // Seat ID for identifying the seat
  seatName: string;     // Display name for the seat
  isNonSeat: boolean;   // Indicates if the cell is not a seat
  isSelected?: boolean; // Indicates if the seat is currently selected
  onSelect?: (seatId: string, seatName: string) => void; // Callback for seat selection
}

const SeatCell: React.FC<SeatCellProps> = ({ seatId, seatName, isNonSeat, isSelected, onSelect }) => {
  const [selected, setSelected] = useState(isSelected);

  const handleSelect = () => {
    if (!isNonSeat && onSelect) {
      const newSelectedState = !selected;
      setSelected(newSelectedState);
      onSelect(seatId, seatName); // Pass seat ID, name, and section number
    }
  };

  return (
    <button
      className={`${styles.seatCell} ${isNonSeat ? styles.nonSeat : ''} ${selected ? styles.selected : ''}`}
      onClick={handleSelect}
      disabled={isNonSeat} // Disable non-seats
    >
      {seatName} {/* Display the generated seat name (e.g., A0, B1, etc.) */}
    </button>
  );
};

export default SeatCell;
