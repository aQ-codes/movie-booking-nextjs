import React from "react";
import Modal from "@/layouts/Modal/Modal"; // Import the Modal component
import AddScreenForm from "./addScreenForm/addScreenForm";

interface AddScreenModalProps {
  isOpen: boolean; // Prop to control modal visibility
  onClose: () => void; // Prop for closing the modal
  cinemasId: string; // Receive cinemas ID as a prop
}

const AddScreenModal: React.FC<AddScreenModalProps> = ({ isOpen, onClose, cinemasId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['light']}>
      {/* Pass cinemasId to AddScreenForm */}
      <AddScreenForm cinemasId={cinemasId} />
    </Modal>
  );
};

export default AddScreenModal;
